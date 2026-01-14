/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  ShieldCheck,
  User,
  Calendar,
  ChevronLeft,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAllTourQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the traveler count passed from TourDetails state
  const initialTravelers = location.state?.guestCount || 1;
  const paymentUrl = location.state?.paymentUrl;

  const [travelers, setTravelers] = useState(initialTravelers);

  const { data: tour, isLoading } = useGetAllTourQuery({ id });

  const currentTour = tour?.[0];

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse font-black text-primary uppercase tracking-widest">
          PREPARING YOUR TRIP...
        </div>
      </div>
    );

  if (!currentTour)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Tour not found.
      </div>
    );

  const subtotal = currentTour.costForm * travelers;
  const total = subtotal;

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    window.open(paymentUrl);
  };

  return (
    <div className="bg-background min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors mb-8 uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: FORM */}
          <div className="lg:col-span-8 space-y-8">
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">
              Finalize Booking
            </h1>

            <form onSubmit={handleConfirmPayment} className="space-y-6">
              <Card className="p-8 border-border shadow-sm rounded-[2.5rem] bg-card/40 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <User size={20} />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Your Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        placeholder="ENTER YOUR FULL NAME"
                        className="rounded-2xl bg-muted/50 border-border pl-12 py-6 font-bold uppercase focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black tracking-widest text-muted-foreground ml-1 uppercase">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        type="email"
                        placeholder="EMAIL@EXAMPLE.COM"
                        className="rounded-2xl bg-muted/50 border-border pl-12 py-6 font-bold "
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        type="tel"
                        placeholder="+880"
                        className="rounded-2xl bg-muted/50 border-border pl-12 py-6 font-bold uppercase"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Guests
                    </Label>
                    <Input
                      type="number"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="rounded-2xl bg-muted/50 border-border py-6 font-black text-lg"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-border shadow-sm rounded-[2.5rem] bg-card/40 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mb-6 font-black uppercase tracking-widest">
                  SECURE REDIRECT TO SSLCOMMERZ
                </p>
                <div className="p-6 border-2 border-primary/20 bg-primary/5 rounded-[1.5rem] flex items-center justify-between">
                  <span className="font-black uppercase text-sm tracking-widest">
                    Online Payment
                  </span>
                  <ShieldCheck className="text-primary" />
                </div>
              </Card>

              <Button
                type="submit"
                className="w-full py-8 text-xl font-black uppercase rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Confirm & Pay ৳{total}
              </Button>
            </form>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 overflow-hidden border-border shadow-2xl rounded-[2.5rem] bg-card/40 backdrop-blur-md p-0">
              <div className="h-44 relative">
                <img
                  src={currentTour.images?.[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/40 p-6 flex items-end">
                  <h3 className="text-white font-black uppercase text-lg leading-none tracking-tighter">
                    {currentTour.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3 text-sm font-black uppercase text-muted-foreground">
                  <Calendar size={18} className="text-primary" />
                  <span>
                    {format(new Date(currentTour.startDate), "MMM d, yyyy")}
                  </span>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <div className="flex justify-between text-sm font-black uppercase">
                    <span className="text-muted-foreground">Travelers</span>
                    <span>{travelers}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black uppercase">
                    <span className="text-muted-foreground">Unit Price</span>
                    <span>৳{currentTour.costForm}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-border items-end">
                    <span className="text-lg font-black uppercase">Total</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">
                      ৳{total}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
