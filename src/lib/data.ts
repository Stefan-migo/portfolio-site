import fs from 'fs'; // Keep for getP5ProjectFiles
import path from 'path'; // Keep for getP5ProjectFiles
import { supabase } from './supabaseClient'; // Import Supabase client
import { Artwork, Product, PrintOption } from './types'; // Import types

// Function to fetch all artworks from Supabase
export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false }); // Optional: order by creation date

  if (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }

  // Note: Supabase returns data that might need minor mapping if column names differ from types
  // or if JSONB needs parsing (though Supabase client often handles this).
  // For now, assume direct mapping works. Add specific mapping if needed.
  return data as Artwork[];
}

// Function to get a single artwork by its ID (slug) from Supabase
export async function getArtworkById(id: string): Promise<Artwork | undefined> {
    const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single(); // Use .single() to get one record or null

    if (error) {
        // Log error only if it's not the "No rows found" error
        if (error.code !== 'PGRST116') {
            console.error(`Error fetching artwork ${id}:`, error);
        }
        return undefined;
    }

    return data as Artwork || undefined;
}

// Function to read code files from a specific p5 project directory
export function getP5ProjectFiles(projectPath: string): { name: string; content: string; language: string }[] {
  const fullProjectPath = path.join(process.cwd(), 'src/p5-projects', projectPath);
  const files: { name: string; content: string; language: string }[] = [];

  try {
    // Check if directory exists
    if (!fs.existsSync(fullProjectPath) || !fs.lstatSync(fullProjectPath).isDirectory()) {
      console.warn(`P5 project directory not found: ${fullProjectPath}`);
      return [];
    }

    const filenames = fs.readdirSync(fullProjectPath);

    filenames.forEach(filename => {
      // Basic filtering - adjust as needed (e.g., ignore assets folder, non-code files)
      if (filename.endsWith('.js') || filename.endsWith('.html') || filename.endsWith('.css')) {
        const filePath = path.join(fullProjectPath, filename);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          let language = 'javascript'; // Default
          if (filename.endsWith('.html')) language = 'html';
          if (filename.endsWith('.css')) language = 'css';

          files.push({ name: filename, content, language });
        } catch (readError) {
          console.error(`Error reading file ${filePath}:`, readError);
        }
      }
    });

    // Optional: Sort files (e.g., sketch.js first)
    files.sort((a, b) => {
        if (a.name === 'sketch.js') return -1;
        if (b.name === 'sketch.js') return 1;
        return a.name.localeCompare(b.name);
    });


  } catch (error) {
    console.error(`Error reading p5 project directory ${fullProjectPath}:`, error);
    return []; // Return empty array on error
  }

  return files;
}


// --- Product Data Functions (using Supabase) ---

// Function to fetch all products and their print options from Supabase
export async function getProducts(): Promise<Product[]> {
  // 1. Fetch all products
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (productsError) {
    console.error("Error fetching products:", productsError);
    return [];
  }
  if (!productsData) {
    return [];
  }

  // 2. Fetch all print options (can be optimized later if needed)
  const { data: optionsData, error: optionsError } = await supabase
    .from('print_options')
    .select('*');

  if (optionsError) {
    console.error("Error fetching print options:", optionsError);
    // Decide how to handle: return products without options, or return empty array?
    // Let's return products without options for now, but log the error.
  }

  // 3. Combine products with their options
  const productsWithOpts = productsData.map(product => {
    const options = optionsData?.filter(opt => opt.product_id === product.id) || [];
    return {
      ...product,
      printOptions: options as PrintOption[], // Cast assuming structure matches
    } as Product; // Cast assuming product structure matches
  });

  return productsWithOpts;
}

// Function to get a single product by its ID (slug) and its print options from Supabase
export async function getProductById(id: string): Promise<Product | undefined> {
    // 1. Fetch the product
    const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (productError) {
        if (productError.code !== 'PGRST116') { // Ignore "No rows found"
            console.error(`Error fetching product ${id}:`, productError);
        }
        return undefined;
    }
     if (!productData) {
        return undefined;
    }

    // 2. Fetch the print options for this product
    const { data: optionsData, error: optionsError } = await supabase
        .from('print_options')
        .select('*')
        .eq('product_id', id);

     if (optionsError) {
        console.error(`Error fetching print options for product ${id}:`, optionsError);
        // Return product data even if options fail? Or return undefined?
        // Let's return the product but with empty options array and log error.
        return {
            ...productData,
            printOptions: []
        } as Product;
    }

    // 3. Combine and return
    return {
        ...productData,
        printOptions: optionsData as PrintOption[] || []
    } as Product;
}
