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

  // Project data with actual images
  const projects = [
    {
      id: 1,
      title: "Guest House Ratnagiri",
      category: "completed" as const,
      image: "/assets/project-img/guest-house-ratnagiri.jpg",
      description: "Modern solar-powered residential guest house featuring sustainable energy solutions and contemporary design.",
      location: "Ratnagiri, Maharashtra",
      year: "2023"
    },
    {
      id: 2,
      title: "Mandvi Jetty - Coastal Infrastructure",
      category: "completed" as const,
      image: "/assets/project-img/mandvi-jetty.jpg",
      description: "Coastal pier infrastructure project extending into the Arabian Sea, enhancing maritime accessibility and tourism.",
      location: "Mandvi, Ratnagiri",
      year: "2022"
    },
    {
      id: 3,
      title: "MBRS Ratnagiri",
      category: "completed" as const,
      image: "/assets/project-img/mbrs-ratnagiri.jpg",
      description: "Multi-story building project with modern architecture located in the scenic coastal region of Ratnagiri.",
      location: "Ratnagiri, Maharashtra",
      year: "2023"
    },
    {
      id: 4,
      title: "Panval Dam",
      category: "completed" as const,
      image: "/assets/project-img/panval-dam.jpg",
      description: "Major water management infrastructure project featuring check dam construction for irrigation and water conservation.",
      location: "Panval, Ratnagiri District",
      year: "2022"
    },
    {
      id: 5,
      title: "Police Station Nate",
      category: "completed" as const,
      image: "/assets/project-img/police-station-nate.jpg",
      description: "Government institutional building with solar power integration, modern facilities, and community-focused design.",
      location: "Nate, Ratnagiri",
      year: "2023"
    },
    {
      id: 6,
      title: "Tilak Smarak Ratnagiri",
      category: "completed" as const,
      image: "/assets/project-img/tilak-smarak-ratnagiri.jpg",
      description: "Heritage memorial building featuring traditional architecture with modern restoration and preservation techniques.",
      location: "Ratnagiri",
      year: "2022"
    },
    {
      id: 7,
      title: "Ambedkar Bhavan",
      category: "completed" as const,
      image: "/assets/project-img/ambedkar-bhavan.jpg",
      description: "Large-scale public institutional building featuring distinctive architecture and modern community facilities.",
      location: "Ratnagiri District",
      year: "2021"
    },
    {
      id: 8,
      title: "Asode Dam",
      category: "completed" as const,
      image: "/assets/project-img/asode-dam.jpg",
      description: "Major river dam infrastructure project for irrigation, flood control, and water resource management in the Konkan region.",
      location: "Asode, Maharashtra",
      year: "2023"
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
              Showcasing 19+ years of excellence in construction and infrastructure development 
              across Ratnagiri and the Konkan region of Maharashtra.
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