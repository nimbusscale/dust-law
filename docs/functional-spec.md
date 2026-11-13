# Functional spec

The functional spec for Dust Law: what the game should do, in the player's terms. Requirements are
in GEARS, with `FR` IDs. It never links to other docs. Other docs and code point to its IDs.

## F-SEC-1. Terms

- **Tile.** A square piece of the board. Each edge of a tile is bastion, road, wasteland or outpost.
- **Board.** The tiles laid so far. It has no fixed size, and grows in any direction.
- **Space.** A place on the board where a tile is or could be.
- **Feature.** One bastion, road, outpost or wasteland, taken whole, across every tile it spans.
- **Bastion.** A walled settlement. It spreads across tiles, and is finished when its walls close.
- **Road.** A route across the wastes. It is finished when both of its ends stop.
- **Outpost.** A lone station that fills its whole tile. Any road that points at an outpost ends
  there, from any side.
- **Wasteland.** Open ground between everything else. Roads, outposts and bastion walls split it
  into separate wastelands.
- **Junction.** A point in the middle of a tile where three or four roads meet. Each of those
  roads ends there. Also called a crossroads.
- **Gate.** A place where a road ends at a bastion.
- **Enforcer.** One of a player's 7 pieces. It takes its role from the feature it's on: a **judge**
  in a bastion, a **rider** on a road, a **warden** on an outpost, or a **ranger** in a wasteland.
- **Supply (of enforcers).** A player's enforcers that aren't on the board.
- **Hostile.** A neutral force that sits in one feature of a tile: a **gang stronghold** in a
  bastion, a **raider camp** on a road, or a **mutant warren** in a wasteland. A tile with one is a
  **hostile tile**.
- **The hostiles.** All the hostiles on one feature, counted together as one neutral side.
- **Side.** A player, or the hostiles, when control of a feature is worked out.
- **Control.** Which side takes a scored feature's points (F-SEC-12).
- **Tile supply.** How many tiles are left to draw in a game.
- **Hand.** The tiles a player holds, up to three.
- **Host.** The player who created the game.
- **Turn order.** The order players take turns in, fixed at the start.
- **Round.** One turn for each player, in turn order.
- **Garrison.** A judge left behind in a finished bastion (F-SEC-13).
- **Bounty.** A goal any player can race to meet, for points (F-SEC-14).
- **Score points from a feature.** Receive at least 1 point when that feature is scored.

## F-SEC-2. Limits

- A desktop browser is the only target. There is no mobile app.
- There are no computer opponents.
- There is no matchmaking. A player joins a game only through the host's link or code.
- There is no art or animation beyond tiles drawn in code.

*Why:* the game exists to practice building software with coding agents. It only needs to be good
enough for a small group to play and test, so clarity and correctness matter more than polish.

## F-SEC-3. Setting up a game

**FR-1.** When a player creates a game, the game shall make that player its host.

*Scenario:* Given no game, when Ana creates one, then Ana is its host and its only player.

**FR-2.** When a game is created, the game shall give the host a link or a short code that other
players can join it with.

*Scenario:* Given Ana has created a game, when Ben opens Ana's link, then Ben is a player in Ana's
game.

**FR-3.** While a game hasn't started, the game shall let the host set the number of tiles per
player.

*Scenario:* Given a game that hasn't started, when Ana, the host, sets 15 tiles per player, then
the game uses 15 tiles per player. When Ben, who isn't the host, tries the same, then nothing
changes.

**FR-4.** While the host hasn't set the number of tiles per player, the game shall use 20 tiles per
player.

*Scenario:* Given a game for 5 players where the host never set a number, when it starts, then the
tile supply begins at 100.

**FR-5.** When a game starts, the game shall set the tile supply to the number of tiles per player
times the number of players.

*Scenario:* Given 3 players and 20 tiles per player, when the game starts, then the tile supply
begins at 60, before the starting hands are dealt.

**FR-6.** While 2 to 5 players have joined, the game shall let the host start it.

*Scenario:* Given Ana alone in her game, when she tries to start it, then it doesn't start. Given
Ana and Ben, when Ana starts it, then it starts. When Ben tries to start it instead, then it
doesn't.

**FR-7.** While 5 players have joined, the game shall refuse more players.

*Scenario:* Given 5 players in a game, when a sixth opens the link, then they're told the game is
full.

