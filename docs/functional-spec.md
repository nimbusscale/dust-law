# Functional spec

The functional spec: what the app should do, in the user's terms. Requirements are in GEARS, with
`FR` IDs. It never links to other docs. Other docs, prompts and code point to its IDs.

Dust Law is a tile-laying game played in the browser. Players build the wastes one tile at a time
and send enforcers to claim what they build.

## F-SEC-1. Terms

### People and games

**App.** The Dust Law software that players use in their browsers.

**Game.** One play of Dust Law, from the moment a host creates it to its end screen.

**Player.** A person who has joined a game. The host is a player too.

**Host.** The player who created a game.

**Invite.** What a host shares so that others can join their game, such as a link or a short
code.

### Tiles and the board

**Tile.** A square showing part of the wastes, which players lay in a space on the board.

**Board.** The grid of spaces that tiles are laid on.

**Space.** One square of the board. It's either empty or holds one tile.

**Edge.** One of the four outer lines of a tile, or of a space: north, east, south or west.

**Neighbor.** A space that shares an edge with a given space, or the tile in that space. Spaces
that touch only at a corner aren't neighbors.

**Surrounding spaces.** The eight spaces around a space: its four neighbors, and the four spaces
that touch it only at a corner.

**Start tile.** The tile the app puts on the board when a game starts, before anyone lays one.

**Game length.** The number of tiles per player that a game uses.

**Tile supply.** The number of tiles still left to deal in a game.

**Hand.** The tiles a player holds and can lay.

**Fit.** A tile fits a space when laying it there, in at least one rotation, follows FR-36, FR-37
and FR-38.

**Stuck hand.** A hand in which no tile fits any space on the board.

### Terrain and features

**Terrain.** The four kinds of land a tile shows: bastion, road, outpost and wasteland. Each edge
of a tile shows one terrain.

**Bastion.** A walled settlement. A bastion can spread across many tiles.

**Wall.** The line between a bastion and the land around it.

**Road.** A route across the wastes. A road can run across many tiles.

**Gate.** A place where a road ends at a bastion.

**Junction.** A point inside a tile where three or four roads end.

**Outpost.** A lone station that fills its whole tile. An outpost tile shows outpost on all four
edges and has nothing else on it.

**Wasteland.** Open ground between the other terrain.

**Piece.** One connected stretch of one terrain on one tile. A tile can hold two pieces of the
same terrain that don't touch on that tile, such as two separate bits of bastion.

**Feature.** One bastion, road, outpost or wasteland as a whole: a piece, plus every piece joined
to it across tiles (FR-20).

**Border.** A wasteland borders a bastion when a piece of the wasteland and a piece of the bastion
meet along a wall on some tile.

**Finished.** A bastion, road or outpost that meets its finishing requirement (FR-47, FR-48,
FR-49).

**Feature scoring.** Working out control of a finished feature and giving out its points
(F-SEC-8).

**Score points from.** A player scores points from a feature when they receive at least 1 point
from that feature's own feature scoring.

### Enforcers and hostiles

**Enforcer.** One of a player's tokens, which they deploy on features to claim them.

**Deploy.** Place an enforcer from the enforcer supply on the board.

**Enforcer supply.** A player's enforcers that aren't on the board.

**Judge.** An enforcer in a bastion.

**Rider.** An enforcer on a road.

**Warden.** An enforcer on an outpost.

**Ranger.** An enforcer in a wasteland.

**Hostile.** A neutral marker on a tile that competes with players for control of the feature it's
in. There are three kinds: gang stronghold, raider camp and mutant warren.

**Gang stronghold.** A hostile in a bastion.

**Raider camp.** A hostile on a road.

**Mutant warren.** A hostile in a wasteland.

**Side.** A player, or the hostile side, when control of a feature is worked out.

**Hostile side.** The neutral side that a feature's hostiles count for when control is worked out
(F-SEC-9).

**Control.** Which sides take a feature's points when it's scored (F-SEC-9).

**Garrison.** A judge that a player leaves behind in a finished bastion (F-SEC-10).

**Garrisoned bastion.** A bastion that holds at least one garrison.

