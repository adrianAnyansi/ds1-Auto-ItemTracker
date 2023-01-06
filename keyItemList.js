var keyItemList = {
    "-123": {
      "name": "Light Source",
      "desc": "Lights up when you have the Skull Lantern or Sunlight Maggot"
    },
    "138": {
      "name": "Covenant of Artorias",
      "desc": "Allows access to the Four Kings boss room"
    },
    "139": {
       "name": "Orange Charred Ring",
       "desc": "Allows access to Lost Izalith"
    },
    
    "149":{
      "name": "Darkmoon Seance Ring",
      "desc": "Used to access the Gywndolin fight"
    },
   //  "390": {
   //    "name": "Fire Keeper Soul"
   //  },
   //  "391": {
   //    "name": "Fire Keeper Soul 2"
   //  },
   //  "392": {
   //    "name": "Fire Keeper Soul 3"
   //  },
   //  "393": {
   //    "name": "Fire Keeper Soul (Anastacia)"
   //  },
    // Maybe more here


    "1396000": {
      "name": "Skull Lantern"
    },
    "190000": {
      "name": "Sunlight Maggot"
    },


    "384":{
       "name":"Peculiar Doll",
       "desc": "Allows access to Painted World"
    },
    "800":{
       "name":"Large Ember"
    },
    "801":{
       "name":"Very Large Ember"
    },
    "802":{
       "name":"Crystal Ember"
    },
    "806":{
       "name":"Large Magic Ember"
    },
    "807":{
       "name":"Enchanted Ember"
    },
    "808":{
       "name":"Divine Ember"
    },
    "809":{
       "name":"Large Divine Ember"
    },
    "810":{
       "name":"Dark Ember"
    },
    "812":{
       "name":"Large Flame Ember"
    },
    "813":{
       "name":"Chaos Flame Ember"
    },
    "2001":{
       "name":"Basement Key",
       "desc": "Unlocks door to Lower Undead Burg"
    },
    "2002":{
       "name":"Crest of Artorias",
       "desc": "Allows access to Darkroot Garden through the gate"
    },
    "2003":{
       "name":"Cage Key",
       "desc": "Frees Big Hat Logan in Sen's Fortress"
    },
   //  "2004":{
   //     "name":"Archive Tower Cell Key"
   //  },
   //  "2005":{
   //     "name":"Archive Tower Giant Door Key"
   //  },
    "2006":{
       "name":"Archive Tower Giant Cell Key",
       "desc": "Unlocks door to Big Hat Logan in Duke's Archives"
    },
    "2007":{
       "name":"Blighttown Key",
       "desc": "Unlocks door to Blightown"
    },
    "2008":{
       "name":"Key to New Londo Ruins",
       "desc": "Unlocks shortcut between New Londo and Valley of Drakes"
    },
    "2009":{
       "name":"Annex Key",
       "desc": "Unlocks Annex area in Painted World"
    },
    "2010":{
       "name":"Dungeon Cell Key",
       "desc": "Opens initial Asylum Cell Door"
    },
    "2011":{
       "name":"Big Pilgrim's Key",
       "desc": "Open's door to exit Undead Asylum"
    },
    "2012":{
       "name":"Undead Asylum F2 East Key",
       "desc": "Opens shortcut door to Undead Asylum bonfire"
    },
    "2013":{
       "name":"Key to the Seal",
       "desc": "Unlocks Lower New Londo"
    },
    "2014":{
       "name":"Key to Depths",
       "desc": "Unlocks door to depths"
    },
    "2016":{
       "name":"Undead Asylum F2 West Key",
       "desc": "Unlocks secret door in undead asylum"
    },
    "2017":{
       "name":"Mystery Key",
       "desc": "Unlocks prison cell of Lautrec"
    },
    "2018":{
       "name":"Sewer Chamber Key",
       "desc": "Unlocks door in Depths past the slime hallway"
    },
    "2019":{
       "name":"Watchtower Basement Key",
       "desc": "Unlocks shortcut guarded by Havel"
    },
   //  "2020":{
   //     "name":"Archive Tower Extra Key"
   //  },
    "2021":{
       "name":"Residence Key",
       "desc": "Frees Griggs (Pyromancer) in Lower Undead Burg"
    },
    "2022":{
       "name":"Crest Key",
       "desc": "Accesses Hawkeye Gough's Tower"
    },
    "2100":{
       "name":"Master Key",
       "desc":"Access many locks in DS1 Early game"
    },
    "2500":{
       "name":"Nito Lord Soul"
    },
    "2501":{
       "name":"Bed of Chaos Lord Soul"
    },
    "2502":{
       "name":"Four Kings Bequeathed Lord Soul Shard"
    },
    "2503":{
       "name":"Seath Bequeathed Lord Soul Shard"
    },
    "2510":{
       "name":"Lordvessel",
       "desc":"Permits bonfire warping and required to complete game"
    },
    "2520":{
       "name":"Broken Pendant",
       "desc":"Allows access to the DLC"
    },
   //  "2600":{
   //     "name":"Weapon Smithbox"
   //  },
   //  "2601":{
   //     "name":"Armor Smithbox"
   //  },
   //  "2602":{
   //     "name":"Repairbox"
   //  },
    "2607":{
       "name":"Rite of Kindling",
       "desc": "Permits kindling to 10 estus flasks"
    },
   //  "2608":{
   //     "name":"Bottomless Box"
   //  },
 }

var namedItemList = {}
for (let key in keyItemList) {
   namedItemList[keyItemList[key].name] = key
}