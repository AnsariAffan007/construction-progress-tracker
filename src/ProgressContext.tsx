import { createContext, useContext } from "react";

type ProgressContextType = {
  editing: boolean
}

const ProgressContext = createContext<ProgressContextType>({
  editing: false
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressContext = () => useContext(ProgressContext)

export const ProgressContextProvider = ({ values, children }: { values: ProgressContextType, children: React.ReactNode }) => {
  return (
    <ProgressContext.Provider value={values}>
      {children}
    </ProgressContext.Provider>
  )
}