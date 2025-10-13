import './App.css'

import { Route, Routes } from 'react-router-dom'

import { Layout } from './layout/Layout'
import TeamPlayerManager from './pages/equipos/TeamPlayerManager'
import { FutbolPage } from './pages/futbol/FutbolPage'
import { HomePage } from './pages/home/HomePage'
import { VoleyPage } from './pages/VoleyPage'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/futbol"
          element={
            <Layout>
              <FutbolPage />
            </Layout>
          }
        />
        <Route
          path="/voley"
          element={
            <Layout>
              <VoleyPage />
            </Layout>
          }
        />

        <Route
          path="/administrador-equipo"
          element={
            <Layout>
              <TeamPlayerManager />
            </Layout>
          }
        />
      </Routes>
    </>
  )
}

export default App
