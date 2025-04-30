// Defines the structure for artwork metadata

export type ArtworkType =
  | 'image'
  | 'sound'
  | 'video'
  | 'embed' // For embedding external content like YouTube, Vimeo, Figma
  | 'p5'; // For interactive p5.js projects hosted locally

export interface Artwork {
  id: string; // Unique identifier (e.g., slug)
  title: string;
  description: string;
  date: string; // e.g., "2024-04-29" or "2024"
  type: ArtworkType;
  tags?: string[]; // Optional tags/categories
  thumbnailUrl: string; // URL or path to the thumbnail image

  // Type-specific properties
  sourceUrl?: string; // URL for image, sound, video, embed source
  p5projectPath?: string; // Path within src/p5-projects/ for 'p5' type (e.g., "my-cool-sketch")
  dimensions?: { // Optional dimensions for physical or digital art
    width: number;
    height: number;
    unit: 'px' | 'cm' | 'in';
  };
  // Add other relevant fields as needed (e.g., medium, software used)
}

// Example (can be removed later):
// const exampleArtwork: Artwork = {
//   id: 'abstract-flow',
//   title: 'Abstract Flow',
//   description: 'A generative artwork exploring fluid dynamics.',
//   date: '2024-03-15',
//   type: 'p5',
//   tags: ['generative', 'abstract', 'p5js'],
//   thumbnailUrl: '/thumbnails/abstract-flow.jpg',
//   p5projectPath: 'abstract-flow-sketch',
// };


// Defines the structure for Print-on-Demand products
export interface PrintOption {
  type: string; // e.g., "Fine Art Print", "Canvas", "T-Shirt"
  size: string; // e.g., "A4", "12x18in", "Large"
  material?: string; // e.g., "Matte Paper", "Glossy Canvas"
  price: number; // Price in a specific currency (consider adding currency field later)
  providerProductId?: string; // ID from the POD provider if applicable
}

export interface Product {
  id: string; // Unique identifier (e.g., slug)
  title: string; // Product title (might differ slightly from artwork title)
  description: string;
  linkedArtworkId: string; // ID of the artwork this product is based on
  printOptions: PrintOption[]; // Array of available print types/sizes/prices
  mockupImageUrls: string[]; // URLs or paths to product mockup images
  tags?: string[]; // Optional tags (e.g., "print", "merch")
}

// Example (can be removed later):
// const exampleProduct: Product = {
//   id: 'cosmic-bloom-print-a4',
//   title: 'Cosmic Bloom - Fine Art Print (A4)',
//   description: 'High-quality A4 print of the Cosmic Bloom artwork.',
//   linkedArtworkId: 'cosmic-bloom',
//   printOptions: [
//     { type: 'Fine Art Print', size: 'A4', material: 'Matte Paper', price: 25.00 },
//     { type: 'Fine Art Print', size: 'A3', material: 'Matte Paper', price: 40.00 }
//   ],
//   mockupImageUrls: ['/images/mockups/cosmic-bloom-print1.jpg', '/images/mockups/cosmic-bloom-print2.jpg'],
//   tags: ['print', 'fine art']
// };


// --- Cart Types ---

export interface CartItem {
  productId: string; // ID of the product
  title: string; // Product title (for display)
  option: PrintOption; // The specific selected print option (type, size, price, etc.)
  quantity: number;
  mockupImageUrl?: string; // Optional image for display in cart
}

export interface CartState {
  items: CartItem[];
  // Add other cart-related state if needed (e.g., total items, total price)
}

// Define the shape of the context value
export interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, option: PrintOption) => void; // Need both to identify unique item
  updateQuantity: (productId: string, option: PrintOption, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}
