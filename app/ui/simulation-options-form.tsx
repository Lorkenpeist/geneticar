import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  CAR_COUNT_MAX,
  CAR_COUNT_MIN,
  CAR_HEIGHT_MAX,
  CAR_HEIGHT_MIN,
  CAR_WHEEL_SIZE_MAX,
  CAR_WHEEL_SIZE_MIN,
  CAR_WIDTH_MAX,
  CAR_WIDTH_MIN,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import DiscreetSlider from "./discreet-slider";
import { Button } from "./button";

const FormSchema = z.object({
  carCount: z.coerce.number().int().gte(CAR_COUNT_MIN).lte(CAR_COUNT_MAX),
  carDimensions: z.object({
    width: z.coerce.number().int().gte(CAR_WIDTH_MIN).lte(CAR_WIDTH_MAX),
    height: z.coerce.number().int().gte(CAR_HEIGHT_MIN).lte(CAR_HEIGHT_MAX),
    wheelSize: z.coerce
      .number()
      .int()
      .gte(CAR_WHEEL_SIZE_MIN)
      .lte(CAR_WHEEL_SIZE_MAX),
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
      carDimensions: {
        width: formData.get("carWidth"),
        height: formData.get("carHeight"),
        wheelSize: formData.get("carWheelSize"),
      },
    });
    setOptions(newOptions);
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Simulation Options
          </legend>
          <div className="rounded-md border border-gray-200 bg-white dark:bg-gray-900 px-[14px] py-3">
            <div className="flex flex-col gap-4">
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
                min={CAR_WIDTH_MIN}
                max={CAR_WIDTH_MAX}
                step={10}
                defaultValue={options.carDimensions.width}
              />
              <DiscreetSlider
                id="carHeight"
                name="carHeight"
                label="Height"
                min={CAR_HEIGHT_MIN}
                max={CAR_HEIGHT_MAX}
                step={10}
                defaultValue={options.carDimensions.height}
              />
              <DiscreetSlider
                id="carWheelSize"
                name="carWheelSize"
                label="Wheel size"
                min={CAR_WHEEL_SIZE_MIN}
                max={CAR_WHEEL_SIZE_MAX}
                step={10}
                defaultValue={options.carDimensions.wheelSize}
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
