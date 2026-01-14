/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetAllTourQuery } from "@/redux/features/tour/tour.api";
import { MapPin, Users, Info } from "lucide-react";
import { Link } from "react-router";

export function TourCard() {
  const { data: tours } = useGetAllTourQuery(undefined);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
      {tours?.map((tour: any) => (
        <Card
          key={tour._id}
          className="p-0 overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 group rounded-[var(--radius-3xl)]"
        >
          <div className="relative aspect-[16/10] w-full">
            <img
              src={tour?.images?.[0]}
              className="block h-full sm:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
              ৳{tour.costForm}
            </div>
          </div>

          <CardHeader className="px-5 pt-4 pb-0 space-y-1.5">
            <h3 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {tour.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {tour.location}
            </p>
          </CardHeader>

          <CardFooter className="px-5 py-5 flex items-center justify-between mt-4 border-t border-border/60 bg-muted/5">
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-tight">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>Max: {tour.maxGuest}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-primary" />
                <span>Age: {tour.minAge}+</span>
              </div>
            </div>
            <Link
              to={`/tours/${tour._id}`}
              className="text-xs lg:text-sm font-bold text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              Details <span className="text-lg">→</span>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