**Road bonus.** Points a garrison's owner scores when a road that ends at the garrisoned bastion
is scored (F-SEC-10).

**Bounty.** A goal that any player can race to meet for points (F-SEC-11).

**Bounty in play.** A bounty picked for the game that no player has claimed yet.

**Claim.** A player claims a bounty when they meet it while it's a bounty in play.

### Turns

**Turn.** One player's go, made of the turn steps (FR-30).

**Turn order.** The order in which players take turns.

**Round.** One turn for each player, in turn order.

**Score category.** One of the six groups that a player's points are shown in at the end of a
game: bastions, roads, outposts, road bonuses, bounties and wastelands.

## F-SEC-2. Limits

**FR-1.** The app shall let a game have only 2 to 5 players, so the host can't start it with fewer
and no more than 5 can join, even before it starts.

**FR-2.** The app shall seat only people in a game, not computer opponents.

**FR-3.** The app shall let a person join a game only through that game's invite, not through
matchmaking.

**FR-4.** The app shall let a person join a game only before it starts, not after.

**FR-5.** The app shall let each player play only from their own browser, over the network, not
by sharing a browser with another player.

**FR-6.** The app shall lay out its screens only for desktop browsers, not for phone screens.

**FR-7.** The app shall show the game only with the tiles, enforcers and hostiles it renders
itself, not with other artwork or animation.

## F-SEC-3. Setting up a game

**FR-8.** When a player creates a game, the app shall give the host an invite to share.

**FR-9.** When the host sets up a game, the app shall let the host pick a game length from 10 to
40 tiles per player.

**FR-10.** While the host hasn't picked a game length, the app shall use a game length of 20.

**FR-11.** When the app turns a person away from a game, the app shall tell them why, such as
"This game is full" or "This game has already started."

**FR-12.** The app shall let only the host start a game.

**FR-13.** The app shall run several games at the same time, each separate from the others.

**FR-14.** When a game starts, the app shall set its tile supply to the game length times the
number of players.

For example, the default game length gives a tile supply of 40 for 2 players and 100 for 5.

**FR-15.** When a game starts, the app shall put a start tile on the board that shows only
wasteland and carries no hostile.

**FR-16.** The start tile shall be extra, not taken from the tile supply.

**FR-17.** When a game starts, the app shall give each player 7 enforcers.

**FR-18.** When a game starts, the app shall give each player a total of 0 points.

**FR-19.** When a game starts, the app shall deal each player a hand of 3 tiles.

## F-SEC-4. Tiles and the board

**FR-20.** When a tile is laid, the app shall join each piece on it to each piece of the same
terrain that it meets across a shared edge, into one feature.

**FR-21.** The board shall have no fixed size, and grow in every direction as tiles are laid.

*Why:* the app can always create a tile that fits (FR-22) because some empty space always has only
one neighbor with a tile in it, such as the space just above the topmost tile. A board with a
fixed size can run out of such spaces.

**FR-22.** When the app deals a player a tile, the app shall create it then, as a tile that fits at
least one space on the board at that moment.

**FR-23.** When the app deals a player a tile, the app shall take it from the tile supply.

**FR-24.** While the tile supply is empty, the app shall deal no tiles.

**FR-25.** The app shall create only tiles that carry at most one hostile.

**FR-26.** The app shall create only tiles on which every road that ends inside the tile ends at a
junction or a gate.

**FR-27.** The app shall create only tiles on which every road and every wall splits the
wasteland beside it into separate pieces.

**FR-28.** When a road edge touches an outpost tile, the app shall end the road at that outpost.

**FR-29.** When a tile that carries a hostile is laid, the app shall add the hostile to the
feature that its piece joins.

## F-SEC-5. Turns

**FR-30.** The app shall run each turn in five steps, in this order: the lay step, the deploy
step, the scoring step, the bounty step and the draw step.

**FR-31.** When a game starts, the app shall pick a random turn order and keep it for the rest of
the game.

**FR-32.** While it's a player's turn, the app shall let only that player lay or discard a tile or
deploy an enforcer.

