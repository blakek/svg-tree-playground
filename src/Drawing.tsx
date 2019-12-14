import React, { useLayoutEffect, useRef, useState } from "react";
import { drawTree } from "./drawTree";

function Tree() {
  const [{ height, width }, setDimensions] = useState({ height: 1, width: 1 });
  const rootRef = useRef<SVGSVGElement>(null!);

  useLayoutEffect(() => {
    function handleResize() {
      setDimensions(rootRef.current.getBoundingClientRect());
    }

    // Set initial size
    handleResize();
    // Resize when the window size changes
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startingX = width / 2;
  const startingY = height;

  return (
    <svg ref={rootRef} style={styles.svg} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="background-fill" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="blue" />
          <stop offset="45%" stopColor="dodgerblue" />
          <stop offset="95%" stopColor="papayawhip" />
        </linearGradient>
      </defs>

      <rect
        fill="url(#background-fill)"
        x="0"
        y="0"
        width={width}
        height={height}
      />
      <path
        fill="none"
        stroke="#110"
        strokeWidth="1.5"
        d={`M${startingX},${startingY} ${drawTree(
          Math.min(height, width) / 10
        )}`}
      />
    </svg>
  );
}

const styles = {
  svg: {
    height: "100vh",
    width: "100vw"
  }
};

export default Tree;
