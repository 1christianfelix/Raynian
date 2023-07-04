import React, { useEffect, useRef, useContext } from "react";
import { BGCustomContext } from "../../../context/BGCustomContext";

function AnglePicker() {
  const { bgProperties, setBGProperties } = useContext(BGCustomContext);

  const circleRef = useRef(null);
  const isDragging = useRef(false);

  const isWithinCircle = (cursorPosition, circleCenter, circleRadius) => {
    const dx = cursorPosition.x - circleCenter.x;
    const dy = cursorPosition.y - circleCenter.y;
    return dx * dx + dy * dy <= circleRadius * circleRadius;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current || !circleRef.current) return;

      const circleRect = circleRef.current.getBoundingClientRect();
      const circleCenter = {
        x: circleRect.left + circleRect.width / 2,
        y: circleRect.top + circleRect.height / 2,
      };

      const circleRadius = circleRect.width / 2;

      if (
        !isWithinCircle(
          { x: e.clientX, y: e.clientY },
          circleCenter,
          circleRadius
        )
      ) {
        return;
      }

      const angleRad = Math.atan2(
        e.clientY - circleCenter.y,
        e.clientX - circleCenter.x
      );
      const newAngle = Math.floor((angleRad * 180) / Math.PI + 90);

      let angleVal;

      if (newAngle > 90 && newAngle < 270) {
        angleVal = 360 - (newAngle - 90);
      } else {
        angleVal = newAngle >= 270 ? newAngle - 270 : 90 - newAngle;
      }

      setBGProperties((prev) => ({
        ...prev,
        angle: newAngle,
        angleVal: angleVal,
      }));
    };

    const handleMouseDown = (e) => {
      if (circleRef.current) {
        const circleRect = circleRef.current.getBoundingClientRect();
        const circleCenter = {
          x: circleRect.left + circleRect.width / 2,
          y: circleRect.top + circleRect.height / 2,
        };

        const circleRadius = circleRect.width / 2;

        if (
          isWithinCircle(
            { x: e.clientX, y: e.clientY },
            circleCenter,
            circleRadius
          )
        ) {
          isDragging.current = true;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setBGProperties]);

  return (
    <div style={{ position: "relative", height: "70px", width: "70px" }}>
      <div
        ref={circleRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "1px solid black",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "35px",
            backgroundColor: "black",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: `rotate(${bgProperties.angle}deg)`,
            transformOrigin: "bottom",
          }}
        />
      </div>
    </div>
  );
}

export default AnglePicker;
