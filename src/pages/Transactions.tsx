
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus, Search, FilterIcon, Download, Edit, Trash } from "lucide-react";
import { Transaction } from "@/types";

// Sample data (in a real app, this would come from an API/database)
const sampleTransactions: Transaction[] = [
  { 
    id: "1", 
    date: "2023-06-01", 
    amount: 5000, 
    type: "income", 
    category: "Sales", 
    description: "Product sale", 
    paymentMethod: "UPI" 
  },
  { 
    id: "2", 
    date: "2023-06-05", 
    amount: 1200, 
    type: "expense", 
    category: "Office Supplies", 
    description: "Office stationery", 
    paymentMethod: "Credit Card" 
  },
  { 
    id: "3", 
    date: "2023-06-08", 
    amount: 2500, 
    type: "expense", 
    category: "Rent", 
    description: "Office rent", 
    paymentMethod: "Bank Transfer" 
  },
  { 
    id: "4", 
    date: "2023-06-10", 
    amount: 8000, 
    type: "income", 
    category: "Sales", 
    description: "Consulting services", 
    paymentMethod: "Bank Transfer" 
  },
  { 
    id: "5", 
    date: "2023-06-15", 
    amount: 800, 
    type: "expense", 
    category: "Utilities", 
    description: "Electricity bill", 
    paymentMethod: "Credit Card" 
  },
  { 
    id: "6", 
    date: "2023-06-18", 
    amount: 1500, 
    type: "expense", 
    category: "Marketing", 
    description: "Digital marketing", 
    paymentMethod: "Bank Transfer" 
  },
  { 
    id: "7", 
    date: "2023-06-22", 
    amount: 10000, 
    type: "income", 
    category: "Sales", 
    description: "Product sales", 
    paymentMethod: "UPI" 
  },
  { 
    id: "8", 
    date: "2023-06-25", 
    amount: 3000, 
    type: "expense", 
    category: "Salaries", 
    description: "Part-time staff", 
    paymentMethod: "Bank Transfer" 
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    type: "income",
    category: "",
    description: "",
    paymentMethod: "",
  });
  
  const filteredTransactions = transactions.filter(transaction => {
    const searchLower = searchQuery.toLowerCase();
    return (
      transaction.description.toLowerCase().includes(searchLower) ||
      transaction.category.toLowerCase().includes(searchLower) ||
      transaction.paymentMethod.toLowerCase().includes(searchLower)
    );
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: name === "amount" ? parseFloat(value) : value });
  };
  
  const handleSelectChange = (value: string, field: string) => {
    setNewTransaction({ ...newTransaction, [field]: value });
  };
  
  const handleAddTransaction = () => {
    if (selectedTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(t => 
        t.id === selectedTransaction.id ? { ...t, ...newTransaction as Transaction } : t
      ));
    } else {
      // Add new transaction
      const newTransactionEntry: Transaction = {
        id: `${transactions.length + 1}`,
        date: newTransaction.date || new Date().toISOString().split('T')[0],
        amount: newTransaction.amount || 0,
        type: newTransaction.type as "income" | "expense",
        category: newTransaction.category || "",
        description: newTransaction.description || "",
        paymentMethod: newTransaction.paymentMethod || "",
      };
      setTransactions([...transactions, newTransactionEntry]);
    }
    resetForm();
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setNewTransaction({
      date: transaction.date,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      paymentMethod: transaction.paymentMethod,
    });
    setDialogOpen(true);
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  const resetForm = () => {
    setDialogOpen(false);
    setSelectedTransaction(null);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      type: "income",
      category: "",
      description: "",
      paymentMethod: "",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedTransaction ? "Edit Transaction" : "Add New Transaction"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedTransaction 
                      ? "Update transaction details below." 
                      : "Enter the details of the new transaction."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newTransaction.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={newTransaction.amount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value) => handleSelectChange(value, "type")}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={newTransaction.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Sales, Office Supplies"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newTransaction.description}
                      onChange={handleInputChange}
                      placeholder="Briefly describe the transaction"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={newTransaction.paymentMethod}
                      onValueChange={(value) => handleSelectChange(value, "paymentMethod")}
                    >
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={handleAddTransaction}>
                    {selectedTransaction ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block
                      ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">₹{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No transactions found. Try a different search or add a new transaction.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
