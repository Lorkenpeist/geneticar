import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertySlider from "./property-slider";

describe(PropertySlider.name, () => {
  const discreteSlider = (
    <PropertySlider
      id="discrete-slider"
      name="discreteSlider"
      label="Discrete Slider"
      min={1}
      max={5}
      step={1}
      defaultValue={3}
    />
  );
  const continuousSlider = (
    <PropertySlider
      id="continuous-slider"
      name="continuousSlider"
      label="Continuous Slider"
      min={1}
      max={5}
      defaultValue={3}
    />
  );

  it("renders discrete slider correctly", () => {
    const tree = render(discreteSlider);
    expect(tree.container).toMatchSnapshot();
  });

  it("renders continuous slider correctly", () => {
    const tree = render(continuousSlider);
    expect(tree.container).toMatchSnapshot();
  });

  it.each([
    { slider: discreteSlider, newValue: 4 },
    { slider: continuousSlider, newValue: 4 },
    { slider: continuousSlider, newValue: 3.14 },
  ])("updates its value when dragged", async ({ slider, newValue }) => {
    const tree = render(slider, { container: document.createElement("form") });

    const sliderInput = tree.getByRole("slider");

    fireEvent.change(sliderInput, { target: { value: newValue } });

    // Confirm that the display text is in sync with the slider
    expect(tree.getByText(new RegExp(slider.props.label))).toHaveTextContent(
      new RegExp(`^${slider.props.label}: ${newValue}$`),
    );
    // Confirm that the form will be submitted with the correct value
    expect(tree.container).toHaveFormValues({
      [slider.props.name]: `${newValue}`,
    });
  });
});
