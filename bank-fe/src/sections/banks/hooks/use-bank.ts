"use client";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { getBanks } from "@/store/features/bank/action";
import { useEffect, useState } from "react";

export const useBank = () => {
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state: RootState) => state.bank);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  const filterBanks = banks?.filter(
    (bank) =>
      bank.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { filterBanks, searchTerm, setSearchTerm };
};
