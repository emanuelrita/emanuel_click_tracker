"use client";
import { useEffect, useState } from "react";

export default function TimerMessage({
  initialCount = 10,
}: Readonly<{
  initialCount?: number;
}>) {
  const [count, setCount] = useState(initialCount);
  const [isCancelled, setIsCancelled] = useState(false);
  const isFinished = count === 0;

  useEffect(() => {
    if (isCancelled || isFinished) return;

    const timer = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isCancelled, isFinished]);

  return (
    <div>
      <p>Initial count: {initialCount}</p>
      <p>Is finished: {isFinished ? "Yes" : "No"}</p>
      <p>Is cancelled: {isCancelled ? "Yes" : "No"}</p>
      <p>Timer message</p>
      <p> Count down {count}</p>
      {isFinished && <p>Time&apos;s up!</p>}
      {isCancelled && <p>Timer cancelled</p>}

      {!isCancelled && !isFinished && (
        <button onClick={() => setIsCancelled(true)}>Cancel Timer</button>
      )}

      {(isCancelled || isFinished) && (
        <button
          onClick={() => {
            setIsCancelled(false);
            setCount(initialCount);
          }}
        >
          Restart Timer
        </button>
      )}
    </div>
  );
}