**FR-8.** While a game has started, the game shall refuse new players.

*Scenario:* Given a started game with 3 players, when another player opens its link, then they
don't join.

## F-SEC-4. Starting a game

**FR-9.** When a game starts, the game shall place the start tile, open wasteland with no hostile,
at the center of the board.

*Scenario:* Given a game about to start, when it starts, then the board holds one open wasteland
tile with no hostile, and the tile supply is unchanged by it.

**FR-10.** When a game starts, the game shall give each player 7 enforcers and a score of 0.

*Scenario:* Given 4 players, when the game starts, then each has 7 enforcers in supply and 0
points.

**FR-11.** When a game starts, the game shall pick 3 bounties at random from F-SEC-14 and show them
to every player.

*Scenario:* Given a game about to start, when it starts, then every player sees the same 3
bounties, and the other 5 aren't used that game.

**FR-12.** When a game starts, the game shall deal each player 3 tiles from the tile supply as
their starting hand.

*Scenario:* Given 3 players and a tile supply of 60, when the game starts, then each player holds
3 tiles and the supply is 51.

**FR-13.** When a game starts, the game shall pick a random turn order that holds for the rest of
the game.

*Scenario:* Given Ana, Ben and Cy, when the game starts, then the game shows a turn order, such as
Cy, Ana, Ben, and turns follow it until the end.

## F-SEC-5. Drawing tiles

**FR-14.** When a player draws, the game shall create a tile that fits somewhere on the board at
that moment.

*Why:* there is no fixed set of tiles. The game makes each tile as it's drawn, so it can always
give a tile that fits.

*Scenario:* Given any board, when a player draws, then the new tile has at least one space and
rotation where it can be laid.

**FR-15.** When a player draws, the game shall take one tile from the tile supply.

*Scenario:* Given a tile supply of 12, when Ana draws, then the supply is 11.

**FR-16.** While the tile supply is zero, the game shall deal no tiles.

*Scenario:* Given a tile supply of 0, when Ana's turn reaches its draw step, then her hand stays at
two tiles.

**FR-17.** The game shall put at most one hostile on a tile.

*Scenario:* Given many draws, when each tile is created, then none holds more than one hostile.

**FR-18.** The game shall never put a hostile on an outpost tile.

*Scenario:* Given many draws, when an outpost tile is created, then it has no hostile.

**FR-19.** While a tile is in a player's hand, the game shall let that player rotate it to any of
the four directions.

*Scenario:* Given Ana holds a road bend running north to east, when she rotates it once clockwise,
then it runs east to south.

## F-SEC-6. Taking a turn

**FR-20.** The game shall run each turn as five steps, in this order: lay a tile, deploy an
enforcer, score, check bounties, draw.

*Scenario:* Given it's Ana's turn, when she lays a tile and deploys a rider that finishes a road,
then the road is scored, then bounties are checked, then Ana draws back to three tiles.

**FR-21.** While it's a player's turn, the game shall refuse actions from every other player,
except garrison choices (FR-60).

*Scenario:* Given it's Ana's turn, when Ben tries to lay a tile, then the game refuses it.

**FR-22.** When a player's draw step ends, the game shall pass the turn to the next player in turn
order.

*Scenario:* Given turn order Ana, Ben, Cy, when Cy's turn ends, then it's Ana's turn.

## F-SEC-7. Laying a tile

**FR-23.** When a player lays a tile, the game shall accept only a tile from that player's hand.

*Scenario:* Given Ana holds three tiles, when her client sends a tile she doesn't hold, then the
game refuses it.

**FR-24.** When a player lays a tile, the game shall accept only an empty space that shares at
least one edge with a tile on the board.

*Scenario:* Given a board with one tile, when Ana lays a tile touching it only at a corner, then the
game refuses it.

**FR-25.** When a player lays a tile, the game shall accept it only if every edge it shares with a
neighbor is a pair that may touch, as listed below.

| This edge | May touch |
|---|---|
| bastion | bastion |
| road | road, outpost |
| wasteland | wasteland, outpost |
| outpost | road, wasteland |

*Scenario:* Given a neighbor with a road edge facing the space, when Ana lays a tile with a bastion
edge there, then the game refuses it. When she rotates it so a road edge faces the neighbor, and
its other shared edges match, then the game accepts it.

