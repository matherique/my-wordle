import { fireEvent } from "@testing-library/react";

export type Key = {
  witch: number;
  key: string;
  code: string;
};

export const YELLOW = `color: yellow;`;
export const GREEN = `color: green;`;
export const GRAY = `color: gray;`;

export function type(letters: Key[]) {
  letters.forEach((l) => fireEvent.keyDown(window, l));
}

export const A: Key = { witch: 65, key: "a", code: "KeyA" };
export const B: Key = { witch: 66, key: "b", code: "KeyB" };
export const C: Key = { witch: 67, key: "c", code: "KeyC" };
export const D: Key = { witch: 68, key: "d", code: "KeyD" };
export const E: Key = { witch: 69, key: "e", code: "KeyE" };
export const F: Key = { witch: 70, key: "f", code: "KeyF" };
export const G: Key = { witch: 71, key: "g", code: "KeyG" };
export const H: Key = { witch: 72, key: "h", code: "KeyH" };
export const I: Key = { witch: 73, key: "i", code: "KeyI" };
export const J: Key = { witch: 74, key: "j", code: "KeyJ" };
export const K: Key = { witch: 75, key: "k", code: "KeyK" };
export const L: Key = { witch: 76, key: "l", code: "KeyL" };
export const M: Key = { witch: 77, key: "m", code: "KeyM" };
export const N: Key = { witch: 78, key: "n", code: "KeyN" };
export const O: Key = { witch: 79, key: "o", code: "KeyO" };
export const P: Key = { witch: 80, key: "p", code: "KeyP" };
export const Q: Key = { witch: 81, key: "q", code: "KeyQ" };
export const R: Key = { witch: 82, key: "r", code: "KeyR" };
export const S: Key = { witch: 83, key: "s", code: "KeyS" };
export const T: Key = { witch: 84, key: "t", code: "KeyT" };
export const U: Key = { witch: 85, key: "u", code: "KeyU" };
export const V: Key = { witch: 86, key: "v", code: "KeyV" };
export const W: Key = { witch: 87, key: "w", code: "KeyW" };
export const X: Key = { witch: 88, key: "x", code: "KeyX" };
export const Y: Key = { witch: 89, key: "y", code: "KeyY" };
export const Z: Key = { witch: 90, key: "z", code: "Key" };
export const Backspace: Key = { witch: 8, key: "Backspace", code: "Backspace" };
export const Enter: Key = { witch: 13, key: "Enter", code: "Enter" };
