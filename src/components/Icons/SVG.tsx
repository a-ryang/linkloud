import { PropsWithChildren, SVGProps } from "react";

export interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

export default function SVG({
  size = 24,
  viewBox,
  className = "",
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={viewBox ?? "0 0 24 24"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}
