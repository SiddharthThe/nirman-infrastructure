import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Building2 size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Technirman Infrastructure</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              A dynamic and reliable construction company from Ratnagiri, Maharashtra, 
              committed to delivering high-quality building solutions across residential, 
              commercial, and industrial sectors.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              <a
                href="https://www.facebook.com/share/1AATQ5zUTE/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/infra_nirman?t=Jh7LRhst0YfqxsXalzw6VA&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="X (Twitter)"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://in.linkedin.com/company/nirman-infrastructures"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/nirman_infrastructures?igsh=eHRsYTVmc3J0b2tn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-pink-100 flex items-center justify-center text-muted-foreground hover:text-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/917447849574"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-green-100 flex items-center justify-center text-muted-foreground hover:text-green-600 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                {/* WhatsApp SVG icon */}
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.12"/><path d="M16 7.5c-4.7 0-8.5 3.8-8.5 8.5 0 1.5.4 2.9 1.1 4.1l-1.2 4.4 4.5-1.2c1.2.7 2.6 1.1 4.1 1.1 4.7 0 8.5-3.8 8.5-8.5S20.7 7.5 16 7.5zm0 15.3c-1.3 0-2.6-.4-3.7-1.1l-.3-.2-2.7.7.7-2.6-.2-.3c-.7-1.1-1.1-2.4-1.1-3.7 0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2-3.2 7.2-7.2 7.2zm4-5.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.1-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.2.1-.3 0-.1 0-.2 0-.3 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.3-.5-.3-.1 0-.2 0-.3 0-.1 0-.3 0-.5.2-.2.2-.7.7-.7 1.7 0 1 .7 2 1.1 2.4.1.1 1.5 2.3 3.6 3.1.5.2.9.3 1.2.4.5.1.9.1 1.2.1.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" fill="currentColor"/></g></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Projects', path: '/projects' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map(({ name, path }) => (
                <li key={path}>
                  <Link 
                    to={path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nirman%20Infrastructure%20Ratnagiri%2C%20Office%20No.%2006%20%26%2007%2C%20First%20Floor%20Indradhanu%20Behind%20Chhatrapati%20Shivaji%20Maharaj%20Stadium%2C%20SV%20Rd%2C%20Hindu%20Colony%2C%20Abhyudhya%20Nagar%2C%20Ratnagiri%2C%20Maharashtra%20415612"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium leading-snug"
                  style={{ maxWidth: '220px', display: 'inline-block', wordBreak: 'break-word' }}
                >
                  Technirman Infrastructure, Ratnagiri, Maharashtra 415612
                </a>
              </li>
              <li className="flex items-start space-x-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+917447849574"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                  style={{ letterSpacing: '0.01em' }}
                >
                  +91 7447849574
                </a>
              </li>
              <li className="flex items-start space-x-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:nirmaninfrastructurepvtltd@gmail.com"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                  style={{ wordBreak: 'break-all' }}
                >
                  nirmaninfrastructurepvtltd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Technirman Infrastructure Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
    </footer>
  );
};

export default Footer;