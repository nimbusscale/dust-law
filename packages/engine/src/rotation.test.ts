import { describe, expect, it } from "vitest";

import { rotateTile } from "./rotation.js";
import { shapeCatalog, tileFromShape } from "./shape-catalog.js";
import type { Tile } from "./tile.js";

function tilesWithEachHostile(tile: Tile): Tile[] {
  return [
    tile,
    ...[...tile.segments.keys()].map((segmentIndex) => ({
      ...tile,
      hostile: { segmentIndex },
    })),
  ];
}

describe("rotateTile", () => {
  it.each(shapeCatalog.shapes)(
    "gives back the original tile after four rotations: $id",
    (shape) => {
      for (const tile of tilesWithEachHostile(tileFromShape(shape))) {
        let rotated = tile;
        for (let turn = 0; turn < 4; turn++) {
          rotated = rotateTile(rotated, 90);
        }
        // FR-27.
        expect(rotated).toEqual(tile);
        expect(rotateTile(rotateTile(tile, 180), 180)).toEqual(tile);
        expect(rotateTile(rotateTile(tile, 270), 90)).toEqual(tile);
      }
    },
  );

  it("moves the edges, the segments and the hostile of wall-gate together", () => {
    const before: Tile = {
      edgeTypes: {
        north: "bastion",
        east: "wasteland",
        south: "road",
        west: "wasteland",
      },
      segments: [
        { kind: "bastion", id: "b0", edges: ["north"] },
        {
          kind: "road",
          edges: ["south"],
          endsAt: { kind: "gate", bastionSegmentId: "b0" },
        },
        {
          kind: "wasteland",
          borderPositions: ["SW", "WS", "WN"],
          bordersBastionSegmentIds: ["b0"],
        },
        {
          kind: "wasteland",
          borderPositions: ["SE", "ES", "EN"],
          bordersBastionSegmentIds: ["b0"],
        },
      ],
      // A raider camp, on the road segment.
      hostile: { segmentIndex: 1 },
    };
    const after: Tile = {
      edgeTypes: {
        north: "wasteland",
        east: "bastion",
        south: "wasteland",
        west: "road",
      },
      segments: [
        { kind: "bastion", id: "b0", edges: ["east"] },
        {
          kind: "road",
          edges: ["west"],
          endsAt: { kind: "gate", bastionSegmentId: "b0" },
        },
        {
          kind: "wasteland",
          borderPositions: ["WN", "NW", "NE"],
          bordersBastionSegmentIds: ["b0"],
        },
        {
          kind: "wasteland",
          borderPositions: ["WS", "SW", "SE"],
          bordersBastionSegmentIds: ["b0"],
        },
      ],
      hostile: { segmentIndex: 1 },
    };
    const wallGate = shapeCatalog.shapes.find(
      (shape) => shape.id === "wall-gate",
    );

    // FR-27.
    expect(wallGate).toMatchObject({
      edgeTypes: before.edgeTypes,
      segments: before.segments,
    });
    expect(rotateTile(before, 90)).toEqual(after);
  });
});
