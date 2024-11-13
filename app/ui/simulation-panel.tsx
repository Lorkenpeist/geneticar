"use client";

import React, { useEffect, useState } from "react";
import { SimulationCanvas } from "./simulation-canvas";
import {
  simulationEngine,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import SimulationOptionsForm from "./simulation-options-form";

export function SimulationPanel() {
  const [simulationOptions, setSimulationOptions] = useState<SimulationOptions>(
    { carCount: 3 },
  );
  useEffect(() => {
    simulationEngine.start(simulationOptions);
    return () => simulationEngine.stop();
  }, [simulationOptions]);

  return (
    <div className="flex flex-row gap-2">
      <SimulationCanvas />
      <SimulationOptionsForm
        options={simulationOptions}
        setOptions={setSimulationOptions}
      />
    </div>
  );
}
