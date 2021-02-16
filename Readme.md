# DS1 Item Auto Tracker

Q: What is this?  
A: It's a online DS1 Item tracker, designed primarily for Item randomizers. The website tracks key items to display as a stream overlay. This only works in Chrome due to the FileSystem API.

Q: How do I use it?  
A: Go to this website <website>, and then just follow the instructions! Add your DS1 or DS Remastered save file, and it will automatically start tracking the latest character. Copy the generated link as a browser source to use the overlay.

Q: Ok but how does it work?  
A: Souls games auto save like every 2 seconds. So by reading the save file constantly, I can tell what items you have and display them.

Q: The tracker picked the wrong player.  
A: By default the tracker picks the last save slot at first. Once one of the characters is updated, then it will pick the character being played. 

Q: Is there a manual mode?  
A: There isn't at the moment, it will be added on request.

Q: Can I customize the displayed items?  
A: Will be added on request. I need to create a system for adding/removing items.

Q: So where can I request these things? Or report bugs?  
A: Either by email tobe.anyansi@gmail.com OR make an issue at the github page. Thanks!

Q: Why didnt you just build this for Emotracker?  
A: Dunno how to build for it, and it would take too long. Also it seems Emotracker has a convoluted way of displaying a transparent webpage which doesn't work for OBS. If there's a better way, just let me know.

# MVP
    Think I'm done
# If I have time
    Clean up Speaker UI
        Clean up infoBox
            better ui for tracking?
        Add connection info
    
    More thorough testing 
        speaker emit/reconnect
        client connect/reconnect
        garbled data/empty data

    Check transparent on DS background

    Test with DSR??

# Barb's old list
        Lordvessel | Orange Charred Ring | Seath Lord Soul
        Convenant of Artioas | Key to Depths | 4 Kings Lord Soul 
        Painted Doll | Annex Key (A) | Nito Lord Soul
        Broken Pendant | Light Source | Bed of Chaos Lord Soul
        Key to the Seal |  | Basement Key
        Crest of Artioas |  | Blightown Key


### Notes
    So there's likely nothing that changes faster than
        soul count (killing enemies/buying items)
        item count / ids
        changing areas (might be trackable but dunno where)


361F9 unknown

003C12C0 This seems to be the elapsed time, thank god lol
I spent 5 hours looking for this
However its not in the player slot meaning the offset is gonna suck
a lot
also i bet it doesnt get changed until you exit the game as its part of the save slot
therefore it's probably useless

003C10D4

003C03E4


83 D1 E9 D1 5C 23 8E CA 8B 1D 94 B3

## Links
DS1 simple item parser
https://gabtoubl.github.io/ds1_save/
https://github.com/gabtoubl/gabtoubl.github.io/blob/master/ds1_save/saveParser.js

### Datasheet
https://github.com/tarvitz/dsfp/blob/master/docs/datasheet.rst

### sl2 files + links
https://sites.google.com/view/soulsmods/file-formats/sl2-files

### DSR Unpacker
https://github.com/pawREP/Dark-Souls-Remastered-SL2-Unpacker/blob/master/DSR_SL2_Unpacker/DSRSL2Unpacker.cpp

https://github.com/MarkH221/DarkSoulsSaveEditor
