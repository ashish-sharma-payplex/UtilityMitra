import React from 'react';

const DthRecharge = () => {
  // Top nav items data with raw SVGs
  const navItems = [
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ), 
      label: "Prepaid/Postpaid" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
          <line x1="9" y1="18" x2="15" y2="18"></line>
          <line x1="10" y1="22" x2="14" y2="22"></line>
        </svg>
      ), 
      label: "Electricity" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
      ), 
      label: "DTH", 
      active: true 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M10 4v16"></path>
          <path d="M14 4v16"></path>
        </svg>
      ), 
      label: "Metro" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ), 
      label: "Broadband/Landline" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
        </svg>
      ), 
      label: "Education" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ), 
      label: "Pay Loan" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      ), 
      label: "Invest in Stocks" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ), 
      label: "Book a Cylinder" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ), 
      label: "Paytm First" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ), 
      label: "Insurance/LIC Premium" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      ), 
      label: "More" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-sans antialiased flex flex-col">
      {/* Top Blue Header Banner */}
      <div className="bg-[#002e6e] text-white pt-8 pb-32 px-4 md:px-8 lg:px-16 w-full">
        {/* Horizontal Navigation Menu for icons */}
        <div className="max-w-7xl mx-auto flex items-center justify-start gap-4 md:gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-between text-center min-w-[75px] cursor-pointer group shrink-0"
            >
              <div className={`p-2 transition-colors ${item.active ? 'text-[#00baf2]' : 'text-white/80 group-hover:text-white'}`}>
                {item.icon}
              </div>
              <span className={`text-[11px] font-medium mt-1 whitespace-nowrap px-1 pb-1 transition-all
                ${item.active ? 'border-b-2 border-[#00baf2] text-white' : 'text-white/70 group-hover:text-white'}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area Container - Centered and Pulled Upwards */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 -mt-24 md:-mt-28 pb-12 flex-1 flex items-start justify-center w-full z-10">
        {/* Recharge Main Card Block */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 w-full max-w-md transition-all">
          <h2 className="text-gray-900 text-lg md:text-xl font-bold mb-8">
            Recharge DTH or TV
          </h2>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {/* Custom Input Wrapper with Floating Label Effect */}
            <div className="relative border-b border-gray-300 focus-within:border-[#00baf2] transition-colors py-1">
              <input 
                type="text" 
                id="dth-operator"
                placeholder=" " 
                className="block w-full bg-transparent border-none px-0 pt-4 pb-1 text-gray-800 focus:outline-none focus:ring-0 text-base peer placeholder-transparent"
              />
              <label 
                htmlFor="dth-operator"
                className="absolute left-0 top-1 text-gray-400 text-sm transition-all duration-200 
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-4 
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#00baf2]"
              >
                DTH Operator
              </label>
            </div>

            {/* Proceed Button */}
            <button 
              type="submit" 
              className="w-full bg-[#00baf2] hover:bg-[#009ed1] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-center text-base active:scale-[0.99]"
            >
              Proceed to Recharge
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DthRecharge;