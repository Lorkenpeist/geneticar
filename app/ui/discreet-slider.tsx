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

  return (
    <div className="flex flex-col items-center text-xs font-medium">
      <label htmlFor={id} className="ml-2 flex">
        {label}
      </label>
      <div className="flex flex-row space-x-1 items-center">
        <div>{min}</div>
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
        <div>{max}</div>
      </div>
      {/* TODO: Make this an interactive form input */}
      {/* TODO: Arrange elements within this component */}
      {/* TODO: Rename to PropertySlider, handle non-discreet */}
      <div>Current value: {value}</div>
    </div>
  );
}
