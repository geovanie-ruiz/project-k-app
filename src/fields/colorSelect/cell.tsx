'use client';

import type { DefaultCellComponentProps } from 'payload';
import React from 'react';

const Cell: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props;
  if (!cellData) return null;

  const colorHex = cellData.toString();

  return (
    <div className="flex flex-row">
      <div
        className={`w-5 mr-4 border border-solid border-white rounded-[4px] bg-[${colorHex}]`}
      ></div>
      <div>{cellData}</div>
    </div>
  );
};

export default Cell;
