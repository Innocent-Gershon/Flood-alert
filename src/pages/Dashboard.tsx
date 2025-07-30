import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  AlertTriangleIcon, DropletIcon, MapPinIcon, RadioIcon, MessageSquareIcon, PhoneIcon, UserIcon, CalendarIcon, CheckCircleIcon 
} from 'lucide-react';
import { floodAlerts, weatherData } from '../utils/dummyData';

// Define the structure of a community report for TypeScript
interface CommunityReport {
  id: number;
  name: string;
  location: string;
  phone: string;
  description: string;
  severity: string;
  timestamp: string;
  viewed: boolean;
}

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  // State to hold community-submitted reports
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([]);

  // Effect to load reports from localStorage and listen for changes
  useEffect(() => {
    const loadReports = () => {
      const storedReports = JSON.parse(localStorage.getItem('reports') || '[]') as CommunityReport[];
      // Sort reports to show newest first
      setCommunityReports(storedReports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    };

    loadReports(); // Load reports on initial render

    // Listen for the custom 'storage' event dispatched from the reporting page
    window.addEventListener('storage', loadReports);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', loadReports);
    };
  }, []);

  // Calculate the number of new (unviewed) reports for the notification badge
  const unviewedReportsCount = communityReports.filter(report => !report.viewed).length;

  // Function to mark a report as viewed
  const handleMarkAsViewed = (reportId: number) => {
    const updatedReports = communityReports.map(report =>
      report.id === reportId ? { ...report, viewed: true } : report
    );
    setCommunityReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('storage')); // Notify other components if needed
  };
  
  const regions = ['All Regions', 'Greater Accra', 'Volta', 'Northern', 'Ashanti', 'Central'];
  const filteredAlerts = selectedRegion === 'All Regions' ? floodAlerts : floodAlerts.filter(alert => alert.region === selectedRegion);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      case 'low': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'SMS': return <MessageSquareIcon className="h-4 w-4" />;
      case 'Radio': return <RadioIcon className="h-4 w-4" />;
      case 'Voice Call': return <PhoneIcon className="h-4 w-4" />;
      case 'Community Alert': return <AlertTriangleIcon className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Flood Alert Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring and alerts for flood-prone areas in Ghana</p>
      </div>

      {/* Filter Controls and Legend */}
      {/* ... existing filter controls ... */}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-500" />
            Active Flood Alerts
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {/* ... existing active alerts mapping ... */}
          </div>
        </div>

        {/* Weather Data Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <DropletIcon className="h-5 w-5 mr-2 text-blue-500" />
                Weather Data
            </h2>
            {/* ... existing weather data charts ... */}
        </div>
      </div>
      
      {/* --- NEW: Community Submitted Reports Section --- */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          <MessageSquareIcon className="h-5 w-5 mr-2 text-blue-500" />
          Community Submitted Reports
          {/* Notification Badge */}
          {unviewedReportsCount > 0 && (
            <span className="ml-3 inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
              {unviewedReportsCount}
            </span>
          )}
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {communityReports.length > 0 ? (
            communityReports.map(report => (
              <div 
                key={report.id} 
                className={`border rounded-lg p-4 transition-all ${
                  report.viewed ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                      <span className="flex items-center"><UserIcon className="h-4 w-4 mr-1.5" /> {report.name}</span>
                      <span className="flex items-center"><PhoneIcon className="h-4 w-4 mr-1.5" /> {report.phone}</span>
                      <span className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1.5" /> {new Date(report.timestamp).toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2" /> {report.location}
                    </h3>
                    <p className={`mt-1 text-gray-700 ${report.viewed && 'text-gray-500'}`}>
                      {report.description}
                    </p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity).replace('bg-', 'bg-').replace('-500', '-100').replace('-600', '-100').replace('-400', '-100')} ${getSeverityColor(report.severity).replace('bg-red-600', 'text-red-800').replace('bg-orange-500', 'text-orange-800').replace('bg-yellow-500', 'text-yellow-800').replace('bg-blue-400', 'text-blue-800')}`}>
                      {report.severity}
                    </span>
                    {!report.viewed && (
                      <button
                        onClick={() => handleMarkAsViewed(report.id)}
                        className="mt-2 w-full flex items-center justify-center px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Mark as Viewed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No community reports have been submitted yet.
            </div>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
          Flood Risk Map
        </h2>
        {/* ... existing map placeholder ... */}
      </div>
    </div>
  );
};

export default Dashboard;