
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, FilterIcon, Download, Edit, Trash, Upload } from "lucide-react";
import { Expense } from "@/types";

// Sample data (in a real app, this would come from an API/database)
const sampleExpenses: Expense[] = [
  { 
    id: "1", 
    date: "2023-06-05", 
    vendor: "Office Supplies Co.", 
    category: "Office Supplies", 
    amount: 1200, 
    taxAmount: 216, 
    description: "Stationery and office materials" 
  },
  { 
    id: "2", 
    date: "2023-06-08", 
    vendor: "City Properties", 
    category: "Rent", 
    amount: 15000, 
    taxAmount: 0, 
    description: "Office rent for June" 
  },
  { 
    id: "3", 
    date: "2023-06-10", 
    vendor: "Internet Provider", 
    category: "Utilities", 
    amount: 1500, 
    taxAmount: 270, 
    description: "Monthly internet subscription" 
  },
  { 
    id: "4", 
    date: "2023-06-15", 
    vendor: "Power Corp", 
    category: "Utilities", 
    amount: 2800, 
    taxAmount: 504, 
    description: "Electricity bill for May-June" 
  },
  { 
    id: "5", 
    date: "2023-06-18", 
    vendor: "Digital Marketing Agency", 
    category: "Marketing", 
    amount: 10000, 
    taxAmount: 1800, 
    description: "Social media marketing campaign" 
  },
  { 
    id: "6", 
    date: "2023-06-20", 
    vendor: "Cloud Services Inc", 
    category: "Software", 
    amount: 5000, 
    taxAmount: 900, 
    description: "Monthly cloud hosting services" 
  },
  { 
    id: "7", 
    date: "2023-06-25", 
    vendor: "Team Lunch", 
    category: "Meals & Entertainment", 
    amount: 3500, 
    taxAmount: 630, 
    description: "Team lunch for project completion" 
  },
];

const categories = [
  "Office Supplies",
  "Rent",
  "Utilities",
  "Marketing",
  "Software",
  "Travel",
  "Meals & Entertainment",
  "Salaries",
  "Professional Services",
  "Other"
];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split('T')[0],
    vendor: "",
    category: "",
    amount: 0,
    taxAmount: 0,
    description: "",
  });
  
  const filteredExpenses = expenses.filter(expense => {
    const searchLower = searchQuery.toLowerCase();
    return (
      expense.vendor.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower) ||
      expense.category.toLowerCase().includes(searchLower)
    );
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExpense({ 
      ...newExpense, 
      [name]: name === "amount" || name === "taxAmount" ? parseFloat(value) : value 
    });
  };
  
  const handleSelectChange = (value: string) => {
    setNewExpense({ ...newExpense, category: value });
  };
  
  const handleAddExpense = () => {
    if (selectedExpense) {
      // Update existing expense
      setExpenses(expenses.map(e => 
        e.id === selectedExpense.id ? { ...e, ...newExpense as Expense } : e
      ));
    } else {
      // Add new expense
      const newExpenseEntry: Expense = {
        id: `${expenses.length + 1}`,
        date: newExpense.date || new Date().toISOString().split('T')[0],
        vendor: newExpense.vendor || "",
        category: newExpense.category || "",
        amount: newExpense.amount || 0,
        taxAmount: newExpense.taxAmount || 0,
        description: newExpense.description || "",
      };
      setExpenses([...expenses, newExpenseEntry]);
    }
    resetForm();
  };
  
  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setNewExpense({
      date: expense.date,
      vendor: expense.vendor,
      category: expense.category,
      amount: expense.amount,
      taxAmount: expense.taxAmount,
      description: expense.description,
    });
    setDialogOpen(true);
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  
  const resetForm = () => {
    setDialogOpen(false);
    setSelectedExpense(null);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      vendor: "",
      category: "",
      amount: 0,
      taxAmount: 0,
      description: "",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
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
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedExpense ? "Edit Expense" : "Add New Expense"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedExpense 
                      ? "Update expense details below." 
                      : "Enter the details of the new expense."}
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
                        value={newExpense.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor">Vendor/Payee</Label>
                      <Input
                        id="vendor"
                        name="vendor"
                        value={newExpense.vendor}
                        onChange={handleInputChange}
                        placeholder="Who was paid"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          value={newExpense.amount}
                          onChange={handleInputChange}
                          className="pl-8"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxAmount">Tax Amount</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <Input
                          id="taxAmount"
                          name="taxAmount"
                          type="number"
                          value={newExpense.taxAmount}
                          onChange={handleInputChange}
                          className="pl-8"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newExpense.description}
                      onChange={handleInputChange}
                      placeholder="Provide details about this expense"
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Receipt</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop your receipt here or click to browse
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Receipt
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={handleAddExpense}>
                    {selectedExpense ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
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
                <TableHead>Vendor/Payee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{expense.description}</TableCell>
                  <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">₹{expense.taxAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditExpense(expense)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No expenses found. Try a different search or add a new expense.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h3 className="font-medium mb-2">Expense Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-muted-foreground text-sm">Total Expenses</div>
                <div className="font-medium">₹{expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Total Tax</div>
                <div className="font-medium">₹{expenses.reduce((sum, expense) => sum + expense.taxAmount, 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-4">
            <h3 className="font-medium mb-2">Top Expense Categories</h3>
            <div className="space-y-2">
              {categories.slice(0, 4).map(category => {
                const categoryTotal = expenses
                  .filter(e => e.category === category)
                  .reduce((sum, e) => sum + e.amount, 0);
                
                if (categoryTotal === 0) return null;
                
                const percentage = Math.round((categoryTotal / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100);
                
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span>₹{categoryTotal.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Expenses;
