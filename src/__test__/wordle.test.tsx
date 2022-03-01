import { fireEvent, screen, render } from "@testing-library/react";
import Wordle from "../components/wordle";

describe("Home", () => {
  it("should render a valid key into the screen", () => {
    const { getByText } = render(<Wordle />);
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });

    expect(getByText(/a/i)).toBeInTheDocument();
  });

  it("should render only 5 letters per line", () => {
    const { getByText } = render(<Wordle />);
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "b", code: "KeyA" });
    fireEvent.keyDown(window, { key: "c", code: "KeyA" });
    fireEvent.keyDown(window, { key: "d", code: "KeyA" });
    fireEvent.keyDown(window, { key: "e", code: "KeyA" });

    expect(getByText(/e/i)).not.toBeInTheDocument();
  });
});
