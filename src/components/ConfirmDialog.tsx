import React, { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 "
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-w-sm w-full rounded-lg shadow-xl bg-[var(--button-bg)] text-[var(--button-text)] p-6 mx-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            
            <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-[var(--button-text)] hover:text-[var(--button-text-hover)] focus:outline-none"
              aria-label="Đóng"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="text-center w-full">
              <p className="text-[var(--button-text)] mb-6">{message}</p>
            </div>


            <div className="flex justify-end gap-4 w-full">

              <button
                onClick={onCancel}
                className="px-5 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
              >
                Không
              </button>

              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
              >
                Có
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
