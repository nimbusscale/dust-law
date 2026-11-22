# Functional spec

The functional spec: what the app should do, in the user's terms. Requirements are in GEARS, with
`FR` IDs. It never links to other docs. Other docs, prompts and code point to its IDs.

## F-SEC-1. Terms

- **Adjacent space.** One of the four spaces that share an edge with a given space.
- **App.** The Dust Law software: the pages players use in their browsers and the server behind
  them.
- **Bastion.** A walled settlement. A bastion can span many tiles.
- **Board.** The grid of spaces that a game's tiles are laid on.
- **Borders.** A wasteland borders a bastion when one of the wasteland's segments touches one of
  the bastion's segments on the same tile.
- **Bounty.** A goal that any player can race to meet for points (F-SEC-12).
- **Bounty in play.** A bounty that FR-19 picked for a game and that FR-83 hasn't taken out of
  play.
- **Claim.** To be the first to meet a bounty and take its points.
- **Control.** Which side takes a feature's points when it's scored (F-SEC-10).
- **Current player.** The player whose turn it is.
- **Deploy.** To put an enforcer from an enforcer supply on a segment of a tile.
- **Display name.** The name a player is shown by in a game.
- **Draw.** The app creating a new tile and adding it to a player's hand.
- **Edge.** One of the four straight boundaries of a tile: north, east, south or west.
- **Edge type.** What an edge shows: bastion, road, wasteland or outpost.
- **Empty space.** A space with no tile in it.
- **Ends at.** A road ends at a junction, a bastion or an outpost when one of its road segments
  stops there.
- **Enforcer.** One of a player's pieces, deployed to claim a feature.
- **Enforcer supply.** A player's enforcers that are not on the board.
- **Feature.** A bastion, road, outpost or wasteland, made of segments joined across tiles
  (F-SEC-5).
- **Final scoring.** The scoring done when the game ends (F-SEC-13).
- **Finish.** A tile finishes a feature when laying the tile makes that feature finished.
- **Finished.** Said of a bastion, road or outpost that meets its condition in F-SEC-9.
- **Fit.** A tile fits an empty space when, in at least one rotation, the rules in F-SEC-6 let it
  be laid there.
- **Game lifetime.** How long the app keeps a game.
- **Game setup.** The players and the tiles per player that the host chooses before starting a
  game.
- **Game.** One play of Dust Law, from its creation to its end, with its own players, board and
  points totals.
- **Garrison.** A judge that its owner left behind in a finished bastion (F-SEC-11).
- **Garrison bonus.** Points that a garrison's owner gets from a road (FR-76).
- **Gate.** A point inside a tile where a road segment ends at a bastion segment.
- **Hand.** The tiles a player holds, ready to lay.
- **Host.** The person who sets up a game.
- **Hostile.** A neutral marker on a tile: a gang stronghold in a bastion, a raider camp on a road,
  or a mutant warren in a wasteland.
- **Hostile chance.** The chance that a drawn tile carries a hostile.
- **Hostile side.** The neutral side made up of the hostiles on a feature when its control is
  worked out.
- **Junction.** A point inside a tile where three or four road segments end.
- **Lay.** To place a tile on the board.
- **Outpost.** A lone station.
- **Player.** A person taking part in a game.
- **Player color.** The color a player is given in a game.
- **Player link.** The web link that opens a game as one of its players.
- **Points total.** A player's total points in a game.
- **Reference orientation.** The way round a shape is written in the shape catalog, with north at
  the top.
- **Road.** A route across the wastes that runs from tile to tile.
- **Role.** What an enforcer is called, from the feature it's on: a judge in a bastion, a rider on
  a road, a warden on an outpost, or a ranger in a wasteland.
- **Rotation.** Which way round a tile is laid: as drawn, or rotated by 90°, 180° or 270°.
- **Score.** To work out control of a feature and award its points (F-SEC-10).
- **Segment.** One piece of a bastion, road, outpost or wasteland inside one tile. A tile can hold
  several segments, and each one is separate from the others on that tile.
- **Shape.** A tile layout: the edge type of each edge and the segments inside the tile.
- **Shape catalog.** The list of every shape the app can create, with each shape's weight.
- **Shape weight.** A number given to each shape in the shape catalog that sets how likely it is
  to be drawn.
- **Side.** A party in working out control of a feature: a player, or the hostile side.
- **Space.** One square of the board, which holds one tile or is empty.
- **Stuck hand.** A hand in which no tile fits any empty space on the board.
- **Surrounding spaces.** The eight spaces around a given space: its four adjacent spaces and the
  four spaces that touch it only at a corner.
