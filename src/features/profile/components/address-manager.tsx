"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import type { CustomerProfileAddress } from "../types";

import AddressCard from "./addressCard";
import AddressFormModal from "./addressFormModal";
import EmptyAddress from "./emptyAddress";

interface AddressManagerProps {
  addresses: CustomerProfileAddress[];
}

const AddressSectionHeader = ({ onAdd }: { onAdd: () => void }) => (
  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h2 className="text-2xl font-black text-gray-900" id="addresses-heading">
        نشانی‌های من
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        نشانی‌های آماده، مرحله پرداخت را کوتاه‌تر می‌کنند.
      </p>
    </div>
    <button
      className="center w-fit gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary-800"
      onClick={onAdd}
      type="button"
    >
      <Plus className="size-4" />
      افزودن نشانی
    </button>
  </div>
);

const AddressManager = ({ addresses }: AddressManagerProps) => {
  const [editingAddress, setEditingAddress] =
    useState<CustomerProfileAddress>();
  const [showNewAddress, setShowNewAddress] = useState(false);

  return (
    <section aria-labelledby="addresses-heading">
      <AddressSectionHeader onAdd={() => setShowNewAddress(true)} />
      {addresses.length === 0 ? (
        <EmptyAddress onAdd={() => setShowNewAddress(true)} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {addresses.map((address, index) => (
            <AddressCard
              onEdit={() => setEditingAddress(address)}
              key={address.id}
              {...address}
              index={index}
            />
          ))}
        </div>
      )}
      {(showNewAddress || editingAddress) && (
        <AddressFormModal
          address={editingAddress}
          onClose={() => {
            setShowNewAddress(false);
            setEditingAddress(undefined);
          }}
        />
      )}
    </section>
  );
};

export default AddressManager;
