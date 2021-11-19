import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import Adder from './Components/Adder';
import Subtracter from './Components/Subtracter';
import Passbook from './Components/Passbook';
function App() {
  return (
    <Router>
      <Suspense fallback={<img src="https://www.uttf.com.ua/assets/images/loader2.gif" alt="loading..." height="100%" width="100%" />}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign' element={<SignUp />} />
          <Route path='/home' element={<Home />} >
            <Route path='add' element={<Adder />} />
            <Route path='sub' element={<Subtracter />} />
            {/* <Route path='passbook' element={<Passbook />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
