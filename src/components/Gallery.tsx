import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface Project {
  id: number;
  title: string;
  category: 'private' | 'government';
  image: string;
  description: string;
  location: string;
  year: string;
}

interface GalleryProps {
  projects: Project[];
}

const Gallery = ({ projects }: GalleryProps) => {
  const [filter, setFilter] = useState<'all' | 'private' | 'government'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = projects.filter(
    project => filter === 'all' || project.category === filter
  );

  useEffect(() => {
    // Animate gallery items on filter change - optimized
    gsap.fromTo('.gallery-grid > *', 
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.03 }
    );
  }, [filter]);

  const openLightbox = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % 1); // For demo, only 1 image per project
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + 1) % 1); // For demo, only 1 image per project
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4">
        {['all', 'private', 'government'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption as any)}
            className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
              filter === filterOption
                ? 'btn-glow-primary'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="gallery-item cursor-pointer"
            onClick={() => openLightbox(project)}
          >
            <div className="aspect-video bg-muted rounded-xl overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{project.location}</span>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedProject.title}</h2>
                <p className="text-muted-foreground">{selectedProject.location} • {selectedProject.year}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;