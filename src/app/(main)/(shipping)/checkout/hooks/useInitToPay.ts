import type { PaymentGatewayKeys } from "@/constant/appData";

import { useCreateOrder } from "@/features/shipping/hooks/useCreateOrder";

import { useSetShippingState } from "../../_store";

export const useInitToPay = () => {
  const { handleCreateOrder } = useCreateOrder();
  const setShippingState = useSetShippingState();

  const check = () => {
    setShippingState(
      ({ isRulesAccepted, selectedGateway, addressId, sendingMethod }) => {
        const isDisabled = !(
          Boolean(isRulesAccepted) && Boolean(selectedGateway)
        );
        return {
          isDisabledNextAction: isDisabled,
          nextButtonLabel: !isDisabled
            ? "رفتن به صفحه پرداخت"
            : "برخی موارد انتخاب نشده اند",
          nextStepAction: () => {
            handleCreateOrder({
              addressId,
              paymentGateway: selectedGateway,
              sendingMethod,
            });
          },
        };
      },
    );
  };

  const setPaymentGateway = (gateway: PaymentGatewayKeys) => {
    setShippingState({ selectedGateway: gateway });
    check();
  };

  const setRulesAccepted = (accepted: boolean) => {
    setShippingState({ isRulesAccepted: accepted });
    check();
  };

  return { setPaymentGateway, setRulesAccepted };
};
