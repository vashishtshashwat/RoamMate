import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Calendar, User, Home, Users, Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    travelingTo: '',
    fromDate: '',
    toDate: '',
    interests: [],
    groupSize: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newInterest = e.target.value.trim();
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/trips', formData);
      if (response.status === 201) {
        toast.success('Trip planned successfully!');
        navigate('/userdashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to plan trip.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative">
          <button
            onClick={() => navigate('/userdashboard')}
            className='absolute top-6 right-6 flex items-center gap-1 p-2 text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-110'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 transition-transform duration-200 hover:scale-110' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span>Back to UserDashboard</span>
          </button>
          <h1 className="text-2xl font-bold mb-6">Plan Your Trip</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-yellow-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-yellow-500" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <Home className="w-6 h-6 text-yellow-500" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <Map className="w-6 h-6 text-yellow-500" />
                <input
                  type="text"
                  name="travelingTo"
                  placeholder="Traveling To"
                  value={formData.travelingTo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Dates</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From</label>
                    <input
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To</label>
                    <input
                      type="date"
                      id="toDate"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="w-6 h-6 text-yellow-500" />
                <input
                  type="number"
                  name="groupSize"
                  placeholder="Group Size"
                  value={formData.groupSize}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Interests</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.interests.map((interest, index) => (
                  <div key={index} className="flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm">
                    <span className="mr-1">{interest}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          interests: prev.interests.filter((_, i) => i !== index)
                        }));
                      }}
                      className="ml-1 hover:text-yellow-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add an interest and press Enter"
                onKeyDown={handleTagInput}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-auto mx-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold"
            >
                  Plan Trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
