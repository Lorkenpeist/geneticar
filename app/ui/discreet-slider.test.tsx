import { render } from "@testing-library/react";
import DiscreetSlider from "./discreet-slider";

describe(DiscreetSlider.name, () => {
  it("renders correctly", () => {
    const tree = render(
      <DiscreetSlider
        id="propId"
        name="propName"
        label="My Property"
        min={1}
        max={5}
        step={1}
        defaultValue={3}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
