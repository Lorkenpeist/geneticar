import { Engine, Runner, Bodies, Composite, Events, World } from "matter-js";
import { Car, CarProperties } from "./car";
import {
  ROAD_SEGMENT_COUNT,
  ROAD_SEGMENT_HEIGHT,
  ROAD_SEGMENT_WIDTH,
} from "./constants";

export interface SimulationOptions {
  carCount: number;
  carProperties: CarProperties;
}

class SimulationEngine {
  readonly engine = Engine.create();
  private readonly runner = Runner.create();
  private cars: Car[] = [];

  start(options: SimulationOptions) {
    this.cars = Array.from(Array(options.carCount), (_, i) => {
      const car = new Car(options.carProperties, {
        x: 200 + 200 * i,
        y: 600 - ROAD_SEGMENT_HEIGHT,
      });
      return car;
    });
    const ground = Array.from({ length: ROAD_SEGMENT_COUNT }, (_, i) =>
      Bodies.rectangle(
        ROAD_SEGMENT_WIDTH * i,
        600 - ROAD_SEGMENT_HEIGHT / 2,
        ROAD_SEGMENT_WIDTH,
        ROAD_SEGMENT_HEIGHT,
        { isStatic: true },
      ),
    );

    Composite.add(this.engine.world, [
      ...this.cars.map((car) => car.composite),
      ...ground,
    ]);

    Events.on(this.engine, "beforeUpdate", () =>
      this.cars.forEach((car) => car.drive()),
    );

    Runner.run(this.runner, this.engine);
  }

  stop() {
    // FIXME: update this after fixing Matter.js type definitions
    // @ts-expect-error Expected 3 arguments, but got 2.
    Events.off(this.engine, "beforeUpdate");
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    World.clear(this.engine.world, true);
    this.cars = [];
  }
}

export const simulationEngine = new SimulationEngine();
