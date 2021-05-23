const e = require('express');
const express = require('express');
const server = express();
const fs = require('fs')
const port = 8081;
let readSecret = ''

const min = 1000 * 60;

const maxHashTables = 250 // allow 250 clients total
const speakerRegistry = new Array(maxHashTables)
/*  registry obj is 
		id: unique id assigned to update this value
		data: json/obj of the player
		lastupdated: timestamp
		clients: client objs to update
*/
const speakerIDHash = {} // Just id -> index
const awaitingSpeaker = new Set() // listeners that are awaiting speakers

// TODO: Swap the speakers to a set to remove easier

/*
	the spk hash works like so
	32-bit int, take every 8 bytes and sum, then mod 250
	TODO: This stuff has to be weighted so its hard to figure out the parsing
	Basically don't use the last digit for stuff dummy
*/
let sseClients = 0

const corsHeaders = {
	'Access-Control-Allow-Origin': '*', // TODO: Restrict more
	'Access-Control-Allow-Method': 'POST, GET',
	'Access-Control-Allow-Headers': 'Content-Type, Cache-Control'

}
const eventStreamHeaders = {
	'Content-Type': 'text/event-stream',
	'Cache-Control': 'no-cache'
}

server.use(express.text())

// listeners
const registerClient = (req, res) => {
	res.set(eventStreamHeaders);
	res.set(corsHeaders)

	let lisID =  parseInt(req.query['ear']) // parse the client id from route
	if (!Number.isInteger(lisID)) {
		server_log(`lisID not found ${lisID}`)
		res.status(500).send('No Listen ID')
		return
	}
	// TODO: if no ID, register to most updated timestamp within 10mins*

	server_log(`Listen on [${req.ip}] | ${lisID}`)
	res.write('retry: 5000\n\n')
	if (speakerRegistry[lisID]) {
		speakerRegistry[lisID].clients.push(res) // add if exists
		// send catch-up information
		res.write(`event: Save-Data\n`)
		res.write(`data: ${JSON.stringify(speakerRegistry[lisID].data)}\n\n`)
	} else {
		awaitingSpeaker.add({client: res, ts: Date.now(), lisID: lisID})
		res.write(`event: No-Speaker\ndata: \n\n`)
	}
	sseClients++
	res.ip = req.ip

	res.on('close', () => {
		server_log(`Connection [${req.ip}] closed. LisId ${lisID}`) 
		if (Number.isInteger(lisID) && speakerRegistry[lisID]) {
			let c_idx = speakerRegistry[lisID].clients.indexOf(res)
			delete speakerRegistry[lisID].clients[c_idx]
			vectorArray(speakerRegistry[lisID].clients) // remove empty
		}
		for (let clientObj of awaitingSpeaker) {
			if (clientObj.client == res) {
				awaitingSpeaker.delete(clientObj)
			}
		}
		res.end()
		sseClients--
	})
}

const registerSpeaker = (req, res) => {
	// ask for an ID, if not then it will be provided for you
	let spkID = parseInt(req.body)
	server_log(`[${req.ip}] spkID ask: ${spkID}`)
	let lisID = null
	
	res.set(corsHeaders);

	if (Number.isInteger(spkID) && speakerIDHash[spkID] && spkID == speakerIDHash[spkID].id) {
		// if save exists, link exists AND id is correct
		server_log(`Unncessary Override ${spkID}`)
		res.sendStatus(204)
		return
	} else if (Number.isInteger(spkID)) {
		lisID = ((spkID>>24 & 0xFF) + (spkID>>16 & 0xFF) + 
				 (spkID>>8 & 0xFF) + (spkID & 0xFF)) % maxHashTables
		// if occupied / invalid, revoke
		if (lisID >= maxHashTables || speakerRegistry[lisID])  
			spkID = null 
	}
	
	if (!Number.isInteger(spkID)) { // Generate new speaker ID
		lisID = -1 // Find available listener slot
		while (++lisID < speakerRegistry.length) {
			if (!speakerRegistry[lisID])
				break
		}
		// assume valid lisID
		let spkKey = 0
		let spkSum = 0
		for (let i=0; i<3; i++) {
			let bit = Math.floor(Math.random() * 256)
			spkKey = (spkKey << 8) + bit
			spkSum += bit
		}

		let diff = (maxHashTables + (lisID - (spkSum % maxHashTables))) % maxHashTables
		spkKey = (spkKey << 8) + diff
		spkID = spkKey

		server_log(`Assigning to ${spkID}:${lisID}`)
	}

	let oldSlot = speakerRegistry[lisID]
	speakerRegistry[lisID] = { id: spkID, ts: Date.now() } // set object for init
	speakerRegistry[lisID].clients = (oldSlot) ? oldSlot.clients : []
	speakerIDHash[spkID] = speakerRegistry[lisID]

	// After we have a new speaker, check the awaiting array
	for (let listener of awaitingSpeaker) {
		if (listener.lisID == lisID) {
			speakerIDHash[spkID].clients.push(listener.client)
			awaitingSpeaker.delete(listener)
		}
	}
	res.status(201).send(`${spkID}:${lisID}`)
	
}

