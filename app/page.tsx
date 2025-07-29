"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Code,
  Users,
  TrendingUp,
  Music,
  Plane,
  Film,
  Trophy,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react"

function CountingNumber({ end, duration = 4000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-4xl font-bold text-gray-900 mb-2">
      {count.toLocaleString()}
    </div>
  )
}

function TypewriterText({ text, delay = 100, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

const navigation = [
  { name: "HOME", href: "#home", active: true },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "ALSO ME", href: "#also-me" },
  { name: "CERTIFICATIONS", href: "#certifications" },
  { name: "CONTACT", href: "#contact" },
]

const stats = [
  { icon: Briefcase, number: 7, label: "INNOVATIVE PROJECTS" },
  { icon: Code, number: 28, label: "ORATORY CONTRIBUTIONS" },
  { icon: Users, number: 358, label: "STUDENTS LED" },
  { icon: TrendingUp, number: 3589, label: "LINES OF CODE WRITTEN" },
]

const projects = [
  {
    title: "growSmart",
    description: "AI-based tool recommending plants for urban farming using space, sunlight, and climate.",
    icon: "🌱",
    link: "https://github.com/harinie-4466/growSmart", // Replace with your actual GitHub URL
  },
  {
    title: "Study group finder",
    description: "Groups students by performance and language using DSA to enhance collaborative learning.",
    icon: "📚",
    link: "https://github.com/harinie-4466/study-group-finder", // Replace with your actual GitHub URL
  },
  {
    title: "AttenDex",
    description: "A mobile app that scans ID cards to instantly record and manage student attendance efficiently.",
    icon: "📱",
    link: "https://github.com/harinie-4466", // Replace with your actual GitHub URL
  },
  {
    title: "GameHub",
    description: "A fun-filled platform where kids can play easy, engaging games designed for learning and enjoyment.",
    icon: "🎮",
    link: "https://github.com/harinie-4466/GameHub", // Replace with your actual GitHub URL
  },
  {
    title: "IntelAcad",
    description: "Smart platform guiding CSE students with personalized career paths, skills, and opportunities.",
    icon: "💻",
    link: "https://github.com/harinie-4466", // Replace with your actual GitHub URL
  },
  {
    title: "CocoCount",
    description: "An ML model that detects and counts coconut trees from satellite images for agricultural insight.",
    icon: "🥥",
    link: "https://github.com/harinie-4466/misclassification-viewer", // Replace with your actual GitHub URL
  },
  {
    title: "W2M - Walk With Me",
    description:
      "A Tinkercad-simulated smart stick using Arduino and sensors to assist visually impaired with guided mobility.",
    icon: "🦯",
    link: "https://www.tinkercad.com/things/g5Keimrv8Dw-w2m-smart-walking-stick/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard&sharecode=Uk_Yvlrfk4gtgytCx0TEUxap1g3Lc-kmFesyiQlCfJ4", // Replace with your actual GitHub URL
  },
]

const skills = ["CSS", "HTML", "JavaScript", "Python", "MySQL", "C", "Flutter", "Dart", "Haskell"]

const certifications = [
  {
    title: "Data Science",
    provider: "IIT Madras Data Science (Foundation)",
    description: "Covered Python, stats, and basics of machine learning.",
    image: "/images/image1.png?height=300&width=400&text=Data+Science+Certificate",
  },
  {
    title: "Artificial Intelligence",
    provider: "Infosys AI Certification",
    description: "Learned supervised learning, neural networks, and practical AI applications.",
    image: "/images/image2.png?height=300&width=400&text=AI+Certificate",
  },
  {
    title: "Deep Learning",
    provider: "Infosys Deep Learning Certification",
    description:
      "Learned deep learning concepts including CNNs, RNNs, and their applications in solving complex real-world problems.",
    image: "/images/image3.png?height=300&width=400&text=Deep+Learning+Certificate",
  },
]

const interests = [
  { icon: Music, label: "Music" },
  { icon: Plane, label: "Travel" },
  { icon: Film, label: "Movie" },
  { icon: Trophy, label: "Sports" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  // Scroll-based navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "also-me", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId.replace("#", ""))
    document.getElementById(sectionId.replace("#", ""))?.scrollIntoView({ behavior: "smooth" })
  }

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/resume/Harinie_Boopathy.pdf" // Place your resume in public/resume/ folder
    link.download = "Harinie_Boopathy.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const goToContact = () => {
    scrollToSection("#contact")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-black">HARINIE BOOPATHY.</div>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.href.replace("#", "") ? "border-b-2" : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    color: activeSection === item.href.replace("#", "") ? "#B1B493" : undefined,
                    borderColor: activeSection === item.href.replace("#", "") ? "#B1B493" : undefined,
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen relative overflow-hidden">
        {/* Background with workspace image */}
        <div className="absolute inset-0">
          <div className="relative h-full">
            {/* Image positioned on the right side */}
            <div className="absolute top-0 right-0 w-3/5 h-full">
              <Image
                src="/images/bg2_alt3.jpg"
                alt="Workspace with coffee, keyboard, plants and office supplies"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Diagonal White Overlay */}
        <div className="absolute inset-0">
          <div className="relative h-full">
            {/* Diagonal white section */}
            <div
              className="absolute top-0 left-0 bg-white h-full"
              style={{
                width: "55%",
                clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
              }}
            ></div>
          </div>
        </div>

        {/* Content - Positioned lower on the page */}
        <div className="relative z-10 h-full flex items-end pb-34 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-end h-full">
              <div className="w-full max-w-2xl lg:max-w-lg lg:ml-8">
                <div className="space-y-5">
                  <p className="text-sm font-medium tracking-wider uppercase opacity-70" style={{ color: "#B1B493" }}>
                    <TypewriterText text="HOLA! THIS IS HARINIE BOOPATHY" delay={80} />
                  </p>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    <TypewriterText text="Creative " delay={100} className="inline" />
                    <TypewriterText text="UI/UX" delay={180} className="inline" style={{ color: "#B1B493" }} />
                    <br />
                    <TypewriterText text="Developer & An AI" delay={140} className="inline" />
                    <br />
                    <TypewriterText text="Futurist" delay={200} className="inline" />
                  </h1>
                </div>
                <div
                  className="flex flex-col sm:flex-row gap-4 pt-8 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "3s", animationFillMode: "forwards" }}
                >
                  <Button
                    onClick={goToContact}
                    className="text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-all duration-300 rounded-md transform hover:scale-105"
                    style={{ backgroundColor: "#B1B493" }}
                  >
                    Hire me
                  </Button>
                  <Button
                    onClick={downloadResume}
                    variant="outline"
                    className="px-8 py-3 text-base font-medium bg-transparent hover:bg-gray-50 transition-all duration-300 rounded-md transform hover:scale-105"
                    style={{
                      borderColor: "#B1B493",
                      color: "#B1B493",
                      borderWidth: "2px",
                    }}
                  >
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#B1B493" }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CountingNumber
                  end={stat.number}
                  duration={stat.number > 1000 ? 6000 : stat.number > 100 ? 5000 : 4000}
                />
                <div className="text-sm font-medium" style={{ color: "#B1B493" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/about2.jpg?height=600&width=500&text=Harinie+Profile+Photo"
                alt="Harinie Boopathy"
                width={500}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "#B1B493" }}>
                  MY INTRO
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">The Story So Far</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  A curious mind with a love for tech, people, and purpose — currently pursuing Computer Science and
                  passionate about building smart, meaningful projects. Whether it's coding solutions, leading teams, or
                  speaking on stage, there's joy in learning, creating, and connecting!
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-gray-900 min-w-[140px] flex-shrink-0">Current Role:</span>
                    <span className="text-gray-600">Student, B.Tech Computer Science, Amrita Vishwa Vidyapeetham</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-gray-900 min-w-[140px] flex-shrink-0">Vision:</span>
                    <span className="text-gray-600">
                      To build tech that empowers people and drives meaningful change
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-gray-900 min-w-[140px] flex-shrink-0">Achievements:</span>
                    <span className="text-gray-600">Finalist in GenAI Hackathon, Excellence Awardee in school</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-gray-900 min-w-[140px] flex-shrink-0">Current Focus:</span>
                    <span className="text-gray-600">
                      Deep learning, creative & responsive interfaces, and scalable backend
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <span className="font-semibold text-gray-900 min-w-[140px] flex-shrink-0">Mindset:</span>
                    <span className="text-gray-600">
                      Choosing effort over ease, progress over perfection, and consistency over chaos.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2"
                    style={{ backgroundColor: "#D6D6D6", color: "#333" }}
                  >
                    <interest.icon className="w-4 h-4" />
                    {interest.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "#B1B493" }}>
              STACKED & SKILLED
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">My Skills</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Languages, frameworks, and logic I use to build smart, scalable, and meaningful solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-gray-900">{skill}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">My Projects</h2>
            <p className="text-gray-600 text-lg">
              Stuff I built when I said "just 10 minutes" and stayed up till 3 a.m.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: "#B1B493", color: "white" }}
                  >
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:opacity-90 transition-opacity"
                    style={{ borderColor: "#B1B493", color: "#B1B493" }}
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Also Me Section */}
      <section id="also-me" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "#B1B493" }}>
              ACCOMPLISHMENTS
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Also me</h2>
            <p className="text-gray-600 text-lg">
              My hobbies include organizing chaos, speaking confidently, and saying yes before checking my schedule.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "/images/work1.jpg?height=300&width=300&text=ACE+Induction+Presentation",
                alt: "ACE Induction Presentation",
                title: "ACE Induction",
                subtitle: "Hosting",
              },
              {
                src: "/images/work2.jpg?height=300&width=300&text=IIT+Madras+Campus",
                alt: "At IIT Madras Campus",
                title: "E-Summit",
                subtitle: "IIT Madras",
              },
              {
                src: "/images/work3.png?height=300&width=300&text=Meet+Our+Tea+Team",
                alt: "Meet Our Tea Team Photo",
                title: "ASCII, Amrita",
                subtitle: "Newsletter",
              },
              {
                src: "/images/work4.jpeg?height=300&width=300&text=Group+Selfie",
                alt: "Group Selfie with Friends",
                title: "NSS Camp",
                subtitle: "Govt. School, Madukkarai",
              },
              {
                src: "/images/work5.jpg?height=300&width=300&text=Students+Group+Photo",
                alt: "Large Group Photo with Students",
                title: "Swachchata Hi Seva",
                subtitle: "Cleanliness Drive",
              },
              {
                src: "/images/work6.png?height=300&width=300&text=Workshop+Meeting",
                alt: "Workshop or Meeting Session",
                title: "Codeathon",
                subtitle: "Finalist",
              },
              {
                src: "/images/work7.jpg?height=300&width=300&text=Codeathon",
                alt: "Codeathon Competition",
                title: "Yoga",
                subtitle: "Fitness",
              },
              {
                src: "/images/work8.jpg?height=300&width=300&text=Yoga+Session",
                alt: "Yoga and Fitness",
                title: "Kalari",
                subtitle: "Martial Arts",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer relative shadow"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex justify-center items-center">
                  <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      <a href="#" className="hover:underline">
                        {image.title}
                      </a>
                    </h3>
                    <span className="text-sm">{image.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "#B1B493" }}>
              ACCREDITATIONS
            </p>
            <h2 className="text-4xl font-bold text-gray-900">My Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="font-medium mb-3" style={{ color: "#B1B493" }}>
                    {cert.provider}
                  </p>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "#B1B493" }}>
              CONTACT ME
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What can we build together?</h2>
            <p className="text-gray-600 text-lg">Because great things start with shared curiosity.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl mx-auto items-start pl-28 sm:pl-45">
            <div className="h-full px-4 flex flex-col justify-center space-y-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    className="focus:border-opacity-80 h-12 text-base"
                    style={{ borderColor: "#D6D6D6", focusBorderColor: "#B1B493" }}
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="focus:border-opacity-80 h-12 text-base"
                    style={{ borderColor: "#D6D6D6", focusBorderColor: "#B1B493" }}
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="focus:border-opacity-80 h-12 text-base"
                  style={{ borderColor: "#D6D6D6", focusBorderColor: "#B1B493" }}
                />
                <Textarea
                  placeholder="Message"
                  rows={6}
                  className="focus:border-opacity-80 text-base"
                  style={{ borderColor: "#D6D6D6", focusBorderColor: "#B1B493" }}
                />
                <Button
                  className="text-white px-8 py-3 hover:opacity-90 transition-opacity w-full sm:w-auto"
                  style={{ backgroundColor: "#B1B493" }}
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="h-full space-y-8 lg:pr-8">
              <div className="flex items-centre gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#D6D6D6" }}
                >
                  <Linkedin className="w-6 h-6" style={{ color: "#B1B493" }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">LinkedIn</div>
                  <a
                    href="www.linkedin.com/in/harinie-boopathy-08787b289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Harinie Boopathy
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#D6D6D6" }}
                >
                  <Mail className="w-6 h-6" style={{ color: "#B1B493" }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email:</div>
                  <a href="mailto:sviharinie@gmail.com" className="text-gray-600 hover:text-gray-800 transition-colors">
                    sviharinie@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#D6D6D6" }}
                >
                  <Github className="w-6 h-6" style={{ color: "#B1B493" }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">GitHub</div>
                  <a
                    href="https://github.com/harinie-4466"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    harinie-4466
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Lets Collaborate</h3>
              <p className="text-gray-400 mb-6">
                Building meaningful digital experiences, one line of code at a time. Let's bring ideas to life together.
              </p>
              <Button onClick={goToContact} className="text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: "#B1B493" }}>
                Contact
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Links</h3>
              <div className="space-y-3">
                <Link href="www.linkedin.com/in/harinie-boopathy-08787b289" className="block text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="https://github.com/harinie-4466" className="block text-gray-400 hover:text-white transition-colors">
                  GitHub
                </Link>
                <Link href="https://ds.study.iitm.ac.in/student_dashboard/profile" className="block text-gray-400 hover:text-white transition-colors">
                  IITM Profile
                </Link>
                <Link href="" className="block text-gray-400 hover:text-white transition-colors">
                  X
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Services</h3>
              <div className="space-y-3">
                <div className="text-gray-400">Web Design</div>
                <div className="text-gray-400">Web Development</div>
                <div className="text-gray-400">Business Analyst</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Have a Questions?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: "#B1B493" }}
                  >
                    <span className="text-xs">📍</span>
                  </div>
                  <span className="text-gray-400 text-sm">Coimbatore, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: "#B1B493" }}
                  >
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-gray-400 text-sm">sviharinie@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
