"use client";
import React from "react";
import TransactionScreen from "@/components/Transaction";
import { TransactionProvider } from "@/context/TransactionContext";

export default function Home() {
  return (
    <TransactionProvider>
      <TransactionScreen />
    </TransactionProvider>
  );
}
