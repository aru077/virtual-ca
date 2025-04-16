
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download, Filter, Plus, Search, UserPlus } from "lucide-react";
import { Employee } from "@/types";

// Sample data
const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    position: "Software Developer",
    joinDate: "2021-06-15",
    salary: 65000,
    paymentFrequency: "monthly"
  },
  {
    id: "2",
    name: "Priya Singh",
    position: "Marketing Manager",
    joinDate: "2022-02-10",
    salary: 75000,
    paymentFrequency: "monthly"
  },
  {
    id: "3",
    name: "Amit Patel",
    position: "UI Designer",
    joinDate: "2021-09-22",
    salary: 60000,
    paymentFrequency: "monthly"
  },
  {
    id: "4",
    name: "Neha Gupta",
    position: "Content Writer",
    joinDate: "2022-05-05",
    salary: 45000,
    paymentFrequency: "monthly"
  },
  {
    id: "5",
    name: "Vikram Reddy",
    position: "Sales Executive",
    joinDate: "2021-11-18",
    salary: 40000,
    paymentFrequency: "monthly"
  }
];

const Payroll = () => {
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEmployees = employees.filter(employee => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query)
    );
  });
  
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              June 2023
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalPayroll.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{Math.round(totalPayroll / employees.length).toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Payment Frequency</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{employee.paymentFrequency}</TableCell>
                  <TableCell className="text-right">₹{employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No employees found. Try a different search or add employees.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-base">Next Payroll: June 30, 2023</h3>
              <p className="text-muted-foreground text-sm">10 days remaining</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Download Report</Button>
              <Button>Process Payroll</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payroll;
