"use client";
import React from "react";
import AddBeneficiaryScreen from "@/components/AddBeneficiary";
import { TransactionProvider } from "@/context/TransactionContext";

export default function Home() {
  return (
    <TransactionProvider>
      <AddBeneficiaryScreen />
    </TransactionProvider>
  );
}
