export type ItemCategory = 
  | 'Documents'
  | 'Electronics'
  | 'Laptop Accessories'
  | 'Mobile Accessories'
  | 'Office Wear'
  | 'Casual Wear'
  | 'Ethnic Wear'
  | 'Winter Wear'
  | 'Rain Wear'
  | 'Innerwear'
  | 'Sleepwear'
  | 'Footwear'
  | 'Gym'
  | 'Toiletries'
  | 'Grooming'
  | 'Skincare'
  | 'Hair Care'
  | 'Medicines'
  | 'First Aid'
  | 'Bathroom Essentials'
  | 'Laundry'
  | 'Room Essentials'
  | 'PG Essentials'
  | 'Kitchen Essentials'
  | 'Food & Snacks'
  | 'Stationery'
  | 'Office Joining'
  | 'Finance'
  | 'Travel'
  | 'Emergency Kit'
  | 'Important Contacts'
  | 'Digital Assets'
  | 'Vehicle Documents'
  | 'Miscellaneous';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type PurchaseStatus = 'Carry From Home' | 'Buy After Relocation';
export type SuggestedBag = 'Cabin Bag' | 'Check-in Bag' | 'Handbag / Backpack' | 'Other';

export interface RelocationItem {
  id: string;
  name: string;
  category: ItemCategory;
  subcategory?: string;
  quantity: number;
  estimatedWeight: number; // in grams
  estimatedCost: number; // in INR
  priority: PriorityLevel;
  purchaseStatus: PurchaseStatus;
  suggestedBag: SuggestedBag;
  notes: string;
  isChecked: boolean;
  isFavorite: boolean;
  suggestedStores: string[];
}

export interface BaggageProfile {
  name: string;
  cabinAllowance: number; // in kg
  checkInAllowance: number; // in kg
  numberOfBags: number;
}

export interface TravelDetails {
  flightNumber: string;
  pnr: string;
  departureTime: string;
  arrivalTime: string;
  terminal: string;
  airport: string;
  cabDetails: string;
  hotel: string;
  pgAddress: string;
  emergencyContacts: string;
  googleMapsLink: string;
  numberOfTravelers: number;
  ticketCost: number;
  ticketFileUrl: string;
  accommodationCost: number;
  accommodationFileUrl: string;
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}
