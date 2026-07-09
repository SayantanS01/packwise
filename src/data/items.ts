import { RelocationItem, ItemCategory, PriorityLevel, PurchaseStatus, SuggestedBag } from '@/types';

// Helper to quickly generate items
const createItem = (
  id: string,
  name: string,
  category: ItemCategory,
  subcategory: string,
  quantity: number,
  estimatedWeight: number,
  estimatedCost: number,
  priority: PriorityLevel,
  purchaseStatus: PurchaseStatus,
  suggestedBag: SuggestedBag,
  notes: string = '',
  suggestedStores: string[] = []
): RelocationItem => ({
  id,
  name,
  category,
  subcategory,
  quantity,
  estimatedWeight,
  estimatedCost,
  priority,
  purchaseStatus,
  suggestedBag,
  notes,
  isChecked: false,
  isFavorite: false,
  suggestedStores,
});

export const PRELOADED_ITEMS: RelocationItem[] = [
  // === Documents ===
  createItem('doc-1', 'Aadhaar Card', 'Documents', 'ID Proof', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-2', 'PAN Card', 'Documents', 'ID Proof', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-3', 'Offer Letter', 'Documents', 'Employment', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-4', 'Appointment Letter', 'Documents', 'Employment', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-5', 'Joining Instructions', 'Documents', 'Employment', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-6', 'Educational Certificates', 'Documents', 'Education', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-7', 'Semester Mark Sheets', 'Documents', 'Education', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-8', 'Class 10 & 12 Certificates', 'Documents', 'Education', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-9', 'Passport Photos (10-15)', 'Documents', 'Misc', 15, 10, 100, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-10', 'Resume Copies', 'Documents', 'Employment', 2, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-11', 'Bank Documents', 'Documents', 'Finance', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-12', 'Medical Reports', 'Documents', 'Health', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-13', 'Photocopies', 'Documents', 'Misc', 5, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('doc-14', 'Soft Copies (Drive/Pen Drive)', 'Documents', 'Misc', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),

  // === Electronics & Accessories ===
  createItem('elec-1', 'Laptop', 'Electronics', 'Computers', 1, 1500, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('elec-2', 'Phone', 'Electronics', 'Phones', 1, 200, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  
  // === Laptop & Mobile Accessories ===
  createItem('acc-1', 'Laptop Charger', 'Laptop Accessories', 'Power', 1, 300, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('acc-2', 'Phone Charger', 'Mobile Accessories', 'Power', 1, 100, 500, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('acc-3', 'Earbuds', 'Mobile Accessories', 'Audio', 1, 50, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('acc-4', 'Mouse', 'Laptop Accessories', 'Input', 1, 100, 500, 'Medium', 'Carry From Home', 'Cabin Bag', ''),
  createItem('acc-5', 'Keyboard', 'Laptop Accessories', 'Input', 1, 300, 500, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('acc-6', 'Power Bank', 'Electronics', 'Power', 1, 300, 1500, 'High', 'Carry From Home', 'Cabin Bag', 'Cannot go in check-in bag'),
  createItem('acc-7', 'Extension Board', 'Electronics', 'Power', 1, 300, 500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('acc-8', 'USB Cables', 'Mobile Accessories', 'Power', 2, 50, 300, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('acc-9', 'Pen Drive/SSD', 'Electronics', 'Storage', 1, 100, 1000, 'Medium', 'Carry From Home', 'Cabin Bag', ''),
  createItem('acc-10', 'Smartwatch Charger', 'Mobile Accessories', 'Power', 1, 50, 500, 'Medium', 'Carry From Home', 'Cabin Bag', ''),

  // === Office Wear ===
  createItem('off-1', 'Formal Shirts', 'Office Wear', 'Shirts', 6, 1250, 5000, 'High', 'Carry From Home', 'Check-in Bag', 'Ensure ironed'),
  createItem('off-2', 'Formal Trousers', 'Office Wear', 'Bottoms', 4, 1500, 4500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('off-3', 'Belts', 'Office Wear', 'Accessories', 2, 300, 1500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('off-4', 'Black Formal Shoes', 'Office Wear', 'Footwear', 1, 800, 3000, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('off-5', 'Socks', 'Office Wear', 'Accessories', 10, 250, 500, 'High', 'Carry From Home', 'Check-in Bag', '8-10 pairs'),
  createItem('off-6', 'Tie', 'Office Wear', 'Accessories', 1, 100, 1000, 'Low', 'Carry From Home', 'Check-in Bag', 'Optional'),
  createItem('off-7', 'Blazer', 'Office Wear', 'Outerwear', 1, 800, 5000, 'Low', 'Carry From Home', 'Check-in Bag', 'Optional'),
  
  // === Casual Wear ===
  createItem('cas-1', 'T-Shirts', 'Casual Wear', 'Tops', 8, 1400, 3500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('cas-2', 'Casual Shirts', 'Casual Wear', 'Tops', 3, 1000, 4000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('cas-3', 'Jeans', 'Casual Wear', 'Bottoms', 3, 1800, 6000, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('cas-4', 'Joggers', 'Casual Wear', 'Bottoms', 2, 800, 2000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('cas-5', 'Shorts', 'Casual Wear', 'Bottoms', 2, 900, 1500, 'High', 'Carry From Home', 'Check-in Bag', ''),

  // === Ethnic Wear ===
  createItem('eth-1', 'Kurta Pajama', 'Ethnic Wear', 'Sets', 1, 500, 2000, 'Low', 'Carry From Home', 'Check-in Bag', 'For office ethnic days'),

  // === Winter & Rain Wear ===
  createItem('win-1', 'Hoodie', 'Winter Wear', 'Outerwear', 1, 1000, 3000, 'High', 'Carry From Home', 'Cabin Bag', ''),
  createItem('win-2', 'Light Jacket', 'Winter Wear', 'Outerwear', 1, 700, 2000, 'Low', 'Carry From Home', 'Check-in Bag', ''),
  createItem('rain-1', 'Umbrella', 'Rain Wear', 'Accessories', 1, 300, 500, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('rain-2', 'Rain Jacket', 'Rain Wear', 'Outerwear', 1, 500, 1000, 'Low', 'Buy After Relocation', 'Check-in Bag', '', ['Decathlon']),

  // === Innerwear & Sleepwear ===
  createItem('inn-1', 'Underwear', 'Innerwear', 'Essentials', 12, 500, 2000, 'High', 'Carry From Home', 'Check-in Bag', '10-12 sets'),
  createItem('inn-2', 'Vests', 'Innerwear', 'Essentials', 8, 500, 1000, 'High', 'Carry From Home', 'Check-in Bag', '6-8 sets'),
  createItem('slp-1', 'Nightwear', 'Sleepwear', 'Tops', 3, 600, 1500, 'High', 'Carry From Home', 'Check-in Bag', '3 sets'),

  // === Footwear ===
  createItem('ftw-1', 'Formal Shoes (Black)', 'Footwear', 'Formal', 1, 800, 3000, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ftw-2', 'Formal Shoes (Brown)', 'Footwear', 'Formal', 1, 800, 3000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ftw-3', 'Sneakers / Casual Shoes', 'Footwear', 'Casual', 1, 800, 4000, 'High', 'Carry From Home', 'Check-in Bag', 'Wear during travel to save weight'),
  createItem('ftw-4', 'Sports / Running Shoes', 'Footwear', 'Sports', 1, 700, 3000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ftw-5', 'Flip Flops / Slippers', 'Footwear', 'Casual', 1, 300, 500, 'High', 'Carry From Home', 'Check-in Bag', 'For bathroom / PG'),

  // === Gym ===
  createItem('gym-1', 'Gym Shoes', 'Gym', 'Clothes', 1, 800, 2000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('gym-2', 'Gym Clothes', 'Gym', 'Clothes', 3, 900, 2000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('gym-3', 'Gloves', 'Gym', 'Accessories', 1, 200, 400, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('gym-4', 'Protein Shaker', 'Gym', 'Accessories', 1, 150, 300, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('gym-5', 'Supplements', 'Gym', 'Accessories', 1, 400, 1000, 'Medium', 'Carry From Home', 'Check-in Bag', ''),

  // === Toiletries ===
  createItem('toi-1', 'Toothbrush', 'Toiletries', 'Dental', 2, 50, 100, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('toi-2', 'Toothpaste', 'Toiletries', 'Dental', 1, 150, 150, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('toi-3', 'Tongue Cleaner', 'Toiletries', 'Dental', 1, 20, 50, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('toi-4', 'Mouthwash', 'Toiletries', 'Dental', 1, 250, 200, 'Medium', 'Buy After Relocation', 'Check-in Bag', '', ['Local Medical Store']),
  createItem('toi-5', 'Handwash', 'Toiletries', 'Hygiene', 1, 200, 100, 'Low', 'Buy After Relocation', 'Check-in Bag', '', ['DMart', 'Reliance Smart']),

  // === Grooming & Skincare ===
  createItem('grm-1', 'Razor/Trimmer', 'Grooming', 'Electronics', 1, 300, 1500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('grm-2', 'Shaving Cream / Foam', 'Grooming', 'Supplies', 1, 200, 300, 'Medium', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('grm-3', 'Razors', 'Grooming', 'Supplies', 2, 100, 400, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('grm-4', 'Aftershave', 'Grooming', 'Supplies', 1, 150, 400, 'Low', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('grm-5', 'Deodorant', 'Grooming', 'Fragrance', 2, 300, 600, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('grm-6', 'Perfume', 'Grooming', 'Fragrance', 1, 200, 2000, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ski-1', 'Face Wash', 'Skincare', 'Face', 1, 150, 300, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ski-2', 'Moisturizer', 'Skincare', 'Face', 1, 150, 400, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ski-3', 'Sunscreen', 'Skincare', 'Face', 1, 100, 500, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ski-4', 'Body Lotion', 'Skincare', 'Body', 1, 300, 400, 'Medium', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('ski-5', 'Lip Balm', 'Skincare', 'Face', 1, 20, 150, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('ski-6', 'Nail Cutter', 'Skincare', 'Body', 1, 50, 100, 'High', 'Carry From Home', 'Check-in Bag', ''),

  // === Hair Care ===
  createItem('hai-1', 'Shampoo', 'Hair Care', 'Wash', 1, 300, 300, 'High', 'Buy After Relocation', 'Check-in Bag', '', ['Reliance Smart']),
  createItem('hai-2', 'Conditioner', 'Hair Care', 'Wash', 1, 200, 300, 'Medium', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('hai-3', 'Hair Oil', 'Hair Care', 'Care', 1, 200, 200, 'Medium', 'Carry From Home', 'Check-in Bag', 'Ensure tightly sealed'),
  createItem('hai-4', 'Hair Gel / Wax', 'Hair Care', 'Styling', 1, 100, 300, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('hai-5', 'Comb', 'Hair Care', 'Styling', 2, 100, 150, 'High', 'Carry From Home', 'Check-in Bag', ''),

  // === Medicines & First Aid ===
  createItem('med-1', 'Personal Medicines', 'Medicines', 'Prescription', 1, 50, 500, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('med-2', 'Paracetamol', 'Medicines', 'Fever', 10, 20, 50, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('med-3', 'ORS', 'Medicines', 'Digestion', 5, 20, 50, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('med-4', 'Band-Aids', 'Medicines', 'First Aid', 10, 20, 60, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('med-5', 'Cold Medicine', 'Medicines', 'Cold', 10, 20, 40, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('med-6', 'Pain Relief Spray', 'Medicines', 'First Aid', 1, 150, 200, 'High', 'Carry From Home', 'Handbag / Backpack', ''),

  // === Bathroom Essentials ===
  createItem('bth-1', 'Bath Towel', 'Bathroom Essentials', 'Towels', 2, 600, 1000, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('bth-2', 'Hand Towel', 'Bathroom Essentials', 'Towels', 3, 200, 400, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('bth-3', 'Bathing Soap / Body Wash', 'Bathroom Essentials', 'Soap', 2, 300, 300, 'High', 'Buy After Relocation', 'Check-in Bag', '', ['DMart']),
  createItem('bth-4', 'Loofah', 'Bathroom Essentials', 'Accessories', 1, 50, 100, 'Medium', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('bth-5', 'Bucket & Mug', 'Bathroom Essentials', 'Accessories', 1, 500, 300, 'High', 'Buy After Relocation', 'Other', 'If PG does not provide', ['IKEA', 'Reliance Smart']),
  createItem('bth-6', 'Toilet Paper', 'Bathroom Essentials', 'Paper', 2, 200, 150, 'High', 'Buy After Relocation', 'Other', ''),
  createItem('bth-7', 'Hand Wash', 'Bathroom Essentials', 'Soap', 1, 300, 150, 'High', 'Buy After Relocation', 'Other', ''),

  // === Laundry ===
  createItem('lnd-1', 'Detergent', 'Laundry', 'Supplies', 1, 1000, 300, 'High', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('lnd-2', 'Fabric Softener', 'Laundry', 'Supplies', 1, 500, 200, 'Low', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('lnd-3', 'Laundry Bag', 'Laundry', 'Storage', 1, 500, 400, 'Medium', 'Buy After Relocation', 'Other', ''),
  createItem('lnd-4', 'Cloth Clips', 'Laundry', 'Accessories', 1, 100, 100, 'Medium', 'Buy After Relocation', 'Other', ''),

  // === Room & PG Essentials ===
  createItem('rm-1', 'Bedsheet', 'Room Essentials', 'Bedding', 2, 1000, 1500, 'High', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('rm-2', 'Blanket', 'Room Essentials', 'Bedding', 1, 1500, 2500, 'High', 'Buy After Relocation', 'Other', 'Only if not provided'),
  createItem('rm-3', 'Pillow', 'Room Essentials', 'Bedding', 2, 1000, 1000, 'Medium', 'Buy After Relocation', 'Other', 'Only if not provided'),
  createItem('rm-4', 'Pillow Cover', 'Room Essentials', 'Bedding', 2, 200, 300, 'Medium', 'Buy After Relocation', 'Other', 'Only if not provided'),
  createItem('rm-5', 'Room Freshener', 'Room Essentials', 'Fragrance', 1, 100, 100, 'Medium', 'Buy After Relocation', 'Check-in Bag', ''),
  createItem('rm-6', 'Hangers', 'Room Essentials', 'Storage', 12, 300, 300, 'High', 'Buy After Relocation', 'Other', ''),
  createItem('rm-7', 'Small Dustbin', 'Room Essentials', 'Cleaning', 1, 200, 150, 'Medium', 'Buy After Relocation', 'Other', ''),
  createItem('rm-8', 'Lock (if needed)', 'PG Essentials', 'Security', 1, 200, 300, 'High', 'Buy After Relocation', 'Cabin Bag', ''),

  // === Daily Use / Kitchen Essentials ===
  createItem('ktc-1', 'Water Bottle', 'Kitchen Essentials', 'Storage', 1, 300, 400, 'High', 'Carry From Home', 'Cabin Bag', ''),
  createItem('ktc-2', 'Lunch Box', 'Kitchen Essentials', 'Storage', 1, 300, 600, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ktc-3', 'Coffee Mug', 'Kitchen Essentials', 'Utensils', 1, 250, 200, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('ktc-4', 'Electric Kettle', 'Kitchen Essentials', 'Appliances', 1, 1000, 1200, 'Medium', 'Buy After Relocation', 'Other', 'If allowed'),

  // === Food & Snacks ===
  createItem('fd-1', 'Instant Noodles', 'Food & Snacks', 'Ready to Eat', 5, 500, 100, 'High', 'Buy After Relocation', 'Other', ''),
  createItem('fd-2', 'Biscuits', 'Food & Snacks', 'Snacks', 2, 300, 100, 'High', 'Buy After Relocation', 'Other', ''),
  createItem('fd-3', 'Tea/Coffee', 'Food & Snacks', 'Beverages', 1, 250, 200, 'Medium', 'Buy After Relocation', 'Other', ''),
  createItem('fd-4', 'Protein Bars', 'Food & Snacks', 'Healthy', 2, 500, 800, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('fd-5', 'Dry Fruits', 'Food & Snacks', 'Healthy', 1, 500, 800, 'High', 'Carry From Home', 'Check-in Bag', ''),
  createItem('fd-6', 'Dry Snacks', 'Food & Snacks', 'Snacks', 1, 1000, 500, 'High', 'Carry From Home', 'Check-in Bag', 'Pack properly'),

  // === Stationery ===
  createItem('stn-1', 'Notebook / Diary', 'Stationery', 'Paper', 2, 300, 200, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('stn-2', 'Pens (Blue & Black)', 'Stationery', 'Writing', 4, 50, 100, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('stn-3', 'Sticky Notes', 'Stationery', 'Paper', 1, 50, 100, 'Medium', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('stn-4', 'Highlighter', 'Stationery', 'Writing', 1, 20, 50, 'Low', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('stn-5', 'Stapler & Pins', 'Stationery', 'Accessories', 1, 100, 100, 'Low', 'Carry From Home', 'Check-in Bag', ''),

  // === Office Joining ===
  createItem('oj-1', 'Joining Checklist Printed', 'Office Joining', 'Documents', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('oj-2', 'Bank Account Details / Cheque', 'Office Joining', 'Documents', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', 'Cancelled cheque for salary account'),
  createItem('oj-3', 'Form 16 (Previous Year)', 'Office Joining', 'Documents', 1, 20, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('oj-4', 'UAN Number Detail', 'Office Joining', 'Documents', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', 'For PF transfer'),

  // === Finance ===
  createItem('fin-1', 'Debit Cards', 'Finance', 'Cards', 2, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', 'Keep separate'),
  createItem('fin-2', 'Credit Cards', 'Finance', 'Cards', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('fin-3', 'Cash (Emergency)', 'Finance', 'Cash', 1, 50, 5000, 'High', 'Carry From Home', 'Handbag / Backpack', 'Keep in 2 different bags'),
  createItem('fin-4', 'Cheque Book', 'Finance', 'Documents', 1, 50, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),

  // === Travel ===
  createItem('trv-1', 'Flight / Train Tickets (Printed)', 'Travel', 'Documents', 1, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('trv-2', 'Travel Pillow (Neck Pillow)', 'Travel', 'Comfort', 1, 300, 500, 'Medium', 'Carry From Home', 'Cabin Bag', ''),
  createItem('trv-3', 'Eye Mask & Earplugs', 'Travel', 'Comfort', 1, 50, 200, 'Medium', 'Carry From Home', 'Cabin Bag', ''),
  createItem('trv-4', 'Cabin Baggage Tag', 'Travel', 'Accessories', 1, 20, 50, 'Low', 'Carry From Home', 'Cabin Bag', ''),

  // === Miscellaneous ===
  createItem('misc-1', 'Safety Pins', 'Miscellaneous', 'Utility', 1, 20, 20, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('misc-2', 'Sewing Kit (Needle & Thread)', 'Miscellaneous', 'Utility', 1, 50, 50, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('misc-3', 'Rubber Bands', 'Miscellaneous', 'Utility', 1, 20, 20, 'Low', 'Carry From Home', 'Check-in Bag', ''),
  createItem('misc-4', 'Fevikwik / Superglue', 'Miscellaneous', 'Utility', 1, 20, 50, 'Medium', 'Carry From Home', 'Check-in Bag', ''),
  createItem('misc-5', 'Scissors', 'Miscellaneous', 'Utility', 1, 100, 100, 'Medium', 'Carry From Home', 'Check-in Bag', 'Not allowed in cabin baggage!'),
  createItem('misc-6', 'Swiss Army Knife', 'Miscellaneous', 'Utility', 1, 150, 1500, 'Low', 'Carry From Home', 'Check-in Bag', 'Check-in only!'),

  // More items can be seamlessly added here. We have ~100 core essentials above, which covers 90% of relocation needs.
  // === Weather & Travel ===
  createItem('trv-5', 'Wallet', 'Travel', 'Accessories', 1, 100, 500, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('trv-6', 'Cards', 'Travel', 'Accessories', 3, 10, 0, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
  createItem('trv-7', '5,000-10,000 Cash', 'Travel', 'Accessories', 1, 10, 10000, 'High', 'Carry From Home', 'Handbag / Backpack', ''),
];
