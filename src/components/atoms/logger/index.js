import React, { useState } from "react";
import { Animate, Notice } from "@wordpress/components";
export const Logger = () => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  <div
    style={{
      position: "absolute",
      bottom: 15,
      left: 0,
      width: "100%",
    }}
  >
    <Animate type="slide-in" options={{ origin: "top" }} origin="bottom">
      {({ className }) => (
        <Notice className={className} status="success">
          <p>Animation finished.</p>
        </Notice>
      )}
    </Animate>
  </div>;
};