**FR-33.** When a player's draw step comes, the app shall deal them one tile.

## F-SEC-6. Laying a tile

**FR-34.** When a player's lay step comes, the app shall let them lay any one tile from their hand.

**FR-35.** When a player lays a tile, the app shall let them rotate it to any of the four
directions first.

**FR-36.** When a player lays a tile, the app shall accept it only in an empty space that's a
neighbor of at least one tile on the board.

**FR-37.** When a player lays a tile, the app shall accept it only if each edge it shares with a
neighbor matches that neighbor's edge, as this table shows.

| This edge | Matches |
|---|---|
| Bastion | Bastion |
| Road | Road or outpost |
| Wasteland | Wasteland or outpost |
| Outpost | Road or wasteland |

**FR-38.** When a player lays an outpost tile, the app shall accept it only if none of its
surrounding spaces holds another outpost.

**FR-39.** While a player has a stuck hand, when their turn starts, the app shall tell them their
hand is stuck.

*Why:* a tile fits when it's dealt (FR-22), but the board changes before the player's next turn,
so a tile in a hand can stop fitting.

**FR-40.** While a player has a stuck hand, the app shall let them discard one tile of their
choice in place of laying one.

**FR-41.** When a player discards a tile, the app shall skip their deploy, scoring and bounty
steps, and go straight to their draw step.

**FR-42.** When a player discards a tile, the app shall show every player the tile they discarded.

## F-SEC-7. Deploying enforcers

**FR-43.** When a player's deploy step comes, the app shall let them deploy one enforcer onto one
piece of the tile they just laid, or skip the step.

**FR-44.** When a player deploys an enforcer, the app shall accept it only onto a feature with no
enforcer on it from any player, counting the whole feature, including the tile just laid.

A hostile on the feature doesn't count, even one on the tile just laid.

*Scenario:* Given two roads, each with a different player's rider, when a tile joins them into one
road, then that road holds both riders.

**FR-45.** While a player's enforcer supply is empty, the app shall skip their deploy step.

**FR-46.** The app shall give players no way to take their own enforcers back off the board.

## F-SEC-8. Finishing and scoring features

**FR-47.** When no bastion edge of any tile in a bastion faces an empty space, the app shall count
the bastion as finished.

**FR-48.** When each end of a road stops at a junction, a bastion or an outpost, or the road loops
back into itself, the app shall count the road as finished.

**FR-49.** When all eight surrounding spaces of an outpost hold tiles, the app shall count the
outpost as finished.

**FR-50.** The app shall never count a wasteland as finished.

**FR-51.** When a player's scoring step comes, the app shall score every bastion, road and outpost
that their tile finished.

*Scenario:* Given an outpost with seven of its surrounding spaces filled, when a player lays a
tile in the last one, a space that touches the outpost only at a corner, then the outpost is
scored in that turn.

**FR-52.** When a player's scoring step comes, the app shall finish all garrison choices
(F-SEC-10) before scoring any feature.

**FR-53.** When a bastion is scored, the app shall make it worth 2 points for each tile in it.

**FR-54.** When a road is scored, the app shall make it worth 1 point for each tile in it.

**FR-55.** When an outpost is scored, the app shall make it worth 1 point for each tile with no
bastion on it, among the outpost's own tile and the tiles in its surrounding spaces.

So an outpost with no bastion around it is worth 9 points, and one with three bastion tiles around
it is worth 6.

*Why:* an outpost pays for being remote, so any tile with even a sliver of bastion on it is worth
nothing.

*Scenario:* Given an outpost whose neighbor to the north has a bastion along its own north edge,
and whose north-east surrounding space holds a tile with bastion reaching right up to the
outpost's corner, and no other bastion is near, when the outpost is scored, then it's worth 7:
neither of those two tiles adds a point, even though wasteland lies between the first one's
bastion and the outpost.

**FR-56.** When the app counts the tiles in a feature, the app shall count each tile once, even if
the feature has more than one piece on it.

**FR-57.** When the app counts the tiles in a road that ends at an outpost, the app shall leave
out the outpost's tile.

