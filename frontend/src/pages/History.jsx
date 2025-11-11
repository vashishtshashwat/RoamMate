import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('/api/trips/history');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/trips/${id}`);
      setTrips(trips.filter(trip => trip._id !== id));
      toast.success('Your Trip plan deleted successfully!');
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip');
    }
  };

  return (
    <div className="min-h-screen pt-24 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        <div 
          className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/userdashboard')}
        >
          <button
            className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Back to Dashboard</span>
        </div>
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">Trip History</h1>
        <h2 className="text-lg text-gray-600 mb-8">Current and Upcoming Trip Plans</h2>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div 
              key={trip._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-medium text-gray-800 mb-1">Travelling Plan To : {trip.travelingTo}</h2>
              <p className="text-xs text-gray-600">
                Created On :    {new Date(trip.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-all duration-200 hover:scale-125"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
