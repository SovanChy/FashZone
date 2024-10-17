import React from 'react';
import Login from './Pages/Signin/Login';
import SignUp from './Pages/Signup/SignUp';
import Newsfeed from './Pages/Newsfeed/Newsfeed';
import Trend from './Pages/Trend/Trend';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import PricingPlans from './Pages/PricingPlan/PricingPlans';
import LandingPage from './Pages/LandingPage/LandingPage';
import Job from './Pages/Job/Job';
import Portfolio from './Pages/Job/Portfolio';
import View from './Pages/Job/View';
import BlogComponent from './Pages/Blogpage/BlogComponent';
import NewsSection from './Pages/LandingPage/NewsSection';
import CalendarEvent from './Pages/Calendar/Calendar';
import { useAuthContext } from './Hook/useAuthContext';

function App() {
  const { user, authIsReady } = useAuthContext()
  
  return (
   
    <div className='App'>
       {authIsReady && (
        <>
        <NavBar />
        <Routes>
          <Route path="/" element={
            user ? <Trend /> : <Navigate to="/landing" replace />          
          }
         />
          <Route path="/newsfeed" element={
            user ? <Newsfeed /> : <Navigate to="/landing" replace />               
            } />
          <Route path="/signup" element={
            user ? <Navigate to="/" /> : <SignUp/>           

            } />
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <Login />                
            } />
          <Route path='/job' element={
            user ? <Job /> : <Navigate to="/landing" replace />               
            }/>
          <Route path='/portfolio' element={
            user ? <Portfolio/> : <Navigate to="/landing" replace />               
            }/>
          <Route path='/view/*' element={
            <View/>
            } />
          <Route path='/events' element={
            user ? <CalendarEvent/> : <Navigate to="/landing" replace />               

            }/>
          <Route path='/pricing' element={
            user ? <PricingPlans/> : <Navigate to="/landing" replace />               

            }/>
          <Route path='/landing' element={<LandingPage/>}/>
          <Route path='/blog' element={
            user ? <BlogComponent/> : <Navigate to="/landing" replace />               

            } />
          <Route path='/news' element={
            user ? <NewsSection/> : <Navigate to="/landing" replace />               
            } />
        </Routes>
        <Footer />
        </>
      )}
    </div>
  );
}

export default App;