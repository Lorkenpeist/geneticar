import { Body, Bodies, Composite, Constraint, Vector } from "matter-js";
import {
  CAR_WHEEL_MAX_RPM,
  WHEEL_SPRITE_LOCATION,
  WHEEL_SPRITE_SIZE,
} from "./constants";

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

    // Calculate the position where the center of the body should be placed.
    // The provided position is where the x and y coordinates of the
    // front and bottom of the car should be, respectively.
    Composite.translate(this.composite, {
      x: position.x - this.front(),
      y: position.y - this.bottom(),
    });
  }

  // apply torque to the wheels
  drive() {
    const averageRelativeWheelSpin =
      this.wheels
        .map((wheel) => wheel.angularVelocity)
        .reduceRight((v1, v2) => v1 + v2) /
        this.wheels.length -
      this.body.angularVelocity;
    this.wheels.forEach((wheel) => {
      // Calculate torque based on current wheel spin.
      // Torque decreases linearly with RPM.

      // Convert RPM to angular velocity in radians per second
      const maxAngularVelocity = (CAR_WHEEL_MAX_RPM * 2 * Math.PI) / 60;
      // Clamp the torque multiplier between 0 and 1 so it doesn't get out of control
      // if the wheels are spinning too fast in either direction.
      const torqueMultiplier = Math.min(
        Math.max(1 - averageRelativeWheelSpin / maxAngularVelocity, 0),
        1,
      );
      const totalTorque = this.props.torque * torqueMultiplier;
      // TODO: variable torque balance
      wheel.torque += totalTorque / this.wheels.length;
      console.log(
        `I'm spinning at ${(wheel.angularVelocity / (2 * Math.PI)) * 60} RPM`,
      );
      console.log(`My max torque is ${this.props.torque}`);
      console.log(`My adjusted torque is ${totalTorque}`);
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

  // Find the the x coordinate of the front of the car
  front() {
    return Math.max(
      ...this.composite.bodies
        .flatMap((body) => body.vertices)
        .map((vertex) => vertex.x),
    );
  }

  // Find the the y coordinate of the bottom of the car
  bottom() {
    // Yes, max, because higher y value is lower position.
    // Don't ask why.
    return Math.max(
      ...this.composite.bodies
        .flatMap((body) => body.vertices)
        .map((vertex) => vertex.y),
    );
  }
}
