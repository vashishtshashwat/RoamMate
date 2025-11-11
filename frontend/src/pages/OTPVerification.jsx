import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import axios from '../config/axiosConfig';
import { toast } from "react-toastify";

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;

  useEffect(() => {
    // If no user data is provided, redirect to login
    if (!userData) {
      navigate('/login');
      toast.error("Session expired. Please login again.");
    }
  }, [userData, navigate]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle input change for OTP fields
  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (e, index) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      
      // Focus the last input
      const lastInput = document.getElementById('otp-5');
      if (lastInput) lastInput.focus();
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpString = otp.join('');
    
    // Check if OTP is complete
    if (otpString.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }
    
    setLoading(true);
    
    try {
      // Call API to verify OTP
      await axios.post(`/api/otp/verify/${userData._id}`, { otp: otpString });
      
      toast.success("Email verified successfully!");
      
      // Redirect to login page
      navigate('/login', { 
        state: { 
          verificationSuccess: true 
        } 
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "OTP verification failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    if (countdown > 0) return;
    
    setResendLoading(true);
    
    try {
      // Call API to resend OTP
      await axios.post(`/api/otp/send/${userData._id}`);
      
      toast.success("A new OTP has been sent to your email");
      setCountdown(60); // Start 60-second countdown
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to resend OTP");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyOtp();
    } catch (error) {
      toast.error('Invalid OTP. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-yellow-100 dark:border-gray-700">
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-2 group">
            <Compass className="w-8 h-8 text-yellow-400 group-hover:rotate-[360deg] transition-transform duration-500" />
            <span className="text-2xl font-bold">
              Roam<span className="text-yellow-400">Mate</span>
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We've sent a 6-digit OTP to {userData?.email}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-4">
              Enter the 6-digit code
            </label>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 dark:border-gray-700 
                           rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 
                           focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={handleVerifyOTP}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                       shadow-lg text-sm font-medium text-black bg-yellow-400
                       hover:bg-yellow-500 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?{' '}
              <button
                onClick={resendOtp}
                disabled={countdown > 0 || resendLoading}
                className={`font-medium ${
                  countdown > 0 || resendLoading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-yellow-400 hover:text-yellow-500'
                }`}
              >
                {resendLoading
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend OTP"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
