import type { Address } from "@/services/shipping/type";

import Radio from "@/components/ui/radio";
import SeparatorLine from "@/components/ui/separatorLine";

import { useSetShippingState, useShippingContext } from "../../_store";

const AddressCard = ({
  province,
  city,
  additionalAddress,
  postCode,
  fullname,
  id,
}: Address) => {
  const addressId = useShippingContext((store) => store.addressId);
  const setShippingState = useSetShippingState();

  const handleSelectAddress = () => {
    setShippingState({
      addressId: id,
      isAddAddress: false,
      isDisabledNextAction: false,
      nextStepAction: () => setShippingState({ step: 3 }),
    });
  };

  return (
    <label
      htmlFor={id}
      className="border cursor-pointer border-primary-500 rounded-6xl py-2 px-4 md:p-4 flex items-center gap-3"
    >
      <Radio
        id={id}
        name="address"
        onChecked={handleSelectAddress}
        checked={id === addressId}
      />
      <SeparatorLine variant="horizontal" />
      <div className="flex-auto">
        <div className="flex flex-wrap gap-4 justify-between ">
          <div>
            <strong>نام گیرنده: </strong>
            {fullname}
          </div>
          <div>
            <strong>استان و شهر: </strong>
            {province} - {city}
          </div>
          <div>
            <strong>کد پستی: </strong>
            {postCode}
          </div>
        </div>
        <SeparatorLine size="1" className="my-2" />
        <div>{additionalAddress}</div>
      </div>
    </label>
  );
};

export default AddressCard;
