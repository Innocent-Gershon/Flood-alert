import { Link } from 'react-router-dom';
import { MessageSquareIcon, RadioIcon, PhoneIcon, UserIcon } from 'lucide-react';
const Homepage = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-16">
  <div className="absolute inset-0 overflow-hidden opacity-20">
    {/* <img src="image.png" alt="Flood scene background" className="w-full h-full object-cover" /> */}
  </div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl">
      <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        Inclusive Real-Time Flood Alert Platform
      </h4>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/dashboard"
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          View Live Alerts
        </Link>
        <Link
          to="/community-reporting"
          className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Report Flooding
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Mission Statement */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                🧭 Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To develop a multi-channel early-warning and real-time
                communication platform that helps communities in flood-prone
                areas of Ghana, such as Accra, Volta Region, and Northern Ghana,
                predict, prepare for, and respond to floods effectively. The
                platform combines real-time weather data, SMS/USSD alerts, radio
                broadcasts, localized response coordination, and
                offline-compatible technologies to ensure accessibility for
                communities with poor or no internet connectivity.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="https://climatepromise.undp.org/sites/default/files/styles/large_2x/public/explainer/What%20are%20early%20warning%20systems%20and%20why%20do%20they%20matter%20for%20climate%20action.jpg?itok=aQ_GrlFE" />
            </div>
          </div>
        </div>
      </section>
      {/* Problem Statement */}
      {/* The Problem We're Solving */}
<section className="py-16 bg-gradient-to-br from-blue-50 to-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center tracking-tight">
      ⚠️ The Problem We're Solving
    </h2>
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-blue-100">
      <p className="text-gray-700 text-lg leading-relaxed">
        Ghana experiences severe flooding every rainy season, especially in areas like Accra, Volta Region, and Northern Ghana. According to the Ghana Meteorological Agency (2023), these floods cause widespread damage to homes, businesses, and infrastructure—often leading to loss of life and property.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        Despite the recurring threat, there is no reliable and inclusive early-warning system that delivers real-time flood alerts and response guidance to vulnerable communities. Many of these areas also suffer from poor or no internet connectivity, making it difficult for residents and authorities to receive timely information and act quickly.
      </p>
      <p className="text-gray-800 font-semibold text-lg">
        This communication gap increases risk and delays life-saving decisions during flood events.
      </p>
    </div>
  </div>
</section>

{/* Why It Matters */}
<section
  className="relative py-20 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1621410210354-d99d1ff9fd79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')", // Ghana flood context
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-70"></div>

  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-tight">
      ❗ Why It Matters
    </h2>

    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 sm:p-10 text-white space-y-6">
      <p className="text-lg leading-relaxed">
        Floods in Ghana are more than natural events—they are emergencies that put lives at risk. Every minute counts, and without fast, inclusive alerts, vulnerable people are left behind.
      </p>

      <div className="border-l-4 border-yellow-400 pl-4">
        <p className="italic text-yellow-100 text-lg">
          “During the last floods in Volta Region, we had no warning... only water rushing through our homes.” 
        </p>
        <p className="text-sm text-yellow-300 mt-1">— Community Member, Ho</p>
      </div>

      <p className="text-lg leading-relaxed">
        Women, children, the elderly, and people with disabilities are often the most affected. GhaFlood ensures they receive alerts in languages they understand—through SMS, USSD, voice, and radio—no internet needed.
      </p>

      <p className="text-lg leading-relaxed">
        Without real-time tools, responders can’t act fast enough. GhaFlood helps save time, coordinate rescue, and protect lives—<span className="font-semibold text-yellow-300">no matter the device, literacy level, or location</span>.
      </p>
    </div>
  </div>
</section>



{/* Our Solution */}
<section className="py-20 bg-gradient-to-b from-gray-100 to-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-14 text-center tracking-tight">
      💡 Our Solution: <span className="text-yellow-500">GhaFlood</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <strong className="text-blue-900">GhaFlood</strong> is an inclusive, real-time flood alert platform tailored for Ghana's vulnerable communities. It bridges the gap between early warnings and timely action using accessible communication methods:
        </p>
        <ul className="space-y-4 mb-6 text-gray-800 text-base">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span>
            <span><strong className="text-blue-900">SMS & USSD Alerts</strong> for users with basic feature phones.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span>
            <span><strong className="text-blue-900">Voice Alerts in Twi & Ewe</strong> — empowering low-literacy users.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span>
            <span><strong className="text-blue-900">Radio Broadcast Integration</strong> to reach rural and offline communities.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span>
            <span><strong className="text-blue-900">Interactive Dashboards</strong> for responders and emergency coordinators.</span>
          </li>
        </ul>
        <p className="text-gray-700 text-lg">
          Built using Agile methodology with local collaboration, GhaFlood ensures that <strong className="text-blue-900">no one is left behind</strong>—regardless of language, literacy, or connectivity.
        </p>
      </div>

      {/* Enhanced Image Card */}
      <div className="relative group transition-transform duration-500 hover:scale-105">
        <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.0&auto=format&fit=crop&w=900&q=80"
            alt="Community receiving flood alerts"
            className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute bottom-4 left-4 bg-blue-900 bg-opacity-80 text-white px-4 py-2 rounded-xl text-sm shadow-lg">
          Empowering Ghana’s most vulnerable
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Multi-Channel Approach */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            Our Multi-Channel Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <MessageSquareIcon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                SMS & USSD Alerts
              </h3>
              <p className="text-gray-600">
                Accessible text-based alerts that work without internet
                connectivity on basic phones.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <RadioIcon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Radio Integration
              </h3>
              <p className="text-gray-600">
                Automated broadcasts through local FM stations in multiple
                languages.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <PhoneIcon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Voice Calls
              </h3>
              <p className="text-gray-600">
                Automated voice messages for those who cannot read or prefer
                verbal communication.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <UserIcon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Community Mobilizers
              </h3>
              <p className="text-gray-600">
                Local volunteers equipped to spread warnings and coordinate
                evacuations.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-12 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Join Our Effort to Save Lives
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a community member, emergency responder, or
            administrator, our platform provides the tools you need to stay
            informed and take action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors">
              View Live Dashboard
            </Link>
            <Link to="/community-reporting" className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors">
              Report Flooding
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default Homepage;