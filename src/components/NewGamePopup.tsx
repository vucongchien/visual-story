"use client"

import type React from "react"
import { useState, forwardRef, useEffect } from "react"
import type { GenreProps, SettingProps } from "../types"
import { useOptions } from "../hooks/useOption"
import { useSessions } from "../hooks/useSession"
import { useNavigate } from "react-router-dom"
import { DropBox } from "./DropBox"
import { Button } from "./Button"

interface FormData {
  genreId: string
  settingId: string
  customInput: string
}


export const NewGamePopup  = () => {
  const { options } = useOptions()
  const { add } = useSessions()
  const navigate = useNavigate()
  

  const genreOptions: GenreProps[] = options?.genres || []
  const settingOptions: SettingProps[] = options?.settings || []

  const [formData, setFormData] = useState<FormData>({
    genreId: "",
    settingId: "",
    customInput: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateGame = async () => {
    try {
      const payload = {
        genreId: formData.genreId,
        settingId: formData.settingId,
      }
      const newSession = await add(payload)
      navigate(`/gameplay/${newSession.id}`)
    } catch (err) {
      console.error("Lỗi tạo game mới:", err)
    }
  }

  const [isFormValid,setIsFromValid]=useState<boolean>(false)
  useEffect(()=>{
    if( formData.genreId !== "" && formData.settingId !== "")
      setIsFromValid(true)
  },[formData])

  return (
    <div className="flex items-center flex-col max-w-md rounded-lg w-md shadow-md" >
      <div className="space-y-3 w-[80%] mb-3 mt-4">

        <DropBox
          options={genreOptions}
          placeholder="genre"
          onChange={(val) => setFormData((prev) => ({ ...prev, genreId: val }))}
          value={formData.genreId}
        />


        <DropBox
          options={settingOptions}
          placeholder="setting"
          onChange={(val) => setFormData((prev) => ({ ...prev, settingId: val }))}
          value={formData.settingId}
        />


      </div>

      <Button onClick={handleCreateGame} className="mb-4"
      disabled={!isFormValid}>
        {isFormValid ? "Create Game" : "Please select options"}
      </Button>
    </div>
  )
}
