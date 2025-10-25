import { createContext, useContext, useRef, type RefObject } from "react";

type ProgressContextType = {
  editing: boolean,
  // Syncers
  flatsCheckersOnFloorChange: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
  areasCheckerOnFlatChange: RefObject<Record<number, (flatId: number, flatChecked: boolean) => void>>
  itemsCheckerOnAreaChange: RefObject<Record<number, (areaId: number, areaChecked: boolean) => void>>
  // Savers / Reverters
  handleFloorSelectionsRef: RefObject<(action: "save" | "cancel") => void>
  handleFlatSelectionsRef: RefObject<Record<number, (action: "save" | "cancel") => void>>
  handleAreaSelectionsRef: RefObject<Record<number, (action: "save" | "cancel") => void>>
  handleItemSelectionsRef: RefObject<Record<number, (action: "save" | "cancel") => void>>
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false,
  // ---
  flatsCheckersOnFloorChange: { current: {} },
  areasCheckerOnFlatChange: { current: {} },
  itemsCheckerOnAreaChange: { current: {} },
  // ---
  handleFloorSelectionsRef: { current: () => { } },
  handleFlatSelectionsRef: { current: {} },
  handleAreaSelectionsRef: { current: {} },
  handleItemSelectionsRef: { current: {} },
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ editing, children }: { editing: boolean, children: React.ReactNode }) => {

  const flatsCheckersOnFloorChange = useRef({})
  const areasCheckerOnFlatChange = useRef({})
  const itemsCheckerOnAreaChange = useRef({})

  const handleFloorSelectionsRef = useRef(() => { })
  const handleFlatSelectionsRef = useRef({})
  const handleAreaSelectionsRef = useRef({})
  const handleItemSelectionsRef = useRef({})

  return (
    <ProgressContext.Provider
      value={{
        editing: editing,
        // ---
        flatsCheckersOnFloorChange: flatsCheckersOnFloorChange,
        areasCheckerOnFlatChange: areasCheckerOnFlatChange,
        itemsCheckerOnAreaChange: itemsCheckerOnAreaChange,
        // ---
        handleFloorSelectionsRef: handleFloorSelectionsRef,
        handleFlatSelectionsRef: handleFlatSelectionsRef,
        handleAreaSelectionsRef: handleAreaSelectionsRef,
        handleItemSelectionsRef: handleItemSelectionsRef,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}