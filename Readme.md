# Important Note

There's a native C# application that hooks into game memory and can read the item list directly. (It can even change the layout!)
Would recommend using this instead, unless you have a separate streaming PC for capture or you really need the webpage.
That project is here: https://github.com/AinTunez/DarkSoulsRandoTracker

# DS1 Item Auto Tracker FAQ

Q: What is this?  
A: It's a online DS1 Item tracker, designed primarily for Item randomizers. The website tracks key items to display as a stream overlay. This only works in Chrome due to the FileSystem API.

Q: How do I use it?  
A: Go to this website https://ds1-auto-tracker.s3.us-east-2.amazonaws.com/main.html, and then just follow the instructions! Add your DS1 or DS Remastered save file, and it will automatically start tracking the latest character. Copy the generated link as a browser source to use the overlay.

Q: Ok but how does it work?  
A: Souls games auto save like every 2 seconds. So by reading the save file constantly, I can tell what items you have and display them.

Q: The tracker picked the wrong player/hasn't picked a player.
A: The tracker will wait until the savefile is updated to pick a player, which should be the player currently being played. If there are issues with this system, let me know.

Q: I bought an item but the tracker didn't update.
A: Apparently save files aren't updated until you exit a shop? Once you leave the shop the tracker will update.

Q: I picked up an item and the tracker updated late.
A: The save file can get saved at abritary times and take up to 7s to update through the tracker. For example it might not save while in combat. You can lock the system layout in MAIN page which should update faster.

Q: Why does the Lordvessel/Souls disappear after being placed at Firelink Altar?
A: Cause I don't know where it is. More details below.

Q: Can I customize the displayed items?  
A: Simply drag and drop the items from the grid, or press Add and move items from that list to the grid. Or you can choose a preset. The layout is saved to your browser on every change.

Q: So where can I request these things? Or report bugs?  
A: Either by email tobe.anyansi@gmail.com OR make an issue at the github page. Thanks!

Q: Why didnt you just build this for Emotracker?  
A: Dunno how to build for it, and it would take too long. Also it seems Emotracker has a convoluted way of displaying a transparent webpage which doesn't work for OBS. If there's a better way, just let me know.

# Changelog

### 1.2
The item grid has presets and can be drag+dropped
This reflects on the display page
More items are available

### 1.1
Fixed bug where DS:Remastered items weren't been read correctly. (offset is 0x0EF8 which is different from DS:PTE)

Fixed bug where spkID being null (so for all new clients), the server would not assign a proper spkID meaning both spkID and earID will be null and disconnected

### Explaining the Lordvessel/Soul disappearing act

So here's the thing. The Lordvessel & Souls are items in your inventory, which I can track easily thanks to the work of the Souls community. However for placing these, I need to track event flags.

This is hard. There exists a list of event flags in memory but this doesn't map to the player profile: Not enough bits exist for a flag like 11705397 (Seath, Tail Cut) to fit within the space. I don't know the location that these are stored.
I programmed a mini-brute force program to best-match and it found nothing.

This is assuming that the event flags are even in this format (as bit flags from a set location). They could be saved as strings, saved under a different number, encrypted, shuffled, placed in a key:value format, its very frustating.

DarkSouls seems to write an entire block of memory into the playerProfile regardless, and judging from the memory-viewers there are a lot of event flags being constantly written. 

Since brute force failed, the next best option is to make multiple Pre-Place Lordvessel save-files and Multiple Post-place Lordvessel files and then continously overlay them and make a best fit diff.

And after ALL that, I have to do the exact same thing for every Lord Soul.
So I gave up sorry.


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

### DS-EventHook Event IDs
https://github.com/Wulf2k/DS-EventHook/blob/master/DS-EventHook/Resources/NamedIDs.txt
