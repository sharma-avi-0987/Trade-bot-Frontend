import { useState, useEffect, useRef } from "react";

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e) => {
      const el = magnetRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distanceX = Math.abs(deltaX);
      const distanceY = Math.abs(deltaY);

      const withinBounds =
        distanceX < rect.width / 2 + padding && distanceY < rect.height / 2 + padding;

      if (withinBounds) {
        setIsActive(true);
        setPosition({
          x: deltaX / magnetStrength,
          y: deltaY / magnetStrength,
        });
      } else {
        resetPosition();
      }
    };

    const resetPosition = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetPosition);
    };
  }, [padding, disabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{
        display: "inline-block",
        perspective: "1000px",
        willChange: "transform",
      }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
