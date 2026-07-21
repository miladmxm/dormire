import type { PaymentGatewayKeys } from "@/constant/appData";

import { useCreateOrder } from "@/features/shipping/hooks/useCreateOrder";

import {
  setIsRulesAccepted,
  setSelectedGateway,
  setShippingStoreState,
} from "../../_store";

export const useInitToPay = () => {
  const { handleCreateOrder } = useCreateOrder();

  const check = () => {
    setShippingStoreState(
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
    setSelectedGateway(gateway);
    check();
  };

  const setRulesAccepted = (accepted: boolean) => {
    setIsRulesAccepted(accepted);
    check();
  };

  return { setPaymentGateway, setRulesAccepted };
};
