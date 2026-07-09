"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RelocationItem, ItemCategory, PriorityLevel, PurchaseStatus, SuggestedBag } from "@/types";
import { usePackStore } from "@/store/usePackStore";

interface ItemFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemToEdit?: RelocationItem | null;
  defaultPurchaseStatus?: PurchaseStatus;
}

const CATEGORIES: ItemCategory[] = [
  'Documents', 'Electronics', 'Laptop Accessories', 'Mobile Accessories', 
  'Office Wear', 'Casual Wear', 'Ethnic Wear', 'Winter Wear', 'Rain Wear', 
  'Innerwear', 'Sleepwear', 'Footwear', 'Gym', 'Toiletries', 'Grooming', 
  'Skincare', 'Hair Care', 'Medicines', 'First Aid', 'Bathroom Essentials', 
  'Laundry', 'Room Essentials', 'PG Essentials', 'Kitchen Essentials', 
  'Food & Snacks', 'Stationery', 'Office Joining', 'Finance', 'Travel', 
  'Emergency Kit', 'Important Contacts', 'Digital Assets', 'Vehicle Documents', 'Miscellaneous'
];

export function ItemFormDialog({ open, onOpenChange, itemToEdit, defaultPurchaseStatus = "Carry From Home" }: ItemFormDialogProps) {
  const { addItem, updateItem } = usePackStore();

  const [formData, setFormData] = useState<Partial<RelocationItem>>({
    name: "",
    category: "Miscellaneous",
    quantity: 1,
    estimatedWeight: 100,
    estimatedCost: 0,
    priority: "Medium",
    purchaseStatus: defaultPurchaseStatus,
    suggestedBag: "Check-in Bag",
    notes: ""
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    } else {
      setFormData({
        name: "",
        category: "Miscellaneous",
        quantity: 1,
        estimatedWeight: 100,
        estimatedCost: 0,
        priority: "Medium",
        purchaseStatus: defaultPurchaseStatus,
        suggestedBag: "Check-in Bag",
        notes: ""
      });
    }
  }, [itemToEdit, open, defaultPurchaseStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemToEdit) {
      updateItem(itemToEdit.id, formData);
    } else {
      addItem({
        ...(formData as RelocationItem),
        id: `custom-${Date.now()}`,
        isChecked: false,
        isFavorite: false,
        suggestedStores: [],
        subcategory: "Custom"
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-border/50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{itemToEdit ? "Edit Item" : "Add Custom Item"}</DialogTitle>
            <DialogDescription>
              {itemToEdit ? "Modify the details of your packing item." : "Add a new item to your packing list."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="col-span-3 bg-background/50" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <div className="col-span-3">
                <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val as ItemCategory})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bag" className="text-right">Bag</Label>
              <div className="col-span-3">
                <Select value={formData.suggestedBag} onValueChange={(val) => setFormData({...formData, suggestedBag: val as SuggestedBag})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Bag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cabin Bag">Cabin Bag</SelectItem>
                    <SelectItem value="Check-in Bag">Check-in Bag</SelectItem>
                    <SelectItem value="Handbag / Backpack">Handbag / Backpack</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qty" className="text-right">Quantity</Label>
              <Input 
                id="qty" 
                type="number" 
                min="1"
                value={formData.quantity} 
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                className="col-span-3 bg-background/50" 
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">Weight (g)</Label>
              <Input 
                id="weight" 
                type="number" 
                min="0"
                value={formData.estimatedWeight} 
                onChange={(e) => setFormData({...formData, estimatedWeight: parseInt(e.target.value) || 0})}
                className="col-span-3 bg-background/50" 
                placeholder="Per item weight in grams"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Purchase</Label>
              <div className="col-span-3">
                <Select value={formData.purchaseStatus} onValueChange={(val) => setFormData({...formData, purchaseStatus: val as PurchaseStatus})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Purchase Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carry From Home">Carry From Home</SelectItem>
                    <SelectItem value="Buy After Relocation">Buy After Relocation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
