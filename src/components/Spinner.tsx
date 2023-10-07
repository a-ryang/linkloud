import { Loader } from "@mantine/core";
import clsx from "clsx";

import classess from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={clsx(classess.wrap, "container")}>
      <Loader type="dots" />
    </div>
  );
}
