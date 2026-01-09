import alpacaImage from '@/shared/assets/alpaca.png';
import alpacaPopImage from '@/shared/assets/alpaca_pop_out.png';

interface PopAreaProps {
  isPopping: boolean;
}

export default function PopArea({ isPopping }: PopAreaProps) {
  return (
    <div className="relative select-none bg-transparent w-full h-full flex items-center justify-center pointer-events-none px-4">
      <img
        src={isPopping ? alpacaPopImage : alpacaImage}
        alt={isPopping ? 'Alpaca popping' : 'Alpaca'}
        className="h-[70%] w-auto max-w-full object-contain transition-all duration-100"
        draggable={false}
      />
    </div>
  );
}