*Scenario:* Given an outpost on the board, when Ana lays a second outpost beside it, then the game
refuses it.

**FR-26.** When a hostile tile is laid, the game shall count its hostile as part of the feature it
sits in.

*Scenario:* Given a road with Ben's rider, when Ana lays a tile that extends the road and has a
raider camp on it, then that road now holds one rider and one raider camp.

## F-SEC-8. Stuck hands

**FR-27.** While none of the tiles in a player's hand fit anywhere on the board, the game shall have
that player discard one tile of their choice, in place of laying a tile.

*Why:* a tile fits when it's drawn, but the board changes before the player's next turn, so a tile
in hand can stop fitting.

*Scenario:* Given it's Ana's turn and none of her three tiles fit anywhere, when she discards one,
then she doesn't lay a tile or deploy an enforcer, nothing is scored, and no bounty is checked.

**FR-28.** When a player discards, the game shall show the discarded tile to every player.

*Scenario:* Given Ana's hand is stuck, when she discards a wall tile, then Ben and Cy see that wall
tile.

**FR-29.** When a player discards, the game shall deal them one tile and then end their turn.

*Scenario:* Given a tile supply of 5, when Ana discards, then she holds three tiles again, the
supply is 4, and it's the next player's turn. Given a supply of 0, when she discards, then she
holds two tiles and her turn ends.

## F-SEC-9. Deploying an enforcer

**FR-30.** When a player has laid a tile, the game shall let them deploy one enforcer from their
supply onto one feature of that tile, or skip.

*Scenario:* Given Ana has just laid a tile with a road and a wasteland, when she deploys onto the
road, then her enforcer is a rider on that road. When she skips instead, then no enforcer is placed.

**FR-31.** When a player deploys, the game shall refuse a feature that already holds an enforcer,
counting the whole feature across every tile after the new tile has joined it.

*Scenario:* Given Ben has a rider on a road two tiles away, when Ana lays a tile that extends that
road and tries to deploy onto it, then the game refuses it.

*Scenario:* Given Ana has a judge in a bastion, when she lays a tile that extends that bastion and
tries to deploy a second judge into it, then the game refuses it.

**FR-32.** When a player deploys, the game shall allow a feature that holds hostiles and no
enforcer, including a hostile on the tile just laid.

*Scenario:* Given Ana has just laid a tile whose bastion holds a gang stronghold, and no enforcer
is in that bastion, when she deploys a judge there, then the game accepts it.

**FR-33.** While a player has no enforcers in their supply, the game shall skip their deploy step.

*Scenario:* Given all of Ana's enforcers are on the board, when she lays a tile, then the game moves
straight to scoring.

**FR-34.** The game shall keep each enforcer on its feature until that feature is scored.

*Scenario:* Given Ana's rider is on an unfinished road, when Ana tries to take it back, then the
game refuses it.

## F-SEC-10. Features

**FR-35.** When a tile is laid, the game shall join each of its features with the same kind of
feature across every edge it shares.

*Scenario:* Given Ana's judge in a bastion and Ben's judge in a second bastion, when Cy lays a tile
that connects the two, then they're one bastion holding both judges.

**FR-36.** The game shall treat wasteland on opposite sides of a road, an outpost or a bastion wall
as separate wastelands.

*Scenario:* Given a straight road running north to south through open ground, when the wastelands
are counted, then the ground east of the road and the ground west of it are two wastelands.

**FR-37.** When a bastion's walls are closed all the way around, with no open edge left, the game
shall count it as finished.

*Scenario:* Given two corner bastion tiles facing each other, when the last open bastion edge is
covered by a matching tile, then the bastion is finished.

**FR-38.** When both ends of a road stop, the game shall count it as finished.

*Scenario:* Given a road that ends at a junction on one end, when a tile is laid that ends its
other end at a gate, then the road is finished.

**FR-39.** The game shall stop a road at a junction, at a gate, or at an outpost.

*Scenario:* Given a road edge facing an outpost tile, when the roads are traced, then the road ends
at the outpost.

**FR-40.** When a road closes into a loop, the game shall count it as finished.

*Scenario:* Given four road bends laid to form a ring, when the last bend is laid, then the road is
finished.

**FR-41.** When all eight spaces around an outpost hold tiles, the game shall count it as finished.

