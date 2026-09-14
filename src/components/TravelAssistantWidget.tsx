'use client';

import { useState } from 'react';
import { TravelAssistantChat } from './TravelAssistantChat';

export function TravelAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="assistant-widget-wrap">
      {isOpen ? (
        <div className="assistant-widget-panel">
          <div className="assistant-widget-header">
            <span>AI Trip Assistant</span>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              ×
            </button>
          </div>
          <TravelAssistantChat compact />
        </div>
      ) : (
        <button type="button" className="assistant-widget-toggle" onClick={() => setIsOpen(true)}>
          <span className="widget-icon">✦</span>
          AI Travel
        </button>
      )}
    </div>
  );
}
