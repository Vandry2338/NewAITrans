"use client"

import { useState } from "react"
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  FunnelIcon,
  ChartPieIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"

// Mock data
const mockTrends = [
  {
    id: "1",
    title: "AI Adoption Rate",
    value: "67%",
    change: "+12%",
    process: "Idea-to-Market",
    capability: "Innovation",
  },
  {
    id: "2",
    title: "Cloud Migration",
    value: "89%",
    change: "+23%",
    process: "Acquire to Decommission",
    capability: "Infrastructure",
  },
  {
    id: "3",
    title: "Digital Channels",
    value: "45%",
    change: "+8%",
    process: "Lead-to-Cash",
    capability: "Digital Experience",
  },
]

const mockPainPoints = [
  {
    id: "1",
    title: "Legacy System Integration",
    description: "Difficulty connecting new systems with legacy infrastructure",
    function: "IT",
    process: "Acquire to Decommission",
    capability: "System Integration",
    impact: 4,
    urgency: 5,
    source: "Manual",
    column: "Source-to-Pay",
  },
  {
    id: "2",
    title: "Manual Data Entry",
    description: "Time-consuming manual processes affecting productivity",
    function: "Operations",
    process: "Plan-to-Fulfill",
    capability: "Process Automation",
    impact: 3,
    urgency: 3,
    source: "Agent",
    column: "Plan-to-Fulfill",
  },
]

const mockInitiatives = [
  {
    id: "1",
    title: "AI-Powered Customer Service",
    hypothesis: "Implementing AI chatbots will reduce response time by 60%",
    valueDriver: "Experience",
    horizon: "Fast Lane",
    kpiIds: ["1", "2"],
    painPointIds: ["1"],
  },
  {
    id: "2",
    title: "Legacy System Modernization",
    hypothesis: "Migrating to cloud will improve scalability and reduce costs",
    valueDriver: "Cost",
    horizon: "Core",
    kpiIds: ["3"],
    painPointIds: ["1", "2"],
  },
]

const tabs = [
  { id: "trends", label: "Industry Trends", icon: ArrowTrendingUpIcon },
  { id: "pain-points", label: "Pain Point Canvas", icon: ExclamationTriangleIcon },
  { id: "initiatives", label: "Strategic Initiatives", icon: LightBulbIcon },
]

const valueChainColumns = ["Source-to-Pay", "Plan-to-Fulfill", "Lead-to-Cash", "Recruit-to-Retire"]

