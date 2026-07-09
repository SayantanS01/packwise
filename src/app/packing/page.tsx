"use client";

import { useState } from "react";
import { usePackStore } from "@/store/usePackStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, ArrowUpDown, Trash2, Edit2, Minus, PlusCircle, MinusCircle, Tag, Package, Briefcase } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ItemFormDialog } from "@/components/ItemFormDialog";
import { RelocationItem } from "@/types";

export default function PackingPage() {
  const { items, toggleItemCheck, updateItem, deleteItem } = usePackStore();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<RelocationItem | null>(null);

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          (item.subcategory && item.subcategory.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: RelocationItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packing List</h1>
          <p className="text-muted-foreground">Manage your items and track your packing progress.</p>
        </div>
        <Button onClick={handleOpenAddModal} className="shrink-0 premium-shadow">
          <Plus className="mr-2 size-4" /> Add Custom Item
        </Button>
      </div>

      <div className="glass-card p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center premium-shadow">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search items..." 
            className="pl-10 bg-background/50 border-border/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={(val) => setFilterCategory(val || "All")}>
          <SelectTrigger className="w-full sm:w-[200px] bg-background/50 border-border/50">
            <Filter className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full sm:w-auto bg-background/50 border-border/50">
          <ArrowUpDown className="mr-2 size-4" /> Sort
        </Button>
      </div>

      <div className="glass-card rounded-xl border border-border/50 flex-1 overflow-hidden flex flex-col premium-shadow">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 font-medium text-sm text-muted-foreground">
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-4 lg:col-span-3">Item Name</div>
          <div className="col-span-2 hidden md:block">Category</div>
          <div className="col-span-2 hidden lg:block">Bag</div>
          <div className="col-span-2 md:col-span-1 text-center">Qty</div>
          <div className="col-span-3 md:col-span-2 text-right">Actions</div>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
          <div className="divide-y divide-border/50">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className={`group grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-muted/30 ${item.isChecked ? 'opacity-50' : ''}`}
              >
                <div className="col-span-1 flex justify-center">
                  <Checkbox 
                    checked={item.isChecked} 
                    onCheckedChange={() => toggleItemCheck(item.id)}
                    className="size-5 rounded-full data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all"
                  />
                </div>
                <div className="col-span-4 lg:col-span-3 flex flex-col">
                  <span className={`font-medium ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}>
                    {item.name}
                  </span>
                  {item.priority === 'High' && !item.isChecked && (
                    <Badge variant="destructive" className="w-fit mt-1 text-[10px] h-4 px-1.5 rounded-sm">High Priority</Badge>
                  )}
                </div>
                <div className="col-span-2 hidden md:block">
                  <Badge variant="outline" className="text-xs font-normal bg-background/50">
                    {item.category}
                  </Badge>
                </div>
                <div className="col-span-2 hidden lg:block text-sm text-muted-foreground">
                  {item.suggestedBag}
                </div>
                <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2">
                  <button 
                    onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MinusCircle className="size-4" />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <PlusCircle className="size-4" />
                  </button>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => handleOpenEditModal(item)}>
                    <Edit2 className="size-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="p-12 flex flex-col items-center justify-center space-y-4">
                <div className="text-muted-foreground">
                  {items.length === 0 ? "Your packing list is empty." : "No items found matching your filters."}
                </div>
                {items.length === 0 && (
                  <Button 
                    onClick={async () => {
                      const { PRELOADED_ITEMS } = await import('@/data/items');
                      const store = usePackStore.getState();
                      const currentNames = new Set(store.items.map((i) => i.name));
                      const newItems = PRELOADED_ITEMS.filter((i: any) => !currentNames.has(i.name));
                      store.setItems([...store.items, ...newItems]);
                    }} 
                    variant="outline" 
                    className="premium-shadow text-emerald-500 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20"
                  >
                    Load Master Item Database
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ItemFormDialog 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        itemToEdit={itemToEdit} 
      />
    </div>
  );
}
