import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">About Us</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">How It Works</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Safety</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Contact Us</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">FAQ</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Help Center</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Terms of Service</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Privacy Policy</a>
              <a href="#" className="block hover:text-yellow-400 hover:translate-x-2 transition-all">Cookie Policy</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 hover:scale-125 transition-all">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 hover:scale-125 transition-all">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 hover:scale-125 transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 hover:scale-125 transition-all">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 hover:scale-125 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RoamMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
