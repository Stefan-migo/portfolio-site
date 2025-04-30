// Removed "use client" - this is now a Server Component

import React from 'react';
import { getProductById, getProducts } from '@/lib/data'; // Keep data fetching
import { notFound } from 'next/navigation';
import { Product } from '@/lib/types'; // Import Product type
import ProductDetailsClient from '@/components/ProductDetailsClient'; // Import the new client component

interface ProductPageProps {
  params: {
    productId: string;
  };
}

// Function to generate static paths (now async)
export async function generateStaticParams() {
  const products: Product[] = await getProducts(); // Await the async function
  return products.map((product: Product) => ({ // Added explicit type
    productId: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) { // Make component async
  const product: Product | undefined = await getProductById(params.productId); // Await the data

  if (!product) {
    notFound(); // Trigger 404 if product not found
  }

  // Render the client component, passing the fetched product data
  return (
      <div className="container mx-auto px-4 py-8"> {/* Optional: Add container */}
        <ProductDetailsClient product={product} />
      </div>
  );
}
