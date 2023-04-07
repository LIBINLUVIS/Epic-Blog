import React,{} from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {UserProvider} from './Context/UserContext.js';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Signup1 from './Pages/Signup1';
import Authhome from './Pages/Authhome';
import Dashboard from './Pages/dashboard'
import Write from './Pages/Write';
import Read from './Pages/Read';
import Blogs from './Pages/Blogs'
import Detailblog from './Pages/Detailblog';
import PrivateRoutes from './utils/PrivateRoutes';
import UpdateWrite from './Pages/UpdateWrite.js';
import Allblogs from './Pages/Allblogs.js';




function App() {

  return (
    <div>
      <Router>
        <UserProvider>
        <Routes>
        {/* <Route element={<PrivateRoutes/>} >
        </Route> */}
         <Route element={<PrivateRoutes/>}>
         <Route element={<Authhome/>} path="/authhome"/>
         <Route element={<Dashboard/>} path="/dashboard"/>
         <Route element={<Write/>} path="/write" />
         <Route element={<Detailblog/>} path="/blog/:id" exact/>
         <Route element={<UpdateWrite/>} path="/updatepost/:id" exact/>
         </Route>
         <Route element={<Home/>} path="/" exact/>
         <Route element={<Allblogs/>} path="/allblogs"/>
         <Route element={<Blogs/>} path="/blogs/:id" exact/>
         <Route element={<Login/>} path="/signin" />
         <Route  element={<Signup/>} path="/signup"/>  
         <Route element={<Read/>} path="/Read" />
         <Route element={<Signup1/>} path="/signup1"/>
         </Routes>
        </UserProvider> 
      </Router>
    </div>
  );
}

export default App;
