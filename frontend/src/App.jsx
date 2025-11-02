import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import ThemeToggler from './components/ThemeToggler'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import About from './pages/About'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import PaymentDetails from './pages/PaymentDetails'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={(
                <>
                  <Header />
                  <main><Home /></main>
                  <Footer />
                </>
              )} />
              <Route path="/about" element={(
                <>
                  <Header />
                  <main><About /></main>
                  <Footer />
                </>
              )} />
              <Route path="/checkout" element={(
                <>
                  <Header />
                  <main><Checkout /></main>
                  <Footer />
                </>
              )} />
              <Route path="/payment-details" element={<PaymentDetails />} />
              <Route path="/login" element={(
                <>
                  <Header />
                  <main><Login /></main>
                  <Footer />
                </>
              )} />
              <Route path="/signup" element={(
                <>
                  <Header />
                  <main><Signup /></main>
                  <Footer />
                </>
              )} />
              <Route path="*" element={(
                <>
                  <Header />
                  <main><NotFound /></main>
                  <Footer />
                </>
              )} />
            </Routes>
            <ThemeToggler />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#4aed88',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff6b6b',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
