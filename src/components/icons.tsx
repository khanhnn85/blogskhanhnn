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
      <path d="M16 16.42A4 4 0 0 0 18 8h-2a2 2 0 1 1 0-4h2a4 4 0 0 0-4-4H6v16" />
      <path d="M12 12L6 6" />
      <path d="m16 22-4-4" />
    </svg>
  ),
};
