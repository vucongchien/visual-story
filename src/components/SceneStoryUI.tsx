import { useEffect, useRef, useState } from "react"
import cltx from "clsx"

interface ScecneStoryUIProps {
  story:Array<{
    id:string,
    text:string,
    nameSpeaker:string,
    isUser:boolean,
  }>,

}

export const ScecneStoryUI: React.FC<ScecneStoryUIProps> = ({ story }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [story]);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full p-4 md:p-6 gap-8">
      {/* Story Text */}
      <div className="flex-1 overflow-y-auto " >
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {
            story.map((item,index) =>(
              <div key={item.id} className={cltx("flex gap-4 my-2", item.isUser ? "justify-end" : "justify-start")}>
                <div className={cltx("rounded-lg p-4 max-w-[80%]", item.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black")}>
                  <p className="text-sm font-semibold">{item.nameSpeaker}</p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))
          }
          <div ref={bottomRef} />
        </div>
      </div>

      
    </div>
  )
}
