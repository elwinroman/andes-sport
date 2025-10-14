import './App.css'

import { Route, Routes } from 'react-router-dom'

import { Layout } from './layout/Layout'
import { TeamPlayerManager } from './pages/equipos/TeamPlayerManager'
import { FutbolPage } from './pages/futbol/FutbolPage'
import { HomePage } from './pages/home/HomePage'
import { MatchManager } from './pages/partidos/MatchManager'
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
          path="/gestor/equipos"
          element={
            <Layout>
              <TeamPlayerManager />
            </Layout>
          }
        />

        <Route
          path="/gestor/partidos"
          element={
            <Layout>
              <MatchManager />
            </Layout>
          }
        />
      </Routes>
    </>
  )
}

export default App
