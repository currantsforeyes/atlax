import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CharacterStudio from './CharacterStudio';

const CharacterStudioIframe: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write('<!DOCTYPE html><html><head><base target="_parent"></head><body style="margin:0;overflow:hidden"></body></html>');
    doc.close();

    const mountNode = doc.createElement('div');
    doc.body.appendChild(mountNode);
    const root = ReactDOM.createRoot(mountNode);
    root.render(<CharacterStudio />);

    return () => {
      root.unmount();
    };
  }, []);

  return <iframe ref={iframeRef} className="w-full h-full border-0 rounded-lg" />;
};

export default CharacterStudioIframe;
