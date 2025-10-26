import { createContext, useContext, useRef, useState, type RefObject } from "react";
import { LINE_ITEMS_DUMMY } from "./data";

type ProgressContextType = {
  editing: boolean,
  itemFilter: string
  // Items selection global state setter
  itemsSelection: Record<number, boolean>,
  setItemsSelection: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
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
  itemFilter: "",
  // ---
  itemsSelection: {},
  setItemsSelection: () => { },
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

export const ProgressContextProvider = ({ editing, itemFilter, children }: { editing: boolean, itemFilter: string, children: React.ReactNode }) => {

  const flatsCheckersOnFloorChange = useRef({})
  const areasCheckerOnFlatChange = useRef({})
  const itemsCheckerOnAreaChange = useRef({})

  const handleFloorSelectionsRef = useRef(() => { })
  const handleFlatSelectionsRef = useRef({})
  const handleAreaSelectionsRef = useRef({})
  const handleItemSelectionsRef = useRef({})

  const [itemsSelection, setItemsSelection] = useState(() => {
    const temp: Record<number, boolean> = {}
    LINE_ITEMS_DUMMY.forEach(item => {
      temp[item.id] = item.status
    })
    return temp
  })

  return (
    <ProgressContext.Provider
      value={{
        editing: editing,
        itemFilter: itemFilter,
        // ---
        itemsSelection: itemsSelection,
        setItemsSelection: setItemsSelection,
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