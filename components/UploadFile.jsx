import { useRef, useState } from "react";
import { CloudUpload, Upload } from "lucide-react";

export default function UploadFile({ setImageFile, imageFile }) {
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("File size must be less than 2MB");
            setImageFile(null);
        } else {
            setError("");
            setImageFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
        >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#007AFF] mx-auto mb-2">
                <CloudUpload className="w-4 h-4 text-white" />
            </span>

            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 2 MB)</p>

            <input
                type="file"
                accept="image/*"
                className="hidden"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={(e) => handleFile(e.target.files[0])}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {imageFile && (
                <p className="text-green-600 text-sm mt-2">Uploaded: {imageFile.name}</p>
            )}
        </div>
    );
}

