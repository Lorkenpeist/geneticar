import { useState } from "react";

export interface PropertySliderProps {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
}

// A car property slider component that allows users to adjust car properties
export default function PropertySlider({
  id,
  name,
  label,
  min,
  max,
  step,
  defaultValue,
}: PropertySliderProps) {
  const [value, setValue] = useState(`${defaultValue}`);

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
          step={step ?? 0.01}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          {...(step && { list: `${id}:markers` })}
        />
        {step && (
          <datalist id={`${id}:markers`}>
            {Array.from(
              { length: (max - min) / step + 1 },
              (_, i) => i * step + min,
            ).map((i) => (
              <option value={i} key={`${i}`}></option>
            ))}
          </datalist>
        )}
        <div className="w-7 text-left">{max}</div>
      </div>
    </div>
  );
}
