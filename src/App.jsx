import { useEffect, useState } from "react";


export default function App() {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") callNextNumber();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calledNumbers]);

  const callNextNumber = () => {
    if (calledNumbers.length >= 90) return;

    let next;
    do {
      next = Math.floor(Math.random() * 90) + 1;
    } while (calledNumbers.includes(next));

    setCalledNumbers([...calledNumbers, next]);
    setCurrentNumber(next);
  };
  const resetGame = () => {
    setCalledNumbers([]);
    setCurrentNumber(null);
  };


  return (
    <div className="min-h-screen overflow-hidden scrollbar-hide bg-white text-[#ff5309] flex flex-col items-center justify-between pt-4">
      {/* Header */}
      <div className="px-8 w-full flex justify-between items-center text-sm font-semibold">
        <span className="text-[#ff5309] font-bold text-lg">Tammbola</span>
        <div className="flex items-center gap-4">
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-md border bg-[#ff5309] text-white hover:scale-105 transistion duration-300 hover:text-white transition focus:outline-none  text-xs md:text-sm"
          >
            Reset
          </button>
          <a
            href="https://github.com/hemanthk04/tammbola"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:scale-105 transistion duration-300"
          >
            <span className="underline underline-offset-2">GitHub</span> ↗
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center  justify-center w-full mx-auto mt-8 px-4">
        {/* //new number space */}
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-8 md:border-[12px] border-gray-200 flex items-center justify-center">
            <span className="text-8xl md:text-[12rem] font-semibold">
              {currentNumber ?? "--"}
            </span>
          </div>
          {isTouchDevice ? (
            <button
              onClick={callNextNumber}
              className="mt-4 px-8 py-2 bg-[#ff5309] text-white rounded-md text-sm font-semibold shadow-md focus:outline-none active:scale-95 hover:scale-105 transition"
            >
              Call Next Number
            </button>
          ) : (
            <p className="mt-4 text-gray-500 text-sm">
              click Enter ⏎ for the Next Number
            </p>
          )}
        </div>

        {/* Number Grid */}
        <div className="grid grid-cols-10 gap-2 md:gap-3 mt-8">
          {[...Array(90)].map((_, i) => {
            const num = i + 1;
            const isCalled = calledNumbers.includes(num);
            return (
              <div
                key={num}
                className={`w-6 h-6 md:w-10 md:h-10 rounded-full text-xs md:text-base flex items-center justify-center font-medium ${
                  isCalled
                    ? "bg-[#ff5309] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>
      {/* Current Number Display */}

      {/* Bottom Bar */}
      <div className="w-full h-12 md:h-16 bg-[#ff5309] text-white font-semibold flex items-center justify-center mt-10">
        made by Hemanth Kapalavai
      </div>
    </div>
  );
}
