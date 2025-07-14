import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiscreetSlider from "./discreet-slider";

describe(DiscreetSlider.name, () => {
  const slider = (
    <DiscreetSlider
      id="propId"
      name="propName"
      label="My Property"
      min={1}
      max={5}
      step={1}
      defaultValue={3}
    />
  );

  it("renders correctly", () => {
    const tree = render(slider);
    expect(tree.container).toMatchSnapshot();
  });

  it("updates its value when dragged", async () => {
    const tree = render(slider, { container: document.createElement("form") });

    const sliderInput = tree.getByRole("slider");

    fireEvent.change(sliderInput, { target: { value: 4 } });

    // Confirm that the display text is in sync with the slider
    expect(tree.getByText(/My Property:/)).toHaveTextContent(
      /^My Property: 4$/,
    );
    // Confirm that the form will be submitted with the correct value
    expect(tree.container).toHaveFormValues({ propName: "4" });
  });
});
