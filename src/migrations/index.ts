import * as migration_20250112_070255 from './20250112_070255';
import * as migration_20250117_072834 from './20250117_072834';

export const migrations = [
  {
    up: migration_20250112_070255.up,
    down: migration_20250112_070255.down,
    name: '20250112_070255',
  },
  {
    up: migration_20250117_072834.up,
    down: migration_20250117_072834.down,
    name: '20250117_072834'
  },
];
