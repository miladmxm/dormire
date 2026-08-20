import { Shuffle } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const RandomPassword = ({ onClick }: { onClick: (v: string) => void }) => {
  return (
    <Button
      className="w-fit"
      type="button"
      variant="outline"
      onClick={() => {
        onClick(Math.random().toString(36).slice(-8));
      }}
    >
      <Shuffle />
    </Button>
  );
};

export default RandomPassword;
