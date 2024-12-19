import { IconProps } from './types';

const MightIcon = ({ isNormal, isMedium, isLarge, isXLarge }: IconProps) => {
  let iconSize = '';

  if (isNormal) iconSize = 'w-4 h-4';
  if (isMedium) iconSize = 'w-4 h-4';
  if (isLarge) iconSize = 'w-4 h-4';
  if (isXLarge) iconSize = 'w-4 h-4';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 300 300"
      fill="currentColor"
      className={`${iconSize} inline-block align-text-top p-0.25 mx-1`}
    >
      <path d="m166.14 257.91-1.94-14.17 116.37-9.82v47.99zM280.56 59.5l-113.6-33.14-151.7 73.4L43.7 230.6l35.6-3.11-8.83-74.23 18.9-7.99 10.06 80.46 43.32-3.35-9.1-89.68 19.64-5.69 11.31 93.46 41.27-4.12-8.2-101.61 23.98-5.81 10.17 105.22 48.75-4.26V59.5Z" />
    </svg>
  );
};
export default MightIcon;
