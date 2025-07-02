export interface Project {
  name: string;
  description: string;
  path: string;
  link?: string;
}

export interface LocationData {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
  timezone: string;
}