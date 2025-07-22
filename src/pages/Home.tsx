import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, MessageSquareIcon, RadioIcon, PhoneIcon, UserIcon } from 'lucide-react';
const Home = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-16">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img src="https://images.unsplash.com/photo-1631103182527-7c130e58d104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Inclusive Real-Time Flood Alert Platform
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Protecting vulnerable communities in Ghana through timely alerts,
              inclusive communication, and coordinated emergency response.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                View Live Alerts
              </Link>
              <Link to="/community-reporting" className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors">
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
              <img src="https://images.unsplash.com/photo-1580974852861-c381510bc98e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Communities in Ghana" className="rounded-lg shadow-lg w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Problem Statement */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            ⚠️ The Problem We're Solving
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Ghana experiences severe flooding every rainy season, especially
              in areas like Accra, Volta Region, and Northern Ghana. According
              to the Ghana Meteorological Agency (2023), these floods cause
              widespread damage to homes, businesses, and infrastructure, often
              leading to loss of life and property.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Despite the recurring threat, there is no reliable and inclusive
              early-warning system that delivers real-time flood alerts and
              response guidance to vulnerable communities. Many of these areas
              also suffer from poor or no internet connectivity, making it
              difficult for residents and authorities to receive timely
              information and act quickly.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              This communication gap increases risk and delays life-saving
              decisions during flood events.
            </p>
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
export default Home;