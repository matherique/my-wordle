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

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "b", code: "KeyB" });
    fireEvent.keyDown(window, { key: "c", code: "KeyC" });
    fireEvent.keyDown(window, { key: "d", code: "KeyD" });
    fireEvent.keyDown(window, { key: "e", code: "KeyE" });
    fireEvent.keyDown(window, { key: "f", code: "KeyF" });

    expect(getByTestId("word_0_0")).toHaveTextContent("a");
    expect(getByTestId("word_0_1")).toHaveTextContent("b");
    expect(getByTestId("word_0_2")).toHaveTextContent("c");
    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should only render 5 letters per line", () => {
    const { queryByText } = render(<Wordle />);

    fireEvent.keyDown(window, { key: "a", code: "KeyA" });
    fireEvent.keyDown(window, { key: "b", code: "KeyB" });
    fireEvent.keyDown(window, { key: "c", code: "KeyC" });
    fireEvent.keyDown(window, { key: "d", code: "KeyD" });
    fireEvent.keyDown(window, { key: "e", code: "KeyE" });
    fireEvent.keyDown(window, { key: "f", code: "KeyF" });

    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });
});
