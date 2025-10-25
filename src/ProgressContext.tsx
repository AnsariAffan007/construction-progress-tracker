import { createContext, useContext, useRef, type RefObject } from "react";

type ProgressContextType = {
  editing: boolean,
  flatsCheckersOnFloorChange: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
  areasCheckerOnFlatChange: RefObject<Record<number, (flatId: number, flatChecked: boolean) => void>>
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false,
  flatsCheckersOnFloorChange: { current: {} },
  areasCheckerOnFlatChange: { current: {} },
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ editing, children }: { editing: boolean, children: React.ReactNode }) => {

  const flatsCheckersOnFloorChange = useRef({})
  const areasCheckerOnFlatChange = useRef({})

  return (
    <ProgressContext.Provider
      value={{
        editing: editing,
        flatsCheckersOnFloorChange: flatsCheckersOnFloorChange,
        areasCheckerOnFlatChange: areasCheckerOnFlatChange
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}