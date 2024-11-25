'use client' // Убедитесь, что этот компонент является клиентским

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

// Интерфейс для значений контекста
interface GlobalContextType {
  totalCount: number
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

// Создаем контекст с начальным значением null
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
