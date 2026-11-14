# Dust Law functional spec

The functional spec: what Dust Law, a networked browser tile-laying game, should do, in the
players' terms. Requirements are in GEARS, with `FR` IDs. It never links to other docs. Other
docs, prompts and code point to its IDs.

## F-SEC-1. Terms

The terms a player would recognize, each defined once in plain language.

- **App.** The Dust Law software that players use in their browsers.
- **Game.** One match of Dust Law, from when a player creates it to when it ends.
- **Player.** A person playing in a game, from their own browser.
- **Host.** The player who created a game (FR-7).
- **Game invite.** What the host shares so that other players can join that game (FR-8).
- **Tiles per player.** The game length the host picks (FR-9).
- **Tile supply.** The number of tiles still to be drawn in a game (FR-14, FR-22).
- **Board.** The grid of square spaces that tiles are laid on. A space is empty or holds one tile.
- **Neighboring spaces.** Two spaces that share an edge. The eight spaces around a space are its
  four neighboring spaces plus the four it touches only at a corner.
- **Tile.** A square section of the wastes. Each of its four edges (north, east, south and west)
  is a bastion, road, wasteland or outpost edge.
- **Start tile.** The tile at the center of the board when a game starts (FR-12).
- **Hand.** The tiles a player holds and can lay.
- **Draw.** A player getting one new tile into their hand, either at the start of the game or in
  the draw step.
- **Tile shape.** A complete tile layout: what's on each edge and how the features connect inside
  the tile.
- **Tile catalog.** The list of tile shapes the app creates tiles from. Each tile shape has a
  weight that sets how often it's drawn.
- **Fits.** A tile fits at an empty space when at least one of its four rotations can be laid
  there under FR-28 and FR-29. A tile fits on the board when it fits at some empty space.
- **Stuck hand.** A hand in which no tile fits on the board.
- **Feature.** A bastion, road, outpost or wasteland. Pieces of the same kind that meet across a
  shared edge join into one feature, so a bastion, road or wasteland can span many tiles. Two
  pieces on one tile that don't touch, such as two separate walls, are separate features.
- **Bastion.** A walled settlement.
- **Road.** A route across the wastes.
- **Junction.** The point in the middle of a tile where three or four roads meet. Each of those
  roads ends there.
- **Outpost.** A lone station that fills its whole tile. A road that reaches an outpost ends
  there.
- **Wasteland.** Open ground between everything else. Roads, outposts and bastion walls split it
  into separate wastelands.
- **Borders.** A wasteland borders a bastion when the two touch on the same tile.
- **Finished.** A bastion, road or outpost is finished when it meets FR-41, FR-42 or FR-43. A
  wasteland is never finished (FR-44).
- **Enforcer.** A player's token, placed on a feature to claim it. Its role comes from the feature
  it's on: a judge in a bastion, a rider on a road, a warden on an outpost, or a ranger in a
  wasteland.
- **Enforcer supply.** A player's enforcers that aren't on the board.
- **Hostile.** A marker on a tile for a neutral force that competes with players for control.
  There are three kinds. A gang stronghold sits in a bastion, a raider camp sits on a road, and a
  mutant warren sits in a wasteland.
- **Side.** A party to the count for control of a feature: each player, and the hostile side.
- **Hostile side.** All the hostiles on a feature, counted together as one side (FR-50).
- **Control.** Which side or sides take a feature's points (F-SEC-9).
- **Score points from a feature.** Receive at least 1 point when that feature is scored.
- **Garrison.** A judge left on the board in a finished bastion (F-SEC-10).
- **Garrisoned bastion.** A bastion that holds at least one garrison.
- **Bounty.** A goal that any player can race to meet for points (FR-60).
- **The game's bounties.** The 3 bounties picked for a game (FR-17).
- **Claim a bounty.** Be awarded a bounty's points for meeting its condition (FR-61).
- **Turn.** One player's go. Its turn steps are listed in FR-26.
- **Turn order.** The order players take turns in (FR-19).
- **Round.** One turn for each player, from the first to the last in turn order.

## F-SEC-2. Limits

Limits that always hold. Each is a requirement that says what the app does, with "only", then
what that rules out.

**FR-1.** The app shall let the host start a game only when 2 to 5 players have joined it, not
with fewer or more.

**FR-2.** The app shall seat only human players, not computer opponents.

**FR-3.** The app shall let a player join only a game whose game invite they have, not a game
found for them by matchmaking.

**FR-4.** The app shall run only in a desktop web browser, not as a program installed on a phone
or tablet.

**FR-5.** The app shall show only tiles and plain screens drawn by the app itself, not art
images or animation.

*Why:* the app only needs to be good enough for a small group to play and test, so clarity and
correctness matter more than polish.

**FR-6.** The app shall show the tiles in a player's hand only to that player, not to the other
players.

## F-SEC-3. Creating and joining a game

**FR-7.** When a player creates a game, the app shall make that player the game's host.

**FR-8.** When a player creates a game, the app shall give the host a game invite to share with
other players.