- **Tile.** A square piece of the wastes.
- **Tile supply.** The number of tiles left to draw in a game.
- **Tiles per player.** The game length the host sets.
- **Turn.** One player's go.
- **Turn order.** The sequence in which players take turns.
- **Wasteland.** Open ground between the other features.

## F-SEC-2. Players and devices

**FR-1.** The app shall seat only people in a game, with no computer opponents.

**FR-122.** The app shall let each player play from their own browser.

**FR-2.** The app shall run several games at the same time, each separate from the others.

**FR-3.** The app shall be built and tested for desktop web browsers only, with no mobile app.

*Accepted gap:* phone browsers aren't blocked, but the game isn't designed or tested for them. It only
has to work for the small group that plays and tests it.

**FR-4.** When any player acts, the app shall show the result to every player in that game without
them reloading the page.

**FR-114.** The app shall carry only game actions between players, with no chat or other messages.

## F-SEC-3. Setting up a game

**FR-5.** When a person creates a game, the app shall make them its host.

**FR-123.** When a person creates a game, the app shall add them to its game setup as its first
player, with a display name and a player color they choose.

**FR-104.** While a game hasn't started, the app shall let its host add players to the game setup,
each with a display name and a player color.

**FR-124.** While a game hasn't started, the app shall let its host change the display name and
player color of any player in the game setup.

**FR-125.** While a game hasn't started, the app shall let its host remove any player from the game
setup except the host.

**FR-105.** The app shall let the host add a player only while the game has fewer than 5 players.

**FR-106.** The app shall accept a display name only if no other player in the same game has it.

**FR-107.** The app shall let the host pick each player color from a fixed set with enough colors
for 5 players.

**FR-126.** The app shall give each player color to at most one player in a game.

**FR-11.** The app shall let the host set the tiles per player to any whole number from 10 to 40.

**FR-12.** While the host hasn't set the tiles per player, the app shall use 20.

**FR-13.** While a game has from 2 to 5 players and hasn't started, the app shall let only its host
start it.

**FR-109.** When the host starts a game, the app shall show the host every player's player link,
with the host's own marked as theirs, only that once.

**FR-110.** The app shall give the host no controls over a game once it has started.

**FR-111.** The app shall let a person play in a game only through a player link, with no
matchmaking.

**FR-112.** When someone opens a player link, the app shall show them the game as that link's
player.

**FR-113.** When someone opens a player link that is already open somewhere else, the app shall
move the game to the newest place and tell the older one "This game was opened somewhere else."

## F-SEC-4. Starting a game

**FR-14.** When a game starts, the app shall set its tile supply to the tiles per player times the
number of players.

**FR-15.** When a game starts, the app shall lay the start tile on the empty board: a tile with
wasteland on all four edges, one wasteland segment covering the whole tile, and no hostile.

**FR-16.** When the app lays the start tile, the app shall leave the tile supply unchanged.

**FR-17.** When a game starts, the app shall give each player 7 enforcers.

**FR-18.** When a game starts, the app shall set each player's points total to 0.

**FR-19.** When a game starts, the app shall pick 3 of the bounties in FR-80 at random and show them
to every player.

**FR-20.** When a game starts, the app shall draw 3 tiles for each player as their starting hand.

**FR-21.** When a game starts, the app shall pick a turn order at random and keep it for the rest of
the game.

## F-SEC-5. Tiles and drawing

**FR-22.** The app shall make every tile one of the shapes in the shape catalog, in one of the four
rotations, carrying at most one hostile.

**FR-23.** Where a tile holds an outpost, the tile shall have the outpost edge type on all four
edges and hold no other segment.

**FR-24.** The app shall give an edge the outpost edge type only on a tile that holds an outpost.

**FR-25.** Where a road segment touches only one edge of its tile, the road segment shall end inside
the tile at a junction or a gate.

**FR-26.** Where a tile carries a hostile, the hostile shall sit in exactly one of the tile's
segments.

**FR-27.** When a player rotates a tile, the app shall move everything on it together: its edges,
its segments and any hostile.

**FR-28.** When a tile is laid, the app shall join each of its bastion segments and road segments
with the segment that covers the same shared edge on the adjacent tile, so that both are part of
one feature.

**FR-29.** When a tile is laid, the app shall join each of its wasteland segments with the
wasteland segments it meets across a shared edge, never across a road, a bastion or an outpost.

