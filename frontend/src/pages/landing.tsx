import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  MessageSquare,
  Zap,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Lock,
  Rocket,
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    setLocation("/app");
  };

  const productName = "MindFlow";
  const productTagline = "Your Intelligent Knowledge Companion";

  const heroFeatures = [
    { icon: <Brain className="w-5 h-5" />, text: "AI-Powered" },
    { icon: <Zap className="w-5 h-5" />, text: "Instant Answers" },
    { icon: <Shield className="w-5 h-5" />, text: "Enterprise Secure" },
  ];

  const coreFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Universal Document Support",
      description:
        "PDF, DOCX, TXT, MD, HTML - we understand them all. Our advanced parsers extract meaning from any format.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Contextual Intelligence",
      description:
        "Not just keyword matching. We understand context, relationships, and nuances in your documents.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Retrieval",
      description:
        "Vector search engine delivers answers in milliseconds, even across thousands of documents.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description:
        "Your data never leaves your control. Self-hosted options with end-to-end encryption.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Share knowledge bases, collaborate on answers, and build collective intelligence together.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Conversation",
      description:
        "Chat with your documents like you're talking to a colleague. Follow-up questions, clarifications, all supported.",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "Upload & Analyze",
      description:
        "Drag and drop your documents. Our AI automatically structures and indexes your knowledge.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "Ask Anything",
      description:
        "Pose questions in plain language. We find the most relevant information across all your documents.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Get Insights",
      description:
        "Receive accurate, cited answers with source references. Build on the knowledge you already have.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      number: "04",
      title: "Scale & Grow",
      description:
        "Your knowledge base grows smarter with every interaction. Continuous learning for continuous improvement.",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "TechNova",
      content:
        "MindFlow transformed how our team accesses institutional knowledge. Productivity up 300%.",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Research Lead",
      company: "Innovate Labs",
      content:
        "Literature reviews that used to take weeks now take hours. This is a game-changer for research.",
      avatar: "MJ",
    },
    {
      name: "Elena Rodriguez",
      role: "VP Operations",
      company: "GlobalCorp",
      content:
        "Customer support response times dropped 60%. Our team now has instant access to policy documents.",
      avatar: "ER",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "5M+", label: "Documents Processed" },
    { value: "99.9%", label: "Uptime" },
    { value: "200ms", label: "Avg Response" },
  ];

  return (
    <div className="min-h-screen bg-mindflow-dark text-mindflow-text overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mindflow-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-mindflow-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-mindflow-accent/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-mindflow-dark/80 backdrop-blur-xl border-b border-mindflow-dark-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mindflow-primary to-mindflow-secondary flex items-center justify-center animate-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-display bg-gradient-to-r from-mindflow-primary via-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent">
                {productName}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Features", "Workflow", "Testimonials", "Pricing"].map(
                (item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-mindflow-text-muted hover:text-mindflow-text transition-colors duration-300 text-sm font-medium"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-mindflow-text-muted hover:text-mindflow-text hover:bg-mindflow-dark-border/50"
                onClick={() => setLocation("/login")}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-mindflow-primary to-mindflow-secondary hover:from-mindflow-primary-glow hover:to-mindflow-secondary-glow text-white border-0 shadow-lg hover:shadow-mindflow-primary/25 transition-all duration-300"
                onClick={handleGetStarted}
              >
                Start Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-24 pb-32"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mindflow-dark-card border border-mindflow-dark-border mb-8"
            >
              <Sparkles className="w-4 h-4 text-mindflow-primary animate-pulse" />
              <span className="text-mindflow-text-muted text-sm font-medium">
                Introducing {productName} v2.0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6"
            >
              <span className="block bg-gradient-to-r from-mindflow-text via-mindflow-text-muted to-mindflow-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                Your Knowledge,
              </span>
              <span
                className="block bg-gradient-to-r from-mindflow-primary via-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
                style={{ animationDelay: "0.5s" }}
              >
                Supercharged.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-mindflow-text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Transform static documents into intelligent conversations. Get
              instant, accurate answers from your entire knowledge base.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-mindflow-primary to-mindflow-secondary hover:from-mindflow-primary-glow hover:to-mindflow-secondary-glow text-white border-0 shadow-2xl hover:shadow-mindflow-primary/30 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                onClick={handleGetStarted}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="bg-mindflow-dark-card border border-mindflow-dark-border hover:bg-mindflow-dark-border/50 text-mindflow-text px-8 py-6 text-lg"
              >
                Watch Demo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-4 text-mindflow-text-muted"
            >
              {heroFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-mindflow-dark-card/50 border border-mindflow-dark-border/50"
                >
                  <div className="text-mindflow-primary">{feature.icon}</div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="mt-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-mindflow-primary/20 via-mindflow-secondary/20 to-mindflow-accent/20 blur-2xl rounded-3xl" />
              <div className="relative bg-mindflow-dark-card border border-mindflow-dark-border rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-4 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.2 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-mindflow-primary to-mindflow-secondary bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-mindflow-text-muted text-sm mt-2">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mindflow-dark-card border border-mindflow-dark-border text-mindflow-primary text-sm font-semibold uppercase tracking-wider mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-mindflow-primary to-mindflow-secondary bg-clip-text text-transparent">
                Unlock Knowledge
              </span>
            </h2>
            <p className="text-xl text-mindflow-text-muted max-w-2xl mx-auto">
              Powerful features designed to help you find, understand, and
              leverage your information better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-mindflow-dark-card border border-mindflow-dark-border rounded-2xl p-8 hover:border-mindflow-primary/50 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div
                  className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-mindflow-text group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-mindflow-text-muted leading-relaxed group-hover:text-mindflow-text transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-32 relative bg-mindflow-dark-soft">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mindflow-dark-card border border-mindflow-dark-border text-mindflow-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Simple, Powerful,
              <br />
              <span className="bg-gradient-to-r from-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent">
                Effective
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-mindflow-dark-card border border-mindflow-dark-border rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold font-display bg-gradient-to-r from-mindflow-primary/30 to-mindflow-secondary/30 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mindflow-primary to-mindflow-secondary flex items-center justify-center mx-auto mb-6 animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <div className="text-white">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-mindflow-text">
                    {step.title}
                  </h3>
                  <p className="text-mindflow-text-muted">{step.description}</p>
                </div>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-mindflow-dark-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mindflow-dark-card border border-mindflow-dark-border text-mindflow-accent text-sm font-semibold uppercase tracking-wider mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Loved by Teams
              <br />
              <span className="bg-gradient-to-r from-mindflow-accent to-mindflow-primary bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-mindflow-dark-card border border-mindflow-dark-border rounded-2xl p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-mindflow-text-muted mb-8 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mindflow-primary to-mindflow-secondary flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-mindflow-text font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-mindflow-text-muted text-sm">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mindflow-dark-soft to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-mindflow-primary/30 via-mindflow-secondary/30 to-mindflow-accent/30 blur-3xl rounded-3xl" />
              <div className="relative bg-mindflow-dark-card border border-mindflow-dark-border rounded-3xl p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                  Ready to Transform Your
                  <br />
                  <span className="bg-gradient-to-r from-mindflow-primary via-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent">
                    Knowledge Workflow?
                  </span>
                </h2>
                <p className="text-xl text-mindflow-text-muted mb-10 max-w-2xl mx-auto">
                  Join thousands of teams who've already supercharged their
                  productivity with MindFlow.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-mindflow-primary to-mindflow-secondary hover:from-mindflow-primary-glow hover:to-mindflow-secondary-glow text-white border-0 shadow-2xl hover:shadow-mindflow-primary/30 transition-all duration-300 hover:scale-105 text-lg px-10 py-7"
                  onClick={handleGetStarted}
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Your Free Trial
                </Button>
                <p className="text-mindflow-text-muted text-sm mt-6">
                  No credit card required · 14-day free trial · Cancel anytime
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 border-t border-mindflow-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mindflow-primary to-mindflow-secondary flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-mindflow-primary via-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent">
                {productName}
              </span>
            </div>

            <div className="flex items-center gap-8">
              {["Privacy", "Terms", "Security", "Contact"].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="text-mindflow-text-muted hover:text-mindflow-text transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="text-mindflow-text-soft text-sm">
              © 2024 {productName}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
