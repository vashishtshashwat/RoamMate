import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';

const travelers = [
  {
    id: 1,
    name: 'Sarah Kumar',
    age: 28,
    location: 'Mumbai, India',
    interests: ['Photography', 'Hiking', 'Culture'],
    destination: 'Ladakh',
    dates: 'Mar 15 - Mar 25',
    groupSize: '2-4',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    age: 32,
    location: 'Bangalore, India',
    interests: ['Adventure', 'Trekking', 'Photography'],
    destination: 'Kerala',
    dates: 'Apr 5 - Apr 12',
    groupSize: '3-5',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Priya Singh',
    age: 26,
    location: 'Delhi, India',
    interests: ['Food', 'Art', 'History'],
    destination: 'Rajasthan',
    dates: 'Mar 20 - Mar 30',
    groupSize: '2-3',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  // Add more travelers here
];

const interests = ['All', 'Photography', 'Hiking', 'Culture', 'Adventure', 'Food', 'Art', 'History', 'Trekking'];

export default function TravelBuddies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('All');

  const filteredTravelers = travelers.filter(traveler => {
    const matchesSearch = 
      traveler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      traveler.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === 'All' || traveler.interests.includes(selectedInterest);
    return matchesSearch && matchesInterest;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Travel Buddies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with fellow travelers who share your interests and travel plans.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or destination..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="text-gray-400 flex-shrink-0" />
            <div className="flex space-x-2">
              {interests.map(interest => (
                <button
                  key={interest}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedInterest === interest
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } hover:bg-yellow-400 hover:text-black transition-all`}
                  onClick={() => setSelectedInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Travelers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTravelers.map(traveler => (
            <div
              key={traveler.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={traveler.avatar}
                    alt={traveler.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{traveler.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{traveler.age} years old</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{traveler.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Traveling to: </span>
                    <span className="font-semibold text-black dark:text-white">{traveler.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{traveler.dates}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Users className="w-4 h-4" />
                    <span>Looking for {traveler.groupSize} people</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {traveler.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 
                                 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 
                               hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-lg 
                               transition-all duration-300">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTravelers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No travelers found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
