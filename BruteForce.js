

let testBlock = {
    716: 1, //  
    15: 0, // Gywn defeated
    9: 1, // Queelag defeated
    12: 1, //|Boss Defeated, Ornstein & Smough
    5: 0, //|Boss Defeated, Sif
    3: 1, //|Boss Defeated, Bell Gargoyles
    780: 1, // Obtained Titanite shard
    8131: 1, // Estus + 1
    8132: 1, // Estus + 1
    11010101: 1, // Gate to female merchant
    11010120: 1, // Flaming barrel
    11100531: 0, // Painted World, Priscilla Disabled
    11210000: 0, // Boss Defeated, Sanctuary Guardian
    11210001: 0, // Boss Defeated, Artorias
    11210002: 0, //|Boss Defeated, Manus
    11210004: 0, //|Boss Defeated, Kalameet
    11300858: 0, //|Dead, Catacombs, Prowling Demon
    11310820: 0, //|Dead, Tomb of the Giants, Black Knight
    11410000: 0, //|Bed of Chaos, Both Orbs Destroyed
    11410340: 0, //|Lost Izalith, Shortcut to Demon Ruins
    11500865: 1, //|Dead, Sen's Fortress, Bomb-Tossing Giant    
    11510210: 1, //|Anor Londo, Shortcut Door to Giant Blacksmith
    11700000: 0, //|Seath, Initial Boss Fight Cinematic Viewed
    11705397: 0, //|Seath, Tail Cut
}

function getBit(dataview, index, littleEndian=false) {
    let byteOffset = parseInt(index/4)
    let flagIdx = index % 4

    if (byteOffset < 0 || byteOffset >= dataview.byteLength) {
        return false
    } else {
        let byte = dataview.getUint8(byteOffset)
        
        if (littleEndian)
            return (byte >> flagIdx) & 0b1
        else
            return ((byte << flagIdx) & 0b1000) >> 3
    }
}

function findEventPtr(arrayBuffer) {

    // We brute forcing
    let bestResults = []
    let bestMatch = 0
    let currDataView = new DataView(arrayBuffer)
    
    for (let i = 0; i < arrayBuffer.byteLength; i++) {
        let match = {}
        let matchNum = 0
        for (let bit in testBlock) {
            match[bit] = getBit(currDataView, bit)
            if (match[bit] === testBlock[bit]) {
                matchNum++
            }
        }
        if (matchNum > bestMatch) {
            bestResults = [match]
            bestMatch = matchNum
        } else if (matchNum === bestMatch) {
            bestResults.push(match)
        } // else do nothing
    }
    for (let i = 0; i < arrayBuffer.byteLength; i++) {
        let match = {"littleEndian":true}
        let matchNum = 0
        for (let bit in testBlock) {
            match[bit] = getBit(currDataView, bit, littleEndian=true)
            if (match[bit] === testBlock[bit]) {
                matchNum++
            }
        }
        if (matchNum > bestMatch) {
            bestResults = [match]
            bestMatch = matchNum
        } else if (matchNum === bestMatch) {
            bestResults.push(match)
        } // else do nothing
    }

    return {'bestResult':bestResults, 'matchLen':bestMatch}
}