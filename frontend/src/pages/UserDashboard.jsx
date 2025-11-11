import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Bell, MessageSquare, Users, Map, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`/api/user/profile/profile-image/${user._id}`);
        setProfileImage(response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [user._id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center md:text-left">User Dashboard</h1>
          <div className="w-16 h-16 md:w-20 md:h-20">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-yellow-500 text-white font-bold text-2xl">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* User Profile */}
          <button
            onClick={() => navigate('/ownuserprofile')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-green-200 dark:hover:bg-green-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">View Profile</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">View and manage your profile</p>
            <ArrowRight className="w-8 h-8 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>

          {/* Notification */}
          <button
            onClick={() => navigate('/notifications')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Notifications</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Check your notifications</p>
            <ArrowRight className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>

          {/* Plan to Trip */}
          <button
            onClick={() => navigate('/plan-trip')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <Map className="w-8 h-8 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Plan to Trip</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Organize your next adventure</p>
            <ArrowRight className="w-8 h-8 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>

          {/* History */}
          <button
            onClick={() => navigate('/history')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">History</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">View your travel history</p>
            <ArrowRight className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>

          {/* Explore People */}
          <button
            onClick={() => navigate('/explore')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-pink-200 dark:hover:bg-pink-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Explore People</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Discover new travel companions</p>
            <ArrowRight className="w-8 h-8 text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>

          {/* Chat */}
          <button
            onClick={() => navigate('/chat')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-red-200 dark:hover:bg-red-900/30 transition-all duration-300 hover:-translate-y-1 text-left group relative"
          >
            <div className="flex items-center justify-between">
              <MessageSquare className="w-8 h-8 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Chat</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Connect with your travel buddies</p>
            <ArrowRight className="w-8 h-8 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
