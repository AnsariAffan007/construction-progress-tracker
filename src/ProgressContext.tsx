import { createContext, useContext, type RefObject } from "react";

type ProgressContextType = {
  editing: boolean,
  flatsCheckersOnFloorChange?: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
  areasCheckerOnFlatChange?: RefObject<Record<number, (flatId: number, flatChecked: boolean) => void>>
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ editing, children }: { editing: boolean, children: React.ReactNode }) => {
  return (
    <ProgressContext.Provider value={{ editing: editing }}>
      {children}
    </ProgressContext.Provider>
  )
}