import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, FileImage, Zap, BarChart3, CheckCircle2 } from 'lucide-react';
import Logo from '../components/common/Logo';

const Home = () => {
  // For pixel animation on scroll
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Animated grid of pixels
  const pixelGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createPixels = () => {
      if (!pixelGridRef.current) return;
      
      const grid = pixelGridRef.current;
      grid.innerHTML = '';
      
      // Get dimensions
      const width = grid.clientWidth;
      const height = grid.clientHeight;
      
      // Size of each pixel
      const pixelSize = 20;
      const cols = Math.floor(width / pixelSize);
      const rows = Math.floor(height / pixelSize);
      
      // Create grid
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const pixel = document.createElement('div');
          pixel.className = 'absolute bg-primary-500 opacity-0';
          pixel.style.width = `${pixelSize}px`;
          pixel.style.height = `${pixelSize}px`;
          pixel.style.left = `${x * pixelSize}px`;
          pixel.style.top = `${y * pixelSize}px`;
          
          // Randomly vary the opacity
          const opacity = Math.random() * 0.15;
          pixel.style.opacity = opacity.toString();
          
          // Random animation delay
          const delay = Math.random() * 2;
          pixel.style.animationDelay = `${delay}s`;
          
          grid.appendChild(pixel);
        }
      }
    };
    
    createPixels();
    window.addEventListener('resize', createPixels);
    
    return () => {
      window.removeEventListener('resize', createPixels);
    };
  }, []);
  
  return (
    <>
      {/* Hero section */}
      <section ref={heroRef} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Animated pixel grid */}
        <div ref={pixelGridRef} className="absolute inset-0 pixel-grid opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block mb-4">
              <Logo size={80} animated={heroInView} className="mx-auto" />
            </div>
            
            <h1 className={`text-5xl sm:text-6xl font-bold text-primary-950 leading-tight ${heroInView ? 'animate-fade-in' : 'opacity-0'}`}>
              Detect Image Tampering with AI Precision
            </h1>
            
            <p className={`text-xl text-gray-600 mt-6 ${heroInView ? 'animate-fade-in [animation-delay:300ms]' : 'opacity-0'}`}>
              Pixel-Safe uses advanced AI algorithms, bit-level analysis, and invisible watermarking 
              to detect and prevent image manipulation with industry-leading accuracy.
            </p>
            
            <div className={`flex flex-wrap justify-center gap-4 mt-8 ${heroInView ? 'animate-fade-in [animation-delay:600ms]' : 'opacity-0'}`}>
              <Link to="/register" className="btn-primary btn-lg px-8">
                Get Started
              </Link>
              <Link to="#how-it-works" className="btn-outline btn-lg px-8">
                How It Works
              </Link>
            </div>
            
            <div className={`mt-12 p-4 bg-white rounded-xl shadow-lg ${heroInView ? 'animate-fade-in [animation-delay:900ms]' : 'opacity-0'}`}>
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Pixel-Safe Demo" 
                className="rounded-lg w-full"
              />
              <div className="absolute inset-0 opacity-0 bg-black/50 flex items-center justify-center">
                <button className="btn-primary btn-lg">
                  Play Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section id="features" ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-4xl font-bold text-primary-950 ${featuresInView ? 'animate-fade-in' : 'opacity-0'}`}>
              Forensic-Grade Image Analysis
            </h2>
            <p className={`mt-4 text-xl text-gray-600 ${featuresInView ? 'animate-fade-in [animation-delay:300ms]' : 'opacity-0'}`}>
              Our comprehensive suite of tools gives you confidence in your digital assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'AI-Powered Detection',
                description: 'Our advanced GAN detection models identify AI-generated and manipulated images with up to 99% accuracy.',
                delay: 0
              },
              {
                icon: FileImage,
                title: 'Bit-Level Analysis',
                description: 'Examine images at the pixel level to detect compression artifacts, cloning, and other tampering techniques.',
                delay: 150
              },
              {
                icon: Lock,
                title: 'Invisible Watermarking',
                description: 'Protect your original images with robust, imperceptible watermarks that survive most editing operations.',
                delay: 300
              },
              {
                icon: BarChart3,
                title: 'Detailed Reports',
                description: 'Receive comprehensive analysis reports with confidence scores and visual heatmaps of suspicious regions.',
                delay: 450
              },
              {
                icon: Zap,
                title: 'Batch Processing',
                description: 'Analyze multiple images simultaneously with our efficient batch processing capabilities.',
                delay: 600
              },
              {
                icon: CheckCircle2,
                title: 'Tamper History',
                description: 'Access a complete history of your image analyses with the ability to review past findings.',
                delay: 750
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 ${
                  featuresInView ? `animate-fade-in [animation-delay:${feature.delay}ms]` : 'opacity-0'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-4xl font-bold text-primary-950 ${howItWorksInView ? 'animate-fade-in' : 'opacity-0'}`}>
              How Pixel-Safe Works
            </h2>
            <p className={`mt-4 text-xl text-gray-600 ${howItWorksInView ? 'animate-fade-in [animation-delay:300ms]' : 'opacity-0'}`}>
              Our multi-layered approach ensures the highest level of detection accuracy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: 'Upload Your Images',
                description: 'Securely upload the images you want to analyze. We accept JPEG and PNG formats with support for batch processing.',
                imgUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                delay: 0
              },
              {
                step: 2,
                title: 'AI Analysis',
                description: 'Our advanced neural networks scan the image to detect GAN-generated content, while our forensic algorithms perform bit-level analysis.',
                imgUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                delay: 300
              },
              {
                step: 3,
                title: 'View Detailed Results',
                description: 'Receive a comprehensive report with visual heatmaps highlighting suspicious areas and a confidence score of potential tampering.',
                imgUrl: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                delay: 600
              },
              {
                step: 4,
                title: 'Protect Your Images',
                description: 'Optionally apply invisible watermarks to your original images to protect them from unauthorized manipulation.',
                imgUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                delay: 900
              }
            ].map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center mb-16 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                } ${
                  howItWorksInView ? `animate-fade-in [animation-delay:${step.delay}ms]` : 'opacity-0'
                }`}
              >
                <div className="w-full md:w-1/2 p-4">
                  <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={step.imgUrl}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register" className="btn-primary btn-lg px-8">
              Start Using Pixel-Safe
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pricing section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-950">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that's right for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: 'Free',
                description: 'For individuals and small projects',
                features: [
                  '10 image analyses per month',
                  'Basic tampering detection',
                  'Low-resolution heatmaps',
                  '24-hour history retention',
                  'Community support'
                ],
                cta: 'Get Started',
                highlighted: false
              },
              {
                name: 'Professional',
                price: '$29',
                period: '/month',
                description: 'For professionals and businesses',
                features: [
                  '500 image analyses per month',
                  'Advanced AI detection',
                  'High-resolution heatmaps',
                  '90-day history retention',
                  'Invisible watermarking',
                  'Batch processing',
                  'Downloadable reports',
                  'Priority support'
                ],
                cta: 'Start Free Trial',
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For organizations with advanced needs',
                features: [
                  'Unlimited image analyses',
                  'Custom AI model training',
                  'API access',
                  'Permanent history retention',
                  'Advanced watermarking options',
                  'Dedicated account manager',
                  'SLA guarantees',
                  'Custom integrations'
                ],
                cta: 'Contact Sales',
                highlighted: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden ${
                  plan.highlighted 
                    ? 'border-2 border-primary-500 shadow-xl relative' 
                    : 'border border-gray-200 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 inset-x-0 px-4 py-1 bg-primary-500 text-white text-center text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-6 ${plan.highlighted ? 'pt-8' : ''}`}>
                  <h3 className="text-xl font-semibold text-primary-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-xl text-gray-500">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <CheckCircle2 size={20} className="flex-shrink-0 text-primary-500 mr-2" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link
                      to="/register"
                      className={`w-full block text-center py-2 px-4 rounded-md ${
                        plan.highlighted
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Ready to Protect Your Digital Assets?</h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of professionals who trust Pixel-Safe for their image verification needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-lg bg-white text-primary-900 hover:bg-primary-50">
                Create Free Account
              </Link>
              <Link to="#how-it-works" className="btn-lg border border-white text-white hover:bg-primary-800">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;