"use client";
import React from "react";
import HomeScreen from "@/components/Home";
import { TransactionProvider } from "@/context/TransactionContext";

export default function Home() {
  return (
    <TransactionProvider>
      <HomeScreen />
    </TransactionProvider>
  );
}
