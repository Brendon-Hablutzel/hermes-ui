const CheckCircleIcon: React.FC<
  React.SVGProps<SVGElement> & {
    size: number;
    stroke?: string;
  }
> = ({ size, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
      d="M44 22.16V24A20 20 0 1 1 32.14 5.72M44 8 24 28.02l-6-6"
    ></path>
  </svg>
);

export default CheckCircleIcon;
