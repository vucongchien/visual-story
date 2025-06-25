import type React from "react"
import { useEffect, useState, useRef } from "react"

interface CssLineConnectorProps {
  startElementRef: React.RefObject<Element|null>
  endElementRef: React.RefObject<Element|null>
  color?: string
  thickness?: number
  dashed?: boolean
  visible?: boolean
}

export const CssLineConnector: React.FC<CssLineConnectorProps> = ({
  startElementRef,
  endElementRef,
  color = "#FF9999",
  thickness = 2,
  dashed = false,
  visible = true,
}) => {
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineStyle, setLineStyle] = useState({
    width: "0px",
    height: "0px",
    top: "0px",
    left: "0px",
    transform: "rotate(0deg)",
  })

  const updateLinePosition = () => {
    if (!startElementRef.current || !endElementRef.current || !lineRef.current) return

    const startRect = startElementRef.current.getBoundingClientRect()
    const endRect = endElementRef.current.getBoundingClientRect()

    // Calculate the center points of each element
    const startX = startRect.left 
    const startY = startRect.top + startRect.height / 2
    const endX = endRect.right 
    const endY = endRect.top + endRect.height / 2

    // Calculate the distance between the two points
    const dx = endX - startX
    const dy = endY - startY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Calculate the angle
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)

    setLineStyle({
      width: `${distance}px`,
      height: `${thickness}px`,
      top: `${startY}px`,
      left: `${startX}px`,
      transform: `rotate(${angle}deg)`,
    })
  }

  useEffect(() => {
    if (visible) {
      // Initial position update
      setTimeout(updateLinePosition, 100)

      // Update line position on resize and scroll
      window.addEventListener("resize", updateLinePosition)
      window.addEventListener("scroll", updateLinePosition)

      // Update position periodically
      const interval = setInterval(updateLinePosition, 500)

      return () => {
        window.removeEventListener("resize", updateLinePosition)
        window.removeEventListener("scroll", updateLinePosition)
        clearInterval(interval)
      }
    }
  }, [visible, startElementRef.current, endElementRef.current])

  if (!visible) return null

  return (
    <div
      ref={lineRef}
      style={{
        position: "fixed",
        backgroundColor: color,
        transformOrigin: "left center",
        zIndex: 9999,
        pointerEvents: "none",
        ...lineStyle,
        borderStyle: dashed ? "dashed" : "solid",
      }}
    />
  )
}
