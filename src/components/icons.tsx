import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.5 8.5 22 12l-6.5 3.5L9 12l6.5-3.5Z" />
      <path d="M15.5 15.5 22 19l-6.5 3.5L9 19l6.5-3.5Z" />
      <path d="M2 12h7" />
      <path d="M9 19h13" />
      <path d="M9 5h13" />
    </svg>
  ),
};
