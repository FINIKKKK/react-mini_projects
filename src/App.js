import React from "react";
import { useInView } from "react-intersection-observer";

import "./index.scss";

function App() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div>
      <div className="section">Section 1</div>

      <div ref={ref} className={`section banner ${inView ? "active" : ""}`}>
        Banner
      </div>

      <div className="section">Section 1</div>
    </div>
  );
}

export default App;
