const GithubIcon: React.FC<
  React.SVGProps<SVGElement> & {
    size: number;
  }
> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 48 48"
  >
    {/* <g clipPath="url(#clip0_6_6)"> */}
    <path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M18 38C8 41 8 33 4 32m28 12v-7.74a6.74 6.74 0 0 0-1.88-5.22c6.28-.7 12.88-3.08 12.88-14a10.88 10.88 0 0 0-3-7.5A10.14 10.14 0 0 0 39.82 2S37.46 1.3 32 4.96a26.76 26.76 0 0 0-14 0C12.54 1.3 10.18 2 10.18 2A10.14 10.14 0 0 0 10 9.54a10.88 10.88 0 0 0-3 7.56c0 10.84 6.6 13.22 12.88 14A6.74 6.74 0 0 0 18 36.26V44"
    ></path>
    {/* </g>
    <defs>
      <clipPath id="clip0_6_6">
        <path fill="#fff" d="M0 0h48v48H0z"></path>
      </clipPath>
    </defs> */}
  </svg>
);

export default GithubIcon;
