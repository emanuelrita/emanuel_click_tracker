"use client";

import { useState } from "react";

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
    <div>
      <p style={{ color }}>Clicked {count} times</p>
      <button
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
        onClick={() => {
          setCount(0);
          setColor("blue");
          setHistory([]);
        }}
      >
        Reset
      </button>
      <button onClick={() => setColor(color === "blue" ? "red" : "blue")}>
        Toggle Color
      </button>

      <fieldset>
        <legend>User settings</legend>
        <label>
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
        <label>
          <input
            type="checkbox"
            checked={settings.showHistory}
            onChange={(event) => {
              const showHistory = event.currentTarget.checked;
              setSettings((previous) => ({ ...previous, showHistory }));
            }}
          />{" "}
          Show click history
        </label>
        <button onClick={() => setSettings(defaultSettings)}>
          Reset settings
        </button>
      </fieldset>
      {settings.showHistory && (
        <section aria-label="Click history">
          <h2>Click history</h2>
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
    </div>
  );
}
