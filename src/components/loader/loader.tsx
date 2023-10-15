import { Loader as MantineLoader } from "@mantine/core";
import clsx from "clsx";

import classess from "./loader.module.css";

export function Loader() {
  return (
    <div className={clsx(classess.loader, "container")}>
      <MantineLoader type="dots" />
    </div>
  );
}
