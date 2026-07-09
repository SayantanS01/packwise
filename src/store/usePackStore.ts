import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RelocationItem, BaggageProfile, TravelDetails, BudgetCategory } from '@/types';
import { PRELOADED_ITEMS } from '@/data/items';

interface PackStoreState {
  items: RelocationItem[];
  baggageProfiles: BaggageProfile[];
  activeProfileIndex: number;
  travelDetails: TravelDetails | null;
  budgetCategories: BudgetCategory[];
  
  // Actions for Items
  addItem: (item: RelocationItem) => void;
  updateItem: (id: string, updates: Partial<RelocationItem>) => void;
  deleteItem: (id: string) => void;
  toggleItemCheck: (id: string) => void;
  toggleItemFavorite: (id: string) => void;
  setItems: (items: RelocationItem[]) => void;
  
  // Actions for Baggage Profiles
  addBaggageProfile: (profile: BaggageProfile) => void;
  updateBaggageProfile: (index: number, updates: Partial<BaggageProfile>) => void;
  setActiveProfileIndex: (index: number) => void;

  // Actions for Travel & Budget
  setTravelDetails: (details: TravelDetails) => void;
  setBudgetCategories: (categories: BudgetCategory[]) => void;
  updateBudgetCategory: (name: string, spent: number) => void;
}

export const usePackStore = create<PackStoreState>()(
  persist(
    (set) => ({
      items: PRELOADED_ITEMS,
      baggageProfiles: [
        { name: 'IndiGo', cabinAllowance: 7, checkInAllowance: 15, numberOfBags: 1 },
        { name: 'Air India', cabinAllowance: 7, checkInAllowance: 15, numberOfBags: 1 },
        { name: 'Akasa Air', cabinAllowance: 7, checkInAllowance: 15, numberOfBags: 1 },
        { name: 'SpiceJet', cabinAllowance: 7, checkInAllowance: 15, numberOfBags: 1 },
        { name: 'Vistara', cabinAllowance: 7, checkInAllowance: 15, numberOfBags: 1 },
      ],
      activeProfileIndex: 0,
      travelDetails: null,
      budgetCategories: [
        { name: 'Travel Cost', allocated: 10000, spent: 0 },
        { name: 'Rent & Deposit', allocated: 50000, spent: 0 },
        { name: 'Food', allocated: 10000, spent: 0 },
        { name: 'Shopping', allocated: 20000, spent: 0 },
        { name: 'Furniture', allocated: 15000, spent: 0 },
        { name: 'Transport', allocated: 5000, spent: 0 },
        { name: 'Emergency', allocated: 10000, spent: 0 },
      ],

      addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      deleteItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      toggleItemCheck: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, isChecked: !i.isChecked } : i
          ),
        })),
      toggleItemFavorite: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, isFavorite: !i.isFavorite } : i
          ),
        })),
      setItems: (items) => set({ items }),

      addBaggageProfile: (profile) =>
        set((state) => ({ baggageProfiles: [...state.baggageProfiles, profile] })),
      updateBaggageProfile: (index, updates) =>
        set((state) => {
          const newProfiles = [...state.baggageProfiles];
          newProfiles[index] = { ...newProfiles[index], ...updates };
          return { baggageProfiles: newProfiles };
        }),
      setActiveProfileIndex: (index) => set({ activeProfileIndex: index }),

      setTravelDetails: (details) => set({ travelDetails: details }),
      setBudgetCategories: (categories) => set({ budgetCategories: categories }),
      updateBudgetCategory: (name, spent) =>
        set((state) => ({
          budgetCategories: state.budgetCategories.map((c) =>
            c.name === name ? { ...c, spent } : c
          ),
        })),
    }),
    {
      name: 'packwise-storage', // unique name
      version: 5, // bumped to 5 for master list migration
      migrate: (persistedState: any, version: number) => {
        if (version < 5) {
          const currentItems = persistedState.items || [];
          const currentNames = new Set(currentItems.map((i: any) => i.name));
          const newItems = PRELOADED_ITEMS.filter((i: any) => !currentNames.has(i.name));
          
          return {
            ...persistedState,
            items: [...currentItems, ...newItems],
          };
        }
        return persistedState;
      },
    }
  )
);
