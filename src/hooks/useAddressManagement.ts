import { useState, useCallback } from "react";
import { Address } from "../types/user/address";
import { userService } from "../services/userService";

export const useAddressManagement = (initialAddresses: Address[] = []) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Partial<Address> | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | null>(null);

  const openAddModal = useCallback(() => {
    setEditingId(null);
    setEditingAddress({});
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((addr: Address) => {
    setEditingId(addr.id);
    setEditingAddress(addr);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingAddress(undefined);
    setEditingId(null);
  }, []);

  const saveAddress = async (formData: Partial<Address>) => {
    if (editingId) {
      // UPDATE
      const updated = await userService.updateAddress(editingId, formData);
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? updated : a)));
    } else {
      // CREATE
      const created = await userService.addAddress(formData);
      setAddresses((prev) => [...prev, created]);
    }
  };

  const deleteAddress = async (id: string) => {
    if (window.confirm("Delete this address?")) {
      try {
        await userService.deleteAddress(id);
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      } catch (e) {
        console.error("Delete failed", e);
        alert("Could not delete address");
      }
    }
  };

  const setAddressList = (list: Address[]) => {
      setAddresses(list);
  }

  return {
    addresses,
    setAddressList, 
    isModalOpen,
    editingAddress,
    editingId,
    openAddModal,
    openEditModal,
    closeModal,
    saveAddress,
    deleteAddress,
  };
};