import React, { useState } from 'react';
import { AlertTriangleIcon, SendIcon, ImageIcon, MapPinIcon } from 'lucide-react';

const CommunityReporting = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    description: '',
    severity: 'moderate',
    hasImage: false,
  });

  // State to control the visibility of the success pop-up modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Create a new report object with a unique ID and a 'viewed' status
    const newReport = {
      id: Date.now(), // Using timestamp as a simple unique ID
      timestamp: new Date().toISOString(),
      viewed: false, // Crucial for the dashboard notification system
      ...formData,
    };

    // 2. Get existing reports from localStorage or initialize an empty array
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');

    // 3. Add the new report to the array
    const updatedReports = [...existingReports, newReport];

    // 4. Save the updated array back to localStorage
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    
    // 5. Dispatch a 'storage' event to notify other components (like Dashboard/Sidebar)
    window.dispatchEvent(new Event('storage'));

    // 6. Open the success modal
    setIsModalOpen(true);
  };

  // Function to close the modal and reset the form
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset the form for the next report
    setFormData({
      name: '',
      location: '',
      phone: '',
      description: '',
      severity: 'moderate',
      hasImage: false,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- Success Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 text-center shadow-2xl max-w-sm w-full">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <SendIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Report Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your report. Local authorities will be notified.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Community Flood Reporting
        </h1>
        <p className="text-gray-600">
          Help protect your community by reporting flooding incidents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Reporting Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-500" />
              Report a Flood
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 024-123-4567" />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location of Flooding</label>
                <div className="flex">
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the location as precisely as possible" />
                  <button type="button" className="bg-blue-100 text-blue-700 px-3 rounded-r-md border border-l-0 border-gray-300 hover:bg-blue-200 transition-colors" title="Use my current location">
                    <MapPinIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">Severity of Flooding</label>
                <select id="severity" name="severity" value={formData.severity} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Low - Minor street flooding</option>
                  <option value="moderate">Moderate - Streets impassable, approaching buildings</option>
                  <option value="high">High - Water entering buildings, evacuation needed</option>
                  <option value="extreme">Extreme - Life-threatening situation</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description of the Situation</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Please describe the flooding situation in detail..."></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="hasImage" name="hasImage" checked={formData.hasImage} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="hasImage" className="ml-2 text-sm text-gray-700 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1" />I have photos of the flooding to share
                </label>
              </div>
              {formData.hasImage && (
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Drag and drop photos here, or click to select files</p>
                  <p className="text-xs text-gray-400 mt-1">Maximum 3 photos, 5MB each</p>
                  <button type="button" className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">Upload Photos</button>
                </div>
              )}
              <div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Information Panel */}
        {/* ... Information panel JSX remains unchanged ... */}
         <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              How Your Report Helps
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 mr-2 mt-0.5">
                  1
                </span>
                <span>
                  Alerts authorities to flooding incidents they may not be aware
                  of
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 mr-2 mt-0.5">
                  2
                </span>
                <span>
                  Helps emergency responders prioritize rescue and evacuation
                  efforts
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 mr-2 mt-0.5">
                  3
                </span>
                <span>
                  Provides real-time data to improve our flood prediction models
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 mr-2 mt-0.5">
                  4
                </span>
                <span>Warns other community members in the affected area</span>
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-600" />
              Emergency Contacts
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">National Emergency</span>
                <a href="tel:112" className="font-bold text-blue-700 hover:underline">
                  112
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Flood Response Team</span>
                <a href="tel:0302-772-201" className="font-bold text-blue-700 hover:underline">
                  0302-772-201
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">
                  Ghana Meteorological Agency
                </span>
                <a href="tel:0302-777-172" className="font-bold text-blue-700 hover:underline">
                  0302-777-172
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-yellow-200">
              <p className="text-sm text-yellow-700">
                If you're in immediate danger, call emergency services
                immediately rather than submitting a report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityReporting;