import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Globe, Info } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Nurpur Fort',
    image: 'https://etvbharatimages.akamaized.net/etvbharat/prod-images/06-09-2023/1200-675-19442355-thumbnail-16x9-krishnajanmashtami.jpg?q=80&w=1000',
    description: 'A historically rich and culturally vibrant town nestled in the foothills of Himachal Pradesh, renowned for its ancient Rajput-era Nurpur Fort, the unique Brij Raj Swami Temple, and its serene surroundings that beautifully blend heritage, spirituality, and scenic charm.',
    category: 'Heritage, Historical, Spiritual',
    bestTime: 'August to November',
    detailedInfo: {
      history: 'Nurpur, located in the Kangra district of Himachal Pradesh, India, is a town rich in history and heritage. Originally known as Dhameri, it was renamed Nurpur in the early 17th century by Raja Basu in honor of Empress Nur Jahan, the wife of Mughal Emperor Jahangir. Nurpur was once the seat of the powerful Pathania Rajput dynasty, whose rulers built the majestic Nurpur Fort — a fine example of medieval Indian architecture blending Rajput and Mughal styles. The town flourished as a center of art, culture, and trade during its peak, with its strategic location along trade routes enhancing its importance. Though much of the fort now lies in ruins, Nurpur’s glorious past continues to echo through its ancient temples, fortifications, and rich traditions, making it a place of deep historical significance',
      architecture: "Nurpur Fort, located in Himachal Pradesh, is primarily built using stone and brick, showcasing a blend of traditional Indian and Mughal architectural styles. The fort's walls are made of stone masonry, with lime mortar used for binding, ensuring durability against the elements. The structure features arched gateways, bastions, and watchtowers designed for defense, while also incorporating wooden elements in the windows and doors for aesthetic appeal. The fort's design includes both Islamic and Rajput influences, evident in the intricately carved Jharokhas (overhanging enclosed balcony windows). The materials used, along with the craftsmanship, reflect the fort's rich history and strategic importance.",
      visitingHours: 'Sunrise to Sunset',
      location: 'Nurpur(Jassur), Himachal Pradesh',
      howToReach: 'The nearest airport to Nurpur Fort is Gaggal Airport (Kangra Airport), located approximately 60 km away. From the airport, you can hire a taxi or take a bus to reach the fort.',
      tips: [
        'Visit early morning to enjoy the serene atmosphere and avoid crowds.',
        'Explore the Brij Raj Swami Temple for a spiritual experience along with the fort.',
        'Carry water and wear comfortable walking shoes.',
        'The fort and temple offer amazing sunset views, so plan your visit accordingly.'
      ]
    }
  },
  {
    id: 2,
    name: 'Varanasi Ghats',
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1000',
    description: 'The spiritual capital of India, famous for its ancient temples, holy Ganges River, and vibrant cultural traditions that date back thousands of years.',
    category: 'Spiritual',
    bestTime: 'October to March',
    detailedInfo: {
      history: 'One of the oldest continuously inhabited cities in the world, Varanasi has been a cultural and religious center for thousands of years. The city finds mention in ancient Hindu texts and was a contemporary to ancient civilizations like Babylon.',
      significance: 'Considered the spiritual capital of India, it is the holiest of the seven sacred cities in Hinduism. The city is known for its ghats, ancient temples, and cultural practices.',
      mainGhats: [
        'Dashashwamedh Ghat - Famous for its daily Ganga Aarti ceremony',
        'Assi Ghat - Popular among students and locals',
        'Manikarnika Ghat - The main cremation ghat',
        'Kedar Ghat - Known for its Kedarnath Temple'
      ],
      visitingHours: 'Ghats are accessible 24/7, Best time for Ganga Aarti: 6:45 PM - 7:45 PM',
      location: 'Varanasi, Uttar Pradesh, India',
      howToReach: 'Varanasi has its own international airport and is well-connected by trains and buses to major Indian cities.',
      tips: [
        'Watch sunrise boat rides for a magical experience',
        'Attend the evening Ganga Aarti at Dashashwamedh Ghat',
        'Explore the narrow lanes (galis) of the old city',
        'Try the famous Banarasi Paan and local cuisine'
      ]
    }
  },
  {
    id: 3,
    name: 'Ram Mandir, Ayodhya',
    image: 'https://images.nativeplanet.com/webp/img/2024/01/untitleddesign-2024-01-22t175318-542-1706013614.jpg?q=80&w=1000',
    description: 'Is a magnificent temple dedicated to Lord Ram, symbolizing faith, devotion, and cultural heritage, built with intricate architecture and standing as a timeless spiritual beacon for millions of devotees across the world.',
    category: 'Spiritual and Historic',
    bestTime: 'October to March',
    detailedInfo: {
      overview: "The Ayodhya Ram Mandir is a grand temple dedicated to Lord Ram, located in the sacred city of Ayodhya, Uttar Pradesh. Built with stunning traditional architecture, it reflects the deep-rooted spiritual and cultural significance of Hinduism. The temple stands as a symbol of devotion, unity, and India's rich heritage, attracting millions of pilgrims and visitors from around the world.",
      bestLocations: [
        'Kanak Bhawan – Sacred palace gifted to Goddess Sita.',
        'Saryu River Ghats – Serene riverbanks for holy dips and aarti ceremonies.',
        'Hanuman Garhi – Ancient temple of Lord Hanuman with panoramic views.',
        'Treta Ke Thakur – Temple marking Lord Ram’s Ashwamedha Yajna site.'
      ],
      activities: [
        'Shopping for religious souvenirs and handicrafts',
        'Local sweets and cuisine tasting (like peda and kachori)',
        'Aarti and bhajan participation',
        'Heritage walk through Ram Janmabhoomi complex',
        'Temple darshan and prayer ceremonies'
      ],
      location: 'Ayodhya, Uttar Pradesh',
      howToReach: 'The nearest airport is Maharishi Valmiki International Airport, Ayodhya, located about 15 km from the temple; alternatively, you can also use Lucknow Airport (around 135 km away) and hire a taxi or take a bus to Ayodhya.',
      tips: [
        'Capture the best photos of Ram Mandir during sunrise and evening lighting',
        'Visit nearby temples and ghats early morning for a serene experience',
        'Visit local villages and interact with residents',
        'Dress modestly and carry a scarf or dupatta for temple visits'
      ]
    }
  },
  {
    id: 4,
    name: 'Jaipur City Palace',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000',
    description: 'The magnificent city palace complex showcases Rajasthani and Mughal architecture, housing museums, courtyards, and gardens in the Pink City.',
    category: 'Heritage',
    bestTime: 'October to March',
    detailedInfo: {
      history: 'Built between 1729 and 1732 by Sawai Jai Singh II, the palace was once the seat of the Maharaja of Jaipur. The architecture reflects the fusion of Rajput, Mughal, and European styles.',
      architecture: 'The palace complex includes several buildings, courtyards, galleries, and gardens. Notable structures include Chandra Mahal, Mubarak Mahal, and various ornate gates representing different seasons.',
      significance: 'A perfect example of Rajasthani royal architecture, the palace continues to be the residence of the royal family while also housing museums showcasing royal artifacts.',
      attractions: [
        'Chandra Mahal - Seven-story palace with stunning views',
        'Mubarak Mahal - Museum displaying royal costumes',
        'Diwan-i-Khas - Hall of private audience',
        'Diwan-i-Aam - Hall of public audience'
      ],
      visitingHours: '9:30 AM to 5:00 PM daily',
      location: 'Jaipur, Rajasthan, India',
      howToReach: 'Located in central Jaipur, accessible by local transport. Jaipur has an international airport and is well-connected by train and road.',
      tips: [
        'Visit early morning to avoid crowds',
        'Hire a guide to understand the historical significance',
        'Combined tickets available for other monuments',
        'Dress modestly and carry water'
      ]
    }
  },
  {
    id: 5,
    name: 'Ladakh',
    image: 'https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg?q=80&w=1000',
    description: 'A high-altitude desert known for its stunning landscapes, Buddhist monasteries, and adventure activities like trekking and mountain biking.',
    category: 'Adventure',
    bestTime: 'June to September',
    detailedInfo: {
      overview: 'Often called "Little Tibet" or "Land of High Passes", Ladakh is known for its remote mountain beauty, Buddhist culture, and pristine landscapes.',
      geography: 'Situated at altitudes ranging from 9,000 to 25,170 feet, Ladakh is a high-altitude desert with dramatic landscapes including mountains, valleys, and lakes.',
      culture: 'Strong Buddhist influence with ancient monasteries, traditional festivals, and unique customs. The region also has a rich Tibetan cultural heritage.',
      attractions: [
        'Pangong Lake - Famous high-altitude salt water lake',
        'Leh Palace - Nine-story palace overlooking Leh',
        'Nubra Valley - Desert valley with sand dunes',
        'Hemis Monastery - Largest Buddhist monastery in Ladakh'
      ],
      activities: [
        'River rafting in Zanskar River',
        'Trekking various routes',
        'Mountain biking',
        'Monastery visits',
        'Camping under stars',
        'Photography tours'
      ],
      location: 'Union Territory of Ladakh, India',
      howToReach: 'Fly to Leh Airport or drive from Manali/Srinagar (seasonal). Acclimatization is necessary due to high altitude.',
      tips: [
        'Acclimatize properly to avoid altitude sickness',
        'Best photography during early morning and sunset',
        'Carry warm clothes even in summer',
        'Respect local customs and monasteries',
        'Book accommodations in advance during peak season'
      ]
    }
  },
  {
    id: 6,
    name: 'Goa Beaches',
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1000',
    description: 'Famous for its pristine beaches, vibrant nightlife, Portuguese architecture, and water sports. Perfect for both relaxation and adventure.',
    category: 'Beach',
    bestTime: 'November to February',
    detailedInfo: {
      overview: 'Goa offers a perfect blend of Indian and Portuguese cultures, with beautiful beaches, historic architecture, vibrant nightlife, and delicious cuisine.',
      beaches: [
        'Calangute - The Queen of Beaches',
        'Baga - Famous for nightlife and water sports',
        'Palolem - Scenic south Goa beach',
        'Anjuna - Known for its flea market',
        'Vagator - Beautiful cliffside beach'
      ],
      heritage: 'Rich Portuguese heritage visible in churches, forts, and architecture. Notable sites include Basilica of Bom Jesus and Se Cathedral.',
      activities: [
        'Water sports (parasailing, jet skiing)',
        'Beach shack dining',
        'Old Goa church visits',
        'Spice plantation tours',
        'Sunset river cruises',
        'Flea market shopping'
      ],
      cuisine: 'Famous for seafood, vindaloo, xacuti, bebinca, and feni. Beach shacks offer fresh seafood and local delicacies.',
      location: 'Goa, India',
      howToReach: 'Dabolim Airport has connections to major cities. Well-connected by train and road network.',
      tips: [
        'Book accommodations in advance during peak season',
        'Rent a scooter for easy transportation',
        'Try local Goan cuisine',
        'Visit during off-season for better rates',
        'Respect beach safety guidelines'
      ]
    }
  },
  {
    id: 7,
    name: 'Shri Durgiana Mandir',
    image: 'https://durgianamandir.in/wp-content/uploads/2023/08/bada-hanuman-mandir-e1692004946444.webp?q=80&w=1000',
    description: "A stunning Hindu shrine dedicated to Goddess Durga, renowned for its serene spiritual ambiance, beautiful architecture resembling the Golden Temple, and its deep cultural significance in the heart of Punjab.",
    category: 'Spiritual',
    bestTime: 'October and March',
    detailedInfo: {
      overview: 'Shri Durgiana Mandir, also known as the Silver Temple, is a revered Hindu temple located in the heart of Amritsar, dedicated primarily to Goddess Durga. Reflecting deep roots in Sanatan Dharma, the temple complex also houses sacred shrines of Lord Hanuman and other deities, offering a spiritually rich experience for devotees. The temple is not only a center of worship but also upholds traditional values through its well-maintained Gaushala (cow shelter), where cows are cared for with devotion. With its stunning architecture resembling the Golden Temple and its deep cultural significance, Shri Durgiana Mandir stands as a symbol of faith, service, and Hindu tradition in the vibrant city of Amritsar.',
          location: 'Hathi Gate, Amritsar, Punjab',
      howToReach: ["The nearest airport is Sri Guru Ram Dass Ji International Airport, approximately 11–13 km from the temple. You can hire a taxi or use ride-sharing services like Ola or Uber to reach the temple. Amritsar Junction Railway Station is about 700 meters from the temple. It is a short walk or a quick auto-rickshaw ride to the temple.",
      ],

      tips: [
        'Visit early in the morning or evening for a peaceful experience',
        'Avoid carrying large bags or valuables',
        'Carry a hat or scarf to protect from the sun',
        'Keep your camera ready for beautiful temple and lake views',
        'Participate in the evening aarti for a truly spiritual experience',
      ]
    }
  },
  {
    id: 8,
    name: 'Mata Vaishno Devi',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Mata_vaishno_devi_pindi_photo.jpg?q=80&w=1000',
    description: 'A revered Hindu pilgrimage site located in the Trikuta Mountains of Jammu and Kashmir, dedicated to Goddess Vaishno, where millions of devotees undertake a spiritual journey to her shrine, believed to fulfill the wishes of the faithful and offer blessings of peace, prosperity, and divine protection.',
    category: 'Spiritual',
    bestTime: 'March to June',
    detailedInfo: {
      history: "Mata Vaishno Devi Temple, nestled in the Trikuta Mountains of Katra, Jammu and Kashmir, is one of the most revered pilgrimage sites in India. Dedicated to Goddess Vaishno Devi, it attracts millions of devotees annually who undertake a sacred journey to seek her blessings. The temple's serene surroundings and spiritual significance make it a must-visit destination for those seeking peace, devotion, and divine grace. The trek to the temple, amidst scenic views, adds to the spiritual experience, making it a memorable pilgrimage for all.",
      mainAttractions: [
        'Virupaksha Temple - Still active temple from the 7th century',
        'Vittala Temple - Famous for its stone chariot and musical pillars',
        'Hampi Bazaar - Ancient market street',
        'Royal Enclosure - Contains palace ruins and ceremonial structures',
        'Lotus Mahal - Beautiful Indo-Islamic architecture'
      ],
      activities: [
        'Trekking to the Vaishno Devi shrine',
        'Spiritual darshan and participation in aarti',
        'Shopping for religious souvenirs at Katra market',
        'Scenic photography along the trek route',
        'Experiencing local cuisine'
      ],
      location: 'Katra, Jammu & Kashmir',
      howToReach: 'The nearest airport is Jammu Airport (Jammu is around 50 km from Katra). From there, you can take a taxi or bus to reach Katra.',
      tips: [
        'Start your journey early to avoid long queues and heat',
        'Wear comfortable, sturdy shoes for the uphill trek',
        'Be prepared for a physically demanding trek, but enjoy the scenic views along the way',
        'Plan your visit for 2-3 days to fully explore the surroundings',
        'Respect the local customs and traditions while at the temple'
      ]
    }
  },
  {
    id: 9,
    name: 'Rishikesh',
    image: 'https://thetravelboat.com/wp-content/uploads/2022/12/camping-banner.jpg?q=80&w=1000',
    description: 'Often referred to as the "Yoga Capital of the World," is a serene town nestled in the Himalayan foothills, where spirituality, adventure, and natural beauty converge, offering visitors a tranquil escape for meditation, yoga, rafting, and exploring the sacred banks of the Ganga River.',
    category: 'Spiritual, Adventure',
    bestTime: 'February to June',
    detailedInfo: {
      overview: 'Nestled in the foothills of the Himalayas along the banks of the sacred Ganga River, Rishikesh is a vibrant spiritual town known as the "Yoga Capital of the World." Famous for its ancient temples, serene ashrams, thrilling adventure activities, and peaceful ghats, it offers a perfect blend of spirituality, nature, and adventure. Whether you seek meditation by the river, adrenaline-pumping river rafting, or a stroll across the iconic Laxman Jhula, Rishikesh welcomes every traveler with its calming energy and timeless charm.',
      location: 'Uttarakhand, India',
      howToReach: 'The nearest airport is Jolly Grant Airport (Dehradun), about 20 km from Rishikesh; taxis are easily available from the airport.',
      tips: [
        'Carry light woolens for cool evenings',
        'Book yoga and rafting sessions in advance',
        'Wear comfortable footwear for temple visits and treks',
        'Sunrise by the Ganges is perfect for photography',
        'Photography in the evening is recommended for beautiful lighting and vibrant atmosphere.'
      ]
    }
  },
  {
    id: 10,
    name: 'Sundarbans',
    image: 'https://images.unsplash.com/photo-1623472831724-d431c9bd79e7?q=80&w=1000',
    description: 'The largest mangrove forest in the world, home to the Bengal tiger and numerous species of birds. A unique ecosystem of tidal waterways.',
    category: 'Wildlife',
    bestTime: 'October to March',
    detailedInfo: {
      overview: 'UNESCO World Heritage site and largest mangrove forest globally. A complex network of tidal waterways, mudflats, and small islands covered with mangrove forests.',
      ecosystem: {
        mangroves: 'Over 60 species of mangroves, creating a unique habitat',
        wildlife: [
          'Royal Bengal Tigers',
          'Estuarine Crocodiles',
          'River Dolphins',
          'Various deer species',
          'Over 250 bird species'
        ]
      },
      activities: [
        'Boat safaris',
        'Bird watching',
        'Village visits',
        'Mangrove walks',
        'Photography tours'
      ],
      conservation: 'Critical for coastal protection and biodiversity conservation. Faces challenges from climate change and human activities.',
      location: 'West Bengal, India',
      howToReach: 'Access from Kolkata via Canning or Namkhana. Nearest airport is Kolkata.',
      tips: [
        'Book boat safaris through authorized operators',
        'Carry binoculars for wildlife spotting',
        'Follow guide instructions strictly',
        'Best tiger sighting in winter',
        'Carry insect repellent'
      ]
    }
  },
  {
    id: 11,
    name: 'Mumbai',
    image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2023/5/CST-railway-station_0_1200.jpg?q=80&w=1000',
    description: "Often called the 'City of Dreams,' is a vibrant, bustling metropolis where towering skyscrapers, historic landmarks, thriving arts, diverse cultures, and the heart of India's entertainment and financial industries come together along the shimmering Arabian Sea.",
    category: 'Heritage',
    bestTime: 'November to February',
    detailedInfo: {
      history: "Mumbai, often called the City of Dreams, is India's financial capital and a global hub for commerce, fashion, and entertainment. Originally a cluster of seven islands inhabited by fishing communities, it was developed into a major port city by the Portuguese and later the British, who called it Bombay. In 1995, it officially reclaimed its original name, Mumbai, after the local goddess Mumbadevi. Today, Mumbai is recognized worldwide for its vibrant culture, historic landmarks like the Gateway of India, and as the heart of the Bollywood film industry.",
      templeGroups: [
        'Western Group - Most important and best preserved temples',
        'Eastern Group - Mainly Jain temples',
        'Southern Group - Smaller but significant temples'
      ],
      activities: [
        'Gateway of India sightseeing and ferry rides',
        'Marine Drive sunset photography',
        'Dharavi slum tours and cultural walks',
        'Bollywood studio tours and live shows',
        'Street food tours at Chowpatty and Mohammad Ali Road'
      ],
      location: 'Maharashtra, India',
      howToReach: "Mumbai's Chhatrapati Shivaji Maharaj International Airport (BOM) is well-connected to major cities across India and the world with frequent flights.",
      tips: [
        'Hire a local guide for authentic city tours',
        'Explore major attractions early morning to avoid crowds',
        'Attend cultural shows and evening events for a vibrant experience',
        'Reserve at least two to three days to cover key spots comfortably',
        'Photography is allowed at most places but restricted in some heritage sites'
      ]
    }
  },
  {
    id: 12,
    name: 'Delhi',
    image: 'https://s7ap1.scene7.com/is/image/incredibleindia/red-fort-delhi1-attr-hero?qlt=82&ts=1727352314555?q=80&w=1000',
    description: 'The vibrant heart of India, is a captivating blend of ancient history, rich culture, bustling markets, grand monuments, and modern life, offering an unforgettable experience at every corner.',
    category: 'Heritage',
    bestTime: 'October to March',
    detailedInfo: {
      overview: "Delhi, the vibrant capital of India, is a city that beautifully blends rich historical heritage with modern urban life. Known for its diverse culture, bustling markets, and iconic landmarks like the Red Fort, Qutub Minar, and India Gate, Delhi offers an immersive experience for travelers. It serves as the political and cultural hub of India, with a mix of ancient monuments, contemporary architecture, and lively street food scenes. The city’s dynamic atmosphere is reflected in its neighborhoods, each with its unique charm, from the chaos of Chandni Chowk to the elegance of Lutyens' Delhi. Whether you're a history enthusiast, a food lover, or someone looking to experience the heart of India, Delhi promises an unforgettable journey.",
      popularIslands: [
        'Havelock (Swaraj) - Famous for Radhanagar Beach',
        'Neil Island - Known for natural coral bridges',
        'Port Blair - Capital with historical sites',
        'Ross Island - Colonial ruins and history'
      ],
      activities: [
        'Heritage Walks',
        'Street Food Tours',
        'Shopping at Local Markets',
        'Yoga and Meditation Retreats',
        'Delhi’s Nightlife Exploration',
        'Boating in Yamuna River'
      ],
      location: 'Andaman & Nicobar Islands, India',
      howToReach: 'Indira Gandhi International Airport (IGI), located approximately 16 km from the city center, is one of the busiest airports in India. It caters to both international and domestic flights and is well-connected to major cities around the world.',
      tips: [
        'Dress comfortably for the weather',
        'Keep a power bank for your devices',
        'Keep a map or use offline navigation apps',
        'Use reliable transportation apps (e.g., Ola, Uber)',
        'Bargain at local markets'
      ]
    }
  }
];

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find((d) => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Destination not found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {destination.name}
            </h1>

            <div className="flex items-center mb-6 text-sm text-gray-600 dark:text-gray-400 space-x-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{destination.category}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Best Time: {destination.bestTime}</span>
              </div>
              {destination.detailedInfo?.location && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{destination.detailedInfo.location}</span>
                </div>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                {destination.description}
              </p>

              {destination.detailedInfo && (
                <div className="space-y-8">
                  {destination.detailedInfo.history && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3 flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        Recognition
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.history}
                      </p>
                    </div>
                  )}

                  {destination.detailedInfo.architecture && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Architecture</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.architecture}
                      </p>
                    </div>
                  )}

                  {destination.detailedInfo.significance && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Significance</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.significance}
                      </p>
                    </div>
                  )}

                  {destination.detailedInfo.overview && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Overview</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.overview}
                      </p>
                    </div>
                  )}

                  {destination.detailedInfo.ecosystem && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Ecosystem</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.ecosystem}
                      </p>
                    </div>
                  )}

                  {destination.detailedInfo.mainGhats && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Main Ghats</h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.mainGhats.map((ghat, index) => (
                          <li key={index}>{ghat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {destination.detailedInfo.bestLocations && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Best Locations</h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.bestLocations.map((location, index) => (
                          <li key={index}>{location}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {destination.detailedInfo.activities && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Activities</h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3">Visitor Information</h2>
                    {destination.detailedInfo.visitingHours && (
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Visiting Hours</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {destination.detailedInfo.visitingHours}
                        </p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">How to Reach</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.howToReach}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Travel Tips</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        {destination.detailedInfo.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
