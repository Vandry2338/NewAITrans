import { useState } from 'react';
import { 
  Calculator, 
  ShoppingCart, 
  Users, 
  Cog, 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  Play,
  BarChart3,
  Building,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const services = [
  {
    icon: Calculator,
    title: "Finance & Accounting",
    description: "Comprehensive financial process management including accounts payable, receivable, and financial reporting.",
    features: ["Automated Invoice Processing", "Financial Reporting", "Compliance Management"],
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: ShoppingCart,
    title: "Procurement",
    description: "Strategic sourcing and procurement solutions to optimize your supply chain and reduce costs.",
    features: ["Strategic Sourcing", "Vendor Management", "Contract Management"],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Users,
    title: "Customer Service",
    description: "Enhanced customer experience through omnichannel support and intelligent automation.",
    features: ["24/7 Support", "Multi-channel Integration", "AI-powered Insights"],
    color: "from-green-500 to-green-600"
  },
  {
    icon: Cog,
    title: "Operations",
    description: "Streamline your business operations with intelligent process automation and optimization.",
    features: ["Process Automation", "Quality Management", "Performance Analytics"],
    color: "from-orange-500 to-orange-600"
  },
];

const benefits = [
  "AI-powered process automation",
  "Global delivery capabilities", 
  "Industry-specific expertise",
  "Scalable solutions",
  "Continuous innovation",
  "24/7 support coverage",
];

const stats = [
  { number: "500+", label: "Global Clients", icon: Building },
  { number: "25+", label: "Countries", icon: Globe },
  { number: "100K+", label: "Employees", icon: Users },
  { number: "$2B+", label: "Annual Revenue", icon: TrendingUp },
];

const news = [
  {
    date: "January 15, 2024",
    title: "Infosys BPM Wins Digital Transformation Award",
    excerpt: "Recognized for excellence in delivering AI-powered business process solutions to Fortune 500 companies.",
    category: "Awards",
  },
  {
    date: "January 10, 2024", 
    title: "New AI-Powered Finance Solutions Launch",
    excerpt: "Introducing next-generation automated finance and accounting solutions with advanced AI capabilities.",
    category: "Product Launch",
  },
  {
    date: "January 5, 2024",
    title: "Partnership with Leading Healthcare Provider", 
    excerpt: "Strategic partnership to transform healthcare operations through intelligent automation and analytics.",
    category: "Partnership",
  },
];

export function InfosysBPMExplorer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Infosys
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> BPM</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform Your Business with Intelligent Operations. Drive efficiency, innovation, and growth with our comprehensive business process management solutions powered by AI and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
            <TabsTrigger value="services" className="text-sm font-medium">Services</TabsTrigger>
            <TabsTrigger value="insights" className="text-sm font-medium">Performance</TabsTrigger>
            <TabsTrigger value="news" className="text-sm font-medium">News</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="apple-surface text-center p-6 rounded-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Why Choose Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Infosys BPM?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  With over two decades of experience in business process management, we combine deep domain expertise with cutting-edge technology to deliver transformational outcomes for our clients.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Learn About Us
                </Button>
              </div>

              <div className="relative">
                <div className="apple-surface aspect-video rounded-2xl p-8">
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">20+</div>
                      <div className="text-xl text-gray-700 dark:text-gray-300">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive business process management solutions designed to transform your operations and drive sustainable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="apple-surface group hover:shadow-xl transition-all duration-300 border-0">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="insights" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Track our global impact and performance across key business metrics
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="apple-surface p-8 rounded-2xl text-center">
                <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">85%</h3>
                <p className="text-gray-600 dark:text-gray-400">Process Efficiency Improvement</p>
              </div>
              <div className="apple-surface p-8 rounded-2xl text-center">
                <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">40%</h3>
                <p className="text-gray-600 dark:text-gray-400">Cost Reduction Average</p>
              </div>
              <div className="apple-surface p-8 rounded-2xl text-center">
                <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">99%</h3>
                <p className="text-gray-600 dark:text-gray-400">Client Satisfaction Rate</p>
              </div>
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest News & Insights</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Stay updated with our latest developments and industry insights</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <Card key={index} className="apple-surface group hover:shadow-xl transition-all duration-300 border-0">
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.date}
                    </div>
                    <Badge variant="secondary" className="w-fit mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {item.category}
                    </Badge>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.excerpt}</p>
                    <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                View All News
              </Button>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}