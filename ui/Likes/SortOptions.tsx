// SortOptions.tsx (클라이언트 컴포넌트)
"use client";

interface SortOptionsProps {
  onSortChange: (sortOrder: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange }) => (
  <div className="flex justify-end">
    <div className="bg-white rounded-lg px-6 py-3 w-52">
      <div className="flex justify-between space-x-4">
        <button 
          className="text-sm font-medium cursor-pointer hover:text-blue-500" 
          onClick={() => onSortChange('abc')}
        >
          ABC순
        </button>
        <button 
          className="text-sm font-medium cursor-pointer hover:text-blue-500" 
          onClick={() => onSortChange('recent')}
        >
          최근저장순
        </button>
      </div>
    </div>
  </div>
);

export default SortOptions;