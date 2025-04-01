
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header/Header';

import Nomatch from './Pages/noMatch/Nomatch';
import PostUser from './Pages/User/PostUser';
import Datasaved from './Pages/Datasave/Datasaved';
import Dashboard from './Pages/dashboard/Dashboard';
import UpdateUser from './Pages/User/UpdateUser';

function App() {
  return (
   <>
   <Header></Header>
   <Routes>
   <Route path='/' element={<PostUser></PostUser>}>
   </Route>
   <Route path="/postuser" element={<PostUser></PostUser>}></Route>

   {/* <Route path="/postuser/:id" element={<UpdateUser></UpdateUser>}></Route> */}
   <Route path="/postuser/:id" element={<UpdateUser />} />

  
   <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    {/* <Route path='/Employee' element={<PostUser />} /> */}
    
    <Route path="/data-saved" element={<Datasaved></Datasaved>} />
    <Route path='*' element={<Nomatch></Nomatch>}>
    </Route>
   </Routes>
   
   </>
  );
}

export default App;
