"use client";

import React, { useEffect, useState } from "react";
import { SimulationCanvas } from "./simulation-canvas";
import {
  simulationEngine,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import SimulationOptionsForm from "./simulation-options-form";
import {
  CAR_COUNT_DEFAULT,
  CAR_HEIGHT,
  CAR_RPM_LIMIT,
  CAR_TORQUE,
  CAR_WHEEL_SIZE,
  CAR_WIDTH,
} from "../lib/constants";

export function SimulationPanel() {
  const [simulationOptions, setSimulationOptions] = useState<SimulationOptions>(
    {
      carCount: CAR_COUNT_DEFAULT,
      carProperties: {
        width: CAR_WIDTH.default,
        height: CAR_HEIGHT.default,
        wheelSize: CAR_WHEEL_SIZE.default,
        torque: CAR_TORQUE.default,
        rpmLimit: CAR_RPM_LIMIT.default,
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
