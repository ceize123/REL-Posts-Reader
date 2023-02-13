import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

function App() {
    
    return (
    <BrowserRouter>
      <Routes>
        {/* Purpose of index is to use when we want the path of parent to used. */}
				<Route index element={<Home />} /> 
				<Route path='posts/:id' element={<PostDetail />} />
				{/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    );
}

export default App;
