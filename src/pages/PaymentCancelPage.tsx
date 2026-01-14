import { useNavigate } from "react-router";
import { Ban, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-muted p-5 rounded-full mb-2 text-muted-foreground">
            <Ban size={64} strokeWidth={3} />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
            Payment <br />{" "}
            <span className="text-muted-foreground">Cancelled</span>
          </h1>
          <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">
            The transaction was aborted by the user
          </p>
        </div>

        <Card className="p-10 border-border shadow-xl rounded-[2.5rem] bg-card/40 backdrop-blur-md">
          <div className="flex items-start gap-4">
            <HelpCircle className="text-primary shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="font-black uppercase text-sm tracking-widest">
                Need Assistance?
              </h3>
              <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase">
                If you encountered a technical issue or have questions about the
                tour pricing, our support team is available 24/7 to help you
                complete your booking.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="py-8 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex gap-3"
          >
            <ArrowLeft size={20} /> Return to Booking
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="py-4 font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Browse Other Adventures
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