const industryTrendsData = [
  {
    industry: "Agriculture",
    trend_number: 1,
    trend_name: "Precision Agriculture and Smart Farming",
    trend_description:
      "The adoption of IoT sensors, drones, GPS technology, and data analytics to optimize crop yields, reduce resource consumption, and improve farm management through real-time monitoring and automated decision-making.",
    trend_drivers:
      "Need for increased food production to meet growing global demand, environmental sustainability concerns, labor shortages, and advancements in IoT and sensor technologies.",
    trend_impact:
      "Improved crop yields, reduced water and fertilizer usage, lower operational costs, enhanced sustainability, and better decision-making through data-driven insights.",
    mapped_processes: "plan-to-fulfill|idea-to-market|source-to-pay",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Agriculture",
    trend_number: 2,
    trend_name: "Sustainable and Regenerative Farming Practices",
    trend_description:
      "Implementation of farming methods that restore soil health, increase biodiversity, and sequester carbon while maintaining or improving productivity through cover cropping, rotational grazing, and reduced tillage.",
    trend_drivers:
      "Climate change concerns, soil degradation issues, consumer demand for sustainable products, regulatory pressures, and potential for carbon credit revenue.",
    trend_impact:
      "Improved soil health, enhanced biodiversity, reduced environmental impact, potential new revenue streams from carbon credits, and improved long-term farm sustainability.",
    mapped_processes: "plan-to-fulfill|governance|finance-treasury-risk",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Agriculture",
    trend_number: 3,
    trend_name: "Agricultural Biotechnology and Gene Editing",
    trend_description:
      "Development and deployment of genetically modified crops and gene-editing technologies like CRISPR to create crops with improved traits such as disease resistance, drought tolerance, and enhanced nutritional content.",
    trend_drivers:
      "Need for climate-resilient crops, desire to reduce pesticide use, nutritional enhancement requirements, and advancements in biotechnology and gene-editing techniques.",
    trend_impact:
      "Development of more resilient and nutritious crops, reduced reliance on chemical inputs, improved food security, and potential for addressing malnutrition in developing regions.",
    mapped_processes: "idea-to-market|governance|plan-to-fulfill",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Agriculture",
    trend_number: 4,
    trend_name: "Direct-to-Consumer and Local Food Systems",
    trend_description:
      "Growth in farmers' markets, community-supported agriculture (CSA), online direct sales platforms, and local food distribution networks that connect producers directly with consumers.",
    trend_drivers:
      "Consumer preference for fresh, local produce, desire to support local economies, concerns about food miles and environmental impact, and digital platforms enabling direct sales.",
    trend_impact:
      "Higher profit margins for farmers, stronger community connections, reduced transportation costs and environmental impact, and increased consumer access to fresh, local produce.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Agriculture",
    trend_number: 5,
    trend_name: "Agricultural Automation and Robotics",
    trend_description:
      "Implementation of autonomous tractors, robotic harvesters, automated irrigation systems, and AI-powered farm management systems to reduce labor dependency and increase operational efficiency.",
    trend_drivers:
      "Labor shortages in agriculture, rising labor costs, need for increased efficiency and precision, and advancements in robotics and AI technologies.",
    trend_impact:
      "Reduced labor costs, increased operational efficiency, improved precision in farming operations, and ability to operate farms with fewer workers.",
    mapped_processes: "plan-to-fulfill|acquire-to-decommission|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Automotive",
    trend_number: 1,
    trend_name: "Electric Vehicle (EV) Adoption and Infrastructure",
    trend_description:
      "Rapid growth in electric vehicle production, sales, and supporting infrastructure including charging networks, battery technology improvements, and government incentives driving the transition from internal combustion engines.",
    trend_drivers:
      "Environmental regulations, government incentives, declining battery costs, improving charging infrastructure, and consumer environmental consciousness.",
    trend_impact:
      "Transformation of automotive manufacturing, new supply chain requirements, reduced emissions, job creation in new sectors, and fundamental changes to automotive retail and service models.",
    mapped_processes: "idea-to-market|plan-to-fulfill|source-to-pay",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Automotive",
    trend_number: 2,
    trend_name: "Autonomous and Connected Vehicles",
    trend_description:
      "Development and deployment of self-driving technology, vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) communication systems, and advanced driver assistance systems (ADAS).",
    trend_drivers:
      "Safety improvement goals, technological advancements in AI and sensors, consumer demand for convenience, and potential for new business models and services.",
    trend_impact:
      "Potential reduction in traffic accidents, new mobility services, changes in vehicle ownership models, transformation of transportation infrastructure, and creation of new data-driven revenue streams.",
    mapped_processes: "idea-to-market|plan-to-fulfill|governance",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Automotive",
    trend_number: 3,
    trend_name: "Mobility-as-a-Service (MaaS) and Shared Mobility",
    trend_description:
      "Growth in ride-sharing, car-sharing, subscription-based vehicle access, and integrated mobility platforms that combine various transportation modes into seamless user experiences.",
    trend_drivers:
      "Urbanization trends, changing consumer preferences especially among younger demographics, environmental concerns, and digital platform technologies enabling new service models.",
    trend_impact:
      "Shift from vehicle ownership to access-based models, reduced urban congestion, new revenue streams for automotive companies, and transformation of urban transportation systems.",
    mapped_processes: "lead-to-cash|idea-to-market|plan-to-fulfill",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Automotive",
    trend_number: 4,
    trend_name: "Software-Defined Vehicles and Over-the-Air Updates",
    trend_description:
      "Transformation of vehicles into software platforms with capabilities for remote updates, feature additions, and continuous improvement of vehicle functionality throughout the ownership lifecycle.",
    trend_drivers:
      "Consumer expectations for continuous improvement, potential for new revenue streams, competitive differentiation, and advancements in automotive software and connectivity technologies.",
    trend_impact:
      "New recurring revenue opportunities, improved customer experience, reduced recall costs, enhanced vehicle security, and fundamental changes to automotive product development cycles.",
    mapped_processes: "idea-to-market|lead-to-cash|plan-to-fulfill",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Automotive",
    trend_number: 5,
    trend_name: "Sustainable Manufacturing and Circular Economy",
    trend_description:
      "Implementation of environmentally sustainable manufacturing processes, use of recycled materials, development of vehicle recycling programs, and adoption of circular economy principles in automotive production.",
    trend_drivers:
      "Environmental regulations, corporate sustainability commitments, consumer environmental awareness, and potential cost savings from material reuse and waste reduction.",
    trend_impact:
      "Reduced environmental footprint, compliance with regulations, potential cost savings, enhanced brand reputation, and development of new business models around vehicle lifecycle management.",
    mapped_processes: "plan-to-fulfill|source-to-pay|governance",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Energy",
    trend_number: 1,
    trend_name: "Renewable Energy Transition and Grid Integration",
    trend_description:
      "Accelerated deployment of solar, wind, and other renewable energy sources, coupled with smart grid technologies, energy storage systems, and grid modernization to accommodate variable renewable generation.",
    trend_drivers:
      "Climate change mitigation goals, declining costs of renewable technologies, government policies and incentives, and corporate sustainability commitments.",
    trend_impact:
      "Transformation of energy generation mix, need for grid flexibility and storage, new business models, job creation in renewable sectors, and potential for energy independence.",
    mapped_processes: "plan-to-fulfill|idea-to-market|acquire-to-decommission",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Energy",
    trend_number: 2,
    trend_name: "Energy Storage and Battery Technology",
    trend_description:
      "Rapid advancement and deployment of battery storage systems, pumped hydro, and other energy storage technologies to support grid stability, renewable integration, and distributed energy systems.",
    trend_drivers:
      "Need for grid stability with variable renewable generation, declining battery costs, technological improvements, and supportive policies for energy storage deployment.",
    trend_impact:
      "Enhanced grid reliability, improved renewable energy utilization, new revenue streams from grid services, and enablement of distributed energy systems and microgrids.",
    mapped_processes: "idea-to-market|plan-to-fulfill|source-to-pay",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Energy",
    trend_number: 3,
    trend_name: "Digitalization and Smart Grid Technologies",
    trend_description:
      "Implementation of IoT sensors, advanced analytics, AI, and digital platforms to optimize energy generation, transmission, and distribution while enabling real-time monitoring and automated grid management.",
    trend_drivers:
      "Need for grid efficiency and reliability, integration of distributed energy resources, consumer demand for energy management tools, and advancements in digital technologies.",
    trend_impact:
      "Improved grid efficiency and reliability, enhanced customer experience, new data-driven services, reduced operational costs, and better integration of renewable energy sources.",
    mapped_processes: "plan-to-fulfill|idea-to-market|acquire-to-decommission",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Energy",
    trend_number: 4,
    trend_name: "Distributed Energy Resources and Microgrids",
    trend_description:
      "Growth in rooftop solar, small-scale wind, battery storage, and microgrid systems that enable local energy generation, storage, and management, reducing dependence on centralized power systems.",
    trend_drivers:
      "Desire for energy independence, resilience concerns, declining costs of distributed technologies, and supportive policies for distributed energy adoption.",
    trend_impact:
      "Increased energy resilience, reduced transmission losses, new business models for energy services, and transformation of traditional utility business models.",
    mapped_processes: "plan-to-fulfill|lead-to-cash|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Energy",
    trend_number: 5,
    trend_name: "Hydrogen Economy and Alternative Fuels",
    trend_description:
      "Development of hydrogen production, storage, and distribution infrastructure, along with other alternative fuels, to decarbonize hard-to-electrify sectors like heavy industry and long-haul transportation.",
    trend_drivers:
      "Need to decarbonize industrial processes and heavy transportation, government hydrogen strategies, technological advancements in hydrogen production, and corporate decarbonization commitments.",
    trend_impact:
      "New industrial applications and business models, potential for energy export opportunities, job creation in emerging sectors, and contribution to deep decarbonization goals.",
    mapped_processes: "idea-to-market|plan-to-fulfill|source-to-pay",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Financial Services",
    trend_number: 1,
    trend_name: "AI-Driven Transformation (including Generative AI)",
    trend_description:
      "AI, particularly Generative AI, is revolutionizing financial services by enhancing customer experience through personalized advice and 24/7 support, automating back-office operations like data processing and risk compliance, and enabling more efficient decision-making. It's also being used to modernize legacy systems and develop new applications.",
    trend_drivers:
      "Technological advancements in AI and machine learning, increasing demand for personalized customer experiences, need for operational efficiency and cost reduction, and the drive to innovate and stay competitive.",
    trend_impact:
      "Improved customer satisfaction, increased operational efficiency, reduced costs, faster and more informed decision-making, development of new products and services, and a shift towards human-machine collaboration.",
    mapped_processes: "lead-to-cash|recruit-to-retire|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Financial Services",
    trend_number: 2,
    trend_name: "Digital Banking and Fintech Integration",
    trend_description:
      "Acceleration of digital banking services, mobile-first approaches, API-driven architectures, and integration with fintech solutions to provide seamless, omnichannel customer experiences and innovative financial products.",
    trend_drivers:
      "Changing customer expectations, competitive pressure from fintech companies, need for operational efficiency, and technological advancements enabling new service delivery models.",
    trend_impact:
      "Enhanced customer experience, reduced operational costs, new revenue streams, improved agility in product development, and transformation of traditional banking business models.",
    mapped_processes: "lead-to-cash|idea-to-market|plan-to-fulfill",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Financial Services",
    trend_number: 3,
    trend_name: "Regulatory Technology (RegTech) and Compliance Automation",
    trend_description:
      "Implementation of technology solutions to automate regulatory compliance, risk management, and reporting processes, including real-time monitoring, automated reporting, and AI-powered risk assessment.",
    trend_drivers:
      "Increasing regulatory complexity, high costs of manual compliance processes, need for real-time risk monitoring, and advancements in AI and automation technologies.",
    trend_impact:
      "Reduced compliance costs, improved accuracy in regulatory reporting, enhanced risk management capabilities, and ability to adapt quickly to regulatory changes.",
    mapped_processes: "governance|finance-record-to-report|recruit-to-retire",
    primary_process: "governance",
    process_count: 3,
  },
  {
    industry: "Financial Services",
    trend_number: 4,
    trend_name: "Sustainable Finance and ESG Integration",
    trend_description:
      "Integration of Environmental, Social, and Governance (ESG) factors into investment decisions, development of green financial products, and implementation of sustainable finance frameworks and reporting.",
    trend_drivers:
      "Regulatory requirements, investor demand for sustainable investments, corporate sustainability commitments, and growing awareness of climate-related financial risks.",
    trend_impact:
      "New product offerings, enhanced risk management, improved stakeholder relationships, compliance with regulations, and contribution to sustainable development goals.",
    mapped_processes: "lead-to-cash|governance|finance-treasury-risk",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Financial Services",
    trend_number: 5,
    trend_name: "Open Banking and API Economy",
    trend_description:
      "Implementation of open banking frameworks that enable third-party developers to access bank data and services through APIs, fostering innovation, competition, and new financial service ecosystems.",
    trend_drivers:
      "Regulatory mandates like PSD2, customer demand for integrated financial services, competitive pressure to innovate, and technological capabilities enabling secure API development.",
    trend_impact:
      "New partnership opportunities, enhanced customer experience through integrated services, increased competition, new revenue streams, and transformation of traditional banking value chains.",
    mapped_processes: "lead-to-cash|idea-to-market|governance",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Healthcare",
    trend_number: 1,
    trend_name: "Digital Transformation and AI Integration",
    trend_description:
      "The healthcare industry is rapidly adopting digital technologies, including artificial intelligence (AI) and generative AI, to enhance efficiency, automate processes, improve data management, and deliver more personalized patient care. This involves the use of software platforms, advanced data analytics, machine learning, and agentic AI for administrative tasks, clinical diagnostics, and operational improvements.",
    trend_drivers:
      "Healthcare's historical lag in digital adoption compared to other industries, the need for increased efficiency and productivity, the potential for AI to automate manual processes and generate actionable insights, and the growing complexity of the healthcare environment.",
    trend_impact:
      "Significant improvements in administrative, financial, and clinical efficiencies; enhanced staff productivity; better data connectivity and interoperability; potential for reduced costs; and improved patient outcomes through predictive analytics and personalized care.",
    mapped_processes: "idea-to-market|plan-to-fulfill|finance-record-to-report",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Healthcare",
    trend_number: 2,
    trend_name: "Telemedicine and Remote Patient Monitoring",
    trend_description:
      "Expansion of telehealth services, remote patient monitoring technologies, and virtual care platforms that enable healthcare delivery outside traditional clinical settings, improving access and continuity of care.",
    trend_drivers:
      "COVID-19 pandemic acceleration, patient convenience preferences, healthcare access challenges in rural areas, technological advancements in remote monitoring devices, and supportive regulatory changes.",
    trend_impact:
      "Improved healthcare access, reduced costs, enhanced patient convenience, better chronic disease management, and transformation of healthcare delivery models.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Healthcare",
    trend_number: 3,
    trend_name: "Personalized Medicine and Genomics",
    trend_description:
      "Development and implementation of personalized treatment approaches based on individual genetic profiles, biomarkers, and patient-specific data to optimize therapeutic outcomes and reduce adverse effects.",
    trend_drivers:
      "Advances in genomic sequencing technologies, declining costs of genetic testing, growing understanding of genetic factors in disease, and potential for improved treatment outcomes.",
    trend_impact:
      "More effective treatments, reduced adverse drug reactions, improved patient outcomes, new diagnostic and therapeutic opportunities, and transformation of drug development processes.",
    mapped_processes: "idea-to-market|plan-to-fulfill|governance",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Healthcare",
    trend_number: 4,
    trend_name: "Value-Based Care and Outcome-Focused Models",
    trend_description:
      "Shift from fee-for-service to value-based payment models that reward healthcare providers for patient outcomes, quality of care, and cost-effectiveness rather than volume of services provided.",
    trend_drivers:
      "Rising healthcare costs, need for improved patient outcomes, payer pressure for cost containment, and regulatory support for value-based care models.",
    trend_impact:
      "Improved patient outcomes, reduced healthcare costs, enhanced care coordination, new performance measurement requirements, and transformation of healthcare business models.",
    mapped_processes: "lead-to-cash|finance-treasury-risk|governance",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Healthcare",
    trend_number: 5,
    trend_name: "Interoperability and Health Information Exchange",
    trend_description:
      "Implementation of standards and technologies that enable seamless sharing of health information across different healthcare systems, providers, and platforms to improve care coordination and patient outcomes.",
    trend_drivers:
      "Regulatory requirements, need for better care coordination, patient safety concerns, and technological advancements enabling secure data exchange.",
    trend_impact:
      "Improved care coordination, reduced medical errors, enhanced patient safety, better clinical decision-making, and more efficient healthcare delivery.",
    mapped_processes: "plan-to-fulfill|governance|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Manufacturing",
    trend_number: 1,
    trend_name: "Artificial Intelligence and Generative AI",
    trend_description:
      "The adoption of AI and generative AI in manufacturing is accelerating, with a focus on targeted, high-ROI investments. This includes leveraging AI for predictive maintenance, optimizing production processes, and enabling virtual operations through technologies like digital twins, machine learning, augmented reality (AR), and virtual reality (VR). The goal is to enhance efficiency, reduce downtime, and facilitate remote monitoring and control.",
    trend_drivers:
      "Technological advancements in AI and related fields, increasing need for operational efficiency and cost reduction, desire for remote capabilities and automation, and the emergence of 5G networks providing necessary bandwidth.",
    trend_impact:
      "Improved operational efficiency, reduced unplanned downtime, enhanced decision-making through data-driven insights, increased automation, and the potential for 'dark factories' (fully automated facilities).",
    mapped_processes: "plan-to-fulfill|idea-to-market|acquire-to-decommission",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Manufacturing",
    trend_number: 2,
    trend_name: "Industry 4.0 and Smart Manufacturing",
    trend_description:
      "Integration of IoT sensors, cyber-physical systems, cloud computing, and advanced analytics to create intelligent, connected manufacturing environments that enable real-time monitoring, optimization, and autonomous decision-making.",
    trend_drivers:
      "Need for increased efficiency and productivity, competitive pressure, technological advancements in IoT and connectivity, and desire for greater flexibility and responsiveness in manufacturing operations.",
    trend_impact:
      "Improved operational efficiency, enhanced product quality, reduced waste and downtime, increased flexibility in production, and new business models based on data and services.",
    mapped_processes: "plan-to-fulfill|idea-to-market|acquire-to-decommission",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Manufacturing",
    trend_number: 3,
    trend_name: "Sustainable Manufacturing and Circular Economy",
    trend_description:
      "Implementation of environmentally sustainable manufacturing processes, adoption of circular economy principles, use of renewable energy, waste reduction initiatives, and development of recyclable and biodegradable products.",
    trend_drivers:
      "Environmental regulations, corporate sustainability commitments, consumer demand for sustainable products, potential cost savings from resource efficiency, and investor pressure for ESG compliance.",
    trend_impact:
      "Reduced environmental footprint, compliance with regulations, cost savings from resource efficiency, enhanced brand reputation, and development of new sustainable product lines.",
    mapped_processes: "plan-to-fulfill|governance|source-to-pay",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Manufacturing",
    trend_number: 4,
    trend_name: "Supply Chain Resilience and Localization",
    trend_description:
      "Restructuring of global supply chains to improve resilience, reduce dependencies, and increase local sourcing and production capabilities in response to disruptions and geopolitical tensions.",
    trend_drivers:
      "Supply chain disruptions from COVID-19 and other events, geopolitical tensions, trade policy changes, and desire for greater supply chain visibility and control.",
    trend_impact:
      "Improved supply chain resilience, reduced risk from disruptions, potential for faster response times, support for local economies, but potentially higher costs and complexity.",
    mapped_processes: "source-to-pay|plan-to-fulfill|governance",
    primary_process: "source-to-pay",
    process_count: 3,
  },
  {
    industry: "Manufacturing",
    trend_number: 5,
    trend_name: "Advanced Manufacturing Technologies",
    trend_description:
      "Adoption of 3D printing/additive manufacturing, advanced robotics, nanotechnology, and other cutting-edge manufacturing technologies to enable new product designs, customization, and production methods.",
    trend_drivers:
      "Technological advancements, need for product customization, desire for reduced time-to-market, and potential for new business models and applications.",
    trend_impact:
      "New product design possibilities, mass customization capabilities, reduced inventory requirements, shorter supply chains, and potential for distributed manufacturing models.",
    mapped_processes: "idea-to-market|plan-to-fulfill|acquire-to-decommission",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Media & Entertainment",
    trend_number: 1,
    trend_name: "Streaming and Direct-to-Consumer Platforms",
    trend_description:
      "Continued growth and evolution of streaming services, with companies developing direct-to-consumer platforms, investing in original content, and exploring new distribution models to reach audiences directly.",
    trend_drivers:
      "Changing consumer viewing habits, cord-cutting trends, global reach potential, control over customer relationships, and technological advancements enabling high-quality streaming.",
    trend_impact:
      "Transformation of content distribution, new revenue models, increased competition for content and talent, global audience reach, and changes in content production and marketing strategies.",
    mapped_processes: "lead-to-cash|idea-to-market|plan-to-fulfill",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Media & Entertainment",
    trend_number: 2,
    trend_name: "AI-Generated Content and Automation",
    trend_description:
      "Use of artificial intelligence and generative AI for content creation, including automated writing, video editing, music composition, and personalized content recommendations, transforming production workflows and audience engagement.",
    trend_drivers:
      "Need for cost-effective content production, demand for personalized experiences, technological advancements in AI, and competitive pressure to innovate and differentiate.",
    trend_impact:
      "Reduced production costs, faster content creation, new creative possibilities, personalized audience experiences, but also concerns about job displacement and content authenticity.",
    mapped_processes: "idea-to-market|plan-to-fulfill|lead-to-cash",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Media & Entertainment",
    trend_number: 3,
    trend_name: "Immersive Technologies (AR/VR/XR)",
    trend_description:
      "Development and deployment of augmented reality (AR), virtual reality (VR), and extended reality (XR) technologies to create immersive entertainment experiences, virtual events, and new forms of interactive content.",
    trend_drivers:
      "Technological advancements in AR/VR hardware and software, consumer interest in immersive experiences, potential for new revenue streams, and the need for differentiated content offerings.",
    trend_impact:
      "New entertainment formats and experiences, enhanced audience engagement, new revenue opportunities, transformation of live events and experiences, and potential for virtual social interactions.",
    mapped_processes: "idea-to-market|plan-to-fulfill|lead-to-cash",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Media & Entertainment",
    trend_number: 4,
    trend_name: "Social Media and User-Generated Content",
    trend_description:
      "Integration of social media platforms with traditional media, growth of influencer marketing, user-generated content strategies, and development of social commerce capabilities.",
    trend_drivers:
      "Changing audience behavior and preferences, influence of social media on content consumption, need for authentic and relatable content, and potential for direct monetization through social platforms.",
    trend_impact:
      "New marketing and distribution channels, democratization of content creation, enhanced audience engagement, new revenue models, and transformation of celebrity and influencer culture.",
    mapped_processes: "lead-to-cash|idea-to-market|recruit-to-retire",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Media & Entertainment",
    trend_number: 5,
    trend_name: "Data-Driven Content Strategy and Personalization",
    trend_description:
      "Use of advanced analytics, machine learning, and audience data to inform content development decisions, optimize content recommendations, and create personalized viewing experiences.",
    trend_drivers:
      "Need for content that resonates with audiences, competitive pressure to retain subscribers, availability of audience data and analytics tools, and potential for improved ROI on content investments.",
    trend_impact:
      "More targeted and successful content, improved audience retention, enhanced user experience, better content investment decisions, and new insights into audience preferences and behavior.",
    mapped_processes: "idea-to-market|lead-to-cash|plan-to-fulfill",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Real Estate",
    trend_number: 1,
    trend_name: "PropTech and Digital Transformation",
    trend_description:
      "Adoption of property technology solutions including virtual tours, AI-powered property valuation, digital transaction platforms, smart building technologies, and data analytics for property management and investment decisions.",
    trend_drivers:
      "Need for operational efficiency, changing customer expectations, competitive pressure, technological advancements, and the impact of COVID-19 accelerating digital adoption.",
    trend_impact:
      "Improved operational efficiency, enhanced customer experience, new business models, better data-driven decision making, and transformation of traditional real estate processes.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Real Estate",
    trend_number: 2,
    trend_name: "Sustainable and Green Building Practices",
    trend_description:
      "Implementation of environmentally sustainable building practices, energy-efficient technologies, green building certifications, and development of net-zero or carbon-neutral properties.",
    trend_drivers:
      "Environmental regulations, corporate sustainability commitments, tenant demand for sustainable spaces, potential for cost savings through energy efficiency, and investor focus on ESG criteria.",
    trend_impact:
      "Reduced environmental impact, compliance with regulations, potential cost savings, enhanced property values, improved tenant satisfaction, and competitive differentiation.",
    mapped_processes: "plan-to-fulfill|governance|source-to-pay",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Real Estate",
    trend_number: 3,
    trend_name: "Flexible and Hybrid Workspace Solutions",
    trend_description:
      "Development of flexible office spaces, co-working facilities, hybrid work solutions, and adaptable building designs that can accommodate changing work patterns and tenant needs.",
    trend_drivers:
      "Changing work patterns accelerated by COVID-19, employee preferences for flexibility, cost optimization needs of businesses, and technological enablement of remote and hybrid work.",
    trend_impact:
      "New revenue models, enhanced tenant satisfaction, improved space utilization, competitive differentiation, and adaptation to changing market demands.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Real Estate",
    trend_number: 4,
    trend_name: "Real Estate Investment Technology and Platforms",
    trend_description:
      "Development of digital platforms for real estate investment, crowdfunding, fractional ownership, and blockchain-based property transactions that democratize real estate investment and improve transaction efficiency.",
    trend_drivers:
      "Desire to democratize real estate investment, need for improved transaction efficiency, technological advancements in blockchain and digital platforms, and investor demand for new investment opportunities.",
    trend_impact:
      "Increased accessibility to real estate investment, improved transaction efficiency, new investment products and services, enhanced transparency, and potential for reduced transaction costs.",
    mapped_processes: "lead-to-cash|finance-treasury-risk|governance",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Real Estate",
    trend_number: 5,
    trend_name: "Smart Cities and Urban Development",
    trend_description:
      "Integration of IoT technologies, data analytics, and smart infrastructure in urban development projects to create more efficient, sustainable, and livable cities with improved transportation, utilities, and services.",
    trend_drivers:
      "Urbanization trends, need for sustainable urban development, technological advancements in IoT and smart systems, and government initiatives for smart city development.",
    trend_impact:
      "Improved urban efficiency and sustainability, enhanced quality of life, new business opportunities, better resource management, and transformation of urban planning and development processes.",
    mapped_processes: "plan-to-fulfill|governance|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Retail",
    trend_number: 1,
    trend_name: "AI-Powered Personalization and Efficiency",
    trend_description:
      "Retailers are increasingly leveraging Artificial Intelligence (AI), including generative AI, to create hyper-personalized shopping experiences, streamline operations, and enhance customer engagement. This involves AI agents for personalized recommendations, virtual assistants, dynamic content creation, and optimizing back-end processes like inventory management and demand forecasting.",
    trend_drivers:
      "The drive for increased conversion rates, improved customer satisfaction and loyalty, and the need for greater operational efficiency in a competitive market. Advancements in AI technology are making these applications more feasible and impactful.",
    trend_impact:
      "Significant improvements in customer experience, leading to higher conversion rates and stronger brand loyalty. Enhanced operational efficiency through optimized inventory, supply chain management, and product design. However, it also presents challenges related to data privacy, ethical AI use, and the need for clean, accurate data.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Retail",
    trend_number: 2,
    trend_name: "Omnichannel and Unified Commerce",
    trend_description:
      "Integration of online and offline retail channels to provide seamless customer experiences across all touchpoints, including buy-online-pick-up-in-store (BOPIS), unified inventory management, and consistent brand experiences.",
    trend_drivers:
      "Changing consumer shopping behaviors, expectation for convenience and flexibility, competitive pressure, and technological capabilities enabling channel integration.",
    trend_impact:
      "Enhanced customer experience, improved customer retention, increased sales through multiple channels, better inventory utilization, and competitive advantage through superior service.",
    mapped_processes: "lead-to-cash|plan-to-fulfill|idea-to-market",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Retail",
    trend_number: 3,
    trend_name: "Sustainable and Ethical Retail Practices",
    trend_description:
      "Implementation of sustainable sourcing, eco-friendly packaging, circular economy principles, ethical labor practices, and transparency in supply chains to meet consumer demand for responsible retail.",
    trend_drivers:
      "Consumer awareness and demand for sustainable products, regulatory pressures, corporate social responsibility commitments, and potential for brand differentiation and customer loyalty.",
    trend_impact:
      "Enhanced brand reputation, customer loyalty, compliance with regulations, potential cost savings from efficiency improvements, and contribution to environmental and social goals.",
    mapped_processes: "source-to-pay|governance|plan-to-fulfill",
    primary_process: "source-to-pay",
    process_count: 3,
  },
  {
    industry: "Retail",
    trend_number: 4,
    trend_name: "Social Commerce and Influencer Marketing",
    trend_description:
      "Integration of e-commerce capabilities into social media platforms, leveraging influencer partnerships, user-generated content, and social proof to drive sales and brand engagement.",
    trend_drivers:
      "Changing consumer behavior and social media usage, effectiveness of peer recommendations, technological capabilities of social platforms, and potential for reaching new audiences.",
    trend_impact:
      "New sales channels and revenue streams, enhanced brand awareness and engagement, improved customer acquisition, and transformation of marketing and advertising strategies.",
    mapped_processes: "lead-to-cash|idea-to-market|recruit-to-retire",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
  {
    industry: "Retail",
    trend_number: 5,
    trend_name: "Autonomous Retail and Cashierless Stores",
    trend_description:
      "Implementation of autonomous retail technologies including cashierless checkout systems, automated inventory management, robotic fulfillment, and AI-powered store operations to reduce labor costs and improve efficiency.",
    trend_drivers:
      "Labor shortages and rising labor costs, need for operational efficiency, technological advancements in computer vision and AI, and competitive pressure to innovate.",
    trend_impact:
      "Reduced operational costs, improved efficiency, enhanced customer convenience, new store formats and experiences, but also challenges related to technology implementation and workforce implications.",
    mapped_processes: "plan-to-fulfill|idea-to-market|recruit-to-retire",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Technology",
    trend_number: 1,
    trend_name: "Agentic AI",
    trend_description:
      "Agentic AI refers to autonomous machine 'agents' that go beyond the query-and-response functionality of generative chatbots. These agents can perform enterprise-related tasks independently without human intervention, acting as 'virtual coworkers' that can autonomously plan and execute multistep workflows.",
    trend_drivers:
      "The rapid advancement of AI foundation models and the increasing demand for automation in complex business processes. The need for more flexible and general AI solutions that can operate with minimal human oversight.",
    trend_impact:
      "Significant impact on business operations by automating complex workflows, reducing human intervention, and increasing efficiency. This can lead to cost savings, improved productivity, and new possibilities for service delivery.",
    mapped_processes: "plan-to-fulfill|idea-to-market|governance",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Technology",
    trend_number: 2,
    trend_name: "Edge Computing and Distributed Systems",
    trend_description:
      "Deployment of computing resources closer to data sources and end-users to reduce latency, improve performance, and enable real-time processing for applications like IoT, autonomous vehicles, and augmented reality.",
    trend_drivers:
      "Need for low-latency applications, growth in IoT devices, bandwidth limitations, data privacy concerns, and technological advancements in edge computing hardware and software.",
    trend_impact:
      "Improved application performance, reduced bandwidth costs, enhanced data privacy and security, new application possibilities, and transformation of cloud computing architectures.",
    mapped_processes: "plan-to-fulfill|idea-to-market|acquire-to-decommission",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Technology",
    trend_number: 3,
    trend_name: "Quantum Computing Development",
    trend_description:
      "Advancement in quantum computing technologies, algorithms, and applications with potential to solve complex problems in cryptography, optimization, drug discovery, and financial modeling that are intractable for classical computers.",
    trend_drivers:
      "Technological breakthroughs in quantum hardware and software, significant investment from governments and corporations, potential for competitive advantage, and the need to solve complex computational problems.",
    trend_impact:
      "Revolutionary potential for certain computational problems, new business opportunities, transformation of cryptography and security, advancement in scientific research, and long-term disruption of current computing paradigms.",
    mapped_processes: "idea-to-market|governance|recruit-to-retire",
    primary_process: "idea-to-market",
    process_count: 3,
  },
  {
    industry: "Technology",
    trend_number: 4,
    trend_name: "Cybersecurity and Zero Trust Architecture",
    trend_description:
      "Implementation of comprehensive cybersecurity strategies including zero trust security models, advanced threat detection, AI-powered security systems, and privacy-by-design approaches to protect against evolving cyber threats.",
    trend_drivers:
      "Increasing cyber threats and attacks, regulatory requirements, remote work trends, cloud adoption, and the need to protect sensitive data and systems.",
    trend_impact:
      "Enhanced security posture, reduced risk of data breaches, compliance with regulations, improved customer trust, and new business opportunities in cybersecurity services and products.",
    mapped_processes: "governance|plan-to-fulfill|recruit-to-retire",
    primary_process: "governance",
    process_count: 3,
  },
  {
    industry: "Technology",
    trend_number: 5,
    trend_name: "Sustainable Technology and Green Computing",
    trend_description:
      "Development and implementation of environmentally sustainable technology practices including energy-efficient data centers, renewable energy adoption, sustainable hardware design, and carbon-neutral computing initiatives.",
    trend_drivers:
      "Environmental regulations, corporate sustainability commitments, cost savings from energy efficiency, investor pressure for ESG compliance, and consumer demand for sustainable technology.",
    trend_impact:
      "Reduced environmental footprint, compliance with regulations, cost savings from energy efficiency, enhanced brand reputation, and development of new sustainable technology products and services.",
    mapped_processes: "plan-to-fulfill|governance|source-to-pay",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Telecommunications",
    trend_number: 1,
    trend_name: "5G Network Deployment and Applications",
    trend_description:
      "Continued rollout of 5G networks and development of applications that leverage 5G capabilities including enhanced mobile broadband, ultra-reliable low-latency communications, and massive machine-type communications for IoT applications.",
    trend_drivers:
      "Need for higher bandwidth and lower latency, growth in connected devices and IoT applications, competitive pressure among telecom providers, and technological advancements enabling new use cases.",
    trend_impact:
      "New service offerings and revenue streams, enhanced customer experience, enablement of new technologies like autonomous vehicles and AR/VR, and transformation of various industries through improved connectivity.",
    mapped_processes: "plan-to-fulfill|idea-to-market|lead-to-cash",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Telecommunications",
    trend_number: 2,
    trend_name: "Network Virtualization and Software-Defined Networks",
    trend_description:
      "Implementation of network functions virtualization (NFV), software-defined networking (SDN), and cloud-native network architectures to improve flexibility, reduce costs, and enable rapid service deployment.",
    trend_drivers:
      "Need for network flexibility and agility, cost reduction pressures, technological advancements in virtualization, and the requirement to support diverse service requirements.",
    trend_impact:
      "Reduced infrastructure costs, improved network flexibility and scalability, faster service deployment, enhanced network management capabilities, and new business models for network services.",
    mapped_processes: "plan-to-fulfill|acquire-to-decommission|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Telecommunications",
    trend_number: 3,
    trend_name: "Edge Computing and Distributed Cloud Services",
    trend_description:
      "Deployment of computing resources at the network edge to support low-latency applications, reduce bandwidth usage, and enable new services like autonomous vehicles, smart cities, and industrial IoT.",
    trend_drivers:
      "Need for low-latency applications, growth in IoT and connected devices, bandwidth optimization requirements, and opportunities for new revenue streams from edge services.",
    trend_impact:
      "New service offerings and revenue opportunities, improved application performance, reduced network congestion, enhanced customer experience, and enablement of new use cases and applications.",
    mapped_processes: "plan-to-fulfill|idea-to-market|lead-to-cash",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Telecommunications",
    trend_number: 4,
    trend_name: "AI and Automation in Network Operations",
    trend_description:
      "Implementation of artificial intelligence and machine learning for network optimization, predictive maintenance, automated troubleshooting, and intelligent resource allocation to improve network performance and reduce operational costs.",
    trend_drivers:
      "Need for operational efficiency, complexity of modern networks, availability of network data for AI applications, and competitive pressure to reduce costs while improving service quality.",
    trend_impact:
      "Improved network performance and reliability, reduced operational costs, faster problem resolution, enhanced customer experience, and new capabilities for network optimization and management.",
    mapped_processes: "plan-to-fulfill|recruit-to-retire|idea-to-market",
    primary_process: "plan-to-fulfill",
    process_count: 3,
  },
  {
    industry: "Telecommunications",
    trend_number: 5,
    trend_name: "Digital Services and Platform Transformation",
    trend_description:
      "Transformation from traditional telecom services to digital platform providers offering cloud services, IoT platforms, digital entertainment, and enterprise solutions beyond basic connectivity.",
    trend_drivers:
      "Commoditization of traditional telecom services, need for new revenue streams, customer demand for integrated digital services, and competitive pressure from digital platform companies.",
    trend_impact:
      "New revenue streams and business models, enhanced customer relationships, competitive differentiation, transformation from utility provider to digital platform, and opportunities for ecosystem partnerships.",
    mapped_processes: "lead-to-cash|idea-to-market|plan-to-fulfill",
    primary_process: "lead-to-cash",
    process_count: 3,
  },
]

const allIndustries = [
  "All Industries",
  "Agriculture",
  "Automotive",
  "Energy",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Retail",
  "Technology",
  "Telecommunications",
]

const allProcesses = [
  "All Processes",
  "idea-to-market",
  "plan-to-fulfill",
  "recruit-to-retire",
  "lead-to-cash",
  "finance-treasury-risk",
  "finance-record-to-report",
  "acquire-to-decommission",
  "source-to-pay",
  "governance",
]

const processColors = {
  "idea-to-market": { bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", text: "white" },
  "plan-to-fulfill": { bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)", text: "white" },
  "recruit-to-retire": { bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", text: "white" },
  "lead-to-cash": { bg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", text: "white" },
  "finance-treasury-risk": { bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", text: "white" },
  "finance-record-to-report": { bg: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", text: "white" },
  "acquire-to-decommission": { bg: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)", text: "white" },
  "source-to-pay": { bg: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", text: "white" },
  governance: { bg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", text: "white" },
}

export default function TwoSpeedPage() {
  const [activeTab, setActiveTab] = useState("trends")
  const [initiativeView, setInitiativeView] = useState<"fast-lane" | "core">("fast-lane")

  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedProcess, setSelectedProcess] = useState("All Processes")

  const filteredTrends = industryTrendsData.filter((trend) => {
    const industryMatch = selectedIndustry === "All Industries" || trend.industry === selectedIndustry
    const processMatch = selectedProcess === "All Processes" || trend.mapped_processes.includes(selectedProcess)
    return industryMatch && processMatch
  })

  const summaryStats = {
    totalTrends: 55,
    industries: 11,
    processes: 9,
    topProcess: "idea-to-market",
    topProcessCount: 35,
  }

  const renderTrendsTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div
          className="p-6 rounded-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderColor: "var(--border)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }}>
              <ChartPieIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Industry Coverage
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Comprehensive Analysis
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>
            {summaryStats.industries}
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Industries analyzed with {summaryStats.totalTrends} total trends
          </p>
        </div>

        <div
          className="p-6 rounded-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderColor: "var(--border)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
              <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Process Impact
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Most Affected Process
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2" style={{ color: "var(--green-600)" }}>
            {summaryStats.topProcessCount}
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Trends impact {summaryStats.topProcess.replace("-", " to ")}
          </p>
        </div>

        <div
          className="p-6 rounded-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderColor: "var(--border)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>
              <BuildingOfficeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Business Processes
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Cross-functional Impact
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2" style={{ color: "var(--purple-600)" }}>
            {summaryStats.processes}
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Core business processes affected
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Industry Trends Analysis
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Filter by industry and process to explore relevant trends
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <FunnelIcon
              className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border text-sm font-medium min-w-[180px]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {allIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FunnelIcon
              className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border text-sm font-medium min-w-[180px]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {allProcesses.map((process) => (
                <option key={process} value={process}>
                  {process === "All Processes"
                    ? process
                    : process.replace("-", " to ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map((trend, index) => {
          const processes = trend.mapped_processes.split("|")
          const primaryProcessColor = processColors[trend.primary_process] || processColors["idea-to-market"]

          return (
            <div
              key={`${trend.industry}-${trend.trend_number}`}
              className="p-6 rounded-2xl border backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderColor: "var(--border)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Header with industry badge */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                  style={{ background: primaryProcessColor.bg }}
                >
                  {trend.industry}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  #{trend.trend_number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-3 line-clamp-2" style={{ color: "var(--text)" }}>
                {trend.trend_name}
              </h3>

              {/* Description */}
              <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                {trend.trend_description}
              </p>

              {/* Process tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {processes.slice(0, 2).map((process, idx) => {
                  const processColor = processColors[process] || processColors["idea-to-market"]
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ background: processColor.bg }}
                    >
                      {process.replace("-", " to ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  )
                })}
                {processes.length > 2 && (
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-600)" }}
                  >
                    +{processes.length - 2}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 rounded-lg font-medium text-white text-sm hover:scale-105 transition-all duration-200"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Show message if no trends found */}
      {filteredTrends.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
            No trends found
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  )

  const renderPainPointsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
        Pain Point Canvas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueChainColumns.map((column) => (
          <div key={column} className="space-y-4">
            <h3
              className="font-semibold text-center py-2 rounded-lg"
              style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
            >
              {column}
            </h3>
            <div className="space-y-3 min-h-[400px]">
              {mockPainPoints
                .filter((pain) => pain.column === column)
                .map((pain) => (
                  <div
                    key={pain.id}
                    className="p-4 rounded-lg border cursor-move hover:shadow-md transition-shadow"
                    style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                  >
                    <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                      {pain.title}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                      {pain.description}
                    </p>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: "var(--text-muted)" }}>Impact: {pain.impact}/5</span>
                      <span style={{ color: "var(--text-muted)" }}>Urgency: {pain.urgency}/5</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
                      >
                        {pain.process}
                      </span>
                    </div>
                  </div>
                ))}
              <button
                className="w-full p-3 border-2 border-dashed rounded-lg text-sm font-medium hover:bg-opacity-50 transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                + Add Pain Point
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderInitiativesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Strategic Initiatives
        </h2>
        <button
          className="px-4 py-2 rounded-lg border text-sm font-medium hover:shadow-sm transition-shadow"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          Propose Roadmap Themes
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setInitiativeView("fast-lane")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            initiativeView === "fast-lane" ? "text-white" : ""
          }`}
          style={{
            backgroundColor: initiativeView === "fast-lane" ? "var(--blue-600)" : "var(--surface)",
            color: initiativeView === "fast-lane" ? "white" : "var(--text)",
            border: `1px solid ${initiativeView === "fast-lane" ? "var(--blue-600)" : "var(--border)"}`,
          }}
        >
          Fast Lane (experiments)
        </button>
        <button
          onClick={() => setInitiativeView("core")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            initiativeView === "core" ? "text-white" : ""
          }`}
          style={{
            backgroundColor: initiativeView === "core" ? "var(--blue-600)" : "var(--surface)",
            color: initiativeView === "core" ? "white" : "var(--text)",
            border: `1px solid ${initiativeView === "core" ? "var(--blue-600)" : "var(--border)"}`,
          }}
        >
          Core (clean, scalable)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInitiatives
          .filter((initiative) => initiative.horizon.toLowerCase().replace(" ", "-") === initiativeView)
          .map((initiative) => (
            <div
              key={initiative.id}
              className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text)" }}>
                {initiative.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                {initiative.hypothesis}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-muted)" }}>Value Driver:</span>
                  <span className="font-medium" style={{ color: "var(--text)" }}>
                    {initiative.valueDriver}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-muted)" }}>Linked KPIs:</span>
                  <span className="font-medium" style={{ color: "var(--text)" }}>
                    {initiative.kpiIds.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-muted)" }}>Pain Points:</span>
                  <span className="font-medium" style={{ color: "var(--text)" }}>
                    {initiative.painPointIds.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )



  const renderTabContent = () => {
    switch (activeTab) {
      case "trends":
        return renderTrendsTab()
      case "pain-points":
        return renderPainPointsTab()
      case "initiatives":
        return renderInitiativesTab()

      default:
        return renderTrendsTab()
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header with gradient band */}
      <div
        className="px-6 py-8"
        style={{
          background: `linear-gradient(135deg, var(--blue-50) 0%, var(--surface) 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              background: "var(--grad-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "var(--blue-800)", // fallback
            }}
          >
            Two-Speed Transformation
          </h1>
          <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
            Trends, Pain Points, Strategic Initiatives
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 mb-8 border-b" style={{ borderColor: "var(--border)" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id ? "border-blue-500" : "border-transparent"
                  }`}
                  style={{
                    color: activeTab === tab.id ? "var(--blue-600)" : "var(--text-muted)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="pb-12">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}
