import { Property, ElectricityPlan } from './types';

export const SUMMIT_PROPERTIES: Property[] = [
  {
    id: 'santa-fe-ranch',
    name: 'Santa Fe Ranch',
    slug: 'santa-fe-ranch',
    cityStateSlug: 'carlsbad-ca',
    address: '3434 Carlsbad Blvd, Carlsbad, CA 92008',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#1a2a44',
    secondaryColor: '#f8f9fa',
    accentColor: '#c5a059',
    amenities: ['Resort Pool', 'Fitness Center', 'Private Patios', 'Pet Park'],
    description: 'Luxury coastal living featuring stunning Pacific views and direct beach access.'
  },
  {
    id: 'the-admiral',
    name: 'The Admiral',
    slug: 'the-admiral',
    cityStateSlug: 'corpus-christi-tx',
    address: '3902 Ocean Dr, Corpus Christi, TX 78411',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#0f172a',
    secondaryColor: '#f8fafc',
    accentColor: '#3b82f6',
    amenities: ['Rooftop Lounge', 'Business Center', 'Garage Parking', 'Bike Storage'],
    description: 'Sophisticated urban apartments with sweeping bay views and premium finishes.'
  },
  {
    id: 'district-greenville',
    name: 'The District at Greenville',
    slug: 'the-district-at-greenville',
    cityStateSlug: 'dallas-tx',
    address: '5703 Greenville Ave, Dallas, TX 75206',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#1e293b',
    secondaryColor: '#f1f5f9',
    accentColor: '#10b981',
    amenities: ['Poolside Cabanas', 'Yoga Studio', 'Electric Car Charging', 'Package Lockers'],
    description: 'Modern mid-rise living in the heart of the vibrant Greenville Avenue district.'
  },
  {
    id: 'grand-lacenterra',
    name: 'The Grand at LaCenterra',
    slug: 'the-grand-at-lacenterra',
    cityStateSlug: 'katy-tx',
    address: '21475 Park Row Dr, Katy, TX 77449',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#312e81',
    secondaryColor: '#eef2ff',
    accentColor: '#6366f1',
    amenities: ['Walkable Dining', 'Concierge Service', 'Infinity Pool', 'Game Room'],
    description: 'Upscale residential units integrated into the premier LaCenterra shopping and dining complex.'
  },
  {
    id: 'the-sterling',
    name: 'The Sterling',
    slug: 'the-sterling',
    cityStateSlug: 'dallas-tx',
    address: '1445 Ross Ave, Dallas, TX 75202',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#111827',
    secondaryColor: '#f3f4f6',
    accentColor: '#fbbf24',
    amenities: ['Cloud Lounge', 'Private Dining', 'Valet Parking', 'Smart Home Tech'],
    description: 'Exquisite high-rise living featuring panoramic skyline views and unparalleled luxury services.'
  },
  {
    id: 'broadstone-sienna',
    name: 'Broadstone Sienna',
    slug: 'broadstone-sienna',
    cityStateSlug: 'missouri-city-tx',
    address: '8400 Highway 6, Missouri City, TX 77459',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#3c3633',
    secondaryColor: '#eeedeb',
    accentColor: '#e0ccbe',
    amenities: ['Walking Trails', 'Lake Access', 'Clubhouse', 'Children\'s Play Area'],
    description: 'Serene family-friendly living surrounded by nature in the master-planned Sienna community.'
  },
  {
    id: 'aura-240',
    name: 'Aura 240',
    slug: 'aura-240',
    cityStateSlug: 'lewisville-tx',
    address: '240 Highline Dr, Lewisville, TX 75057',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#1e3a8a',
    secondaryColor: '#f8fafc',
    accentColor: '#60a5fa',
    amenities: ['Sky Deck', 'Cyber Cafe', 'Valet Trash', 'On-site Maintenance'],
    description: 'Contemporary apartments with easy access to major employment hubs and recreation.'
  },
  {
    id: 'vue-at-grand-parkway',
    name: 'Vue at Grand Parkway',
    slug: 'vue-at-grand-parkway',
    cityStateSlug: 'katy-tx',
    address: '1222 Grand Pkwy S, Katy, TX 77494',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#064e3b',
    secondaryColor: '#f0fdf4',
    accentColor: '#059669',
    amenities: ['Lakeside Trails', 'Modern Gym', 'Co-working Pods', 'Dog Park'],
    description: 'Modern luxury nestled in a serene lakeside setting with easy access to premier shopping.'
  },
  {
    id: 'villas-west-road',
    name: 'Villas at West Road',
    slug: 'villas-at-west-road',
    cityStateSlug: 'houston-tx',
    address: '9333 West Rd, Houston, TX 77064',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#7c2d12',
    secondaryColor: '#fff7ed',
    accentColor: '#ea580c',
    amenities: ['Gated Entrance', 'Detached Garages', 'Fire Pits', 'Sun Ledge'],
    description: 'Elegant villa-style apartments with a focus on privacy and high-end comfort.'
  },
  {
    id: 'modera-katy',
    name: 'Modera Katy',
    slug: 'modera-katy',
    cityStateSlug: 'katy-tx',
    address: '23541 Westheimer Pkwy, Katy, TX 77494',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#171717',
    secondaryColor: '#fafafa',
    accentColor: '#be123c',
    amenities: ['Art Gallery', 'Wine Room', 'Dry Cleaning Lockers', 'Bike Repair Station'],
    description: 'Chic urban dwellings where curated art meets luxury living in Katy.'
  },
  {
    id: 'lenox-grand',
    name: 'Lenox Grand',
    slug: 'lenox-grand',
    cityStateSlug: 'austin-tx',
    address: '13505 Burnet Rd, Austin, TX 78727',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#334155',
    secondaryColor: '#f1f5f9',
    accentColor: '#0284c7',
    amenities: ['Live/Work Spaces', 'Coffee Bar', 'Resort Courtyard', 'Game Lounge'],
    description: 'Active and connected community in North Austin near the Tech Ridge corridor.'
  },
  {
    id: 'sovereign-baybrook',
    name: 'The Sovereign at Baybrook',
    slug: 'sovereign-at-baybrook',
    cityStateSlug: 'houston-tx',
    address: '1910 Sovereign Way, Houston, TX 77089',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000',
    primaryColor: '#1e40af',
    secondaryColor: '#eff6ff',
    accentColor: '#fbbf24',
    amenities: ['Pool Theater', 'Putting Green', 'Executive Lounge', 'BBQ Grills'],
    description: 'Luxury residences offering unparalleled access to Baybrook Mall dining and retail.'
  }
];

export const PLANS: ElectricityPlan[] = [
  {
    id: 'studio-one-bdr',
    name: 'Studio & One-Bedroom Plan',
    rate: 9.8,
    term: 12,
    renewable: 100,
    features: [
      'Optimized for Lower Usage Volumes',
      'Move-in Fees Waived Automatically',
      'Official Property Syncing',
      'Renewable Energy Sourcing'
    ]
  },
  {
    id: 'multi-bdr-exclusive',
    name: 'Multi-Bedroom Suite (2-4 Bdr)',
    rate: 9.2,
    term: 12,
    renewable: 100,
    features: [
      'Bulk Volume Rate Discount',
      'Direct Leasing Office Notification',
      'High-Efficiency Appliance Savings',
      'Summit Compliance Verified'
    ]
  }
];