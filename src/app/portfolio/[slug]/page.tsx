import React from 'react';
import { getArtworkById, getArtworks, getP5ProjectFiles } from '@/lib/data'; // Import data fetching functions
import { notFound } from 'next/navigation'; // Import notFound for handling missing artwork
import Image from 'next/image'; // For displaying images
import P5Runner from '@/components/P5Runner'; // Re-add static import
import CodeViewer from '@/components/CodeViewer'; // Re-add static import
// import dynamic from 'next/dynamic'; // Remove dynamic import
// import ArtworkP5Display from '@/components/ArtworkP5Display'; // Remove wrapper import
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Import Resizable components
import { Badge } from "@/components/ui/badge"; // Import Badge component
import { Artwork } from '@/lib/types'; // Import Artwork type

// Define params type for type safety
interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

// Function to generate static paths for SSG (optional but good practice)
export async function generateStaticParams() {
  // Now async as getArtworks is async
  const artworks: Artwork[] = await getArtworks();
  return artworks.map((artwork: Artwork) => ({ // Added explicit type
    slug: artwork.id,
  }));
}

export default async function ArtworkPage({ params }: ArtworkPageProps) { // Make component async
  const slug = params.slug; // Extract slug before await
  const artwork: Artwork | undefined = await getArtworkById(slug); // Use the extracted slug

  // Handle case where artwork is not found
  if (!artwork) {
    notFound(); // Trigger a 404 page
  }

  // Function to render content based on type
  const renderArtworkContent = () => {
    switch (artwork.type) {
      case 'image':
        return artwork.sourceUrl ? (
          <div className="relative aspect-video w-full max-w-4xl mx-auto mb-6">
             <Image
               src={artwork.sourceUrl}
               alt={artwork.title}
               layout="fill"
               objectFit="contain" // Use contain to show the whole image
             />
          </div>
        ) : <p>Image source not available.</p>;
      case 'sound':
        return artwork.sourceUrl ? (
          <audio controls src={artwork.sourceUrl} className="w-full mb-6">
            Your browser does not support the audio element.
          </audio>
        ) : <p>Audio source not available.</p>;
      case 'video':
        return artwork.sourceUrl ? (
          <video controls src={artwork.sourceUrl} className="w-full max-w-4xl mx-auto mb-6">
            Your browser does not support the video tag.
          </video>
        ) : <p>Video source not available.</p>;
      case 'embed':
         return artwork.sourceUrl ? (
          <iframe
            src={artwork.sourceUrl}
            className="w-full aspect-video max-w-4xl mx-auto mb-6"
            allowFullScreen
            title={artwork.title}
          ></iframe>
        ) : <p>Embed source not available.</p>;
      case 'p5': {
        if (!artwork.p5projectPath) {
          return <p className="mb-6">p5 project path not specified.</p>;
        }
        const codeFiles = getP5ProjectFiles(artwork.p5projectPath);
        // Construct the sketch path relative to the p5-projects directory
        const sketchPath = `${artwork.p5projectPath}/sketch.js`;

        // Render P5Runner and CodeViewer directly again
        return (
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg mb-8 min-h-[400px] max-h-[70vh] bg-card"
          >
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-1 bg-muted/50 rounded-l-lg">
                <P5Runner sketchPath={sketchPath} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-border" />
            <ResizablePanel defaultSize={40}>
               <div className="flex h-full items-center justify-center overflow-hidden rounded-r-lg">
                 <CodeViewer files={codeFiles} defaultTab="sketch.js" />
               </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        );
      }
      default:
        return <p>Unsupported artwork type.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl"> {/* Added container and max-width */}
      {/* Render the main artwork content */}
      {renderArtworkContent()}

      {/* Details Section */}
      <div className="mt-8"> {/* Added margin-top */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{artwork.title}</h1>
        <p className="text-md text-muted-foreground mb-4">{artwork.date}</p>
        <p className="mb-6 text-foreground/90">{artwork.description}</p> {/* Slightly less prominent description */}

        {/* Display Tags using Badge */}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {artwork.tags.map((tag: string) => (
               <Badge key={tag} variant="outline" className="text-xs font-normal border-muted-foreground/50 text-muted-foreground">{tag}</Badge> // Use outline badge
            ))}
          </div>
        )}

        {/* Display other details like dimensions if available */}
        {artwork.dimensions && (
         <p className="text-sm text-muted-foreground mt-4"> {/* Added margin-top */}
           Dimensions: {artwork.dimensions.width} x {artwork.dimensions.height} {artwork.dimensions.unit}
         </p>
        )}
        {/* Add more details as needed */}
      </div>
      {/* Removed stray closing brace from previous attempts */}
    </div>
  );
}
