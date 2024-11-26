'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface GlobalContextType {
  totalCount: number
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const GlobalContext = createContext<GlobalContextType>({
  totalCount: 0,
  setTotalCount: () => {},
})

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [totalCount, setTotalCount] = useState<number>(0)

  return (
    <GlobalContext.Provider value={{ totalCount, setTotalCount }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
