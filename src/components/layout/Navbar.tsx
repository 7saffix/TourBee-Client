import { useState } from "react";
import { Rocket, Menu, X, Search, User, LogOut } from "lucide-react";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import {
  authApi,
  useGetMeQuery,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();

  const isAuthenticating = isLoading || isFetching;
  const user = data?.data?.user;

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("logout successful");
  };

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Tour Packages", href: "/packages" },
    { name: "Special Offers", href: "/offers" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-md transition-transform group-hover:rotate-12">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Tour<span className="text-primary">Bee</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-border pr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-row  items-center">
              <div className="flex  items-center gap-3 text-muted-foreground rounded-md transition-colors">
                <div>
                  <Search size={18} />
                </div>
                {/* Auth Section with Glitch Fix */}
                <div className="flex items-center min-w-[120px] justify-end">
                  {isAuthenticating ? (
                    <div className="h-8 w-24 animate-pulse bg-muted rounded-md" />
                  ) : user ? (
                    <div className="flex items-center gap-3 animate-in fade-in duration-300">
                      <span className="text-xs font-medium text-muted-foreground hidden lg:block">
                        Hi, {user.name?.split(" ")[0]}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-primary hover:text-destructive-foreground transition-all"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity animate-in fade-in duration-300"
                    >
                      <User size={16} />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>

              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <Search size={18} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:bg-accent rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 pt-2 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-3 text-base font-medium text-muted-foreground border-b border-border/50 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!data?.data?.user.email && (
              <Link
                to="/signin"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
            )}

            {data?.data?.user.email && (
              // <button className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold">
              //   <LogOut size={16} />
              //   <span>Logout</span>
              // </button>

              <button
                onClick={handleLogout}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-primary hover:text-destructive-foreground transition-all"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { Rocket, Menu, X, Search, User, LogOut } from "lucide-react";
// import { Link } from "react-router";
// import { ModeToggle } from "./ModeToggle";
// import {
//   authApi,
//   useGetMeQuery,
//   useLogoutMutation,
// } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";
// import { useAppDispatch } from "@/redux/hook";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   // Added isFetching to prevent the flicker glitch
//   const { data, isLoading, isFetching } = useGetMeQuery(undefined);
//   const [logout] = useLogoutMutation();
//   const dispatch = useAppDispatch();

//   const handleLogout = async () => {
//     try {
//       await logout(undefined).unwrap();
//       dispatch(authApi.util.resetApiState());
//       toast.success("Logged out successfully");
//       setIsOpen(false);
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   const user = data?.data?.user;
//   // We determine "loading" as either the initial load or a background refresh
//   const isAuthenticating = isLoading || isFetching;

//   const navLinks = [
//     { name: "Destinations", href: "/destinations" },
//     { name: "Tour Packages", href: "/packages" },
//     { name: "Special Offers", href: "/offers" },
//     { name: "My Bookings", href: "/my-bookings" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="bg-primary p-1.5 rounded-md transition-transform group-hover:rotate-12">
//               <Rocket className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <span className="font-bold text-xl tracking-tight text-foreground">
//               Tour<span className="text-primary">Bee</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex items-center gap-4 border-r border-border pr-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.href}
//                   className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             <div className="flex items-center gap-3">
//               <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
//                 <Search size={18} />
//               </button>

//               {/* Auth Section with Glitch Fix */}
//               <div className="flex items-center min-w-[120px] justify-end">
//                 {isAuthenticating ? (
//                   <div className="h-8 w-24 animate-pulse bg-muted rounded-md" />
//                 ) : user ? (
//                   <div className="flex items-center gap-3 animate-in fade-in duration-300">
//                     <span className="text-xs font-medium text-muted-foreground hidden lg:block">
//                       Hi, {user.name?.split(" ")[0]}
//                     </span>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-destructive hover:text-destructive-foreground transition-all"
//                     >
//                       <LogOut size={16} />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <Link
//                     to="/signin"
//                     className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity animate-in fade-in duration-300"
//                   >
//                     <User size={16} />
//                     <span>Sign In</span>
//                   </Link>
//                 )}
//               </div>
//               <ModeToggle />
//             </div>
//           </div>

//           {/* Mobile Menu Controls */}
//           <div className="md:hidden flex items-center gap-2">
//             <ModeToggle />
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden border-b border-border bg-background animate-in slide-in-from-top-2 duration-200">
//           <div className="space-y-1 px-4 pt-2 pb-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.href}
//                 className="block py-3 text-base font-medium text-muted-foreground border-b border-border/50 hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             <div className="pt-4 space-y-4">
//               {isAuthenticating ? (
//                 <div className="h-12 w-full animate-pulse bg-muted rounded-md" />
//               ) : user ? (
//                 <div className="space-y-3">
//                   <div className="px-1 text-sm text-muted-foreground">
//                     Signed in as{" "}
//                     <span className="font-semibold text-foreground">
//                       {user.name}
//                     </span>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-destructive hover:text-destructive-foreground transition-all"
//                   >
//                     <LogOut size={18} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <Link
//                   to="/signin"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground font-medium rounded-md"
//                 >
//                   <User size={18} />
//                   <span>Sign In</span>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
