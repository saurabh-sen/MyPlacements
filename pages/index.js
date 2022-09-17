import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import App from "../Components/App";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyPlacement</title>
        <meta
          name="description"
          content="It provide On Campus related information "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <App />
      </div>
    </div>
  );
}
