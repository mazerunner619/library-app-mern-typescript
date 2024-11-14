import { useDispatch, useSelector } from "react-redux";

import HomePage from "./pages/HomePage/HomePage"
import { AppDispatch, RootState } from "./redux/ReduxStore";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import { useEffect } from "react";
import { fetchUser } from "./redux/slices/AuthSlice";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Catalog from "./pages/Catalog/Catalog";
import ResourcePage from "./pages/ResourcePage/ResourcePage";
function App() {

  const {loggedInUser} = useSelector( (state:RootState) => state.auth)
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {

    const userId = localStorage.getItem("userId");
    if(userId && !loggedInUser){
      dispatch(fetchUser({userId, property:'loggedInUser'}));
    }

  }, [loggedInUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>

          <Route path="" element={<HomePage />}/>
          <Route path="/catalog" element={<Catalog />}/>
          <Route path="/resource/:barcode" element={<ResourcePage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App