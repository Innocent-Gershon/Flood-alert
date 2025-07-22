import React, { useState } from 'react';
import { AlertTriangleIcon, Users2Icon, TruckIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react';
import { floodAlerts, reportedEvents } from '../utils/dummyData';
const EmergencyResponse = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  // Sort alerts by severity (extreme first)
  const sortedAlerts = [...floodAlerts].sort((a, b) => {
    const severityOrder = {
      extreme: 0,
      high: 1,
      moderate: 2,
      low: 3
    };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getSelectedAlertDetails = () => {
    return floodAlerts.find(alert => alert.id === selectedAlert);
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Emergency Response Coordination
        </h1>
        <p className="text-gray-600">
          Coordinate rescue and evacuation efforts in response to flood alerts
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Alerts & Reports */}
        <div className="lg:col-span-1">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-4">
            <button className={`py-2 px-4 font-medium ${activeTab === 'alerts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('alerts')}>
              Active Alerts
            </button>
            <button className={`py-2 px-4 font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('reports')}>
              Community Reports
            </button>
          </div>
          {/* Alerts Tab */}
          {activeTab === 'alerts' && <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-500" />
                Active Flood Alerts
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {sortedAlerts.map(alert => <div key={alert.id} className={`border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${selectedAlert === alert.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => setSelectedAlert(alert.id)}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`${getSeverityColor(alert.severity)} p-1 rounded-full mr-2`}>
                          <AlertTriangleIcon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-800">
                          {alert.location}
                        </h3>
                      </div>
                      <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${alert.severity === 'extreme' ? 'bg-red-100 text-red-800' : alert.severity === 'high' ? 'bg-orange-100 text-orange-800' : alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>)}
              </div>
            </div>}
          {/* Reports Tab */}
          {activeTab === 'reports' && <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users2Icon className="h-5 w-5 mr-2 text-blue-500" />
                Community Reports
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {reportedEvents.map(report => <div key={report.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">
                        {report.location}
                      </h3>
                      <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Reported by: {report.reporterName}</span>
                      <span>{new Date(report.timestamp).toLocaleString()}</span>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
        {/* Right Panel - Response Details */}
        <div className="lg:col-span-2">
          {selectedAlert ? <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {getSelectedAlertDetails()?.location},{' '}
                    {getSelectedAlertDetails()?.region}
                  </h2>
                  <p className="text-gray-600">
                    Alert issued:{' '}
                    {new Date(getSelectedAlertDetails()?.timestamp || '').toLocaleString()}
                  </p>
                </div>
                <span className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${getSelectedAlertDetails()?.severity === 'extreme' ? 'bg-red-100 text-red-800' : getSelectedAlertDetails()?.severity === 'high' ? 'bg-orange-100 text-orange-800' : getSelectedAlertDetails()?.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                  {getSelectedAlertDetails()?.severity} Risk
                </span>
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  Alert Message
                </h3>
                <p className="bg-gray-50 p-4 rounded-md text-gray-700">
                  {getSelectedAlertDetails()?.message}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Alert Distribution
                  </h3>
                  <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                    {getSelectedAlertDetails()?.channelsSent.map(channel => <li key={channel} className="flex items-center text-gray-700">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>{channel}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Location Coordinates
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 flex items-center">
                      <MapPinIcon className="h-4 w-4 text-red-500 mr-2" />
                      <span>
                        {getSelectedAlertDetails()?.coordinates[0]},{' '}
                        {getSelectedAlertDetails()?.coordinates[1]}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  Response Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                    <TruckIcon className="h-4 w-4 mr-2" />
                    <span>Dispatch Rescue Team</span>
                  </button>
                  <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors">
                    <Users2Icon className="h-4 w-4 mr-2" />
                    <span>Coordinate Evacuation</span>
                  </button>
                  <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    <span>Contact Local Authorities</span>
                  </button>
                  <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors">
                    <AlertTriangleIcon className="h-4 w-4 mr-2" />
                    <span>Update Alert Status</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Response Notes
                </h3>
                <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Add notes about response actions taken..."></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm transition-colors">
                    Save Notes
                  </button>
                </div>
              </div>
            </div> : <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full text-center">
              <AlertTriangleIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Alert Selected
              </h2>
              <p className="text-gray-600 max-w-md">
                Select an active flood alert from the list to view details and
                coordinate response efforts.
              </p>
            </div>}
        </div>
      </div>
    </div>;
};
export default EmergencyResponse;