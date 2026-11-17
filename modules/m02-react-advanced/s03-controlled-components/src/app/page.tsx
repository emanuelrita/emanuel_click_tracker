import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Contact Us</h1>
          <p>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <ContactForm />
      </main>
    </div>
  );
}
