import * as React from 'react';

type IconProps = React.HTMLAttributes<SVGElement>;

const AnyRuneIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="136.526 105.067 220.253 293.691"
    {...props}
    fill="currentColor"
    className="inline-block align-middle w-4 h-4 text-gray-800 dark:text-white"
  >
    <defs>
      <linearGradient
        id="b"
        x1={112.891}
        x2={112.891}
        y1={59.917}
        y2={276.698}
        gradientTransform="matrix(.58025 -.24157 .24035 .5832 146.243 116.763)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: '#a22824',
          }}
        />
        <stop
          offset={0.553}
          style={{
            stopColor: '#bd762e',
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#c9b63e',
          }}
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        id="c"
        x1={262.453}
        x2={262.453}
        y1={145.048}
        y2={362.348}
        gradientTransform="matrix(.70569 -.2938 .2923 .70928 70.41 153.952)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="a">
        <stop
          offset={0}
          style={{
            stopColor: '#bada55',
          }}
        />
        <stop
          offset={0.5}
          style={{
            stopColor: '#3e7aa5',
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#704a87',
          }}
        />
      </linearGradient>
    </defs>
    <path
      d="M240.572 105.067c5.068 37.778 3.87 62.29 1.886 77.295-21.343 17.365-55.757 64.689-60.835 70.819-5.079 6.131 16.264 14.304 27.442 22.477 11.177 8.175 23.375 15.321 31.507 15.321 8.132 0 25.409-14.303 25.409-21.451 0-7.146-13.21-20.434-19.31-25.537-6.099-5.104-15.243 7.147-16.264 14.303-1.012 7.148-24.054 0-26.086-4.086-2.033-4.087 26.419-35.44 32.519-41.57 6.099-6.13 5.499-9.506 15.793-1.332 10.293 8.173 24.514 30.642 33.668 39.842 9.144 9.19 6.1 21.45 0 28.598-6.099 7.147-30.043 29.94-36.496 35.755-6.817 6.13-13.299 4.087-24.476-4.087s-67.082-34.729-79.271-38.816c-12.198-4.086-13.21-13.277 0-22.477 13.211-9.191 55.375-57.364 65.383-77.63 10.009-20.267 29.131-67.424 29.131-67.424Z"
      style={{
        fill: 'url(#b)',
      }}
    >
      <title>{'Left'}</title>
    </path>
    <path
      d="M294.512 334.918c-27.442 30.385-38.992 55.41-48.912 63.84-1.777-22.981-4.321-40.503-.991-51.332 12.808-14.294 48.636-46.732 59.813-60.01 11.178-13.277 15.401-25.025 5.245-38.302-10.156-13.277-25.624-28.944-29.318-33.484-7.12-8.747-14.044-23.722-15.056-31.383 25.753 25.331 66.738 52.093 74.87 58.223 8.133 6.131 19.143 14.808 16.098 18.894-3.045 4.078-46.132 56.259-61.739 73.545l-.01.009Z"
      style={{
        fill: 'url(#c)',
      }}
    >
      <title>{'Right'}</title>
    </path>
  </svg>
);

export default AnyRuneIcon;
