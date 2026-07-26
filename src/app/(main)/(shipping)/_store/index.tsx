"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";

import { createContext, use, useMemo } from "react";
import { createStore, useStore } from "zustand";

import type { PaymentGatewayKeys, SendingMethodKey } from "@/constant/appData";

export interface ShippingState {
  step: number;
  nextStepAction?: () => void;
  isDisabledNextAction: boolean;
  addressId?: string;
  nextButtonLabel: string;
  isAddAddress: boolean;
  sendingMethod: SendingMethodKey;
  isRulesAccepted: boolean;
  selectedGateway?: PaymentGatewayKeys;
}

// export const useShippingStore = create<ShippingState>(() => ({
//   step: 1,
//   isDisabledNextAction: true,
//   nextButtonLabel: "ادامه فرایند خرید",
//   isAddAddress: false,
//   sendingMethod: "storeSend",
//   isRulesAccepted: false,
// }));

// export const setShippingStep = (step: number) =>
//   useShippingStore.setState({ step });

// export const setShippingNextStepAction = (
//   action: ShippingState["nextStepAction"],
// ) => useShippingStore.setState({ nextStepAction: action });

// export const setShippingNextButtonLabel = (label: string) =>
//   useShippingStore.setState({ nextButtonLabel: label });

// export const setShippingNextActionDisable = (disabled: boolean) =>
//   useShippingStore.setState({ isDisabledNextAction: disabled });

// export const setAddressId = (addressId: ShippingState["addressId"]) =>
//   useShippingStore.setState({ addressId });

// export const setIsAddAddress = (isAddAddress: boolean) =>
//   useShippingStore.setState({ isAddAddress });

// export const setSendignMethod = (
//   sendingMethod: ShippingState["sendingMethod"],
// ) => useShippingStore.setState({ sendingMethod });

// export const setSelectedGateway = (gateway: PaymentGatewayKeys) =>
//   useShippingStore.setState({ selectedGateway: gateway });

// export const setIsRulesAccepted = (isRulesAccepted: boolean) =>
//   useShippingStore.setState({ isRulesAccepted });

// export const setShippingStoreState = useShippingStore.setState;

export const createShippingStore = (initProps?: Partial<ShippingState>) =>
  createStore<ShippingState>(() => ({
    step: 1,
    isDisabledNextAction: true,
    nextButtonLabel: "ادامه فرایند خرید",
    isAddAddress: false,
    sendingMethod: "storeSend",
    isRulesAccepted: false,
    ...initProps,
  }));

type ShippingStore = StoreApi<ShippingState>;

export const ShipingContext = createContext<ShippingStore | undefined>(
  undefined,
);
ShipingContext.displayName = "ShipingContext";

const ShipingContextProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<ShippingState>>) => {
  const store = useMemo(() => createShippingStore(props), [props]);
  return <ShipingContext value={store}>{children}</ShipingContext>;
};

export function useShippingContext<T>(
  selector: (state: ShippingState) => T,
): T {
  const store = use(ShipingContext);
  if (!store) throw new Error("Missing Shipping.Provider in the tree");
  return useStore(store, selector);
}

export const useSetShippingState = () => {
  const store = use(ShipingContext);
  if (!store) throw new Error("Missing Shipping.Provider in the tree");
  return store.setState;
};

export default ShipingContextProvider;
