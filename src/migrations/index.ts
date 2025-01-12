import * as migration_20250112_070255 from './20250112_070255';

export const migrations = [
  {
    up: migration_20250112_070255.up,
    down: migration_20250112_070255.down,
    name: '20250112_070255'
  },
];
