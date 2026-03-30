'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  booted: boolean
  setBooted: (val: boolean) => void
  isTransitioning: boolean
  setIsTransitioning: (val: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <UIContext.Provider value={{ booted, setBooted, isTransitioning, setIsTransitioning }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
