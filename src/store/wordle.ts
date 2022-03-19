import { G, Y, NOT } from "@/constants";
import { Word } from "@/types";

export type Action = {
  type: "REMOVE_LETTER" | "ADD_LETTER" | "CHECK_WORD";
  payload: {
    letter: string;
    index: number;
  };
};

type State = {
  response: string;
  words: Word[];
  win: boolean;
};

export function wordleReducer(state: State, action: Action) {
  const { letter, index } = action.payload;
  const currentWord = state.words[index];
  const words = [...state.words];
  const response = state.response;

  switch (action.type) {
    case "ADD_LETTER":
      if (currentWord.text.length === 5) return { ...state };

      words.splice(index, 1, {
        text: currentWord.text + letter,
        color: currentWord.color,
      });

      return { ...state, words };

    case "REMOVE_LETTER":
      words.splice(index, 1, {
        text: currentWord.text.slice(0, -1),
        color: currentWord.color,
      });

      return { ...state, words };

    case "CHECK_WORD":
      const color: string[] = [];
      for (const w of Array.from(currentWord.text)) {
        if (
          response.includes(w) &&
          response.indexOf(w) === currentWord.text.indexOf(w)
        ) {
          color.push(G);
          continue;
        }

        if (response.includes(w)) {
          color.push(Y);
          continue;
        }

        color.push(NOT);
      }

      words.splice(index, 1, {
        text: currentWord.text,
        color,
      });

      return { ...state, words };
    default:
      return state;
  }
}

export const initialWordsState: Word[] = [
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
];
