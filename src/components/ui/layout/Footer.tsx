import {
  Rocket,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    // Uses shadcn theme variables for automatic dark mode support
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-md transition-transform group-hover:rotate-12">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Tour<span className="text-primary">Bee</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed my-4 text-muted-foreground">
              Taking your travel experiences to new heights. We manage your
              tours so you can focus on the adventure.
            </p>
            <div className="flex space-x-5">
              <Facebook
                className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                size={20}
              />
              <Instagram
                className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                size={20}
              />
              <Twitter
                className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                size={20}
              />
            </div>
          </div>

          {/* Quick Links - Popular Tours */}
          <div>
            <h3 className="font-semibold mb-6">Popular Tours</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Mountain Hiking
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Beach Resorts
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  City Breaks
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Cruise Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Booking Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Refunds
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>45 Skyward Lane, Adventure Hub, 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+1 (800) TOUR-BEE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>bookings@tourbee.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TourBee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
