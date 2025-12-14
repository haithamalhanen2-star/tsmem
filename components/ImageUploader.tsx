import React, { useCallback } from 'react';

interface Props {
  label: string;
  image: string | null;
  onImageUpload: (file: File) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<Props> = ({ label, image, onImageUpload, onClear }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="relative w-full h-48 border-2 border-dashed border-slate-600 rounded-xl bg-slate-800 hover:border-blue-500 transition-colors flex items-center justify-center overflow-hidden group">
        {image ? (
          <>
            <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-red-600/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
             <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
             </svg>
             <span className="text-slate-400 text-sm">Tap to upload</span>
             <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
    </div>
  );
};