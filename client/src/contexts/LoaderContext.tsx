import { Loader } from "@/layout/Loader"
import { createContext, useContext, useState } from "react"

const loaderContext = createContext<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>({
  loading: false,
  setLoading: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => useContext(loaderContext)

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <loaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </loaderContext.Provider>
  )
}
