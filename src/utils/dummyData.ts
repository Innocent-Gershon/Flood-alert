// Sample data for demonstration purposes
export interface FloodAlert {
  id: string;
  timestamp: string;
  location: string;
  region: string;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  message: string;
  coordinates: [number, number];
  channelsSent: string[];
}
export interface ReportedEvent {
  id: string;
  timestamp: string;
  location: string;
  reporterName: string;
  description: string;
  status: 'pending' | 'verified' | 'resolved';
  coordinates: [number, number];
}
export const floodAlerts: FloodAlert[] = [{
  id: 'alert-001',
  timestamp: '2023-06-15T08:30:00Z',
  location: 'Accra Central',
  region: 'Greater Accra',
  severity: 'high',
  message: 'Heavy rainfall expected to cause significant flooding in low-lying areas. Evacuate immediately to designated shelters.',
  coordinates: [5.5557, -0.1963],
  channelsSent: ['SMS', 'Radio', 'Community Alert']
}, {
  id: 'alert-002',
  timestamp: '2023-06-15T09:15:00Z',
  location: 'Keta',
  region: 'Volta',
  severity: 'extreme',
  message: 'Dam overflow imminent. Immediate evacuation required for all residents in Keta and surrounding areas.',
  coordinates: [5.9177, 0.9867],
  channelsSent: ['SMS', 'Radio', 'Voice Call', 'Community Alert']
}, {
  id: 'alert-003',
  timestamp: '2023-06-14T16:45:00Z',
  location: 'Tamale',
  region: 'Northern',
  severity: 'moderate',
  message: 'Persistent rainfall causing water levels to rise. Prepare for possible evacuation in the next 24 hours.',
  coordinates: [9.4008, -0.8393],
  channelsSent: ['SMS', 'Radio']
}, {
  id: 'alert-004',
  timestamp: '2023-06-13T11:20:00Z',
  location: 'Kumasi',
  region: 'Ashanti',
  severity: 'low',
  message: 'Minor flooding reported in some areas. Exercise caution when traveling.',
  coordinates: [6.6885, -1.6244],
  channelsSent: ['SMS']
}, {
  id: 'alert-005',
  timestamp: '2023-06-15T07:00:00Z',
  location: 'Cape Coast',
  region: 'Central',
  severity: 'moderate',
  message: 'Coastal flooding expected due to high tides and rainfall. Secure property and prepare for evacuation.',
  coordinates: [5.1053, -1.2466],
  channelsSent: ['SMS', 'Radio', 'Community Alert']
}];
export const reportedEvents: ReportedEvent[] = [{
  id: 'report-001',
  timestamp: '2023-06-15T07:45:00Z',
  location: 'Nima, Accra',
  reporterName: 'Kofi Mensah',
  description: 'Water level rising rapidly on main street. Already knee-deep in some areas.',
  status: 'verified',
  coordinates: [5.58, -0.1924]
}, {
  id: 'report-002',
  timestamp: '2023-06-15T08:10:00Z',
  location: 'Osu, Accra',
  reporterName: 'Ama Darko',
  description: 'Drainage blocked causing water to back up into homes.',
  status: 'pending',
  coordinates: [5.5565, -0.1839]
}, {
  id: 'report-003',
  timestamp: '2023-06-15T06:30:00Z',
  location: 'Adabraka, Accra',
  reporterName: 'John Quartey',
  description: 'Bridge near market is flooded and becoming unstable.',
  status: 'verified',
  coordinates: [5.5643, -0.2051]
}, {
  id: 'report-004',
  timestamp: '2023-06-14T19:20:00Z',
  location: 'Ho, Volta Region',
  reporterName: 'Edem Kpodo',
  description: 'Road to evacuation center is blocked by fallen tree and flooding.',
  status: 'resolved',
  coordinates: [6.6019, 0.4713]
}, {
  id: 'report-005',
  timestamp: '2023-06-15T08:25:00Z',
  location: 'Takoradi, Western Region',
  reporterName: 'Grace Aidoo',
  description: 'School building surrounded by water, children and teachers trapped inside.',
  status: 'pending',
  coordinates: [4.9158, -1.7809]
}];
export const weatherData = {
  rainfall: [{
    date: '2023-06-10',
    amount: 15
  }, {
    date: '2023-06-11',
    amount: 20
  }, {
    date: '2023-06-12',
    amount: 25
  }, {
    date: '2023-06-13',
    amount: 45
  }, {
    date: '2023-06-14',
    amount: 65
  }, {
    date: '2023-06-15',
    amount: 85
  }],
  riverLevels: [{
    date: '2023-06-10',
    level: 2.1
  }, {
    date: '2023-06-11',
    level: 2.3
  }, {
    date: '2023-06-12',
    level: 2.5
  }, {
    date: '2023-06-13',
    level: 3.2
  }, {
    date: '2023-06-14',
    level: 4.1
  }, {
    date: '2023-06-15',
    level: 4.8
  }],
  floodRisk: {
    'Greater Accra': 'extreme',
    Volta: 'high',
    Northern: 'moderate',
    Ashanti: 'low',
    Central: 'moderate',
    Western: 'low',
    Eastern: 'moderate',
    'Upper East': 'low',
    'Upper West': 'low',
    Bono: 'low',
    Ahafo: 'low',
    'Bono East': 'low',
    Oti: 'moderate',
    'Western North': 'low',
    Savannah: 'low',
    'North East': 'low'
  }
};