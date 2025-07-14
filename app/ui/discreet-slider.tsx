import { useState } from "react";

export default function DiscreetSlider({
  id,
  name,
  label,
  min,
  max,
  step = 1,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
}) {
  const [value, setValue] = useState(`${defaultValue}`);

  {
    /* TODO: Rename to PropertySlider, handle non-discreet */
  }
  return (
    <div className="flex flex-col items-center text-xs font-medium">
      <label htmlFor={id}>
        {label}: {value}
      </label>
      <div className="flex flex-row gap-1 items-center">
        <div className="w-5 text-right">{min}</div>
        <input
          id={id}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          list={`${id}:markers`}
        />
        <datalist id={`${id}:markers`}>
          {Array.from(
            { length: (max - min) / step + 1 },
            (_, i) => i * step + min,
          ).map((i) => (
            <option value={i} key={`${i}`}></option>
          ))}
        </datalist>
        <div className="w-7 text-left">{max}</div>
      </div>
    </div>
  );
}
