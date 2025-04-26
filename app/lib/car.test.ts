import { Car } from "./car";
import { Body } from "matter-js";

describe("Car", () => {
  describe("drive", () => {
    it.each([
      // applies max torque if wheels are at rest
      { engineTorque: 1, rpmLimit: 300, expectedTorque: 1 },
      { engineTorque: 1, rpmLimit: 100, expectedTorque: 1 },
      // applies less torque with weaker engine
      { engineTorque: 0.5, rpmLimit: 300, expectedTorque: 0.5 },
      // applies no torque with no engine
      { engineTorque: 0, rpmLimit: 300, expectedTorque: 0 },
      // applies half torque at half of RPM limit
      { engineTorque: 1, rpmLimit: 300, startingRpm: 150, expectedTorque: 0.5 },
      { engineTorque: 1, rpmLimit: 100, startingRpm: 50, expectedTorque: 0.5 },
      // applies no torque at RPM limit
      { engineTorque: 1, rpmLimit: 300, startingRpm: 300, expectedTorque: 0 },
      { engineTorque: 1, rpmLimit: 100, startingRpm: 100, expectedTorque: 0 },
      // applies no torque beyond RPM limit
      { engineTorque: 1, rpmLimit: 300, startingRpm: 600, expectedTorque: 0 },
      // applies max torque if wheels are spinning backwards
      { engineTorque: 1, rpmLimit: 300, startingRpm: -300, expectedTorque: 1 },
      // adds engine torque to external sources such as friction
      {
        engineTorque: 1,
        rpmLimit: 300,
        startingTorque: 0.5,
        expectedTorque: 1.5,
      },
      {
        engineTorque: 1,
        rpmLimit: 300,
        startingTorque: -0.5,
        expectedTorque: 0.5,
      },
    ])(
      "adds torque to the rear wheel",
      ({
        engineTorque,
        rpmLimit,
        startingTorque = 0,
        startingRpm = 0,
        expectedTorque,
      }: {
        engineTorque: number;
        rpmLimit: number;
        startingTorque?: number;
        startingRpm?: number;
        expectedTorque: number;
      }) => {
        const car = new Car(
          {
            width: 100,
            height: 50,
            wheelSize: 30,
            torque: engineTorque,
            rpmLimit: rpmLimit,
          },
          { x: 0, y: 0 },
        );

        const rearWheel = car.wheels[0];
        const startingAngularVelocity = (startingRpm * 2 * Math.PI) / (60 * 60);
        Body.setAngularVelocity(rearWheel, startingAngularVelocity);
        Body.setAngle(rearWheel, 0);
        rearWheel.torque = startingTorque;

        car.drive();

        expect(rearWheel.torque).toBeCloseTo(expectedTorque, 3);
        // Although torque has been added, the wheel should not have moved yet
        // as that is handled by the physics engine itself.
        expect(rearWheel.angularVelocity).toBe(startingAngularVelocity);
        expect(rearWheel.angle).toBe(0);
      },
    );
  });
});
