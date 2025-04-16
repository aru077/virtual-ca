
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FilterIcon, Download, Edit, Trash, MoreVertical, Eye, Send } from "lucide-react";
import { Invoice } from "@/types";

// Sample data (in a real app, this would come from an API/database)
const sampleInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    date: "2023-06-01",
    dueDate: "2023-07-01",
    clientName: "Acme Corp",
    amount: 10000,
    taxAmount: 1800,
    status: "paid",
    items: [
      {
        id: "1-1",
        description: "Web Development Services",
        quantity: 1,
        unitPrice: 10000,
        taxRate: 18,
        amount: 10000
      }
    ]
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    date: "2023-06-10",
    dueDate: "2023-07-10",
    clientName: "TechStart Inc",
    amount: 25000,
    taxAmount: 4500,
    status: "pending",
    items: [
      {
        id: "2-1",
        description: "Mobile App Development",
        quantity: 1,
        unitPrice: 25000,
        taxRate: 18,
        amount: 25000
      }
    ]
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    date: "2023-05-15",
    dueDate: "2023-06-15",
    clientName: "Global Retail",
    amount: 8500,
    taxAmount: 1530,
    status: "overdue",
    items: [
      {
        id: "3-1",
        description: "SEO Services",
        quantity: 1,
        unitPrice: 8500,
        taxRate: 18,
        amount: 8500
      }
    ]
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    date: "2023-06-20",
    dueDate: "2023-07-20",
    clientName: "Local Bakery",
    amount: 5000,
    taxAmount: 900,
    status: "pending",
    items: [
      {
        id: "4-1",
        description: "Website Maintenance",
        quantity: 1,
        unitPrice: 5000,
        taxRate: 18,
        amount: 5000
      }
    ]
  },
];

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredInvoices = invoices.filter(invoice => {
    const searchLower = searchQuery.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.clientName.toLowerCase().includes(searchLower)
    );
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(invoice.status)} border-0`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No invoices found. Try a different search or create a new invoice.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-base">Invoice Summary</h3>
              <p className="text-muted-foreground text-sm">Current financial period</p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-muted-foreground text-sm">Total Invoiced</div>
                <div className="font-medium">₹{invoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Paid</div>
                <div className="font-medium">₹{invoices.filter(i => i.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Pending/Overdue</div>
                <div className="font-medium">₹{invoices.filter(i => i.status !== "paid").reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Invoices;
