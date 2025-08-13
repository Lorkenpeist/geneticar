import { Bodies, Vector } from "matter-js";
import { ROAD_SEGMENT_HEIGHT, ROAD_SEGMENT_LENGTH } from "./constants";

// Iteratively generates segments of road from a mathematical equation.
// Segments are generated to approximate the shape of the curve defined by the equation.
export function* equationRoadGenerator(f: (x: number) => number) {
  let x = 0;
  let y = f(0);
  while (true) {
    const x2 = x + ROAD_SEGMENT_LENGTH;
    const y2 = f(x2);
    yield segment({ x, y }, { x: x2, y: y2 });
    x = x2;
    y = y2;
  }
}

// Creates a road segment from 2 vertices by adding 2 more vertices below them
function segment(vertex1: Vector, vertex2: Vector) {
  const vertex3 = { x: vertex1.x, y: vertex1.y + ROAD_SEGMENT_HEIGHT };
  const vertex4 = { x: vertex2.x, y: vertex2.y + ROAD_SEGMENT_HEIGHT };

  return Bodies.fromVertices(
    // We have to calculate the center because Matter.js will automatically
    // move the center of mass to the provided coordinates
    (vertex1.x + vertex2.x) / 2,
    (vertex1.y + vertex2.y + ROAD_SEGMENT_HEIGHT) / 2,
    [[vertex1, vertex2, vertex3, vertex4]],
    { isStatic: true },
  );
}
