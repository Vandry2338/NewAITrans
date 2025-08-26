export const sapValueChains = [
  {
    id: "s2p",
    key: "S2P" as const,
    name: "Source to Pay",
    description:
      "Including all activities associated with managing the comprehensive sourcing and procurement of goods and services. It starts with procurement planning and managing spend, followed by sourcing and supplier selection, negotiating and managing supplier contracts, and preparing and executing operational procurement. The next steps are goods receipt, initiating potential returns and claims, processing supplier invoices and accounts payable, including final payment to the supplier, and managing supplier data. The source-to-pay process varies mainly based on the type of product or service being purchased. Variants of S2P cover, for example, procurement of indirect and direct products, services, and solutions (such as combination of products and services), as well as MRO and field service materials.",
    sapLabel: "Source to Pay",
    synonyms: ["Source-to-Pay", "Sourcing & Procurement", "Procure"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  },
  {
    id: "fin",
    key: "FIN" as const,
    name: "Finance",
    description:
      "Covers all activities associated with managing the capital structure of a company, from planning, budgeting, and forecasting to managing accounts payable and receivable to managing cash (treasury) to recording and reporting financial data. This process also covers real estate management with a focus on allocation and utilization of property and workspace.",
    sapLabel: "Finance",
    synonyms: ["Record to Report", "Financial Management"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
  },
  {
    id: "a2d",
    key: "A2D" as const,
    name: "Acquire to Decommission",
    description:
      "Covers all activities associated with the lifecycle management of assets. This includes planning asset strategy and investments, defining asset maintenance strategies (such as reactive or proactive improvement work), acquiring or building assets, onboarding assets, and planning and executing asset maintenance, as well as offboarding and decommissioning assets. Throughout the lifecycle, the management of asset data and risks can take place. The A2D process varies mainly based on the type of asset that is managed. Variants of A2D cover, for example, tangible assets, such as serialized devices, equipment, production facilities, and real estate, or intangible assets, such as software or intellectual property.",
    sapLabel: "Acquire to Decommission",
    synonyms: ["Asset Management", "Operate to Decommission", "EAM"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
  },
  {
    id: "i2m",
    key: "I2M" as const,
    name: "Idea to Market",
    description:
      "Covers all processes associated with managing the lifecycle of products and services, such as managing the product portfolio and investments, identifying new products and services, finalizing design through prototyping, and testing before handover to manufacturing. After production, activities associated with bringing products and services to market must be managed, including the customer experience, intellectual property, and product compliance. I2M also includes processes associated with managing changes to products or services, updating road maps, and making sure data on products and services is accessible yet secure during collaboration between internal and external communities throughout the product development process.",
    sapLabel: "Idea to Market",
    synonyms: ["Design to Operate", "R&D to Market", "Product Development"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
  },
  {
    id: "r2r",
    key: "R2R" as const,
    name: "Recruit to Retire",
    description:
      "Includes all activities associated with hiring the internal and external workforce and managing their lifecycle in the organization. It involves strategizing and planning human resource requirements, identifying and onboarding new talent, developing talent to enable growth, and retaining talent through appropriate reward-and-recognition strategies, as well as managing all recurring and administrative tasks throughout the workforce lifecycle. The latter includes the management of workforce-related data and lifecycle events such as promotions, relocations, or final offboarding, managing expenses, and periodic payroll and expense payments.",
    sapLabel: "Recruit to Retire",
    synonyms: ["Hire to Retire", "Workforce Management", "Human Resources"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4",
  },
  {
    id: "l2c",
    key: "L2C" as const,
    name: "Lead to Cash",
    description:
      "Covers all activities related to marketing and selling products and services, managing and fulfilling sales orders, providing after-sales services, and, finally, invoicing customers, managing accounts receivable, and collecting payment. It also covers the management of customers and channels as foundational elements of the process. The lead-to-cash process varies mainly based on the type of customer (such as B2B versus B2C), the channels through which the products and services are being offered (such as direct sales, digital commerce, physical stores, and partner sales), and the type of products and services that are sold.",
    sapLabel: "Lead to Cash",
    synonyms: ["Order to Cash", "Sell to Cash", "Quote to Cash"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5",
  },
  {
    id: "p2f",
    key: "P2F" as const,
    name: "Plan to Fulfill",
    description:
      "Involves all activities related to the planning, production, delivery, and fulfillment of products or services as well as aspects such as tracking and tracing, data management, and sustainable manufacturing operations. Products could be tangible or intangible, such as software. Services could be classic field services, such as installation or maintenance, but could also be professional services or software as a service. The planning stage involves defining supply chain, manufacturing and service-fulfillment strategies; planning demand, inventory, and supply; aligning plans through sales and operations planning; and finally, managing supply chain performance.",
    sapLabel: "Plan to Fulfill",
    synonyms: ["Plan/Make/Deliver", "Design to Operate", "Supply Chain"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
  },
  {
    id: "gov",
    key: "GOV" as const,
    name: "Governance",
    description:
      "Covers generic processes related to planning and defining enterprise strategy, establishing and managing sustainable operations, enabling streamlined portfolio and project management operations across various use cases, managing relevant elements of governance, risk, and compliance, international trade, global tax and also managing and operating IT. Planning and defining the enterprise strategy involves defining the relevant business (such as product business, service business, or solution business) and operating models (such as centralized versus decentralized operations or shared service operations), managing business processes, and managing other corporate-level strategies.",
    sapLabel: "Governance",
    synonyms: ["Strategy & Governance", "Portfolio/Program Management", "GRC"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7",
  },
  {
    id: "proc_digital_transformation",
    key: "DT" as const,
    name: "Digital Transformation",
    description:
      "Encompasses the strategic adoption and implementation of digital technologies to transform business operations, customer experiences, and organizational capabilities. This includes AI/ML integration, cloud migration, process automation, and digital innovation initiatives.",
    sapLabel: "Digital Transformation",
    synonyms: ["Digital Innovation", "Technology Transformation", "Digital Strategy"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8",
  },
  {
    id: "proc_innovation",
    key: "INN" as const,
    name: "Innovation",
    description:
      "Covers the end-to-end process of identifying, developing, and implementing innovative solutions, products, and services. This includes research and development, prototyping, testing, and commercialization of new ideas and technologies.",
    sapLabel: "Innovation",
    synonyms: ["R&D", "Innovation Management", "Product Innovation"],
    source_url: "https://hub.sap.com/transformation/processes",
    retrieved_at: "2025-08-17T02:52:15Z",
    content_hash: "j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9",
  },
] as const

export const valueChains = sapValueChains
