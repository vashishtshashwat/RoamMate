import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Mail, MapPin, Calendar, Users, Globe, Instagram, Facebook, Twitter, X } from 'lucide-react';

const ViewUserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/viewprofile/${userId}`);
        setUserProfile(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.response?.data?.message || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8'>
      {/* Profile Image Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg relative'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors'
            >
              <X size={24} className='text-gray-600' />
            </button>
            <img
              src={userProfile.profileImage}
              alt='Profile'
              className='max-w-[70vw] max-h-[70vh] rounded-lg'
            />
          </div>
        </div>
      )}

      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Profile Header */}
          <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 p-8'>
            <div className='flex flex-col items-center space-y-4'>
              {userProfile.profileImage && (
                <img
                  src={userProfile.profileImage}
                  alt='Profile'
                  className='w-32 h-32 rounded-full object-cover border-4 border-white cursor-pointer hover:opacity-90 transition-opacity'
                  onClick={() => setIsModalOpen(true)}
                />
              )}
              <h1 className='text-3xl font-bold text-white'>
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              {userProfile.age && (
                <p className='text-white font-medium'>{userProfile.age} years old</p>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className='p-8 space-y-8'>
            {/* About Section */}
            {userProfile.bio && (
              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-gray-800'>About Me</h2>
                <p className='text-gray-600'>{userProfile.bio}</p>
              </div>
            )}

            {/* Contact Information */}
            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-gray-800'>Contact Information</h2>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2 text-gray-600'>
                  <Mail size={18} />
                  <span>Email: {userProfile.email}</span>
                </div>
                {userProfile.address && (
                  <div className='flex items-center space-x-2 text-gray-600'>
                    <MapPin size={18} />
                    <span>Location: {userProfile.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Past Trips */}
            {userProfile.pastTrips && (
              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-gray-800'>Past Trips</h2>
                <p className='text-gray-600'>{userProfile.pastTrips}</p>
              </div>
            )}

            {/* Interests */}
            {userProfile.interests && userProfile.interests.length > 0 && (
              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-gray-800'>Interests</h2>
                <div className='flex flex-wrap gap-2'>
                  {userProfile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm'
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media */}
            {(userProfile.socialMedia?.instagram || userProfile.socialMedia?.facebook || userProfile.socialMedia?.twitter) && (
              <div className='space-y-2 pt-4'>
                <h2 className='text-xl font-bold text-gray-800'>Social Media</h2>
                <div className='flex space-x-4'>
                  {userProfile.socialMedia?.instagram && (
                    <a
                      href={userProfile.socialMedia.instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors'
                    >
                      <Instagram size={20} />
                      <span>@{userProfile.socialMedia.instagram.split('/').pop()}</span>
                    </a>
                  )}
                  {userProfile.socialMedia?.facebook && (
                    <a
                      href={userProfile.socialMedia.facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors'
                    >
                      <Facebook size={20} />
                      <span>@{userProfile.socialMedia.facebook.split('/').pop()}</span>
                    </a>
                  )}
                  {userProfile.socialMedia?.twitter && (
                    <a
                      href={userProfile.socialMedia.twitter}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors'
                    >
                      <Twitter size={20} />
                      <span>@{userProfile.socialMedia.twitter.split('/').pop()}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;
