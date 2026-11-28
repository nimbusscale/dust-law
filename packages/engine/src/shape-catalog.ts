import { z } from "zod";

import shapeCatalogData from "./shape-catalog.json" with { type: "json" };
import { edgeTypesSchema, segmentSchema, type Tile } from "./tile.js";

// Each shape is written in its reference orientation, with north at the top.
const shapeSchema = z.strictObject({
  id: z.string().min(1),
  edgeTypes: edgeTypesSchema,
  segments: z.array(segmentSchema),
  weight: z.number(),
});
export type Shape = z.infer<typeof shapeSchema>;

const shapeCatalogSchema = z.strictObject({
  hostileChancePercent: z.number().min(0).max(100),
  shapes: z.array(shapeSchema).min(1),
});
export type ShapeCatalog = z.infer<typeof shapeCatalogSchema>;

// Meets TD-5 and CS-6.
export function loadShapeCatalog(data: unknown): ShapeCatalog {
  const result = shapeCatalogSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `The shape catalog's data file doesn't match its schema:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

export const shapeCatalog = loadShapeCatalog(shapeCatalogData);

export function tileFromShape(shape: Shape): Tile {
  return {
    edgeTypes: shape.edgeTypes,
    segments: shape.segments,
    hostile: null,
  };
}
