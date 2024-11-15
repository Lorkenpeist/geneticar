import { Body, Bodies, Composite, Constraint } from "matter-js";
import { WHEEL_SPRITE_SIZE } from "./constants";

export function car(
  x: number,
  y: number,
  width: number,
  height: number,
  wheelSize: number,
) {
  const group = Body.nextGroup(true);
  const wheelAOffset = -width / 2;
  const wheelBOffset = width / 2;
  const wheelYOffset = height / 2;

  const car = Composite.create({ label: "Car" });
  const body = Bodies.rectangle(x, y, width, height, {
    collisionFilter: { group: group },
    density: 0.0002,
  });

  const wheelA = wheel(group, x + wheelAOffset, y + wheelYOffset, wheelSize);
  const wheelB = wheel(group, x + wheelBOffset, y + wheelYOffset, wheelSize);

  const axelA = Constraint.create({
    bodyA: body,
    pointA: { x: wheelAOffset, y: wheelYOffset },
    bodyB: wheelA,
    stiffness: 1,
    length: 0,
  });

  const axelB = Constraint.create({
    bodyA: body,
    pointA: { x: wheelBOffset, y: wheelYOffset },
    bodyB: wheelB,
    stiffness: 1,
    length: 0,
  });

  Composite.add(car, body);
  Composite.add(car, wheelA);
  Composite.add(car, wheelB);
  Composite.add(car, axelA);
  Composite.add(car, axelB);

  return car;
}

function wheel(group: number, x: number, y: number, radius: number) {
  return Bodies.circle(x, y, radius, {
    collisionFilter: { group },
    friction: 0.8,
    render: {
      sprite: {
        texture: "/geneticar-wheel.svg",
        xScale: (2 * radius) / WHEEL_SPRITE_SIZE,
        yScale: (2 * radius) / WHEEL_SPRITE_SIZE,
      },
    },
  });
}
