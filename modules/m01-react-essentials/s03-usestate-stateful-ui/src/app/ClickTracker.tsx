"use client";

import { useState } from "react";
import styles from "./ClickTracker.module.css";

const defaultSettings = {
  maxClicks: 10,
  showHistory: true,
};

export default function TrackerComponent() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("blue");
  const [history, setHistory] = useState<number[]>([]);
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <section className={styles.tracker} aria-label="Click tracker">
      <header className={styles.header}>
        <h2>Click tracker</h2>
      </header>
      <div className={styles.counter}>
        <p className={styles.count} data-color={color} aria-live="polite">
          <span>{count}</span>
          <span className={styles.countLabel}>
            of {settings.maxClicks} clicks
          </span>
        </p>
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.primary}`}
          disabled={count >= settings.maxClicks}
          onClick={() => {
            setCount(count + 1);
            setHistory((previous) => [...previous, count + 1]);
            if ((count + 1) % 5 === 0)
              setColor(color === "blue" ? "red" : "blue");
          }}
        >
          Click me
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setCount(0);
            setColor("blue");
            setHistory([]);
          }}
        >
          Reset
        </button>
        <button
          className={styles.button}
          onClick={() => setColor(color === "blue" ? "red" : "blue")}
        >
          Toggle Color
        </button>
      </div>

      <fieldset className={styles.settings}>
        <legend>User settings</legend>
        <div className={styles.settingsFields}>
          <label className={styles.numberField}>
            Maximum clicks
            <input
              type="number"
              min={0}
              step={1}
              required
              value={settings.maxClicks}
              onChange={(event) => {
                if (!event.currentTarget.reportValidity()) return;
                const maxClicks = event.currentTarget.valueAsNumber;
                setSettings((previous) => ({ ...previous, maxClicks }));
              }}
            />
          </label>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={settings.showHistory}
              onChange={(event) => {
                const showHistory = event.currentTarget.checked;
                setSettings((previous) => ({ ...previous, showHistory }));
              }}
            />
            Show click history
          </label>
        </div>
        <button
          className={styles.button}
          onClick={() => setSettings(defaultSettings)}
        >
          Reset settings
        </button>
      </fieldset>
      {settings.showHistory && (
        <section className={styles.history} aria-label="Click history">
          <h3>Click history</h3>
          {history.length === 0 ? (
            <p>No clicks yet.</p>
          ) : (
            <ol>
              {history.map((clickCount) => (
                <li key={clickCount}>Clicked {clickCount} times</li>
              ))}
            </ol>
          )}
        </section>
      )}
    </section>
  );
}
