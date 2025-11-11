import { MapPin, Users, Calendar, Shield } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Choose Your Destination',
    description: 'Browse through our curated list of amazing destinations across India. From the majestic Himalayas to serene beaches, find your perfect getaway.'
  },
  {
    icon: Users,
    title: 'Connect with Travel Buddies',
    description: 'Find like-minded travelers who share your interests and travel dates. Make new friends and create unforgettable memories together.'
  },
  {
    icon: Calendar,
    title: 'Plan Your Trip',
    description: 'Use our smart planning tools to create the perfect itinerary. Get recommendations for accommodations, activities, and local experiences.'
  },
  {
    icon: Shield,
    title: 'Travel with Confidence',
    description: 'Enjoy your journey knowing that all our partners and experiences are verified. We prioritize your safety and comfort throughout the trip.'
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How RoamMate Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your journey to amazing travel experiences starts here. Follow these simple steps to begin your adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center 
                             group-hover:bg-yellow-400 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-yellow-400 group-hover:text-black transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose RoamMate?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're more than just a travel platform. We're your companion in creating memorable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Verified Experiences</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our experiences and accommodations are personally verified to ensure quality and safety.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get insights from local experts who know the destination inside out.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our dedicated support team is always ready to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of travelers who have already discovered amazing destinations with RoamMate.
          </p>
        </div>
      </div>
    </div>
  );
}
