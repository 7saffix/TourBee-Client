import { Fragment, useState } from "react";
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
import { UserRole } from "@/constant/role";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();

  const isAuthenticating = isLoading || isFetching;
  const user = data?.user;

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("logout successful");
  };

  const navLinks = [
    { name: "About", href: "/about", role: "public" },
    { name: "Tours", href: "/tours", role: "public" },
    { name: "Dashboard", href: "/admin", role: UserRole.superAdmin },
    { name: "Dashboard", href: "/admin", role: UserRole.admin },
    { name: "Dashboard", href: "/user", role: UserRole.user },
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
              {navLinks.map((link, index) => (
                <Fragment key={index}>
                  {link.role == "public" && (
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.role == data?.user.role && (
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )}
                </Fragment>
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
        <div className="md:hidden absolute top-16 left-0 w-full border-b border-border bg-background z-50 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="space-y-1 px-4 pt-2 pb-6">
            {navLinks.map((link, index) => (
              <Fragment key={index}>
                {link.role == "public" && (
                  <Link
                    to={link.href}
                    className="block py-3 text-base font-medium text-muted-foreground border-b border-border/50 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                {link.role == user?.role && (
                  <Link
                    to={link.href}
                    className="block py-3 text-base font-medium text-muted-foreground border-b border-border/50 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </Fragment>
            ))}

            {!user && !isAuthenticating && (
              <Link
                to="/signin"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
            )}

            {user && (
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