*Scenario:* Given an outpost with seven neighbors, when the eighth neighbor is laid, then the
outpost is finished.

**FR-42.** The game shall never count a wasteland as finished.

*Scenario:* Given a wasteland closed in on every side, when tiles are laid, then it is never scored
during play.

## F-SEC-11. Scoring

**FR-43.** When a player lays a tile, the game shall score every bastion, road and outpost that the
tile finishes, in that turn.

*Scenario:* Given Ana lays a tile that finishes a bastion and a road at once, when the scoring step
runs, then both are scored.

**FR-44.** When a bastion is scored, the game shall value it at 2 points per tile it covers.

*Scenario:* Given a finished bastion covering 4 tiles, when it's scored, then it's worth 8 points.

**FR-45.** When a road is scored, the game shall value it at 1 point per tile it covers.

*Scenario:* Given a finished road covering 5 tiles, when it's scored, then it's worth 5 points.

**FR-46.** When an outpost is scored, the game shall value it at 1 point for each tile, among the
outpost tile and its eight neighbors, that has no bastion on it.

*Why:* an outpost pays for being remote. A neighbor with even a sliver of bastion on it is worth
nothing.

*Scenario:* Given a finished outpost with three neighbors that each hold some bastion, when it's
scored, then it's worth 6 points. With no bastion around it, it's worth 9.

**FR-47.** The game shall count each tile once in a feature's size, even when the tile holds two
separate pieces of that feature.

*Scenario:* Given a finished bastion that covers 5 tiles, one of which holds two separate pieces of
it, when it's scored, then it's worth 10 points, not 12.

**FR-48.** When a feature is scored, the game shall give its points by control (F-SEC-12).

*Scenario:* Given a finished road worth 4 points holding only Ana's rider, when it's scored, then
Ana gains 4 points.

**FR-49.** When a feature is scored, the game shall return every enforcer on it to its owner's
supply, except judges left as garrisons.

*Scenario:* Given Ana deploys a rider on the tile that finishes a road, when the road is scored,
then the rider is back in Ana's supply in the same turn.

## F-SEC-12. Control and ties

**FR-50.** When a feature is scored, the game shall give its points to the side with the most
enforcers on it, counting each hostile on it as one enforcer for the hostiles.

*Scenario:* Given a bastion worth 10 with 2 of Ana's judges and 1 gang stronghold, when it's scored,
then Ana gets 10.

**FR-51.** When sides tie for the most enforcers on a scored feature, the game shall split its
points evenly among them, rounded down.

*Scenario:* Given a bastion worth 10 with 1 of Ana's judges and 1 gang stronghold, when it's scored,
then Ana gets 5.

*Scenario:* Given a bastion worth 10 with 1 judge each for Ana and Ben, and 1 gang stronghold, when
it's scored, then Ana and Ben get 3 each.

**FR-52.** When the hostiles tie for the most enforcers on a scored feature, the game shall give
their share to nobody.

*Scenario:* Given a road worth 5 with 1 of Ben's riders and 1 raider camp, when it's scored, then
Ben gets 2 and the other share is lost.

**FR-53.** When the hostiles alone have the most enforcers on a scored feature, the game shall give
its points to nobody.

*Scenario:* Given a bastion worth 10 with 1 of Ana's judges and 2 gang strongholds, when it's
scored, then nobody gets points.

## F-SEC-13. Garrisons

**FR-54.** When a bastion is finished, the game shall let each player with a judge in it leave one
of their judges behind as a garrison, whoever took the bastion's points.

*Scenario:* Given a finished bastion holding Ana's judge and 2 gang strongholds, so nobody scores
it, when it's scored, then Ana may still leave her judge as a garrison.

**FR-55.** When a finished bastion holds judges from more than one player, the game shall ask each
of them about a garrison in turn order, starting with the player whose turn it is.

*Scenario:* Given turn order Ana, Ben, Cy, and Ben's tile finishes a bastion holding judges from Ana
and Cy, when garrisons are chosen, then Cy is asked first, then Ana.

**FR-56.** The game shall keep a garrisoned judge on the board, out of its owner's supply, for the
rest of the game.

*Scenario:* Given Ana left a judge as a garrison, when every later feature is scored, then that
judge never returns to her supply.

**FR-57.** When a road that ends at a garrisoned bastion is finished, the game shall give the
garrison's owner 2 bonus points, whoever takes the road's points.

