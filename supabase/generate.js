import { exec } from 'child_process';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const saveFile = path.join(
  import.meta.dirname,
  '..',
  'src',
  'utils',
  'types',
  'database.types.ts'
);

exec(
  `npx supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} --schema public > ${saveFile}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);
