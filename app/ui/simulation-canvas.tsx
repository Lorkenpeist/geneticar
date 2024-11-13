"use client";

import React, { useRef, useEffect } from "react";
import { Render } from "matter-js";

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
    const render = Render.create({ engine: simulationEngine.engine, canvas });
    Render.run(render);
  }, []);

  return <canvas ref={canvasRef} width="800" height="600" />;
}
