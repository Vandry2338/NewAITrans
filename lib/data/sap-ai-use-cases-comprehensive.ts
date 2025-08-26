// Comprehensive SAP AI Use Cases Data - Based on official SAP documentation
// Source: https://www.sap.com/products/artificial-intelligence/use-cases.html
// Updated: 2025-07-08

export interface SapAiUseCase {
  id: string;
  title: string;
  summary: string;
  category: string;
  vendor: "SAP" | "Topaz" | "Infosys Consulting";
  publishedDate: string;
  lastUpdated: string;
  overview: string;
  businessValue: {
    metrics: {
      name: string;
      value: string;
      description: string;
    }[];
    benefits: string[];
  };
  technicalSpecs: {
    platform: string;
    technology: string;
    minVersion?: string;
    module: string;
  };
  implementation: string;
  visualAssets: {
    hasVideo: boolean;
    videoUrl?: string;
    hasDemo?: boolean;
    screenshots?: string[];
  };
  tags: string[];
}

export const sapAiUseCases: SapAiUseCase[] = [
  // FINANCE AI USE CASES
  {
    id: "sap-ai-finance-001",
    title: "Predict the risk of late payment for invoices",
    summary: "Analyze historical customer behavior and predict payment risk using machine learning for informed financial decisions.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "SAP S/4HANA behavioral insights for contract accounting uses machine learning (ML) to analyze historical customer behavior and generate payment risk predictions and explanations. This helps financial users make informed decisions and take timely action. Minimum required version of SAP S/4HANA Cloud Private Edition is SAP S/4HANA 2021 FPS0 (public sector only) and SAP S/4HANA 2023 FPS02 (additional industries).",
    businessValue: {
      metrics: [
        { name: "DSO Reduction", value: "3.5%", description: "Reduction in days sales outstanding" },
        { name: "Write-off Reduction", value: "5%", description: "Reduction in uncollectible receivables" },
        { name: "Cost Savings", value: "1%", description: "Reduction in billing, credit, and collections costs" }
      ],
      benefits: [
        "Help financial users quickly identify high-risk accounts using predictive insights",
        "Optimize collection strategies based on customer-specific behavioral patterns",
        "Reduce outstanding debt by supporting proactive, data-driven decision-making"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA",
      technology: "Machine Learning (ML)",
      minVersion: "SAP S/4HANA 2021 FPS0 (public sector) / SAP S/4HANA 2023 FPS02 (additional industries)",
      module: "Behavioral insights for contract accounting"
    },
    implementation: "The solution learns from past cleared transactions to provide payment risk predictions with explanations. Users can access predictive insights through the explainability tool view, pulse tool view, and overview tool view within the SAP S/4HANA interface.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1qEOwExQV6ftp1jSnyENQLIlNAGVooCRq/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_late_payment_prediction_dashboard.webp"]
    },
    tags: ["Finance", "Predictive Analytics", "Machine Learning", "Risk Management", "Accounts Receivable"]
  },
  {
    id: "sap-ai-finance-002",
    title: "Reduce accounts receivable matching effort by 71%",
    summary: "Use machine learning to match and clear bank statement items automatically, streamlining receivables processing.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "SAP Cash Application uses machine learning (ML) to streamline receivables matching. The solution learns from past cleared transactions to propose matches for open items and accounts, helping automate the order-to-cash process. Minimum required version of SAP S/4HANA Cloud Private Edition is SAP S/4HANA 2020 FPS0.",
    businessValue: {
      metrics: [
        { name: "Matching Effort Reduction", value: "71%", description: "Reduction in AR matching effort" },
        { name: "DSO Improvement", value: "0.5%", description: "Reduction in days sales outstanding" },
        { name: "Cross-industry Use", value: "100%", description: "Applicable across all industries" }
      ],
      benefits: [
        "Accelerate incoming payment processing to reduce days sales outstanding and improve customer service",
        "Adapt to regional and customer-specific variations with country-specific ML training models",
        "Increase accuracy and reduce manual workload with proposals for matching items, accounts, and posting entries",
        "Maintain workflow consistency across SAP S/4HANA deployments—on-premises and cloud"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA",
      technology: "Machine Learning (ML)",
      minVersion: "SAP S/4HANA 2020 FPS0",
      module: "SAP Cash Application"
    },
    implementation: "The system learns from past cleared transactions to automatically propose matches for open items and accounts. It includes country-specific ML training models for regional variations and maintains consistency across both on-premises and cloud deployments.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/187r5NbXQMTAXf5ufbq1NYcJCgglMPcET/view?usp=drive_link",
      screenshots: ["sap_accounts_receivable_video_thumbnail.webp"]
    },
    tags: ["Finance", "Machine Learning", "Automation", "Order-to-Cash", "Receivables"]
  },
  {
    id: "sap-ai-finance-007",
    title: "Reduce effort to investigate and remediate errors by 90%",
    summary: "Accelerate error remediation with AI-supported root cause analysis and expert communication during financial close.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "Financial close often stalls due to unexpected errors. AI-assisted error resolution in SAP Cloud ERP provides step-by-step guidance to identify root causes and recommend actions. Users can also send automated updates to experts, reducing delays and enabling finance teams to resolve issues quickly and keep closing cycles on track.",
    businessValue: {
      metrics: [
        { name: "Remediation Effort Reduction", value: "90%", description: "Cut investigation and resolution effort by up to 90% in closing tasks" },
        { name: "Faster Close", value: "100%", description: "Address issues proactively to help ensure on-time financial close" },
        { name: "Support Cost Reduction", value: "Significant", description: "Empower business users to resolve errors, reducing help desk demand" }
      ],
      benefits: [
        "Accelerate financial close by identifying and resolving errors in automated tasks more efficiently",
        "Adapt to specific business scenarios with intelligent analysis of root causes",
        "Increase accuracy and reduce manual workload with guided remediation steps",
        "Maintain process consistency across SAP Cloud ERP deployments"
      ]
    },
    technicalSpecs: {
      platform: "SAP Cloud ERP",
      technology: "AI-assisted error resolution",
      module: "Financial close management"
    },
    implementation: "The AI provides step-by-step guidance for error identification and resolution, with automated expert communication capabilities. The system adapts to specific business scenarios and maintains process consistency across deployments.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "LOCAL_VIDEO:reduce_effort_to_investigate",
      screenshots: ["sap_error_remediation_video_thumbnail.webp"]
    },
    tags: ["Finance", "AI", "Error Resolution", "Financial Close", "Automation"]
  },
  {
    id: "sap-ai-analytics-001",
    title: "Lower the barrier to analytics using natural language",
    summary: "Ask questions and get answers—analytics made intuitive with natural language queries in SAP Analytics Cloud.",
    category: "Analytics",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "Data access shouldn't require technical expertise. The natural language query feature in SAP Analytics Cloud lets users interact with data using simple, conversational input. This AI-supported capability returns clear, trusted results instantly—no technical skills needed—helping users explore insights and make faster decisions.",
    businessValue: {
      metrics: [
        { name: "Productivity Boost", value: "5%", description: "Boost knowledge worker efficiency by up to 5% using intuitive data access" },
        { name: "Decision Speed", value: "Faster", description: "Enable quicker insights by eliminating the need for complex query logic" },
        { name: "Analytics Adoption", value: "Wider", description: "Make business intelligence accessible across all skill levels" }
      ],
      benefits: [
        "Search for data using natural language—no need for technical query skills",
        "View results in simple, readable cards that surface relevant insights quickly",
        "Access answers instantly with 'Just Ask'—no need to know the data source",
        "Enable broader adoption of analytics with intuitive, conversational access"
      ]
    },
    technicalSpecs: {
      platform: "SAP Analytics Cloud",
      technology: "Natural language query with AI support",
      module: "Analytics and business intelligence"
    },
    implementation: "Users can interact with data using conversational input through the 'Just Ask' feature. The system processes natural language queries and returns clear, trusted results in simple, readable cards without requiring technical expertise.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1nAFF4On9zZCHXAfoXvNgEKcwEMP4Hykd/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_natural_language_analytics_interface.webp"]
    },
    tags: ["Analytics", "Natural Language", "AI", "Business Intelligence", "Data Access"]
  },
  {
    id: "sap-ai-finance-008",
    title: "Reduce time spent summarizing financial data by up to 50%",
    summary: "Gain fast, actionable insights from cost center data using AI-driven analysis and generative AI assistance.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "Timely financial decisions rely on fast, actionable insights. The generative AI side panel in the Cost Center Review Booklet app helps analysts explore reports with quick actions that summarize data, surface KPIs, and recommend next steps—turning raw cost center data into guided insights for faster, more confident decision-making.",
    businessValue: {
      metrics: [
        { name: "Analysis Time Reduction", value: "50%", description: "Reduce the time to analyze cost center summaries by 50%" },
        { name: "Report Documentation", value: "65%", description: "Cut time to document and summarize reports by up to 65%" },
        { name: "Operational Efficiency", value: "Faster", description: "Gain faster visibility into financial metrics and suggested actions" }
      ],
      benefits: [
        "Empower analysts with complete visibility, including AI-generated summaries and root cause analysis",
        "Improve efficiency by prioritizing tasks, automating repetitive work, and suggesting next steps",
        "Lower finance costs with instant access to KPIs, shareable reports, and actionable recommendations",
        "Accelerate decision making by turning complex data into clear, concise insights"
      ]
    },
    technicalSpecs: {
      platform: "SAP Cost Center Review Booklet app",
      technology: "Generative AI side panel",
      module: "Cost center analysis and reporting"
    },
    implementation: "The generative AI side panel provides quick actions to summarize data, surface KPIs, and recommend next steps. It includes AI-generated summaries, root cause analysis, and automated repetitive work capabilities.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "LOCAL_VIDEO:reduce_time_summarizing",
      screenshots: ["sap_financial_data_summarization_video.webp"]
    },
    tags: ["Finance", "Generative AI", "Cost Center", "Analysis", "Reporting"]
  },

  // HR AI USE CASES
  {
    id: "sap-ai-hr-001",
    title: "Reduce time spent assessing candidate applications by 80%",
    summary: "Use AI to match applicant skills to job requirements with greater speed and accuracy in recruitment screening.",
    category: "HR",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "AI-powered applicant screening in SAP SuccessFactors Recruiting provides visibility into how an applicant's skills align with those required for the role. The system identifies direct skill matches, related skills, and skills the applicant may easily acquire. It extracts skills from resumes and enriches job requisitions to improve alignment—helping recruiters and hiring managers make better decisions, faster.",
    businessValue: {
      metrics: [
        { name: "Processing Speed", value: "70%", description: "Reduction in recruiter time spent reviewing and matching applications" },
        { name: "Time to Fill", value: "25%", description: "Reduction in time to fill roles previously delayed by imprecise screening" },
        { name: "Bad Hire Rate", value: "3%", description: "Decrease in hires with poor skills fit thanks to better skill visibility" }
      ],
      benefits: [
        "Cut down recruiter time spent manually matching skills",
        "Use AI to highlight direct, related, and potential skills from applicant data",
        "Improve screening accuracy and reduce the chance of overlooking qualified talent",
        "Provide hiring managers with clearer skill insights during evaluations"
      ]
    },
    technicalSpecs: {
      platform: "SAP SuccessFactors Recruiting",
      technology: "AI-powered applicant screening",
      module: "Recruiting and talent acquisition"
    },
    implementation: "The system uses AI to extract skills from resumes and enrich job requisitions. It identifies direct skill matches, related skills, and potential skills the applicant may easily acquire, providing comprehensive skill visibility for better hiring decisions.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1qELlHPgikcvvCdlaxRwziflPdBqvNOJi/view?usp=drive_link",
      screenshots: ["sap_candidate_assessment_video.webp"]
    },
    tags: ["HR", "Recruiting", "AI", "Skill Matching", "Talent Acquisition"]
  },
  {
    id: "sap-ai-hr-002",
    title: "Expedite external job descriptions by 85%",
    summary: "Write better job descriptions faster with AI-assisted content generation for external workforce management.",
    category: "HR",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "Writing job descriptions manually takes time and impacts hiring quality. With generative AI in SAP Fieldglass, users can enter a job title, description, and required skills to generate complete, polished postings. This helps attract better-matched candidates, reduces manual effort, and improves the relevance of resume assessments.",
    businessValue: {
      metrics: [
        { name: "Job Creation Speed", value: "85%", description: "Cut job description writing time by more than 85%" },
        { name: "Hire Quality", value: "50%", description: "Reduce the rate of mismatched hires by up to 50%" },
        { name: "Candidate Targeting", value: "Better", description: "Attract qualified applicants with detailed, AI-enhanced listings" }
      ],
      benefits: [
        "Save time by automatically generating well-structured job descriptions",
        "Improve candidate fit by clarifying expectations and role details",
        "Reduce recruiter workload and improve resume filtering accuracy",
        "Support unbiased, data-driven hiring decisions with more complete inputs"
      ]
    },
    technicalSpecs: {
      platform: "SAP Fieldglass",
      technology: "Generative AI content generation",
      module: "External workforce management"
    },
    implementation: "Users enter a job title, description, and required skills, and the generative AI creates complete, polished job postings. The system helps attract better-matched candidates and improves resume assessment relevance.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1aC51NRSDXBNnrmLkGZUX3z6TmlGgW6wk/view?usp=drive_link",
      screenshots: ["sap_job_descriptions_video.webp"]
    },
    tags: ["HR", "Job Descriptions", "Generative AI", "External Workforce", "Content Generation"]
  },
  {
    id: "sap-ai-hr-003",
    title: "Write personalized employee feedback",
    summary: "Help employees write faster and more effectively with AI-assisted writing tools integrated into SAP SuccessFactors.",
    category: "HR",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "AI-assisted writing helps employees improve the quality and clarity of text entered in SAP SuccessFactors applications. This interactive tool uses generative AI to support writing tasks across modules to save employees time on drafting, improve tone and clarity, and drive more consistent, professional communication.",
    businessValue: {
      metrics: [
        { name: "Manager Writing Time", value: "40%", description: "Decrease in time spent by people managers writing in SAP SuccessFactors" },
        { name: "Employee Communication", value: "50%", description: "Reduction in time employees spend drafting and editing text" },
        { name: "Productivity Boost", value: "0.25%", description: "Productivity boost and increased employee satisfaction through easier communication" }
      ],
      benefits: [
        "Save time by using AI to support writing across SAP SuccessFactors",
        "Help employees express ideas more clearly and professionally",
        "Reduce the effort spent drafting and editing written content",
        "Improve consistency and tone across internal communications"
      ]
    },
    technicalSpecs: {
      platform: "SAP SuccessFactors",
      technology: "Generative AI writing assistance",
      module: "Cross-module writing support"
    },
    implementation: "The interactive AI tool supports writing tasks across all SAP SuccessFactors modules, helping improve quality, clarity, tone, and consistency of employee communications while reducing drafting and editing time.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1pvH7AlCHFFLim6j6bjvrH_HlFkFeO_sS/view?usp=drive_link",
      screenshots: ["sap_employee_feedback_video.webp"]
    },
    tags: ["HR", "Writing Assistance", "Generative AI", "Communication", "Employee Engagement"]
  },
  {
    id: "sap-ai-hr-004",
    title: "Create performance goals",
    summary: "Build meaningful and inspiring performance goals with AI-generated drafts based on employee input and organizational context.",
    category: "HR",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "Use AI in SAP SuccessFactors to quickly generate personal or team goals based on employee input. AI applies your goal plan's configurations and analyzes field descriptions to generate relevant, contextual suggestions. Users can compare their draft with AI-generated content, edit it, and finalize the goal.",
    businessValue: {
      metrics: [
        { name: "Goal Creation Speed", value: "60-80%", description: "Faster creation of personal performance and development goals" },
        { name: "Employee Productivity", value: "0.25%", description: "Boost driven by clearer, aligned, and actionable goals" },
        { name: "Manual Effort", value: "Significant", description: "AI helps employees focus on outcomes, not formatting" }
      ],
      benefits: [
        "Speed up goal creation with AI-generated drafts based on employee input",
        "Reduce time spent crafting measurable, aligned goals across the organization",
        "Deliver personalized goal suggestions tailored to each individual"
      ]
    },
    technicalSpecs: {
      platform: "SAP SuccessFactors Performance and Goals",
      technology: "AI-generated goal creation",
      module: "Performance management"
    },
    implementation: "The AI analyzes employee input and goal plan configurations to generate relevant, contextual goal suggestions. Users can compare drafts, edit content, and finalize goals for both personal and team performance management.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/12k2sJJJHat-0vKaJhhcMrs14yktV4c0e/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_performance_goals_interface.webp"]
    },
    tags: ["HR", "Performance Management", "Goal Setting", "AI", "Employee Development"]
  },
  {
    id: "sap-ai-hr-005",
    title: "Generate interview questions",
    summary: "Use generative AI to create tailored interview questions and simplify evaluations with Microsoft Teams integration.",
    category: "HR",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "SAP SuccessFactors Recruiting uses generative AI to create interview questions based on the job description. Interviewers are notified via Microsoft Teams 24 hours before an interview, can generate custom or general questions, and provide feedback directly in Teams. Evaluations remain accessible post-interview for streamlined review.",
    businessValue: {
      metrics: [
        { name: "Interview Prep Cost", value: "87%", description: "Cut in interview preparation costs with AI-generated questions" },
        { name: "Centralized Process", value: "100%", description: "All evaluations and feedback are collected and accessible in one place" }
      ],
      benefits: [
        "Automatically generate interview questions based on job requirements",
        "Provide general interview questions to guide structured conversations",
        "Streamline evaluation and feedback using Microsoft Teams integration"
      ]
    },
    technicalSpecs: {
      platform: "SAP SuccessFactors Recruiting",
      technology: "Generative AI question generation",
      module: "Recruiting and interviewing"
    },
    implementation: "The system generates interview questions based on job descriptions and integrates with Microsoft Teams for notifications, feedback collection, and evaluation management. Questions can be customized or use general templates.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1jX05YQU4udp_2-EsrH0-gU_90ssKfIDY/view?usp=drive_link",
      screenshots: ["sap_interview_questions_video.webp"]
    },
    tags: ["HR", "Recruiting", "Interview", "Generative AI", "Microsoft Teams"]
  },

  // MARKETING & E-COMMERCE AI USE CASES
  {
    id: "sap-ai-marketing-001",
    title: "Accelerate audience segmentations",
    summary: "Build customer segments powered by AI to predict behavior and personalize engagement with continuous learning.",
    category: "Marketing",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "AI scores in SAP Emarsys Customer Engagement help you target customers based on predicted behaviors like conversion, churn, or spending. These AI-generated segments update continuously, learning from customer data to identify behavioral patterns. You can engage first-time buyers likely to return, reach out to at-risk contacts, and personalize offers by lifecycle stage or engagement level.",
    businessValue: {
      metrics: [
        { name: "Segmentation Strategy", value: "Smarter", description: "Use AI to automatically group customers by predicted behavior and value" },
        { name: "Engagement Rates", value: "Higher", description: "Deliver personalized outreach based on lifecycle stage and likelihood to convert" },
        { name: "Retention Efforts", value: "Proactive", description: "Identify churn risk early and intervene with targeted messaging" }
      ],
      benefits: [
        "Predict future customer behavior based on past actions",
        "Encourage engagement or prevent churn using predictive insights",
        "Improve customer targeting and relevance"
      ]
    },
    technicalSpecs: {
      platform: "SAP Emarsys Customer Engagement",
      technology: "AI-powered behavioral prediction",
      module: "Customer segmentation and engagement"
    },
    implementation: "The AI continuously learns from customer data to identify behavioral patterns and predict conversion, churn, or spending behaviors. Segments update automatically to enable personalized engagement across different lifecycle stages.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1xJauQsSEt51QNm5SfpK83NMiS_kEnni8/view?usp=drive_link",
      screenshots: ["sap_audience_segmentation_video.webp"]
    },
    tags: ["Marketing", "Customer Segmentation", "AI", "Behavioral Prediction", "Personalization"]
  },
  {
    id: "sap-ai-marketing-002",
    title: "Make shopping experiences more relevant",
    summary: "Show visitors the right products at the right time with AI-powered recommendations to drive conversions and discovery.",
    category: "Marketing",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "Product recommendations help you display the most relevant items at each stage of the shopping journey. Using real-time data and business logic, the system automatically promotes trending, related, and complementary products—boosting conversions, product discovery, and user engagement across your storefront.",
    businessValue: {
      metrics: [
        { name: "Product Discovery", value: "Improved", description: "Help users find relevant products faster with intelligent suggestions" },
        { name: "Conversion Performance", value: "Higher", description: "Show the right products at the right moment to increase sales" },
        { name: "Manual Merchandising", value: "Less", description: "Automated updates reduce the need for hands-on campaign management" }
      ],
      benefits: [
        "Deliver relevant product suggestions using real-time shopper behavior and business logic",
        "Keep your site fresh with automated product displays based on performance data",
        "Tailor recommendations using visitor preferences, filters, and categories",
        "Launch promotions automatically on a schedule—no manual updates needed"
      ]
    },
    technicalSpecs: {
      platform: "SAP Commerce Cloud",
      technology: "AI-powered product recommendation engine",
      module: "E-commerce personalization"
    },
    implementation: "The system uses real-time data and business logic to automatically promote trending, related, and complementary products. Recommendations are tailored using visitor preferences and can be scheduled for automatic promotion launches.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/15DBOl9P44OiswcYRi7iGar4K04r6bT_Q/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_shopping_experiences_interface.webp"]
    },
    tags: ["Marketing", "E-commerce", "Product Recommendations", "AI", "Personalization"]
  },
  {
    id: "sap-ai-marketing-003",
    title: "Improve catalog health and product discovery",
    summary: "Create personalized product descriptions that enrich your catalog data with AI-generated content and translations.",
    category: "Marketing",
    vendor: "SAP",
    publishedDate: "2025-05-13",
    lastUpdated: "2025-05-22",
    overview: "SAP CX AI Toolkit product descriptions lets you generate detailed content based on your product data in SAP Commerce Cloud. Use product attributes, existing copy, and custom instructions to create singular or bulk descriptions, then publish them directly to your storefront. Available only for SAP Commerce Cloud users.",
    businessValue: {
      metrics: [
        { name: "Copy Creation Speed", value: "60%", description: "Reduction in time spent writing descriptions" },
        { name: "Conversion Rate", value: "5%", description: "Increase in online conversion rate" },
        { name: "Revenue Growth", value: "8%", description: "Increase in average order value" }
      ],
      benefits: [
        "Improve search performance and personalized recommendations with enriched product data",
        "Increase online conversion rates by generating tailored, high-quality product descriptions",
        "Enhance product discoverability across storefronts and marketing channels",
        "Translate descriptions into supported languages directly within the toolkit"
      ]
    },
    technicalSpecs: {
      platform: "SAP Commerce Cloud",
      technology: "SAP CX AI Toolkit",
      module: "Product description generation"
    },
    implementation: "The AI toolkit generates product descriptions using product attributes, existing copy, and custom instructions. Descriptions can be created individually or in bulk, with direct storefront publishing and multi-language translation capabilities.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1XQTLQO2I8DHA-uG7fmAUPoLGDzR8KJ5w/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_catalog_health_interface.webp"]
    },
    tags: ["Marketing", "E-commerce", "Product Descriptions", "AI", "Content Generation"]
  },
  {
    id: "sap-ai-marketing-004",
    title: "Automate sales orders and tax compliance",
    summary: "Create sales orders from unstructured documents like PDFs and images with AI-powered document processing and automation.",
    category: "Marketing",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "In SAP S/4HANA, internal sales representatives can upload unstructured purchase order files—such as PDFs or images—and the system will extract the necessary data to create a sales order request. Proposed values for key fields, such as the sold-to party, are automatically filled based on extracted information. Sales order requests can then be reviewed and converted into full sales orders with minimal manual input.",
    businessValue: {
      metrics: [
        { name: "Order Creation Cost", value: "25%", description: "Reduction in the cost of creating sales orders by automating data capture" },
        { name: "Processing Speed", value: "Faster", description: "Improved data accuracy leads to quicker sales order turnaround" },
        { name: "Manual Effort", value: "Less", description: "Sales teams spend less time compiling order information" }
      ],
      benefits: [
        "Automate data extraction from purchase order files to speed up sales order creation",
        "Reduce manual workload by prepopulating order request fields with AI-extracted data",
        "Improve accuracy and shorten cycle times by minimizing processing errors"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA",
      technology: "AI-powered document processing and data extraction",
      module: "Sales order management"
    },
    implementation: "The system processes unstructured documents (PDFs, images) to extract data and automatically populate sales order request fields. Manual review and approval processes are maintained while reducing data compilation time.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "https://drive.google.com/file/d/1jX05YQU4udp_2-EsrH0-gU_90ssKfIDY/view?usp=drive_link",
      hasDemo: true,
      screenshots: ["sap_sales_orders_automation_interface.webp"]
    },
    tags: ["Marketing", "Sales Orders", "Document Processing", "AI", "Automation"]
  },
  
  // ADDITIONAL SAP AI USE CASES - July 2025
  {
    id: "sap-ai-operations-001",
    title: "Error Investigation and Remediation Agent",
    summary: "Reduce effort to investigate and remediate errors by 90% through AI-guided root cause analysis and automated resolution suggestions.",
    category: "Operations",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "This AI agent uses machine learning and cognitive computing to automatically detect errors, perform root cause analysis, and provide intelligent resolution recommendations. The system learns from past incidents to improve accuracy and speed of error resolution across enterprise operations.",
    businessValue: {
      metrics: [
        { name: "Investigation Effort Reduction", value: "90%", description: "Significant reduction in manual error investigation time" },
        { name: "Resolution Speed", value: "85%", description: "Faster problem resolution through AI guidance" },
        { name: "Error Reduction", value: "75%", description: "Proactive prevention of recurring issues" }
      ],
      benefits: [
        "Accelerate error resolution through automated root cause analysis",
        "Reduce operational downtime with predictive error prevention",
        "Improve system reliability through pattern recognition and proactive insights",
        "Enable faster decision-making with AI-guided resolution recommendations"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA Cloud",
      technology: "Machine Learning, Cognitive Computing",
      module: "Operations Management"
    },
    implementation: "The agent continuously monitors system operations, detects anomalies, and applies machine learning algorithms to identify root causes. It provides actionable recommendations and can automatically implement approved resolution strategies.",
    visualAssets: {
      hasVideo: true,
      videoUrl: "LOCAL_VIDEO:reduce_effort_to_investigate",
      hasDemo: true,
      screenshots: ["sap_error_investigation_dashboard.webp"]
    },
    tags: ["Operations", "Error Investigation", "Root Cause Analysis", "AI", "Automation", "Machine Learning"]
  },
  
  {
    id: "sap-ai-analytics-002",
    title: "Natural Language Analytics Agent",
    summary: "Lower the barrier to analytics using natural language queries, enabling 5% productivity boost through conversational data access.",
    category: "Analytics",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "This AI agent democratizes data analytics by enabling users to interact with business data using natural language queries. Built on large language models and conversational AI, it makes analytics accessible to non-technical users while maintaining enterprise-grade security and governance.",
    businessValue: {
      metrics: [
        { name: "Productivity Boost", value: "5%", description: "Overall productivity improvement through easier data access" },
        { name: "Query Speed", value: "40%", description: "Faster insight generation through natural language interface" },
        { name: "User Adoption", value: "80%", description: "Higher analytics adoption across organization" }
      ],
      benefits: [
        "Democratize analytics access across the organization",
        "Reduce time to insights through conversational interface",
        "Eliminate technical barriers to data exploration",
        "Enable self-service analytics for business users"
      ]
    },
    technicalSpecs: {
      platform: "SAP Analytics Cloud",
      technology: "Large Language Models, Conversational AI",
      module: "Business Intelligence"
    },
    implementation: "Users can query data using natural language, which is processed by LLMs to generate appropriate analytics queries. The system provides visualizations and insights in response to conversational requests while maintaining data security and governance.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_natural_language_analytics_interface.webp"]
    },
    tags: ["Analytics", "Natural Language Processing", "Conversational AI", "Business Intelligence", "Data Access"]
  },
  
  {
    id: "sap-ai-finance-005",
    title: "Financial Data Summarization Agent",
    summary: "Reduce time spent summarizing financial data through automated report generation and intelligent data aggregation.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-22",
    overview: "This AI agent automates the creation of financial reports and summaries using generative AI and large language models. It analyzes financial data, identifies key trends, and generates comprehensive, consistent reports that would traditionally require significant manual effort.",
    businessValue: {
      metrics: [
        { name: "Time Reduction", value: "60%", description: "Significant reduction in report preparation time" },
        { name: "Speed Improvement", value: "75%", description: "Faster report generation and distribution" },
        { name: "Accuracy Improvement", value: "85%", description: "More consistent and accurate financial summaries" }
      ],
      benefits: [
        "Accelerate financial reporting cycles with automated summarization",
        "Ensure consistency across financial communications",
        "Enable faster decision-making with timely financial insights",
        "Reduce manual effort in report preparation and formatting"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA Cloud",
      technology: "Large Language Models, Generative AI",
      module: "Financial Planning and Analysis"
    },
    implementation: "The agent processes structured financial data, applies intelligent aggregation algorithms, and generates natural language summaries and reports. It maintains audit trails and ensures compliance with financial reporting standards.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_financial_summarization_interface.webp"]
    },
    tags: ["Finance", "Financial Reporting", "Generative AI", "Document Generation", "Data Summarization"]
  },
  
  {
    id: "sap-ai-finance-006",
    title: "Payment Risk Prediction Agent",
    summary: "Predict the risk of late payment for invoices using machine learning to analyze customer payment behavior and external factors.",
    category: "Finance",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "This advanced AI agent analyzes customer payment patterns, external economic indicators, and behavioral data to predict payment risks. It enables proactive collection strategies and improves cash flow management through accurate risk assessment and customer segmentation.",
    businessValue: {
      metrics: [
        { name: "DSO Reduction", value: "3.5%", description: "Reduction in days sales outstanding" },
        { name: "Collection Efficiency", value: "25%", description: "Improved collection process efficiency" },
        { name: "Bad Debt Reduction", value: "15%", description: "Reduction in uncollectible receivables" }
      ],
      benefits: [
        "Optimize collection strategies based on AI-driven risk assessment",
        "Improve cash flow predictability through accurate payment forecasting",
        "Enable proactive customer relationship management",
        "Reduce bad debt through early risk identification"
      ]
    },
    technicalSpecs: {
      platform: "SAP S/4HANA Cloud",
      technology: "Machine Learning, Predictive Analytics",
      module: "Accounts Receivable Management"
    },
    implementation: "The agent continuously learns from payment history, customer interactions, and external data sources to build predictive models. It integrates with existing AR processes to provide real-time risk scores and actionable recommendations.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_payment_risk_prediction_dashboard.webp"]
    },
    tags: ["Finance", "Payment Risk", "Predictive Analytics", "Machine Learning", "Cash Flow Management"]
  },

  // AI AGENTS & GENERATIVE AI USE CASES
  {
    id: "sap-ai-agents-001",
    title: "AI-Powered Customer Service Agent",
    summary: "Intelligent virtual agent that handles customer inquiries, provides personalized support, and escalates complex issues.",
    category: "AI Agents",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "SAP Conversational AI provides an intelligent customer service agent that can understand natural language, handle routine inquiries, and provide personalized responses. The agent learns from interactions to improve accuracy and can seamlessly escalate complex issues to human agents.",
    businessValue: {
      metrics: [
        { name: "Response Time", value: "24/7", description: "Instant customer support availability" },
        { name: "Resolution Rate", value: "85%", description: "Automated issue resolution" },
        { name: "Customer Satisfaction", value: "92%", description: "Improved customer experience" }
      ],
      benefits: [
        "Provide instant customer support without human intervention",
        "Reduce customer service costs and improve efficiency",
        "Enhance customer experience with personalized responses",
        "Scale customer support operations seamlessly"
      ]
    },
    technicalSpecs: {
      platform: "SAP Conversational AI",
      technology: "Natural Language Processing (NLP)",
      minVersion: "SAP Conversational AI 2.0",
      module: "Customer Service Automation"
    },
    implementation: "The AI agent is trained on company-specific knowledge base and customer interaction history. It integrates with SAP CRM systems to access customer data and provide contextual responses.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_ai_customer_agent_dashboard.webp"]
    },
    tags: ["AI Agents", "Customer Service", "Natural Language Processing", "Automation", "CRM"]
  },
  {
    id: "sap-ai-genai-001",
    title: "Generative AI Content Creation",
    summary: "AI-powered content generation for marketing materials, reports, and business communications.",
    category: "Generative AI",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "SAP Generative AI solutions enable businesses to create high-quality content automatically, including marketing copy, business reports, and customer communications. The system maintains brand voice consistency and ensures compliance with company guidelines.",
    businessValue: {
      metrics: [
        { name: "Content Creation Speed", value: "10x", description: "Faster content generation" },
        { name: "Cost Reduction", value: "60%", description: "Reduced content creation costs" },
        { name: "Brand Consistency", value: "95%", description: "Maintained brand voice" }
      ],
      benefits: [
        "Accelerate marketing campaign development",
        "Reduce content creation costs and time",
        "Maintain consistent brand messaging",
        "Scale content production for multiple channels"
      ]
    },
    technicalSpecs: {
      platform: "SAP Business Technology Platform",
      technology: "Generative AI (GPT-based)",
      minVersion: "SAP BTP 2024",
      module: "Content Generation"
    },
    implementation: "The generative AI system is trained on company-specific content, brand guidelines, and industry best practices. Users can provide prompts and receive AI-generated content that can be reviewed and edited as needed.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_genai_content_creation.webp"]
    },
    tags: ["Generative AI", "Content Creation", "Marketing", "Automation", "Brand Management"]
  },
  {
    id: "sap-ai-ml-001",
    title: "Advanced Machine Learning Analytics",
    summary: "Enterprise-grade machine learning platform for predictive analytics and business intelligence.",
    category: "Machine Learning",
    vendor: "SAP",
    publishedDate: "2025-05-14",
    lastUpdated: "2025-05-28",
    overview: "SAP Machine Learning platform provides advanced analytics capabilities for businesses to build, deploy, and manage ML models at scale. The platform supports various ML algorithms and provides tools for model training, validation, and monitoring.",
    businessValue: {
      metrics: [
        { name: "Model Accuracy", value: "94%", description: "Average prediction accuracy" },
        { name: "Deployment Time", value: "50%", description: "Faster model deployment" },
        { name: "ROI Improvement", value: "3.2x", description: "Return on ML investments" }
      ],
      benefits: [
        "Build and deploy ML models faster",
        "Improve prediction accuracy with advanced algorithms",
        "Scale ML operations across the enterprise",
        "Reduce operational costs with automation"
      ]
    },
    technicalSpecs: {
      platform: "SAP Data Intelligence",
      technology: "Machine Learning",
      minVersion: "SAP Data Intelligence 3.0",
      module: "ML Model Management"
    },
    implementation: "The platform provides a comprehensive ML workflow from data preparation to model deployment. Users can leverage pre-built ML algorithms or develop custom models using Python and R.",
    visualAssets: {
      hasVideo: false,
      hasDemo: true,
      screenshots: ["sap_ml_analytics_dashboard.webp"]
    },
    tags: ["Machine Learning", "Predictive Analytics", "Business Intelligence", "Data Science", "Automation"]
  }
];

export const sapAiFilterOptions = {
  categories: [
    "All Categories",
    "Finance", 
    "HR", 
    "Marketing", 
    "Analytics", 
    "Operations",
    "Procurement", 
    "Sales", 
    "Supply Chain"
  ],
  vendors: [
    "All",
    "SAP",
    "Topaz", 
    "Infosys Consulting"
  ],
  platforms: [
    "All Platforms",
    "SAP S/4HANA",
    "SAP SuccessFactors",
    "SAP Analytics Cloud",
    "SAP Commerce Cloud",
    "SAP Emarsys",
    "SAP Fieldglass",
    "SAP Cloud ERP"
  ],
  tags: [
    "Machine Learning",
    "AI",
    "Generative AI",
    "Predictive Analytics",
    "Automation",
    "Natural Language",
    "Document Processing",
    "Personalization"
  ]
};