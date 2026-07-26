"use client";

import { useEffect, useEffectEvent } from "react";

import type { ShippingState } from "../_store";

import { useSetShippingState } from "../_store";

const SetShippingStoreOnMounted = ({
  step,
  isDisabledNextAction,
  nextStepAction,
  nextButtonLabel,
}: Partial<ShippingState>) => {
  const setShippingState = useSetShippingState();
  const handleSetStep = useEffectEvent(() => {
    if (step) setShippingState({ step });
    if (isDisabledNextAction !== undefined) {
      setShippingState({ isDisabledNextAction });
    }
    if (nextStepAction) setShippingState({ nextStepAction });
    if (nextButtonLabel) setShippingState({ nextButtonLabel });
  });
  useEffect(() => {
    handleSetStep();
  }, []);
  return null;
};

export default SetShippingStoreOnMounted;
