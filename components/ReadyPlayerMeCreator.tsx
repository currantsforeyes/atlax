import React, { useEffect, useCallback } from 'react';

const RPM_SUBDOMAIN = 'atlax'; // Using the user's subdomain

interface ReadyPlayerMeCreatorProps {
  onAvatarExported: (url: string) => void;
  onClose: () => void;
}

const ReadyPlayerMeCreator: React.FC<ReadyPlayerMeCreatorProps> = ({ onAvatarExported, onClose }) => {
  const handleMessage = useCallback((event: MessageEvent) => {
    // Ensure the message is from a Ready Player Me domain
    if (!event.origin.includes("readyplayer.me")) {
      return;
    }

    const json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

    if (json?.source !== 'readyplayerme') {
      return;
    }
    
    // Subscribe to all events from Ready Player Me once the frame is ready
    if (json.eventName === 'v1.frame.ready') {
      const frame = document.getElementById('rpm-frame') as HTMLIFrameElement;
      frame.contentWindow?.postMessage(
        JSON.stringify({
          target: 'readyplayerme',
          type: 'subscribe',
          eventName: 'v1.**',
        }),
        `https://*.readyplayer.me`
      );
    }
    
    // Handle avatar export event
    if (json.eventName === 'v1.avatar.exported') {
      const avatarUrl = json.data.url;
      onAvatarExported(avatarUrl);
    }
    
    // Handle user closing the creator
    if (json.eventName === 'v1.user.closed') {
      onClose();
    }
  }, [onAvatarExported, onClose]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm animate-fade-in">
      <iframe
        id="rpm-frame"
        className="w-full h-full border-0"
        src={`https://` + RPM_SUBDOMAIN + `.readyplayer.me/avatar?frameApi&clearCache`}
        allow="camera *; microphone *; clipboard-write"
      ></iframe>
       <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-800/50 hover:bg-gray-700 text-white font-bold p-3 rounded-full transition-colors z-10"
          aria-label="Close Avatar Creator"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>
  );
};

export default ReadyPlayerMeCreator;