
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TeamPayrollFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const TeamPayrollForm = ({ formData, updateFormData }: TeamPayrollFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: parseInt(e.target.value) || 0 });
  };
  
  const handleSelectChange = (value: string) => {
    updateFormData({ paymentFrequency: value });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    updateFormData({ incentives: checked });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teamSize">How many people work with you (full-time/part-time/freelancers)?</Label>
        <Input
          id="teamSize"
          name="teamSize"
          type="number"
          value={formData.teamSize || ""}
          onChange={handleChange}
          placeholder="e.g., 5"
          min={0}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="paymentFrequency">Do you pay salaries monthly, or on a per-project basis?</Label>
        <Select
          value={formData.paymentFrequency}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger id="paymentFrequency">
            <SelectValue placeholder="Select payment frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="biweekly">Bi-Weekly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="project">Per Project</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="incentives" className="cursor-pointer">Any ESOPs or incentives in place?</Label>
          <Switch
            id="incentives"
            checked={formData.incentives}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          Payroll is often one of the largest expenses for a business. Understanding your team structure helps us optimize payroll processing and ensure compliance with labor laws.
        </p>
      </div>
    </div>
  );
};

export default TeamPayrollForm;
