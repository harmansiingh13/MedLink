export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black/60 to-gray-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col items-center">
        <div className="absolute w-40 h-40 border-[8px] border-primary/20 rounded-full animate-[ping_2s_ease-in-out_infinite]"></div>

        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-[8px] border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-[8px] border-t-primary border-r-primary rounded-full animate-[spin_1.5s_linear_infinite]"></div>
        </div>

        <p className="mt-7 text-white/90 font-semibold tracking-wide text-lg uppercase animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
};
