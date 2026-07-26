"use client";

import Button from "@/components/ui/button";

import { useShippingContext } from "../_store";

const NextStepButton = () => {
  const action = useShippingContext((store) => store.nextStepAction);
  const disabled = useShippingContext((store) => store.isDisabledNextAction);
  const label = useShippingContext((store) => store.nextButtonLabel);

  return (
    <Button
      disabled={disabled}
      onClick={action}
      variant="secondary"
      className="mt-auto"
      shadow="sm"
    >
      {label}
    </Button>
  );
};

export default NextStepButton;
