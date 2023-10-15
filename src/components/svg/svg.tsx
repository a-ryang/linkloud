import { PropsWithChildren, SVGProps } from "react";

export interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function SVG({
  size = 24,
  viewBox,
  className = "",
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox ?? "0 0 24 24"}
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}
