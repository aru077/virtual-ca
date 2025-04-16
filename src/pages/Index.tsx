
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart2, FileText, ClipboardCheck, TrendingUp, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate checking for existing user
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const startOnboarding = () => {
    navigate("/onboarding");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-primary mb-4">Shokei</div>
          <div className="animate-pulse mt-2">Loading...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-secondary/10">
      <nav className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold">Shokei</div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              Features
            </Button>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              Pricing
            </Button>
            <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Log In
            </Button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Your Virtual <span className="text-accent">Chartered Accountant</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Shokei automates accounting, auditing, compliance, taxation, reporting, and advisory functions. Get started in minutes and focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={startOnboarding} className="bg-accent hover:bg-accent/90">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <div className="font-medium text-xl mb-6">See how Shokei can transform your financial management</div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <BarChart2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Real-time Financial Dashboard</div>
                  <div className="text-muted-foreground">Visualize your financial health with interactive charts and metrics.</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Automated Compliance</div>
                  <div className="text-muted-foreground">Never miss a tax filing deadline with automated reminders and status tracking.</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <ClipboardCheck className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Smart Financial Insights</div>
                  <div className="text-muted-foreground">Get personalized recommendations to optimize your business finances.</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Growth Planning</div>
                  <div className="text-muted-foreground">Forecast your financial future and plan for sustainable growth.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Financial Management?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Shokei for their financial needs. Get started in minutes and experience the difference.
          </p>
          <Button size="lg" onClick={startOnboarding} className="bg-accent hover:bg-accent/90">
            Start Your Free Trial
          </Button>
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">Shokei</div>
            <div className="flex gap-8">
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Contact Us</div>
            </div>
          </div>
          <div className="text-center mt-8 text-white/60">
            © 2023 Shokei. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
