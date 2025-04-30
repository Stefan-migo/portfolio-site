import React from 'react';
import { getArtworkById, getArtworks, getP5ProjectFiles } from '@/lib/data'; // Import data fetching functions
import { notFound } from 'next/navigation'; // Import notFound for handling missing artwork
import Image from 'next/image'; // For displaying images
import P5Runner from '@/components/P5Runner'; // Import P5Runner
import CodeViewer from '@/components/CodeViewer'; // Import CodeViewer
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Import Resizable components

// Define params type for type safety
interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

import { Artwork } from '@/lib/types'; // Import Artwork type

// Function to generate static paths for SSG (optional but good practice)
export async function generateStaticParams() {
  // Now async as getArtworks is async
  const artworks: Artwork[] = await getArtworks();
  return artworks.map((artwork: Artwork) => ({ // Added explicit type
    slug: artwork.id,
  }));
}

export default async function ArtworkPage({ params }: ArtworkPageProps) { // Make component async
  const artwork: Artwork | undefined = await getArtworkById(params.slug); // Await the result

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
        // Construct a representative path for P5Runner (actual loading logic is TODO in P5Runner)
        const sketchPath = `${artwork.p5projectPath}/sketch.js`;

        return (
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border mb-6 min-h-[400px] max-h-[70vh]" // Added min/max height
          >
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-1">
                {/* P5Runner will eventually load the sketch based on sketchPath */}
                <P5Runner sketchPath={sketchPath} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
               <div className="flex h-full items-center justify-center">
                 {/* CodeViewer displays the fetched files */}
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
    <div>
      {/* Render the main artwork content */}
      {renderArtworkContent()}
      {/* Display Artwork Details */}
      <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
      <p className="text-lg text-muted-foreground mb-4">{artwork.date}</p>
      <p className="mb-6">{artwork.description}</p>
      {/* Display Tags */}
      {artwork.tags && artwork.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {artwork.tags.map((tag: string) => ( // Added explicit type
            (<span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
              {tag}
            </span>)
            // Could use Shadcn Badge here too if preferred
          ))}
        </div>
      )}
      {/* Display other details like dimensions if available */}
      {artwork.dimensions && (
         <p className="text-sm text-muted-foreground">
           Dimensions: {artwork.dimensions.width} x {artwork.dimensions.height} {artwork.dimensions.unit}
         </p>
      )}
      {/* Add more details as needed */}
    </div>
  );
}
