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
          defaultValue={defaultValue}
          list={`${id}:markers`}
          className="cursor-pointer"
        />
        <datalist id={`${id}:markers`}>
          {Array.from(
            { length: (max - min) / step + 1 },
            (_, i) => i * step + min,
          ).map((i) => (
            <option value={i} key={i.toString()}></option>
          ))}
        </datalist>
        <div>{max}</div>
      </div>
    </div>
  );
}
