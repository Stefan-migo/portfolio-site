"use client"; // Context needs to be client-side

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CartItem, CartState, CartContextType, PrintOption } from '@/lib/types';

// Create the context with a default value (can be null or a default object)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Helper to find item index
  const findItemIndex = useCallback((productId: string, option: PrintOption) => {
    return items.findIndex(
      (item) => item.productId === productId &&
                 item.option.type === option.type &&
                 item.option.size === option.size &&
                 item.option.material === option.material // Compare relevant option fields
    );
  }, [items]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = findItemIndex(newItem.productId, newItem.option);

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
     console.log("Item added:", newItem, "Current Cart:", items); // Debug log
  }, [findItemIndex, items]); // Added items dependency

  const removeItem = useCallback((productId: string, option: PrintOption) => {
    setItems((prevItems) => {
      const itemIndexToRemove = findItemIndex(productId, option);
      if (itemIndexToRemove > -1) {
        return prevItems.filter((_, index) => index !== itemIndexToRemove);
      }
      return prevItems; // Return unchanged if not found
    });
  }, [findItemIndex]);

  const updateQuantity = useCallback((productId: string, option: PrintOption, quantity: number) => {
    setItems((prevItems) => {
      const itemIndexToUpdate = findItemIndex(productId, option);
      if (itemIndexToUpdate > -1) {
        const updatedItems = [...prevItems];
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return updatedItems.filter((_, index) => index !== itemIndexToUpdate);
        } else {
          updatedItems[itemIndexToUpdate] = {
            ...updatedItems[itemIndexToUpdate],
            quantity: quantity,
          };
          return updatedItems;
        }
      }
      return prevItems; // Return unchanged if not found
    });
  }, [findItemIndex]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemCount = useCallback((): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback((): number => {
    return items.reduce((total, item) => total + item.option.price * item.quantity, 0);
  }, [items]);

  // Value provided to consumers
  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the Cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
