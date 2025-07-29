import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangleIcon, DropletIcon, MapPinIcon, RadioIcon, MessageSquareIcon, PhoneIcon } from 'lucide-react';
import { floodAlerts, weatherData } from '../utils/dummyData';
const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const regions = ['All Regions', 'Greater Accra', 'Volta', 'Northern', 'Ashanti', 'Central'];
  const filteredAlerts = selectedRegion === 'All Regions' ? floodAlerts : floodAlerts.filter(alert => alert.region === selectedRegion);
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'SMS':
        return <MessageSquareIcon className="h-4 w-4" />;
      case 'Radio':
        return <RadioIcon className="h-4 w-4" />;
      case 'Voice Call':
        return <PhoneIcon className="h-4 w-4" />;
      case 'Community Alert':
        return <AlertTriangleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Flood Alert Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time monitoring and alerts for flood-prone areas in Ghana
        </p>
      </div>
      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="region-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Region
          </label>
          <select id="region-filter" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {regions.map(region => <option key={region} value={region}>
                {region}
              </option>)}
          </select>
        </div>
        <div className="ml-auto flex items-center">
          <div className="flex items-center space-x-2 mr-4">
            <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
            <span className="text-sm">Extreme</span>
          </div>
          <div className="flex items-center space-x-2 mr-4">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-sm">High</span>
          </div>
          <div className="flex items-center space-x-2 mr-4">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
            <span className="text-sm">Low</span>
          </div>
        </div>
      </div>
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-500" />
            Active Flood Alerts
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {filteredAlerts.length > 0 ? filteredAlerts.map(alert => <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`${getSeverityColor(alert.severity)} p-2 rounded-full flex items-center justify-center`}>
                        <AlertTriangleIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {alert.location}, {alert.region}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                        <p className="text-gray-700 mb-3">{alert.message}</p>
                        <div className="flex flex-wrap gap-2">
                          {alert.channelsSent.map(channel => <span key={channel} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {getChannelIcon(channel)}
                              <span className="ml-1">{channel}</span>
                            </span>)}
                        </div>
                      </div>
                    </div>
                    <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${alert.severity === 'extreme' ? 'bg-red-100 text-red-800' : alert.severity === 'high' ? 'bg-orange-100 text-orange-800' : alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>) : <div className="text-center py-8 text-gray-500">
                No alerts found for the selected region
              </div>}
          </div>
        </div>
        {/* Weather Data Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <DropletIcon className="h-5 w-5 mr-2 text-blue-500" />
            Weather Data
          </h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Rainfall (mm) - Last 6 Days
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData.rainfall}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                  <YAxis tick={{
                  fontSize: 12
                }} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              River Levels (m) - Last 6 Days
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData.riverLevels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                  <YAxis tick={{
                  fontSize: 12
                }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="level" stroke="#3b82f6" activeDot={{
                  r: 8
                }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Regional Flood Risk
            </h3>
            <div className="space-y-2">
              {Object.entries(weatherData.floodRisk).filter(([region]) => selectedRegion === 'All Regions' || region === selectedRegion).slice(0, 5).map(([region, risk]) => <div key={region} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{region}</span>
                    <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${risk === 'extreme' ? 'bg-red-100 text-red-800' : risk === 'high' ? 'bg-orange-100 text-orange-800' : risk === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {risk}
                    </span>
                  </div>)}
              {selectedRegion === 'All Regions' && <div className="text-xs text-gray-500 mt-2">
                  Showing 5 of 16 regions
                </div>}
            </div>
          </div>
        </div>
      </div>
      {/* Map Placeholder */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
          Flood Risk Map
        </h2>
        <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-blue-400 mx-auto mb-2" />
            <p className="text-gray-600">
              Interactive map showing flood-prone areas and active alerts would
              be displayed here.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              The map would include layers for current alerts, historical
              flooding, and evacuation routes.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;