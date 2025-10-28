import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, UserPlus, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <Badge className="px-4 py-2 bg-gradient-primary text-lg">
              <Sparkles className="inline-block mr-2 h-5 w-5" />
              Welcome to ShopHub
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your Premium
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Shopping Experience
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Join thousands of satisfied customers 
            and start shopping today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-elegant text-lg px-8"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/store")}
              size="lg"
              variant="outline"
              className="hover:border-primary transition-smooth text-lg px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Store
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <Card className="text-center p-6 hover:shadow-elegant transition-smooth">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Products</h3>
            <p className="text-muted-foreground">
              Curated selection of premium items for every need
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-elegant transition-smooth">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
            <p className="text-muted-foreground">
              Competitive pricing with regular deals and discounts
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-elegant transition-smooth">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Signup</h3>
            <p className="text-muted-foreground">
              Quick registration process to get you shopping faster
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-card rounded-xl border ${className}`}>
      {children}
    </div>
  );
};

export default Index;