**FR-9.** While a game hasn't started, the app shall let its host set tiles per player, starting
from 20.

**FR-10.** The app shall let each player in a game play from their own browser, over a network.

**FR-11.** The app shall run several games at the same time, with no action in one game changing
another.

## F-SEC-4. Starting a game

**FR-12.** When the host starts a game, the app shall put a tile that is all one wasteland, with
no hostile, at the center of the board as the start tile.

**FR-13.** The app shall leave the start tile out of the tile supply.

**FR-14.** When the host starts a game, the app shall set the tile supply to tiles per player
times the number of players.

**FR-15.** When the host starts a game, the app shall put 7 enforcers in each player's enforcer
supply.

**FR-16.** When the host starts a game, the app shall set each player's score to 0.

**FR-17.** When the host starts a game, the app shall pick 3 bounties at random from the list in
FR-60 as the game's bounties.

**FR-18.** When the host starts a game, the app shall have each player draw 3 tiles as their
starting hand.

**FR-19.** When the host starts a game, the app shall pick a random turn order, which holds for
the rest of the game.

## F-SEC-5. Tiles

**FR-20.** When a player draws, the app shall create the tile at random at that moment from the
tile catalog, with each tile shape as likely as its weight says, not take it from a fixed set.

**FR-21.** When a player draws, the app shall give them only a tile that fits on the board at
that moment.

**FR-22.** When a player draws, the app shall take exactly one tile from the tile supply.

**FR-23.** The app shall put at most one hostile on a tile.

**FR-24.** The app shall create only tiles on which each road that ends inside the tile ends at a
junction or at a bastion.

**FR-25.** The app shall put an outpost only on a tile that holds nothing else, with outpost on
all four edges.

## F-SEC-6. Taking a turn

**FR-26.** While a player's hand isn't stuck, the app shall run each of their turns in these turn
steps, in order: lay a tile, deploy an enforcer, scoring, bounty check, draw.

**FR-27.** When a player lays a tile, the app shall let them choose any tile in their hand and
turn it to any of the four directions.

**FR-28.** When a player lays a tile, the app shall accept only an empty space that shares an
edge with at least one tile on the board, not one that touches the board only at a corner.

**FR-29.** When a player lays a tile, the app shall accept it only where every edge it shares
with a tile in a neighboring space matches: bastion to bastion, road to road or outpost, and
wasteland to wasteland or outpost. So an outpost never touches a bastion edge or another outpost.

**FR-30.** When a tile with a hostile is laid, the app shall add the hostile to the feature it
sits in, as joined across tiles.

**FR-31.** While a player's hand is stuck, when their turn starts, the app shall tell them that
no tile in their hand fits.

**FR-32.** While a player's hand is stuck, when their turn starts, the app shall have them
discard one tile of their choice from their hand.

**FR-33.** When a player discards a tile, the app shall show that tile to every player.

**FR-34.** When a player discards a tile, the app shall go straight to that turn's draw step,
with no lay a tile, deploy an enforcer, scoring or bounty check step.

**FR-35.** While the tile supply isn't empty, when a player reaches the draw step, the app shall
have them draw one tile.

## F-SEC-7. Deploying enforcers

**FR-36.** When a player reaches the deploy an enforcer step, the app shall let them deploy one
enforcer from their enforcer supply onto one feature of the tile they just laid, or skip.

**FR-37.** The app shall let a player deploy only onto a feature that holds no enforcer, counting
every tile the feature spans once the tile just laid has joined it, and ignoring any hostiles on
it.

*Scenario:* Given two separate roads that each hold one rider, when a player lays a tile that
joins them, then the joined road holds both riders, and the player can't deploy onto it.

**FR-38.** While a player's enforcer supply is empty, the app shall skip their deploy an enforcer
step.

**FR-39.** The app shall leave an enforcer on the board until FR-49 returns it, not let its owner
pick it up early.

## F-SEC-8. Finishing and scoring features

**FR-40.** When a player reaches the scoring step, the app shall score every bastion, road and
outpost that the tile they laid finished.

**FR-41.** The app shall treat a bastion as finished once its walls are closed all the way
round, with no open edge left.

**FR-42.** The app shall treat a road as finished once each of its ends stops at a junction, a
bastion or an outpost, or the road loops back into itself.

**FR-43.** The app shall treat an outpost as finished once all eight spaces around it hold tiles.

**FR-44.** The app shall never treat a wasteland as finished, so it scores a wasteland only at
the end of the game (FR-66).

**FR-45.** The app shall value a finished bastion at 2 points for each tile in it.

**FR-46.** The app shall value a finished road at 1 point for each tile in it.

**FR-47.** The app shall value a finished outpost at 1 point for each tile with no bastion on
it, among the outpost's own tile and the eight spaces around it, up to 9 points. A tile with even
a sliver of bastion counts nothing.

**FR-48.** The app shall count each tile once toward a feature's size, however many separate
pieces of that feature the tile holds.

