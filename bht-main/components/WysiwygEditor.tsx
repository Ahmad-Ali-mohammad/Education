import React, { useMemo, useRef, useState } from 'react';
import { MediaItem } from '../types';
import MediaLibraryModal from './MediaLibraryModal';
import ReactQuill from 'react-quill';

export const WysiwygEditor = ({ value, onChange, mediaLibrary, onUpdateMedia }: { value: string, onChange: (value: string) => void, mediaLibrary: MediaItem[], onUpdateMedia: (m: MediaItem[]) => void }) => {
  const quillRef = useRef<any>(null);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);

  const imageHandler = () => {
    setIsMediaLibraryOpen(true);
  };

  const insertImage = (base64: string) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'image', base64);
    setIsMediaLibraryOpen(false);
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const formats = [ 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'code-block' ];
  
  return (
    <div className="bg-white">
      <MediaLibraryModal 
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelectImage={insertImage}
        media={mediaLibrary}
        onUpdateMedia={onUpdateMedia}
      />
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={value} 
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default WysiwygEditor;