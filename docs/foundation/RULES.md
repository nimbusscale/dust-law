# Dust Law — Rules

*A digital tile-laying game of claiming the wastes, for 2 to 5 players.*

The old world is gone. What's left is dust, broken roads, and a few walled bastions where law still means something. Each player commands a squad of enforcers. You build the wastes one tile at a time and send your enforcers to claim what you build. Finished territory pays. Unfinished territory pays nothing.

---

## The Basics

- **Tiles.** Square tiles showing pieces of the wastes. There is no fixed set of tiles. The game creates each tile when you draw it (see *Drawing Tiles*).
- **Enforcers.** Each player has **7 enforcers**. An enforcer takes a role from where you place it.
- **Scores.** Every player starts at 0. The game keeps score and shows everyone's total at all times.
- **Bounties.** Goals that any player can race to meet. Three are in play each game.

### The Terrain

Each tile shows some mix of these:

| Terrain | What it is | Enforcer role |
|---|---|---|
| **Bastion** | A walled settlement. Bastions spread across tiles and are finished when their walls close. | **Judge** |
| **Road** | A route across the wastes. Roads are finished when both ends stop. | **Rider** |
| **Outpost** | A lone station that fills its whole tile, best built far from the bastions. Any road that points at an outpost ends there, from any side. | **Warden** |
| **Wasteland** | Open ground between everything else. Wastelands are never finished. Outposts and roads split wastelands apart, and so do bastion walls. | **Ranger** |

Some tiles are nothing but wasteland.

### Hostiles

Some tiles carry a hostile marker. These are called **hostile tiles**. A hostile is a neutral force that competes with players for control (see *Control and Ties*).

| Hostile | Found in |
|---|---|
| **Gang stronghold** | A bastion |
| **Raider camp** | A road |
| **Mutant warren** | A wasteland |

---

## Starting a Game

The host picks the game length when setting up the game. By default the game uses **20 tiles per player** (40 tiles for 2 players, 100 for 5). The host can change this. This number is the **tile supply**.

When the game starts, it does the following:

1. Puts the start tile in the center of the board. The start tile is always a plain wasteland tile. It is extra and does not count against the tile supply.
2. Gives each player 7 enforcers and a score of 0.
3. Picks **3 bounties** at random and shows them to everyone.
4. Deals each player **3 tiles** from the tile supply as their starting hand. Only you can see your hand. Other players can see how many tiles you hold, but not what they are.
5. Picks a random turn order. Turns follow that order for the rest of the game.

---

## Drawing Tiles

The game creates each tile at the moment you draw it. A new tile always fits somewhere on the board at that moment. The board may change before your next turn, so a tile in your hand can stop fitting. That is rare, and *Stuck Hands* covers it.

Each draw takes one tile from the tile supply. When the supply reaches zero, no more tiles are drawn.

---

## Your Turn

Your turn has five steps. You do the first two. The game does the rest.

1. **Lay a tile** from your hand.
2. **Deploy an enforcer** on that tile, if you want to.
3. **Scoring.** The game scores every feature your tile finished.
4. **Bounties.** The game checks whether anyone has met a bounty.
5. **Draw.** The game deals you one tile to bring your hand back to three, if the supply has any left.

### 1. Lay a Tile

Choose any tile from your hand. Rotate it to any of the four directions and place it on the board. The game shows you where it fits and won't let you place it anywhere else.

- It must sit edge to edge with at least one tile already on the board. Touching only at a corner does not count.
- Every edge it shares with a neighbor must match that neighbor: bastion against bastion, road against road, wasteland against wasteland.
- An outpost is the exception. Its edges accept a road or wasteland, but never a bastion and never another outpost. Two outposts can't sit side by side. A bastion can sit on a tile next to an outpost, but there must be wasteland or road between them on that tile.

If the tile carries a hostile, the hostile joins whatever feature it sits in as soon as the tile is laid.

### Stuck Hands

If none of the tiles in your hand fit anywhere on the board, the game tells you. Discard one tile of your choice. Everyone sees the tile you discarded. You draw a replacement, if the supply has any left. Your turn ends there. You do not lay a tile or deploy an enforcer this turn.

### 2. Deploy an Enforcer

You may take one enforcer from your supply and place it on the tile you just laid. Place it on one feature of that tile. The feature decides its role: a judge in a bastion, a rider on a road, a warden on an outpost, or a ranger in a wasteland.

You may not deploy onto a feature that already holds another enforcer, whether yours or a rival's. This counts the whole feature, across every tile it spans, after your new tile has joined it up.

Hostiles do not block deployment. You may deploy into a bastion with a gang stronghold, onto a road with a raider camp, or into a wasteland with a mutant warren, as long as no enforcer is already there. This includes the hostile tile you just laid.

Enforcers stay where they are until their feature is scored. You may not pick one up early. If all 7 of your enforcers are on the board, you skip this step.

More than one enforcer can end up on the same feature. That happens when separate features, each with its own enforcer, get joined by a later tile.

### 3. Scoring

The game checks every bastion, road, and outpost that your tile touches. It scores each one that is now finished. If a single tile finishes several features, score them all.

**When features are finished:**

- A **bastion** is finished when its walls are closed all the way around, with no open edge left.
- A **road** is finished when both of its ends stop. A road stops at a crossroads, at a bastion, at an outpost, or by looping back into itself.
- An **outpost** is finished when all eight spaces around it hold tiles.

**What they are worth:**

| Feature | Points |
|---|---|
| Bastion | 2 per tile in the bastion |
| Road | 1 per tile in the road |
| Outpost | 1 per tile with no bastion on it, counting the outpost tile and its eight neighbors (up to 9) |

