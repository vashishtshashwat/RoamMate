import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Users, LayoutDashboard } from 'lucide-react';

const travelScenes = [
  {
    url: 'https://images.pexels.com/photos/574313/pexels-photo-574313.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90',
    title: 'Mountain Serenity',
    description: 'Majestic peaks of the Himalayas'
  },
  {
    url: 'https://images.pexels.com/photos/9605458/pexels-photo-9605458.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90',
    title: 'Temple Tranquility',
    description: 'Ancient wisdom in stone'
  },
  {
    url: 'https://images.pexels.com/photos/12064459/pexels-photo-12064459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90',
    title: 'Riverside Rituals',
    description: 'Sacred moments by the Ganges'
  },
  {
    url: 'https://images.pexels.com/photos/19149588/pexels-photo-19149588/free-photo-of-two-men-riding-elephants.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90',
    title: 'Wildlife Adventure',
    description: 'Experience royal traditions'
  },
  {
    url: 'https://images.pexels.com/photos/26110235/pexels-photo-26110235/free-photo-of-man-on-boat-on-dal-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90',
    title: 'Kashmir Paradise',
    description: 'Serene waters of Dal Lake'
  }
];

const checkProfileData = async (userId) => {
  try {
    const response = await axios.get(`/api/user/profile/${userId}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking profile data:', error);
    return false;
  }
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const goToSlide = useCallback((index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        goToSlide((currentSlide + 1) % travelScenes.length);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide, goToSlide, isTransitioning]);

  const handleStartClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    console.log('Checking profile for _id:', user._id);
    const hasProfileData = await checkProfileData(user._id);
    console.log('Profile exists:', hasProfileData);
    navigate(hasProfileData ? '/userdashboard' : '/profileform');
  };

  return (
    <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="hero-background">
        {travelScenes.map((scene, index) => (
          <div
            key={index}
            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
          >
            <img
              src={scene.url}
              alt={scene.title}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Overlay with dynamic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

      {/* Content */}
      <div className="hero-content container mx-auto px-4 text-center text-white relative z-10">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 slide-in drop-shadow-lg">
  Connect & Explore <span className="text-yellow-400">Together</span>
  
</h1>
<p className="text-xl md:text-2xl mb-8 slide-in opacity-90 delay-200 font-medium drop-shadow-lg">
  <span className="text-yellow-300">Plan</span> your perfect trip • <span className="text-yellow-300">Meet</span> fellow travelers • <span className="text-yellow-300">Share</span> unforgettable journeys
</p>
          <div className="mt-8 flex justify-center gap-6">
            {!user ? (
              <button
                onClick={handleStartClick}
                className="px-16 py-6 bg-yellow-400 text-black rounded-full text-2xl font-semibold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-yellow-400/50 active:scale-95 flex items-center justify-center gap-3"
              >
                Let's Explore
                <ArrowRight className="w-6 h-6" />
              </button>
            ) : (
              <>
                <button
                  onClick={async () => {
                    const hasProfileData = await checkProfileData(user._id);
                    navigate(hasProfileData ? '/explore' : '/profileform');
                  }}
                  className="px-6 md:px-8 py-4 md:py-6 bg-yellow-400 text-black rounded-full text-lg md:text-xl font-semibold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-yellow-400/50 active:scale-95 flex items-center justify-center gap-2 md:gap-3 group"
                >
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                  Explore People
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 hidden group-hover:block" />
                </button>
                <button
                  onClick={async () => {
                    const hasProfileData = await checkProfileData(user._id);
                    navigate(hasProfileData ? '/userdashboard' : '/profileform');
                  }}
                  className="px-6 md:px-8 py-4 md:py-6 bg-yellow-400 text-black rounded-full text-lg md:text-xl font-semibold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-yellow-400/50 active:scale-95 flex items-center justify-center gap-2 md:gap-3 group"
                >
                  <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 hidden group-hover:block" />
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Navigation Dots */}
      <div className="slide-dots">
        {travelScenes.map((_, index) => (
          <button
            key={index}
            className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
