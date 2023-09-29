import { Loader } from "@mantine/core";

export default function Spinner() {
  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <Loader type="dots" />
    </div>
  );
}
