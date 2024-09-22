"use client";
import React, { CSSProperties } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { useRouter } from "next/navigation";
import { Transaction } from "@/interface/TransactionInterface";

const HomeScreen = () => {
  const { transactions, balance } = useTransactions();
  const router = useRouter();

  const renderItem = (item: Transaction) => (
    <div style={styles.item}>
      <p style={styles.itemText}>Transaction ID: {item.id}</p>
      <p style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</p>
      {item.account && (
        <>
          <p style={styles.itemText}>To: {item.account.name}</p>
          <p style={styles.itemText}>IBAN: {item.account.iban}</p>
        </>
      )}
    </div>
  );

  const navigateToTransaction = () => {
    router.push("/transaction");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.balanceText}>Current Balance: ${balance.toFixed(2)}</h1>
      <button onClick={() => navigateToTransaction()} style={styles.button}>
        Add Transaction
      </button>
      <div style={styles.listContainer}>
        {transactions.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  balanceText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    margin: "8px 16px",
    borderRadius: 5,
    border: "1px solid #ddd",
  },
  itemText: {
    fontSize: "16px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "8px 8px",
  },
};

export default HomeScreen;