*Scenario:* Given Ana's garrison in a bastion, and a road ending at that bastion that holds only a
raider camp, when the road is finished, then nobody scores the road and Ana gets 2 bonus points.

**FR-58.** When one tile finishes a bastion and a road that ends at it, the game shall settle the
bastion's garrisons before it pays the road bonus.

*Scenario:* Given Ana's judge in a bastion, when Ben lays a tile that finishes the bastion and a
road ending at it, and Ana leaves her judge as a garrison, then Ana gets the 2 bonus points for
that road.

**FR-59.** While a garrison's owner has an enforcer on a road ending at the garrisoned bastion, or
in a wasteland bordering it, the game shall leave one hostile on that feature out of its count for
control, for each such garrison.

*Why:* a garrison keeps the peace near its bastion. The left-out hostile is gone for every side in
that count, not just the garrison's owner.

*Scenario:* Given a road ending at Ana's garrisoned bastion, holding Ana's rider and 1 raider camp,
when it's scored, then Ana takes the full points, instead of tying with the raiders.

*Scenario:* Given a road running between two bastions, each garrisoned by Ana, holding Ana's rider
and 2 raider camps, when it's scored, then both raider camps are left out and Ana takes the points.

*Scenario:* Given a road ending at Ana's garrisoned bastion, holding Ben's rider and 1 raider camp,
and no enforcer of Ana's, when it's scored, then the raider camp counts and Ben ties with the
raiders.

**FR-60.** While the game is waiting for a garrison choice, the game shall accept that choice from
the player it asked, even when it's not their turn.

*Scenario:* Given Ben's tile finishes a bastion holding Ana's judge, when the game asks Ana about a
garrison, then Ana can answer during Ben's turn.

## F-SEC-14. Bounties

**FR-61.** When a turn's scoring step is done, the game shall give an unclaimed bounty's points to
any player who now meets its condition.

*Scenario:* Given Long Haul is in play and unclaimed, when Ana scores points from a 7-tile road,
then Ana gets 5 points for Long Haul.

**FR-62.** When a bounty is claimed, the game shall take it out of play.

*Scenario:* Given Ana has claimed Long Haul, when Ben later scores points from an 8-tile road, then
Ben gets nothing for Long Haul.

**FR-63.** When two or more players meet the same bounty in the same turn, the game shall split its
points among them, rounded down.

*Scenario:* Given Big Walls (6 points) is unclaimed, when Ana and Ben tie on a 7-tile bastion and
both score points from it, then each gets 3 points for Big Walls.

**FR-64.** The game shall pick its bounties from this list, and judge each by the condition given.

| Bounty | Condition | Points |
|---|---|---|
| Big Walls | Score points from a bastion of 6 or more tiles. | 6 |
| Long Haul | Score points from a road of 6 or more tiles. | 5 |
| Clean Sweep | Score points from a bastion that holds a gang stronghold. | 5 |
| Clear the Road | Score points from a road that holds a raider camp. | 4 |
| Frontier | Score points from your second outpost. | 5 |
| Full Patrol | Over the game, score points from at least one bastion, one road, and one outpost. | 6 |
| Lockdown | Have two garrisons on the board at the same time. | 5 |
| All Hands | End your turn with all 7 of your enforcers on the board. | 4 |

*Scenario:* Given Frontier is in play, when Ana scores points from her first outpost, then nobody
claims Frontier. When she later scores points from a second outpost, then she claims it.

## F-SEC-15. End of the game

**FR-65.** When the tile supply reaches zero, the game shall finish the current round and then end.

*Why:* everyone gets the same number of turns.

*Scenario:* Given turn order Ana, Ben, Cy, when the last tile is drawn on Ana's turn, then Ben and
Cy each take one more turn, laying from their hands and drawing nothing, and then the game ends
with their remaining tiles unplayed.

**FR-66.** When the game ends, the game shall score unfinished bastions, roads and outposts at
nothing.

*Scenario:* Given Ana's judge in an unfinished 5-tile bastion, when the game ends, then Ana gets no
points from it.

**FR-67.** When the game ends, the game shall score each wasteland that holds at least one ranger,
valuing it at 3 points for each finished bastion it borders.

