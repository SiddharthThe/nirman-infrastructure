import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImg from '../assets/about-img.png';

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
    { icon: Award, value: '1000+', label: 'Completed Projects' },
    { icon: Users, value: '7', label: 'Expert Partners' },
    { icon: Clock, value: '19+', label: 'Years of Excellence' },
    { icon: Target, value: '30+', label: 'Years Partner Experience' },
  ];

  const values = [
    {
      title: 'Technical Expertise',
      description: 'With over 30 years of combined experience per partner, we bring unmatched technical knowledge and engineering excellence to every project.',
      color: 'text-blue-500'
    },
    {
      title: 'Quality & Safety',
      description: 'Every project meets the highest standards of quality, safety protocols, and craftsmanship ensuring lasting infrastructure.',
      color: 'text-purple-500'
    },
    {
      title: 'Cost Efficiency',
      description: 'We leverage our extensive experience to deliver projects that are cost-efficient without compromising on quality or safety.',
      color: 'text-green-500'
    },
    {
      title: 'Trust & Reliability',
      description: 'As a trusted name in Ratnagiri and beyond, our clients rely on us for on-time delivery and exceptional results across all sectors.',
      color: 'text-orange-500'
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Technirman Infrastructure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From the Konkan region of Maharashtra, Ratnagiri - A dynamic and reliable construction company 
            committed to delivering high-quality building solutions across residential, commercial, and industrial sectors.
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
                  We are from the Konkan region of Maharashtra, Ratnagiri. We have great pleasure to introduce 
                  ourselves as M/S NIRMAN INFRASTRUCTURES - Civil Engineers, Contractors & Developers, 
                  a Partnership firm of seven partners, each having experience of not less than 30 years 
                  in the civil engineering field across diversified projects.
                </p>
                <p>
                  Our firm was formed with the intention to undertake major infrastructural projects in Public, 
                  Private & Industrial sectors, while making the most efficient utilization of our partners' 
                  extensive experience for cost-efficient & quality output.
                </p>
                <p>
                  Established in 2006, we have been working in Ratnagiri and are engaged in Residential projects, 
                  Public sector projects, construction management, cost analysis, and all types of surveying & 
                  valuation works. In 2011, Nirman Infrastructures evolved into Technirman Infrastructure Pvt. Ltd., 
                  marking a new chapter in our journey towards excellence in infrastructure development.
                </p>
                <p>
                  With a strong foundation in technical expertise, safety, and project management, Technirman 
                  Infrastructure Pvt Ltd has established itself as a trusted name in the construction industry, 
                  celebrating over 14 years of excellence in construction and real estate development.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img 
                src={aboutImg} 
                alt="Technirman Infrastructure Office - Ratnagiri"
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