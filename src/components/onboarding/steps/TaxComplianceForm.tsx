
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TaxComplianceFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const TaxComplianceForm = ({ formData, updateFormData }: TaxComplianceFormProps) => {
  const handleGstChange = (checked: boolean) => {
    updateFormData({ gstRegistered: checked });
    if (!checked) {
      updateFormData({ gstScheme: "" });
    }
  };
  
  const handleTdsChange = (checked: boolean) => {
    updateFormData({ tdsDeduction: checked });
  };
  
  const handleTaxFilingChange = (checked: boolean) => {
    updateFormData({ taxFilingStatus: checked });
  };
  
  const handleSelectChange = (value: string) => {
    updateFormData({ gstScheme: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="gstRegistered" className="cursor-pointer">Is your business GST registered?</Label>
          <Switch
            id="gstRegistered"
            checked={formData.gstRegistered}
            onCheckedChange={handleGstChange}
          />
        </div>
      </div>
      
      {formData.gstRegistered && (
        <div className="space-y-2 ml-4 pl-2 border-l-2 border-secondary">
          <Label htmlFor="gstScheme">Which GST scheme?</Label>
          <Select
            value={formData.gstScheme}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger id="gstScheme">
              <SelectValue placeholder="Select GST scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular Scheme</SelectItem>
              <SelectItem value="composition">Composition Scheme</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tdsDeduction" className="cursor-pointer">Are you deducting TDS for vendors or employees?</Label>
          <Switch
            id="tdsDeduction"
            checked={formData.tdsDeduction}
            onCheckedChange={handleTdsChange}
          />
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="taxFilingStatus" className="cursor-pointer">Have you filed Income Tax and GST returns for the past year?</Label>
          <Switch
            id="taxFilingStatus"
            checked={formData.taxFilingStatus}
            onCheckedChange={handleTaxFilingChange}
          />
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          Tax compliance is crucial for any business. This information helps us ensure your business remains compliant with all tax regulations and identifies potential tax-saving opportunities.
        </p>
      </div>
    </div>
  );
};

export default TaxComplianceForm;
