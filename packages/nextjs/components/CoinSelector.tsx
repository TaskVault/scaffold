import React, { useState } from 'react';

interface CoinSelectorProps {
  initialValue: number;
  maxValue: number;
  coinName: string;
}

const CoinSelector: React.FC<CoinSelectorProps> = ({ initialValue, maxValue, coinName }) => {
  const [value, setValue] = useState<number>(initialValue);
  const [progress, setProgress] = useState<number>((initialValue / maxValue) * 100);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);
    setValue((newProgress / 100) * maxValue);
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex items-center space-x-2">
        <img src="/ethlogo.png" alt="ETH" className="w-8 h-8 rounded-full" />
        <div className="grid grid-cols-1">
          <span className="text-lg font-semibold">{maxValue}</span>
          <span className="text-lg font-light">{coinName}</span>
        </div>
      </div>

      <input 
        type="range" 
        min={0} 
        max="100" 
        value={progress} 
        onChange={handleRangeChange} 
        className="range range-primary flex-1 w-48" 
      />

      

      <span className="text-lg font-semibold">{value.toFixed(1)}</span>
    </div>
  );
};

export default CoinSelector;