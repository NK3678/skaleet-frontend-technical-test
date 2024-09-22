import { Transaction, Account } from "@/interface/TransactionInterface";
import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionContext = createContext<{
  transactions: Transaction[];
  balance: number;
  beneficiaries: Account[];
  addTransaction: (amount: string, account: Account) => void;
  addBeneficiary: (name: string, iban: string) => void;
}>({
  transactions: [],
  balance: 0,
  beneficiaries: [],
  addTransaction: () => {},
  addBeneficiary: () => {},
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(100);
  const [beneficiaries, setBeneficiaries] = useState<Account[]>([]);

  useEffect(() => {
    const transactions = localStorage.getItem("transactions");
    const balance = localStorage.getItem("balance");
    const beneficiaries = localStorage.getItem("beneficiaries");

    if (transactions) {
      setTransactions(JSON.parse(transactions));
    }

    if (balance) {
      setBalance(JSON.parse(balance));
    }

    if (beneficiaries) {
      setBeneficiaries(JSON.parse(beneficiaries));
    }
  }, []);

  const addTransaction = useCallback(
    (amount: string, account: Account) => {
      const newTransaction: Transaction = {
        id: Date.now(),
        amount: parseFloat(amount),
        account,
      };
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      setBalance((prevBalance) => prevBalance - parseFloat(amount));

      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactions, newTransaction])
      );
      localStorage.setItem(
        "balance",
        JSON.stringify(balance - parseFloat(amount))
      );
    },
    [transactions, balance]
  );

  const addBeneficiary = useCallback((name: string, iban: string) => {
    const newBeneficiary: Account = {
      name,
      iban,
    };

    setBeneficiaries((prevBeneficiaries) => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);

    localStorage.setItem("beneficiaries", JSON.stringify([...beneficiaries, newBeneficiary]));
  }, [beneficiaries]);

  const context = useMemo(() => {
    return {
      transactions: transactions,
      balance: balance,
      beneficiaries: beneficiaries,
      addTransaction: addTransaction,
      addBeneficiary: addBeneficiary,
    };
  }, [transactions, balance, beneficiaries, addTransaction, addBeneficiary]);

  return (
    <TransactionContext.Provider value={context}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
