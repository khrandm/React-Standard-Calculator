import React, { useLayoutEffect, useState, useRef } from "react";

const ScrollableComponent = ({ children, className }) => {
  const [dragMode, setDragMode] = useState(false);
  const [pointer, setPointer] = useState();
  const [scroll, setScroll] = useState();
  const componentRef = useRef();

  const handleMouseDown = point => {
    setPointer(point);
    setScroll(componentRef.current.scrollLeft);
    setDragMode(true);
  };

  useLayoutEffect(() => {
    const handleMouseUp = () => {
      setDragMode(false);
    };

    const handleMouseMove = e => {
      componentRef.current.scrollLeft = scroll - (e.pageX - pointer);
    };

    const handleTouchEnd = () => {
      setDragMode(false);
    };

    const handleTouchMove = e => {
      componentRef.current.scrollLeft = scroll - (e.touches[0].pageX - pointer);
    };

    if (dragMode) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dragMode, pointer, scroll]);

  return (
    <div
      className={className}
      ref={componentRef}
      onMouseDown={e => handleMouseDown(e.pageX)}
      onTouchStart={e => handleMouseDown(e.touches[0].pageX)}
    >
      {children}
    </div>
  );
};

export default ScrollableComponent;
