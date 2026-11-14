# Functional spec

## F-SEC-1. Terms

- **Tile.** A square piece of the board. Each edge of a tile is bastion, road, wasteland or outpost.
- **Board.** The tiles laid so far.
- **Space.** A place on the board where a tile is or could be.
- **Fit.** A tile fits a space in a rotation when laying it there, turned that way, meets FR-24 and
  FR-25. A tile fits the board when it fits some space in some rotation.
- **Stuck hand.** A hand where no tile fits the board.
- **Start tile.** The tile the board begins with (FR-9).
- **Feature.** One bastion, road, outpost or wasteland, taken whole, across every tile it spans.
- **Bastion.** A walled settlement, which can span several tiles.
- **Road.** A route across the wastes.
- **Outpost.** A lone station that fills its whole tile.
- **Wasteland.** Open ground between everything else.
- **Junction.** A point in the middle of a tile where three or four roads meet.
- **Gate.** A place where a road ends at a bastion.
- **Border.** A wasteland borders a bastion when the two touch on at least one tile.
- **Enforcer.** One of a player's pieces. It takes its role from the feature it's on: a **judge** in
  a bastion, a **rider** on a road, a **warden** on an outpost, or a **ranger** in a wasteland.
- **Supply (of enforcers).** A player's enforcers that aren't on the board.
- **Deploy.** Place an enforcer from your supply onto a feature (F-SEC-9).
- **Hostile.** A neutral force that sits in one feature of a tile: a **gang stronghold** in a
  bastion, a **raider camp** on a road, or a **mutant warren** in a wasteland. A tile with one is a
  **hostile tile**.
- **The hostiles.** All the hostiles on one feature, counted together as one neutral side.
- **Side.** When control of a feature is worked out, a player with a count of at least 1 on it, or
  the hostiles if their count is at least 1.
- **Count.** When control of a feature is worked out, a player's count is the number of their
  enforcers on it, and the hostiles' count is the number of hostiles on it.
- **Control.** Which side takes a scored feature's points (F-SEC-12).
- **Tile supply.** How many tiles are left to deal in a game.
- **Hand.** The tiles a player holds.
- **Host.** The player who created the game. The host is one of the game's players.
- **Turn order.** The order players take turns in.
- **Round.** One turn for each player, in turn order, starting with the first player in turn order.
- **Step.** One of the parts of a turn (FR-20), named for what happens in it, such as the draw step.
- **Garrison.** A judge left behind in a finished bastion (F-SEC-13).
- **Bounty.** A goal any player can race to meet, for points (F-SEC-14).
- **Claim (a bounty).** Be the player who gets a bounty's points (F-SEC-14).
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

**FR-2.** When a game is created, the game shall give the host a link or a short code for it.

**FR-87.** While a game hasn't started and has fewer than 5 players, when a player opens its link or
enters its code, the game shall add them to that game.

**FR-3.** While a game hasn't started, the game shall let the host set the number of tiles per
player.

**FR-4.** While the host hasn't set the number of tiles per player, the game shall use 20 tiles per
player.

**FR-5.** When a game starts, the game shall set the tile supply to the number of tiles per player
times the number of players.

**FR-6.** While a game hasn't started and has 2 to 5 players, the game shall let the host start
it.

**FR-7.** While a game has 5 players, the game shall refuse more players.

**FR-8.** While a game has started, the game shall refuse new players.

## F-SEC-4. Starting a game

**FR-9.** When a game starts, the game shall place a start tile that is all one wasteland, with no
hostile, at the center of the board, without taking it from the tile supply.

**FR-10.** When a game starts, the game shall give each player 7 enforcers and a score of 0.

**FR-11.** When a game starts, the game shall pick 3 bounties at random from the list in FR-64.

**FR-12.** When a game starts, the game shall deal each player 3 tiles as their starting hand.

**FR-13.** When a game starts, the game shall pick a random turn order that holds for the rest of
the game.

## F-SEC-5. Drawing tiles

**FR-14.** When the game deals a tile, the game shall create a new tile that fits the board at that
moment.

**FR-15.** When the game deals a tile, the game shall take it from the tile supply.

**FR-16.** While the tile supply is zero, the game shall deal no tiles.

