import { Engine, Runner, Bodies, Composite, World } from "matter-js";

export interface SimulationOptions {
  boxCount: number;
}

export const BOX_COUNT_MIN = 1;
export const BOX_COUNT_MAX = 5;

class SimulationEngine {
  readonly engine = Engine.create();
  private readonly runner = Runner.create();

  start(options: SimulationOptions) {
    const boxen = Array.from(Array(options.boxCount), (_, i) =>
      Bodies.rectangle(400 + 50 * i, 50 + 100 * i, 80, 80),
    );
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(this.engine.world, [...boxen, ground]);

    Runner.run(this.runner, this.engine);
  }

  stop() {
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    World.clear(this.engine.world, true);
  }
}

export const simulationEngine = new SimulationEngine();
