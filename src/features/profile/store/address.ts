import { create } from "zustand";

interface AddressState {
  editingAddressId?: string;
  showNewAddress: boolean;
}

export const useAddressStore = create<AddressState>(() => ({
  showNewAddress: false,
}));

export const setShowNewAddress = (show: boolean) =>
  useAddressStore.setState({ showNewAddress: show });

export const setEditingAddress = (editingAddressId?: string) =>
  useAddressStore.setState({ editingAddressId });

export const closeAddressModal = () =>
  useAddressStore.setState({
    editingAddressId: undefined,
    showNewAddress: false,
  });
