// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { Search, Filter } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";

// const FilterContent = () => (
//   <div className="space-y-6 p-1">
//     {/* 1. Destination */}
//     <div className="space-y-3">
//       <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
//         Destination
//       </Label>
//       <div className="relative">
//         <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Where to go?"
//           className="w-full bg-muted/40 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
//         />
//       </div>
//     </div>

//     <hr className="border-border/50" />

//     {/* 2. Budget */}
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <Label className="text-sm font-bold uppercase text-muted-foreground">
//           Budget
//         </Label>
//         <span className="text-xs font-bold text-primary">৳15000</span>
//       </div>
//       <Slider defaultValue={[2000]} max={50000} step={500} className="py-2" />
//     </div>

//     <hr className="border-border/50" />

//     {/* 3. Divisions */}
//     <div className="space-y-3">
//       <Label className="text-sm font-bold uppercase text-muted-foreground">
//         Divisions
//       </Label>
//       <div className="grid gap-2.5">
//         {["Dhaka", "Sylhet", "Chattogram", "Khulna", "Rajshahi"].map((city) => (
//           <div
//             key={city}
//             className="flex items-center space-x-2 group cursor-pointer"
//           >
//             <Checkbox
//               id={city}
//               className="border-muted-foreground/30 data-[state=checked]:bg-primary"
//             />
//             <label
//               htmlFor={city}
//               className="text-sm font-medium group-hover:text-primary cursor-pointer transition-colors"
//             >
//               {city}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const FilterCard = () => {
//   return (
//     <>
//       {/* --- MOBILE: Filter Button & Drawer --- */}
//       <div className="lg:hidden mb-4">
//         <Sheet>
//           <SheetTrigger asChild>
//             <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-full justify-center">
//               <Filter className="w-4 h-4" />
//               Filter Options
//             </button>
//           </SheetTrigger>
//           <SheetContent
//             side="left"
//             className="w-[300px] sm:w-[350px] p-0 border-none rounded-r-[var(--radius-3xl)] overflow-hidden"
//           >
//             <SheetHeader className="bg-primary/5 p-6 border-b border-border/50">
//               <SheetTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
//                 <Filter className="w-5 h-5 text-primary" /> Filters
//               </SheetTitle>
//             </SheetHeader>
//             <div className="p-6 h-[calc(100vh-80px)] overflow-y-auto">
//               <FilterContent />
//               <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-primary/20">
//                 Apply Filters
//               </button>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* --- DESKTOP: Sidebar Sidebar --- */}
//       <div className="hidden lg:block w-full">
//         <Card className=" border-border bg-card shadow-sm rounded-[var(--radius-3xl)] overflow-hidden p-0">
//           <CardHeader className="bg-primary/5 border-b border-border/50 px-5 py-4">
//             <CardTitle className="text-lg flex items-center gap-2">
//               <Filter className="w-5 text-primary" />
//               Filters
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-5">
//             <FilterContent />
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default FilterCard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const FilterContent = () => (
  <div className="space-y-6 p-1 text-left">
    <div className="space-y-3">
      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Destination
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Where to go?"
          className="w-full bg-muted/40 border-none rounded-xl py-2 pl-9 pr-4 text-sm outline-none"
        />
      </div>
    </div>
    <hr className="border-border/50" />
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-bold uppercase text-muted-foreground">
          Budget
        </Label>
        <span className="text-xs font-bold text-primary">৳15000</span>
      </div>
      <Slider defaultValue={[2000]} max={50000} step={500} className="py-2" />
    </div>
    <hr className="border-border/50" />
    <div className="space-y-3">
      <Label className="text-sm font-bold uppercase text-muted-foreground">
        Divisions
      </Label>
      <div className="grid gap-2.5">
        {["Dhaka", "Sylhet", "Chattogram", "Khulna", "Rajshahi"].map((city) => (
          <div
            key={city}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <Checkbox
              id={city}
              className="border-muted-foreground/30 data-[state=checked]:bg-primary"
            />
            <label
              htmlFor={city}
              className="text-sm font-medium group-hover:text-primary cursor-pointer transition-colors"
            >
              {city}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FilterCard = () => {
  // Logic function to reset filters
  const handleClear = () => {
    console.log("Filters cleared");
    // Add your state reset logic here
  };

  return (
    <>
      {/* MOBILE TRIGGER */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 my-4 rounded-md cursor-pointer text-xs font-bold shadow-md active:scale-95 transition-all">
              <Filter className="w-4 h-4" />
              Filter Options
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-2xs p-0 border-none rounded-r-[var(--radius-3xl)] overflow-hidden"
          >
            <SheetHeader className="bg-primary/5 p-6 border-b border-border/50">
              <div className="flex items-center justify-between w-full">
                <SheetTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
                  <Filter className="w-5 h-5 text-primary" /> Filters
                </SheetTitle>
                <button
                  onClick={handleClear}
                  className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              </div>
            </SheetHeader>
            <div className="p-6 h-[calc(100vh-80px)] overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block w-full">
        <Card className="border-border bg-card shadow-sm rounded-[var(--radius-3xl)] overflow-hidden p-0 sticky top-24">
          <CardHeader className="bg-primary/5 border-b border-border/50 px-5 py-4">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-lg flex items-center gap-2 uppercase font-black">
                <Filter className="w-5 text-primary" /> Filters
              </CardTitle>
              <button
                onClick={handleClear}
                className="text-xs font-bold text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              >
                <RotateCcw className="w-3 h-3 " /> Clear
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilterCard;
