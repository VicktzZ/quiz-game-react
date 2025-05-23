import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: number
  username: string
  cpf: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (cpf: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {}
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const login = async (cpf: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`/api/users?cpf=${cpf}`)
      if (response.data.length > 0) {
        setUser(response.data[0])
        localStorage.setItem('user', JSON.stringify(response.data[0]))
      } else {
        throw new Error("Usuário não encontrado")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setError(null)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = localStorage.getItem('user')
        if (user) {
          setUser(JSON.parse(user))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao verificar autenticação")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext)
