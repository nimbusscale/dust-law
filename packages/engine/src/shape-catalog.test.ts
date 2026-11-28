import { describe, expect, it } from "vitest";

import shapeCatalogData from "./shape-catalog.json" with { type: "json" };
import { loadShapeCatalog, shapeCatalog, type Shape } from "./shape-catalog.js";
import { edgeSchema, type BorderPosition, type Edge } from "./tile.js";

const { shapes } = shapeCatalog;

const BORDER_POSITIONS_ON_EDGE: Record<Edge, BorderPosition[]> = {
  north: ["NW", "NE"],
  east: ["EN", "ES"],
  south: ["SE", "SW"],
  west: ["WS", "WN"],
};

function edgeTypeList(shape: Shape): string[] {
  return edgeSchema.options.map((edge) => shape.edgeTypes[edge]);
}

function holdsOutpost(shape: Shape): boolean {
  return shape.segments.some((segment) => segment.kind === "outpost");
}

describe("the shape catalog", () => {
  it.each(shapes)(
    "gives an outpost tile only outpost edges and no other segment: $id",
    (shape) => {
      if (!holdsOutpost(shape)) {
        return;
      }
      // FR-23.
      expect(edgeTypeList(shape)).toEqual([
        "outpost",
        "outpost",
        "outpost",
        "outpost",
      ]);
      expect(shape.segments).toEqual([{ kind: "outpost" }]);
    },
  );

  it.each(shapes)(
    "gives outpost edges only to a tile that holds an outpost: $id",
    (shape) => {
      if (holdsOutpost(shape)) {
        return;
      }
      // FR-24.
      expect(edgeTypeList(shape)).not.toContain("outpost");
    },
  );

  it.each(shapes)(
    "ends each road segment with one edge at a junction or a gate: $id",
    (shape) => {
      const roadEnds = shape.segments.flatMap((segment) =>
        "endsAt" in segment ? [segment.endsAt] : [],
      );
      const bastionSegmentIds = shape.segments.flatMap((segment) =>
        segment.kind === "bastion" ? [segment.id] : [],
      );
      const junctionEnds = roadEnds.filter((end) => end.kind === "junction");
      const gateBastionSegmentIds = roadEnds.flatMap((end) =>
        end.kind === "gate" ? [end.bastionSegmentId] : [],
      );
      // FR-25.
      expect([0, 3, 4]).toContain(junctionEnds.length);
      for (const bastionSegmentId of gateBastionSegmentIds) {
        expect(bastionSegmentIds).toContain(bastionSegmentId);
      }
    },
  );

  it.each(shapes)(
    "puts each border position on a road or wasteland edge in exactly one wasteland segment, and none on a bastion edge: $id",
    (shape) => {
      const wastelandBorderPositions = shape.segments.flatMap((segment) =>
        segment.kind === "wasteland" ? segment.borderPositions : [],
      );
      for (const edge of edgeSchema.options) {
        const edgeType = shape.edgeTypes[edge];
        if (edgeType === "outpost") {
          continue;
        }
        const expectedCount = edgeType === "bastion" ? 0 : 1;
        for (const borderPosition of BORDER_POSITIONS_ON_EDGE[edge]) {
          const count = wastelandBorderPositions.filter(
            (position) => position === borderPosition,
          ).length;
          // TR-5.
          expect(count, `${borderPosition} on a ${edgeType} edge`).toBe(
            expectedCount,
          );
        }
      }
    },
  );

  it("includes a shape with a bastion edge, one with a road edge and one with a wasteland edge", () => {
    const edgeTypes = new Set(shapes.flatMap(edgeTypeList));
    // TR-6.
    expect(edgeTypes).toContain("bastion");
    expect(edgeTypes).toContain("road");
    expect(edgeTypes).toContain("wasteland");
  });

  it.each(shapes)(
    "gives the shape a weight greater than zero: $id",
    (shape) => {
      // TR-7.
      expect(shape.weight).toBeGreaterThan(0);
    },
  );

  it("has shape weights that add up to 100", () => {
    const total = shapes.reduce((sum, shape) => sum + shape.weight, 0);
    // TR-8.
    expect(total).toBe(100);
  });
});

describe("loadShapeCatalog", () => {
  it("refuses data that doesn't match the schema", () => {
    const withUnknownEdgeType = {
      ...shapeCatalogData,
      shapes: [
        {
          id: "lava",
          edgeTypes: {
            north: "lava",
            east: "wasteland",
            south: "wasteland",
            west: "wasteland",
          },
          segments: [],
          weight: 100,
        },
      ],
    };
    const withRoadEndMissing = {
      ...shapeCatalogData,
      shapes: [
        {
          id: "dead-end",
          edgeTypes: {
            north: "road",
            east: "wasteland",
            south: "wasteland",
            west: "wasteland",
          },
          segments: [{ kind: "road", edges: ["north"] }],
          weight: 100,
        },
      ],
    };
    const withHostileChanceMissing = { shapes: shapeCatalogData.shapes };

    // CS-6.
    expect(() => loadShapeCatalog(withUnknownEdgeType)).toThrow(
      "doesn't match its schema",
    );
    expect(() => loadShapeCatalog(withRoadEndMissing)).toThrow(
      "doesn't match its schema",
    );
    expect(() => loadShapeCatalog(withHostileChanceMissing)).toThrow(
      "doesn't match its schema",
    );
  });
});
