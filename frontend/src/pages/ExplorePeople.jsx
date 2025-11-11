import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, User, Users, MapPin, Calendar, Target } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ExplorePeople = () => {
  const { user } = useContext(AuthContext);
  const [people, setPeople] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    interests: [],
    ageRange: [18, 60],
    groupSize: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        console.log('Current logged in user ID:', user?._id);
        const response = await axios.get('/api/trips/explore');
        const sortedPeople = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('Fetched people data:', sortedPeople);
        
        // Verify none of the trips belong to the current user
        const currentUserTrips = sortedPeople.filter(person => person.user?._id === user?._id);
        if (currentUserTrips.length > 0) {
          console.warn('Warning: Current user trips found in explore results:', currentUserTrips);
        }
        
        setPeople(sortedPeople);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };
    fetchPeople();
  }, [user]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      const images = {};
      for (const person of people) {
        try {
          const response = await axios.get(`/api/user/profile/profile-image/${person.user?._id}`);
          images[person.user?._id] = response.data.imageUrl;
        } catch (error) {
          console.error('Error fetching profile image:', error);
          images[person.user?._id] = null;
        }
      }
      setProfileImages(images);
    };

    if (people.length > 0) {
      fetchProfileImages();
    }
  }, [people]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleConnect = async (userId) => {
    try {
      await axios.post('/api/notifications', {
        senderId: user._id,
        receiverId: userId,
        message: 'wants to connect with you',
        senderName: user.name
      });
      toast.success('Connection request sent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send connection request. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleViewProfile = (userId) => {
    console.log('Viewing profile for user ID:', userId);
    if (!userId) {
      console.error('User ID is undefined or null');
      toast.error('Unable to view profile: User ID not found');
      return;
    }
    navigate(`/viewuserprofile/${userId}`);
  };

  const filteredPeople = people.filter(person => 
    person.travelingTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-screen pb-20 bg-gray-50 dark:bg-gray-900 pt-24 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-12 text-center'>
          <h1 className='text-5xl font-bold text-gray-800 mb-3'>Find Travel Buddies</h1>
          <p className='text-xl text-gray-600'>Connect with fellow travelers who share your interests and travel plans.</p>
        </div>
        <div className='flex items-center justify-between mb-8'>
          <div className='relative w-full max-w-md'>
            <input
              type='text'
              placeholder='Search by destination...'
              value={searchQuery}
              onChange={handleSearch}
              className='w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={20} />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPeople.map((person) => (
            <div key={person._id} className='bg-white rounded-lg shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>
                  {profileImages[person.user?._id] ? (
                    <img 
                      src={profileImages[person.user?._id]} 
                      alt={person.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <span className='text-gray-600 font-bold'>{person.name[0]}</span>
                  )}
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>{person.name}</h3>
                  <p className='text-sm text-gray-500'>{person.age} years old</p>
                </div>
              </div>
              <div className='space-y-2'>
                <p className='text-sm flex items-center gap-2'>
                  <MapPin size={16} className='text-black' />
                  <span className='font-medium'>Traveling To:</span> {person.travelingTo}
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Calendar size={16} className='text-black' />
                  <span className='font-medium'>Dates:</span> {new Date(person.fromDate).toLocaleDateString()} - {new Date(person.toDate).toLocaleDateString()}
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Users size={16} className='text-black' />
                  <span className='font-medium'>Looking for:</span> {person.groupSize || 'Any'} people
                </p>
                <div className='flex flex-wrap gap-2'>
                  {person.interests.map((interest, index) => (
                    <span key={index} className='px-2 py-1 bg-gray-100 rounded-full text-xs'>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <button
                  className='mt-4 w-full px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 hover:scale-95 transition-transform duration-200'
                  onClick={() => handleConnect(person.user?._id)}
                >
                  Connect
                </button>
                <button
                  className='mt-4 w-full px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform duration-200'
                  onClick={() => handleViewProfile(person.user?._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExplorePeople;
