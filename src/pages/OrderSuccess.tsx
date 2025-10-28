import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  if (!orderId) {
    navigate("/store");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Order Successful!
          </CardTitle>
          <CardDescription className="text-base">
            Thank you for your purchase! Your order is on its way.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono text-sm font-semibold">{orderId.substring(0, 8).toUpperCase()}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-primary">${totalAmount?.toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            We've sent a confirmation email with your order details. You can track your order status
            in your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/store")}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="w-full">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSuccess;