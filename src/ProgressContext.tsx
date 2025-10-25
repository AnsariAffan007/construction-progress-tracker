import { createContext, useContext, useRef, type RefObject } from "react";

type ProgressContextType = {
  editing: boolean,
  flatsCheckersOnFloorChange: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
  areasCheckerOnFlatChange: RefObject<Record<number, (flatId: number, flatChecked: boolean) => void>>
  itemsCheckerOnAreaChange: RefObject<Record<number, (areaId: number, areaChecked: boolean) => void>>
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false,
  flatsCheckersOnFloorChange: { current: {} },
  areasCheckerOnFlatChange: { current: {} },
  itemsCheckerOnAreaChange: { current: {} }
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ editing, children }: { editing: boolean, children: React.ReactNode }) => {

  const flatsCheckersOnFloorChange = useRef({})
  const areasCheckerOnFlatChange = useRef({})
  const itemsCheckerOnAreaChange = useRef({})

  return (
    <ProgressContext.Provider
      value={{
        editing: editing,
        flatsCheckersOnFloorChange: flatsCheckersOnFloorChange,
        areasCheckerOnFlatChange: areasCheckerOnFlatChange,
        itemsCheckerOnAreaChange: itemsCheckerOnAreaChange
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}