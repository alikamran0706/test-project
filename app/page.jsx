"use client"

import { useState } from "react"
import { Plus, Upload, ChevronDown, Trash2, ListFilter, Save } from "lucide-react"
import Modal from "../components/ui/Modal"
import { SAMPLE_CARDS } from "./constants/home"
import CardGrid from "../components/CardGrid"
import UploadFile from "../components/UploadFile"

const CARD_TYPES = ["Text Placeholder", "Text", "Number", "Checkbox", "Image"]

export default function CardManagement() {
  const [cards, setCards] = useState(SAMPLE_CARDS)
  const [showModal, setShowModal] = useState(false)
  const [newFieldType, setNewFieldType] = useState("Text Placeholder");
  const [imageFile, setImageFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [newCard, setNewCard] = useState({
    type: "Text Placeholder",
    header: "",
    description: "",
    fields: [],
  })
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const handleCreateCard = () => {
    const { id, header, description, type, fields } = newCard;

    if (!header.trim() || !description.trim()) {
      setFormError("Header and Description are required.");
      return;
    }

    if (type === "Image" && !imageFile && !newCard.image) {
      setFormError("Image is required for 'Image' type.");
      return;
    }

    if (type === "Checkbox" && (!fields || fields.length === 0)) {
      setFormError("At least one checkbox option is required.");
      return;
    }

    const updatedCard = {
      ...newCard,
      id: id || Date.now().toString(),
      image: imageFile ? URL.createObjectURL(imageFile) : newCard.image || null,
    };

    if (id) {
      // Update existing card
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === id ? updatedCard : card))
      );
    } else {
      // Add new card
      setCards([...cards, updatedCard]);
    }

    // Reset state
    setShowModal(false);
    setNewCard({
      type: "Text Placeholder",
      header: "",
      description: "",
      fields: [],
    });
    setImageFile(null);
    setFormError("");
  };



  const addField = () => {
    const field = {
      id: Date.now().toString(),
      type: newFieldType.toLowerCase(),
      label: newFieldType,
      value: newFieldType === "Checkbox" ? false : "",
    }

    setNewCard({
      ...newCard,
      fields: [...(newCard.fields || []), field],
    })
  }

  const removeField = (fieldId) => {
    setNewCard({
      ...newCard,
      fields: newCard.fields.filter((field) => field.id !== fieldId),
    })
  }

  const toggleModal = () => {
    if (showModal) {
      setNewCard({
        type: "Text Placeholder",
        header: "",
        description: "",
        fields: [],
      });
      setImageFile(null);
      setNewFieldType("Text Placeholder");
      setFormError("");
    }
    setShowModal(!showModal);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="border border-gray-300 rounded px-3 py-1 inline-block mb-4">
            <span className="text-sm font-medium">Test project</span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Title</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
                Filter
                <ListFilter className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleModal()}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
          </div>
        </div>

        <CardGrid cards={cards} toggleModal={toggleModal} setNewCard={setNewCard} />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>1-10 of 100 Records</span>
          <div className="flex items-center gap-4">
            <button>{"<"}</button>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <button>{">"}</button>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>20/Page</option>
              <option>50/Page</option>
              <option>100/Page</option>
            </select>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal isOpen={showModal} title={newCard?.id ? "Edit Cart" : "Create New Cart"} onClose={toggleModal}>
          <div className="px-6 space-y-4">
            <div >
              <label className="block text-sm font-medium mb-2">Select type of card</label>
              <div className="relative">
                <button
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-left"
                >
                  <span>{newCard.type}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                    {CARD_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setNewCard((prev) => ({
                            ...prev,
                            type,
                            fields:
                              type === "Checkbox"
                                ? [
                                  {
                                    id: Date.now().toString(),
                                    type: "checkbox",
                                    label: "Checkbox",
                                    value: false,
                                  },
                                ]
                                : [],
                          }))
                          setShowTypeDropdown(false)
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Header</label>
              <input
                type="text"
                value={newCard.header}
                onChange={(e) => setNewCard({ ...newCard, header: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter header"
              />
            </div>
            {newCard?.type === 'Image' && <UploadFile setImageFile={setImageFile} imageFile={imageFile} />}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newCard.description}
                onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                placeholder="Enter description"
              />
            </div>

            {newCard?.type === "Checkbox" && (
              <div>
                <label className="block text-sm font-medium mb-2">Add option</label>
                <div className="space-y-3">
                  {/* Added Fields */}
                  {newCard.fields && newCard.fields.length > 0 && (
                    <div className="space-y-2">
                      {newCard.fields.map((field) => (
                        <div key={field.id} className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={newFieldType}
                            onChange={(e) => setNewFieldType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                            placeholder="Text Placeholder"
                          />
                          {
                            newCard.fields?.length > 1 &&
                            <button onClick={() => removeField(field.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          }
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={addField}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 
                      rounded-full hover:bg-green-700 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add option
                  </button>
                </div>
              </div>
            )}
          </div>
          {formError && (
            <p className="text-red-600 text-sm my-2 mx-6">{formError}</p>
          )}
          <div className="border-t border-dashed border-gray-300 px-6 mt-4">
            <button
              onClick={handleCreateCard}
              className="w-full bg-[#007AFF] hover:bg-[#0066cc] text-white mt-6 py-2 rounded-full flex items-center justify-center 
              gap-2"
            >
              <Save className="w-4 h-4" />
              {newCard?.id ? 'Update' : 'Create'}
            </button>
          </div>
        </Modal>
      )}

    </div>
  )
}
