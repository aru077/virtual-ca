
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface BusinessDetailsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const BusinessDetailsForm = ({ formData, updateFormData }: BusinessDetailsFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: string) => {
    updateFormData({ [field]: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">What is the name of your business?</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Acme Inc."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="entityType">What kind of entity is it?</Label>
        <Select
          value={formData.entityType}
          onValueChange={(value) => handleSelectChange(value, "entityType")}
        >
          <SelectTrigger id="entityType">
            <SelectValue placeholder="Select entity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soleProprietorship">Sole Proprietorship</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
            <SelectItem value="privateLimited">Private Limited Company</SelectItem>
            <SelectItem value="publicLimited">Public Limited Company</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="establishmentDate">When was it established?</Label>
        <Input
          id="establishmentDate"
          name="establishmentDate"
          type="date"
          value={formData.establishmentDate}
          onChange={handleChange}
        />
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          This information helps us understand your business structure and history, allowing us to provide more personalized financial insights.
        </p>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;
