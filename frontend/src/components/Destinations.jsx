import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    name: 'Taj Mahal, Agra',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Symbol of eternal love, one of the Seven Wonders of the World'
  },
  {
    name: 'Shimla',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    description: 'Queen of Hills with scenic mountain views and colonial architecture'
  },
  {
    name: 'Varanasi Ghats',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
    description: 'Ancient spiritual city with mesmerizing Ganga aarti and holy ghats'
  },
  {
    name: 'Kerala Backwaters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Serene waterways, houseboats, and lush green surroundings'
  },
  {
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Pink City with majestic forts, palaces, and vibrant culture'
  }
];

const Destinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const promises = destinations.map((destination) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = destination.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  if (isLoading) {
    return (
      <section id="destinations" className="py-20 bg-white/95 dark:bg-black/95">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Discover Amazing Indian Destinations
          </h2>
          <div className="h-[400px] md:h-[600px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-white/95 dark:bg-black/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Discover Amazing Indian Destinations
        </h2>
        <div 
          className="relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-700 transform ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent hover:from-black/90 hover:via-black/50 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 transform translate-y-8 hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">{destination.name}</h3>
                  <p className="text-base md:text-lg text-white/90">{destination.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 
                     text-black p-3 rounded-full transform hover:scale-110 transition-all duration-300 
                     hover:shadow-lg hover:shadow-yellow-400/50 button-hover"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 
                     text-black p-3 rounded-full transform hover:scale-110 transition-all duration-300 
                     hover:shadow-lg hover:shadow-yellow-400/50 button-hover"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
