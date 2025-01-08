'use client';

import Keyword from '@/components/custom/keyword';
import { FieldLabel, useFormFields } from '@payloadcms/ui';
import type { UIFieldClientComponent } from 'payload';

const ColorSelectField: UIFieldClientComponent = () => {
  const keyword = useFormFields(([fields]) => fields.keyword);
  const keywordText: string | null =
    keyword.value === '' ? null : `${keyword.value}`;
  const color = useFormFields(([fields]) => fields.color);
  const colorHex = `${color.value}`;

  return (
    <div id="field-color-preview" className="field-type ui basis-1/5">
      <FieldLabel label={'Preview'} htmlFor="field-color-preview"></FieldLabel>
      <div className="w-fit my-1">
        {keywordText && <Keyword label={keywordText} color={colorHex} />}
      </div>
    </div>
  );
};

export default ColorSelectField;