**FR-85.** While the tile supply isn't zero, when a player's draw step runs, the game shall deal
them tiles until they hold three.

**FR-17.** The game shall put at most one hostile on a tile.

**FR-18.** The game shall never put a hostile on an outpost tile.

**FR-19.** While a tile is in a player's hand, the game shall let that player rotate it to any of
the four directions.

## F-SEC-6. Taking a turn

**FR-20.** The game shall run each turn as five steps, in this order: lay a tile, deploy an
enforcer, score, check bounties, draw.

**FR-21.** While it's a player's turn, the game shall refuse a tile laid, a tile discarded or an
enforcer deployed by any other player.

**FR-22.** When a player's draw step ends, the game shall pass the turn to the next player in turn
order.

## F-SEC-7. Laying a tile

**FR-23.** When a player lays a tile, the game shall accept only a tile from that player's hand.

**FR-24.** When a player lays a tile, the game shall accept only an empty space that shares at
least one edge with a tile on the board.

**FR-25.** When a player lays a tile, the game shall accept it only if every edge it shares with a
neighbor is a pair that may touch, as listed below.

| This edge | May touch |
|---|---|
| bastion | bastion |
| road | road, outpost |
| wasteland | wasteland, outpost |
| outpost | road, wasteland |

**FR-26.** When a hostile tile is laid, the game shall count its hostile as part of the feature it
sits in.

## F-SEC-8. Stuck hands

**FR-27.** While a player's hand is stuck, when their turn starts, the game shall have them discard
one tile of their choice, in place of laying a tile.

**FR-28.** When a player discards, the game shall show the discarded tile to every player.

**FR-29.** When a player discards, the game shall skip their deploy, scoring and bounty steps, and
go straight to their draw step.

## F-SEC-9. Deploying an enforcer

**FR-30.** When a player has laid a tile, the game shall let them deploy one enforcer from their
supply onto one feature of that tile, or skip.

**FR-31.** When a player deploys, the game shall refuse a feature that already holds an enforcer,
counting the whole feature across every tile after the new tile has joined it.

**FR-32.** When a player deploys, the game shall allow a feature that holds hostiles and no
enforcer, including a hostile on the tile just laid.

**FR-33.** While a player has no enforcers in their supply, the game shall skip their deploy step.

**FR-34.** The game shall keep each enforcer on its feature until that feature is scored.

## F-SEC-10. Features

**FR-35.** When a tile is laid, the game shall join each feature on it with the same kind of
feature on each neighbor across every shared edge, including the wasteland on each side of a shared
road edge.

*Scenario:* Given Ana's judge in a bastion and Ben's judge in a second bastion, when Cy lays a tile
that connects the two, then they're one bastion holding both judges, even though FR-31 would have
refused a second judge deployed into it.

**FR-36.** The game shall treat wasteland on opposite sides of a road, an outpost or a bastion wall
as separate wastelands.

**FR-37.** When a bastion's walls are closed all the way around, with no open edge left, the game
shall count it as finished.

**FR-38.** When both ends of a road stop, the game shall count it as finished.

**FR-39.** The game shall stop a road at a junction, at a gate, or at an outpost.

**FR-40.** When a road closes into a loop, the game shall count it as finished.

**FR-41.** When all eight spaces around an outpost hold tiles, the game shall count it as finished.

**FR-42.** The game shall never count a wasteland as finished.

## F-SEC-11. Scoring

**FR-43.** When a player's scoring step runs, the game shall score every bastion, road and outpost
that the tile they laid that turn finished.

**FR-44.** When a bastion is scored, the game shall value it at 2 points per tile it covers.

**FR-45.** When a road is scored, the game shall value it at 1 point per tile it covers.

**FR-46.** When an outpost is scored, the game shall value it at 1 point for each tile, among the
outpost tile and its eight neighbors, that has no bastion on it, not even part of one.

**FR-47.** The game shall count each tile once in a feature's size, even when the feature crosses
that tile in two pieces that don't touch on it.

**FR-49.** When a feature is scored, the game shall return every enforcer on it to its owner's
supply, except judges left as garrisons.

## F-SEC-12. Control and ties

**FR-50.** When a feature is scored, the game shall give its points to the side with the highest
count on it.

