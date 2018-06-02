# Labyrinth game

You get into a labyrinth, you wander around, you exit the labyrinth.
Afterwards the level is revealed and you get to see how well you did and, most importantly, have a good laughter.

# Current state

The game is under development right now.

Currently the following is implemented:

- simple GUI
- player movement and interaction with:
    - walls
    - empty places
    - a key
    - exit door
- moves history

# **TODO**-list

- add end-game screen
- add ability to watch your replay after the game end
- center on the player to make it harder to understand the boundaries of the labyrinth
- add some kind of menu on top of all of this
- procedural map generation maybe? other options?
- non-fixed starting position
- maybe optimize moves history storage
- maybe change walls from taking up 1 full square to only sides between squares

# Some side ideas

Fully drop the graphical interface and move to a text based
version. This might be a good idea, but also might be terrible.

If I stick to the GUI, I should decentralize the picture so the boundaries of
the labyrinth are not obvious. Also, need to probably do something in case
the player gets teleported - either wipe the entire map, keep opening
the same map (I don't like this option), or do some magic. Same question with river.

# P.S.

To make your own server to try things out you can use `python -m http.server` to create a sever, then go to the [localhost:8000](http://localhost:8000) (assuming it will listen to the port 8000).

Also, you can try the game in its current state on [its github page](http://mike239x.github.io/labyrinth).
