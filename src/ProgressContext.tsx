import { createContext, useContext, useRef, type RefObject } from "react";

type ProgressContextType = {
  editing: boolean,
  // Syncers
  flatsCheckersOnFloorChange: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
  areasCheckerOnFlatChange: RefObject<Record<number, (flatId: number, flatChecked: boolean) => void>>
  itemsCheckerOnAreaChange: RefObject<Record<number, (areaId: number, areaChecked: boolean) => void>>
  // Savers
  saveFloorSelectionsRef: RefObject<() => void>
  saveFlatSelectionsRef: RefObject<Record<number, () => void>>
  saveAreaSelectionsRef: RefObject<Record<number, () => void>>
  saveItemSelectionsRef: RefObject<Record<number, () => void>>
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false,
  // ---
  flatsCheckersOnFloorChange: { current: {} },
  areasCheckerOnFlatChange: { current: {} },
  itemsCheckerOnAreaChange: { current: {} },
  // ---
  saveFloorSelectionsRef: { current: () => { } },
  saveFlatSelectionsRef: { current: {} },
  saveAreaSelectionsRef: { current: {} },
  saveItemSelectionsRef: { current: {} },
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ editing, children }: { editing: boolean, children: React.ReactNode }) => {

  const flatsCheckersOnFloorChange = useRef({})
  const areasCheckerOnFlatChange = useRef({})
  const itemsCheckerOnAreaChange = useRef({})

  const saveFloorSelectionsRef = useRef(() => { })
  const saveFlatSelectionsRef = useRef({})
  const saveAreaSelectionsRef = useRef({})
  const saveItemSelectionsRef = useRef({})

  return (
    <ProgressContext.Provider
      value={{
        editing: editing,
        // ---
        flatsCheckersOnFloorChange: flatsCheckersOnFloorChange,
        areasCheckerOnFlatChange: areasCheckerOnFlatChange,
        itemsCheckerOnAreaChange: itemsCheckerOnAreaChange,
        // ---
        saveFloorSelectionsRef: saveFloorSelectionsRef,
        saveFlatSelectionsRef: saveFlatSelectionsRef,
        saveAreaSelectionsRef: saveAreaSelectionsRef,
        saveItemSelectionsRef: saveItemSelectionsRef,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}