const processSpeakerUpdate = (req, res) => {
	// accept & process data for updates
	let data = req.body
	let spkID = data.spkID
	res.set(corsHeaders);

	// forward save data to listeners
	if (speakerIDHash[spkID]) {
		speakerIDHash[spkID].ts = Date.now()
		if (data.player) {
			speakerIDHash[spkID].data = data.player

			for (let client of speakerIDHash[spkID].clients) {
				client.write(`event: Save-Data\n`)
				client.write(`data: ${JSON.stringify(data.player)}\n\n`)
			}
			server_log(`Save-data for ${spkID} updated ${speakerIDHash[spkID].clients.length} clients`)
		} else { // keep-alive msg
			for (let client of speakerIDHash[spkID].clients) {
				client.write(`event: keep-alive\ndata:\n\n`)
			}
		}
		res.sendStatus(200)
	} else {
		server_log(`[${req.ip}] Given invalid spkID ${spkID}`)
		res.sendStatus(401)
	}
}

const pruneSpeakerMins = 1000 * 60 * 10;
const prune = () => {
	// every 10m, remove unused speakers and terminate their clients
	
	for (let spkID in speakerIDHash) {
		if (speakerIDHash[spkID].ts < (Date.now() - pruneSpeakerMins)) {
			let lisID = ((spkID>>24 & 0xFF) + (spkID>>16 & 0xFF) + 
				(spkID>>8 & 0xFF) + (spkID & 0xFF)) % maxHashTables

			server_log(`Removing expired speaker ${spkID}:${lisID}`)
			for (let client of speakerIDHash[spkID].clients) {
				client.end()
			}
			speakerRegistry[lisID] = null
			delete speakerIDHash[spkID]
		}
	}
	//console.log(`Prune checked @ ${getISO_TS()}`)
}

server.get('/about', (req, res) => {
	res.status(200).send(`This is the DS1-Auto-Tracker replying.`)
	server_log(`${req.ip} requested about page`)
})
server.get('/5alive', (req, res) => {
	res.status(200).send('alive')
})
server.post('/pickMic', registerSpeaker)
server.post('/speakMic', express.json(), processSpeakerUpdate)
server.options('/speakMic', (req, res) => {
	res.set(corsHeaders)
	res.send()
})
server.get('/listen', registerClient)

server.get('/dumpinfo', (req, res) => {
	if (req.hostname == 'localhost' || req.query['secret'] != readSecret) {
		server_log(`[${req.ip}] requested info`)
		let info = `Mic: ${Object.keys(speakerIDHash).length} | Wait-Lis: ${awaitingSpeaker.size} | Total clients: ${sseClients}\n\n`
		for (let slot in speakerIDHash) {
			lisID = ((slot>>24 & 0xFF) + (slot>>16 & 0xFF) + (slot>>8 & 0xFF) + (slot & 0xFF)) % maxHashTables
			info += `slot: ${slot} : lisID ${lisID}`
			info += `\n  ts: ${new Date(speakerIDHash[slot].ts).toUTCString()}\n  lis: ${speakerIDHash[slot].clients.length}\n` 
			if (speakerIDHash[slot].data)
				info += `  player: ${speakerIDHash[slot].data.name}\n`
		}
		res.status(200).send(info)
	} else {
		res.sendStatus(401)
	}
})

// Utilty funcitons
function getISO_TS() {
	return new Date().toLocaleTimeString()
}

function getISO_TDS() {
	return new Date().toISOString()
}

function server_log(text) {
	console.log(`[${getISO_TDS()}]: ${text}`)
}

function vectorArray(arr) {
	// take array, swap empty values and pop
	let empty_idx = 0
	while(empty_idx < arr.length) {
		if (arr[empty_idx] == undefined || arr[empty_idx] == null) {
			arr[empty_idx] = arr[arr.length-1]
			arr.pop()
		}
		empty_idx++
	}
}


server.listen(port, () => {
	fs.readFile('secret.txt', 'utf8', (err, data) => {
		if (err) {
			server_log(`No secret was found on start-up`);
			console.error(err)
		}
		else readSecret = data
	})

	server_log(`Server listening at ${port}`)
	setInterval(prune, 0.5*min)
})