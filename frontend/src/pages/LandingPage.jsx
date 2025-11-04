import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {LayoutTemplate, Menu, X, ArrowRight, Zap, Download, LogIn } from 'lucide-react';
import { landingPageStyles } from '../assets/dummystyle.js'
import { UserContext } from '../context/UserContext.jsx';

import { ProfileInfoCard } from '../components/Cards.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import Modal from '../components/Modal.jsx';
import ThemeSelector from '../components/ThemeSelector.jsx';
import { Mail, Github, Linkedin } from "lucide-react";


const LandingPage = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate()

    const [openAuthModal, setOpenAuthModal] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen]= useState(false);
    const [openThemeSelector, setOpenThemeSelector] = useState(false)
    const [currentPage, setCurrentPage]= useState("login")
    const handleStartBuilding = () => {
        if(!user) {
            setOpenAuthModal(true)
        }
        else {
            navigate('/dashboard')
           
        }
    } 
    const handleViewTemplates = () => {
        if(!user) {
            setOpenAuthModal(true)
        }
        else {
           
            setOpenThemeSelector((prev) => !prev)
        }
    }

     const handleTemplateSelect = (theme) => {
    // same logic used in EditResume for theme selection
    navigate(`/create-resume?theme=${theme}`);
    setOpenThemeSelector(false);
  };

    return (
        
        
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
            
            <div className={landingPageStyles.logoContainer}>
                <div className={landingPageStyles.logoIcon}>
                    <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                </div>
                <span className={landingPageStyles.logoText}>ResumeXpert</span>
            </div>
            {/*mobile menu*/ }
            <button className={landingPageStyles.mobileMenuButton}
                onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ?
                    <X  size={24} className={landingPageStyles.mobileMenuIcon}/> :
                    <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>}
            </button>
            {/* desktop navigation*/}
            <div className=' hidden md:flex items-center'>
                {user ? (
                    <ProfileInfoCard/>
                ) : (
                    <button className={landingPageStyles.desktopAuthButton} onClick={() => setOpenAuthModal(true)}>
                        <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                        <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                    </button>
                )
                
            }
            </div>
        </div>
        {/*mobile menu*/}
        {mobileMenuOpen && (
            <div className={landingPageStyles.mobileMenu}>
                <div className={landingPageStyles.mobileMenuContainer}>
                    {user ? (
                        <div className={landingPageStyles.mobileUserInfo}>
                            <div className={landingPageStyles.mobileUserWelcome}>
                                Welcome Back
                            </div>
                            <button className={landingPageStyles.mobileDashboardButton}
                            onClick={() => {
                                navigate('/dashboard');
                                setMobileMenuOpen(false)
                            }}>
                                Go to dashboard
                            </button>
                        </div>
                     ): (
                        <button className={landingPageStyles.mobileAuthButton}
                        onClick={() =>{
                            setOpenAuthModal(true)
                            setMobileMenuOpen(false)
                        }
                        }> Get Started</button>
                        )
                    }
                    
                </div>
            </div>
        )}
      </header>
      {/*main content*/}
      <main className={landingPageStyles.main}>
        <section className={landingPageStyles.heroSection}>
            <div className={landingPageStyles.heroGrid}>
                <div className={landingPageStyles.heroLeft}>
                    <div className={landingPageStyles.tagline}>
                        Professional Resume Builder
                    </div>
                    
                    <h1 className={landingPageStyles.heading}>
                        <span className={landingPageStyles.headingText}>Craft</span>
                        <span className={landingPageStyles.headingGradient}>Professional</span>
                        <span className={landingPageStyles.headingText}>Resumes</span>
                    </h1>

                    <p className={landingPageStyles.description}>
                        Create job-winning resumes with expertly designed templates. ATS-friendly, recruiter-approved, and tailored to your career goals.
                    </p>
                    
                        <button className={landingPageStyles.primaryButton}
                        onClick={handleStartBuilding}>
                            <div className={landingPageStyles.primaryButtonOverlay}></div>
                            <span className={landingPageStyles.primaryButtonContent}>
                                Start Building
                                <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18}/>
                            </span>
                        </button>
                        
                    
                    <button className={landingPageStyles.secondaryButton} onClick={handleViewTemplates}>
                            View Templates
                             
                        </button>
                        {/* Fixed, centered modal for ThemeSelector */}
{openThemeSelector && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
      <button
        onClick={() => setOpenThemeSelector(false)}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition"
      >
        <X size={24} />
      </button>

      <ThemeSelector
        selectedTheme={""}
        setSelectedTheme={handleTemplateSelect}
        resumeData={null}
        onClose={() => setOpenThemeSelector(false)}
      />
    </div>
  </div>
)}
                    {/* stats grid*/}
                    <div className={landingPageStyles.statsContainer}>
                        {[
                            { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
                                    { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
                                    { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' }
                        ].map((stat, idx) => (
                            <div className={landingPageStyles.statItem} key={idx}>
                                <div className={ `${landingPageStyles.statNumber} ${stat.gradient}`}>
                                    {stat.value}
                                </div>
                                <div className={landingPageStyles.statLabel}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right side */}
                 {/* Right Content - SVG Illustration */}
                        <div className={landingPageStyles.heroIllustration}>
                            <div className={landingPageStyles.heroIllustrationBg}></div>
                            <div className={landingPageStyles.heroIllustrationContainer}>
                                <svg
                                    viewBox="0 0 400 500"
                                    className={landingPageStyles.svgContainer}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background */}
                                    <defs>
                                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#d946ef" />
                                        </linearGradient>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="100%" stopColor="#f8fafc" />
                                        </linearGradient>
                                    </defs>

                                    {/* SVG elements */}
                                    <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                                    <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                                    <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                                    {/* Animated elements */}
                                    <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 0,-10; 0,0"
                                            dur="3s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 5,0; 0,0"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            values="0 360 210; 360 360 210; 0 360 210"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </polygon>
                                </svg>
                            </div>
                        </div>
            </div>
        </section>
        {/* features section*/}
        <section className={landingPageStyles.featuresSection}>
            <div className={landingPageStyles.featuresContainer}>
                <div className={landingPageStyles.featuresHeader}>
                    <h2 className={landingPageStyles.featuresTitle}>
                        Why Choose <span className={landingPageStyles.featuresTitleGradient}>
                            ResumeXpert?
                        </span>
                    </h2>
                    <p className={landingPageStyles.featuresDescription}>
                        Everything you need to create a Professional resume that stands out
                    </p>
                </div>
                <div className={landingPageStyles.featuresGrid}>
                      {[
                                {
                                    icon: <Zap className={landingPageStyles.featureIcon} />,
                                    title: "Lightning Fast",
                                    description: "Create professional resumes in under 5 minutes with our streamlined process",
                                    gradient: landingPageStyles.featureIconViolet,
                                    bg: landingPageStyles.featureCardViolet
                                },
                                {
                                    icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                                    title: "Pro Templates",
                                    description: "Choose from dozens of recruiter-approved, industry-specific templates",
                                    gradient: landingPageStyles.featureIconFuchsia,
                                    bg: landingPageStyles.featureCardFuchsia
                                },
                                {
                                    icon: <Download className={landingPageStyles.featureIcon} />,
                                    title: "Instant Export",
                                    description: "Download high-quality PDFs instantly with perfect formatting",
                                    gradient: landingPageStyles.featureIconOrange,
                                    bg: landingPageStyles.featureCardOrange
                                }
                            ].map((feature, index) => (
                                <div key={index} className={landingPageStyles.featureCard}>
                                    <div className={landingPageStyles.featureCardHover}></div>
                                    <div className={`${landingPageStyles.featureCardContent} ${feature.bg}`}>
                                        <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={landingPageStyles.featureTitle}>
                                            {feature.title}
                                        </h3>
                                        <p className={landingPageStyles.featureDescription}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                </div>
            </div>
        </section>



       {/* FAQ Section */}
<section
  id="faq"
  className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 py-20 sm:py-24 border-t border-violet-100"
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
      Frequently Asked{" "}
      <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
        Questions
      </span>
    </h2>
    <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-base sm:text-lg font-medium">
      Everything you need to know before you start building your perfect resume.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {[
        {
          q: "Is this resume builder free to use?",
          a: "Yes! You can build and download your resume for free. Premium templates might be added later.",
        },
        {
          q: "Do I need to install any software?",
          a: "No installation required — everything runs in your browser. Just sign up and start building.",
        },
        {
          q: "Can I edit my resume later?",
          a: "Absolutely! You can edit, duplicate, or delete your saved resumes anytime from your dashboard.",
        },
        {
          q: "What file formats can I export to?",
          a: "Currently, you can export your resume as a high-quality PDF for printing or sharing online.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="group bg-white p-6 sm:p-8 rounded-3xl border border-violet-100
                     hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100/60 
                     hover:border-fuchsia-200 transition-all duration-300"
        >
          <div className="flex flex-col items-start text-left">
            <h3
              className="text-lg sm:text-xl font-bold text-slate-900 mb-3 
                         group-hover:text-violet-700 transition-colors"
            >
              {item.q}
            </h3>
            <p
              className="text-slate-600 text-sm sm:text-base leading-relaxed 
                         group-hover:text-slate-700 transition-colors duration-300"
            >
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>





        {/*CTA section */}
        <section className={landingPageStyles.ctaSection}>
            <div className={landingPageStyles.ctaContainer}>
                <div className={landingPageStyles.ctaCard}>
                    <div className={landingPageStyles.ctaCardBg}></div>
                    <div className={landingPageStyles.ctaCardContent}>
                        <h2 className={landingPageStyles.ctaTitle}>
                            Ready to Build Your <span className={landingPageStyles.ctaTitleGradient}>
                                Standout Resume?
                            </span>
                            <p className={landingPageStyles.ctaDescription}>
                                Join thousands of professionals who landed their dream jobs with our platform
                            </p>
                            <button className={landingPageStyles.ctaButton} onClick={handleStartBuilding}>
                                <div className={landingPageStyles.ctaButtonOverlay}></div>
                                    <span className={landingPageStyles.ctaButtonText}>Start Building</span>
                                
                            </button>
                        </h2>
                    </div>
                </div>
            </div>
        </section>
      </main>

    
{/* footer */}
<footer className={landingPageStyles.footer}>
  <div className={landingPageStyles.footerContainer}>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
      {/* Brand */}
      <div>
        <h3 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
          ResumeXpert
        </h3>
        <p className="text-slate-600 font-medium text-sm leading-relaxed">
          Create professional, ATS-friendly resumes in minutes — tailored to your career goals.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm font-medium text-slate-600">
          <li>
            <a href="#features" className="hover:text-violet-600 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-violet-600 transition-colors">
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => navigate("/dashboard")}
              className="hover:text-violet-600 transition-colors"
            >
              Dashboard
            </a>
          </li>
        </ul>
      </div>

      {/* Contact / Socials */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-3">Connect</h4>

        {/* Email with icon */}
        <a
          href="mailto:sanchari.pandey@example.com"
          className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm font-medium mb-3 transition-all
                     hover:text-violet-600 hover:underline hover:underline-offset-4"
        >
          <Mail size={30} className="text-violet-600 transition-colors" />
          sanchari.pandey@example.com
        </a>

        {/* Social Icons with labels */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-violet-600 font-medium transition-all"
          >
            <Github size={22} />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-fuchsia-600 font-medium transition-all"
          >
            <Linkedin size={22} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-violet-100 pt-6 text-center text-sm text-slate-500">
      Crafted with ❤️ by{" "}
      <span className="text-violet-600 font-semibold">Sanchari Pandey</span> — All rights reserved ©{" "}
      {new Date().getFullYear()}
    </div>
  </div>
</footer>



      {/*modal for login and sign up */}
      <Modal isOpen={openAuthModal} onClose={() => {
        setOpenAuthModal(false)
        setCurrentPage("login")
      }} hideHeader> 
      <div>
            {currentPage === "login" && <Login setCurrentPage={setCurrentPage} /> }
            {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} /> }

        </div>
      </Modal>
    </div>

  )
}

export default LandingPage
