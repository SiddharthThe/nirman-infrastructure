import { useEffect, useRef } from 'react';
import { Building2, Hammer, Cog, Shield, Zap, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate services cards
    gsap.fromTo(servicesRef.current?.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate why choose us section
    gsap.fromTo(whyChooseRef.current?.children,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: whyChooseRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const services = [
    {
      icon: Building2,
      title: "Commercial Construction",
      description: "Office buildings, retail spaces, and mixed-use developments with modern architectural design and sustainable features.",
      features: ["Office Complexes", "Retail Centers", "Mixed-Use Developments", "Hospitality Projects"]
    },
    {
      icon: Hammer,
      title: "Residential Development",
      description: "Premium residential projects from individual homes to large townships with world-class amenities.",
      features: ["Luxury Villas", "Apartment Complexes", "Gated Communities", "Affordable Housing"]
    },
    {
      icon: Cog,
      title: "Infrastructure Solutions",
      description: "Complete infrastructure development including roads, utilities, and smart city technologies.",
      features: ["Road Construction", "Utility Networks", "Smart Infrastructure", "Public Works"]
    },
    {
      icon: Shield,
      title: "Project Management",
      description: "End-to-end project management ensuring timely delivery, quality assurance, and budget optimization.",
      features: ["Timeline Management", "Quality Control", "Budget Optimization", "Risk Assessment"]
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Fast Execution",
      description: "Advanced project management techniques ensure rapid delivery without compromising quality."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes and premium materials guarantee exceptional results."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Highly skilled professionals with decades of combined experience in construction and design."
    },
    {
      icon: Cog,
      title: "Latest Technology",
      description: "Cutting-edge construction technology and innovative methods for superior outcomes."
    }
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction and infrastructure solutions tailored to meet 
            your specific needs and exceed your expectations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ icon: Icon, title, description, features }, index) => (
              <div key={index} className="card-glow p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
                
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Nirman?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence
            </p>
          </div>

          <div ref={whyChooseRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center card-glow p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-glow p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how we can bring your vision to life with our expertise and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-glow-primary">
                Get Free Consultation
              </a>
              <a href="/projects" className="btn-glow-secondary">
                View Our Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;