import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  CAR_COUNT_MAX,
  CAR_COUNT_MIN,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import SmallIntegerSlider from "./small-integer-slider";
import { Button } from "./button";

const FormSchema = z.object({
  carCount: z.coerce.number().int().gte(CAR_COUNT_MIN).lte(CAR_COUNT_MAX),
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
              <SmallIntegerSlider
                id="carCount"
                name="carCount"
                label="Number of cars"
                min={CAR_COUNT_MIN}
                max={CAR_COUNT_MAX}
                defaultValue={options.carCount}
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
