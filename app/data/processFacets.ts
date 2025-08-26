export interface ProcessFacetOption {
  key: string
  label: string
  count: number | null
}

export interface ProcessFacetGroup {
  id: string
  label: string
  order: number
  options: ProcessFacetOption[]
}

export interface ProcessFacets {
  processKey: string
  groups: ProcessFacetGroup[]
  retrieved_at: string
  source_url: string
  content_hash: string
}

export const processFacetsData: ProcessFacets[] = [
  {
    processKey: "S2P",
    groups: [
      {
        id: "products",
        label: "Products",
        order: 1,
        options: [],
      },
      {
        id: "vendor",
        label: "Vendor",
        order: 2,
        options: [],
      },
      {
        id: "methodology",
        label: "Methodology",
        order: 3,
        options: [],
      },
      {
        id: "sap_offerings",
        label: "SAP Offerings",
        order: 4,
        options: [],
      },
      {
        id: "business_process",
        label: "Business Process",
        order: 5,
        options: [
          { key: "acquire_to_decommission", label: "Acquire to Decommission", count: null },
          { key: "finance", label: "Finance", count: null },
          { key: "governance", label: "Governance", count: null },
          { key: "idea_to_market", label: "Idea to Market", count: null },
          { key: "lead_to_cash", label: "Lead to Cash", count: null },
        ],
      },
    ],
    retrieved_at: "2025-08-17T03:21:13.728570",
    source_url: "https://hub.sap.com/transformation/filter-result?Business%20Process=Source to Pay",
    content_hash: "0bc86f8f78fbb915e9016be2b1eabac75863d35a2cd46f97d63ec571973c2ff5",
  },
  {
    processKey: "FIN",
    groups: [
      {
        id: "products",
        label: "Products",
        order: 1,
        options: [
          { key: "sap_s/4hana_cloud_private_edition", label: "SAP S/4HANA Cloud Private Edition", count: null },
          { key: "sap_s/4hana_cloud_public_edition", label: "SAP S/4HANA Cloud Public Edition", count: null },
          { key: "sap_signavio", label: "SAP Signavio", count: null },
          { key: "sap_signavio_journey_modeler", label: "SAP Signavio Journey Modeler", count: null },
          { key: "sap_signavio_process_intelligence", label: "SAP Signavio Process Intelligence", count: null },
          { key: "sap_signavio_process_manager", label: "SAP Signavio Process Manager", count: null },
        ],
      },
      {
        id: "vendor",
        label: "Vendor",
        order: 2,
        options: [
          { key: "adapro_gmbh", label: "AdaPro GmbH", count: null },
          { key: "bearingpoint_gmbh", label: "BearingPoint GmbH", count: null },
          { key: "blackline_systems_inc", label: "BlackLine Systems Inc", count: null },
          { key: "globant_llc", label: "Globant LLC", count: null },
          { key: "kps_transformation_gmbh", label: "KPS Transformation GmbH", count: null },
          { key: "msg_systems_ag", label: "msg systems AG", count: null },
          { key: "ntt_data_business_solutions_ag", label: "NTT DATA Business Solutions AG", count: null },
          { key: "sap", label: "SAP", count: null },
          { key: "scheer_gmbh", label: "Scheer Gmbh", count: null },
          { key: "visual_enterprise_architecture", label: "Visual Enterprise Architecture", count: null },
          { key: "westernacher_business_management", label: "Westernacher Business Management", count: null },
        ],
      },
      {
        id: "methodology",
        label: "Methodology",
        order: 3,
        options: [
          { key: "discover", label: "Discover", count: null },
          { key: "prepare", label: "Prepare", count: null },
          { key: "realize", label: "Realize", count: null },
        ],
      },
      {
        id: "sap_offerings",
        label: "SAP Offerings",
        order: 4,
        options: [
          { key: "grow_with_sap", label: "GROW with SAP", count: null },
          { key: "rise_with_sap", label: "RISE with SAP", count: null },
        ],
      },
      {
        id: "business_process",
        label: "Business Process",
        order: 5,
        options: [
          { key: "acquire_to_decommission", label: "Acquire to Decommission", count: null },
          { key: "finance", label: "Finance", count: null },
          { key: "governance", label: "Governance", count: null },
          { key: "idea_to_market", label: "Idea to Market", count: null },
          { key: "lead_to_cash", label: "Lead to Cash", count: null },
          { key: "plan_to_fulfill", label: "Plan to Fulfill", count: null },
          { key: "recruit_to_retire", label: "Recruit to Retire", count: null },
        ],
      },
    ],
    retrieved_at: "2025-08-17T03:21:13.728672",
    source_url: "https://hub.sap.com/transformation/filter-result?Business%20Process=Finance",
    content_hash: "e6cc3da2fb44cec2effa8987c4f57e0d8493cb1a52d50b000a41b6400592a50e",
  },
  {
    processKey: "L2C",
    groups: [
      {
        id: "products",
        label: "Products",
        order: 1,
        options: [],
      },
      {
        id: "vendor",
        label: "Vendor",
        order: 2,
        options: [],
      },
      {
        id: "methodology",
        label: "Methodology",
        order: 3,
        options: [],
      },
      {
        id: "sap_offerings",
        label: "SAP Offerings",
        order: 4,
        options: [],
      },
      {
        id: "business_process",
        label: "Business Process",
        order: 5,
        options: [
          { key: "acquire_to_decommission", label: "Acquire to Decommission", count: null },
          { key: "finance", label: "Finance", count: null },
          { key: "governance", label: "Governance", count: null },
          { key: "idea_to_market", label: "Idea to Market", count: null },
          { key: "lead_to_cash", label: "Lead to Cash", count: null },
          { key: "plan_to_fulfill", label: "Plan to Fulfill", count: null },
          { key: "recruit_to_retire", label: "Recruit to Retire", count: null },
          { key: "source_to_pay", label: "Source to Pay", count: null },
        ],
      },
      {
        id: "industries",
        label: "Industries",
        order: 6,
        options: [
          { key: "aerospace_and_defense", label: "Aerospace and Defense", count: null },
          { key: "automotive", label: "Automotive", count: null },
          { key: "chemicals", label: "Chemicals", count: null },
          { key: "consumer_products", label: "Consumer Products", count: null },
          { key: "defense_and_security", label: "Defense and Security", count: null },
          {
            key: "engineering,_construction_and_operations",
            label: "Engineering, Construction & Operations",
            count: null,
          },
          { key: "higher_education_and_research", label: "Higher Education and Research", count: null },
          { key: "industrial_machinery_and_components", label: "Industrial Machinery and Components", count: null },
          { key: "insurance", label: "Insurance", count: null },
          { key: "life_sciences", label: "Life Sciences", count: null },
          { key: "media", label: "Media", count: null },
          { key: "mill_products", label: "Mill Products", count: null },
          { key: "mining", label: "Mining", count: null },
          { key: "oil_and_gas", label: "Oil and Gas", count: null },
          { key: "professional_services", label: "Professional Services", count: null },
          { key: "public_sector", label: "Public Sector", count: null },
          { key: "retail", label: "Retail", count: null },
          { key: "sports_and_entertainment", label: "Sports and Entertainment", count: null },
          { key: "telecommunications", label: "Telecommunications", count: null },
          { key: "travel_and_transportation", label: "Travel and Transportation", count: null },
          { key: "utilities", label: "Utilities", count: null },
          { key: "wholesale_distribution", label: "Wholesale Distribution", count: null },
        ],
      },
      {
        id: "package_sub_type",
        label: "Package Sub Type",
        order: 7,
        options: [{ key: "value_accelerator", label: "Value Accelerator", count: null }],
      },
    ],
    retrieved_at: "2025-08-17T03:21:13.729123",
    source_url: "https://hub.sap.com/transformation/filter-result?Business%20Process=Lead%20to%20Cash",
    content_hash: "955094736540ada6a58e62ea4cdd5b57fc3c39e0396338a53d430935df05bac7",
  },
]

export const getProcessFacets = (processKey: string): ProcessFacets | undefined => {
  return processFacetsData.find((p) => p.processKey === processKey)
}

export const getAllFilterOptions = () => {
  const allOptions: Record<string, Set<string>> = {}

  processFacetsData.forEach((process) => {
    process.groups.forEach((group) => {
      if (!allOptions[group.id]) {
        allOptions[group.id] = new Set()
      }
      group.options.forEach((option) => {
        allOptions[group.id].add(option.key)
      })
    })
  })

  return Object.fromEntries(Object.entries(allOptions).map(([key, set]) => [key, Array.from(set)]))
}

export const processFacets = processFacetsData.reduce(
  (acc, facet) => {
    acc[facet.processKey] = facet
    return acc
  },
  {} as Record<string, ProcessFacets>,
)
