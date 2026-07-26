import { use } from "react";

import type { SendingMethodKey, SendingMethodValue } from "@/constant/appData";

import { BRAND_DATA, SENDING_METHODS } from "@/constant/appData";

import { useCheckoutContext } from "../_contexts";
import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";
import { useSetShippingState, useShippingContext } from "../../_store";

const MethodSelectionRadio = ({
  label,
  value,
}: {
  label: SendingMethodValue;
  value: SendingMethodKey;
}) => {
  const sendingMethod = useShippingContext((store) => store.sendingMethod);
  const setShippingState = useSetShippingState();
  return (
    <div>
      <input
        className="sr-only peer"
        name="sendign_method"
        checked={sendingMethod === value}
        onChange={(e) => {
          if (e.target.checked) {
            setShippingState({ sendingMethod: value });
          }
        }}
        type="radio"
        value={value}
        id={value}
      />
      <label
        className="peer-checked:bg-primary-900 block peer-checked:text-white peer-checked:border-transparent border border-primary-500 bg-white rounded-full px-4 py-2 cursor-pointer transition-all"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};

const SendingMethodDescription = () => {
  const sendingMethod = useShippingContext((store) => store.sendingMethod);
  const addressPromise = useCheckoutContext().address;
  const addressId = useShippingContext((store) => store.addressId);
  const address = use(addressPromise);
  const selectedAddress = address.find((item) => item.id === addressId);
  if (!selectedAddress) return;
  if (sendingMethod === "storeSend") {
    return (
      <div className="text-sm font-light text-gray-500 *:border *:border-primary-500 *:rounded-full *:bg-primary-50 flex flex-col gap-2 *:px-4 *:py-2">
        <p>{selectedAddress.additionalAddress}</p>
        <p className="w-fit ms-auto">{selectedAddress.phoneNumber}</p>
      </div>
    );
  } else if (sendingMethod === "personReception") {
    return (
      <div className="text-sm font-light text-gray-500 *:border *:border-primary-500 *:rounded-full *:bg-primary-50 flex flex-col gap-2 *:px-4 *:py-2">
        <p>{BRAND_DATA.address.plain}</p>
        <a
          target="_blank"
          className="block dir-ltr w-fit me-auto"
          href={`tel:${BRAND_DATA.phoneNumber}`}
        >
          {BRAND_DATA.phoneNumber}
        </a>
      </div>
    );
  }

  return null;
};

const SendignMethod = () => {
  const setShippingState = useSetShippingState();
  return (
    <section>
      <div className="rounded-4xl border border-primary-500 px-14 py-8 flex flex-col gap-6">
        <div className="flex gap-4">
          {Object.keys(SENDING_METHODS).map((k) => {
            const key = k as SendingMethodKey;
            return (
              <MethodSelectionRadio
                key={key}
                value={key}
                label={SENDING_METHODS[key]}
              />
            );
          })}
        </div>
        <SendingMethodDescription />
      </div>
      <SetShippingStoreOnMounted
        nextStepAction={() => {
          setShippingState({
            step: 4,
            isDisabledNextAction: true,
            nextButtonLabel: "رفتن به درگاه پرداخت",
          });
        }}
      />
    </section>
  );
};

export default SendignMethod;
