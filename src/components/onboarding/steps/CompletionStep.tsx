
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionStepProps {
  formData: any;
  onComplete: () => void;
}

const CompletionStep = ({ formData, onComplete }: CompletionStepProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-accent" />
      </div>
      
      <h3 className="text-xl font-semibold">Setup Complete!</h3>
      
      <p className="text-muted-foreground">
        Thank you for providing your business information. We've set up your financial profile and are ready to help you manage your finances more efficiently.
      </p>
      
      <div className="bg-secondary/30 p-4 rounded-lg space-y-4 text-left">
        <h4 className="font-medium">{formData.name}</h4>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Entity Type:</span>
            <p>{formData.entityType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
          </div>
          
          <div>
            <span className="text-muted-foreground">Monthly Revenue:</span>
            <p>₹{formData.avgMonthlyRevenue.toLocaleString()}</p>
          </div>
          
          <div>
            <span className="text-muted-foreground">GST Registered:</span>
            <p>{formData.gstRegistered ? "Yes" : "No"}</p>
          </div>
          
          <div>
            <span className="text-muted-foreground">Team Size:</span>
            <p>{formData.teamSize} people</p>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button onClick={onComplete} className="w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
