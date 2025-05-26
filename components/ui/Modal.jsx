"use client"

import { X } from "lucide-react"

export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[70vh] overflow-y-auto 
        no-scrollbar py-6 relative"
    >
        <button
          onClick={onClose}
          className="absolute right-3 text-gray-500 hover:text-gray-700 mr-4"
        >
          <X className="w-5 h-5" color="black" />
        </button>
        {title && <h2 className="text-xl font-semibold mb-4 ml-6">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