*Why:* a bastion counts whatever its size, even if the hostiles took it or it holds a garrison. One
bastion can count for several wastelands.

*Scenario:* Given a wasteland holding Ana's ranger that borders two finished bastions, one of them
taken by gang strongholds, and one unfinished bastion, when the game ends, then the wasteland is
worth 6 points and Ana takes them.

*Scenario:* Given a wasteland worth 3 holding Ana's ranger and 1 mutant warren, when the game ends,
then Ana ties with the hostiles and gets 1.

**FR-68.** When the game ends, the game shall declare the player with the most points the winner,
and players tied for the most share the win.

*Scenario:* Given final scores Ana 54, Ben 54, Cy 40, when the game ends, then Ana and Ben share the
win.

## F-SEC-16. Playing over the network

**FR-69.** The game shall let each player play from their own browser, over a network.

*Scenario:* Given Ana and Ben on two computers, when each opens the game, then they play the same
game together.

**FR-70.** The game shall show each player their own hand and no other player's.

*Scenario:* Given Ana and Ben in a game, when Ana looks at the game screen, then she sees her three
tiles and none of Ben's.

**FR-71.** The game shall show every player how many tiles each other player holds.

*Scenario:* Given Ben holds two tiles in the last round, when Ana looks at the score panel, then
it shows that Ben holds two tiles.

**FR-72.** When any player acts, the game shall show the result to every player in that game,
without a page refresh.

*Scenario:* Given Ana, Ben and Cy in a game, when Ana lays a tile, then Ben and Cy see it on the
board right away.

**FR-73.** The game shall run several games at once, each kept fully apart from the others.

*Scenario:* Given two games in progress, when a player in one lays a tile, then nothing changes in
the other.

## F-SEC-17. The game screen

**FR-84.** When a game starts, the game screen shall center the board on the start tile.

*Scenario:* Given a game about to start, when it starts, then every player sees the start tile in
the middle of the board.

**FR-74.** The game screen shall let the player pan and zoom the board.

*Scenario:* Given a board larger than the window, when Ana drags and zooms out, then she can see
all of it.

**FR-75.** While a player has picked a tile from their hand on their turn, the game screen shall
highlight every space where the tile fits in its current rotation, and let them choose only those.

*Scenario:* Given it's Ana's turn and she picks a tile, when she rotates it, then the highlighted
spaces change to where it fits now, and clicking anywhere else does nothing.

**FR-76.** When a player has laid a tile, the game screen shall offer the features of that tile
they may deploy onto, and a way to skip.

*Scenario:* Given Ana lays a tile whose road already holds Ben's rider, when the deploy choice
appears, then it offers the tile's other features but not that road.

**FR-77.** While the game is waiting for a player's garrison choice, the game screen shall prompt
that player to choose.

*Scenario:* Given a bastion holding Ana's judge is finished, when garrisons are chosen, then Ana
sees a prompt to leave a judge or not.

**FR-78.** While a player's hand is stuck on their turn, the game screen shall tell them so and let
them choose a tile to discard.

*Scenario:* Given none of Ana's tiles fit, when her turn starts, then she sees a message saying
her hand is stuck, and can pick which tile to discard.

**FR-79.** The game screen shall show every player's score, enforcers in supply, and tiles in hand.

*Scenario:* Given a game in progress, when any player looks at the score panel, then they see each
player's score, enforcers in supply and number of tiles held.

**FR-80.** The game screen shall show whose turn it is.

*Scenario:* Given it's Ben's turn, when Ana looks at the game screen, then it shows that it's Ben's
turn.

**FR-81.** The game screen shall show the three bounties in play, and who has claimed each one.

*Scenario:* Given Ana claimed Lockdown, when any player looks at the bounties, then Lockdown shows
Ana as its claimer, and the other two show as unclaimed.

**FR-82.** When a feature is scored, the game screen shall show every player what was scored and
who got the points, including garrison bonuses and bounties.

*Scenario:* Given Ana's tile finishes a road ending at Ben's garrisoned bastion, when it's scored,
then every player sees Ana's points for the road and Ben's 2 bonus points.

**FR-83.** When the game ends, the game screen shall show each player's points by category, and the
winner or winners.

*Scenario:* Given the game has ended, when the end screen appears, then each player's points from
bastions, roads, outposts, garrison bonuses, bounties and wastelands are listed, with the winner
named.
