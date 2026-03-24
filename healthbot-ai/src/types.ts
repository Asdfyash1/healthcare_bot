export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  image: string;
  distance?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  image: string;
}
