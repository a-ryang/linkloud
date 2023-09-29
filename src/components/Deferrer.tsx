import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  ms?: number;
}

export default function Deferrer({
  ms = 200,
  children,
}: PropsWithChildren<Props>) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDeferred(true);
    }, ms);

    return () => clearTimeout(timeout);
  }, [ms]);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}
