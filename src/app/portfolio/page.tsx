import React from 'react';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image for thumbnails
import { getArtworks } from '@/lib/data'; // Import data fetching function
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components
import { Badge } from "@/components/ui/badge"; // Import Badge for tags
import { Artwork } from '@/lib/types'; // Import Artwork type

export default async function PortfolioPage() { // Make component async
  const artworks: Artwork[] = await getArtworks(); // Await the data fetching

  return (
    <div className="container mx-auto px-4 py-8"> {/* Added container styling */}
      <h1 className="text-3xl font-bold mb-8 text-center">Artwork Portfolio</h1> {/* Centered title */}
      {artworks.length === 0 ? (
        (<p className="text-center text-muted-foreground">No artworks found.</p>) // Improved styling
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((artwork: Artwork) => ( // Added explicit type for artwork
            (<Link key={artwork.id} href={`/portfolio/${artwork.id}`} legacyBehavior passHref>
              <a className="block group">
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"> {/* Added hover effect */}
                  <CardHeader className="p-0 relative aspect-video">
                    {artwork.thumbnailUrl ? (
                      <Image
                        src={artwork.thumbnailUrl}
                        alt={artwork.title}
                        fill // Use fill for responsive aspect ratio
                        style={{ objectFit: 'cover' }} // Use style prop for objectFit with fill
                        className="transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Example sizes
                      />
                    ) : (
                      <div className="bg-muted flex items-center justify-center h-full">
                        <span className="text-muted-foreground text-sm">No Image</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors"> {/* Added hover effect */}
                      {artwork.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {artwork.description}
                    </CardDescription>
                     <p className="text-xs text-muted-foreground">{artwork.date}</p> {/* Moved date here */}
                  </CardContent>
                  <CardFooter className="p-4 pt-0"> {/* Adjusted padding */}
                    {artwork.tags && artwork.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {artwork.tags.slice(0, 3).map((tag: string) => ( // Added explicit type for tag
                          (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>) // Restored variant
                        ))}
                      </div>
                    )}
                     {/* Removed type display from footer */}
                  </CardFooter>
                </Card>
              </a>
            </Link>)
          ))}
        </div>
      )}
    </div>
  );
}
