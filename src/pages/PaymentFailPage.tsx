import { useNavigate, useSearchParams } from "react-router";
import { XCircle, RefreshCcw, Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message =
    searchParams.get("message") || "Transaction could not be processed.";

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-destructive/10 p-5 rounded-full mb-2">
            <XCircle
              size={64}
              className="text-destructive animate-pulse"
              strokeWidth={3}
            />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-destructive">
            Payment <br /> Failed
          </h1>
          <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">
            {message}
          </p>
        </div>

        <Card className="p-10 border-destructive/20 shadow-2xl rounded-[2.5rem] bg-destructive/5 backdrop-blur-md">
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <AlertCircle className="text-destructive/50" size={40} />
            </div>
            <p className="text-sm font-bold uppercase tracking-tight text-foreground/80">
              Don't worry, your money hasn't been deducted. If it has, it will
              be refunded automatically within 7 business days.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="py-8 rounded-[1.5rem] border-2 border-destructive text-destructive font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all flex gap-3"
          >
            <RefreshCcw size={20} /> Try Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="py-8 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex gap-3"
          >
            <Home size={20} /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailPage;
