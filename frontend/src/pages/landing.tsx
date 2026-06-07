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

// 双语翻译配置
const translations = {
  en: {
    productName: "MindFlow",
    productTagline: "Your Intelligent Knowledge Companion",
    nav: {
      features: "Features",
      workflow: "Workflow",
      testimonials: "Testimonials",
      pricing: "Pricing",
      signIn: "Sign In",
      startFree: "Start Free",
    },
    hero: {
      intro: "Introducing {productName} v2.0",
      title1: "Your Knowledge,",
      title2: "Supercharged.",
      description:
        "Transform static documents into intelligent conversations. Get instant, accurate answers from your entire knowledge base.",
      getStarted: "Get Started Free",
      watchDemo: "Watch Demo",
      heroFeatures: {
        aiPowered: "AI-Powered",
        instantAnswers: "Instant Answers",
        enterpriseSecure: "Enterprise Secure",
      },
    },
    stats: {
      activeUsers: "Active Users",
      documentsProcessed: "Documents Processed",
      uptime: "Uptime",
      avgResponse: "Avg Response",
    },
    features: {
      sectionTitle: "Features",
      heading1: "Everything You Need to",
      heading2: "Unlock Knowledge",
      description:
        "Powerful features designed to help you find, understand, and leverage your information better.",
      items: [
        {
          title: "Universal Document Support",
          description:
            "PDF, DOCX, TXT, MD, HTML - we understand them all. Our advanced parsers extract meaning from any format.",
        },
        {
          title: "Contextual Intelligence",
          description:
            "Not just keyword matching. We understand context, relationships, and nuances in your documents.",
        },
        {
          title: "Lightning Fast Retrieval",
          description:
            "Vector search engine delivers answers in milliseconds, even across thousands of documents.",
        },
        {
          title: "Privacy First",
          description:
            "Your data never leaves your control. Self-hosted options with end-to-end encryption.",
        },
        {
          title: "Team Collaboration",
          description:
            "Share knowledge bases, collaborate on answers, and build collective intelligence together.",
        },
        {
          title: "Natural Conversation",
          description:
            "Chat with your documents like you're talking to a colleague. Follow-up questions, clarifications, all supported.",
        },
      ],
    },
    workflow: {
      sectionTitle: "How It Works",
      heading1: "Simple, Powerful,",
      heading2: "Effective",
      steps: [
        {
          title: "Upload & Analyze",
          description:
            "Drag and drop your documents. Our AI automatically structures and indexes your knowledge.",
        },
        {
          title: "Ask Anything",
          description:
            "Pose questions in plain language. We find the most relevant information across all your documents.",
        },
        {
          title: "Get Insights",
          description:
            "Receive accurate, cited answers with source references. Build on the knowledge you already have.",
        },
        {
          title: "Scale & Grow",
          description:
            "Your knowledge base grows smarter with every interaction. Continuous learning for continuous improvement.",
        },
      ],
    },
    testimonials: {
      sectionTitle: "Testimonials",
      heading1: "Loved by Teams",
      heading2: "Worldwide",
      items: [
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
      ],
    },
    cta: {
      heading1: "Ready to Transform Your",
      heading2: "Knowledge Workflow?",
      description:
        "Join thousands of teams who've already supercharged their productivity with MindFlow.",
      startTrial: "Start Your Free Trial",
      noCreditCard:
        "No credit card required · 14-day free trial · Cancel anytime",
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
      contact: "Contact",
      copyright: "© 2024 {productName}. All rights reserved.",
    },
  },
  zh: {
    productName: "MindFlow",
    productTagline: "您的智能知识伴侣",
    nav: {
      features: "功能",
      workflow: "工作流程",
      testimonials: "用户评价",
      pricing: "价格",
      signIn: "登录",
      startFree: "免费开始",
    },
    hero: {
      intro: "推出 {productName} v2.0",
      title1: "您的知识，",
      title2: "如虎添翼。",
      description:
        "将静态文档转化为智能对话。从您的整个知识库中获取即时、准确的答案。",
      getStarted: "免费开始使用",
      watchDemo: "观看演示",
      heroFeatures: {
        aiPowered: "AI驱动",
        instantAnswers: "即时答案",
        enterpriseSecure: "企业级安全",
      },
    },
    stats: {
      activeUsers: "活跃用户",
      documentsProcessed: "文档处理",
      uptime: "运行时间",
      avgResponse: "平均响应",
    },
    features: {
      sectionTitle: "功能",
      heading1: "您所需的一切",
      heading2: "释放知识力量",
      description: "强大的功能设计，帮助您更好地查找、理解和利用您的信息。",
      items: [
        {
          title: "全面文档支持",
          description:
            "PDF、DOCX、TXT、MD、HTML - 我们都能理解。我们的高级解析器从任何格式中提取含义。",
        },
        {
          title: "上下文智能",
          description:
            "不仅仅是关键词匹配。我们理解文档中的上下文、关系和细微差别。",
        },
        {
          title: "极速检索",
          description:
            "向量搜索引擎在毫秒内提供答案，即使在数千个文档中也是如此。",
        },
        {
          title: "隐私优先",
          description: "您的数据永远不会离开您的控制。自托管选项，端到端加密。",
        },
        {
          title: "团队协作",
          description: "共享知识库，协作回答问题，共同构建集体智慧。",
        },
        {
          title: "自然对话",
          description: "像与同事交谈一样与您的文档聊天。支持追问、澄清。",
        },
      ],
    },
    workflow: {
      sectionTitle: "如何使用",
      heading1: "简单、强大、",
      heading2: "高效",
      steps: [
        {
          title: "上传与分析",
          description: "拖放您的文档。我们的AI自动构建和索引您的知识。",
        },
        {
          title: "询问任何问题",
          description: "用日常语言提问。我们在所有文档中找到最相关的信息。",
        },
        {
          title: "获取洞察",
          description:
            "接收准确、有引用的答案，带有来源参考。在您已有的知识基础上构建。",
        },
        {
          title: "扩展与成长",
          description: "您的知识库随每次交互变得更智能。持续学习，持续改进。",
        },
      ],
    },
    testimonials: {
      sectionTitle: "用户评价",
      heading1: "深受团队喜爱",
      heading2: "遍布全球",
      items: [
        {
          name: "陈莎拉",
          role: "技术总监",
          company: "TechNova",
          content:
            "MindFlow改变了我们团队获取机构知识的方式。生产力提升了300%。",
          avatar: "SC",
        },
        {
          name: "马库斯·约翰逊",
          role: "研究主管",
          company: "Innovate Labs",
          content:
            "以前需要几周的文献综述现在只需要几小时。这对研究来说是个巨大的改变。",
          avatar: "MJ",
        },
        {
          name: "埃琳娜·罗德里格斯",
          role: "运营副总裁",
          company: "GlobalCorp",
          content:
            "客户支持响应时间下降了60%。我们的团队现在可以即时访问政策文档。",
          avatar: "ER",
        },
      ],
    },
    cta: {
      heading1: "准备好改变您的",
      heading2: "知识工作流程了吗？",
      description: "加入数千个已经使用MindFlow提升生产力的团队。",
      startTrial: "开始免费试用",
      noCreditCard: "无需信用卡 · 14天免费试用 · 随时取消",
    },
    footer: {
      privacy: "隐私",
      terms: "条款",
      security: "安全",
      contact: "联系",
      copyright: "© 2024 {productName}. 保留所有权利。",
    },
  },
};

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("en"); // 默认英文
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const t = translations[language as keyof typeof translations]; // 当前语言翻译

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

  const productName = t.productName;
  const productTagline = t.productTagline;

  const heroFeatures = [
    {
      icon: <Brain className="w-5 h-5" />,
      text: t.hero.heroFeatures.aiPowered,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: t.hero.heroFeatures.instantAnswers,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: t.hero.heroFeatures.enterpriseSecure,
    },
  ];

  const coreFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: t.features.items[0].title,
      description: t.features.items[0].description,
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: t.features.items[1].title,
      description: t.features.items[1].description,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t.features.items[2].title,
      description: t.features.items[2].description,
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t.features.items[3].title,
      description: t.features.items[3].description,
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.features.items[4].title,
      description: t.features.items[4].description,
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: t.features.items[5].title,
      description: t.features.items[5].description,
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const workflowSteps = [
    {
      number: "01",
      title: t.workflow.steps[0].title,
      description: t.workflow.steps[0].description,
      icon: <Database className="w-6 h-6" />,
    },
    {
      number: "02",
      title: t.workflow.steps[1].title,
      description: t.workflow.steps[1].description,
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      number: "03",
      title: t.workflow.steps[2].title,
      description: t.workflow.steps[2].description,
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      number: "04",
      title: t.workflow.steps[3].title,
      description: t.workflow.steps[3].description,
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  const testimonials = t.testimonials.items;

  const stats = [
    { value: "10K+", label: t.stats.activeUsers },
    { value: "5M+", label: t.stats.documentsProcessed },
    { value: "99.9%", label: t.stats.uptime },
    { value: "200ms", label: t.stats.avgResponse },
  ];

  return (
    <div className="min-h-screen bg-MindFlow-dark text-MindFlow-text overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-MindFlow-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-MindFlow-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-MindFlow-accent/20 rounded-full blur-3xl animate-pulse-glow"
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
              {/* 使用指定的logo */}
              <img
                src="/mind-logo.svg"
                alt={productName}
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-2xl font-bold font-display bg-gradient-to-r from-mindflow-primary via-mindflow-secondary to-mindflow-accent bg-clip-text text-transparent">
                {productName}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { key: "features", label: t.nav.features },
                { key: "workflow", label: t.nav.workflow },
                { key: "testimonials", label: t.nav.testimonials },
                { key: "pricing", label: t.nav.pricing },
              ].map((item, i) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="text-mindflow-text-muted hover:text-mindflow-text transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* 语言切换按钮 */}
              <Button
                variant="ghost"
                className="text-mindflow-text-muted hover:text-mindflow-text hover:bg-mindflow-dark-border/50 gap-2"
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "中文" : "English"}
              </Button>
              <Button
                variant="ghost"
                className="text-mindflow-text-muted hover:text-mindflow-text hover:bg-mindflow-dark-border/50"
                onClick={() => setLocation("/login")}
              >
                {t.nav.signIn}
              </Button>
              <Button
                className="bg-gradient-to-r from-mindflow-primary to-mindflow-secondary hover:from-mindflow-primary-glow hover:to-mindflow-secondary-glow text-white border-0 shadow-lg hover:shadow-mindflow-primary/25 transition-all duration-300"
                onClick={handleGetStarted}
              >
                {t.nav.startFree}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-MindFlow-dark-card border border-MindFlow-dark-border mb-8"
            >
              <Sparkles className="w-4 h-4 text-MindFlow-primary animate-pulse" />
              <span className="text-MindFlow-text-muted text-sm font-medium">
                {t.hero.intro.replace("{productName}", productName)}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6"
            >
              <span className="block bg-gradient-to-r from-MindFlow-text via-MindFlow-text-muted to-MindFlow-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                {t.hero.title1}
              </span>
              <span
                className="block bg-gradient-to-r from-MindFlow-primary via-MindFlow-secondary to-MindFlow-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
                style={{ animationDelay: "0.5s" }}
              >
                {t.hero.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-MindFlow-text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-MindFlow-primary to-MindFlow-secondary hover:from-MindFlow-primary-glow hover:to-MindFlow-secondary-glow text-white border-0 shadow-2xl hover:shadow-MindFlow-primary/30 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                onClick={handleGetStarted}
              >
                <Rocket className="w-5 h-5 mr-2" />
                {t.hero.getStarted}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="bg-MindFlow-dark-card border border-MindFlow-dark-border hover:bg-MindFlow-dark-border/50 text-MindFlow-text px-8 py-6 text-lg"
              >
                {t.hero.watchDemo}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-4 text-MindFlow-text-muted"
            >
              {heroFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-MindFlow-dark-card/50 border border-MindFlow-dark-border/50"
                >
                  <div className="text-MindFlow-primary">{feature.icon}</div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-MindFlow-primary/20 via-MindFlow-secondary/20 to-MindFlow-accent/20 blur-2xl rounded-3xl" />
              <div className="relative bg-MindFlow-dark-card border border-MindFlow-dark-border rounded-3xl p-8 shadow-2xl">
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
                      <div className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-MindFlow-primary to-MindFlow-secondary bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-MindFlow-text-muted text-sm mt-2">
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-MindFlow-dark-card border border-MindFlow-dark-border text-MindFlow-primary text-sm font-semibold uppercase tracking-wider mb-4">
              {t.features.sectionTitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              {t.features.heading1}
              <br />
              <span className="bg-gradient-to-r from-MindFlow-primary to-MindFlow-secondary bg-clip-text text-transparent">
                {t.features.heading2}
              </span>
            </h2>
            <p className="text-xl text-MindFlow-text-muted max-w-2xl mx-auto">
              {t.features.description}
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
                className="group relative bg-MindFlow-dark-card border border-MindFlow-dark-border rounded-2xl p-8 hover:border-MindFlow-primary/50 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div
                  className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-MindFlow-text group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-MindFlow-text-muted leading-relaxed group-hover:text-MindFlow-text transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-32 relative bg-MindFlow-dark-soft">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-MindFlow-dark-card border border-MindFlow-dark-border text-MindFlow-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              {t.workflow.sectionTitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              {t.workflow.heading1}
              <br />
              <span className="bg-gradient-to-r from-MindFlow-secondary to-MindFlow-accent bg-clip-text text-transparent">
                {t.workflow.heading2}
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
                <div className="bg-MindFlow-dark-card border border-MindFlow-dark-border rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold font-display bg-gradient-to-r from-MindFlow-primary/30 to-MindFlow-secondary/30 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-MindFlow-primary to-MindFlow-secondary flex items-center justify-center mx-auto mb-6 animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <div className="text-white">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-MindFlow-text">
                    {step.title}
                  </h3>
                  <p className="text-MindFlow-text-muted">{step.description}</p>
                </div>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-MindFlow-dark-border" />
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-MindFlow-dark-card border border-MindFlow-dark-border text-MindFlow-accent text-sm font-semibold uppercase tracking-wider mb-4">
              {t.testimonials.sectionTitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              {t.testimonials.heading1}
              <br />
              <span className="bg-gradient-to-r from-MindFlow-accent to-MindFlow-primary bg-clip-text text-transparent">
                {t.testimonials.heading2}
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
                className="bg-MindFlow-dark-card border border-MindFlow-dark-border rounded-2xl p-8 transition-all duration-300"
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
                <p className="text-MindFlow-text-muted mb-8 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-MindFlow-primary to-MindFlow-secondary flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-MindFlow-text font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-MindFlow-text-muted text-sm">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-MindFlow-dark-soft to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-MindFlow-primary/30 via-MindFlow-secondary/30 to-MindFlow-accent/30 blur-3xl rounded-3xl" />
              <div className="relative bg-MindFlow-dark-card border border-MindFlow-dark-border rounded-3xl p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                  {t.cta.heading1}
                  <br />
                  <span className="bg-gradient-to-r from-MindFlow-primary via-MindFlow-secondary to-MindFlow-accent bg-clip-text text-transparent">
                    {t.cta.heading2}
                  </span>
                </h2>
                <p className="text-xl text-MindFlow-text-muted mb-10 max-w-2xl mx-auto">
                  {t.cta.description}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-MindFlow-primary to-MindFlow-secondary hover:from-MindFlow-primary-glow hover:to-MindFlow-secondary-glow text-white border-0 shadow-2xl hover:shadow-MindFlow-primary/30 transition-all duration-300 hover:scale-105 text-lg px-10 py-7"
                  onClick={handleGetStarted}
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  {t.cta.startTrial}
                </Button>
                <p className="text-MindFlow-text-muted text-sm mt-6">
                  {t.cta.noCreditCard}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 border-t border-MindFlow-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              {/* 使用指定的logo */}
              <img
                src="/mind-logo.svg"
                alt={productName}
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-xl font-bold font-display bg-gradient-to-r from-MindFlow-primary via-MindFlow-secondary to-MindFlow-accent bg-clip-text text-transparent">
                {productName}
              </span>
            </div>

            <div className="flex items-center gap-8">
              {[
                { key: "privacy", label: t.footer.privacy },
                { key: "terms", label: t.footer.terms },
                { key: "security", label: t.footer.security },
                { key: "contact", label: t.footer.contact },
              ].map((item, i) => (
                <a
                  key={item.key}
                  href="#"
                  className="text-MindFlow-text-muted hover:text-MindFlow-text transition-colors duration-300 text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="text-MindFlow-text-soft text-sm">
              {t.footer.copyright.replace("{productName}", productName)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
