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
    // Government Projects
    {
      id: 1,
      title: "Panvel Dam",
      category: "government" as const,
      image: "/assets/project-img/panval-dam.jpg",
      description: "Major water management infrastructure project for irrigation and water conservation.",
      location: "Panvel, Ratnagiri District",
      year: "2022"
    },
    {
      id: 2,
      title: "Asode Dam",
      category: "government" as const,
      image: "/assets/project-img/asode-dam.jpg",
      description: "River dam infrastructure project for irrigation, flood control, and water resource management.",
      location: "Asode, Maharashtra",
      year: "2023"
    },
    {
      id: 3,
      title: "Shil Dam",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Water infrastructure project for regional irrigation and flood management.",
      location: "Ratnagiri District",
      year: "2022"
    },
    {
      id: 4,
      title: "Degree College",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Educational institution building with modern facilities and infrastructure.",
      location: "Ratnagiri District",
      year: "2021"
    },
    {
      id: 5,
      title: "Tarangan",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Government institutional building project.",
      location: "Ratnagiri, Maharashtra",
      year: "2022"
    },
    {
      id: 6,
      title: "Panchayat Samiti",
      category: "government" as const,
      image: "/assets/project-img/Panchayat-Samiti.png",
      description: "The Panchayat Samiti project is a testament to our expertise in constructing functional and dignified public administrative buildings. Featuring a modern facade with robust brick-finish textures, the structure is designed to facilitate efficient governance while providing a welcoming environment for the community.",
      location: "Ratnagiri District",
      year: "2021"
    },
    {
      id: 7,
      title: "ST Stand",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "State Transport bus stand facility with passenger amenities.",
      location: "Ratnagiri, Maharashtra",
      year: "2022"
    },
    {
      id: 8,
      title: "MIDC Guest House",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Maharashtra Industrial Development Corporation guest house facility.",
      location: "MIDC Ratnagiri",
      year: "2023"
    },
    {
      id: 9,
      title: "D P D C Hall",
      category: "government" as const,
      image: "/assets/project-img/D.P.D.C.png",
      description: "This high-profile project for the District Planning Development Committee (D.P.D.C.) in Ratnagiri showcases our expertise in premium interior execution. The hall features state-of-the-art acoustic paneling, professional wood finishes, and a functional executive layout designed to host prestigious government conferences and administrative meetings.",
      location: "Ratnagiri District",
      year: "2022"
    },
    {
      id: 10,
      title: "MBRS Building",
      category: "government" as const,
      image: "/assets/project-img/mbrs-ratnagiri.jpg",
      description: "Multi-story government building with modern architecture.",
      location: "Ratnagiri, Maharashtra",
      year: "2023"
    },
    {
      id: 11,
      title: "Tilak Janmabhumi",
      category: "government" as const,
      image: "/assets/project-img/tilak-smarak-ratnagiri.jpg",
      description: "Heritage memorial building featuring traditional architecture with modern restoration.",
      location: "Ratnagiri",
      year: "2022"
    },
    {
      id: 12,
      title: "Rural Hospital Devrukh",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Healthcare facility serving rural communities with modern medical infrastructure.",
      location: "Devrukh, Ratnagiri",
      year: "2023"
    },
    {
      id: 13,
      title: "Class III Quarters At Kudal MIDC Area",
      category: "government" as const,
      image: "/assets/project-img/Class-III-Quarters.png",
      description: "Residential quarters for government employees at MIDC industrial area.",
      location: "Kudal MIDC, Sindhudurg",
      year: "2022"
    },
    {
      id: 14,
      title: "Coastal Police Station at Purnagad",
      category: "government" as const,
      image: "/assets/project-img/police-station-nate.jpg",
      description: "Coastal security police station with modern facilities.",
      location: "Purnagad, Ratnagiri",
      year: "2023"
    },
    {
      id: 15,
      title: "Ambedkar Bhavan",
      category: "government" as const,
      image: "/assets/project-img/ambedkar-bhavan.jpg",
      description: "Large-scale public institutional building with distinctive architecture.",
      location: "Ratnagiri District",
      year: "2021"
    },
    {
      id: 16,
      title: "Fire Station Office Building and Staff Quarters at Fire Station MIDC Ratnagiri",
      category: "government" as const,
      image: "/assets/project-img/Fire-Station-Office-Building-and-Staff-Quarters.png",
      description: "A specialized infrastructure project designed for industrial safety and robust residential needs. This complex features a modern Fire Station Office Building integrated with well-planned Staff Quarters, ensuring operational efficiency and high-quality living standards for essential service personnel.",
      location: "MIDC Ratnagiri",
      year: "2023"
    },
    {
      id: 17,
      title: "RDCC Bank, Ratnagiri",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Ratnagiri District Central Co-operative Bank building.",
      location: "Ratnagiri, Maharashtra",
      year: "2022"
    },
    {
      id: 18,
      title: "Prathamik Shikshak Patpedhi, Ratnagiri",
      category: "government" as const,
      image: "/assets/project-img/Panchayat-Samiti.png",
      description: "The Prathamik Shikshak Patpedhi building in Ratnagiri is a prime example of our commercial construction capabilities. This multi-story institutional structure features a modern glass facade for natural lighting, sleek architectural lines, and a professional aesthetic designed to serve the cooperative banking and administrative needs of the teaching community.",
      location: "Ratnagiri, Maharashtra",
      year: "2022"
    },
    {
      id: 19,
      title: "Mandvi",
      category: "government" as const,
      image: "/assets/project-img/mandvi-jetty.jpg",
      description: "Coastal pier infrastructure extending into the Arabian Sea.",
      location: "Mandvi, Ratnagiri",
      year: "2022"
    },
    {
      id: 20,
      title: "Savarkar Natyagruh",
      category: "government" as const,
      image: "/placeholder.svg",
      description: "Cultural auditorium and theatre facility for public performances.",
      location: "Ratnagiri, Maharashtra",
      year: "2023"
    },
    // Private Projects
    {
      id: 21,
      title: "Nirman Shrushti",
      category: "private" as const,
      image: "/assets/project-img/Nirman-Srushti.png",
      description: "A perfect blend of modern architecture and serene living, Nirman Srushti offers thoughtfully designed apartments with ample natural light and ventilation. We take pride in delivering superior construction quality and a premium lifestyle for every family",
      location: "Ratnagiri, Maharashtra",
      year: "2023"
    },
    {
      id: 22,
      title: "Indradhanu",
      category: "private" as const,
      image: "/assets/project-img/Indradhanu.png",
      description: "Indradhanu is a premier mixed-use development featuring a sophisticated blend of commercial spaces and modern residential units. Designed with a sleek, contemporary facade and expansive glass frontage, it offers a vibrant environment for businesses to grow and families to thrive.",
      location: "Ratnagiri, Maharashtra",
      year: "2022"
    },
    {
      id: 23,
      title: "Nalawade Sankul",
      category: "private" as const,
      image: "/assets/project-img/Nalawade-Sankul.png",
      description: " A Perfect Blend of Modernity and Comfort \"Nalawade Sankul represents our commitment to architectural excellence and superior construction quality. Designed with a focus on modern aesthetics and spacious living, this residential project offers a perfect balance of durability, style, and comfort. We take pride in delivering homes that are not just structures, but vibrant communities built to the highest standards of safety and luxury.\"",
      location: "Ratnagiri, Maharashtra",
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