Count tiles, not pieces. If one tile holds two separate bits of the same bastion, it counts once.

An outpost pays for being remote. Any neighbor with even a sliver of bastion on it is worth nothing. An outpost with no bastions around it scores 9. One with three bastion tiles around it scores 6.

Work out who controls the feature (see *Control and Ties*) and award the points. Then every enforcer on that feature goes back to its owner's supply, except for a judge who stays as a garrison (see *Garrisons*).

You can deploy an enforcer, finish its feature, score it, and get the enforcer back, all in the same turn.

Wastelands are never scored during play. Rangers stay on the board until the end of the game.

### 4. Bounties

If any player now meets the condition on a bounty that hasn't been claimed, they claim it and score its points. A claimed bounty is out of play. If two or more players meet the same bounty on the same turn, they split its points, rounded down.

### 5. Draw

The game deals you one tile, so you hold three again. If the supply is empty, nothing is dealt.

---

## Control and Ties

When a feature is scored, count the enforcers on it for each player. Each hostile on it counts as one enforcer for a neutral side, the **hostiles**. All the hostiles on a feature count together, so a bastion with two gang strongholds gives the hostiles two.

- The side with the most enforcers takes the points.
- If sides are tied for most, they split the points evenly, rounded down. Any share that goes to the hostiles is lost.
- If the hostiles have the most on their own, nobody scores.

**Examples, for a bastion worth 10 points:**

- You have 1 judge and there is 1 gang stronghold. You tie, so you score 5.
- You have 2 judges and there is 1 gang stronghold. You win and score 10.
- You and a rival each have 1 judge and there is 1 gang stronghold. It's a three-way tie, so you each score 3.
- You have 1 judge and there are 2 gang strongholds. The gang wins and nobody scores.

The same rule applies to raider camps on roads, to mutant warrens in wastelands, and to ties between players when no hostile is present.

---

## Garrisons

When a bastion is finished, each player with a judge in it may leave **one** of their judges behind as a garrison. This is true whoever won the bastion, even if the hostiles took it and nobody scored. The game asks each of those players in turn order, starting with the player whose turn it is. All other judges in the bastion go home as normal.

A garrisoned judge never comes back. It stays out of your supply for the rest of the game. In return, it does two things.

**Road bonus.** Each time a **road that ends at the garrisoned bastion** is finished, the garrison's owner scores **2 bonus points**. This is on top of whatever the road itself scores.

- The bonus pays no matter who wins the road. It pays even if raiders take the road or nobody has a rider on it.
- It also pays for a road finished by the same tile that finished the bastion. Choose your garrison first, then collect the bonus.

**Keeping the peace.** A garrison cancels **one hostile** when the game works out control of a road that ends at the bastion, or of a wasteland that borders it.

- It only works if the garrison's owner has at least one enforcer on that road or in that wasteland.
- The cancelled hostile is gone for everyone in that count, not just for you.
- Each garrison cancels one hostile per feature. A road running between two garrisoned bastions could have two hostiles cancelled.

For example, a road ends at your garrisoned bastion. It holds your rider and one raider camp. Normally you would tie with the raiders and score half. With your garrison, the raider camp is cancelled and you score the full amount.

---

## Bounties

The game picks three of these bounties at random at the start. The rest are not used that game. Each bounty can be claimed once, by the first player to meet it.

| Bounty | Condition | Points |
|---|---|---|
| **Big Walls** | Score points from a bastion of 6 or more tiles. | 6 |
| **Long Haul** | Score points from a road of 6 or more tiles. | 5 |
| **Clean Sweep** | Score points from a bastion that holds a gang stronghold. | 5 |
| **Clear the Road** | Score points from a road that holds a raider camp. | 4 |
| **Frontier** | Score points from your second outpost. | 5 |
| **Full Patrol** | Over the game, score points from at least one bastion, one road, and one outpost. | 6 |
| **Lockdown** | Have two garrisons on the board at the same time. | 5 |
| **All Hands** | End your turn with all 7 of your enforcers on the board. | 4 |

"Score points from" means you received at least 1 point when that feature was scored.

---

## End of the Game

When the tile supply runs out, the current round finishes. The round ends after the last player in turn order has taken their turn. That way everyone gets the same number of turns. Players keep laying tiles from their hands during this last round but draw nothing. Any tiles still in hand at the end go unplayed.

### Final Scoring

The game scores the end automatically. Unfinished bastions, roads, and outposts score **nothing**. Enforcers on them simply go home.

Then the game scores each wasteland that holds at least one ranger:

- Find every **finished bastion** that the wasteland borders. A bastion counts even if the hostiles took it, and even if it has a garrison.
- The wasteland is worth **3 points for each of those bastions**. How big the bastion is does not matter.
- Work out control as usual. Mutant warrens count as hostiles.
- One bastion can count for several wastelands.

The game shows each player's points by category. The player with the most points wins. If players are tied, they share the win.

---

## Scoring at a Glance

| When | What | Points |
|---|---|---|
| During play | Finished bastion | 2 per tile |
| During play | Finished road | 1 per tile |
| During play | Finished outpost | 1 per tile with no bastion, up to 9 |
| During play | Garrison bonus | 2 per road finished that ends at the bastion |
| During play | Bounty | As printed |
| End of game | Unfinished bastion, road, or outpost | 0 |
| End of game | Wasteland | 3 per finished bastion it borders |

Ties for control split the points, rounded down. Shares that go to the hostiles are lost.
