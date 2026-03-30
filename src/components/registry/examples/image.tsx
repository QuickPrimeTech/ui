import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image } from "@/components/ui/image";

type Image = {
  title: string;
  description: string;
  src: string | null;
  lqip: string | null;
};

const images: Image[] = [
  {
    title: "Image with lqip",
    description: "This is an image with a low quality placeholder",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1765984117/ziwa-restaurant/eldoret/menu-items/hmpmvym4weszxx0ohh4e.jpg",
    lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgAG/8QAGBAAAwEBAAAAAAAAAAAAAAAAAAECEQP/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AzESsD0lYUt4Ho3gCf//Z",
  },
  {
    title: "Image without lqip",
    description: "A skeleton will be shown when lqip is not provided",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1765984117/ziwa-restaurant/eldoret/menu-items/hmpmvym4weszxx0ohh4e.jpg",
    lqip: null,
  },
  {
    title: "Image with a wrong source",
    description: "A fallback will be shown ",
    src: null,
    lqip: null,
  },
];

export default function ImageCards() {
  return (
    <>
      {images.map((image) => (
        <Card key={image.title} className="py-0 flex-col-reverse pb-3">
          <CardHeader>
            <CardTitle>{image.title}</CardTitle>
            <CardDescription>{image.description}</CardDescription>
          </CardHeader>
          <CardContent className="relative h-full px-0 aspect-video">
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder={image.lqip ? "blur" : "empty"}
              blurDataURL={image.lqip ?? undefined}
              className="object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
