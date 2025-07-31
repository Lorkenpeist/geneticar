"use client";

import React, { useEffect, useState } from "react";
import { SimulationCanvas } from "./simulation-canvas";
import {
  simulationEngine,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import SimulationOptionsForm from "./simulation-options-form";
import { CAR_COUNT_DEFAULT } from "../lib/constants";
import { CAR_PROP_SPECS } from "../lib/car-properties";

export function SimulationPanel() {
  const [simulationOptions, setSimulationOptions] = useState<SimulationOptions>(
    {
      carCount: CAR_COUNT_DEFAULT,
      carProperties: {
        length: CAR_PROP_SPECS.length.default,
        height: CAR_PROP_SPECS.height.default,
        wheelRadius: CAR_PROP_SPECS.wheelRadius.default,
        engineTorque: CAR_PROP_SPECS.engineTorque.default,
        rpmLimit: CAR_PROP_SPECS.rpmLimit.default,
      },
    },
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
