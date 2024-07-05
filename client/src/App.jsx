import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './component/Header'
export default function App() {
  return (
    <BrowserRouter >

    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<SignIn/>} path="/sign-in"/>
        <Route path="/sign-up" element={<SignUp/>}/>

        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </BrowserRouter>
  );
}