**FR-30.** When a tile is laid so that a road edge touches an outpost, the app shall end the road at
that outpost.

**FR-31.** Where a tile carries a hostile, the app shall count the hostile as part of whatever
feature the hostile's segment is part of.

**FR-32.** When the app draws a tile, the app shall pick its shape only from the shapes that fit
some empty space on the board at that moment.

**FR-33.** When the app draws a tile, the app shall pick among the shapes that fit at random, giving
each a chance in proportion to its shape weight.

**FR-34.** When the app draws a tile whose shape has a bastion, road or wasteland segment, the app
shall give the tile a hostile with a chance equal to the hostile chance.

**FR-35.** When a drawn tile gets a hostile, the app shall pick the hostile's kind at random, with
equal chance, from the kinds that the shape has a segment for.

**FR-36.** When a drawn tile gets a hostile, the app shall put it in one segment of the matching
kind, picked at random with equal chance.

**FR-37.** When the app draws a tile, the app shall add it to the player's hand in its reference
orientation.

**FR-38.** When the app draws a tile, the app shall take one tile from the tile supply.

## F-SEC-6. Laying a tile

**FR-40.** While it's a player's turn, the app shall let them pick any tile from their hand, rotate it
to any of the four rotations, and lay it.

**FR-41.** The app shall let a player lay a tile only in an empty space that has at least one
adjacent space holding a tile.

**FR-42.** The app shall let a player lay a tile only where each edge it shares with an adjacent
tile can touch that tile's edge, as this table shows.

| Edge type | Can touch |
|---|---|
| bastion | bastion |
| road | road, outpost |
| wasteland | wasteland, outpost |
| outpost | road, wasteland |

**FR-43.** The app shall let a player lay a tile that holds an outpost only where none of the
surrounding spaces holds an outpost.

*Scenario:* Given an outpost on the board, when a player lays a tile with a bastion segment in a
space that touches the outpost only at a corner, then the app allows it.

**FR-44.** The board shall grow in every direction as tiles are laid, with no boundary and no
fixed size.

*Why:* FR-32 can always find a shape that fits only because there is always an empty space with
just one adjacent tile, such as the space above the topmost tile. A board with a boundary could
run out of such spaces.

## F-SEC-7. Turns

**FR-45.** The app shall run each turn in the steps this table shows, in this sequence.

| Step | What happens |
|---|---|
| 1. Lay | The current player lays a tile from their hand (F-SEC-6). |
| 2. Deploy | The current player may deploy an enforcer on that tile (F-SEC-8). |
| 3. Garrisons | Players choose any new garrisons (F-SEC-11). |
| 4. Scoring | The app scores what the tile finished (FR-59). |
| 5. Bounties | The app checks the bounties (F-SEC-12). |
| 6. Draw | The app draws one tile for the current player, if the tile supply isn't zero. |

**FR-46.** While the current player's hand is stuck, the app shall tell them so.

**FR-47.** While the current player's hand is stuck, the app shall have them discard one tile of
their choice in place of the steps in FR-45.

**FR-48.** When a player discards a tile, the app shall show that tile to every player.

**FR-49.** While the tile supply isn't zero, when a player discards a tile, the app shall draw one
tile for them.

**FR-50.** When a player discards a tile, the app shall end their turn, with no tile laid and no
enforcer deployed.

**FR-51.** While any player holds a tile, when a turn ends, the app shall start the turn of the next
player in turn order.

**FR-115.** While the app is waiting for a player's choice, the app shall keep waiting with no time
limit, whether or not that player has the game open.

**FR-120.** The app shall give players no way to undo a lay, a deploy or a garrison choice.

**FR-121.** The app shall end each turn on its own once the turn's last choice is made, with no
confirm or end-turn step.

*Why:* games should play fast, with nobody waiting on a player who hasn't pressed a button.

## F-SEC-8. Deploying enforcers

**FR-52.** When a player has laid a tile, the app shall let them deploy one enforcer from their
enforcer supply on one segment of that tile, or skip.

**FR-53.** The app shall let a player deploy an enforcer only on a feature with no enforcer on it,
counting the whole feature across every tile it spans, after the laid tile has joined it.

*Scenario:* Given a player lays a tile whose road segment carries a raider camp and joins no road
with an enforcer on it, when they deploy, then they can put a rider on that road.

*Scenario:* Given two roads that each have a rider on them, when a tile joins them into one road,
then the joined road holds both riders.

**FR-54.** While a player's enforcer supply is empty, the app shall skip their deploy step.

