import { Engine, Runner, Bodies, Composite, World } from "matter-js";
import { car } from "./car";

export interface CarDimensionOptions {
  width: number;
  height: number;
  wheelSize: number;
}

export interface SimulationOptions {
  carCount: number;
  carDimensions: CarDimensionOptions;
}

class SimulationEngine {
  readonly engine = Engine.create();
  private readonly runner = Runner.create();

  start(options: SimulationOptions) {
    const cars = Array.from(Array(options.carCount), (_, i) =>
      car(
        400 + 50 * i,
        50 + 100 * i,
        options.carDimensions.width,
        options.carDimensions.height,
        options.carDimensions.wheelSize,
      ),
    );
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(this.engine.world, [...cars, ground]);

    Runner.run(this.runner, this.engine);
  }

  stop() {
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    World.clear(this.engine.world, true);
  }
}

export const simulationEngine = new SimulationEngine();
