import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SendAndCheckEmails from './components/SendAndCheckEmails'
import Admin from './components/Admin'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<SendAndCheckEmails />}
        />
        <Route
          path='/admin'
          element={<Admin />}
        />
      </Routes>
    </>
  )
}

export default App
