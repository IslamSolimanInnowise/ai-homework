// import { useState, useEffect } from "react";

// export default function Dashboard() {
//   const [d, setD] = useState<number | null>(null);
//   useEffect(() => {
//     let t = 0;
//     for (let i = 0; i < 1e8; i++) {
//       t += i;
//     }
//     setD(t);
//   }, []);
//   return <div>{d}</div>;
// }

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
