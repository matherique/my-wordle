import Wordle from "@/components/wordle";
import styles from "@/styles/home.module.css";

export default function Home() {
  const answer = "JOGAR";
  return (
    <div className={styles.container}>
      <h1>JOGAR</h1>
      <Wordle answer={answer} />
    </div>
  );
}
