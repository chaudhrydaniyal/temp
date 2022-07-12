import Header from './Components/Header/Header'
import Home from './Pages/Home/Home';
import { useState } from 'react';
import HomePartners from './Components/Home Partners/HomePartners'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import AddProperty from './Components/AddProperty/AddProperty';
import Register from './Pages/Register/Register';
import PropertyListing from './Pages/PropertyListing/PropertyListing';
function App() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  return (
   <>
    <BrowserRouter>
       <Header show={show} handleShow={handleShow} handleClose={handleClose}/>
        <Routes>      
        <Route path='/' element={<Home/>}></Route>
        <Route path='/addproperty' element={<AddProperty/>}></Route>
        <Route path='/register' element={<Register handleShow={handleShow}/>}></Route>
        <Route path='/propertylisting' element={<PropertyListing />}></Route>
        

       </Routes>
       <HomePartners/>
       <Footer/>
    </BrowserRouter>
   </>
  );
}

export default App;
