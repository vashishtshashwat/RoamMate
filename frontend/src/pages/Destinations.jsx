import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Nurpur Fort',
    image: 'https://cdn.s3waas.gov.in/s320f07591c6fcb220ffe637cda29bb3f6/uploads/2018/09/2018100880-1.jpg?q=80&w=1000',
    description: 'A historically rich and culturally vibrant town nestled in the foothills of Himachal Pradesh, renowned for its ancient Rajput-era Nurpur Fort, the unique Brij Raj Swami Temple, and its serene surroundings that beautifully blend heritage, spirituality, and scenic charm.',
    category: 'Heritage, Historical, Spiritual',
    bestTime: 'August to November'
  },
  {
    id: 2,
    name: 'Varanasi Ghats',
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1000',
    description: 'The spiritual capital of India, famous for its ancient temples, holy Ganges River, and vibrant cultural traditions that date back thousands of years.',
    category: 'Spiritual',
    bestTime: 'October to March'
  },
  {
    id: 3,
    name: 'Ram Mandir, Ayodhya',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg/1024px-Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg?q=80&w=1000',
    description: 'Is a magnificent temple dedicated to Lord Ram, symbolizing faith, devotion, and cultural heritage, built with intricate architecture and standing as a timeless spiritual beacon for millions of devotees across the world.',
    category: 'Spiritual and Historic',
    bestTime: 'October to March'
  },
  {
    id: 4,
    name: 'Jaipur City Palace',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000',
    description: 'The magnificent city palace complex showcases Rajasthani and Mughal architecture, housing museums, courtyards, and gardens in the Pink City.',
    category: 'Heritage',
    bestTime: 'October to March'
  },
  {
    id: 5,
    name: 'Ladakh',
    image: 'https://s3.india.com/travel/wp-content/uploads/2017/07/6.jpg?q=80&w=1000',
    description: 'A high-altitude desert known for its stunning landscapes, Buddhist monasteries, and adventure activities like trekking and mountain biking.',
    category: 'Adventure',
    bestTime: 'June to September'
  },
  {
    id: 6,
    name: 'Goa Beaches',
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1000',
    description: 'Famous for its pristine beaches, vibrant nightlife, Portuguese architecture, and water sports. Perfect for both relaxation and adventure.',
    category: 'Beach',
    bestTime: 'November to February'
  },
  {
    id: 7,
    name: 'Shri Durgiana Mandir',
    image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/98000/98349-Durgiana-Temple.jpg?q=80&w=1000',
    description: "A stunning Hindu shrine dedicated to Goddess Durga, renowned for its serene spiritual ambiance, beautiful architecture resembling the Golden Temple, and its deep cultural significance in the heart of Punjab.",
    category: 'Spiritual',
    bestTime: 'October and March'
  },
  {
    id: 8,
    name: 'Mata Vaishno Devi',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2024/09/keep-these-things-in-mind-if-you-visit-vaishno-devi-temple-.jpg?w=1280?q=80&w=1000',
    description: 'A revered Hindu pilgrimage site located in the Trikuta Mountains of Jammu and Kashmir, dedicated to Goddess Vaishno, where millions of devotees undertake a spiritual journey to her shrine, believed to fulfill the wishes of the faithful and offer blessings of peace, prosperity, and divine protection.',
    category: 'Spiritual',
    bestTime: 'March to June'
  },
  {
    id: 9,
    name: 'Rishikesh',
    image: 'https://www.whereintheworldistosh.com/wp-content/uploads/2019/05/20190315_153501-1170x550.jpg?q=80&w=1000',
    description: 'Often referred to as the "Yoga Capital of the World," is a serene town nestled in the Himalayan foothills, where spirituality, adventure, and natural beauty converge, offering visitors a tranquil escape for meditation, yoga, rafting, and exploring the sacred banks of the Ganga River.',
    category: 'Spiritual, Adventure',
    bestTime: 'February to June'
  },
  {
    id: 10,
    name: 'Sundarbans',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Tiger_Palm_in_Sundarban.jpg/800px-Tiger_Palm_in_Sundarban.jpg?q=80&w=1000',
    description: 'The largest mangrove forest in the world, home to the Bengal tiger and numerous species of birds. A unique ecosystem of tidal waterways.',
    category: 'Wildlife',
    bestTime: 'October to March'
  },
  {
    id: 11,
    name: 'Mumbai',
    image: 'https://mountainsandmahals.com/wp-content/uploads/2023/03/PXL_20221231_030914950-1536x864.jpg?q=80&w=1000',
    description: "Often called the 'City of Dreams,' is a vibrant, bustling metropolis where towering skyscrapers, historic landmarks, thriving arts, diverse cultures, and the heart of India's entertainment and financial industries come together along the shimmering Arabian Sea.",
    category: 'Heritage',
    bestTime: 'November to February'
  },
  {
    id: 12,
    name: 'Delhi',
    image: 'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_147336/20230908031131_Jo6iV/jpg?q=80&w=1000',
    description: 'The vibrant heart of India, is a captivating blend of ancient history, rich culture, bustling markets, grand monuments, and modern life, offering an unforgettable experience at every corner.',
    category: 'Heritage',
    bestTime: 'October to March'
  }
];

const categories = ['All', 'Heritage', 'Nature', 'Adventure', 'Spiritual', 'Beach', 'Wildlife'];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore India's Finest Destinations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the rich heritage, breathtaking landscapes, and diverse culture of India. 
            From ancient temples to pristine beaches, find your next adventure here.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            <Filter className="text-gray-400" />
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                } hover:bg-yellow-400 hover:text-black transition-all`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{destination.bestTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">{destination.category}</span>
                  </div>
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors">
                    Know More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No destinations found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
