import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import useFetchAndLoad from '@hooks/useFetchAndLoad'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router-dom'

import { type Credential, type LoginResponse, loginService } from '@/services/login.service'
import { useStore } from '@/zustand/store'

export function LoginPage() {
  const createSession = useStore((state) => state.createSession)
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  const { callEndpoint, loading, error } = useFetchAndLoad<LoginResponse>()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const usernameEntry = formData.get('login')
    const passwordEntry = formData.get('password')

    const username = typeof usernameEntry === 'string' ? usernameEntry : ''
    const password = typeof passwordEntry === 'string' ? passwordEntry : ''

    const credential: Credential = {
      username,
      password,
    }

    const response = await callEndpoint(loginService(credential))
    createSession(response.data.access_token)
  }

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <section className="w-full h-full grid place-content-center bg-background">
      <div className="shadow-widget bg-card w-[380px] px-7 py-9 rounded-md">
        <div className="w-full flex flex-col gap-6">
          <img src="https://app.losandes.pe/logo-blue_horizontal.svg" alt="Logo andes" className="w-36 m-auto" />
          <h2 className="text-2xl font-bold font-montserrat">Login Andes Sport</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input name="login" placeholder="Login" />
            <Input name="password" type="password" placeholder="Password" />

            {error && <div className="text-red-600 text-sm font-medium">{error.detail}</div>}

            <Button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
