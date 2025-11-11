import { Search, Users, MessageCircle, Plane } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Destinations',
    description: 'Find your dream destination from our extensive list',
  },
  {
    icon: Users,
    title: 'Find Travel Partners',
    description: 'Connect with travelers heading to the same place',
  },
  {
    icon: MessageCircle,
    title: 'Chat & Connect',
    description: 'Get to know your potential travel buddy',
  },
  {
    icon: Plane,
    title: 'Travel Together',
    description: 'Start your adventure with your new friend',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent dark:from-yellow-400/10"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 slide-in">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-500 group card-hover relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 
                              rounded-full flex items-center justify-center mb-4 
                              group-hover:scale-110 transition-transform duration-300
                              group-hover:rotate-6">
                  <step.icon className="w-8 h-8 text-black transform group-hover:scale-110 
                                     transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-500 
                             transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 
                             dark:group-hover:text-gray-100 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
