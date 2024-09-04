"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Button has been clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
