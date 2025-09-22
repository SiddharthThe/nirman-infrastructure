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
              <div className="text-4xl font-bold text-secondary">15+</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Modern Business Complex",
                category: "Commercial",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
              },
              {
                title: "Residential Township",
                category: "Residential",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
              }
            ].map((project, index) => (
              <div key={index} className="card-glow p-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-primary font-medium">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
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