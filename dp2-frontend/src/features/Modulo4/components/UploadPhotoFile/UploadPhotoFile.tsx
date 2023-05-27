import React, { ChangeEvent, useState } from "react";

const ImageUploadComponent: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} accept="image/*" />

            {selectedImage && (
                <div>
                    <p>Selected Image: {selectedImage.name}</p>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploadComponent;
