import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForceRedirect from './ForceRedirect';
import PrivateRouter from './PrivateRouter'
import NoAccess from './NoAccess';
import NotFound from './NotFound';
import Profile from '../pages/Profile';
export default function Routing({ user }) {

/*****style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 10.4px, 0px);" */

  return (
    <div>
      <Routes >

      <Route path={`/home`} element={
         
         <PrivateRouter user={user}>
           <Home/>
         </PrivateRouter>
         
        
        } />
        <Route path={`/profile/${user.id}`} element={
         
         <PrivateRouter user={user}>
           <Profile/>
         </PrivateRouter>
         
        
        } />
        <Route path="/" element={
          <ForceRedirect user={user}>
            <Login />
          </ForceRedirect>
        } />
        <Route path="/login" element={
          <ForceRedirect user={user}>
            <Login />
          </ForceRedirect>
        } />
        <Route path="/register" element={
          <ForceRedirect user={user}>
            <Register />
          </ForceRedirect>
        } />
    <Route path="*" element={<NotFound />} />
          <Route path="/noaccess" element={<NoAccess />} />


      </Routes>


    </div>

  )
}