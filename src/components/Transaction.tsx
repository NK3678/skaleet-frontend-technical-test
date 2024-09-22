"use client";
import React, { useState, CSSProperties } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { useRouter } from "next/navigation";
import { Account } from "@/interface/TransactionInterface";

const TransactionScreen = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const { addTransaction, beneficiaries, balance } = useTransactions();
  const router = useRouter();

  const handleTransaction = () => {
    const accountDetails = { name, iban };
    if(!amount || !name || !iban) {
      alert("Please fill all the fields");
      return;
    }

    if(parseFloat(amount) > balance) {
      alert("Insufficient balance");
      return;
    }
    addTransaction(amount, accountDetails);
    router.back();
  };

  const cancelTransaction = () => {
    setAmount("");
    setName("");
    setIban("");
  };

  const handleBeneficiary = (beneficiary: Account) => {
    setName(beneficiary.name);
    setIban(beneficiary.iban);
  };

  return (
    <div style={styles.container}>
      {beneficiaries.length === 0 && (
        <div>
          <h2>No Beneficiaries added yet</h2>
        </div>
      )}
      {beneficiaries.length > 0 && (
        <div>
          <h2>
            <u>List of Beneficiaries, please select</u>
          </h2>
          <ul style={styles.ul}>
            {beneficiaries.map((beneficiary, index) => (
              <button
                key={beneficiary.iban}
                onClick={() => handleBeneficiary(beneficiary)}
                style={styles.listItemButton}
              >
                {index + 1}. {beneficiary.name}
              </button>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => router.push("/addBeneficiary")}
        style={styles.button}
      >
        Add Beneficiary
      </button>
      <button onClick={router.back} style={styles.button}>
        Go Back to Home
      </button>
      {name && (
        <div>
          <input
            type="number"
            style={styles.input}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter amount"
          />
          <input
            type="text"
            disabled
            style={styles.input}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Recipient Name"
          />
          <input
            type="text"
            disabled
            style={styles.input}
            onChange={(e) => setIban(e.target.value)}
            value={iban}
            placeholder="Recipient IBAN"
          />
          <div>
            <button onClick={handleTransaction} style={styles.button}>
              Submit Transaction
            </button>
            <button onClick={cancelTransaction} style={styles.button}>
              Cancel Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  input: {
    height: "40px",
    borderColor: "gray",
    borderWidth: "1px",
    width: "80%",
    margin: "8px 0",
    padding: "0 10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "8px 8px",
  },
  listItemButton: {
    background: "none",
    border: "none",
    padding: "0",
    margin: "0",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },
};

export default TransactionScreen;
