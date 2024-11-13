import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  BOX_COUNT_MAX,
  BOX_COUNT_MIN,
  SimulationOptions,
} from "@/app/lib/simulation-engine";
import SmallIntegerSlider from "./small-integer-slider";
import { Button } from "./button";

const FormSchema = z.object({
  boxCount: z.coerce.number().int().gte(BOX_COUNT_MIN).lte(BOX_COUNT_MAX),
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
      boxCount: formData.get("boxCount"),
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
                id="boxCount"
                name="boxCount"
                label="Number of boxen"
                min={BOX_COUNT_MIN}
                max={BOX_COUNT_MAX}
                defaultValue={options.boxCount}
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
