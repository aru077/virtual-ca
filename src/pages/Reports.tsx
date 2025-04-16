
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Bar, 
  Line, 
  Pie, 
  AreaChart,
  Area
} from "recharts";
import { Calendar, Download, Filter, Share } from "lucide-react";

// Sample data (in a real app, this would come from an API)
const monthlyData = [
  { month: 'Jan', revenue: 24000, expenses: 18000, profit: 6000 },
  { month: 'Feb', revenue: 26000, expenses: 16000, profit: 10000 },
  { month: 'Mar', revenue: 28000, expenses: 19000, profit: 9000 },
  { month: 'Apr', revenue: 32000, expenses: 20000, profit: 12000 },
  { month: 'May', revenue: 38000, expenses: 22000, profit: 16000 },
  { month: 'Jun', revenue: 42000, expenses: 24000, profit: 18000 },
];

const categoryData = [
  { name: 'Sales', value: 75000 },
  { name: 'Consulting', value: 30000 },
  { name: 'Subscriptions', value: 15000 },
];

const expenseCategoryData = [
  { name: 'Rent', value: 15000 },
  { name: 'Salaries', value: 35000 },
  { name: 'Marketing', value: 10000 },
  { name: 'Utilities', value: 6000 },
  { name: 'Office Supplies', value: 3000 },
  { name: 'Software', value: 5000 },
  { name: 'Other', value: 2000 },
];

const cashflowData = [
  { month: 'Jan', inflow: 30000, outflow: 25000, balance: 5000 },
  { month: 'Feb', inflow: 35000, outflow: 28000, balance: 7000 },
  { month: 'Mar', inflow: 33000, outflow: 30000, balance: 3000 },
  { month: 'Apr', inflow: 40000, outflow: 32000, balance: 8000 },
  { month: 'May', inflow: 45000, outflow: 35000, balance: 10000 },
  { month: 'Jun', inflow: 50000, outflow: 38000, balance: 12000 },
];

const COLORS = ['#2c7a7b', '#4299e1', '#9f7aea', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];

const Reports = () => {
  const [period, setPeriod] = useState("monthly");
  const [reportType, setReportType] = useState("pl");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 6 Months
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="pl" onValueChange={setReportType}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="pl">Profit & Loss</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pl" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{monthlyData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{monthlyData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Net Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{monthlyData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Analysis</CardTitle>
                <CardDescription>Monthly profit margin percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.map(item => ({
                    month: item.month,
                    margin: parseFloat(((item.profit / item.revenue) * 100).toFixed(1))
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Profit Margin"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line type="monotone" dataKey="margin" name="Profit Margin" stroke="#2c7a7b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cashflow" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Statement</CardTitle>
                <CardDescription>Monthly inflow, outflow, and balance</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="inflow" name="Cash Inflow" stroke="#2c7a7b" fill="#2c7a7b" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="outflow" name="Cash Outflow" stroke="#fc8181" fill="#fc8181" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="balance" name="Net Cash Flow" stroke="#4299e1" fill="#4299e1" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Total Cash Inflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{cashflowData.reduce((sum, item) => sum + item.inflow, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Total Cash Outflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{cashflowData.reduce((sum, item) => sum + item.outflow, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Net Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{cashflowData.reduce((sum, item) => sum + item.balance, 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Burn Rate</CardTitle>
                <CardDescription>Monthly cash runway analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashflowData.map(item => ({
                    month: item.month,
                    burnRate: parseFloat((item.outflow / 30).toFixed(2)),
                    runway: parseFloat((item.balance / (item.outflow / 30)).toFixed(1))
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#fc8181" />
                    <YAxis yAxisId="right" orientation="right" stroke="#4299e1" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="burnRate" name="Daily Burn Rate (₹)" stroke="#fc8181" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="runway" name="Runway (Days)" stroke="#4299e1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Month</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="#2c7a7b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Breakdown of revenue sources</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Month-to-month revenue growth percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.map((item, index, arr) => ({
                    month: item.month,
                    revenue: item.revenue,
                    growth: index > 0 
                      ? parseFloat((((item.revenue - arr[index-1].revenue) / arr[index-1].revenue) * 100).toFixed(1)) 
                      : 0
                  })).slice(1)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Growth Rate"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line type="monotone" dataKey="growth" name="Growth Rate" stroke="#2c7a7b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Month</CardTitle>
                  <CardDescription>Monthly expense trends</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, "Expenses"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="expenses" name="Expenses" fill="#fc8181" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                  <CardDescription>Breakdown of expense categories</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense to Revenue Ratio</CardTitle>
                <CardDescription>Monthly expense as percentage of revenue</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.map(item => ({
                    month: item.month,
                    ratio: parseFloat(((item.expenses / item.revenue) * 100).toFixed(1))
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Expense Ratio"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line type="monotone" dataKey="ratio" name="Expense to Revenue Ratio" stroke="#fc8181" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
