
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { BadgePlus, Download, FilePlus, Link, Plus, RefreshCw, Search } from "lucide-react";

// Sample data (in a real app, this would come from an API/database)
const accounts = [
  {
    id: "1",
    name: "Business Current Account",
    bank: "HDFC Bank",
    accountNumber: "XXXX2345",
    balance: 125000,
    lastUpdated: "2023-06-25T14:30:00Z"
  },
  {
    id: "2",
    name: "Savings Account",
    bank: "ICICI Bank",
    accountNumber: "XXXX5678",
    balance: 45000,
    lastUpdated: "2023-06-25T10:15:00Z"
  },
  {
    id: "3",
    name: "Business Credit Card",
    bank: "HDFC Bank",
    accountNumber: "XXXX9012",
    balance: -12500,
    lastUpdated: "2023-06-24T18:45:00Z"
  },
  {
    id: "4",
    name: "PayTM Business",
    bank: "PayTM Wallet",
    accountNumber: "XXXX3456",
    balance: 8500,
    lastUpdated: "2023-06-25T09:20:00Z"
  },
];

const transactions = [
  {
    id: "1",
    account: "Business Current Account",
    date: "2023-06-24",
    description: "Client Payment - ABC Corp",
    amount: 25000,
    type: "credit"
  },
  {
    id: "2",
    account: "Business Current Account",
    date: "2023-06-23",
    description: "Office Rent",
    amount: 15000,
    type: "debit"
  },
  {
    id: "3",
    account: "Business Credit Card",
    date: "2023-06-22",
    description: "Digital Marketing",
    amount: 5000,
    type: "debit"
  },
  {
    id: "4",
    account: "Savings Account",
    date: "2023-06-21",
    description: "Transfer from Current Account",
    amount: 10000,
    type: "credit"
  },
  {
    id: "5",
    account: "PayTM Business",
    date: "2023-06-20",
    description: "Online Store Sales",
    amount: 8500,
    type: "credit"
  },
  {
    id: "6",
    account: "Business Current Account",
    date: "2023-06-19",
    description: "Utility Bills",
    amount: 3500,
    type: "debit"
  },
  {
    id: "7",
    account: "Business Credit Card",
    date: "2023-06-18",
    description: "Software Subscription",
    amount: 2500,
    type: "debit"
  },
];

const balanceTrendData = [
  { date: "May-20", balance: 85000 },
  { date: "May-27", balance: 100000 },
  { date: "Jun-03", balance: 92000 },
  { date: "Jun-10", balance: 110000 },
  { date: "Jun-17", balance: 130000 },
  { date: "Jun-24", balance: 166000 },
];

const Banking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  const filteredTransactions = transactions.filter(transaction => {
    const query = searchQuery.toLowerCase();
    return (
      transaction.account.toLowerCase().includes(query) ||
      transaction.description.toLowerCase().includes(query)
    );
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Banking</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Link className="h-4 w-4 mr-2" />
              Link Account
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                +₹36,000 from last month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.length}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {accounts.map(a => a.bank).filter((v, i, a) => a.indexOf(v) === i).length} financial institutions
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month's Inflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹43,500</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                +12% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month's Outflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹26,000</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                +5% from last month
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Balance History</CardTitle>
              <CardDescription>Consolidated account balance trend</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, "Balance"]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="balance" name="Total Balance" stroke="#2c7a7b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Accounts</CardTitle>
                <Button size="sm">
                  <BadgePlus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div 
                    key={account.id} 
                    className="border rounded-lg p-3 hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between">
                      <div className="font-medium">{account.name}</div>
                      <div className={`font-semibold ${account.balance < 0 ? 'text-red-500' : ''}`}>
                        ₹{account.balance.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <div>{account.bank} (x{account.accountNumber.slice(-4)})</div>
                      <div>Updated {new Date(account.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <FilePlus className="h-4 w-4 mr-2" />
                  Reconcile
                </Button>
              </div>
            </div>
            <div className="relative w-full mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No transactions found. Try a different search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Banking;
