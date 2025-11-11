import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Mail, MapPin, Calendar, Users, Globe, Instagram, Facebook, Twitter, X, Pencil } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const OwnUserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ socialMedia: {} });
  const [imagePreview, setImagePreview] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user?._id) {
          console.log('User ID is undefined');
          throw new Error('User ID is undefined');
        }
        console.log('Fetching profile for user ID:', user._id);
        const response = await axios.get(`/api/viewprofile/${user._id}`);
        console.log('API response:', response.data);
        if (!response.data) {
          throw new Error('Profile data not found');
        }
        setUserProfile(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user profile:', {
          message: error.message,
          stack: error.stack,
          response: error.response
        });
        setError(error.response?.data?.message || error.message || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserProfile();
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setFormData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      age: userProfile.age,
      address: userProfile.address,
      bio: userProfile.bio,
      interests: userProfile.interests.join(','),
      profileImage: userProfile.profileImage || '',
      pastTrips: userProfile.pastTrips || '',
      socialMedia: userProfile.socialMedia || {}
    });
    setInterests(userProfile.interests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format interests as array of individual items
    const formattedInterests = interests.map(interest => interest.trim());

    // Ensure social media has proper structure
    const formattedSocialMedia = {
      instagram: formData.socialMedia?.instagram || '',
      facebook: formData.socialMedia?.facebook || '',
      twitter: formData.socialMedia?.twitter || ''
    };

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'socialMedia') {
        formDataToSend.append(key, JSON.stringify(formattedSocialMedia));
      } else if (key === 'interests') {
        // Remove JSON.stringify here since we already have an array
        formDataToSend.append(key, formattedInterests);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(`/api/profile/${userProfile._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUserProfile(response.data);
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInterestChange = (e) => {
    setInterestInput(e.target.value);
  };

  const handleInterestAdd = () => {
    const interest = interestInput.trim();
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setInterestInput('');
    }
  };

  const handleInterestDelete = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

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
    <div style={{ position: 'relative' }}>
      <Toaster />
      <div className='min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8'>
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

        {isEditModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
              <div className='flex justify-between items-center mb-4 sticky top-0 bg-white py-2'>
                <h2 className='text-xl font-bold'>Edit Profile</h2>
                <button onClick={() => setIsEditModalOpen(false)}>
                  <X size={24} className='text-gray-600 hover:text-gray-800' />
                </button>
              </div>
              <form onSubmit={handleSubmit} className='space-y-4 pb-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>First Name</label>
                    <input
                      type='text'
                      value={formData.firstName || ''}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className='w-full px-3 py-2 border rounded-md'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Last Name</label>
                    <input
                      type='text'
                      value={formData.lastName || ''}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className='w-full px-3 py-2 border rounded-md'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Age</label>
                  <input
                    type='number'
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className='w-full px-3 py-2 border rounded-md'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Address</label>
                  <input
                    type='text'
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className='w-full px-3 py-2 border rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Profile Image</label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='w-32 h-32 rounded-full object-cover mb-2'
                    />
                  )}
                  <input
                    type='file'
                    onChange={handleImageChange}
                    className='w-full px-3 py-2 border rounded-md'
                    accept='image/*'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className='w-full px-3 py-2 border rounded-md'
                    rows='3'
                  ></textarea>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Interests</label>
                  <div className='flex flex-wrap gap-2'>
                    {interests.map((interest, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm relative'
                      >
                        {interest}
                        <button
                          className='absolute -top-2 -right-2 bg-yellow-100 rounded-full p-1 hover:bg-yellow-200 transition-colors'
                          onClick={() => handleInterestDelete(interest)}
                        >
                          <X size={12} className='text-yellow-800' />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
                    <input
                      type='text'
                      value={interestInput}
                      onChange={handleInterestChange}
                      className='w-full px-3 py-2 border rounded-md'
                      placeholder='Enter interests'
                    />
                    <button
                      type='button'
                      onClick={handleInterestAdd}
                      className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors'
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Past Trips</label>
                  <textarea
                    value={formData.pastTrips || ''}
                    onChange={(e) => setFormData({ ...formData, pastTrips: e.target.value })}
                    className='w-full px-3 py-2 border rounded-md'
                    rows='3'
                  ></textarea>
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium mb-1'>Social Media</label>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Instagram size={18} />
                      <input
                        type='text'
                        value={formData.socialMedia?.instagram || ''}
                        onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, instagram: e.target.value } })}
                        className='w-full px-3 py-2 border rounded-md'
                        placeholder='Instagram URL'
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Facebook size={18} />
                      <input
                        type='text'
                        value={formData.socialMedia?.facebook || ''}
                        onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, facebook: e.target.value } })}
                        className='w-full px-3 py-2 border rounded-md'
                        placeholder='Facebook URL'
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Twitter size={18} />
                      <input
                        type='text'
                        value={formData.socialMedia?.twitter || ''}
                        onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, twitter: e.target.value } })}
                        className='w-full px-3 py-2 border rounded-md'
                        placeholder='Twitter URL'
                      />
                    </div>
                  </div>
                </div>
                <div className='pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 p-8' style={{ position: 'relative' }}>
              <div className='absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-white/30 hover:scale-105' onClick={handleEditClick}>
                <Pencil className='text-white w-5 h-5 transition-transform hover:scale-125' />
              </div>
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

            <div className='p-8 space-y-8'>

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


              {userProfile.bio && (
                <div className='space-y-2'>
                  <h2 className='text-xl font-bold text-gray-800'>About Me</h2>
                  <p className='text-gray-600'>{userProfile.bio}</p>
                </div>
              )}

              {userProfile.pastTrips && (
                <div className='space-y-2'>
                  <h2 className='text-xl font-bold text-gray-800'>Past Trips</h2>
                  <p className='text-gray-600'>{userProfile.pastTrips}</p>
                </div>
              )}

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
    </div>
  );
};

export default OwnUserProfile;