**FR-58.** When a feature is scored, the app shall return every enforcer on it to its owner's
enforcer supply, except a garrison (FR-68).

*Scenario:* Given a road with one open end, when a player lays a tile that closes that end and
deploys a rider on it, then in the same turn the road is scored, the player gets its points and
the rider goes back to their enforcer supply.

## F-SEC-9. Control

**FR-59.** When a feature is scored, the app shall count as sides only the players with at least
one enforcer on it, plus the hostile side if the feature holds a hostile, counting one enforcer for
each hostile.

So a feature with no enforcers on it scores nothing, and a bastion with two gang strongholds gives
the hostile side two. A garrison can leave a hostile out of this count (FR-71).

**FR-60.** When a feature is scored, the app shall give its points to the side with the most
enforcers on it.

**FR-61.** When sides tie for the most enforcers on a feature, the app shall split its points
evenly among them, rounded down.

**FR-62.** The app shall give no points to the hostile side, so any points or share it wins are
lost.

*Scenario:* Given a bastion worth 10 points with 1 gang stronghold, when it's scored with 1 judge
of yours in it, then you tie with the hostile side and score 5.

*Scenario:* Given a bastion worth 10 points with 1 gang stronghold, when it's scored with 2 judges
of yours in it, then you win and score 10.

*Scenario:* Given a bastion worth 10 points with 1 gang stronghold, when it's scored with 1 judge
of yours and 1 of a rival's in it, then it's a three-way tie, and you each score 3.

*Scenario:* Given a bastion worth 10 points with 2 gang strongholds, when it's scored with 1 judge
of yours in it, then the hostile side wins and nobody scores.

## F-SEC-10. Garrisons

**FR-63.** When a bastion is finished, the app shall let each player with a judge in it leave one
of their judges there as a garrison, even if the hostile side wins the bastion.

**FR-64.** When a tile finishes one or more bastions, the app shall ask players for their garrison
choices in turn order, starting with the player whose turn it is.

**FR-65.** When a tile finishes several bastions, the app shall have each player decide on every
bastion they have a judge in before asking the next player.

**FR-66.** When a player makes a garrison choice, the app shall show it to every player right
away.

**FR-67.** When a garrisoned bastion is scored, the app shall count each of its garrisons as a
judge.

**FR-68.** The app shall keep each garrison on the board, out of its owner's enforcer supply, for
the rest of the game.

**FR-69.** When a road that ends at a garrisoned bastion is scored, the app shall give the owner
of each garrison in that bastion a road bonus of 2 points, on top of the road's own points.

The road bonus is paid even if the hostile side wins the road or no player has a rider on it.

**FR-70.** The app shall pay each garrison's road bonus at most once for each road, even if the
road ends at the garrisoned bastion at both ends.

**FR-71.** When the app works out control of a road that ends at a garrisoned bastion, or of a
wasteland that borders one, the app shall leave out one hostile on that feature for each garrison
whose owner has at least one enforcer on that feature.

The hostile is left out of the count for every side, but it stays on the feature.

*Scenario:* Given a road that ends at your garrisoned bastion and holds your rider and one raider
camp, when the road is scored, then the raider camp is left out and you score the road's full
points, not half.

*Scenario:* Given a road that runs between two bastions, each holding one of your garrisons, with
your rider and two raider camps on the road, when the road is scored, then both raider camps are
left out and you score the road's full points.

*Scenario:* Given a road that leaves a bastion holding one of your garrisons and loops back to it,
with your rider and two raider camps on the road, when the road is scored, then only one raider
camp is left out, so you tie with the hostile side and score half, rounded down.

*Scenario:* Given a tile that finishes both a bastion with your judge in it and a road that ends
at that bastion, with your rider and a raider camp on the road, when you leave your judge as a
garrison, then the road's raider camp is left out and you score the road's full points, plus a
road bonus, since garrison choices come before scoring.

## F-SEC-11. Bounties

**FR-72.** The app shall offer only the bounties in this table.

