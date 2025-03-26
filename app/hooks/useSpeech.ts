// hooks/useSpeech.ts
import { useEffect, useCallback } from 'react';

export function useSpeech() {
  const speechSynthesis = window.speechSynthesis;
  let currentUtterance: SpeechSynthesisUtterance | null = null;

  useEffect(() => {
    return () => {
      if (currentUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => {
    if (currentUtterance) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || 'en-US';
    utterance.rate = options?.rate || 1;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 1;

    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (currentUtterance) {
      speechSynthesis.cancel();
      currentUtterance = null;
    }
  }, []);

  const isSpeaking = useCallback(() => {
    return speechSynthesis.speaking;
  }, []);

  return { speak, stop, isSpeaking };
}