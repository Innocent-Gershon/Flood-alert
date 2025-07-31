import React, { useState, useEffect } from 'react';
import { AlertTriangleIcon, Users2Icon, Settings2Icon, BellIcon, PlusIcon, TrashIcon, EditIcon, RadioIcon, MessageSquareIcon, PhoneIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// --- Using dummy data as the initial state ---
import { floodAlerts as initialFloodAlerts, reportedEvents as initialReportedEvents } from '../../../backend/utils/dummyData';

// --- (Optional but Recommended) Define data types for better code quality ---
interface FloodAlert {
    id: string;
    location: string;
    region: string;
    severity: 'extreme' | 'high' | 'moderate' | 'low';
    timestamp: string;
    message: string;
    channelsSent: string[];
    coordinates: [number, number];
}

interface ReportedEvent {
    id: string;
    location: string;
    description: string;
    reporterName: string;
    timestamp: string;
    status: 'pending' | 'verified' | 'resolved';
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  
  // --- FUNCTIONAL CHANGE: State for data, modals, and filters ---
  const [floodAlerts, setFloodAlerts] = useState<FloodAlert[]>(initialFloodAlerts);
  const [reportedEvents, setReportedEvents] = useState<ReportedEvent[]>(initialReportedEvents);
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState<FloodAlert | null>(null);
  
  // --- FUNCTIONAL CHANGE: State for filtering and searching ---
  const [alertSearchTerm, setAlertSearchTerm] = useState('');
  const [alertRegionFilter, setAlertRegionFilter] = useState('all');
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('all');
  
  // --- FUNCTIONAL CHANGE: State for settings tab ---
  const [settings, setSettings] = useState({
      smsEnabled: true,
      smsProvider: 'MTN Business',
      radioEnabled: true,
      radioLanguage: 'English',
      voiceCallEnabled: false,
      callPriority: 'High Risk Areas Only',
      communityAlertsEnabled: true,
      communityAlertMethod: 'SMS + Phone Call',
      dataRefreshInterval: 15,
      rainfallThreshold: 30,
      riverLevelThreshold: 4.5,
      dataSources: {
        ghanaMet: true,
        waterResources: true,
        communityReports: true,
        satellite: true,
        riverSensors: true,
      }
  });

  // --- FUNCTIONAL CHANGE: Handlers for CRUD operations ---
  const handleDeleteAlert = (alertId: string) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setFloodAlerts(alerts => alerts.filter(alert => alert.id !== alertId));
      toast.success('Alert deleted successfully.');
    }
  };

  const handleEditAlert = (alert: FloodAlert) => {
    setEditingAlert(alert);
    setShowNewAlertModal(true);
  };
  
  const handleSaveAlert = (alertData: Omit<FloodAlert, 'id' | 'timestamp' | 'coordinates'>) => {
    if (editingAlert) {
      // Update existing alert
      setFloodAlerts(alerts => alerts.map(alert => 
        alert.id === editingAlert.id 
          ? { ...editingAlert, ...alertData } 
          : alert
      ));
      toast.success('Alert updated successfully.');
    } else {
      // Create new alert
      const newAlert: FloodAlert = {
        id: `alert-${Date.now()}`,
        timestamp: new Date().toISOString(),
        coordinates: [5.6037, -0.1870], // Default coords
        ...alertData
      };
      setFloodAlerts(alerts => [newAlert, ...alerts]);
      toast.success('New alert created successfully.');
    }
    closeModal();
  };

  const closeModal = () => {
    setShowNewAlertModal(false);
    setEditingAlert(null);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    toast.success('Settings saved successfully!');
  };

  // --- FUNCTIONAL CHANGE: Filtering logic ---
  const filteredAlerts = floodAlerts
    .filter(alert => alertRegionFilter === 'all' || alert.region === alertRegionFilter)
    .filter(alert => alert.location.toLowerCase().includes(alertSearchTerm.toLowerCase()));

  const filteredReports = reportedEvents
    .filter(report => reportStatusFilter === 'all' || report.status === reportStatusFilter)
    .filter(report => report.location.toLowerCase().includes(reportSearchTerm.toLowerCase()));
    
  // --- Helper functions for styling (no change) ---
  const getSeverityColor = (severity: string) => { /* ... no change ... */ };
  const getStatusColor = (status: string) => { /* ... no change ... */ };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Administrator Panel</h1>
          <p className="text-gray-600">Manage alerts, reports, and system settings</p>
        </div>
        {activeTab === 'alerts' && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            onClick={() => { setEditingAlert(null); setShowNewAlertModal(true); }}
          >
            <PlusIcon className="h-5 w-5 mr-2" /> New Alert
          </button>
        )}
      </div>

      {/* Tab Navigation (no functional change) */}
      <div className="flex border-b border-gray-200 mb-6">{/* ... */}</div>

      {/* Alerts Tab Content */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Active Flood Alerts</h2>
              <div className="flex items-center space-x-2">
                {/* --- FUNCTIONAL CHANGE: Controlled inputs for filtering --- */}
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={alertSearchTerm}
                  onChange={(e) => setAlertSearchTerm(e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={alertRegionFilter}
                  onChange={(e) => setAlertRegionFilter(e.target.value)}
                >
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
              {/* Table Head (no change) */}
              <thead className="bg-gray-50">{/* ... */}</thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* --- FUNCTIONAL CHANGE: Map over filtered alerts --- */}
                {filteredAlerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    {/* Table cells (no change) */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* --- FUNCTIONAL CHANGE: Added onClick handlers --- */}
                        <button onClick={() => handleEditAlert(alert)} className="text-blue-600 hover:text-blue-900"><EditIcon className="h-5 w-5" /></button>
                        <button onClick={() => handleDeleteAlert(alert.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="h-5 w-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           {/* Pagination (no functional change in logic, just display) */}
           <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">{/* ... */}</div>
        </div>
      )}

      {/* Reports Tab Content (Similar functional changes as Alerts Tab) */}
      {activeTab === 'reports' && (
          // ... similar structure with filteredReports and handlers for edit/delete
          <></>
      )}

      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">System Settings</h2>
          <div className="space-y-8">
            {/* --- FUNCTIONAL CHANGE: All inputs are now controlled components --- */}
            {/* Example for one setting card */}
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MessageSquareIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-800">SMS Alerts</h4>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.smsEnabled}
                    onChange={(e) => setSettings(s => ({ ...s, smsEnabled: e.target.checked }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 ... peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {/* ... other settings inputs with value and onChange handlers */}
            </div>
            {/* ... other setting cards ... */}
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSaveSettings} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* --- FUNCTIONAL CHANGE: New/Edit Alert Modal is now a controlled component --- */}
      {showNewAlertModal && (
        <NewAlertModal
            alert={editingAlert}
            onClose={closeModal}
            onSave={handleSaveAlert}
        />
      )}
    </div>
  );
};

// --- FUNCTIONAL CHANGE: Extracted Modal into its own component for clarity ---
const NewAlertModal = ({ alert, onClose, onSave }: { alert: FloodAlert | null, onClose: () => void, onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    region: alert?.region || 'Greater Accra',
    location: alert?.location || '',
    severity: alert?.severity || 'low',
    message: alert?.message || '',
    channelsSent: alert?.channelsSent || ['SMS', 'Radio', 'Community Alert'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(fd => ({ ...fd, [id]: value }));
  };

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const channelName = id.replace('channel-', '');
    setFormData(fd => ({
        ...fd,
        channelsSent: checked
            ? [...fd.channelsSent, channelName]
            : fd.channelsSent.filter(c => c !== channelName)
    }));
  };

  const handleSubmit = () => {
    if (!formData.location || !formData.message) {
        toast.error('Location and Message fields are required.');
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{alert ? 'Edit Flood Alert' : 'Create New Flood Alert'}</h3>
        </div>
        <div className="p-6 space-y-4">
            {/* All form inputs now use formData state and handleChange */}
            <input id="location" value={formData.location} onChange={handleChange} />
            {/* ... other inputs ... */}
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSubmit}>{alert ? 'Save Changes' : 'Create Alert'}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;