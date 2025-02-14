import * as migration_20250112_070255 from './20250112_070255';
import * as migration_20250117_072834 from './20250117_072834';
import * as migration_20250122_021336 from './20250122_021336';
import * as migration_20250122_041201 from './20250122_041201';
import * as migration_20250125_053118 from './20250125_053118';
import * as migration_20250129_204923 from './20250129_204923';
import * as migration_20250203_023748 from './20250203_023748';

export const migrations = [
  {
    up: migration_20250112_070255.up,
    down: migration_20250112_070255.down,
    name: '20250112_070255',
  },
  {
    up: migration_20250117_072834.up,
    down: migration_20250117_072834.down,
    name: '20250117_072834',
  },
  {
    up: migration_20250122_021336.up,
    down: migration_20250122_021336.down,
    name: '20250122_021336',
  },
  {
    up: migration_20250122_041201.up,
    down: migration_20250122_041201.down,
    name: '20250122_041201',
  },
  {
    up: migration_20250125_053118.up,
    down: migration_20250125_053118.down,
    name: '20250125_053118',
  },
  {
    up: migration_20250129_204923.up,
    down: migration_20250129_204923.down,
    name: '20250129_204923',
  },
  {
    up: migration_20250203_023748.up,
    down: migration_20250203_023748.down,
    name: '20250203_023748'
  },
];
