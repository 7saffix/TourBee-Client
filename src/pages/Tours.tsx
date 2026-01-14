import FilterCard from "@/components/modules/Tours/FilterCard";
import { TourCard } from "@/components/modules/Tours/ToursCard";

const Tours = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 py-6 lg:py-10">
        {/* Responsive Sidebar (Handles itself) */}
        <div className="w-full lg:w-1/4 lg:pr-6">
          <FilterCard />
        </div>

        {/* Tour Grid Area */}
        <div className="flex-1 w-full">
          <TourCard />
        </div>
      </div>
    </div>
  );
};

export default Tours;
