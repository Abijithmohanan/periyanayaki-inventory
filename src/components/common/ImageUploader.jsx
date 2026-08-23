import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { fileToDataUrl } from '../../utils/helpers';

const ImageUploader = ({ images = [], onChange }) => {
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    const dataUrls = await Promise.all(files.map(fileToDataUrl));
    onChange([...images, ...dataUrls]);
  };

  const removeImage = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader-grid">
        {images.map((img, idx) => (
          <div className="image-uploader-thumb" key={idx}>
            <img src={img} alt={`upload-${idx}`} />
            <button type="button" className="image-uploader-remove" onClick={() => removeImage(idx)}>
              <X size={12} />
            </button>
          </div>
        ))}
        <button type="button" className="image-uploader-add" onClick={() => inputRef.current?.click()}>
          <Upload size={18} />
          <span>Add photos</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length) handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
};

export default ImageUploader;
