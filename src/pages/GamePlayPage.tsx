"use client";

import { useEffect, useState } from "react";
import { ScecneStoryUI, ChoseOptionsUI } from "../components";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useSessions } from "../hooks/useSession";
import { ChoiceOptionProps, SessionProps } from "../types";
import MainLayout from "../layouts/MainLayout";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";
import { LoadingDots } from "../components/LoadingDots";

export function GamePlay() {
  // Lấy session ID từ URL
  const { id } = useParams();
  const { getById, postChoice } = useSessions();

  const [session, setSession] = useState<SessionProps | null>();
  const [choiceOptions, setChoiceOptions] = useState<ChoiceOptionProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSelectOption = async (choiceIndex: number) => {
    console.log(choiceIndex);
    if (!id || !session) return;
    setSending(true);
    setError(null);

    try {
      const res = await postChoice(id, choiceIndex);
      if (!res) throw new Error("Không có phản hồi từ server");

      setSession((prev) =>
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

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  if (!session) return null;

  return (
    <MainLayout>
      <div className="flex flex-col h-screen w-full p-4 md:p-6 bg-gray-50">
        {/* Story container grows to fill available space */}
        <div className="flex-1 overflow-y-auto pb-4">
          <ScecneStoryUI session={session} />
        </div>
        {sending&&(<LoadingDots className="text-[var(--color2)]"/>)}

        {/* Options footer: fixed height, centered */}
        {choiceOptions && choiceOptions?.length > 0 && (
          <div className=" flex items-center justify-center px-4 bg-white shadow-lg">
            <ChoseOptionsUI
              className="w-full"
              options={choiceOptions}
              onSelect={handleSelectOption}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
