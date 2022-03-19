import React from "react";
import styles from "@/styles/wordle.module.css";
import { NOT, BACKSPACE, ENTER, alphabet } from "@/constants";
import { initialWordsState, wordleReducer } from "@/store/wordle";
import { Word } from "src/types";

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

type WordleProps = {
  answer: string;
};

export default function Wordle({ answer }: WordleProps) {
  const [index, setIndex] = React.useState<number>(0);
  const [state, dispatch] = React.useReducer(wordleReducer, {
    response: answer,
    words: initialWordsState,
    win: false,
  });

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
