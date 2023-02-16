import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Purpose of index is to use when we want the path of parent to used. */}
        <Route index element={<Home />} />
        <Route path='posts/:id' element={<PostDetail />} />
        {/* Replace avoid extra redirects after the user click back. */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
