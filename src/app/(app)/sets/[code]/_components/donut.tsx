'use client';

import React from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

export type RadialChartProps = {
  collected: number;
  total: number;
};

export const Donut: React.FC<RadialChartProps> = ({ collected, total }) => {
  const percentage = Math.round((collected / total) * 100);

  const chartData = [
    { name: 'Progress', value: percentage, fill: 'hsl(var(--primary))' },
  ];

  return (
    <div className="aspect-square h-16 w-16">
      <RadialBarChart
        width={64}
        height={64}
        innerRadius="80%"
        outerRadius="100%"
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background={{ fill: 'hsl(var(--secondary))' }}
          dataKey="value"
          cornerRadius={30}
          fill="hsl(var(--primary))"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary text-sm font-bold"
        >
          {percentage}%
        </text>
      </RadialBarChart>
    </div>
  );
};
