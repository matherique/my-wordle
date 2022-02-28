import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

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
};

function WordleItem({ word }: WordleItemProps) {
  const letters = Array.from(word.text);

  return (
    <div className={styles.word}>
      {Array.from("12345").map((w, i) => (
        <span
          className={styles.letter}
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
  type: "REMOVE_LETTER" | "ADD_LETTER" | "SEND";
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

  switch (action.type) {
    case "ADD_LETTER":
      state.words[index].text = state.words[index].text + letter;
      return { ...state };

    case "REMOVE_LETTER":
      state.words[index].text = state.words[index].text.slice(0, -1);
      return { ...state };

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

const Home: NextPage = () => {
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
      const key = event.key;

      // if (BACKSPACE === key) {
      //   return;
      // }

      // if (ENTER === key && table[currentLine].length === 5) {
      //   const colors = checkWord(table[currentLine]);
      //   setColors(colors);
      //   setCurrentLine((state) => state + 1);
      // }

      if (alphabet.includes(key.toLocaleLowerCase())) {
        dispatch({ payload: { index: 0, letter: key }, type: "ADD_LETTER" });
      }
    };
    window.addEventListener("keydown", keydetect);
    return () => window.removeEventListener("keydown", keydetect);
  }, []);

  return (
    <div className={styles.container}>
      <h1>JOGAR</h1>
      {Array.from("12345").map((_, id) => (
        <WordleItem key={id} word={state.words[id]} />
      ))}
    </div>
  );
};

export default Home;
