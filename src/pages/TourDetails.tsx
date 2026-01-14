import { useParams } from "react-router";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetAllTourQuery } from "@/redux/features/tour/tour.api";

const TourDetails = () => {
  const { id } = useParams();
  const { data: tour, isLoading } = useGetAllTourQuery({ _id: id });

  console.log(tour);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={
            tour?.images?.[0] ||
            "https://images.unsplash.com/photo-1500622397572-5879a48ee0c2"
          }
          className="w-full h-full object-cover"
          alt={tour?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              {tour?.location}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mt-4 uppercase tracking-tighter">
              {tour?.title}
            </h1>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* LEFT: Description & Info */}
        <div className="flex-1 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">
                  Duration
                </p>
                <p className="font-bold">3 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">
                  Max Guests
                </p>
                <p className="font-bold">{tour?.maxGuest}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">
                  Min Age
                </p>
                <p className="font-bold">{tour?.minAge}+</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">
                  Location
                </p>
                <p className="font-bold">{tour?.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase">About this tour</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {tour?.description ||
                "Experience the breathtaking beauty and rich culture of this destination. Our expert guides will take you through hidden gems and iconic landmarks, ensuring an unforgettable journey filled with adventure and relaxation."}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase">Tour Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Professional Local Guide",
                "Luxury Transport",
                "Entrance Fees Included",
                "Premium Accommodation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Sticky Booking Card */}
        <div className="lg:w-1/3">
          <Card className="sticky top-28 p-8 border-border shadow-2xl rounded-[var(--radius-3xl)] overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-sm text-muted-foreground font-bold uppercase">
                  Total Price
                </p>
                <h3 className="text-4xl font-black text-primary">
                  ৳{tour?.costForm}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">Per person</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-muted/50 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-sm font-bold">Travelers</span>
                <div className="flex items-center gap-4">
                  <button className="h-8 w-8 rounded-full border border-border flex items-center justify-center">
                    -
                  </button>
                  <span className="font-bold">1</span>
                  <button className="h-8 w-8 rounded-full border border-border flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            </div>

            <Button className="w-full py-8 text-lg font-black uppercase rounded-2xl shadow-lg shadow-primary/30">
              Book Adventure Now
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-xs font-medium">
              <ShieldCheck size={16} className="text-primary" />
              Secure Payment & Instant Confirmation
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
