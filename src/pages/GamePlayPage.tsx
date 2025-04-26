"use client"

import { useEffect, useState } from "react"
import {ScecneStoryUI,ChoseOptionsUI} from "../components"
import clsx from "clsx"
import { useParams } from "react-router-dom"
import { useSessions } from "../hooks/useSession"
import { ChoiceOptionProps,SessionProps } from "../types"




export function GamePlay() {
// Lấy session ID từ URL
const { id } = useParams();
const { getById,postChoice } = useSessions();

    const [session, setSession] = useState<SessionProps|null>();
    const [choiceOptions,setChoiceOptions]=useState<ChoiceOptionProps[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 1) Fetch session + initial choices
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getById(id)
      .then((data) => {
        if (!data) throw new Error("Không tìm thấy session");
        setSession(data);
        setChoiceOptions(data.currentChoices);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);


  // 2) Xử lý khi user chọn 1 option
  const handleSelectOption = async ( choiceIndex: number) => {
    console.log(choiceIndex)
    if (!id || !session) return;
    setSending(true);
    setError(null);

    try {
      const res = await postChoice(id, choiceIndex);
      if (!res) throw new Error("Không có phản hồi từ server");

      // 2.1) Append các segment mới vào story
// Sau khi call postChoice, server trả về mới:
// - chỉ các segment mới (appendedSegments)
// - các currentChoices mới
setSession(prev =>
  prev
    ? { ...prev, story: [...prev.story, ...res.appendedSegments] }
    : prev
);
setChoiceOptions(res.currentChoices);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="p-4">Đang tải phiên chơi…</p>;
  if (error) return <p className="p-4 text-red-600">Lỗi: {error}</p>;
  if (!session) return null;
    
    return (
      <div className="flex flex-col h-screen w-full p-4 md:p-6 bg-gray-50">
      {/* Story container grows to fill available space */}
      <div className="flex-1 overflow-y-auto pb-4">
        <ScecneStoryUI session={session} />
      </div>

      {/* Options footer: fixed height, centered */}
      {
        choiceOptions&&choiceOptions?.length>0&&(<div className=" flex items-center justify-center px-4 bg-white shadow-lg">
        <ChoseOptionsUI
          className="w-full"
          options={choiceOptions}
          onSelect={handleSelectOption}
        />
      </div>)
      }
      
    </div>
    );
  }
