import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  CAR_COUNT_MAX,
  CAR_COUNT_MIN,
  ConfigurableCarProp,
  CAR_WIDTH,
  CAR_HEIGHT,
  CAR_WHEEL_SIZE,
  CAR_TORQUE,
  CAR_RPM_LIMIT,
} from "@/app/lib/constants";
import { SimulationOptions } from "@/app/lib/simulation-engine";
import DiscreetSlider from "./discreet-slider";
import { Button } from "./button";

// Create the validation schema for a car property
function carPropSchema(carProp: ConfigurableCarProp) {
  return z.coerce.number().gte(carProp.min).lte(carProp.max);
}

const FormSchema = z.object({
  carCount: z.coerce.number().int().gte(CAR_COUNT_MIN).lte(CAR_COUNT_MAX),
  carProperties: z.object({
    width: carPropSchema(CAR_WIDTH),
    height: carPropSchema(CAR_HEIGHT),
    wheelSize: carPropSchema(CAR_WHEEL_SIZE),
    torque: carPropSchema(CAR_TORQUE),
    rpmLimit: carPropSchema(CAR_RPM_LIMIT),
  }),
});

export default function SimulationOptionsForm({
  options,
  setOptions,
}: {
  options: SimulationOptions;
  setOptions: Dispatch<SetStateAction<SimulationOptions>>;
}) {
  function formAction(formData: FormData) {
    const newOptions: SimulationOptions = FormSchema.parse({
      carCount: formData.get("carCount"),
      carProperties: {
        width: formData.get("carWidth"),
        height: formData.get("carHeight"),
        wheelSize: formData.get("carWheelSize"),
        torque: formData.get("carTorque"),
        rpmLimit: formData.get("carRpmLimit"),
      },
    });
    setOptions(newOptions);
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Simulation Options
          </legend>
          <div className="rounded-md border border-gray-200 bg-white dark:bg-gray-900 px-[14px] py-3">
            <div className="flex flex-col gap-4">
              {/* TODO: make this a loop */}
              <DiscreetSlider
                id="carCount"
                name="carCount"
                label="Number of cars"
                min={CAR_COUNT_MIN}
                max={CAR_COUNT_MAX}
                defaultValue={options.carCount}
              />
              <DiscreetSlider
                id="carWidth"
                name="carWidth"
                label="Width"
                min={CAR_WIDTH.min}
                max={CAR_WIDTH.max}
                step={CAR_WIDTH.stepSize}
                defaultValue={options.carProperties.width}
              />
              <DiscreetSlider
                id="carHeight"
                name="carHeight"
                label="Height"
                min={CAR_HEIGHT.min}
                max={CAR_HEIGHT.max}
                step={CAR_HEIGHT.stepSize}
                defaultValue={options.carProperties.height}
              />
              <DiscreetSlider
                id="carWheelSize"
                name="carWheelSize"
                label="Wheel size"
                min={CAR_WHEEL_SIZE.min}
                max={CAR_WHEEL_SIZE.max}
                step={CAR_WHEEL_SIZE.stepSize}
                defaultValue={options.carProperties.wheelSize}
              />
              <DiscreetSlider
                id="carTorque"
                name="carTorque"
                label="Torque"
                min={CAR_TORQUE.min}
                max={CAR_TORQUE.max}
                step={CAR_TORQUE.stepSize}
                defaultValue={options.carProperties.torque}
              />
              <DiscreetSlider
                id="carRpmLimit"
                name="carRpmLimit"
                label="RPM limit"
                min={CAR_RPM_LIMIT.min}
                max={CAR_RPM_LIMIT.max}
                step={CAR_RPM_LIMIT.stepSize}
                defaultValue={options.carProperties.rpmLimit}
              />
            </div>
          </div>
        </fieldset>
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Update</Button>
        </div>
      </div>
    </form>
  );
}
