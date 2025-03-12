import CreateProduct from "./components/pages/CreateProduct"
import Navbar from "./components/pages/Navbar"
import ProductList from "./components/pages/ProductList"
import Home from "./Home"
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/create" element={<CreateProduct/>}/>
      </Routes>
    </div>
  )
}

export default App