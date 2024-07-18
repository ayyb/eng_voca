// SortOptions.tsx (클라이언트 컴포넌트)
"use client";

interface SortOptionsProps {
  onSortChange: (sortOrder: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange }) => (
  <div className="bg-white flex w-1/2 ml-auto p-3 justify-between">
    <p className="font-bold cursor-pointer" onClick={() => onSortChange('abc')}>ABC순</p>
    <p className="font-bold cursor-pointer" onClick={() => onSortChange('recent')}>최근저장순</p>
  </div>
);

export default SortOptions;