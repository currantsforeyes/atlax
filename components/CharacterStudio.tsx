import React, { Suspense } from 'react';
import type { AvatarItem } from '../types';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// Import CharacterStudio application and required context providers
// from the upstream package. These files are JavaScript modules, so we
// suppress type checking for now until official type definitions are
// published by the project.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from '@m3-org/characterstudio/src/App.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AccountProvider } from '@m3-org/characterstudio/src/context/AccountContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SceneProvider } from '@m3-org/characterstudio/src/context/SceneContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ViewProvider } from '@m3-org/characterstudio/src/context/ViewContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SoundProvider } from '@m3-org/characterstudio/src/context/SoundContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AudioProvider } from '@m3-org/characterstudio/src/context/AudioContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LanguageProvider } from '@m3-org/characterstudio/src/context/LanguageContext.jsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@m3-org/characterstudio/src/lib/localization/i18n.js';

interface CharacterStudioProps {
  equippedItems: AvatarItem[];
}

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

// Wrapper that renders the CharacterStudio application within the existing
// Atlax UI. Equipped items are currently unused until upstream support is
// added.
const CharacterStudio: React.FC<CharacterStudioProps> = () => {
  return (
    <div className="w-full h-full">
      <Web3ReactProvider getLibrary={getLibrary}>
        <AccountProvider>
          <LanguageProvider>
            <AudioProvider>
              <ViewProvider>
                <SceneProvider>
                  <SoundProvider>
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-700/50 rounded-lg">
                          Loading CharacterStudio...
                        </div>
                      }
                    >
                      <App />
                    </Suspense>
                  </SoundProvider>
                </SceneProvider>
              </ViewProvider>
            </AudioProvider>
          </LanguageProvider>
        </AccountProvider>
      </Web3ReactProvider>
    </div>
  );
};

export default CharacterStudio;
