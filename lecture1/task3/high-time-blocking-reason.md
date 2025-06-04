# Analysis of High Total Blocking Time (TBT)

The 600ms TBT is caused by your heavy loop blocking the main thread:

```typescript
useEffect(() => {
  let t = 0;
  for (let i = 0; i < 1e8; i++) {
    t += i;
  } // 🚫 Blocking operation
  setD(t);
}, []);
```

## Key issues

1- Main thread blocking: JavaScript runs on the main thread, freezing UI responsiveness
2- Long task execution: The loop takes ~600ms to complete (exceeding the 50ms threshold per task)
3- Delayed interactivity: Blocks event handling and rendering until completion

## Optimized Solution using Web Workers

Here's the refactored implementation:

- Create Web Worker (worker.ts):

```typescript
// worker.ts
self.onmessage = (e) => {
  if (e.data === "start") {
    let t = 0;
    for (let i = 0; i < 1e8; i++) t += i;
    postMessage(t);
  }
};
```

- Updated Dashboard Component (Dashboard.tsx):

```typescript
import React, { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [d, setD] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));

    workerRef.current.onmessage = (e) => {
      setD(e.data);
      workerRef.current?.terminate();
    };

    workerRef.current.postMessage("start");

    // Cleanup
    return () => workerRef.current?.terminate();
  }, []);

  return <div>{d !== null ? d : "Calculating..."}</div>;
}
```

## Key improvements

- 🧵 Offloads heavy computation to a background thread
  -⚡️ Keeps main thread free for UI interactions
- ♻️ Proper resource cleanup with worker termination
- 📊 Visual feedback during calculation
