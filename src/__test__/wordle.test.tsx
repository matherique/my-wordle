import { fireEvent, render } from "@testing-library/react";
import Wordle from "../components/wordle";

describe("Home", () => {
  it("should render a valid key into the screen", () => {
    const { getByText } = render(<Wordle />);
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });

    expect(getByText(/a/i)).toBeInTheDocument();
  });

  it("should render key in corret place", () => {
    const { getByTestId, queryByText } = render(<Wordle />);

    fireEvent.keyDown(window, { key: "j", code: "KeyJ" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "g", code: "KeyG" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "x", code: "KeyX" });

    expect(getByTestId("word_0_0")).toHaveTextContent("j");
    expect(getByTestId("word_0_1")).toHaveTextContent("o");
    expect(getByTestId("word_0_2")).toHaveTextContent("g");
    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should only render 5 letters per line", () => {
    const { queryByText } = render(<Wordle />);

    fireEvent.keyDown(window, { key: "j", code: "KeyJ" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "g", code: "KeyG" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "x", code: "KeyX" });

    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should remove a letter when press Backspace", () => {
    const { queryByTestId } = render(<Wordle />);

    fireEvent.keyDown(window, { key: "j", code: "KeyJ" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "g", code: "KeyG" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "Backspace", code: "Backspace" });

    expect(queryByTestId("word_0_4")).not.toHaveTextContent("r");
  });

  it("should add letter to next line when press Enter", () => {
    const { queryByTestId } = render(<Wordle />);

    fireEvent.keyDown(window, { key: "j", code: "KeyJ" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "g", code: "KeyG" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(window, { key: "x", code: "KeyX" });

    expect(queryByTestId("word_1_0")).toHaveTextContent("x");
  });
});
