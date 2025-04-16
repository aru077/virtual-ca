
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, Pie } from "recharts";
import { AlertCircle, TrendingUp, TrendingDown, CheckCircle, Clock } from "lucide-react";

// Sample data (in a real app, this would come from an API/database)
const revenueData = [
  { month: 'Jan', revenue: 24000, expenses: 18000, profit: 6000 },
  { month: 'Feb', revenue: 26000, expenses: 16000, profit: 10000 },
  { month: 'Mar', revenue: 28000, expenses: 19000, profit: 9000 },
  { month: 'Apr', revenue: 32000, expenses: 20000, profit: 12000 },
  { month: 'May', revenue: 38000, expenses: 22000, profit: 16000 },
  { month: 'Jun', revenue: 42000, expenses: 24000, profit: 18000 },
];

const cashflowData = [
  { month: 'Jan', inflow: 30000, outflow: 25000, balance: 5000 },
  { month: 'Feb', inflow: 35000, outflow: 28000, balance: 7000 },
  { month: 'Mar', inflow: 33000, outflow: 30000, balance: 3000 },
  { month: 'Apr', inflow: 40000, outflow: 32000, balance: 8000 },
  { month: 'May', inflow: 45000, outflow: 35000, balance: 10000 },
  { month: 'Jun', inflow: 50000, outflow: 38000, balance: 12000 },
];

const profitabilityData = [
  { name: 'Gross Profit', value: 65 },
  { name: 'Operating Profit', value: 25 },
  { name: 'Net Profit', value: 10 },
];

const COLORS = ['#2c7a7b', '#4299e1', '#9f7aea'];

const taxFilings = [
  { id: 1, type: 'GST', dueDate: '2023-07-20', status: 'pending', name: 'GSTR-1 (June 2023)' },
  { id: 2, type: 'TDS', dueDate: '2023-07-15', status: 'overdue', name: 'TDS Return (Q1 2023)' },
  { id: 3, type: 'Income Tax', dueDate: '2023-07-31', status: 'filed', name: 'Advance Tax (Q1 2023)' },
  { id: 4, type: 'GST', dueDate: '2023-08-20', status: 'pending', name: 'GSTR-3B (July 2023)' },
];

const Dashboard = () => {
  const [period, setPeriod] = useState("monthly");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
          <Tabs defaultValue="monthly" onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹42,000</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹24,000</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8.3% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹18,000</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+20.0% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹75,000</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+20.0% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs. Expenses</CardTitle>
              <CardDescription>Monthly breakdown of financial performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, undefined]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#2c7a7b" />
                  <Bar dataKey="expenses" name="Expenses" fill="#fc8181" />
                  <Bar dataKey="profit" name="Profit" fill="#4299e1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Tracking inflow, outflow, and balance</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, undefined]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="inflow" name="Inflow" stroke="#2c7a7b" strokeWidth={2} />
                  <Line type="monotone" dataKey="outflow" name="Outflow" stroke="#fc8181" strokeWidth={2} />
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#4299e1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profitability Metrics</CardTitle>
              <CardDescription>Distribution of profit margins</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={profitabilityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {profitabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, undefined]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tax Compliance Status</CardTitle>
              <CardDescription>Upcoming and pending tax filings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxFilings.map((filing) => (
                  <div key={filing.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      {filing.status === 'pending' && <Clock className="h-5 w-5 text-amber-500 mr-2" />}
                      {filing.status === 'overdue' && <AlertCircle className="h-5 w-5 text-destructive mr-2" />}
                      {filing.status === 'filed' && <CheckCircle className="h-5 w-5 text-green-500 mr-2" />}
                      <div>
                        <div className="font-medium">{filing.name}</div>
                        <div className="text-sm text-muted-foreground">Due: {new Date(filing.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium
                        ${filing.status === 'pending' ? 'bg-amber-100 text-amber-800' : ''}
                        ${filing.status === 'overdue' ? 'bg-red-100 text-red-800' : ''}
                        ${filing.status === 'filed' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {filing.status.charAt(0).toUpperCase() + filing.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Insights & Recommendations</CardTitle>
            <CardDescription>Based on your financial data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Revenue Growth</div>
                <div className="text-sm text-muted-foreground">
                  Your revenue has grown by 15% over the last 3 months. Consider reinvesting in marketing to capitalize on this growth trend.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <div className="font-medium">GST Filing Due</div>
                <div className="text-sm text-muted-foreground">
                  Your GSTR-1 filing for June 2023 is due in 5 days. Please ensure all invoices are recorded to avoid penalties.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <div className="font-medium">Expense Optimization</div>
                <div className="text-sm text-muted-foreground">
                  Your subscription costs have increased by 25%. Consider reviewing your SaaS subscriptions to identify potential cost-saving opportunities.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
