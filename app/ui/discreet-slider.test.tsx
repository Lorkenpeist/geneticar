import { render, fireEvent, screen } from "@testing-library/react";
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
    expect(tree).toMatchSnapshot();
  });

  it("updates its value when dragged", async () => {
    render(<form data-testid="form">{slider}</form>);
    const sliderInput = screen.getByLabelText("My Property");
    fireEvent.change(sliderInput, { target: { value: 4 } });
    // Sanity check that the slider itself is set to 4
    expect(sliderInput).toHaveDisplayValue("4");
    // Confirm that the display text is in sync with the slider
    expect(screen.getByText(/Current value:/)).toHaveTextContent(
      /^Current value: 4$/,
    );
    // Confirm that the form will be submitted with the correct value
    expect(screen.getByTestId("form")).toHaveFormValues({ propName: "4" });
  });
});
