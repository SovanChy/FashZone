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
import NewsSection from './Pages/Newspage/NewsSection';
import CalendarEvent from './Pages/Calendar/Calendar';
import ProfilePage from './Pages/Profile/ProfilePage';
import Post from './Pages/Newsfeed/Post';
import { useAuthContext } from './Hook/useAuthContext';
import { useLocation } from 'react-router-dom';

function App() {
  const { user, authIsReady } = useAuthContext()
  const location = useLocation()
  const AuthPage = ["/signup", "/login", "/newsfeed", "/news"].includes(location.pathname) || location.pathname.startsWith("/product/")

  
  return (
   
    <div className='App'>
       {authIsReady && (
        <>
        {!AuthPage && (
          // Add your conditional rendering logic here
        <NavBar />
       )}
        <Routes>
          <Route path="/" element={
            <LandingPage/>         
          }
         />
          <Route path="/newsfeed" element={
            user ? <Newsfeed /> : <Navigate to="/" replace />    
            // <Newsfeed />            
            } />
          <Route path="/signup" element={
            user ? <Navigate to="/trending" /> :  <SignUp/>           

            } />

          <Route path="/product/:id" element={
            user ? <Post /> : <Navigate to ="/" replace/>
          } />
          <Route path="/login" element={
            user ? <Navigate to="/trending" /> : <Login/>                
            } />
          <Route path='/job' element={
            user ? <Job /> : <Navigate to="/" replace />     
            // <Job />          
            }/>
          <Route path='/portfolio' element={
            user ? <Portfolio/> : <Navigate to="/" replace />   
            // <Portfolio/>             
            }/>
          <Route path='/view/*' element={
            <View/>
            } />
          <Route path='/events' element={
            user ? <CalendarEvent/> : <Navigate to="/" replace />   
            // <CalendarEvent/>            

            }/>
          <Route path='/pricing' element={
            user ? <PricingPlans/> : <Navigate to="/" replace />   
            // <PricingPlans/>            

            }/>
          <Route path='/trending' element={
            user ? <Trend /> : <Navigate to="/" replace /> 
           }/>

          <Route path='/blog' element={
            user ? <BlogComponent/> : <Navigate to="/" replace />   
            // <BlogComponent/>            

            } />
          <Route path='/news' element={
            user ? <NewsSection/> : <Navigate to="/" replace />  
                
            } />
          <Route path='/profile' element={
            user? <ProfilePage/> : <Navigate to="/" replace/>
            // <ProfilePage/> 
          }/>
        </Routes>
        {!AuthPage && (
          // Add your conditional rendering logic here
        <Footer />
      )}
        </>
   )} 
    </div>
  );
}

export default App;