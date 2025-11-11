import { useEffect, useRef } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Zap, Shield } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero animation sequence
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    if (iconsRef.current && iconsRef.current.children.length > 0) {
      tl.fromTo(iconsRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.1 },
        '-=0.3'
      );

      // Floating animation for icons
      gsap.to(iconsRef.current.children, {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });
    }

  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center hero-gradient pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Company Logo */}
          <div className="flex justify-center mb-8">
            {/* Logo removed for cleaner look, only in Navbar */}
          </div>

          {/* Main Heading */}
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Building Tomorrow's
            <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Infrastructure</span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Nirman Infrastructure delivers world-class construction and infrastructure solutions 
            with cutting-edge technology and unmatched expertise.
          </p>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/contact" className="btn-glow-primary flex items-center gap-2">
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link to="/projects" className="btn-glow-secondary flex items-center gap-2">
              View Our Projects
            </Link>
          </div>

          {/* Feature Icons */}
          <div ref={iconsRef} className="flex justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 size={28} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <Zap size={28} className="text-secondary" />
              </div>
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield size={28} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Guaranteed Safety</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;