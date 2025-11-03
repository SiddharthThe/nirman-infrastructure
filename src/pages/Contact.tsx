import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { toast } from 'sonner'; // Make sure to install: npm install sonner

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  hp: string; // honeypot field
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    hp: '' // honeypot field - should remain empty
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate contact sections
    gsap.fromTo(contactInfoRef.current?.children,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  // Extract UTM parameters from URL
  const getUTMParameters = (): string => {
    if (typeof window === 'undefined') return '{}';
    
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utmParams[param] = value;
    });
    
    return JSON.stringify(utmParams);
  };

  // Client-side validation
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errors.push('Please enter a valid phone number');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.service.trim()) {
      errors.push('Please select a service');
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent('Project Inquiry from ' + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`
      );
      window.location.href = `mailto:technirmaninfrastructurepvtltd@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitted(true);
      toast.success('Thank you! Your message has been sent successfully.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          hp: ''
        });
      }, 3000);
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      if (error.message.includes('Too many requests')) {
        toast.error('Too many requests. Please wait a moment before trying again.');
      } else if (error.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Ratnagiri, Konkan Region", "Maharashtra, India"],
      color: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 7020715099"],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["technirmaninfrastructurepvtltd@gmail.com"],
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
      color: "text-orange-500"
    }
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get In <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Contact us today for a free consultation 
            and discover how we can bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We're here to help you with all your construction and infrastructure needs. 
                  Reach out to us through any of the channels below, and our team will get back to you promptly.
                </p>
              </div>

              {contactInfo.map(({ icon: Icon, title, details }, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    {details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="card-glow p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">Thank You!</h4>
                  <p className="text-muted-foreground">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={(e) => {
                  e.preventDefault();
                  const subject = encodeURIComponent('Project Inquiry from ' + formData.name);
                  const body = encodeURIComponent(
                    `Name: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`
                  );
                  window.location.href = `mailto:technirmaninfrastructurepvtltd@gmail.com?subject=${subject}&body=${body}`;
                }} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="hp"
                    value={formData.hp}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Interested In *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a service...</option>
                      <option value="commercial">Commercial Construction</option>
                      <option value="residential">Residential Development</option>
                      <option value="infrastructure">Infrastructure Solutions</option>
                      <option value="project-management">Project Management</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : 'btn-glow-primary hover:scale-105'
                    }`}
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;