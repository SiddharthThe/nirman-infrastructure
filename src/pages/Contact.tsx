import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { toast } from 'sonner'; // Make sure to install: npm install sonner

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  hp: string; // honeypot field
  flatLocation?: string;
  flatBudget?: string;
  flatTimeline?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  address: '',
  service: '',
  message: '',
  hp: '', // honeypot field - should remain empty
  flatLocation: '',
  flatBudget: '',
  flatTimeline: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate contact sections
    if (contactInfoRef.current) {
      gsap.fromTo(contactInfoRef.current.children,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
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
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errors.push('Please enter your address');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address');
    }
    if (!formData.service.trim()) {
      errors.push('Please select a service');
    }
    // If a residential/flat/house type is selected, require extra fields
    const residentialOptions = [
      '1rk', '1bhk', '2bhk', '3bhk', 'row-house', 'individual-banglow'
    ];
    const isResidential = residentialOptions.includes(formData.service);

    // Relax message requirement for residential enquiries
    if (!isResidential) {
      if (!formData.message.trim() || formData.message.trim().length < 4) {
        errors.push('Message must be at least 4 characters long');
      }
    }
    if (residentialOptions.includes(formData.service)) {
      if (!formData.flatLocation || formData.flatLocation.trim().length < 2) {
        errors.push('Please enter preferred location for flat enquiry');
      }
      if (!formData.flatBudget || formData.flatBudget.trim().length < 2) {
        errors.push('Please enter your budget for flat enquiry');
      }
      if (!formData.flatTimeline || formData.flatTimeline.trim().length < 2) {
        errors.push('Please enter your possession timeline for flat enquiry');
      }
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
      // Pre-fill subject for flat/house enquiry
      let subject = 'Project Inquiry from ' + formData.name;
      const residentialOptions = [
        '1rk', '1bhk', '2bhk', '3bhk', 'row-house', 'individual-banglow'
      ];
      if (residentialOptions.includes(formData.service)) {
        subject = `Flat Enquiry: ${formData.service.toUpperCase()} from ${formData.name}`;
      }
      subject = encodeURIComponent(subject);
  let body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nService: ${formData.service}`;
      if (residentialOptions.includes(formData.service)) {
        body += `\nPreferred Location: ${formData.flatLocation}`;
        body += `\nBudget: ${formData.flatBudget}`;
        body += `\nPossession Timeline: ${formData.flatTimeline}`;
      }
      body += `\nMessage: ${formData.message}`;
      body = encodeURIComponent(body);
  window.location.href = `mailto:nirmaninfrastructurepvtltd@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitted(true);
      toast.success('Thank you! Your message has been sent successfully.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          service: '',
          message: '',
          hp: '',
          flatLocation: '',
          flatBudget: '',
          flatTimeline: ''
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
      details: [
        {
          label: "Nirman Infrastructure, Ratnagiri, Maharashtra 415612",
          mapUrl: "https://www.google.com/maps/search/?api=1&query=Nirman%20Infrastructure%20Ratnagiri%2C%20Office%20No.%2006%20%26%2007%2C%20First%20Floor%20Indradhanu%20Behind%20Chhatrapati%20Shivaji%20Maharaj%20Stadium%2C%20SV%20Rd%2C%20Hindu%20Colony%2C%20Abhyudhya%20Nagar%2C%20Ratnagiri%2C%20Maharashtra%20415612"
        }
      ],
      color: "text-blue-500"
    },
    {
      icon: Phone,
  title: "Call Us",
      details: [
        {
          label: "+91 744-7849574",
          telUrl: "tel:+917447849574"
        }
      ],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        {
          label: "technirmaninfrastructurepvtltd@gmail.com",
          mailUrl: "mailto:nirmaninfrastructurepvtltd@gmail.com"
        }
      ],
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
  details: ["Monday to Saturday: 10:00 AM - 6:00 PM"],
      color: "text-orange-500"
    }
  ];

  return (
    <main className="pt-16">

      {/* Contact Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#f8faff] via-[#eaf3ff] to-[#f8faff]">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="rounded-3xl shadow-2xl bg-white/95 border border-[#e3eefe] flex flex-col lg:flex-row overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_0_rgba(79,156,255,0.15)] gap-0 lg:gap-0">
            {/* Contact Info */}
            <div ref={contactInfoRef} className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#f8faff] to-[#eaf3ff]">
              <h2
                className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#4f9cff] via-[#7aa8ff] to-[#a5b4fc] bg-clip-text text-transparent mb-6 drop-shadow-sm"
                style={{ letterSpacing: '-0.01em', lineHeight: 1.1 }}
              >
                Let's Start a Conversation
              </h2>
              <p className="text-[#64748b] mb-8 text-base md:text-lg">We're here to help you with all your construction and infrastructure needs. Reach out to us through any of the channels below, and our team will get back to you promptly.</p>
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, title, details }, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4f9cff]/10 text-[#4f9cff] shadow-sm">
                      <Icon size={22} />
                    </span>
                    <div>
                      <div className="font-semibold text-[#1e293b] text-base mb-0.5">{title}</div>
                      {details.map((detail, idx) => {
                        if (typeof detail === 'string') {
                          return <p key={idx} className="text-[#64748b] text-sm">{detail}</p>;
                        } else {
                          let href = '';
                          let isExternal = false;
                          if ('mapUrl' in detail) {
                            href = detail.mapUrl;
                            isExternal = true;
                          } else if ('telUrl' in detail) {
                            href = detail.telUrl;
                          } else if ('mailUrl' in detail) {
                            href = detail.mailUrl;
                          }
                          return (
                            <a
                              key={idx}
                              href={href}
                              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className="text-sm font-medium text-[#1e293b] hover:text-[#4f9cff] transition-colors break-all"
                              style={{ textDecoration: 'none', marginBottom: '2px' }}
                            >
                              {detail.label}
                            </a>
                          );
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Contact Form */}
            <div className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Send us a Message</h3>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-[#1e293b] mb-2">Thank You!</h4>
                  <p className="text-[#64748b]">Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    {/* Highlighted box for flat enquiry */}
                    {['1rk','1bhk','2bhk','3bhk','row-house','individual-banglow'].includes(formData.service) && (
                      <div className="col-span-1 md:col-span-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                        <div className="font-semibold text-yellow-800 mb-1">Flat/House Enquiry</div>
                        <div className="text-yellow-700 text-sm">Please provide additional details for your residential enquiry.</div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Siddharth Vhatkar"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  {/* Conditional fields for flat enquiry */}
                  {['1rk','1bhk','2bhk','3bhk','row-house','individual-banglow'].includes(formData.service) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">Preferred Location *</label>
                        <input
                          type="text"
                          name="flatLocation"
                          value={formData.flatLocation}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="e.g. Ratnagiri, Mumbai, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">Budget Range *</label>
                        <input
                          type="text"
                          name="flatBudget"
                          value={formData.flatBudget}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="e.g. 30-40 Lakh, 1-2 Cr, etc."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">Possession Timeline *</label>
                        <input
                          type="text"
                          name="flatTimeline"
                          value={formData.flatTimeline}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="e.g. Immediate, 6 months, 1 year, etc."
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="siddharth@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Service Interested In *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a service...</option>
                      <optgroup label="Buying Commercial">
                        <option value="shop-space">Shop Space</option>
                        <option value="office-space">Office Space</option>
                      </optgroup>
                      <optgroup label="Buying Residential">
                        <option value="1rk">1 RK</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                        <option value="row-house">Row House</option>
                        <option value="individual-banglow">Individual Banglow</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Project Details (location)*</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#f8faff] border border-[#e3eefe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f9cff]/30 focus:border-[#4f9cff] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
                    {(() => {
                      const residential = ['1rk','1bhk','2bhk','3bhk','row-house','individual-banglow'];
                      const commercial = ['shop-space','office-space'];
                      if (residential.includes(formData.service)) {
                        return (
                          <div className="flex items-start gap-2 mt-2 bg-yellow-50 border border-yellow-200 rounded px-3 py-2 text-yellow-800 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" /></svg>
                            <span><span className="font-semibold">Location required:</span> Please mention your preferred location in the details above for flat/house enquiries.</span>
                          </div>
                        );
                      } else if (commercial.includes(formData.service)) {
                        return (
                          <div className="flex items-start gap-2 mt-2 bg-blue-50 border border-blue-200 rounded px-3 py-2 text-blue-800 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" /></svg>
                            <span><span className="font-semibold">Location required:</span> Please mention your preferred location in the details above for commercial enquiries.</span>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#7aa8ff] to-[#4f9cff] text-white shadow-lg hover:scale-105 hover:from-[#4f9cff] hover:to-[#1e293b] focus:ring-2 focus:ring-[#4f9cff]/30 focus:outline-none ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        {/* Google Map Embed */}
        <div className="max-w-5xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-lg border border-[#e3eefe]">
          <iframe
            title="Nirman Infrastructure Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.073234013839!2d73.3131221!3d16.9862727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bea0d87c6c61a49%3A0x653f9a2bc79f24c7!2sNirman%20Infrastructure%20Ratnagiri!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contact;