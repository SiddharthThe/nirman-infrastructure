import Hero from '../components/Hero';

const Home = () => {
  return (
    <main>
      <Hero />
      
      {/* Quick Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-secondary">18+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our latest infrastructure developments that are shaping the future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Degree College",
                category: "Educational",
                image: "/assets/project-img/degree-clg.png",
                description: "A significant educational landmark showcasing our expertise in large-scale institutional architecture. The building features a modern, multi-story design with a robust structural framework, incorporating expansive academic wings and an inviting entrance plaza. Designed to foster a superior learning environment for the next generation."
              },
              {
                title: "Nirman Shrushti",
                category: "Residential - Flats Ready to Sell",
                image: "/assets/project-img/Nirman-Srushti.png",
                description: "A perfect blend of modern architecture and serene living. Nirman Srushti offers thoughtfully designed apartments with ample natural light and ventilation. We take pride in delivering superior construction quality and a premium lifestyle for every family. Flats are ready to sell - your dream home awaits!",
                highlight: true
              },
              {
                title: "Nalawade Sankul",
                category: "Residential",
                image: "/assets/project-img/Nalawade-Sankul.png",
                description: "Premium private residential complex featuring modern infrastructure and contemporary design. Built with attention to detail and quality craftsmanship, offering comfortable living spaces in the heart of Ratnagiri."
              }
            ].map((project, index) => (
              <div key={index} className="card-glow p-6 relative">
                {project.highlight && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      Flats Ready
                    </span>
                  </div>
                )}
                <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-4 border border-border">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;