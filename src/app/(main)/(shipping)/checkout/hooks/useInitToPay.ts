import { useParams } from "next/navigation";

import type { PaymentGatewayKeys } from "@/constant/appData";

import {
  useCreateOrder,
  usePayCreatedOrder,
} from "@/features/shipping/hooks/useCreateOrder";

import { useSetShippingState } from "../../_store";

export const useInitToPay = () => {
  const { handleCreateOrder } = useCreateOrder();
  const { id } = useParams<{ id?: string[] }>();
  const orderId = id ? id[0] : undefined;
  const { handlePayFromOrder } = usePayCreatedOrder(orderId);
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
            if (orderId) {
              handlePayFromOrder({
                addressId,
                sendingMethod,
                paymentGateway: selectedGateway,
              });
            } else {
              handleCreateOrder({
                addressId,
                paymentGateway: selectedGateway,
                sendingMethod,
              });
            }
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
