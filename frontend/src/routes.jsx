import { createBrowserRouter, ScrollRestoration, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import HowItWorks from './pages/HowItWorks';
import UserDashboard from './pages/UserDashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DestinationDetail from './pages/DestinationDetail';
import Dashboard from './components/Dashboard';
import ProfileForm from './pages/ProfileForm';
import NotFound from './pages/NotFound';
import PlanTrip from './pages/PlanTrip';
import ExplorePeople from './pages/ExplorePeople';
import Notifications from './pages/Notifications';
import ChatSystem from './pages/ChatSystem'; 
import ViewUserProfile from './pages/ViewUserProfile'; 
import OwnUserProfile from './pages/OwnUserProfile'; 
import History from './pages/History';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OTPVerification from './pages/OTPVerification';


const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('ProtectedRoute - User:', user);
  return user ? children : <Navigate to="/login" />;
};



export const router = createBrowserRouter([
  {
    path: '/reset-password',
    element: (
      <>
        <ResetPassword />
        <ScrollRestoration />
      </>
    )
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <>
            <Home />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'login',
        element: (
          
            <>
              <Login />
              <ScrollRestoration />
            </>
          
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <>
            <ForgotPassword />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'destinations',
        element: (
          <>
            <Destinations />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'destinations/:id',
        element: (
          <>
            <DestinationDetail />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'how-it-works',
        element: (
          <>
            <HowItWorks />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'signup',
        element: (
          
            <>
              <SignUp />
              <ScrollRestoration />
            </>
         
        ),
      },
      {
        path: 'verify-otp',
        element: (
          <>
            <OTPVerification />
            <ScrollRestoration />
          </>
        ),
      },
      {
        path: 'userdashboard',
        element: (
          <ProtectedRoute>
            <>
              <UserDashboard />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <>
              <Dashboard />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },{
        path:'profileform',
        element:(
          <ProtectedRoute>
            <>
            <ProfileForm/>
            <ScrollRestoration />
            </>
          </ProtectedRoute>
        )
      },
      {
        path: 'explore',
        element: (
          <ProtectedRoute>
            <>
              <ExplorePeople />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },
      {
        path: 'plan-trip',
        element: (
          <ProtectedRoute>
            <>
              <PlanTrip />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },
      {
        path: 'notifications',
        element: (
          <ProtectedRoute>
            <>
              <Notifications />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },
      {
        path: 'ChatSystem/:userId',
        element: (
          <ProtectedRoute>
            <>
              <ChatSystem />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },{
        path: 'Chat',
        element: (
          <ProtectedRoute>
            <>
              <ChatSystem />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },{
        path:'viewuserprofile/:userId',
        element:(
          <ProtectedRoute>
            <>
            <ViewUserProfile/>
            <ScrollRestoration />
            </>
          </ProtectedRoute>
        )
      },
      {
        path: 'ownuserprofile',
        element: (
          <ProtectedRoute>
            <>
              <OwnUserProfile />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      },{
        path: 'history',
        element: (
          <ProtectedRoute>
            <>
             <History />
              <ScrollRestoration />
            </>
          </ProtectedRoute>
        ),
      }
    ],
  },
]);
