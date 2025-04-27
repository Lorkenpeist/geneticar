import { Engine, Runner, Composite, Events, World, Bodies } from "matter-js";
import { Car, CarProperties } from "./car";
import { ROAD_SEGMENT_HEIGHT, ROAD_SEGMENT_WIDTH } from "./constants";
import { equationRoadGenerator } from "./equation-road-iterator";

export interface SimulationOptions {
  carCount: number;
  carProperties: CarProperties;
}

class SimulationEngine {
  readonly engine = Engine.create();
  private readonly runner = Runner.create();
  cars: Car[] = [];

  start(options: SimulationOptions) {
    // The equation that defines the curve of the road
    const roadFunction = (x: number) => (-x * x) / (100 * ROAD_SEGMENT_WIDTH);

    this.cars = Array.from(Array(options.carCount), (_, i) => {
      const car = new Car(options.carProperties, {
        x: -200 * i,
        y: roadFunction(0),
      });
      return car;
    });

    const startingRoad = Bodies.rectangle(
      -5 * ROAD_SEGMENT_WIDTH,
      roadFunction(0) + ROAD_SEGMENT_HEIGHT / 2,
      10 * ROAD_SEGMENT_WIDTH,
      ROAD_SEGMENT_HEIGHT,
      { isStatic: true },
    );

    // The x coordinate of the last road segment.
    // Used to check when cars approach the end of the road
    // so more road can be generated.
    let frontRoadPosition = startingRoad.position.x;

    const roadGenerator = equationRoadGenerator(
      (x) => (-x * x) / (100 * ROAD_SEGMENT_WIDTH),
    );

    Composite.add(this.engine.world, [
      startingRoad,
      ...this.cars.map((car) => car.composite),
    ]);

    Events.on(this.engine, "beforeUpdate", () =>
      this.cars.forEach((car) => car.drive()),
    );

    Events.on(this.engine, "afterUpdate", () => {
      if (this.leader().front() > frontRoadPosition) {
        const nextRoadSegment = roadGenerator.next();
        if (!nextRoadSegment.done) {
          Composite.add(this.engine.world, nextRoadSegment.value);
          frontRoadPosition = nextRoadSegment.value.position.x;
        }
      }
    });

    Runner.run(this.runner, this.engine);
  }

  stop() {
    Events.off(this.engine, "beforeUpdate");
    Events.off(this.engine, "afterUpdate");
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    World.clear(this.engine.world, false);
    this.cars = [];
  }

  // Find the current leader of the cars, based on its front.
  leader() {
    return this.cars.reduceRight((car1, car2) =>
      car2.front() > car1.front() ? car2 : car1,
    );
  }
}

export const simulationEngine = new SimulationEngine();