**FR-49.** When a feature is scored, the app shall return every enforcer on it to its owner's
enforcer supply, except a judge left as a garrison (FR-54).

## F-SEC-9. Control and ties

**FR-50.** When a feature is scored, the app shall count each player's enforcers on it, and count
each hostile on it as one enforcer for the hostile side.

**FR-51.** When a feature is scored, the app shall give its points to the side with the most
enforcers on it.

**FR-52.** When two or more sides tie for the most enforcers on a scored feature, the app shall
split its points evenly among the tied sides, rounded down.

*Scenario:* Given a finished 5-tile bastion, worth 10 points, that holds your judge, a rival's
judge and one gang stronghold, when it's scored, then you and the rival each score 3, and the
hostile side's 3 are lost.

**FR-53.** The app shall award no one the points that go to the hostile side.

## F-SEC-10. Garrisons

**FR-54.** When a finished bastion is scored, the app shall let each player with a judge in it
leave one of their judges there as a garrison, whichever side controls the bastion.

**FR-55.** When a finished bastion is scored, the app shall ask the players with a judge in it
about a garrison one at a time, in turn order, starting with the player whose turn it is.

**FR-56.** The app shall keep a garrison on the board, out of its owner's enforcer supply, for
the rest of the game.

**FR-57.** When a road that ends at a garrisoned bastion is finished, the app shall award 2
bonus points to the owner of each garrison in that bastion, on top of the road's own points,
whichever side controls the road, and even if no player scores it.

**FR-58.** When one tile finishes a bastion and a road that ends at it, the app shall settle that
bastion's garrisons before it scores the road.

*Why:* so that a garrison left in the bastion pays its road bonus on a road the same tile
finished.

*Scenario:* Given a bastion that holds your judge, and a road that ends at it and holds your rider
and one raider camp, when one tile finishes both and you leave your judge as a garrison, then the
raider camp is left out of the road's count, you score the road's full points, and you score 2
bonus points.

**FR-59.** While a garrison's owner has at least one enforcer on a road that ends at the
garrison's bastion, or in a wasteland that borders it, when the app works out control of that
road or wasteland, the app shall leave one of its hostiles out of the count for every side, once
for each such garrison.

## F-SEC-11. Bounties

**FR-60.** The app shall offer these bounties, each with its condition and points:

| Bounty | Condition | Points |
|---|---|---|
| Big Walls | Score points from a bastion of 6 or more tiles. | 6 |
| Long Haul | Score points from a road of 6 or more tiles. | 5 |
| Clean Sweep | Score points from a bastion that holds a gang stronghold. | 5 |
| Clear the Road | Score points from a road that holds a raider camp. | 4 |
| Frontier | Score points from your second outpost. | 5 |
| Full Patrol | Over the game, score points from at least one bastion, one road and one outpost. | 6 |
| Lockdown | Have two garrisons on the board at the same time. | 5 |
| All Hands | End your turn with all 7 of your enforcers on the board. | 4 |

*Scenario:* Given Clean Sweep is one of the game's bounties, and a finished 4-tile bastion holds
your judge and one gang stronghold, when the bastion is scored, then you score 4 points and claim
Clean Sweep.

**FR-61.** When a player reaches the bounty check step, the app shall award each unclaimed bounty
among the game's bounties to every player who now meets its condition.

**FR-62.** The app shall let each of the game's bounties be claimed in only one bounty check step,
not again after it.

**FR-63.** When two or more players claim the same bounty in one bounty check step, the app shall
split its points evenly among them, rounded down.

## F-SEC-12. End of the game

**FR-64.** When the tile supply reaches zero, the app shall end the game once the last player in
turn order has taken their turn in that round.

*Why:* so that every player gets the same number of turns.

**FR-65.** When the game ends, the app shall score no points for an unfinished bastion, road or
outpost.

**FR-66.** When the game ends, the app shall value each wasteland that holds at least one ranger
at 3 points for each finished bastion it borders, whatever that bastion's size, whichever side
controls it, and whether or not it holds a garrison. One bastion counts for every wasteland that
borders it.

**FR-67.** When the game ends, the app shall declare the player with the most points the winner,
with players tied for the most sharing the win.

## F-SEC-13. What players see

**FR-68.** When any player acts, the app shall show the result to every player in that game
without anyone reloading the page.

**FR-69.** The app shall let each player pan and zoom their view of the board.

**FR-70.** The app shall show each player the tiles in their own hand.

**FR-71.** When a player chooses a tile from their hand, the app shall show every empty space
where that tile fits.

**FR-72.** The app shall show every player a score panel with each player's score, the number of
enforcers in their enforcer supply, the number of tiles in their hand, and whose turn it is.

**FR-73.** The app shall show every player the game's bounties and who has claimed each one.

**FR-74.** When the app awards points during play, for a feature, a garrison bonus or a bounty,
the app shall show every player what scored and the points each player got.

**FR-75.** When the game ends, the app shall show every player each player's points in each
category (bastions, roads, outposts, garrison bonuses, bounties and wastelands) and the winner or
winners.
