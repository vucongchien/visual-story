"use client"

import { useState } from "react"
import {ScecneStoryUI,ChoseOptionsUI} from "../components"




export function GamePlay() {
    const [story, setStory] = useState([
        {
            id: "1",
            text: "Chào mừng bạn đến với thế giới Kỳ Ảo!",
            nameSpeaker: "Narrator",
            isUser: false,
          },
          {
            id: "2",
            text: "Bạn là ai? Sao lại xuất hiện ở đây?",
            nameSpeaker: "Lina",
            isUser: false,
          },
          {
            id: "3",
            text: "Tôi... tôi cũng không biết. Tôi vừa tỉnh dậy...",
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
      <div className="flex flex-col w-full max-w-3xl mx-auto h-full p-4 md:p-6 gap-8">
        <ScecneStoryUI story={story} />
  
         {/* Navigation lựa chọn cố định phía dưới */}
      <div className="fixed bottom-1/5 left-0 right-0 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          {showOptions && (
            <ChoseOptionsUI
              options={options}
              onSelect={handleSelectOption}
            />
          )}
        </div>
      </div>
      </div>
    );
  }
