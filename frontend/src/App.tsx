import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SubmitReview from './pages/SubmitReview'
import Home from './pages/Home.tsx'
import NavBar from './components/NavBar.tsx'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<SubmitReview />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
