import { Body, Bodies, Composite, Constraint, Vector } from "matter-js";
import { WHEEL_SPRITE_LOCATION, WHEEL_SPRITE_SIZE } from "./constants";

export interface CarProperties {
  width: number;
  height: number;
  wheelSize: number;
  torque: number;
}

export class Car {
  // The physical properties of the car
  readonly props: CarProperties;
  // The physical Matter.js representation of the car
  readonly composite: Composite;
  // the body of the car
  private readonly body: Body;
  // The wheels of the car
  private readonly wheels: Body[];

  constructor(props: CarProperties, position: Vector) {
    this.props = { ...props };
    const group = Body.nextGroup(true);
    const wheelAOffset = -props.width / 2;
    const wheelBOffset = props.width / 2;
    const wheelYOffset = props.height / 2;

    this.composite = Composite.create({ label: "Car" });

    this.body = Bodies.rectangle(0, 0, props.width, props.height, {
      collisionFilter: { group: group },
      density: 0.0002,
    });

    this.wheels = [
      this.wheel(group, wheelAOffset, wheelYOffset),
      this.wheel(group, wheelBOffset, wheelYOffset),
    ];

    const axels = this.wheels.map((wheel) =>
      Constraint.create({
        bodyA: this.body,
        pointA: { x: wheel.position.x, y: wheel.position.y },
        bodyB: wheel,
      }),
    );

    Composite.add(this.composite, this.body);
    Composite.add(this.composite, this.wheels);
    Composite.add(this.composite, axels);

    // calculate the position where the center of the body should be placed.
    // The provided position is the x coordinate of the frontof the car
    // and the y coordinate of the bottom of the wheels.
    const front = Math.max(
      ...this.composite.bodies
        .flatMap((body) => body.vertices)
        .map((vertex) => vertex.x),
    );

    // Yes, max, because higher y value is lower position.
    // Don't ask why.
    const bottom = Math.max(
      ...this.composite.bodies
        .flatMap((body) => body.vertices)
        .map((vertex) => vertex.y),
    );

    Composite.translate(this.composite, {
      x: position.x - front,
      y: position.y - bottom,
    });
  }

  // apply torque to the wheels
  drive() {
    this.wheels.forEach((wheel) => {
      // TODO: variable torque balance
      wheel.torque += this.props.torque / 2;
      console.log(`My torque is ${this.props.torque}`);
    });
  }

  // construct the wheel
  private wheel(group: number, x: number, y: number) {
    return Bodies.circle(x, y, this.props.wheelSize, {
      collisionFilter: { group },
      friction: 0.8,
      render: {
        sprite: {
          texture: WHEEL_SPRITE_LOCATION,
          xScale: (2 * this.props.wheelSize) / WHEEL_SPRITE_SIZE,
          yScale: (2 * this.props.wheelSize) / WHEEL_SPRITE_SIZE,
        },
      },
    });
  }
}
