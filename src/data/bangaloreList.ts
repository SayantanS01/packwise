import { RelocationItem, ItemCategory, PriorityLevel, PurchaseStatus, SuggestedBag } from '@/types';

// Simple fallback for ID generation
const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15);
};

const createItem = (
  name: string,
  category: ItemCategory,
  quantity: number = 1,
  purchaseStatus: PurchaseStatus = 'Carry From Home',
  suggestedBag: SuggestedBag = 'Check-in Bag',
  priority: PriorityLevel = 'Medium'
): RelocationItem => ({
  id: generateId(),
  name,
  category,
  quantity,
  estimatedWeight: 100, // default
  estimatedCost: 0,
  priority,
  purchaseStatus,
  suggestedBag,
  notes: '',
  isChecked: false,
  isFavorite: false,
  suggestedStores: []
});

export const bangaloreItems: RelocationItem[] = [
  // Important Documents
  createItem('Aadhaar Card', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('PAN Card', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Offer Letter', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Appointment Letter', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Joining Instructions', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Educational Certificates', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Semester Mark Sheets', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Class 10 & 12 Certificates', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Passport Photos', 'Documents', 15, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Resume Copies', 'Documents', 5, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Bank Documents', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Medical Reports', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'Medium'),
  createItem('Photocopies of IDs', 'Documents', 5, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Soft Copies (Drive/Pen Drive)', 'Documents', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),

  // Electronics
  createItem('Laptop', 'Electronics', 1, 'Carry From Home', 'Cabin Bag', 'High'),
  createItem('Laptop Charger', 'Electronics', 1, 'Carry From Home', 'Cabin Bag', 'High'),
  createItem('Phone', 'Electronics', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Phone Charger', 'Electronics', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Earbuds', 'Electronics', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Mouse', 'Electronics', 1, 'Carry From Home', 'Cabin Bag', 'Medium'),
  createItem('Keyboard', 'Electronics', 1, 'Carry From Home', 'Check-in Bag', 'Medium'),
  createItem('Power Bank', 'Electronics', 1, 'Carry From Home', 'Cabin Bag', 'High'), // Must be in cabin bag
  createItem('Extension Board', 'Electronics', 1, 'Carry From Home', 'Check-in Bag', 'Medium'),
  createItem('USB Cables', 'Electronics', 2, 'Carry From Home', 'Handbag / Backpack', 'Medium'),
  createItem('Pen Drive/SSD', 'Electronics', 1, 'Carry From Home', 'Cabin Bag', 'Medium'),
  createItem('Smartwatch Charger', 'Electronics', 1, 'Carry From Home', 'Handbag / Backpack', 'Medium'),

  // Office Wear
  createItem('Formal Shirts', 'Office Wear', 6, 'Carry From Home', 'Check-in Bag'),
  createItem('Formal Trousers', 'Office Wear', 4, 'Carry From Home', 'Check-in Bag'),
  createItem('Belts', 'Office Wear', 2, 'Carry From Home', 'Check-in Bag'),
  createItem('Black Formal Shoes', 'Footwear', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Socks', 'Office Wear', 10, 'Carry From Home', 'Check-in Bag'),
  createItem('Tie', 'Office Wear', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Blazer', 'Office Wear', 1, 'Carry From Home', 'Check-in Bag'),

  // Casual Wear
  createItem('T-Shirts', 'Casual Wear', 8, 'Carry From Home', 'Check-in Bag'),
  createItem('Casual Shirts', 'Casual Wear', 3, 'Carry From Home', 'Check-in Bag'),
  createItem('Jeans', 'Casual Wear', 3, 'Carry From Home', 'Check-in Bag'),
  createItem('Joggers', 'Casual Wear', 2, 'Carry From Home', 'Check-in Bag'),
  createItem('Shorts', 'Casual Wear', 2, 'Carry From Home', 'Check-in Bag'),
  createItem('Nightwear', 'Sleepwear', 3, 'Carry From Home', 'Check-in Bag'),
  createItem('Hoodie', 'Winter Wear', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Light Jacket', 'Winter Wear', 1, 'Carry From Home', 'Check-in Bag'),

  // Innerwear
  createItem('Underwear', 'Innerwear', 12, 'Carry From Home', 'Check-in Bag'),
  createItem('Vests', 'Innerwear', 8, 'Carry From Home', 'Check-in Bag'),
  createItem('Bath Towels', 'Bathroom Essentials', 2, 'Carry From Home', 'Check-in Bag'),
  createItem('Hand Towels', 'Bathroom Essentials', 3, 'Carry From Home', 'Check-in Bag'),

  // Gym
  createItem('Gym Shoes', 'Gym', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Gym Clothes', 'Gym', 4, 'Carry From Home', 'Check-in Bag'),
  createItem('Gloves', 'Gym', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Protein Shaker', 'Gym', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Supplements', 'Gym', 1, 'Carry From Home', 'Check-in Bag'),

  // Toiletries
  createItem('Toothbrush', 'Toiletries', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Toothpaste', 'Toiletries', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Face Wash', 'Toiletries', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Soap', 'Toiletries', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Shampoo', 'Toiletries', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Razor/Trimmer', 'Grooming', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Deodorant', 'Grooming', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Perfume', 'Grooming', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Hair Oil', 'Hair Care', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Comb', 'Hair Care', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Sunscreen', 'Skincare', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Moisturizer', 'Skincare', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Nail Cutter', 'Grooming', 1, 'Carry From Home', 'Check-in Bag'),

  // Medicines
  createItem('Personal Medicines', 'Medicines', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Paracetamol', 'Medicines', 10, 'Carry From Home', 'Handbag / Backpack'),
  createItem('ORS', 'Medicines', 5, 'Carry From Home', 'Handbag / Backpack'),
  createItem('Band-Aids', 'Medicines', 10, 'Carry From Home', 'Handbag / Backpack'),
  createItem('Cold Medicine', 'Medicines', 5, 'Carry From Home', 'Handbag / Backpack'),
  createItem('Pain Relief Spray', 'Medicines', 1, 'Carry From Home', 'Check-in Bag'),

  // Weather & Travel
  createItem('Umbrella', 'Rain Wear', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Rain Jacket', 'Rain Wear', 1, 'Carry From Home', 'Check-in Bag'),
  createItem('Wallet', 'Travel', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Cards', 'Finance', 4, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('5,000–10,000 Cash', 'Finance', 1, 'Carry From Home', 'Handbag / Backpack', 'High'),
  createItem('Water Bottle', 'Travel', 1, 'Carry From Home', 'Handbag / Backpack'),
  createItem('Dry Snacks', 'Food & Snacks', 2, 'Carry From Home', 'Cabin Bag'),

  // Buy After Reaching Bangalore
  createItem('Room Hangers', 'Room Essentials', 10, 'Buy After Relocation', 'Other'),
  createItem('Laundry Bag', 'Laundry', 1, 'Buy After Relocation', 'Other'),
  createItem('Slippers', 'Footwear', 1, 'Buy After Relocation', 'Other'),
  createItem('Small Dustbin', 'Room Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Room Freshener', 'Room Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Lock (if needed)', 'Room Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Laundry Detergent', 'Laundry', 1, 'Buy After Relocation', 'Other'),
  createItem('Fabric Softener', 'Laundry', 1, 'Buy After Relocation', 'Other'),
  createItem('Cloth Clips', 'Laundry', 10, 'Buy After Relocation', 'Other'),
  createItem('Bathroom Bucket & Mug', 'Bathroom Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Hand Wash', 'Bathroom Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Bedsheet', 'Room Essentials', 2, 'Buy After Relocation', 'Other'),
  createItem('Pillow', 'Room Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Pillow Cover', 'Room Essentials', 2, 'Buy After Relocation', 'Other'),
  createItem('Blanket', 'Room Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Lunch Box', 'Kitchen Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Coffee Mug', 'Kitchen Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Electric Kettle', 'Kitchen Essentials', 1, 'Buy After Relocation', 'Other'),
  createItem('Tea/Coffee', 'Food & Snacks', 1, 'Buy After Relocation', 'Other'),
  createItem('Biscuits', 'Food & Snacks', 2, 'Buy After Relocation', 'Other'),
  createItem('Instant Noodles', 'Food & Snacks', 5, 'Buy After Relocation', 'Other'),
  createItem('Dry Fruits', 'Food & Snacks', 1, 'Buy After Relocation', 'Other'),
  createItem('Protein Bar', 'Food & Snacks', 5, 'Buy After Relocation', 'Other'),
];
