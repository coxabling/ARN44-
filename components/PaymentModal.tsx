
import React, { useState } from 'react';
import { X, Heart, Music, MessageSquare, Globe } from 'lucide-react';
import { Station, PaymentType } from '../types';
import { playPaymentAlert } from '../services/geminiService';

interface PaymentModalProps {
  station: Station;
  onClose: () => void;
  type: PaymentType;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ station, onClose, type }) => {
  const [amount, setAmount] = useState('5');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [song, setSong] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment delay
    setTimeout(async () => {
      // Trigger AI Alert
      await playPaymentAlert(name || 'Anonymous', message || (type === 'request' ? `requested ${song}` : 'Thank you for the broadcast!'));
      setIsProcessing(false);
      onClose();
      alert("Payment Successful! Your message has been sent to the DJ.");
    }, 1500);
  };

  const getIcon = () => {
    switch(type) {
      case 'tip': return <Heart className="text-red-500" />;
      case 'request': return <Music className="text-blue-500" />;
      case 'shoutout': return <MessageSquare className="text-orange-500" />;
      case 'subscription': return <Globe className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl african-pattern transition-colors">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {getIcon()}
              <h3 className="text-xl font-bold capitalize dark:text-white">{type}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-full dark:text-gray-400">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Amount (USD)</label>
              <div className="grid grid-cols-4 gap-2">
                {['2', '5', '10', '25'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2 rounded-xl border-2 transition-all ${
                      amount === val ? 'bg-[#E5A443] border-[#E5A443] text-white' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-[#2A2A2A] dark:text-white focus:ring-2 focus:ring-[#E5A443] outline-none"
                placeholder="Name or Alias"
                required
              />
            </div>

            {type === 'request' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Song Request</label>
                <input
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-[#2A2A2A] dark:text-white focus:ring-2 focus:ring-[#E5A443] outline-none"
                  placeholder="Artist - Song Name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-[#2A2A2A] dark:text-white focus:ring-2 focus:ring-[#E5A443] outline-none"
                placeholder="Say something to the DJ..."
                rows={3}
              />
            </div>

            <button
              disabled={isProcessing}
              type="submit"
              className="w-full py-4 bg-[#2C5F2D] text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Processing...' : `Pay $${amount} via AirPay44`}
            </button>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600">Powered by AirPay44 - Secure African Payments</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
