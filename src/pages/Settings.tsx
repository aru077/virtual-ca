
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, CreditCard, HelpCircle, Lock, Save, User } from "lucide-react";

const Settings = () => {
  const [businessName, setBusinessName] = useState("Acme Inc.");
  const [email, setEmail] = useState("info@acmeinc.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [gstNumber, setGstNumber] = useState("27AADCB2230M1ZT");
  const [panNumber, setPanNumber] = useState("AADCB2230M");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taxReminders, setTaxReminders] = useState(true);
  const [invoiceReminders, setInvoiceReminders] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(false);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your business profile details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt={businessName} />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="entityType">Business Entity Type</Label>
                      <Select defaultValue="privateLimit">
                        <SelectTrigger id="entityType">
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soleProprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="llp">LLP</SelectItem>
                          <SelectItem value="privateLimit">Private Limited</SelectItem>
                          <SelectItem value="publicLimit">Public Limited</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finYear">Financial Year</Label>
                      <Select defaultValue="april-march">
                        <SelectTrigger id="finYear">
                          <SelectValue placeholder="Select financial year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="april-march">April - March</SelectItem>
                          <SelectItem value="jan-dec">January - December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="block text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Reminder Types</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="taxReminders" className="block text-sm">Tax Filing Reminders</Label>
                        <p className="text-xs text-muted-foreground">Get notified about upcoming tax deadlines.</p>
                      </div>
                      <Switch
                        id="taxReminders"
                        checked={taxReminders}
                        onCheckedChange={setTaxReminders}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="invoiceReminders" className="block text-sm">Invoice Reminders</Label>
                        <p className="text-xs text-muted-foreground">Get notified about due or overdue invoices.</p>
                      </div>
                      <Switch
                        id="invoiceReminders"
                        checked={invoiceReminders}
                        onCheckedChange={setInvoiceReminders}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="expenseReminders" className="block text-sm">Expense Reminders</Label>
                        <p className="text-xs text-muted-foreground">Get notified about recurring expenses.</p>
                      </div>
                      <Switch
                        id="expenseReminders"
                        checked={expenseReminders}
                        onCheckedChange={setExpenseReminders}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminderFrequency">Reminder Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="reminderFrequency">
                        <SelectValue placeholder="Select reminder frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Current Plan: Professional</h3>
                        <p className="text-sm text-muted-foreground">Your plan renews on July 28, 2023</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Payment Methods</h3>
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-xs text-muted-foreground">Expires 05/25</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Billing Address</h3>
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between">
                        <div>
                          <div>Acme Inc.</div>
                          <div className="text-sm text-muted-foreground">123 Business Avenue</div>
                          <div className="text-sm text-muted-foreground">Mumbai, Maharashtra - 400001</div>
                          <div className="text-sm text-muted-foreground">India</div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Billing History</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Invoice #12345</div>
                          <div className="text-xs text-muted-foreground">June 28, 2023</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="font-medium">₹1,999</div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Invoice #12344</div>
                          <div className="text-xs text-muted-foreground">May 28, 2023</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="font-medium">₹1,999</div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="mt-2">Update Password</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Active Sessions</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="p-3">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Current Session</div>
                            <div className="text-xs text-muted-foreground">Mumbai, India • Chrome on Windows</div>
                          </div>
                          <div className="text-xs text-muted-foreground">Active now</div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Mobile Session</div>
                            <div className="text-xs text-muted-foreground">Mumbai, India • Shokei App on iOS</div>
                          </div>
                          <div className="text-xs text-muted-foreground">5 hours ago</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">Sign Out All Other Sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>
                  Get help with using Shokei or contact our support team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Documentation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn how to use Shokei with our comprehensive documentation.
                      </p>
                      <Button variant="outline">Browse Guides</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Watch step-by-step tutorial videos to get the most out of Shokei.
                      </p>
                      <Button variant="outline">Watch Videos</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">FAQs</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Find answers to commonly asked questions about Shokei.
                      </p>
                      <Button variant="outline">Read FAQs</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Need personalized help? Our support team is ready to assist you.
                      </p>
                      <Button>Contact Support</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Book a Consultation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Schedule a one-on-one consultation with one of our financial experts to get personalized advice.
                    </p>
                    <Button variant="outline">Schedule Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
