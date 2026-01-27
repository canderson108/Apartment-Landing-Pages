export interface Property {
  id: string;
  name: string;
  slug: string;
  cityStateSlug: string; // e.g., 'carlsbad-ca'
  address: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  accentColor: string;
  amenities?: string[];
  description?: string;
}

export interface ElectricityPlan {
  id: string;
  name: string;
  rate: number; // cents per kWh
  term: number; // months
  renewable: number; // percentage
  features: string[];
}

export type EnrollmentStep = 'property-select' | 'plan-select' | 'details' | 'confirmation';