| Bounty | Condition | Points |
|---|---|---|
| Big Walls | The player scores points from a bastion of 6 or more tiles. | 6 |
| Long Haul | The player scores points from a road of 6 or more tiles. | 5 |
| Clean Sweep | The player scores points from a bastion that holds a gang stronghold. | 5 |
| Clear the Road | The player scores points from a road that holds a raider camp. | 4 |
| Frontier | Over the game, the player has scored points from two outposts. | 5 |
| Full Patrol | Over the game, the player has scored points from at least one bastion, one road and one outpost. | 6 |
| Lockdown | The player has two garrisons of their own on the board. | 5 |
| All Hands | At the end of the player's own scoring step, all of their enforcers are on the board, garrisons included. | 4 |

**FR-73.** When a game starts, the app shall pick 3 bounties at random to be in play, and leave
the rest out of that game.

**FR-74.** When a turn's scoring step is done, the app shall check every player against each
bounty in play.

*Scenario:* Given a rival with all of their enforcers on the board and All Hands in play, when your
scoring step is done, then the rival doesn't claim All Hands, since its condition looks only at the
end of the rival's own scoring step.

*Scenario:* Given Frontier in play and a player who has scored no outposts, when one tile finishes
two outposts and the player scores points from both, then the player claims Frontier, since
features scored in the same turn all count.

**FR-75.** When one or more players meet a bounty in play, the app shall take that bounty out of
play for the rest of the game.

**FR-76.** When one or more players meet a bounty in play, the app shall split its points evenly,
rounded down, among every player who met it in that turn.

**FR-77.** When the app checks a bounty for a player, the app shall count only that player's own
results, never adding them to another player's.

*Scenario:* Given Frontier in play, when you score points from one outpost and a rival scores
points from another, then neither of you has met Frontier.

*Scenario:* Given Long Haul in play and a road of 6 tiles that ends at your garrisoned bastion,
when the road is scored and a rival wins it, then you get the road bonus but don't meet Long Haul,
since the road bonus isn't part of the road's own feature scoring.

*Scenario:* Given Clear the Road in play and a road with a raider camp that a garrison leaves out
of the count, when you score points from that road, then you meet Clear the Road, since the raider
camp is still on the road.

## F-SEC-12. End of the game

**FR-78.** When every player's hand is empty, the app shall end the game.

*Scenario:* Given a game length of 20, when the tile supply runs out, then players keep taking
turns from their hands, every player gets exactly 20 turns, and all hands run out in the same
round, since every turn uses up one tile from the hand, whether laid or discarded.

**FR-79.** When the game ends, the app shall return every enforcer on an unfinished bastion, road
or outpost to its owner's enforcer supply, with no points for that feature.

**FR-80.** When the game ends, the app shall score each wasteland that holds at least one ranger,
worth 3 points for each finished bastion it borders.

A bastion counts whatever its size, even if the hostile side won it, and even if it holds a
garrison. One bastion can count for several wastelands. Control works as in F-SEC-9 and FR-71,
with mutant warrens as hostiles.

**FR-81.** When the game ends, the app shall make each player with the most points a winner, so
players tied for the most share the win.

## F-SEC-13. The game screen

**FR-82.** The app shall show each player the tiles in their own hand, and show other players only
how many tiles that hand holds.

**FR-83.** When any player acts, the app shall show the result to every player in the game without
a page refresh.

**FR-84.** The app shall let each player pan and zoom the board.

**FR-85.** When a game starts, the app shall center each player's view of the board on the start
tile.

**FR-86.** While a player has picked a tile in their hand, the app shall highlight every space the
tile fits in its current rotation.

**FR-87.** The app shall show every player a score panel with each player's total points, how many
enforcers are in their enforcer supply, how many tiles are in their hand, and whose turn it is.

**FR-88.** The app shall show every player the 3 bounties picked for the game, and who has
claimed each one.

**FR-89.** When the app gives a player points, the app shall show every player who got them and
what for, such as a finished feature, a road bonus or a bounty.

**FR-90.** When the game ends, the app shall show every player an end screen with each player's
points in each score category, and the winners.

**FR-91.** When a person opens the app in a phone browser, the app shall let them join and play a
game as in a desktop browser.
