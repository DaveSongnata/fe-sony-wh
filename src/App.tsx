import './App.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel")
      
      // CORRECT mathematical approach based on references
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-spacer",
          pin: container,
          pinSpacing: false,  // Prevent spacing issues
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (window.innerWidth * (panels.length - 1)),
          onUpdate: (self) => {
            // Force container to stay at top
            gsap.set(container, { y: 0 })
          },
          onComplete: () => {
            // Ensure container stays fixed at completion
            gsap.set(container, { 
              position: "fixed",
              top: 0,
              left: 0,
              y: 0
            })
          }
        }
      })
      
      // Simple animations
      gsap.utils.toArray(".fade-in").forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "left 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div className="app">
      <div className="grain"></div>
      
      <div className="scroll-spacer"></div>
      
      <div className="horizontal-scroll-container" ref={containerRef}>
        
        {/* Hero Section */}
        <section className="panel hero-section">
          <div className="container">
            <div className="hero-content">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                Silent Spaces
              </motion.h1>
              <motion.p 
                className="hero-subtitle fade-in"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                In the quiet corners of urban nights, where streetlights cast long shadows 
                and the city breathes in whispers, we find technology that disappears.
                <br /><br />
                Sony WH-1000XM5 — where silence becomes poetry.
              </motion.p>
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                >
                  Experience Silence
                </motion.button>
              </motion.div>
            </div>
            <div className="hero-visual">
              <motion.div 
                className="headphones-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <div className="headphones-placeholder">
                  <div className="headphones-silhouette"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="panel about-section">
          <div className="container">
            <div className="about-content">
              <h2 className="section-title fade-in">Carved from Silence</h2>
              <div className="about-grid">
                <div className="about-text">
                  <p className="fade-in">
                    Each curve, each surface, every element designed to disappear, 
                    leaving only you and the music that matters. This is technology 
                    as contemplation, engineering as art.
                  </p>
                  <p className="fade-in">
                    Like rain against windows in empty rooms, like neon reflections 
                    in puddles at 3am, the WH-1000XM5 exists in the space between 
                    presence and absence.
                  </p>
                </div>
                <div className="about-stats">
                  <div className="stat fade-in">
                    <h3>30</h3>
                    <p>Hours of solitude</p>
                  </div>
                  <div className="stat fade-in">
                    <h3>35</h3>
                    <p>dB of quiet</p>
                  </div>
                  <div className="stat fade-in">
                    <h3>8</h3>
                    <p>Listening ears</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="panel features-section">
          <div className="container">
            <h2 className="section-title fade-in">Silent Architecture</h2>
            <div className="features-grid">
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="feature-icon">
                  <div className="icon-precision"></div>
                </div>
                <h3>Precision</h3>
                <p>V1 processor and dual noise sensor technology create an invisible barrier between you and the world's chaos.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="feature-icon">
                  <div className="icon-audio"></div>
                </div>
                <h3>Clarity</h3>
                <p>LDAC and DSEE Extreme restore the nuances lost in compression, revealing music as memory.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="feature-icon">
                  <div className="icon-comfort"></div>
                </div>
                <h3>Presence</h3>
                <p>Lightweight design and soft-fit leather ensure hours of listening without the weight of time.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="feature-icon">
                  <div className="icon-charge"></div>
                </div>
                <h3>Patience</h3>
                <p>3 minutes of charging provides 3 hours of escape. Technology that respects the rhythm of life.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Section */}
        <section className="panel tech-section">
          <div className="container">
            <div className="tech-content">
              <h2 className="section-title fade-in">Beneath the Surface</h2>
              <div className="tech-grid">
                <div className="tech-spec fade-in">
                  <h4>Driver</h4>
                  <p>30mm dome</p>
                </div>
                <div className="tech-spec fade-in">
                  <h4>Response</h4>
                  <p>4Hz — 40kHz</p>
                </div>
                <div className="tech-spec fade-in">
                  <h4>Impedance</h4>
                  <p>48Ω @ 1kHz</p>
                </div>
                <div className="tech-spec fade-in">
                  <h4>Weight</h4>
                  <p>250g</p>
                </div>
                <div className="tech-spec fade-in">
                  <h4>Charging</h4>
                  <p>USB-C fast</p>
                </div>
                <div className="tech-spec fade-in">
                  <h4>Wireless</h4>
                  <p>Bluetooth 5.2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Section - Clean and Simple */}
        <section className="panel final-section">
          <div className="container">
            <div className="final-content">
              <h2 className="final-title">Find Your Silence</h2>
              <p className="final-text">
                Available now. Experience the poetry of perfect silence.
              </p>
              <button className="final-button">Order Now</button>
              <div className="final-footer">
                <p>© 2024 Sony Corporation. All rights reserved.</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  )
}

export default App