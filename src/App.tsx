import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'

function App() {
    
    return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        {/* Purpose of index is to use when we want the path of parent to used. */}
            <Route index element={<Home />} /> 
            <Route path='posts/:id' element={<PostDetail />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    );
}

export default App;
