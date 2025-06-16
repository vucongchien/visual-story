// src/components/NewGamePopup.tsx

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { GenreProps, SettingProps } from "../types"
import { useOptions } from "../hooks/useOption"
import { useSessions } from "../hooks/useSession"
import { useNavigate } from "react-router-dom"
import { DropBox } from "./DropBox" // Đảm bảo bạn đang dùng DropBox mới
import { Button } from "./Button"
import { StaggeredList } from "./StaggeredList" // Import StaggeredList
import { AnimatePresence, motion } from "framer-motion" // Import motion
import { XMarkIcon } from "@heroicons/react/16/solid"
import { useLoading } from "../hooks/useLoading"

interface FormData {
    genreId: string
    settingId: string
}
type NewGamePopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const NewGamePopup:React.FC<NewGamePopupProps> = ({isOpen,onClose}) => {
    const { options } = useOptions()
    const { add } = useSessions()
    const navigate = useNavigate()
    const { loading, wrap } = useLoading();
    const [error, setError] = useState<string | null>(null);

    const genreOptions: GenreProps[] = options?.genres || []
    const settingOptions: SettingProps[] = options?.settings || []

    const [formData, setFormData] = useState<FormData>({
        genreId: "",
        settingId: "",
    })
    const isFormValid = formData.genreId !== "" && formData.settingId !== ""

    const handleCreateGame = async (e:React.FormEvent) => {
        if (!isFormValid) return;
        e.preventDefault()
        setError(null)
        try {
            await wrap(add)(formData);

            const newSession = await add(formData)
            navigate(`/gameplay/${newSession.id}`)
        } catch (err: any) {
            setError(err.message || "tạo trò chơi thất bại");
        }
    }
    
    return (
         <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
      
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex items-center flex-col max-w-md rounded-lg w-full shadow-md bg-[var(--button-bg)]" // Thêm 
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-[var(--button-text)] hover:text-[var(--button-text-hover)] focus:outline-none"
                            aria-label="Đóng"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <div className="space-y-3 w-[80%] mb-3 mt-4 pt-6"> 
                            <h2 className="text-2xl font-bold mb-6 text-center text-[var(--button-text)]">
                                Trồng Truyện Mới
                            </h2>
                            <StaggeredList
                                isOpen={true}
                                className="w-full space-y-4"
                            >
                                <DropBox
                                    key="genre-select"
                                    options={genreOptions}
                                    placeholder="Thể loại"
                                    onChange={(val) => setFormData((prev) => ({ ...prev, genreId: val }))}
                                    value={formData.genreId}
                                />
                                <DropBox

                                    key="setting-select"
                                    options={settingOptions}
                                    placeholder="Bối cảnh"
                                    onChange={(val) => setFormData((prev) => ({ ...prev, settingId: val }))}
                                    value={formData.settingId}
                                />
                                <div key="submit-button" className="pt-2">
                                    <Button
                                        onClick={handleCreateGame}
                                        className="w-full"
                                        disabled={!isFormValid}
                                        variant="primary"
                                        loading={loading}
                                        aria-label="Bắt đầu câu chuyện"
                                    >
                                        {isFormValid ? "Bắt đầu câu chuyện thôi" : "Vui lòng chọn đầy đủ thông tin"}
                                    </Button>
                                </div>
                            </StaggeredList>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};