import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    title: 'Address',
    icon: MapPin,
    details: ['Computer Systems & Mathematics Department', 'Ardhi University', 'P.O. Box 35176', 'Dar es Salaam, Tanzania']
  },
  {
    title: 'Phone',
    icon: Phone,
    details: ['+255 22 277 5004', '+255 22 277 5448']
  },
  {
    title: 'Email',
    icon: Mail,
    details: ['info@csm.aru.ac.tz', 'admissions@csm.aru.ac.tz']
  },
  {
    title: 'Office Hours',
    icon: Clock,
    details: ['Mon-Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM', 'Sun: Closed']
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); //  fix

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8001/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form. Please try again later.');
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error: any) {
      console.error('Submission error:', error.message);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero/Intro */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">Get in touch for inquiries, admissions, or collaboration opportunities.</p>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div key={info.title} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100">
              <info.icon size={32} className="mb-2 text-orange-600" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((d, i) => (
                  <p key={i} className="text-gray-600 text-sm">{d}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto mt-20 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <MessageSquare className="text-orange-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-blue-900">Send us a Message</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Enter your email address" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Subject" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Enter your message here..." />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
              <Send size={20} className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
