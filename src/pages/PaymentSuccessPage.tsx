import { useNavigate, useSearchParams } from "react-router";
import {
  CheckCircle2,
  ArrowRight,
  Download,
  ShoppingBag,
  Hash,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extracting data from URL
  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* SUCCESS ICON ANIMATION */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-primary/10 p-6 rounded-full animate-bounce">
            <CheckCircle2 size={80} className="text-primary" strokeWidth={3} />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-center">
            Booking <br /> Confirmed
          </h1>
          <p className="text-muted-foreground font-black uppercase tracking-widest text-sm">
            {message || "Your adventure starts here"}
          </p>
        </div>

        <Card className="p-8 border-border shadow-2xl rounded-[2.5rem] bg-card/40 backdrop-blur-md">
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight border-b border-border pb-4">
              Payment Receipt
            </h2>

            <div className="space-y-4">
              {/* Transaction ID */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Hash size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Transaction ID
                  </span>
                </div>
                <span className="font-mono font-bold text-sm bg-muted px-3 py-1 rounded-lg">
                  {transactionId}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Payment Status
                  </span>
                </div>
                <span className="font-black uppercase text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {status}
                </span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center pt-4 border-t border-dashed border-border">
                <div className="flex items-center gap-3 text-foreground">
                  <CreditCard size={18} />
                  <span className="text-sm font-black uppercase tracking-widest">
                    Total Paid
                  </span>
                </div>
                <span className="text-3xl font-black text-primary tracking-tighter">
                  ৳{amount}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/dashboard/my-bookings")}
            variant="outline"
            className="py-8 rounded-2xl border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all gap-3"
          >
            <ShoppingBag size={20} />
            View Bookings
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="py-8 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform gap-3"
          >
            Explore More
            <ArrowRight size={20} />
          </Button>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
        >
          <Download size={14} /> Download Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
