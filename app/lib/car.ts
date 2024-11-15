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
    bodyB: wheelA.bodies[0],
    stiffness: 1,
    length: 0,
  });

  const axelB = Constraint.create({
    bodyA: body,
    pointA: { x: wheelBOffset, y: wheelYOffset },
    bodyB: wheelB.bodies[0],
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
  const wheel = Composite.create({ label: "wheel" });

  const rim = Bodies.circle(x, y, radius, {
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

  const spoke = Bodies.rectangle(x, y, radius * 2, radius * 0.01, {
    collisionFilter: { group },
    density: 0.000001,
  });

  const spokeWeldA = Constraint.create({
    bodyA: spoke,
    pointA: { x: radius, y: 0 },
    bodyB: rim,
    pointB: { x: radius, y: 0 },
    stiffness: 1,
    length: 0,
    render: { visible: false },
  });
  const spokeWeldB = Constraint.create({
    bodyA: spoke,
    pointA: { x: -radius, y: 0 },
    bodyB: rim,
    pointB: { x: -radius, y: 0 },
    stiffness: 1,
    length: 0,
    render: { visible: false },
  });

  Composite.add(wheel, rim);
  Composite.add(wheel, spoke);
  Composite.add(wheel, spokeWeldA);
  Composite.add(wheel, spokeWeldB);

  return wheel;
}
