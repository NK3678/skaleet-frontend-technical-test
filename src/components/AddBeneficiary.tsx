import React, { useState, CSSProperties } from 'react';
import { useTransactions } from "@/context/TransactionContext";
import { useRouter } from "next/navigation";

const AddBeneficiaryScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const { addBeneficiary, beneficiaries } = useTransactions();
  const router = useRouter();

  const isValidIban = (iban: string) => {
    // Simple IBAN validation logic (you can replace this with a more robust validation if needed)
    const ibanRegex = /[A-Z]{2}\d{2}[A-Z0-9]{1,30}/;
    return ibanRegex.test(iban);
  };

  const handlebeneficiary = () => {
    const name = firstName + ' ' + lastName;

    if (!firstName || !lastName || !iban) {
      alert('Please fill all the fields');
      return;
    }
    
    if (!isValidIban(iban)) {
      alert('Invalid IBAN');
      return;
    }

    if(beneficiaries.some((beneficiary) => beneficiary.iban === iban)) {
      alert('Beneficiary with the same IBAN already exists');
      return;
    }
    addBeneficiary(name, iban);
    router.back();
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        style={styles.input}
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        placeholder="Enter First Name"
      />
      <input
        type="text"
        style={styles.input}
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        placeholder="Enter Last Name"
      />
      <input
        type="text"
        style={styles.input}
        onChange={(e) => setIban(e.target.value)}
        value={iban}
        placeholder="Enter IBAN"
      />
      <button onClick={handlebeneficiary} style={styles.button}>
        Add Beneficiary
      </button>
      <button onClick={router.back} style={styles.button}>
        Go Back
      </button>
    </div>
  );
};

const styles :{ [key: string]: CSSProperties }= {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  input: {
    height: '40px',
    borderColor: 'gray',
    borderWidth: '1px',
    width: '80%',
    margin: '8px 0',
    padding: '0 10px',
    fontSize: '16px',
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

export default AddBeneficiaryScreen;
