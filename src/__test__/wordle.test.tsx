import { render } from "@testing-library/react";
import Wordle from "@/components/wordle";
import {
  A,
  F,
  O,
  R,
  X,
  type,
  YELLOW,
  GRAY,
  GREEN,
  Backspace,
  Enter,
  E,
  T,
  N,
  S,
  B,
  C,
  D,
  G,
  H,
  I,
  J,
} from "./utils";

describe("Home", () => {
  it("should render a valid key into the screen", () => {
    const { getByText } = render(<Wordle answer="jogar" />);
    type([A]);

    expect(getByText(/a/i)).toBeInTheDocument();
  });

  it("should render key in corret place", () => {
    const { getByTestId, queryByText } = render(<Wordle answer="jogar" />);

    type([A, O, X, A, R, F]);

    expect(getByTestId("word_0_0")).toHaveTextContent("a");
    expect(getByTestId("word_0_1")).toHaveTextContent("o");
    expect(getByTestId("word_0_2")).toHaveTextContent("x");
    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should only render 5 letters per line", () => {
    const { queryByText } = render(<Wordle answer="jogar" />);

    type([A, O, X, A, R, F]);

    expect(queryByText(/f/i)).not.toBeInTheDocument();
  });

  it("should remove a letter when press Backspace", () => {
    const { queryByTestId } = render(<Wordle answer="jogar" />);

    type([A, O, F, A, R, Backspace]);

    expect(queryByTestId("word_0_4")).not.toHaveTextContent("r");
  });

  it("should add letter to next line when press Enter", () => {
    const { queryByTestId } = render(<Wordle answer="jogar" />);

    type([A, O, F, A, R, Enter, X]);

    expect(queryByTestId("word_1_0")).toHaveTextContent("x");
  });

  it("all gray", () => {
    const { queryByTestId } = render(<Wordle answer="abcde" />);
    type([F, G, H, I, J, Enter]);

    expect(queryByTestId("word_0_0")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_1")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_2")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_3")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_4")).toHaveStyle(YELLOW);
  });

  it("all yellow", () => {
    const { queryByTestId } = render(<Wordle answer="abcde" />);
    type([E, A, B, C, D, Enter]);

    expect(queryByTestId("word_0_0")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_1")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_2")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_3")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_4")).toHaveStyle(YELLOW);
  });

  it("all green", () => {
    const { queryByTestId } = render(<Wordle answer="abcde" />);
    type([A, B, C, D, E, Enter]);

    expect(queryByTestId("word_0_0")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_1")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_2")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_3")).toHaveStyle(YELLOW);
    expect(queryByTestId("word_0_4")).toHaveStyle(YELLOW);
  });
});
