import React, { createContext, useContext, useState } from 'react';
import type { CarIdentification } from '@/types/api';

type CaptureState = 'idle' | 'capturing' | 'identifying' | 'result' | 'saving';

interface CaptureContextValue {
  state: CaptureState;
  setState: (state: CaptureState) => void;
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
  photoBase64: string | null;
  setPhotoBase64: (b64: string | null) => void;
  identification: CarIdentification | null;
  setIdentification: (id: CarIdentification | null) => void;
  xpEarned: number;
  setXpEarned: (xp: number) => void;
  reset: () => void;
}

const CaptureContext = createContext<CaptureContextValue>({
  state: 'idle',
  setState: () => {},
  photoUri: null,
  setPhotoUri: () => {},
  photoBase64: null,
  setPhotoBase64: () => {},
  identification: null,
  setIdentification: () => {},
  xpEarned: 0,
  setXpEarned: () => {},
  reset: () => {},
});

export function CaptureProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CaptureState>('idle');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [identification, setIdentification] = useState<CarIdentification | null>(null);
  const [xpEarned, setXpEarned] = useState(0);

  const reset = () => {
    setState('idle');
    setPhotoUri(null);
    setPhotoBase64(null);
    setIdentification(null);
    setXpEarned(0);
  };

  return (
    <CaptureContext.Provider
      value={{
        state,
        setState,
        photoUri,
        setPhotoUri,
        photoBase64,
        setPhotoBase64,
        identification,
        setIdentification,
        xpEarned,
        setXpEarned,
        reset,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
}

export function useCaptureContext() {
  return useContext(CaptureContext);
}
