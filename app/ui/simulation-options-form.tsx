import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  CAR_COUNT_LABEL,
  CAR_COUNT_MAX,
  CAR_COUNT_MIN,
} from "@/app/lib/constants";
import {
  CarPropSpec,
  CAR_PROP_SPECS,
  CAR_PROP_KEYS,
} from "@/app/lib/car-properties";
import { SimulationOptions } from "@/app/lib/simulation-engine";
import DiscreetSlider from "./discreet-slider";
import { Button } from "./button";

// Create the validation schema for a car property
function carPropSchema(carPropSpec: CarPropSpec) {
  return z.coerce.number().gte(carPropSpec.min).lte(carPropSpec.max);
}

const FormSchema = z.object({
  carCount: z.coerce.number().int().gte(CAR_COUNT_MIN).lte(CAR_COUNT_MAX),
  carProperties: z.object(
    Object.fromEntries(
      Object.entries(CAR_PROP_SPECS).map(([key, spec]) => [
        key,
        carPropSchema(spec),
      ]),
    ),
  ),
});

export default function SimulationOptionsForm({
  options,
  setOptions,
}: {
  options: SimulationOptions;
  setOptions: Dispatch<SetStateAction<SimulationOptions>>;
}) {
  function formAction(formData: FormData) {
    const newOptions = FormSchema.parse({
      carCount: formData.get("carCount"),
      carProperties: Object.fromEntries(
        CAR_PROP_KEYS.map((key) => [key, formData.get(`car_${key}`)]),
      ),
    }) as SimulationOptions;
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
              <DiscreetSlider
                key="carCount"
                id="carCount"
                name="carCount"
                label={CAR_COUNT_LABEL}
                min={CAR_COUNT_MIN}
                max={CAR_COUNT_MAX}
                defaultValue={options.carCount}
              />
              {CAR_PROP_KEYS.map((key) => (
                <DiscreetSlider
                  key={key}
                  id={`car_${key}`}
                  name={`car_${key}`}
                  label={CAR_PROP_SPECS[key].label}
                  min={CAR_PROP_SPECS[key].min}
                  max={CAR_PROP_SPECS[key].max}
                  step={CAR_PROP_SPECS[key].stepSize}
                  defaultValue={options.carProperties[key]}
                />
              ))}
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
