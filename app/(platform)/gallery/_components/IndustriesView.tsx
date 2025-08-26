"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Car,
  ShoppingCart,
  HardHat,
  Factory,
  Briefcase,
  Building,
  Store,
  Zap,
  Plane,
  Heart,
  Phone,
  Film,
  Banknote,
  Shield,
  Wheat,
  Stethoscope,
  Fuel,
  FlaskConical,
  GraduationCap,
  Truck,
  Cpu,
  Pickaxe,
  Hammer,
  Rocket,
  UserCheck,
} from "lucide-react"
import { useGalleryStore } from "@/lib/store/gallery"

const industryDescriptions: Record<string, string> = {
  automotive:
    "Deliver innovative solutions on the road to new mobility, while running a profitable automotive business.",
  "consumer-products":
    "Embrace intelligent technologies and next-gen business processes to deliver personalization with a purpose.",
  "engineering-construction-and-operations":
    "Convert bids into profitable contracts and deliver projects on time and on budget by digitalizing expertise and assets.",
  "industrial-manufacturing": "Accelerate digitalization and drive strategic and sustainable growth",
  "professional-services":
    "Meet client needs and generate revenue by blending data and processes and managing workers in the cloud.",
  "public-sector":
    "Empower governments and public sector organizations to deliver the core objectives of the public sector with intelligent solutions and automated processes.",
  retail: "Give shoppers and consumers the products and personalized shopping experiences they want.",
  utilities: "Inspire and shape a digital world.",
  "travel-and-transportation":
    "Digitalize to provide a reliable, personalized experience while driving innovation in the digital enterprise and increasing profitability",
  "life-sciences":
    "Ensure better patient outcomes with innovation in pharma supply chain planning and digital manufacturing excellence.",
  telecommunications: "Shaping how people interact and how business gets done",
  media:
    "Helping media and entertainment companies reach new audiences, manage revenue and drive content profitability in the cloud",
  banking:
    "Enable Financial Services organizations supporting financial supply chains in networks of agile, resilient, intelligent and sustainable enterprises",
  insurance:
    "Digitize end to end processes by leveraging sustainable intelligent technologies across the insurance front, middle and back office and its ecosystems.",
  agribusiness: "Transform and grow in an integrated industry ecosystem to sustainably feed the world.",
  healthcare: "Improve patient outcomes and deliver cost-effective care.",
  "oil-and-gas":
    "Oil and gas software from SAP helps you meet the world's energy demands reliably, affordably, and sustainably.",
  chemicals:
    "Optimize performance in the chemical industry by accelerating innovation and adapting processes and business models.",
  "higher-education-and-research":
    "Support Higher Education, K12 & Research institutions with intelligent solutions and automated processes",
  "wholesale-distribution":
    "Deliver what your customers need, where they need it, at the right time with SAP's wholesale distribution software",
  "high-tech":
    "High tech software from SAP helps you accelerate innovation and quickly adapt to changing market conditions.",
  mining:
    "Our mining software solutions support operational efficiency and sustainability across exploration, extraction, processing, and distribution.",
  "mill-products":
    "Our mill products software helps you create a resilient, profitable future in building materials, cable and wire, metals, paper and packaging, and textiles.",
  "aerospace-and-defense":
    "Our aerospace and defense industry software helps you respond to supply chain disruption and meet demand.",
  "defense-and-security":
    "Our defense and security software solutions support cognitive and physical superiority across sea, air, land, space, and cyberspace.",
}

const industryIcons: Record<string, any> = {
  automotive: Car,
  "consumer-products": ShoppingCart,
  "engineering-construction-and-operations": HardHat,
  "industrial-manufacturing": Factory,
  "professional-services": Briefcase,
  "public-sector": Building,
  retail: Store,
  utilities: Zap,
  "travel-and-transportation": Plane,
  "life-sciences": Heart,
  telecommunications: Phone,
  media: Film,
  banking: Banknote,
  insurance: Shield,
  agribusiness: Wheat,
  healthcare: Stethoscope,
  "oil-and-gas": Fuel,
  chemicals: FlaskConical,
  "higher-education-and-research": GraduationCap,
  "wholesale-distribution": Truck,
  "high-tech": Cpu,
  mining: Pickaxe,
  "mill-products": Hammer,
  "aerospace-and-defense": Rocket,
  "defense-and-security": UserCheck,
}

export default function IndustriesView() {
  const [visibleCount, setVisibleCount] = useState(15)
  const router = useRouter()
  const { industries } = useGalleryStore()

  const visibleIndustries = industries.slice(0, visibleCount)
  const hasMore = visibleCount < industries.length

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Industries & Value Chains
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Explore all the resources available from industries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {visibleIndustries.map((industry) => {
          const IconComponent = industryIcons[industry.slug] || Building2
          const description =
            industryDescriptions[industry.slug] || `Explore solutions and processes for ${industry.name}`

          return (
            <div
              key={industry.slug}
              onClick={() => router.push(`/gallery/industry/${industry.slug}`)}
              className="group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border"
              style={{
                backgroundColor: "white",
                borderColor: "rgba(0, 0, 0, 0.1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                style={{ background: "var(--grad-primary)" }}
              >
                <IconComponent className="h-6 w-6 text-white" />
              </div>

              <h3 className="font-semibold text-lg mb-3 text-center line-clamp-2" style={{ color: "var(--text)" }}>
                {industry.name}
              </h3>

              <p
                className="text-sm mb-4 text-center line-clamp-3 leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {description}
              </p>

              <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {industry.valueChainProcessIds?.length || 0} E2E Processes • {industry.tags?.length || 0} Solutions
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
            style={{
              background: "var(--grad-primary)",
              color: "white",
            }}
          >
            Load More Industries
          </button>
        </div>
      )}
    </div>
  )
}
