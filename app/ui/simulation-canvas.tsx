"use client";

import React, { useRef, useEffect } from "react";
import { Events, Render } from "matter-js";

import { simulationEngine } from "@/app/lib/simulation-engine";

export interface RenderOptions {
  wireframes: boolean;
}

export function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw Error("Could not get canvas for renderer!");
    }
    const render = Render.create({
      engine: simulationEngine.engine,
      canvas,
      options: { wireframes: false },
    });
    Render.run(render);

    Events.on(render, "beforeRender", () =>
      Render.lookAt(render, simulationEngine.leader().composite.bodies, {
        x: 200 * simulationEngine.cars.length,
        y: 100,
      }),
    );
  }, []);

  return <canvas ref={canvasRef} width="800" height="600" />;
}
