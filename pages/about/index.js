export default function AboutUs() {
  const features = [
    {
      title: "Instant Recharge",
      description:
        "Recharge your mobile, DTH, FASTag, and other services instantly without long waiting times.",
    },
    {
      title: "Multiple Utilities",
      description:
        "Pay electricity, water, gas, broadband, and many more utility bills from a single platform.",
    },
    {
      title: "Secure Payments",
      description:
        "All transactions are protected with advanced security to keep your payments safe and reliable.",
    },
    {
      title: "24/7 Service",
      description:
        "UtilityMitra is available anytime, anywhere so you can make payments whenever needed.",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white text-gray-800">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#0A2710] to-green-700 text-white py-16 md:py-24 px-5 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            About UtilityMitra
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-8">
            UtilityMitra is a modern digital platform that helps users recharge
            and pay essential utility bills quickly, securely, and without any
            hassle.
          </p>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <span className="text-green-700 font-semibold uppercase tracking-wider">
              Who We Are
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
              Simplifying Utility Payments For Everyone
            </h2>

            <p className="mt-6 text-gray-600 leading-8 text-base md:text-lg">
              UtilityMitra brings together multiple utility services under one
              platform, making digital payments easier and more convenient for
              users across India.
            </p>

            <p className="mt-5 text-gray-600 leading-8 text-base md:text-lg">
              Whether you want to recharge your mobile, pay electricity bills,
              DTH recharge, gas bills, broadband payments, or FASTag recharge,
              UtilityMitra provides a smooth and reliable experience from any
              device.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-green-700 hover:bg-green-800 transition px-7 py-3 rounded-full text-white font-medium">
                Get Started
              </button>

              <button className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition px-7 py-3 rounded-full font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
              alt="UtilityMitra"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-16 md:py-24 px-5 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center">
            <span className="text-green-700 font-semibold uppercase tracking-wider">
              Our Features
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Why Choose UtilityMitra?
            </h2>

            <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-8">
              Designed to provide a fast, secure, and user-friendly experience
              for all your everyday utility payments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl transition duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7 text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">

          <span className="text-green-700 font-semibold uppercase tracking-wider">
            Our Mission
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Making Digital Utility Payments Easy & Accessible
          </h2>

          <p className="mt-6 text-gray-600 text-base md:text-lg leading-9">
            Our mission is to empower users with a simple and trusted platform
            where they can complete all their utility recharges and bill
            payments in one place without confusion, delays, or complications.
          </p>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#0A2710] text-white py-16 md:py-24 px-5 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Start Your Hassle-Free Utility Payments Today
          </h2>

          <p className="mt-6 text-gray-200 text-base md:text-lg leading-8">
            Join UtilityMitra and experience secure, fast, and seamless digital
            payments anytime and anywhere.
          </p>

          <button className="mt-8 bg-white text-[#0A2710] hover:bg-gray-100 transition px-8 py-4 rounded-full font-semibold">
            Explore Services
          </button>

        </div>
      </section>

    </div>
  );
}