**FR-51.** When sides tie for the highest count on a scored feature, the game shall split its points
evenly among every tied side, the hostiles included, rounded down.

**FR-52.** When the hostiles tie for the highest count on a scored feature, the game shall give
their share to nobody.

**FR-53.** When the hostiles alone have the highest count on a scored feature, the game shall give
its points to nobody.

## F-SEC-13. Garrisons

**FR-54.** When a bastion is finished, the game shall let each player with a judge in it leave one
of their judges behind as a garrison, whoever took the bastion's points.

**FR-55.** When a finished bastion holds judges from more than one player, the game shall ask each
of them about a garrison in turn order, starting with the player whose turn it is.

**FR-56.** The game shall keep a garrisoned judge on the board, out of its owner's supply, for the
rest of the game.

**FR-57.** When a road is finished, the game shall give 2 bonus points to the owner of each
garrison in each bastion the road ends at, whoever takes the road's points.

**FR-58.** When one tile finishes a bastion and a road that ends at it, the game shall settle the
bastion's garrisons before it pays the road bonus.

**FR-59.** While a garrison's owner has an enforcer on a road ending at the garrisoned bastion, or
in a wasteland bordering it, the game shall leave one hostile on that feature out of the hostiles'
count, for each such garrison.

**FR-60.** While the game is waiting for a garrison choice, the game shall accept that choice from
the player it asked, even when it's not their turn.

## F-SEC-14. Bounties

**FR-61.** When a turn's scoring step is done, the game shall give an unclaimed bounty's points to
any player who now meets its condition.

**FR-62.** When a bounty is claimed, the game shall take it out of play.

**FR-63.** When two or more players meet the same bounty in the same turn, the game shall split its
points among them, rounded down.

**FR-64.** The game shall judge each bounty by its condition and points in this list.

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

*Scenario:* Given All Hands is in play, and Ana has one garrison and five other enforcers on the
board, when she lays a tile that finishes a road and deploys her last rider on it, then the road is
scored and the rider returns to her supply (FR-49) before bounties are checked, so she doesn't
claim All Hands.

## F-SEC-15. End of the game

**FR-65.** When the tile supply reaches zero, the game shall finish the current round and then end.

*Why:* everyone gets the same number of turns, even when the tile supply runs out partway through a
round.

**FR-66.** When the game ends, the game shall score unfinished bastions, roads and outposts at
nothing.

**FR-67.** When the game ends, the game shall score each wasteland that holds at least one ranger,
valuing it at 3 points for each finished bastion it borders, whatever that bastion's size, who took
its points, whether it holds a garrison, or how many other wastelands it borders.

**FR-68.** When the game ends, the game shall declare every player tied for the most points a
winner.

## F-SEC-16. Playing over the network

**FR-69.** The game shall let each player play from their own browser, over a network.

**FR-70.** The game shall show each player their own hand and no other player's.

**FR-72.** When any player acts, the game shall show the result to every player in that game,
without a page refresh.

**FR-73.** The game shall run several games at once, each kept fully apart from the others.

## F-SEC-17. The game screen

**FR-84.** When a game starts, the game screen shall center the board on the start tile.

**FR-74.** The game screen shall let the player pan and zoom the board.

**FR-75.** While a player has picked a tile from their hand on their turn, the game screen shall
highlight every space where the tile fits in its current rotation.

**FR-86.** While a player has picked a tile from their hand on their turn, the game screen shall
let them lay it only on a highlighted space.

**FR-76.** When a player has laid a tile, the game screen shall offer the features of that tile
they may deploy onto, and a way to skip.

**FR-77.** While the game is waiting for a player's garrison choice, the game screen shall prompt
that player to choose.

**FR-78.** While a player's hand is stuck on their turn, the game screen shall tell them their hand
is stuck.

**FR-79.** The game screen shall show every player's score, enforcers in supply, and how many tiles
they hold.

**FR-80.** The game screen shall show whose turn it is.

**FR-81.** The game screen shall show the three bounties in play, and who has claimed each one.

**FR-82.** When a feature is scored, the game screen shall show every player what was scored and
who got the points, including garrison bonuses and bounties.

**FR-83.** When the game ends, the game screen shall show each player's points from bastions,
roads, outposts, wastelands, garrison bonuses and bounties, and the winner or winners.