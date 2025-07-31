import React, { useState } from 'react';
import { AlertTriangleIcon, Users2Icon, Settings2Icon, BellIcon, PlusIcon, TrashIcon, EditIcon, RadioIcon, MessageSquareIcon, PhoneIcon } from 'lucide-react';
import { floodAlerts, reportedEvents } from '../../../backend/utils/dummyData';
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);
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
  return <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Administrator Panel
          </h1>
          <p className="text-gray-600">
            Manage alerts, reports, and system settings
          </p>
        </div>
        {activeTab === 'alerts' && <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors" onClick={() => setShowNewAlertModal(true)}>
            <PlusIcon className="h-5 w-5 mr-2" />
            New Alert
          </button>}
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className={`py-2 px-4 font-medium flex items-center ${activeTab === 'alerts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('alerts')}>
          <AlertTriangleIcon className="h-5 w-5 mr-2" />
          Manage Alerts
        </button>
        <button className={`py-2 px-4 font-medium flex items-center ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('reports')}>
          <Users2Icon className="h-5 w-5 mr-2" />
          Community Reports
        </button>
        <button className={`py-2 px-4 font-medium flex items-center ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('settings')}>
          <Settings2Icon className="h-5 w-5 mr-2" />
          System Settings
        </button>
      </div>
      {/* Alerts Tab Content */}
      {activeTab === 'alerts' && <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Active Flood Alerts
              </h2>
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="Search alerts..." className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Regions</option>
                  <option value="Greater Accra">Greater Accra</option>
                  <option value="Volta">Volta</option>
                  <option value="Northern">Northern</option>
                  <option value="Ashanti">Ashanti</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distribution
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {floodAlerts.map(alert => <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`${getSeverityColor(alert.severity)} p-1 rounded-full mr-2`}>
                          <AlertTriangleIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="capitalize font-medium text-gray-900">
                          {alert.severity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {alert.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {alert.region}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {alert.channelsSent.includes('SMS') && <span className="inline-flex items-center p-1 bg-blue-100 text-blue-800 rounded-full" title="SMS">
                            <MessageSquareIcon className="h-4 w-4" />
                          </span>}
                        {alert.channelsSent.includes('Radio') && <span className="inline-flex items-center p-1 bg-green-100 text-green-800 rounded-full" title="Radio">
                            <RadioIcon className="h-4 w-4" />
                          </span>}
                        {alert.channelsSent.includes('Voice Call') && <span className="inline-flex items-center p-1 bg-purple-100 text-purple-800 rounded-full" title="Voice Call">
                            <PhoneIcon className="h-4 w-4" />
                          </span>}
                        {alert.channelsSent.includes('Community Alert') && <span className="inline-flex items-center p-1 bg-yellow-100 text-yellow-800 rounded-full" title="Community Alert">
                            <BellIcon className="h-4 w-4" />
                          </span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{floodAlerts.length}</span> of{' '}
                <span className="font-medium">{floodAlerts.length}</span> alerts
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Reports Tab Content */}
      {activeTab === 'reports' && <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Community Reports
              </h2>
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="Search reports..." className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportedEvents.map(report => <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.reporterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {report.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{reportedEvents.length}</span> of{' '}
                <span className="font-medium">{reportedEvents.length}</span>{' '}
                reports
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Settings Tab Content */}
      {activeTab === 'settings' && <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            System Settings
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-4">
                Alert Distribution Channels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MessageSquareIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-medium text-gray-800">SMS Alerts</h4>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Send alerts via SMS to registered users and community
                    leaders.
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      SMS Provider:
                    </span>
                    <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>MTN Business</option>
                      <option>Vodafone Business</option>
                      <option>AirtelTigo</option>
                    </select>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <RadioIcon className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-medium text-gray-800">
                        Radio Broadcasts
                      </h4>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Automatically send alerts to partner radio stations for
                    broadcast.
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Default Language:
                    </span>
                    <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>English</option>
                      <option>Twi</option>
                      <option>Ewe</option>
                      <option>Ga</option>
                      <option>Hausa</option>
                    </select>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-purple-600 mr-2" />
                      <h4 className="font-medium text-gray-800">Voice Calls</h4>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Send automated voice calls to vulnerable populations and
                    community leaders.
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Call Priority:
                    </span>
                    <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>High Risk Areas Only</option>
                      <option>Community Leaders</option>
                      <option>All Registered Users</option>
                    </select>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 text-yellow-600 mr-2" />
                      <h4 className="font-medium text-gray-800">
                        Community Alerts
                      </h4>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Notify community mobilizers to activate local warning
                    systems.
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Alert Method:
                    </span>
                    <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>SMS + Phone Call</option>
                      <option>SMS Only</option>
                      <option>Phone Call Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-4">
                Data Collection Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label htmlFor="data-refresh" className="block text-sm font-medium text-gray-700 mb-1">
                      Data Refresh Interval (minutes)
                    </label>
                    <input type="number" id="data-refresh" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={15} min={5} max={60} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="rainfall-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                      Rainfall Alert Threshold (mm/hour)
                    </label>
                    <input type="number" id="rainfall-threshold" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={30} min={10} max={100} />
                  </div>
                  <div>
                    <label htmlFor="river-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                      River Level Alert Threshold (m)
                    </label>
                    <input type="number" id="river-threshold" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={4.5} min={1} max={10} step={0.1} />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Data Sources
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="ghana-met" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="ghana-met" className="ml-2 text-sm text-gray-700">
                        Ghana Meteorological Agency
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="water-resources" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="water-resources" className="ml-2 text-sm text-gray-700">
                        Water Resources Commission
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="community-reports" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="community-reports" className="ml-2 text-sm text-gray-700">
                        Community Reports
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="satellite" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="satellite" className="ml-2 text-sm text-gray-700">
                        Satellite Weather Data
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="river-sensors" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="river-sensors" className="ml-2 text-sm text-gray-700">
                        River Level Sensors
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>}
      {/* New Alert Modal */}
      {showNewAlertModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Flood Alert
                </h3>
                <button className="text-gray-400 hover:text-gray-500" onClick={() => setShowNewAlertModal(false)}>
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="alert-region" className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <select id="alert-region" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Volta">Volta</option>
                    <option value="Northern">Northern</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="alert-location" className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Location
                  </label>
                  <input type="text" id="alert-location" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Accra Central" />
                </div>
              </div>
              <div>
                <label htmlFor="alert-severity" className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Severity
                </label>
                <select id="alert-severity" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              <div>
                <label htmlFor="alert-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Message
                </label>
                <textarea id="alert-message" rows={4} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the flood alert and any necessary actions..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distribution Channels
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="channel-sms" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <label htmlFor="channel-sms" className="ml-2 text-sm text-gray-700 flex items-center">
                      <MessageSquareIcon className="h-4 w-4 mr-1 text-blue-600" />
                      SMS
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="channel-radio" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <label htmlFor="channel-radio" className="ml-2 text-sm text-gray-700 flex items-center">
                      <RadioIcon className="h-4 w-4 mr-1 text-green-600" />
                      Radio
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="channel-voice" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="channel-voice" className="ml-2 text-sm text-gray-700 flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1 text-purple-600" />
                      Voice Call
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="channel-community" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <label htmlFor="channel-community" className="ml-2 text-sm text-gray-700 flex items-center">
                      <BellIcon className="h-4 w-4 mr-1 text-yellow-600" />
                      Community Alert
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowNewAlertModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" onClick={() => setShowNewAlertModal(false)}>
                Create Alert
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default AdminPanel;