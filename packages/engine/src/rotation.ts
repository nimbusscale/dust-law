import {
  edgeSchema,
  type BorderPosition,
  type Edge,
  type EdgeTypes,
  type Segment,
  type Tile,
} from "./tile.js";

export type Rotation = 0 | 90 | 180 | 270;

const EDGE_AFTER_CLOCKWISE_TURN: Record<Edge, Edge> = {
  north: "east",
  east: "south",
  south: "west",
  west: "north",
};

function borderPositionAfterClockwiseTurn(
  borderPosition: BorderPosition,
): BorderPosition {
  switch (borderPosition) {
    case "NW":
      return "EN";
    case "NE":
      return "ES";
    case "EN":
      return "SE";
    case "ES":
      return "SW";
    case "SE":
      return "WS";
    case "SW":
      return "WN";
    case "WS":
      return "NW";
    case "WN":
      return "NE";
  }
}

function turnEdge(edge: Edge): Edge {
  return EDGE_AFTER_CLOCKWISE_TURN[edge];
}

function turnEdgeTypes(edgeTypes: EdgeTypes): EdgeTypes {
  const turned = { ...edgeTypes };
  for (const edge of edgeSchema.options) {
    turned[turnEdge(edge)] = edgeTypes[edge];
  }
  return turned;
}

function turnSegment(segment: Segment): Segment {
  switch (segment.kind) {
    case "bastion":
      return { ...segment, edges: segment.edges.map(turnEdge) };
    case "road":
      if ("endsAt" in segment) {
        return { ...segment, edges: [turnEdge(segment.edges[0])] };
      }
      return {
        ...segment,
        edges: [turnEdge(segment.edges[0]), turnEdge(segment.edges[1])],
      };
    case "wasteland":
      return {
        ...segment,
        borderPositions: segment.borderPositions.map(
          borderPositionAfterClockwiseTurn,
        ),
      };
    case "outpost":
      return segment;
  }
}

// Meets FR-27. Each segment keeps its index, so the hostile stays in the same segment.
function turnClockwise(tile: Tile): Tile {
  return {
    edgeTypes: turnEdgeTypes(tile.edgeTypes),
    segments: tile.segments.map(turnSegment),
    hostile: tile.hostile,
  };
}

export function rotateTile(tile: Tile, rotation: Rotation): Tile {
  let rotated = tile;
  for (let turns = 0; turns < rotation / 90; turns++) {
    rotated = turnClockwise(rotated);
  }
  return rotated;
}
