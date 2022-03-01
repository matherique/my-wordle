import Wordle from "src/components/wordle";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>JOGAR</h1>
      <Wordle />
    </div>
  );
}
