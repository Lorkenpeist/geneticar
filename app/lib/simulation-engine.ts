import { Engine, Runner, Bodies, Composite, World } from "matter-js";
import { Car, CarProperties } from "./car";

export interface SimulationOptions {
  carCount: number;
  carProperties: CarProperties;
}

class SimulationEngine {
  readonly engine = Engine.create();
  private readonly runner = Runner.create();

  start(options: SimulationOptions) {
    const cars = Array.from(Array(options.carCount), (_, i) => {
      const car = new Car(options.carProperties, {
        x: 400 + 50 * i,
        y: 50 + 100 * i,
      });
      return car;
    });
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(this.engine.world, [
      ...cars.map((car) => car.composite),
      ground,
    ]);

    Runner.run(this.runner, this.engine);
  }

  stop() {
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    World.clear(this.engine.world, true);
  }
}

export const simulationEngine = new SimulationEngine();
