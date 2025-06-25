import { useEffect, useRef } from "react";

type UseDraggableOptions = {
  onDragEnd?: () => void;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
};

function useDraggable(id: string, options?: UseDraggableOptions): void {
  const isClicked = useRef<boolean>(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      options?.onDragStart?.();
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      options?.onDragEnd?.();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;
      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
      options?.onDrag?.(nextX, nextY);
    };

    target.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseUp);

    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseUp);
    };
  }, [id, options]);
}

export default useDraggable;
