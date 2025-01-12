import type { FieldHook } from 'payload';

const updateKeywordType: FieldHook = async ({ value, siblingData }) => {
  if (value === 'Timing') siblingData.color = '#536878';
  if (value === 'Trigger') siblingData.color = '#8F7236';
  return value;
};

export default updateKeywordType;
