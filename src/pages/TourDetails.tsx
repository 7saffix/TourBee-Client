/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  XCircle,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Camera,
  Backpack,
  PlusCircle,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetAllTourQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

// Icon Helper Function
const getHighlightIcon = (
  text: string,
  type: "included" | "excluded" | "amenity" | "plan"
) => {
  const lowerText = text.toLowerCase();
  if (type === "excluded")
    return <XCircle className="text-destructive" size={18} />;

  if (lowerText.includes("wifi"))
    return <Wifi className="text-primary" size={18} />;
  if (
    lowerText.includes("breakfast") ||
    lowerText.includes("meal") ||
    lowerText.includes("food")
  )
    return <Utensils className="text-primary" size={18} />;
  if (lowerText.includes("coffee") || lowerText.includes("drink"))
    return <Coffee className="text-primary" size={18} />;
  if (
    lowerText.includes("transport") ||
    lowerText.includes("car") ||
    lowerText.includes("pickup")
  )
    return <Car className="text-primary" size={18} />;
  if (lowerText.includes("photo") || lowerText.includes("camera"))
    return <Camera className="text-primary" size={18} />;
  if (
    lowerText.includes("trek") ||
    lowerText.includes("equipment") ||
    lowerText.includes("bag")
  )
    return <Backpack className="text-primary" size={18} />;

  return type === "plan" ? (
    <PlusCircle className="text-primary" size={18} />
  ) : (
    <CheckCircle2 className="text-primary" size={18} />
  );
};

const TourDetails = () => {
  const { slug } = useParams();
  const { data: tour, isLoading } = useGetAllTourQuery({ slug });
  const [createBooking, { isLoading: bookLoading }] =
    useCreateBookingMutation();
  const navigate = useNavigate();
  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [travelers, setTravelers] = useState(1);

  const currentTour = tour?.[0];
  const allImages = currentTour?.images || [];

  const handleReserve = async () => {
    const bookingData = {
      tour: currentTour._id,
      guestCount: travelers,
    };

    try {
      const result = await createBooking(bookingData).unwrap();
      console.log(result);
      console.log(result?.data?.payment);
      navigate(`/tours/booking/${currentTour._id}`, {
        state: { guestCount: travelers, paymentUrl: result?.data?.payment },
      });
    } catch (error) {
      if (error?.status == 403 && error?.data?.message == "no token received") {
        navigate("/signin");
      }
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse font-black text-primary uppercase tracking-widest">
          Loading Adventure...
        </div>
      </div>
    );

  if (!currentTour)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Tour not found.
      </div>
    );

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* --- HERO & GALLERY SECTION --- */}
      <section className="relative w-full">
        <div className="relative h-[55vh] lg:h-[70vh] w-full overflow-hidden bg-muted">
          <img
            src={allImages[activeImageIndex]}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            alt={currentTour.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent" />

          <div className="absolute bottom-16 lg:bottom-24 left-0 w-full p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                {currentTour.location}
              </span>
              <h1 className="text-4xl lg:text-7xl font-black mt-4 uppercase tracking-tighter text-white drop-shadow-2xl">
                {currentTour.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Floating Thumbnails (Navigation) */}
        {allImages.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {allImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    activeImageIndex === index
                      ? "border-primary scale-105 shadow-xl"
                      : "border-white hover:border-primary/40"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Gallery Thumbnail"
                  />
                  {activeImageIndex !== index && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-12">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem
              icon={<Clock />}
              label="Timeline"
              value={`${format(
                new Date(currentTour.startDate),
                "MMM d"
              )} - ${format(new Date(currentTour.endDate), "MMM d")}`}
            />
            <StatItem
              icon={<Users />}
              label="Capacity"
              value={`${currentTour.maxGuest} People`}
            />
            <StatItem
              icon={<Calendar />}
              label="Min Age"
              value={`${currentTour.minAge}+ Years`}
            />
            <StatItem
              icon={<MapPin />}
              label="Region"
              value={currentTour.location}
            />
          </div>

          <article className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight border-l-4 border-primary pl-4">
              The Adventure
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
              {currentTour.description}
            </p>
          </article>

          <section className="space-y-10">
            <h2 className="text-3xl font-black uppercase tracking-tight border-l-4 border-primary pl-4">
              Tour Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <HighlightGroup
                title="Included"
                items={currentTour.included}
                type="included"
              />
              <HighlightGroup
                title="Amenities"
                items={currentTour.amenities}
                type="amenity"
              />
              <HighlightGroup
                title="Tour Plan"
                items={currentTour.tourPlan}
                type="plan"
              />
              <HighlightGroup
                title="Excluded"
                items={currentTour.excluded}
                type="excluded"
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Booking Sidebar */}
        <aside className="lg:w-1/3">
          <Card className="sticky top-28 p-8 border-border shadow-2xl rounded-[2.5rem] bg-card/40 backdrop-blur-md">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-1">
                  Price per person
                </p>
                <h3 className="text-5xl font-black text-primary tracking-tighter">
                  ৳{currentTour.costForm}
                </h3>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-muted/50 p-5 rounded-3xl border border-border/50 flex items-center justify-between">
                <span className="text-sm font-black uppercase">Travelers</span>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-black text-xl">{travelers}</span>
                  <button
                    onClick={() =>
                      setTravelers(
                        Math.min(currentTour.maxGuest, travelers + 1)
                      )
                    }
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between px-2">
                <span className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                  Estimated Total
                </span>
                <span className="font-black text-xl text-primary">
                  ৳{currentTour.costForm * travelers}
                </span>
              </div>
            </div>

            <Button
              disabled={bookLoading}
              onClick={handleReserve}
              className="w-full py-8 text-xl font-black uppercase rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              {bookLoading ? (
                <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Reserve My Spot"
              )}
            </Button>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={18} className="text-primary" />
                Secure Checkout & Instant Confirmation
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

// Reusable Components
const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-3 p-5 rounded-3xl bg-card border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">
        {label}
      </p>
      <p className="text-sm font-black uppercase truncate">{value}</p>
    </div>
  </div>
);

const HighlightGroup = ({
  title,
  items,
  type,
}: {
  title: string;
  items: string[];
  type: any;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em]">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4 group">
            <span className="mt-0.5 transition-transform group-hover:rotate-12">
              {getHighlightIcon(item, type)}
            </span>
            <span
              className={`text-sm font-bold leading-snug uppercase tracking-tight ${
                type === "excluded"
                  ? "text-muted-foreground line-through opacity-70"
                  : "text-foreground"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourDetails;
