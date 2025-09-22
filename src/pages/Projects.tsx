import { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import { gsap } from 'gsap';

const Projects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Animate page entrance
    gsap.fromTo('.projects-header', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  // Demo project data
  const projects = [
    {
      id: 1,
      title: "Metro Business Complex",
      category: "completed" as const,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "A state-of-the-art 50-story business complex featuring modern office spaces, retail outlets, and premium amenities in the heart of the city.",
      location: "Downtown City Center",
      year: "2023"
    },
    {
      id: 2,
      title: "Riverside Residential Township",
      category: "completed" as const,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      description: "A luxurious gated community with 200 premium villas, complete with modern infrastructure, parks, and recreational facilities.",
      location: "Riverside Valley",
      year: "2023"
    },
    {
      id: 3,
      title: "Smart City Infrastructure",
      category: "ongoing" as const,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      description: "Comprehensive infrastructure development including roads, utilities, and smart city solutions spanning 500 acres.",
      location: "New Development Zone",
      year: "2024"
    },
    {
      id: 4,
      title: "Green Energy Plant",
      category: "ongoing" as const,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      description: "Sustainable energy facility with solar panels and wind turbines, contributing to the region's renewable energy goals.",
      location: "Industrial Park",
      year: "2024"
    },
    {
      id: 5,
      title: "Heritage Mall Renovation",
      category: "completed" as const,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description: "Complete renovation of a historic shopping center, blending traditional architecture with modern amenities.",
      location: "Heritage District",
      year: "2022"
    },
    {
      id: 6,
      title: "Tech Campus Development",
      category: "ongoing" as const,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: "Modern technology campus with flexible workspaces, research facilities, and innovation centers for leading tech companies.",
      location: "Tech Valley",
      year: "2024"
    }
  ];

  if (!mounted) return null;

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="projects-header">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of exceptional infrastructure projects that showcase 
              our expertise in creating sustainable and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Gallery projects={projects} />
        </div>
      </section>

      {/* Project Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we follow a proven methodology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Planning & Design", description: "Comprehensive project analysis and architectural planning" },
              { step: "02", title: "Approval & Permits", description: "Securing necessary approvals and regulatory compliance" },
              { step: "03", title: "Construction", description: "Execution with cutting-edge technology and skilled workforce" },
              { step: "04", title: "Delivery", description: "Quality assurance and timely project handover" }
            ].map((process, index) => (
              <div key={index} className="text-center card-glow p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{process.title}</h3>
                <p className="text-muted-foreground text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;