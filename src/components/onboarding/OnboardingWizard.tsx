
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OnboardingStep } from "@/types";
import BusinessDetailsForm from "./steps/BusinessDetailsForm";
import BusinessNatureForm from "./steps/BusinessNatureForm";
import RevenueExpensesForm from "./steps/RevenueExpensesForm";
import BankingPaymentsForm from "./steps/BankingPaymentsForm";
import TaxComplianceForm from "./steps/TaxComplianceForm";
import TeamPayrollForm from "./steps/TeamPayrollForm";
import GoalsConcernsForm from "./steps/GoalsConcernsForm";
import CompletionStep from "./steps/CompletionStep";

const steps: { title: string; step: OnboardingStep }[] = [
  { title: "Business Details", step: "business-details" },
  { title: "Nature of Business", step: "business-nature" },
  { title: "Revenue & Expenses", step: "revenue-expenses" },
  { title: "Banking & Payments", step: "banking-payments" },
  { title: "Tax & Compliance", step: "tax-compliance" },
  { title: "Team & Payroll", step: "team-payroll" },
  { title: "Goals & Concerns", step: "goals-concerns" },
  { title: "Complete", step: "complete" },
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    // Business Details
    name: "",
    entityType: "",
    establishmentDate: "",
    
    // Nature of Business
    products: "",
    operationMode: "",
    clientType: "",
    
    // Revenue & Expenses
    avgMonthlyRevenue: 0,
    avgMonthlyExpense: 0,
    majorCosts: [],
    recurringSubscriptions: [],
    
    // Banking & Payments
    bankAccounts: 0,
    paymentMethods: [],
    loans: false,
    
    // Tax & Compliance
    gstRegistered: false,
    gstScheme: "",
    tdsDeduction: false,
    taxFilingStatus: false,
    
    // Team & Payroll
    teamSize: 0,
    paymentFrequency: "",
    incentives: false,
    
    // Goals & Concerns
    businessGoals: [],
    painPoints: [],
    helpNeeded: [],
  });
  
  const navigate = useNavigate();
  
  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleComplete = () => {
    // In a real app, you would save the data to a database here
    console.log("Onboarding data:", formData);
    
    // Navigate to dashboard
    navigate("/dashboard");
  };
  
  const renderStepContent = () => {
    const currentStepData = steps[currentStep];
    
    switch (currentStepData.step) {
      case "business-details":
        return (
          <BusinessDetailsForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "business-nature":
        return (
          <BusinessNatureForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "revenue-expenses":
        return (
          <RevenueExpensesForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "banking-payments":
        return (
          <BankingPaymentsForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "tax-compliance":
        return (
          <TaxComplianceForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "team-payroll":
        return (
          <TeamPayrollForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "goals-concerns":
        return (
          <GoalsConcernsForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case "complete":
        return (
          <CompletionStep 
            formData={formData} 
            onComplete={handleComplete} 
          />
        );
      default:
        return null;
    }
  };
  
  const progress = ((currentStep) / (steps.length - 1)) * 100;
  
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-none shadow-lg">
        <CardContent className="p-0">
          <div className="bg-primary p-6 text-primary-foreground rounded-t-lg">
            <h1 className="text-2xl font-bold">Welcome to Shokei</h1>
            <p className="text-primary-foreground/80 mt-1">
              Let's set up your financial profile in {steps.length - 1} simple steps
            </p>
            <Progress value={progress} className="mt-4 h-2 bg-primary-foreground/20" />
            <div className="flex justify-between text-sm mt-2 text-primary-foreground/80">
              <span>Getting Started</span>
              <span>Complete</span>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentStep + 1}. {steps[currentStep].title}
            </h2>
            
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
