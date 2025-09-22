import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stats on scroll
    gsap.fromTo(statsRef.current?.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate values cards
    gsap.fromTo(valuesRef.current?.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const stats = [
    { icon: Award, value: '500+', label: 'Completed Projects' },
    { icon: Users, value: '200+', label: 'Expert Team Members' },
    { icon: Clock, value: '15+', label: 'Years of Excellence' },
    { icon: Target, value: '98%', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and innovative solutions to deliver exceptional results.',
      color: 'text-blue-500'
    },
    {
      title: 'Quality',
      description: 'Every project meets the highest standards of quality and craftsmanship.',
      color: 'text-purple-500'
    },
    {
      title: 'Sustainability',
      description: 'We build with the environment in mind, creating sustainable infrastructure for the future.',
      color: 'text-green-500'
    },
    {
      title: 'Trust',
      description: 'Our clients trust us to deliver on time, on budget, and beyond expectations.',
      color: 'text-orange-500'
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Nirman</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With over 15 years of experience in the construction and infrastructure industry, 
            Nirman Infrastructure has established itself as a leader in delivering world-class projects.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2008, Nirman Infrastructure began with a simple vision: 
                  to transform the construction industry through innovative solutions 
                  and uncompromising quality.
                </p>
                <p>
                  From our humble beginnings with small residential projects, we have 
                  grown to become a trusted partner for major commercial, residential, 
                  and infrastructure developments across the region.
                </p>
                <p>
                  Our success is built on the foundation of skilled professionals, 
                  cutting-edge technology, and an unwavering commitment to excellence 
                  in every project we undertake.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=600&fit=crop" 
                alt="Company Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div key={index} className="text-center card-glow p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-glow p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;