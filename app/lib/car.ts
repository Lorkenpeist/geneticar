import { Body, Bodies, Composite, Constraint } from "matter-js";

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

  const car = Composite.create({ label: "Car" }),
    body = Bodies.rectangle(x, y, width, height, {
      collisionFilter: {
        group: group,
      },
      density: 0.0002,
    });

  const wheelA = Bodies.circle(x + wheelAOffset, y + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: 0.8,
  });

  const wheelB = Bodies.circle(x + wheelBOffset, y + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: 0.8,
  });

  const axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0,
  });

  const axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
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
