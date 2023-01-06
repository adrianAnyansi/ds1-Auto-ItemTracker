# TODO time

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