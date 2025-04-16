
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

interface GoalsConcernsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const GoalsConcernsForm = ({ formData, updateFormData }: GoalsConcernsFormProps) => {
  const [goal, setGoal] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [helpNeeded, setHelpNeeded] = useState("");
  
  const addGoal = () => {
    if (goal.trim() !== "") {
      const newGoals = [...formData.businessGoals, goal];
      updateFormData({ businessGoals: newGoals });
      setGoal("");
    }
  };
  
  const removeGoal = (index: number) => {
    const newGoals = [...formData.businessGoals];
    newGoals.splice(index, 1);
    updateFormData({ businessGoals: newGoals });
  };
  
  const addPainPoint = () => {
    if (painPoint.trim() !== "") {
      const newPainPoints = [...formData.painPoints, painPoint];
      updateFormData({ painPoints: newPainPoints });
      setPainPoint("");
    }
  };
  
  const removePainPoint = (index: number) => {
    const newPainPoints = [...formData.painPoints];
    newPainPoints.splice(index, 1);
    updateFormData({ painPoints: newPainPoints });
  };
  
  const addHelpNeeded = () => {
    if (helpNeeded.trim() !== "") {
      const newHelpNeeded = [...formData.helpNeeded, helpNeeded];
      updateFormData({ helpNeeded: newHelpNeeded });
      setHelpNeeded("");
    }
  };
  
  const removeHelpNeeded = (index: number) => {
    const newHelpNeeded = [...formData.helpNeeded];
    newHelpNeeded.splice(index, 1);
    updateFormData({ helpNeeded: newHelpNeeded });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goals">What are your top 3 goals in the next 6–12 months?</Label>
        <div className="flex gap-2">
          <Input
            id="goals"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Increase revenue by 20%"
          />
          <Button type="button" onClick={addGoal} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.businessGoals?.map((goal: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {goal}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removeGoal(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="painPoints">Any current pain points in accounting, compliance, or cashflow?</Label>
        <div className="flex gap-2">
          <Input
            id="painPoints"
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            placeholder="e.g., Late tax filing, Cash flow issues"
          />
          <Button type="button" onClick={addPainPoint} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.painPoints?.map((point: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {point}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removePainPoint(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="helpNeeded">Do you want help with funding, investor reports, or business planning?</Label>
        <div className="flex gap-2">
          <Input
            id="helpNeeded"
            value={helpNeeded}
            onChange={(e) => setHelpNeeded(e.target.value)}
            placeholder="e.g., Investor pitch preparation"
          />
          <Button type="button" onClick={addHelpNeeded} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.helpNeeded?.map((help: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {help}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removeHelpNeeded(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-4">
        <p className="text-sm text-muted-foreground">
          Your business goals and challenges help us tailor our financial guidance to support your specific journey and address your unique concerns.
        </p>
      </div>
    </div>
  );
};

export default GoalsConcernsForm;
