const XCircleIcon: React.FC<
  React.SVGProps<SVGElement> & {
    size: number;
    stroke?: string;
  }
> = ({ size, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="48"
    // height="48"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 48 48"
  >
    <path
      stroke={stroke ? stroke : `#1E1E1E`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M30 18 18 30m0-12 12 12m14-6c0 11.046-8.954 20-20 20S4 35.046 4 24 12.954 4 24 4s20 8.954 20 20"
    ></path>
  </svg>
);

export default XCircleIcon;
