// store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartGearItem {
  gearItemId: string;
  title: string;
  brand: string;
  pricePerDay: number;
  availableStock: number;
  quantity: number;
}

interface CartStore {
  startDate: string | null; // ISO string format
  endDate: string | null;   // ISO string format
  rentalItems: CartGearItem[];
  
  // Actions
  setRentalDates: (startDate: string | null, endDate: string | null) => void;
  addItem: (item: Omit<CartGearItem, 'quantity'>, quantity?: number) => void;
  incrementQuantity: (gearItemId: string) => void;
  decrementQuantity: (gearItemId: string) => void;
  removeItem: (gearItemId: string) => void;
  clearCart: () => void;
  
  // Calculations
  getTotalDays: () => number;
  calculateTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      startDate: null,
      endDate: null,
      rentalItems: [],

      setRentalDates: (startDate, endDate) => set({ startDate, endDate }),

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.rentalItems.findIndex(
            (i) => i.gearItemId === item.gearItemId
          );

          if (existingIndex > -1) {
            const updated = [...state.rentalItems];
            const newQty = updated[existingIndex].quantity + quantity;
            // Respect available stock limit
            updated[existingIndex].quantity = Math.min(newQty, item.availableStock);
            return { rentalItems: updated };
          }

          return {
            rentalItems: [...state.rentalItems, { ...item, quantity: Math.min(quantity, item.availableStock) }],
          };
        });
      },

      incrementQuantity: (gearItemId) => {
        set((state) => ({
          rentalItems: state.rentalItems.map((item) => {
            if (item.gearItemId === gearItemId) {
              const nextQty = item.quantity + 1;
              return { ...item, quantity: Math.min(nextQty, item.availableStock) };
            }
            return item;
          }),
        }));
      },

      decrementQuantity: (gearItemId) => {
        set((state) => ({
          rentalItems: state.rentalItems
            .map((item) => {
              if (item.gearItemId === gearItemId) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
            .filter((item) => item.quantity > 0), // Remove if quantity drops to 0
        }));
      },

      removeItem: (gearItemId) => {
        set((state) => ({
          rentalItems: state.rentalItems.filter((i) => i.gearItemId !== gearItemId),
        }));
      },

      clearCart: () => set({ rentalItems: [], startDate: null, endDate: null }),

      getTotalDays: () => {
        const { startDate, endDate } = get();
        if (!startDate || !endDate) return 1; // Default fallback to 1 day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days === 0 ? 1 : days;
      },

      calculateTotalPrice: () => {
        const { rentalItems } = get();
        const totalDays = get().getTotalDays();
        
        return rentalItems.reduce((acc, item) => {
          return acc + item.pricePerDay * item.quantity * totalDays;
        }, 0);
      },
    }),
    {
      name: 'rental-cart-storage',
    }
  )
);