
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

interface RevenueExpensesFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const RevenueExpensesForm = ({ formData, updateFormData }: RevenueExpensesFormProps) => {
  const [majorCost, setMajorCost] = useState("");
  const [subscription, setSubscription] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: parseFloat(e.target.value) || 0 });
  };
  
  const addMajorCost = () => {
    if (majorCost.trim() !== "") {
      const newMajorCosts = [...formData.majorCosts, majorCost];
      updateFormData({ majorCosts: newMajorCosts });
      setMajorCost("");
    }
  };
  
  const removeMajorCost = (index: number) => {
    const newMajorCosts = [...formData.majorCosts];
    newMajorCosts.splice(index, 1);
    updateFormData({ majorCosts: newMajorCosts });
  };
  
  const addSubscription = () => {
    if (subscription.trim() !== "") {
      const newSubscriptions = [...formData.recurringSubscriptions, subscription];
      updateFormData({ recurringSubscriptions: newSubscriptions });
      setSubscription("");
    }
  };
  
  const removeSubscription = (index: number) => {
    const newSubscriptions = [...formData.recurringSubscriptions];
    newSubscriptions.splice(index, 1);
    updateFormData({ recurringSubscriptions: newSubscriptions });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avgMonthlyRevenue">What is your average monthly revenue?</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">₹</span>
          </div>
          <Input
            id="avgMonthlyRevenue"
            name="avgMonthlyRevenue"
            type="number"
            value={formData.avgMonthlyRevenue || ""}
            onChange={handleChange}
            className="pl-8"
            placeholder="0.00"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="avgMonthlyExpense">What is your average monthly expense?</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">₹</span>
          </div>
          <Input
            id="avgMonthlyExpense"
            name="avgMonthlyExpense"
            type="number"
            value={formData.avgMonthlyExpense || ""}
            onChange={handleChange}
            className="pl-8"
            placeholder="0.00"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="majorCosts">What are your major fixed and variable costs?</Label>
        <div className="flex gap-2">
          <Input
            id="majorCosts"
            value={majorCost}
            onChange={(e) => setMajorCost(e.target.value)}
            placeholder="e.g., Rent, Salaries, Marketing"
          />
          <Button type="button" onClick={addMajorCost} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.majorCosts?.map((cost: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {cost}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removeMajorCost(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subscriptions">Any recurring subscriptions or software/tools you pay for?</Label>
        <div className="flex gap-2">
          <Input
            id="subscriptions"
            value={subscription}
            onChange={(e) => setSubscription(e.target.value)}
            placeholder="e.g., CRM, Accounting software"
          />
          <Button type="button" onClick={addSubscription} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.recurringSubscriptions?.map((sub: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {sub}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removeSubscription(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          This information helps us analyze your financial patterns and identify potential areas to optimize your expenses and improve profitability.
        </p>
      </div>
    </div>
  );
};

export default RevenueExpensesForm;
