import { fireEvent, render } from "@testing-library/react";
import Wordle from "../components/wordle";

describe("Home", () => {
  const answer = "JOGAR";

  it("should render a valid key into the screen", () => {
    const { getByText } = render(<Wordle answer={answer} />);
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });

    expect(getByText(/a/i)).toBeInTheDocument();
  });

  it("should render key in corret place", () => {
    const { getByTestId, queryByText } = render(<Wordle answer={answer} />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "x", code: "KeyF" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "f", code: "KeyX" });

    expect(getByTestId("word_0_0")).toHaveTextContent("a");
    expect(getByTestId("word_0_1")).toHaveTextContent("o");
    expect(getByTestId("word_0_2")).toHaveTextContent("x");
    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should only render 5 letters per line", () => {
    const { queryByText } = render(<Wordle answer={answer} />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "x", code: "KeyF" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "f", code: "KeyX" });

    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should remove a letter when press Backspace", () => {
    const { queryByTestId } = render(<Wordle answer={answer} />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "f", code: "KeyF" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "Backspace", code: "Backspace" });

    expect(queryByTestId("word_0_4")).not.toHaveTextContent("r");
  });

  it("should add letter to next line when press Enter", () => {
    const { queryByTestId } = render(<Wordle answer={answer} />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "f", code: "KeyF" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(window, { key: "x", code: "KeyX" });

    expect(queryByTestId("word_1_0")).toHaveTextContent("x");
  });

  it("should paint yellow letters that are in the wrong position but are in the word", () => {
    const { queryByTestId, debug } = render(<Wordle answer={answer} />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "o", code: "KeyO" });
    fireEvent.keyDown(window, { key: "f", code: "KeyF" });
    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "r", code: "KeyR" });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });

    expect(queryByTestId("word_0_0")).toHaveStyle("color: yellow;");
  });
});
