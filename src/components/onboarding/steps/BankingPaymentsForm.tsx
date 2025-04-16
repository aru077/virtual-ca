
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

interface BankingPaymentsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const BankingPaymentsForm = ({ formData, updateFormData }: BankingPaymentsFormProps) => {
  const paymentMethods = [
    { id: "upi", label: "UPI" },
    { id: "cash", label: "Cash" },
    { id: "bankTransfer", label: "Bank Transfer" },
    { id: "cards", label: "Credit/Debit Cards" },
    { id: "wallet", label: "Digital Wallets" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: parseInt(e.target.value) || 0 });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    updateFormData({ loans: checked });
  };
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    let methods = [...formData.paymentMethods];
    if (checked) {
      methods.push(id);
    } else {
      methods = methods.filter(method => method !== id);
    }
    updateFormData({ paymentMethods: methods });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bankAccounts">How many bank accounts or wallets are linked to the business?</Label>
        <Input
          id="bankAccounts"
          name="bankAccounts"
          type="number"
          value={formData.bankAccounts || ""}
          onChange={handleChange}
          placeholder="e.g., 2"
          min={0}
        />
      </div>
      
      <div className="space-y-2">
        <Label className="block mb-2">Do you accept payments via:</Label>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <FormItem key={method.id} className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={formData.paymentMethods?.includes(method.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(method.id, !!checked)}
                />
              </FormControl>
              <FormLabel className="font-normal">{method.label}</FormLabel>
            </FormItem>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="loans" className="cursor-pointer">Any loans or EMIs currently active?</Label>
          <Switch
            id="loans"
            checked={formData.loans}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          Understanding your banking arrangements helps us integrate with your existing financial infrastructure and provide better cash flow management.
        </p>
      </div>
    </div>
  );
};

export default BankingPaymentsForm;
