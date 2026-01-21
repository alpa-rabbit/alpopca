interface PopCounterProps {
  popCount: number;
}

export default function PopCounter({ popCount }: PopCounterProps) {
  return (
    <div className='text-center border border-white/30 bg-white/20 rounded-lg p-2 min-w-[200px] md:min-w-80 w-auto inline-block'>
      <p className='text-3xl font-black'>{popCount.toLocaleString()}</p>
      <p className='text-3xl font-black'>POPS</p>
    </div>
  );
}
