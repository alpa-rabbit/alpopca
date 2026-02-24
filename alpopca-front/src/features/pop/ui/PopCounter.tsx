interface PopCounterProps {
  popCount: number;
}

export default function PopCounter({ popCount }: PopCounterProps) {
  return (
    <div className='text-center border-4 border-black bg-white/90 rounded-none p-4 min-w-[220px] md:min-w-80 w-auto inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
      <p className='text-3xl font-bold font-["Press_Start_2P"] text-black'>{popCount.toLocaleString()}</p>
      <p className='text-xl md:text-2xl font-bold font-["Press_Start_2P"] text-primary mt-2'>POPS</p>
    </div>
  );
}
