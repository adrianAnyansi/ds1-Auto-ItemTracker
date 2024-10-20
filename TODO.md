# TODO time

# OBS Update:
Make main/display 1 file. Lock instead removes everything else, and turns into a minified version
    Need to fix 2 bugs for an OBS version
        Drop down doesnt work for presets, create my own
        Drag & Drop breaks
    Also rewrite the steps by detecting the OBS flag https://github.com/obsproject/obs-browser/blob/master/README.md
Then collapse everything when lock is pressed (the lock also disappears with time, reshowing on hover)

I wanted to support WebRTC, but it requires a rewrite of server logic & item checks
    OBS version is simply better in all cases (assuming it works and updates as usual)
    This is supporting a super rare case of separate streaming computer so I simply will ignore it until someone complains

# Patty notes:
Remove Crest of Artorias for Darkmoon Seance
Remove Blighttown Key
C# has a bug where it spins up CPU cycles if the game isnt launched (3-4 years ago)

## Important
- on MAIN page, server not alive should be more obvious
- Make MAIN animatable so you can capture without website
    - I actually dont want to work on this cause I need to revamp UI for a dark screen
    - You also cant crop and then interact with the entire webpage. Also the localStorage might not store for that.
- Make display hide pop-up automatically when connected

## Optional
- More thorough testing of garbled data
- Make it more obvious the tracked player is might switch
- Maybe set the image for light source based on Skull Lantern, Maggot or Cast Light
    - Cast Light = item, 14 Faith + useable catalyst

- Smaller widget that shows all items temporarily
    - Modifiable temporary list


pre-post place differences
001205A0

## Lordvessel flag notes
TrackerA starts at 
1181552 = 0x120770

Inventory starts at 0x120A50
Ends at 0x12EA34


- First change is at 0x120770-0x120780  
    - Noted in Pre-Frampe/PrePlace
    - Noted in control
    Start of block, could be irrelevant
- 0x12078C - 0x12078E - Pre-Frampe/Place has more blocks changed here
    Very small also start of block

- 0x120B84      I believe this is the Lordvessel item being removed
- 0x13F97C      
Could be value 0x120A48 which goes from 0C to 0B


- 0x13F862      There's some changed items here
- 0x13FCB0      Same here

- 0x14463F      Its a random change in the middle of 00000
- 0x144DB8      Random bit
- 0x144DEA      Random bit
- 0x1450B7      Random bit
- 0x156657      A lot of changes
- 0x156662      Minor change
- 0x156853      Line of changes

CONTROL
0x120770 header?
0x12078C short list
0x1207C4 short data
- 0x14463A, 0x14463E-0x14463F
    00 to 02, c0 01
0x144DB5 - random bit
- 0x1450b7
- 0x1565AA - 0x15696C
    The mess of data here
- 0x1565CB short data
0x1565E3    short data
0x156623    short data
0x156657
- 0x17667B - 0x180783
    More messy data



Next offset starts at
1575168 = 0x180900

Found a save file editor that notes the bonfire as 
1802960 Firelink Altar (Bonfire)


## NOTES

### FireKeeper Souls
Not doing FireKeeper Souls as any competent player will use Fire Keeper Souls as soon as they have them, meaning I have to track both Souls and Estus level. Its kind of unimportant

### Not doing Misc items
Cause because its not important- i.e what items do you want to see that are not on the tracker?

Also I gotta keep track of 100 items in my list
It also muddies the tracker a bit- the thought is; why is X on the tracker?? So it has to disappear after a short while.

A big Soul? Well you can check inventory & it kinda doesn't matter.
Weapon? Well how many unique weapon ids need to be tracked for that to work?
        Also why note every weapon you pick up?
Titanite?   Cool but also why
Spells?     Spells are very easy to search through
Armour should be obvious
Rings also has the same issues

A 100% collection of items shouldn't be on screen

### Previous notes

361F9 unknown

003C12C0 This seems to be the elapsed time displayed on the save slot  
I spent 5 hours looking for this  
However not only is it in a different location from regular player data but it also doesn't update until you quit out (i think?)
Not going to go into further detail with this as it doesnt update on game start anyway

003C10D4

003C03E4


83 D1 E9 D1 5C 23 8E CA 8B 1D 94 B3
