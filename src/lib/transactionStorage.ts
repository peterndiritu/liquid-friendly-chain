export interface Transaction {
  hash: string;
  type: 'purchase' | 'claim' | 'transfer' | 'approve';
  amount: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  from: string;
  to: string;
  gasUsed?: string;
  blockNumber?: number;
}

const STORAGE_KEY = 'fld_transactions_';

export const saveTransaction = (tx: Transaction, address: string): void => {
  try {
    const key = STORAGE_KEY + address.toLowerCase();
    const existing = getTransactions(address);
    const updated = [tx, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
};

export const getTransactions = (address: string): Transaction[] => {
  try {
    const key = STORAGE_KEY + address.toLowerCase();
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get transactions:', error);
    return [];
  }
};

export const updateTransactionStatus = (
  address: string,
  hash: string,
  updates: Partial<Transaction>
): void => {
  try {
    const transactions = getTransactions(address);
    const updated = transactions.map(tx => 
      tx.hash.toLowerCase() === hash.toLowerCase() 
        ? { ...tx, ...updates } 
        : tx
    );
    const key = STORAGE_KEY + address.toLowerCase();
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update transaction:', error);
  }
};

export const clearTransactions = (address: string): void => {
  try {
    const key = STORAGE_KEY + address.toLowerCase();
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear transactions:', error);
  }
};

export const exportTransactionsToCSV = (transactions: Transaction[]): void => {
  const headers = ['Hash', 'Type', 'Amount', 'Date', 'Status', 'From', 'To', 'Block'];
  const rows = transactions.map(tx => [
    tx.hash,
    tx.type,
    tx.amount,
    new Date(tx.timestamp).toLocaleString(),
    tx.status,
    tx.from,
    tx.to,
    tx.blockNumber?.toString() || '',
  ]);
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fld-transactions-${Date.now()}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