**FR-55.** The app shall give players no way to pick up a deployed enforcer.

## F-SEC-9. Finishing features

**FR-56.** When no edge covered by any of a bastion's segments faces an empty space, the app shall
treat the bastion as finished.

**FR-57.** When no edge covered by any of a road's segments faces an empty space, the app shall
treat the road as finished.

**FR-58.** When all eight surrounding spaces of an outpost hold tiles, the app shall treat the
outpost as finished.

**FR-59.** When a turn's scoring step comes, the app shall score every bastion, road and outpost that
the turn's laid tile finished, including an outpost that the tile touches only at a corner.

**FR-60.** The app shall score a wasteland only in final scoring, never during play.

## F-SEC-10. Control and points

**FR-61.** When the app scores a feature, the app shall work out its points as this table shows.

| Feature | Points |
|---|---|
| Bastion | 2 for each tile in the bastion |
| Road | 1 for each tile in the road |
| Outpost | 1 for each tile with no bastion segment on it, among the outpost's tile and the tiles in its surrounding spaces |
| Wasteland | 3 for each finished bastion the wasteland borders |

**FR-62.** When the app counts the tiles in a bastion or a road, the app shall count each tile once,
even when the feature has more than one segment on it.

**FR-63.** Where a road ends at an outpost, the app shall leave the outpost's tile out of the road's
tile count.

**FR-64.** When the app works out control of a feature, the app shall let a player take part as a
side only if they have at least one enforcer on the feature.

**FR-65.** When the app works out control of a feature, the app shall give each side a count: for a
player, the number of their enforcers on the feature, and for the hostile side, the number of
hostiles on it that no garrison cancels (FR-78).

**FR-66.** Where one player's count is higher than every other side's, the app shall award that
player all of the feature's points.

**FR-67.** Where the hostile side's count is higher than every other side's, the app shall award the
feature's points to no one.

**FR-68.** Where two or more sides tie for the highest count, the app shall split the feature's
points evenly among them, rounded down, and award the hostile side's share to no one.

*Scenario:* Given a bastion worth 10 points with one judge of yours, one judge of a rival's and one
gang stronghold, when it's scored, then you and the rival each get 3 points.

**FR-69.** When the app has scored a feature, the app shall return every enforcer on it to its
owner's enforcer supply, except a garrison.

*Scenario:* Given a player who deploys a rider on a road that their tile just finished, when the
road is scored, then the rider goes back to their enforcer supply in that same turn.

## F-SEC-11. Garrisons

**FR-70.** When a tile finishes a bastion, the app shall let each player with a judge in it leave
one of their judges there as a garrison, before the bastion is scored and whichever side ends up
controlling it.

**FR-71.** When the app asks players about garrisons, the app shall ask one player at a time, in
turn order, starting with the current player.

**FR-72.** Where one tile finishes several bastions, the app shall have each player decide on every
bastion they have a judge in before it asks the next player.

**FR-73.** When a player decides on a garrison, the app shall show their choice to every player.

**FR-74.** When the app scores a bastion, the app shall count each garrison in it as a judge of the
garrison's owner.

**FR-75.** The app shall keep each garrison on the board for the rest of the game, never returning
it to its owner's enforcer supply.

**FR-76.** When a road is scored, the app shall award a garrison bonus of 2 points to the owner of
each garrison in each bastion the road ends at, once per garrison, whoever controls the road and
even when no player has an enforcer on it.

*Scenario:* Given a road that leaves a bastion holding one garrison and loops back to the same
bastion, when the road is scored, then the garrison's owner gets one garrison bonus of 2 points.

**FR-77.** The app shall award a garrison bonus only for a road scored after the garrison was left.

*Scenario:* Given a tile that finishes both a bastion and a road that ends at it, when a player
leaves a garrison in the bastion, then that player gets a garrison bonus for the road.

**FR-78.** When the app works out control of a road or a wasteland, the app shall cancel one hostile
for each garrison whose bastion the road ends at or the wasteland borders, and whose owner has at
least one enforcer on that road or in that wasteland.

*Scenario:* Given a road that leaves a bastion holding one garrison and loops back to it, with the
garrison owner's rider and two raider camps on it, when the road is scored, then one raider camp
is cancelled and the garrison owner ties with the hostile side.

## F-SEC-12. Bounties

**FR-79.** When a turn's bounty step comes, the app shall check every bounty in play for every
player, except All Hands, which it checks only for the current player.

