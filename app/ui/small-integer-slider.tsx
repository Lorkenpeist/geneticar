export default function SmallIntegerSlider({
  id,
  name,
  label,
  min,
  max,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
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
          step={1}
          defaultValue={defaultValue}
          list={`${id}:markers`}
          className="cursor-pointer"
        />
        <datalist id={`${id}:markers`}>
          {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((i) => (
            <option value={i} key={i.toString()}></option>
          ))}
        </datalist>
        <div>{max}</div>
      </div>
    </div>
  );
}
