import React, { createContext, useContext, useState, ReactNode } from 'react'

type PortalContextType = {
  content: Record<string, ReactNode>
  setContent: React.Dispatch<React.SetStateAction<Record<string, ReactNode>>>
}

const PortalContext = createContext<PortalContextType | undefined>(undefined)

export const PortalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, ReactNode>>({})

  return <PortalContext.Provider value={{ content, setContent }}>{children}</PortalContext.Provider>
}

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext)
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider')
  }
  return context
}

type PortalProps = {
  areaKey: string
} & React.HTMLAttributes<HTMLDivElement>

const Portal: React.FC<PortalProps> = ({ areaKey, ...props }) => {
  const { content } = usePortal()

  return <div {...props}>{content[areaKey]}</div>
}

export default Portal
