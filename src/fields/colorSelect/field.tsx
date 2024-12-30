'use client';

import { FieldLabel, useFormFields } from '@payloadcms/ui';
import type { UIFieldClientComponent } from 'payload';

interface Swatch {
  [key: string]: string;
}

const colorSwatches: Swatch = {
  '#699667': 'bg-[#699667]',
  '#835b86': 'bg-[#835b86]',
  '#a74e56': 'bg-[#a74e56]',
  '#566f94': 'bg-[#566f94]',
  '#ab972c': 'bg-[#ab972c]',
  '#ba7152': 'bg-[#ba7152]',
};

const ColorSelectField: UIFieldClientComponent = () => {
  const keyword = useFormFields(([fields]) => fields.keyword);
  const keywordText: string | null =
    keyword.value === '' ? null : `${keyword.value}`;
  const color = useFormFields(([fields]) => fields.color);
  const colorHex = `${color.value}`;
  const colorClass = colorSwatches[colorHex];

  return (
    <div id="field-color-preview" className="field-type ui basis-1/5">
      <FieldLabel label={'Preview'} htmlFor="field-color-preview"></FieldLabel>
      <div className="w-fit my-1">
        {keywordText && (
          <div
            className={`border rounded-[4px] px-2 py-1 ${colorClass}`}
          >{`${keyword.value}`}</div>
        )}
      </div>
    </div>
  );
};

export default ColorSelectField;
