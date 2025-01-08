import type { DefaultCellComponentProps } from 'payload';
import React from 'react';

const Cell: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props;
  console.log('asdf', props);

  return <span>David!</span>;
};

export default Cell;
