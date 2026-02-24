import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface PixelatedImageProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  src: string;
  pixelFactor?: number;
  alt?: string;
}

export function PixelatedImage({ src, pixelFactor = 5, className, alt, ...props }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      // Calculate new dimensions (downscaled)
      // Example: 1000px width / factor 10 = 100px canvas
      // This forces the loss of detail
      const w = img.width / pixelFactor;
      const h = img.height / pixelFactor;

      canvas.width = w;
      canvas.height = h;

      // Draw loaded image to smaller canvas
      ctx.drawImage(img, 0, 0, w, h);
    };
  }, [src, pixelFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'w-full h-full object-contain',
        // Important: this CSS class ensures the small canvas is scaled up with nearest-neighbor interpolation
        'pixelated',
        className
      )}
      style={{ imageRendering: 'pixelated' }}
      aria-label={alt}
      {...props}
    />
  );
}
