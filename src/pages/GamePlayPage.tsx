"use client"

import { useState } from "react"
import {ScecneStoryUI,ChoseOptionsUI} from "../components"
import clsx from "clsx"




export function GamePlay() {
    const [story, setStory] = useState([
        {
            id: "1",
            text: "In architect Le Tae-Gyu's opinion, the best moment in one's life was when a refreshing afternoon breeze came in from the balcony and caressed his skin while he enjoyed his coffee.",
            nameSpeaker: "Narrator",
            isUser: false,
          },
          {
            id: "2",
            text: "He worked at one of Korea's premier ar-chitectural firms, so when he sipped on an a americano coffee with creamy foam floating on top, it didn't matter whether an angry client awaited him for a meeting or if his boss wa about to chew him out - for that short moment, he was the happiest man in theworld.",
            nameSpeaker: "Lina",
            isUser: false,
          },
          {
            id: "3",
            text: "He probably enjoyed this moment more than when he received his yearly bonus or when his daughter was born",
            nameSpeaker: "You",
            isUser: true,
          },
          {
            id: "4",
            text: "Hmm... Có vẻ bạn đã mất trí nhớ.",
            nameSpeaker: "Lina",
            isUser: false,
          },
          {
            id: "5",
            text: "Có thể bạn là Người Được Chọn...",
            nameSpeaker: "Narrator",
            isUser: false,
          },
            {
                id: "6",
                text: "Người Được Chọn?",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "7",
                text: "Đúng vậy! Bạn có thể là người duy nhất có thể cứu thế giới này.",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "8",
                text: "Nhưng làm thế nào tôi có thể biết được?",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "9",
                text: "Hãy theo tôi! Tôi sẽ giúp bạn tìm ra sự thật.",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "10",
                text: "Bạn có thể chọn đi theo Lina hoặc từ chối.",
                nameSpeaker: "Narrator",
                isUser: false,
            },
            {
                id: "11",
                text: "Đi theo Lina",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "12",
                text: "Từ chối",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "13",
                text: "Tốt! Hãy cùng tôi khám phá thế giới này.",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "14",
                text: "Tôi không muốn đi theo bạn.",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "15",
                text: "Rất tiếc! Bạn đã bỏ lỡ cơ hội khám phá thế giới này.",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "16",
                text: "Tôi sẽ tìm cách khác.",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "17",
                text: "Chúc bạn may mắn!",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "18",
                text: "Cảm ơn!",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "19",
                text: "Hãy cùng tôi khám phá thế giới này.",
                nameSpeaker: "Lina",
                isUser: false,
            },
            {
                id: "20",
                text: "Tôi không muốn đi theo bạn.",
                nameSpeaker: "You",
                isUser: true,
            },
            {
                id: "21",
                text: "Rất tiếc! Bạn đã bỏ lỡ cơ hội khám phá thế giới này.",
                nameSpeaker: "Lina",
                isUser: false,
            },
    ])
    const [options, setOptions] = useState([
        "Đi theo Lina",
        "Từ chối",
      ]);

  
      const handleSelectOption = (index: number) => {
        const newStory1 = {
          id: (story.length + 1).toString(),
          text: options[index],
          nameSpeaker: "You",
          isUser: true,
        };
      
        const newStory2 = {
          id: (story.length + 2).toString(),
          text: "Tôi đã chọn: " + options[index],
          nameSpeaker: "Narrator",
          isUser: false,
        };
      
        // Thêm vào mảng mới
        setStory(prev => [...prev, newStory1, newStory2]);
      
        // Cập nhật options như cũ
        setOptions([
          "dume" + index,
          "Từ chối" + index,
          "Đi theo Lina" + index,
        ]);
      };
      

    
    // loz gọi api 
    const showOptions = true;
  
    return (
      <div className="flex flex-col h-screen w-full p-4 md:p-6 bg-gray-50">
      {/* Story container grows to fill available space */}
      <div className="flex-1 overflow-y-auto pb-4">
        <ScecneStoryUI story={story} />
      </div>

      {/* Options footer: fixed height, centered */}
      <div className=" flex items-center justify-center px-4 bg-white shadow-lg">
        <ChoseOptionsUI
          className="w-full"
          options={options}
          onSelect={handleSelectOption}
        />
      </div>
    </div>
    );
  }
