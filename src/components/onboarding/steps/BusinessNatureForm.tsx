
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface BusinessNatureFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const BusinessNatureForm = ({ formData, updateFormData }: BusinessNatureFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: string) => {
    updateFormData({ [field]: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="products">What product(s) or service(s) do you offer?</Label>
        <Textarea
          id="products"
          name="products"
          value={formData.products}
          onChange={handleChange}
          placeholder="Briefly describe your main products or services"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="operationMode">Do you operate online, offline, or hybrid?</Label>
        <Select
          value={formData.operationMode}
          onValueChange={(value) => handleSelectChange(value, "operationMode")}
        >
          <SelectTrigger id="operationMode">
            <SelectValue placeholder="Select operation mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online Only</SelectItem>
            <SelectItem value="offline">Offline Only</SelectItem>
            <SelectItem value="hybrid">Hybrid (Both Online & Offline)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientType">Do you have domestic clients only or international ones too?</Label>
        <Select
          value={formData.clientType}
          onValueChange={(value) => handleSelectChange(value, "clientType")}
        >
          <SelectTrigger id="clientType">
            <SelectValue placeholder="Select client type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="domestic">Domestic Only</SelectItem>
            <SelectItem value="international">International Only</SelectItem>
            <SelectItem value="both">Both Domestic & International</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          Understanding the nature of your business helps us provide relevant tax and compliance recommendations that match your specific business model.
        </p>
      </div>
    </div>
  );
};

export default BusinessNatureForm;
