import './App.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import bgImg from './assets/bg.png'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel")
      
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
          onUpdate: () => {
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
        } as ScrollTrigger.Vars
      })
      // Simple animations
      const fadeEls = gsap.utils.toArray<HTMLElement>(".fade-in")
      fadeEls.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "left 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Animated number counters - simpler approach
      let numbersAnimated = false
      
      ScrollTrigger.create({
        trigger: ".scroll-spacer",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Trigger animation when scrolling into about section (around 25% progress)
          if (self.progress > 0.2 && self.progress < 0.6 && !numbersAnimated) {
            numbersAnimated = true
            
            const statNumbers = gsap.utils.toArray<HTMLElement>(".stat h3")
            statNumbers.forEach((el, index) => {
              // Check if this has a .stat-number span (for weight with unit)
              const numberSpan = el.querySelector('.stat-number')
              const targetEl = numberSpan || el
              const finalNumber = parseInt(targetEl.textContent || '0')
              const obj = { number: 0 }
              
              gsap.set(targetEl, { textContent: "0" })
              
              gsap.to(obj, {
                number: finalNumber,
                duration: 2,
                ease: "power2.out",
                delay: index * 0.3,
                onUpdate: () => {
                  targetEl.textContent = Math.round(obj.number).toString()
                },
                onComplete: () => {
                  targetEl.textContent = finalNumber.toString()
                }
              })
            })
          }
          
          // Reset when going back
          if (self.progress < 0.15 && numbersAnimated) {
            numbersAnimated = false
            const statNumbers = gsap.utils.toArray<HTMLElement>(".stat h3")
            statNumbers.forEach((el) => {
              const numberSpan = el.querySelector('.stat-number')
              const targetEl = numberSpan || el
              gsap.set(targetEl, { textContent: "0" })
            })
          }
        }
      })

      // Parallax effects for visual elements
      gsap.utils.toArray<HTMLElement>(".headphones-container").forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, scale: 0.9, filter: "blur(5px)" },
          {
            y: -50,
            scale: 1.05,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        )
      })

    }, container)

    return () => {
      ctx.revert()
      lenis.destroy()
    }
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
                initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Find Your Peace
              </motion.h1>
              <motion.p 
                className="hero-subtitle fade-in"
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: "easeOut"
                }}
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
                
              </motion.div>
            </div>
            <div className="hero-visual">
              <motion.div 
                className="headphones-container"
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  filter: "blur(15px)",
                  rotateY: 45
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: "blur(0px)",
                  rotateY: 0
                }}
                transition={{ 
                  duration: 2, 
                  delay: 1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.4 }
                }}
              >
                <div className="headphones-placeholder">
                  {/* Imagem centralizada em círculo */}
                  <img 
                    src={bgImg}
                    alt="Headphones" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      display: 'block',
                    }}
                  />
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
                    <h3>
                    <p>All in just</p>
                      <span className="stat-number">9</span>
                      <small style={{ fontSize: '0.6em', marginLeft: '0.2em', verticalAlign: 'super' }}>oz</small>
                    </h3>
                   
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
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  filter: "brightness(1.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="feature-icon">
                  <div className="icon-precision"></div>
                </div>
                <h3>Precision</h3>
                <p>V1 processor and dual noise sensor technology create an invisible barrier between you and the world's chaos.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  filter: "brightness(1.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="feature-icon">
                  <div className="icon-audio"></div>
                </div>
                <h3>Clarity</h3>
                <p>LDAC and DSEE Extreme restore the nuances lost in compression, revealing music as memory.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  filter: "brightness(1.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="feature-icon">
                  <div className="icon-comfort"></div>
                </div>
                <h3>Presence</h3>
                <p>Lightweight design and soft-fit leather ensure hours of listening without the weight of time.</p>
              </motion.div>
              <motion.div 
                className="feature-card fade-in"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  filter: "brightness(1.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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
              <motion.button 
                className="final-button"
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.2)",
                  boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Order Now
              </motion.button>
              <div className="final-footer">
                <p>Poetry of Silence</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  )
}

export default App