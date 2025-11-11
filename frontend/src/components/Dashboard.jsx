import React from 'react';

const Dashboard = () => {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    joinedDate: "January 2024",
    travelStyle: "Adventure Seeker"
  };

  const placesVisited = [
    { name: "Bali, Indonesia", date: "December 2024", rating: 5 },
    { name: "Swiss Alps", date: "October 2024", rating: 4 },
    { name: "Santorini, Greece", date: "July 2024", rating: 5 }
  ];

  const interests = [
    "Mountain Hiking",
    "Beach Activities",
    "Cultural Experiences",
    "Local Cuisine",
    "Photography"
  ];

  const upcomingTrips = [
    { destination: "Tokyo, Japan", date: "March 2025" },
    { destination: "Machu Picchu, Peru", date: "June 2025" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with User Info */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20">
              <img 
                src="https://placekitten.com/200/200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userInfo.name}</h1>
              <p className="text-blue-200">{userInfo.location}</p>
              <p className="text-blue-200">Member since {userInfo.joinedDate}</p>
              <div className="mt-4">
                <span className="bg-blue-700 px-4 py-1 rounded-full text-sm">
                  {userInfo.travelStyle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Travel Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Places Visited</h3>
            <p className="text-3xl font-bold text-blue-600">{placesVisited.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Upcoming Trips</h3>
            <p className="text-3xl font-bold text-blue-600">{upcomingTrips.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Travel Points</h3>
            <p className="text-3xl font-bold text-blue-600">850</p>
          </div>
        </div>

        {/* Places Visited Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Places Visited</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placesVisited.map((place, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  {/* Placeholder for destination image */}
                  <img
                    src={`https://source.unsplash.com/400x300/?${place.name.split(',')[0]}`}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <p className="text-gray-600">{place.date}</p>
                  <div className="flex mt-2">
                    {[...Array(place.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Travel Interests</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Upcoming Trips Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Upcoming Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trip.destination}</h3>
                  <p className="text-gray-600">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
