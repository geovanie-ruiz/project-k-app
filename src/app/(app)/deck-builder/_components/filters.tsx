export interface Filters {
  runeFilters: string[];
  cardTypeFilters: string[];
  mightFilters: string[]; // Multi-select for might
  costFilters: string[]; // Multi-select for cost
  runeCostFilters: string[]; // Multi-select for rune cost
}

interface FiltersProps {
  filters: Filters;
  toggleRuneFilter: (filter: string) => void;
  toggleCardType: (filter: string) => void;
  toggleMightFilter: (value: string) => void;
  toggleCostFilter: (value: string) => void;
  toggleRuneCostFilter: (value: string) => void;
  clearAllCardTypes: () => void;
}

export function FiltersComponent({
  filters,
  toggleRuneFilter,
  toggleCardType,
  toggleMightFilter,
  toggleCostFilter,
  toggleRuneCostFilter,
  clearAllCardTypes,
}: FiltersProps) {
  return (
    <div className="space-y-4">
      {/* Rune Type Filters */}
      <div>
        <label className="block mb-2 font-medium">Rune Type</label>
        <div className="flex flex-wrap gap-2">
          {['Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical'].map(
            (rune) => (
              <button
                key={rune}
                className={`relative rounded-lg border p-2 ${
                  filters.runeFilters.includes(rune)
                    ? 'bg-primary/25'
                    : 'bg-primary/10'
                }`}
                onClick={() => toggleRuneFilter(rune)}
              >
                <img
                  src={`/icons/${rune}.png`}
                  alt={`${rune} Rune`}
                  className="w-9 h-9"
                />
                {filters.runeFilters.includes(rune) && (
                  <span className="absolute inset-0 rounded-lg"></span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Card Type Filters */}
      <div>
        <label className="block mb-2 font-medium">Card Type</label>
        <div className="flex flex-col gap-2">
          {[
            'Legend',
            'Battlefield',
            'Champion',
            'Unit',
            'Spell',
            'Gear',
            'Rune',
          ].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={type}
                checked={filters.cardTypeFilters.includes(type)}
                onChange={() => toggleCardType(type)}
                className="rounded"
              />
              <label htmlFor={type} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={clearAllCardTypes}
        >
          Clear All
        </button>
      </div>

      {/* Might Filter */}
      <div>
        <label className="block mb-2 font-medium">Might</label>
        <div className="flex flex-wrap gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((might) => (
            <button
              key={might}
              className={`px-3 py-1 rounded-lg border ${
                filters.mightFilters.includes(might)
                  ? 'bg-primary/25'
                  : 'bg-primary/10'
              }`}
              onClick={() => toggleMightFilter(might)}
            >
              {might}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Filter */}
      <div>
        <label className="block mb-2 font-medium">Cost</label>
        <div className="flex flex-wrap gap-2">
          {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(
            (cost) => (
              <button
                key={cost}
                className={`px-3 py-1 rounded-lg border ${
                  filters.costFilters.includes(cost)
                    ? 'bg-primary/25 text-white'
                    : 'bg-primary/10'
                }`}
                onClick={() => toggleCostFilter(cost)}
              >
                {cost}
              </button>
            )
          )}
        </div>
      </div>

      {/* Rune Cost Filter */}
      <div>
        <label className="block mb-2 font-medium">Rune Cost</label>
        <div className="flex flex-wrap gap-2">
          {['0', '1', '2', '3'].map((runeCost) => (
            <button
              key={runeCost}
              className={`px-3 py-1 rounded-lg border ${
                filters.runeCostFilters.includes(runeCost)
                  ? 'bg-primary/25 text-white'
                  : 'bg-primary/10'
              }`}
              onClick={() => toggleRuneCostFilter(runeCost)}
            >
              {runeCost}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