*Scenario:* Given Frontier in play and a player who has never got points from an outpost, when one
tile finishes two outposts that the player controls, then the player claims Frontier that turn.

**FR-80.** The app shall offer the bounties in this table.

| Bounty | Condition | Points |
|---|---|---|
| Big Walls | The player has got points from a scored bastion of 6 or more tiles. | 6 |
| Long Haul | The player has got points from a scored road of 6 or more tiles. | 5 |
| Clean Sweep | The player has got points from a scored bastion that holds a gang stronghold. | 5 |
| Clear the Road | The player has got points from a scored road that holds a raider camp. | 4 |
| Frontier | The player has got points from at least two scored outposts. | 5 |
| Full Patrol | The player has got points from at least one scored bastion, one scored road and one scored outpost. | 6 |
| Lockdown | The player has at least two garrisons of their own on the board. | 5 |
| All Hands | All of the player's enforcers are on the board, garrisons included. | 4 |

**FR-81.** Where one player meets a bounty in play in a bounty step, the app shall award that
player the bounty's points.

**FR-82.** Where two or more players meet the same bounty in play in the same bounty step, the
app shall split its points evenly among them, rounded down.

**FR-83.** When a bounty is claimed, the app shall take it out of play for the rest of the game.

**FR-84.** When the app checks a bounty for a player, the app shall count only that player's own
results, never results pooled with other players.

**FR-85.** When the app checks whether a player got points from a scored feature, the app shall
count the feature only if the player got at least 1 point from the feature's own scoring, not
counting garrison bonuses.

**FR-86.** When the app checks Clear the Road, the app shall treat a raider camp that a garrison
cancelled as still on the road.

## F-SEC-13. End of the game

**FR-87.** When a turn ends with every hand empty, the app shall end the game.

*Scenario:* Given 3 players and 10 tiles per player, when the game ends, then each player has had
exactly 10 turns.

**FR-88.** When the game ends, the app shall return the enforcers on each unfinished bastion, road
and outpost to their owners without awarding points.

**FR-89.** When the game ends, the app shall score each wasteland that holds at least one ranger.

**FR-90.** When the app counts the finished bastions a wasteland borders, the app shall count every
one, whoever controlled it, whether or not it holds a garrison, and even when it also counts for
another wasteland.

**FR-91.** When final scoring is done, the app shall declare as winners every player with the
highest points total.

## F-SEC-14. Game screen

**FR-92.** The app shall show tiles rendered in code only, with no other art and no animation.

**FR-93.** The app shall let each player pan and zoom their view of the board.

**FR-94.** When a game starts, the app shall center each player's view of the board on the start
tile.

**FR-128.** The app shall show every player each tile on the board with any hostile on it, and each
deployed enforcer, with garrisons marked as garrisons.

**FR-127.** The app shall show each player's display name and enforcers in their player color.

**FR-95.** The app shall show each player the tiles in their own hand, and never the tiles in
another player's hand.

**FR-97.** While a player has picked a tile, the app shall highlight every empty space where the
rules in F-SEC-6 let the tile be laid in its current rotation.

**FR-98.** The app shall let a player choose only a highlighted space to lay a picked tile.

**FR-129.** When the app rejects a choice a player made, the app shall tell them it isn't allowed and
let them make that choice again.

**FR-99.** When a player has laid a tile, the app shall show them the segments of that tile they may
deploy on, with a choice to skip.

**FR-100.** The app shall show every player, at all times, each player's points total, the number
of enforcers in their enforcer supply, the number of tiles in their hand, and whose turn it is.

**FR-101.** The app shall show every player the game's bounties and who has claimed each one.

**FR-102.** When the app awards points for a feature, a garrison bonus or a bounty, the app shall
show every player what was scored and the points each player got.

**FR-103.** When the game ends, the app shall show every player an end screen with the winners and
each player's points in each of these categories: bastions, roads, outposts, garrison bonuses,
bounties and wastelands.

**FR-118.** While a game has ended and the app still holds it, the app shall show its end screen to
anyone who opens one of its player links.

**FR-119.** The app shall show the final board on the end screen.

**FR-130.** The app shall show the host on every screen the way it shows any other player, with
nothing that marks them as the host.

## F-SEC-15. Game lifetime

**FR-116.** When a game's lifetime has passed since the host started it, the app shall remove the
game, whether or not it has ended, without telling anyone.

**FR-117.** When someone opens a player link for a game the app doesn't hold, the app shall tell
them the game is no longer available, and that it may have timed out or the server may have
restarted.
