import './App.css'

import { Route, Routes } from 'react-router-dom'

import { Layout } from './layout/Layout'
import { TeamPlayerManager } from './pages/equipos/TeamPlayerManager'
import { Error404Page } from './pages/error-404/Error404Page'
import { FutbolPage } from './pages/futbol/FutbolPage'
import { GincanaPage } from './pages/gincana/GincanaPage'
import { HomePage } from './pages/home/HomePage'
import { LoginPage } from './pages/login/LoginPage'
import { MatchManager } from './pages/partidos/MatchManager'
import { VoleyPage } from './pages/VoleyPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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
          path="/gincana"
          element={
            <Layout>
              <GincanaPage />
            </Layout>
          }
        />

        <Route
          path="/gestor-equipos"
          element={
            <Layout>
              <TeamPlayerManager />
            </Layout>
          }
        />

        <Route
          path="/gestor-partidos"
          element={
            <Layout>
              <MatchManager />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <Error404Page />
            </Layout>
          }
        />
      </Routes>
    </>
  )
}

export default App
