import heroImg1 from '../Images/hero1.jpg';
import heroImg2 from '../Images/hero2.jpg';
import heroImg3 from '../Images/hero3.jpg';

export default function HomeHighlights() {
  return (
    <section className="w-full bg-[#F5F6FF] min-h-screen px-6 md:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Text Section */}
      <div className="flex-1 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Empower Your Community with <br />
          <span className="text-blue-600">Real-Time Flood</span> <br />
          <span className="text-blue-600">Alerts & Safety</span>
        </h1>
        <p className="mt-6 text-gray-700 text-lg">
          Get timely flood warnings, connect with responders, and take action to protect your loved ones in Ghana’s flood-prone areas. Inclusive alerts via SMS, voice, app, and more.
        </p>
        <button className="mt-8 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition">
          Get Started
        </button>
      </div>

      {/* Right Images Section */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        <img
          src={heroImg1}
          alt="Listening to alert"
          className="w-full h-64 object-cover rounded-[60px] col-span-1"
        />
        <img
          src={heroImg2}
          alt="Happy responder"
          className="w-full h-64 object-cover rounded-[60px] col-span-1"
        />
        <img
          src={heroImg3}
          alt="Graduate from alert system"
          className="w-full h-64 object-cover rounded-[60px] col-span-2"
        />
      </div>
    </section>
  );
}
