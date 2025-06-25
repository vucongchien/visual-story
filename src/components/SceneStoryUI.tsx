import { useEffect, useRef, useState } from "react"
import cltx from "clsx"
import { StorySegment,SessionProps } from "../types"
interface ScecneStoryUIProps {
  session:SessionProps

}

export const ScecneStoryUI: React.FC<ScecneStoryUIProps> = ({ session }) => {
  const { title, story } = session;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [story]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--color5)] text-[var(--color4)] leading-relaxed rounded-xl shadow-md">
    <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>

    <div className="space-y-5 text-lg">
      {story.map((paragraph, index) => (
        <p key={index}>{paragraph.content}</p>
      ))}
    </div>
    <div ref={bottomRef} />
  </div>
  );
}

