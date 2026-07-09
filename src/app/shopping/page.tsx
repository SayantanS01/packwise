"use client";

import { useState } from "react";
import { usePackStore } from "@/store/usePackStore";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MapPin, IndianRupee, Plus, Trash2, Edit2, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemFormDialog } from "@/components/ItemFormDialog";
import { RelocationItem } from "@/types";

export default function ShoppingPage() {
  const { items, toggleItemCheck, updateItem, deleteItem } = usePackStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<RelocationItem | null>(null);

  const shoppingItems = items.filter(i => i.purchaseStatus === 'Buy After Relocation');
  const pendingItems = shoppingItems.filter(i => !i.isChecked);
  const purchasedItems = shoppingItems.filter(i => i.isChecked);

  const estimatedTotalCost = shoppingItems.reduce((acc, i) => acc + (i.estimatedCost * i.quantity), 0);
  const spentCost = purchasedItems.reduce((acc, i) => acc + (i.estimatedCost * i.quantity), 0);
  const remainingCost = estimatedTotalCost - spentCost;

  const handleOpenAddModal = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: RelocationItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const resetPurchased = () => {
    purchasedItems.forEach(item => updateItem(item.id, { isChecked: false }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Planner</h1>
          <p className="text-muted-foreground">Track items you need to buy after relocating.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetPurchased} className="bg-background/50 premium-shadow">
            <RotateCcw className="mr-2 size-4" /> Reset Purchased
          </Button>
          <Button onClick={handleOpenAddModal} className="premium-shadow">
            <Plus className="mr-2 size-4" /> Add Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 shrink-0">
        <Card className="glass-card premium-shadow">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Total</CardTitle>
            <div className="text-2xl font-bold">₹{estimatedTotalCost.toLocaleString()}</div>
          </CardHeader>
        </Card>
        <Card className="glass-card premium-shadow">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spent So Far</CardTitle>
            <div className="text-2xl font-bold text-emerald-500">₹{spentCost.toLocaleString()}</div>
          </CardHeader>
        </Card>
        <Card className="glass-card premium-shadow">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Budget</CardTitle>
            <div className="text-2xl font-bold text-amber-500">₹{remainingCost.toLocaleString()}</div>
          </CardHeader>
        </Card>
      </div>

      <div className="glass-card rounded-xl border border-border/50 flex-1 overflow-hidden flex flex-col premium-shadow">
        <div className="bg-muted/20 p-4 border-b border-border/50 font-medium flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-4" />
            <span>Shopping List ({shoppingItems.length})</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
          <div className="divide-y divide-border/50">
            {shoppingItems.map(item => (
              <div key={item.id} className={`group flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${item.isChecked ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-4 flex-1">
                  <Checkbox 
                    checked={item.isChecked} 
                    onCheckedChange={() => toggleItemCheck(item.id)}
                    className="mt-1 size-5 rounded-md border-border/50"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}>{item.name}</span>
                      <span className="font-semibold flex items-center text-sm ml-auto pr-4">
                        <IndianRupee className="size-3 mr-0.5" />
                        {(item.estimatedCost * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Qty: {item.quantity}</span>
                      {item.suggestedStores.length > 0 && (
                        <span className="flex items-center gap-1 text-primary/80">
                          <MapPin className="size-3" /> {item.suggestedStores.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pl-4 border-l border-border/50 ml-4">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => handleOpenEditModal(item)}>
                    <Edit2 className="size-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            {shoppingItems.length === 0 && (
              <div className="p-12 flex flex-col items-center justify-center space-y-4">
                <div className="text-muted-foreground">
                  {items.length === 0 ? "Your shopping list is empty." : "No items to buy! You can add some above."}
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
        defaultPurchaseStatus="Buy After Relocation"
      />
    </div>
  );
}
