import { Deferrer } from "@/components/deferrer";
import { Loader } from "@/components/loader";

export default function Loading() {
  return (
    <Deferrer>
      <Loader />
    </Deferrer>
  );
}
