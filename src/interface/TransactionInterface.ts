export interface Account {
  name: string;
  iban: string;
}
export interface Transaction {
  id: number;
  amount: number;
  account: Account;
}
