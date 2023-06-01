import React, { useState } from 'react';
import '../../screens/Plantillas/Plantillas.css'

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
      onImageSelect(file);
    }
  };

  return (
    <div>
      <label className='label-estilizado'>Identificación de imagen</label>
      <div style={{ verticalAlign: 'top' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none'}}
            id="image-upload-input"
          />
          <label
            htmlFor="image-upload-input"
            style={{
              border: '1px solid gray',
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: '5px',
              backgroundColor: 'white',
              borderColor:'#ced4da'
            }}
          >
            Subir Archivo
          </label>
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            border: '1px solid gray',
            width: '60px',
            height: '60px',
            overflow: 'hidden',
            verticalAlign: 'top',
            borderRadius: '5px',
            backgroundColor: 'white',
            borderColor:'#ced4da'
          }}
        >
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Previsualización de imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
