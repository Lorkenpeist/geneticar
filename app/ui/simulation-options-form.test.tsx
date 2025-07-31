import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SimulationOptionsForm from "./simulation-options-form";
import {
  CAR_COUNT_DEFAULT,
  CAR_COUNT_LABEL,
  CAR_COUNT_MAX,
} from "../lib/constants";
import { DiscreetSliderProps } from "./discreet-slider";
import { CAR_PROP_SPECS } from "../lib/car-properties";

jest.mock("./discreet-slider", () => ({
  __esModule: true,
  default: ({
    id,
    name,
    label,
    min,
    max,
    step = 1,
    defaultValue,
  }: DiscreetSliderProps) => (
    <input
      id={id}
      name={name}
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      aria-label={label}
    />
  ),
}));

describe(SimulationOptionsForm.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const simulationOptions = {
    carCount: CAR_COUNT_DEFAULT,
    carProperties: {
      length: CAR_PROP_SPECS.length.default,
      height: CAR_PROP_SPECS.height.default,
      wheelRadius: CAR_PROP_SPECS.wheelRadius.default,
      engineTorque: CAR_PROP_SPECS.engineTorque.default,
      rpmLimit: CAR_PROP_SPECS.rpmLimit.default,
    },
  };
  const setSimulationOptions = jest.fn();

  const simulationOptionsForm = (
    <SimulationOptionsForm
      options={simulationOptions}
      setOptions={setSimulationOptions}
    />
  );

  it("renders correctly", () => {
    const tree = render(simulationOptionsForm);
    expect(tree.container).toMatchSnapshot();
  });

  it("sets simulation options when form is submitted", async () => {
    const tree = render(simulationOptionsForm);

    fireEvent.change(tree.getByLabelText(CAR_COUNT_LABEL), {
      target: { value: CAR_COUNT_MAX },
    });

    Object.values(CAR_PROP_SPECS).forEach((spec) => {
      fireEvent.change(tree.getByLabelText(spec.label), {
        target: { value: spec.max },
      });
    });

    fireEvent.submit(tree.container.querySelector("form")!);

    expect(setSimulationOptions).toHaveBeenCalledTimes(1);
    expect(setSimulationOptions).toHaveBeenCalledWith({
      carCount: CAR_COUNT_MAX,
      carProperties: Object.fromEntries(
        Object.entries(CAR_PROP_SPECS).map(([key, spec]) => [key, spec.max]),
      ),
    });
  });
});
