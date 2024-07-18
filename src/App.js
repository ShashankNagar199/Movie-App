import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import { Provider,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import store from './store/store';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import MoviesDisplayAndSearch from './components/moviesOperations/MoviesDisplayAndSearch';
import MovieWatchlist from './components/moviesOperations/MovieWatchlist';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/sidebar/Sidebar';
import "../src/style.css";

const AppContent = () => {
  const user = useSelector((state) => state.userAuth.user);
  const isUserLoggedIn = useSelector((state) => state.userAuth.isUserLoggedIn);
  const location=useLocation();
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  
  //const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location, user]);

  const noSidebarPaths = ['/login', '/signup', '/'];
  const shouldRenderSidebar = !noSidebarPaths.includes(currentRoute) && user;

  return (
    <div className="app-container">
      {shouldRenderSidebar && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
           {/* Here I have added authentication if user is not looged in then 
           it will redirect to login see ProtectedRoute */}
          <Route path="/search" element={<ProtectedRoute element={MoviesDisplayAndSearch} />} />
          <Route path="/watchlist" element={<ProtectedRoute element={MovieWatchlist} />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
