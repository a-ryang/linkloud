import { ComponentProps } from "react";

import SVG from "./SVG";

export default function LogoIcon({ ...props }: ComponentProps<typeof SVG>) {
  return (
    <SVG {...props}>
      <path
        d="M14.8802 10.6217H17.914C20.1706 10.6217 22 12.4206 22 14.6395C22 16.8585 20.1706 18.6574 17.914 18.6574H14.0582H6.08603C3.82937 18.6574 2 16.8585 2 14.6395C2 13.0643 2.92191 11.7008 4.26413 11.0422C4.36948 8.23996 6.71301 6 9.5886 6C12.3188 6 14.5694 8.01919 14.8802 10.6217Z"
        fill="#476AD0"
      />
    </SVG>
  );
}
