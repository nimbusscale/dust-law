import { z } from "zod";

export const edgeSchema = z.enum(["north", "east", "south", "west"]);
export type Edge = z.infer<typeof edgeSchema>;

export const edgeTypeSchema = z.enum([
  "bastion",
  "road",
  "wasteland",
  "outpost",
]);
export type EdgeType = z.infer<typeof edgeTypeSchema>;

export const borderPositionSchema = z.enum([
  "NW",
  "NE",
  "EN",
  "ES",
  "SE",
  "SW",
  "WS",
  "WN",
]);
export type BorderPosition = z.infer<typeof borderPositionSchema>;

export const edgeTypesSchema = z.strictObject({
  north: edgeTypeSchema,
  east: edgeTypeSchema,
  south: edgeTypeSchema,
  west: edgeTypeSchema,
});
export type EdgeTypes = z.infer<typeof edgeTypesSchema>;

const bastionSegmentIdSchema = z.string().min(1);

const bastionSegmentSchema = z.strictObject({
  kind: z.literal("bastion"),
  // Road segments and wasteland segments on the same tile name this bastion segment by its id.
  id: bastionSegmentIdSchema,
  edges: z.array(edgeSchema).min(1),
});

const throughRoadSegmentSchema = z.strictObject({
  kind: z.literal("road"),
  edges: z.tuple([edgeSchema, edgeSchema]),
});

const roadEndSchema = z.union([
  z.strictObject({ kind: z.literal("junction") }),
  z.strictObject({
    kind: z.literal("gate"),
    bastionSegmentId: bastionSegmentIdSchema,
  }),
]);
export type RoadEnd = z.infer<typeof roadEndSchema>;

// Meets FR-25.
const endingRoadSegmentSchema = z.strictObject({
  kind: z.literal("road"),
  edges: z.tuple([edgeSchema]),
  endsAt: roadEndSchema,
});

const wastelandSegmentSchema = z.strictObject({
  kind: z.literal("wasteland"),
  borderPositions: z.array(borderPositionSchema).min(1),
  bordersBastionSegmentIds: z.array(bastionSegmentIdSchema),
});

const outpostSegmentSchema = z.strictObject({ kind: z.literal("outpost") });

export const segmentSchema = z.union([
  bastionSegmentSchema,
  throughRoadSegmentSchema,
  endingRoadSegmentSchema,
  wastelandSegmentSchema,
  outpostSegmentSchema,
]);
export type Segment = z.infer<typeof segmentSchema>;

// The hostile records only its segment, because its kind follows from that segment's kind. A
// second copy of the kind could disagree with the segment.
export interface Hostile {
  // An index into the tile's segments. It meets FR-26.
  segmentIndex: number;
}

export interface Tile {
  edgeTypes: EdgeTypes;
  segments: Segment[];
  hostile: Hostile | null;
}
