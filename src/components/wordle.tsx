import React from "react";
import styles from "../styles/wordle.module.css";

// create a alphabet string
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const BACKSPACE = "Backspace";
const ENTER = "Enter";
const G = "green";
const Y = "yellow";
const NOT = "gray";

const RESPONSE = "jogar";

type Word = {
  color: string[];
  text: string;
};

type WordleItemProps = {
  word: Word;
  index: number;
};

function WordleItem({ word, index }: WordleItemProps) {
  const letters = Array.from(word.text);

  return (
    <div className={styles.word}>
      {Array.from("12345").map((w, i) => (
        <span
          className={styles.letter}
          data-testid={`word_${index}_${i}`}
          style={{ color: word?.color[i] || NOT }}
          key={`${w}_${i}`}
        >
          {letters[i]}
        </span>
      ))}
    </div>
  );
}

type Action = {
  type: "REMOVE_LETTER" | "ADD_LETTER" | "CHECK_WORD";
  payload: {
    letter: string;
    index: number;
  };
};

type State = {
  words: Word[];
  win: boolean;
};

function reducer(state: State, action: Action) {
  const { letter, index } = action.payload;
  const currentWord = state.words[index];
  const words = [...state.words];

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
          RESPONSE.includes(w) &&
          RESPONSE.indexOf(w) === currentWord.text.indexOf(w)
        ) {
          color.push(G);
          continue;
        }

        if (RESPONSE.includes(w)) {
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

const initialWordsState: Word[] = [
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
  { color: [NOT, NOT, NOT, NOT, NOT, NOT], text: "" },
];

type WordleProps = {
  answer: string;
};

export default function Wordle({ answer }: WordleProps) {
  const [index, setIndex] = React.useState<number>(0);
  const [state, dispatch] = React.useReducer(reducer, {
    words: initialWordsState,
    win: false,
  });
  /*
  function removeWord() {
    setTable((state) => {
      if (state[currentLine].length === 0) return state;
      state[currentLine] = state[currentLine].slice(0, -1);

      return state;
    });
  }
  */

  /*
  function checkWord(word: string): string[] {
    const colors: string[] = [];
    for (const w of Array.from(word)) {
      if (RESPONSE.includes(w) && RESPONSE.indexOf(w) === word.indexOf(w)) {
        colors.push(G);
        continue;
      }

      if (RESPONSE.includes(w)) {
        colors.push(Y);
        continue;
      }

      colors.push(NOT);
    }

    return colors;
  }
  */

  React.useEffect(() => {
    const keydetect = (event: KeyboardEvent) => {
      const letter = event.key;

      if (BACKSPACE === letter) {
        dispatch({ payload: { index, letter }, type: "REMOVE_LETTER" });
        return;
      }

      if (
        ENTER === letter &&
        state.words[index].text.length === 5 &&
        index < 4
      ) {
        setIndex((state) => state + 1);
        dispatch({ payload: { index, letter }, type: "CHECK_WORD" });
        return;
      }

      if (alphabet.includes(letter.toLocaleLowerCase())) {
        dispatch({ payload: { index, letter }, type: "ADD_LETTER" });
        return;
      }
    };
    window.addEventListener("keydown", keydetect);
    return () => window.removeEventListener("keydown", keydetect);
  }, [index, state]);

  return (
    <div className={styles.container}>
      {Array.from("12345").map((_, id) => (
        <WordleItem key={id} index={id} word={state.words[id]} />
      ))}
    </div>
  );
}
