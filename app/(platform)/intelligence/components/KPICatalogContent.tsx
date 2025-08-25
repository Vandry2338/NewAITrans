"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useMemo } from "react"
import {
  X,
  TrendingUp,
  Users,
  Search,
  Grid,
  List,
  Bookmark,
  Share,
  UserMinus,
  Activity,
  Calculator,
  UserPlus,
  Crown,
  Shield,
  Package,
  PiggyBank,
  Heart,
  FileCheck,
  ShoppingBag,
  Percent,
  Clock,
  RefreshCw,
  Warehouse,
  Smile,
  ThumbsUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  Timer,
  Zap,
  Wrench,
  PenToolIcon as Tool,
  Gauge,
  Truck,
  CheckSquare,
  Building,
  AlertCircle,
  BarChart,
  GraduationCap,
  BookOpen,
  Award,
  Fuel,
  Home,
  DollarSign,
  Beaker,
  Rocket,
  StoreIcon,
  ZapIcon,
  AlertTriangleIcon,
  TruckIcon,
  StarIcon,
  PieChart,
  PlaneIcon,
  AwardIcon,
  WarehouseIcon,
  ShoppingCart,
  Settings,
  Lightbulb,
  UserCheck,
  Banknote,
  UserX,
  Plane,
  Scale,
  Target,
  CreditCard,
  RotateCw,
  FileText,
  Star,
} from "lucide-react"
import { useICStore } from "@/lib/store"

const kpiCatalog = [
  {
    id: "ABR",
    name: "Absenteeism Rate",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "ARO",
    name: "Asset ROI",
    industries: ["cross-industry"],
    processes: ["A2D"],
  },
  {
    id: "AUR",
    name: "Asset Utilization Rate",
    industries: ["cross-industry"],
    processes: ["A2D"],
  },
  {
    id: "ATR",
    name: "Attendance Rate",
    industries: ["media-sports-entertainment"],
    processes: ["L2C"],
  },
  {
    id: "AFR",
    name: "Audit Finding Resolution Time",
    industries: ["cross-industry"],
    processes: ["GOV"],
  },
  {
    id: "BV",
    name: "Budget Variance",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "BWR",
    name: "Bid Win Rate",
    industries: ["aerospace-defense", "construction-real-estate", "professional-services"],
    processes: ["L2C"],
  },
  {
    id: "CAC",
    name: "Customer Acquisition Cost",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "CFF",
    name: "Cash Flow from Operations",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "CHR",
    name: "Customer Churn Rate",
    industries: ["telecommunications", "media-sports-entertainment", "insurance"],
    processes: ["L2C"],
  },
  {
    id: "CLV",
    name: "Customer Lifetime Value",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "COR",
    name: "Combined Ratio",
    industries: ["insurance"],
    processes: ["FIN"],
  },
  {
    id: "COG",
    name: "Cost of Goods Sold",
    industries: ["cross-industry"],
    processes: ["FIN", "P2F"],
  },
  {
    id: "CSF",
    name: "Cost Savings from Procurement",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "CSS",
    name: "Customer Satisfaction Score",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "CCR",
    name: "Contract Compliance Rate",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "CPO",
    name: "Cost per Order",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "CIR",
    name: "Cost-to-Income Ratio",
    industries: ["banking"],
    processes: ["FIN"],
  },
  {
    id: "CST",
    name: "Claim Settlement Cycle Time",
    industries: ["insurance"],
    processes: ["L2C"],
  },
  {
    id: "CCC",
    name: "Cash Conversion Cycle",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "DPO",
    name: "Days Payables Outstanding",
    industries: ["cross-industry"],
    processes: ["FIN", "S2P"],
  },
  {
    id: "DTR",
    name: "On-Time Departure Rate",
    industries: ["travel-transportation"],
    processes: ["P2F"],
  },
  {
    id: "DTE",
    name: "Debt-to-Equity Ratio",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "DFA",
    name: "Demand Forecast Accuracy",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "DIO",
    name: "Days Inventory Outstanding",
    industries: ["cross-industry"],
    processes: ["FIN", "P2F"],
  },
  {
    id: "DSO",
    name: "Days Sales Outstanding",
    industries: ["cross-industry"],
    processes: ["FIN", "L2C"],
  },
  {
    id: "EES",
    name: "Employee Engagement Score",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "ESS",
    name: "Employee Satisfaction Score",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "ETR",
    name: "Employee Turnover Rate",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "EXR",
    name: "Expense Ratio",
    industries: ["insurance"],
    processes: ["FIN"],
  },
  {
    id: "FPY",
    name: "First Pass Yield",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "FCC",
    name: "Financial Close Cycle Time",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "GDR",
    name: "Graduation Rate",
    industries: ["education-research"],
    processes: ["L2C"],
  },
  {
    id: "IT",
    name: "Inventory Turnover",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "IPT",
    name: "Invoice Processing Time",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "IRT",
    name: "Incident Response Time",
    industries: ["defense-security"],
    processes: ["GOV"],
  },
  {
    id: "LMR",
    name: "Livestock Mortality Rate",
    industries: ["agribusiness"],
    processes: ["P2F"],
  },
  {
    id: "LAR",
    name: "Loss Ratio",
    industries: ["insurance"],
    processes: ["FIN"],
  },
  {
    id: "LDR",
    name: "Loan-to-Deposit Ratio",
    industries: ["banking"],
    processes: ["FIN"],
  },
  {
    id: "LFR",
    name: "Load Factor",
    industries: ["travel-transportation"],
    processes: ["L2C"],
  },
  {
    id: "MCT",
    name: "Manufacturing Cycle Time",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "MSH",
    name: "Market Share",
    industries: [
      "automotive",
      "consumer-products",
      "high-tech",
      "retail",
      "banking",
      "insurance",
      "telecommunications",
      "media-sports-entertainment",
    ],
    processes: ["L2C"],
  },
  {
    id: "MS",
    name: "Maverick Spending",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "MTB",
    name: "Mean Time Between Failures",
    industries: ["cross-industry"],
    processes: ["A2D"],
  },
  {
    id: "MTCP",
    name: "Maintenance Cost per Asset",
    industries: ["cross-industry"],
    processes: ["A2D"],
  },
  {
    id: "MTTR",
    name: "Mean Time to Repair",
    industries: [
      "industrial-manufacturing",
      "mill-products",
      "chemicals",
      "mining",
      "oil-gas-energy",
      "utilities",
      "aerospace-defense",
    ],
    processes: ["A2D"],
  },
  {
    id: "NIM",
    name: "Net Interest Margin",
    industries: ["banking"],
    processes: ["FIN"],
  },
  {
    id: "NPL",
    name: "Non-Performing Loan Ratio",
    industries: ["banking"],
    processes: ["FIN"],
  },
  {
    id: "NPS",
    name: "Net Promoter Score",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "NRP",
    name: "Percentage of Revenue from New Products",
    industries: ["cross-industry"],
    processes: ["I2M"],
  },
  {
    id: "OEE",
    name: "Overall Equipment Effectiveness",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "OCR",
    name: "Occupancy Rate",
    industries: ["construction-real-estate", "travel-transportation"],
    processes: ["L2C"],
  },
  {
    id: "OCT",
    name: "Order Cycle Time",
    industries: ["cross-industry"],
    processes: ["L2C", "P2F"],
  },
  {
    id: "OM",
    name: "Operating Margin",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "OFT",
    name: "Order Fulfillment Time",
    industries: ["cross-industry"],
    processes: ["L2C", "P2F"],
  },
  {
    id: "OFR",
    name: "Order Fill Rate",
    industries: ["cross-industry"],
    processes: ["L2C", "P2F"],
  },
  {
    id: "OTD",
    name: "On-Time Delivery",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "PAR",
    name: "Product Adoption Rate",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "PCS",
    name: "Procurement Cost Savings",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "PSA",
    name: "Production Schedule Adherence",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "PCT",
    name: "Production Cycle Time",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "P2R",
    name: "Purchase Order Cycle Time",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "PNR",
    name: "Policy Renewal Rate",
    industries: ["insurance"],
    processes: ["L2C"],
  },
  {
    id: "PRM",
    name: "Project Margin",
    industries: ["aerospace-defense", "construction-real-estate", "professional-services"],
    processes: ["FIN", "L2C"],
  },
  {
    id: "QYR",
    name: "Quality Yield Rate",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "RC",
    name: "Requirements Creep",
    industries: ["cross-industry"],
    processes: ["I2M"],
  },
  {
    id: "RAR",
    name: "Patient Readmission Rate",
    industries: ["life-sciences-healthcare"],
    processes: ["L2C"],
  },
  {
    id: "RGR",
    name: "Revenue Growth Rate",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "ROA",
    name: "Return on Assets",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
  {
    id: "ROE",
    name: "Return on Equity",
    industries: [
      "banking",
      "insurance",
      "industrial-manufacturing",
      "consumer-products",
      "retail",
      "high-tech",
      "utilities",
      "telecommunications",
      "automotive",
      "professional-services",
    ],
    processes: ["FIN"],
  },
  {
    id: "ROR",
    name: "Rate of Returns",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "RAC",
    name: "Risk Assessment Coverage",
    industries: ["cross-industry"],
    processes: ["GOV"],
  },
  {
    id: "RDE",
    name: "R&D Expense as Percentage of Sales",
    industries: ["cross-industry"],
    processes: ["I2M"],
  },
  {
    id: "RRR",
    name: "Reserve Replacement Ratio",
    industries: ["oil-gas-energy"],
    processes: ["FIN"],
  },
  {
    id: "SAIDI",
    name: "System Average Interruption Duration Index",
    industries: ["utilities"],
    processes: ["GOV", "P2F"],
  },
  {
    id: "SCR",
    name: "Sales Conversion Rate",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "SCA",
    name: "Shopping Cart Abandonment Rate",
    industries: ["cross-industry"],
    processes: ["L2C"],
  },
  {
    id: "SIR",
    name: "Safety Incident Rate",
    industries: [
      "industrial-manufacturing",
      "mill-products",
      "chemicals",
      "mining",
      "oil-gas-energy",
      "construction-real-estate",
      "aerospace-defense",
    ],
    processes: ["GOV", "P2F"],
  },
  {
    id: "SOT",
    name: "Supplier On-Time Delivery",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "SQR",
    name: "Supplier Quality Rating",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "SPS",
    name: "Supplier Performance Score",
    industries: ["cross-industry"],
    processes: ["S2P"],
  },
  {
    id: "SSS",
    name: "Same-Store Sales Growth",
    industries: ["retail"],
    processes: ["L2C"],
  },
  {
    id: "SFR",
    name: "Student-Faculty Ratio",
    industries: ["education-research"],
    processes: ["R2R"],
  },
  {
    id: "TE",
    name: "Training Effectiveness",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "THP",
    name: "Training Hours per Employee",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "TCP",
    name: "Transportation Cost per Unit",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "TTM",
    name: "Time to Market",
    industries: ["cross-industry"],
    processes: ["I2M"],
  },
  {
    id: "TTF",
    name: "Time to Fill Position",
    industries: ["cross-industry"],
    processes: ["R2R"],
  },
  {
    id: "WU",
    name: "Warehouse Utilization",
    industries: ["cross-industry"],
    processes: ["P2F"],
  },
  {
    id: "WCR",
    name: "Working Capital Ratio",
    industries: ["cross-industry"],
    processes: ["FIN"],
  },
]

const INDUSTRIES_MASTER = [
  { id: "cross-industry", label: "Cross-Industry", count: 45 },
  { id: "aerospace-defense", label: "Aerospace & Defense", count: 4 },
  { id: "agribusiness", label: "Agribusiness", count: 2 },
  { id: "automotive", label: "Automotive", count: 4 },
  { id: "banking", label: "Banking", count: 9 },
  { id: "chemicals", label: "Chemicals", count: 2 },
  { id: "construction-real-estate", label: "Construction & Real Estate", count: 4 },
  { id: "consumer-products", label: "Consumer Products", count: 3 },
  { id: "defense-security", label: "Defense & Security", count: 1 },
  { id: "education-research", label: "Education & Research", count: 2 },
  { id: "high-tech", label: "High Tech", count: 4 },
  { id: "industrial-manufacturing", label: "Industrial Manufacturing", count: 4 },
  { id: "insurance", label: "Insurance", count: 7 },
  { id: "life-sciences-healthcare", label: "Life Sciences & Healthcare", count: 1 },
  { id: "media-sports-entertainment", label: "Media, Sports & Entertainment", count: 3 },
  { id: "mill-products", label: "Mill Products", count: 2 },
  { id: "mining", label: "Mining", count: 2 },
  { id: "oil-gas-energy", label: "Oil, Gas & Energy", count: 3 },
  { id: "professional-services", label: "Professional Services", count: 4 },
  { id: "retail", label: "Retail", count: 4 },
  { id: "telecommunications", label: "Telecommunications", count: 4 },
  { id: "travel-transportation", label: "Travel & Transportation", count: 3 },
  { id: "utilities", label: "Utilities", count: 3 },
].sort((a, b) => a.label.localeCompare(b.label))

const PROCESSES_MASTER = [
  { id: "S2P", code: "S2P", label: "Source to Pay", count: 8 },
  { id: "FIN", code: "FIN", label: "Finance", count: 18 },
  { id: "A2D", code: "A2D", label: "Acquire to Decommission", count: 4 },
  { id: "I2M", code: "I2M", label: "Idea to Market", count: 4 },
  { id: "R2R", code: "R2R", label: "Recruit to Retire", count: 6 },
  { id: "L2C", code: "L2C", label: "Lead to Cash", count: 25 },
  { id: "P2F", code: "P2F", label: "Plan to Fulfill", count: 18 },
  { id: "GOV", code: "GOV", label: "Governance", count: 4 },
]

const getProcessCategory = (processes: string[]) => {
  if (processes.includes("FIN")) return "Financial"
  if (processes.includes("R2R")) return "HR"
  if (processes.includes("GOV") || processes.includes("P2F")) return "Operational"
  return "General"
}

const industryColors = {
  "cross-industry": {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    text: "#FFFFFF",
    badge: "rgba(102, 126, 234, 0.1)",
    badgeText: "#667eea",
    shadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
  },
  "aerospace-defense": {
    bg: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    text: "#FFFFFF",
    badge: "rgba(44, 62, 80, 0.1)",
    badgeText: "#2c3e50",
    shadow: "0 8px 32px rgba(44, 62, 80, 0.3)",
  },
  agribusiness: {
    bg: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    text: "#FFFFFF",
    badge: "rgba(39, 174, 96, 0.1)",
    badgeText: "#27ae60",
    shadow: "0 8px 32px rgba(39, 174, 96, 0.3)",
  },
  automotive: {
    bg: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
    text: "#FFFFFF",
    badge: "rgba(231, 76, 60, 0.1)",
    badgeText: "#e74c3c",
    shadow: "0 8px 32px rgba(231, 76, 60, 0.3)",
  },
  banking: {
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    text: "#FFFFFF",
    badge: "rgba(17, 153, 142, 0.1)",
    badgeText: "#11998e",
    shadow: "0 8px 32px rgba(17, 153, 142, 0.3)",
  },
  chemicals: {
    bg: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
    text: "#FFFFFF",
    badge: "rgba(155, 89, 182, 0.1)",
    badgeText: "#9b59b6",
    shadow: "0 8px 32px rgba(155, 89, 182, 0.3)",
  },
  "construction-real-estate": {
    bg: "linear-gradient(135deg, #d35400 0%, #e67e22 100%)",
    text: "#FFFFFF",
    badge: "rgba(211, 84, 0, 0.1)",
    badgeText: "#d35400",
    shadow: "0 8px 32px rgba(211, 84, 0, 0.3)",
  },
  "consumer-products": {
    bg: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
    text: "#FFFFFF",
    badge: "rgba(255, 107, 107, 0.1)",
    badgeText: "#ff6b6b",
    shadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
  },
  "defense-security": {
    bg: "linear-gradient(135deg, #8e24aa 0%, #6a1b9a 100%)",
    text: "#FFFFFF",
    badge: "rgba(142, 36, 170, 0.1)",
    badgeText: "#8e24aa",
    shadow: "0 8px 32px rgba(142, 36, 170, 0.3)",
  },
  "education-research": {
    bg: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
    text: "#FFFFFF",
    badge: "rgba(52, 152, 219, 0.1)",
    badgeText: "#3498db",
    shadow: "0 8px 32px rgba(52, 152, 219, 0.3)",
  },
  "high-tech": {
    bg: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
    text: "#FFFFFF",
    badge: "rgba(26, 188, 156, 0.1)",
    badgeText: "#1abc9c",
    shadow: "0 8px 32px rgba(26, 188, 156, 0.3)",
  },
  "industrial-manufacturing": {
    bg: "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)",
    text: "#FFFFFF",
    badge: "rgba(149, 165, 166, 0.1)",
    badgeText: "#95a5a6",
    shadow: "0 8px 32px rgba(149, 165, 166, 0.3)",
  },
  insurance: {
    bg: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
    text: "#FFFFFF",
    badge: "rgba(243, 156, 18, 0.1)",
    badgeText: "#f39c12",
    shadow: "0 8px 32px rgba(243, 156, 18, 0.3)",
  },
  "life-sciences-healthcare": {
    bg: "linear-gradient(135deg, #e91e63 0%, #ad1457 100%)",
    text: "#FFFFFF",
    badge: "rgba(233, 30, 99, 0.1)",
    badgeText: "#e91e63",
    shadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
  },
  "media-sports-entertainment": {
    bg: "linear-gradient(135deg, #ff5722 0%, #d84315 100%)",
    text: "#FFFFFF",
    badge: "rgba(255, 87, 34, 0.1)",
    badgeText: "#ff5722",
    shadow: "0 8px 32px rgba(255, 87, 34, 0.3)",
  },
  "mill-products": {
    bg: "linear-gradient(135deg, #8bc34a 0%, #689f38 100%)",
    text: "#FFFFFF",
    badge: "rgba(139, 195, 74, 0.1)",
    badgeText: "#8bc34a",
    shadow: "0 8px 32px rgba(139, 195, 74, 0.3)",
  },
  mining: {
    bg: "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
    text: "#FFFFFF",
    badge: "rgba(121, 85, 72, 0.1)",
    badgeText: "#795548",
    shadow: "0 8px 32px rgba(121, 85, 72, 0.3)",
  },
  "oil-gas-energy": {
    bg: "linear-gradient(135deg, #607d8b 0%, #455a64 100%)",
    text: "#FFFFFF",
    badge: "rgba(96, 125, 139, 0.1)",
    badgeText: "#607d8b",
    shadow: "0 8px 32px rgba(96, 125, 139, 0.3)",
  },
  "professional-services": {
    bg: "linear-gradient(135deg, #673ab7 0%, #512da8 100%)",
    text: "#FFFFFF",
    badge: "rgba(103, 58, 183, 0.1)",
    badgeText: "#673ab7",
    shadow: "0 8px 32px rgba(103, 58, 183, 0.3)",
  },
  retail: {
    bg: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
    text: "#2D3748",
    badge: "rgba(255, 193, 7, 0.2)",
    badgeText: "#2D3748",
    shadow: "0 8px 32px rgba(255, 193, 7, 0.4)",
  },
  telecommunications: {
    bg: "linear-gradient(135deg, #009688 0%, #00695c 100%)",
    text: "#FFFFFF",
    badge: "rgba(0, 150, 136, 0.1)",
    badgeText: "#009688",
    shadow: "0 8px 32px rgba(0, 150, 136, 0.3)",
  },
  "travel-transportation": {
    bg: "linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)",
    text: "#FFFFFF",
    badge: "rgba(0, 188, 212, 0.1)",
    badgeText: "#00bcd4",
    shadow: "0 8px 32px rgba(0, 188, 212, 0.3)",
  },
  utilities: {
    bg: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
    text: "#FFFFFF",
    badge: "rgba(76, 175, 80, 0.1)",
    badgeText: "#4caf50",
    shadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
  },
}

const processColors = {
  S2P: {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    text: "#FFFFFF",
    icon: "ShoppingCart",
    badge: "rgba(102, 126, 234, 0.15)",
    badgeText: "#667eea",
  },
  FIN: {
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    text: "#FFFFFF",
    icon: "DollarSign",
    badge: "rgba(17, 153, 142, 0.15)",
    badgeText: "#11998e",
  },
  L2C: {
    bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    text: "#2D3748",
    icon: "Users",
    badge: "rgba(255, 236, 210, 0.3)",
    badgeText: "#2D3748",
  },
  A2D: {
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    text: "#2D3748",
    icon: "Settings",
    badge: "rgba(250, 112, 154, 0.2)",
    badgeText: "#2D3748",
  },
  I2M: {
    bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    text: "#2D3748",
    icon: "Lightbulb",
    badge: "rgba(168, 237, 234, 0.2)",
    badgeText: "#2D3748",
  },
  R2R: {
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    text: "#FFFFFF",
    icon: "UserCheck",
    badge: "rgba(79, 172, 254, 0.2)",
    badgeText: "#4facfe",
  },
  P2F: {
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    text: "#FFFFFF",
    icon: "Package",
    badge: "rgba(240, 147, 251, 0.2)",
    badgeText: "#f5576c",
  },
  GOV: {
    bg: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    text: "#FFFFFF",
    icon: "Shield",
    badge: "rgba(137, 247, 254, 0.2)",
    badgeText: "#66a6ff",
  },
}

const getProcessIcon = (process: string) => {
  const iconMap = {
    S2P: ShoppingCart,
    FIN: DollarSign,
    L2C: Users,
    A2D: Settings,
    I2M: Lightbulb,
    R2R: UserCheck,
    P2F: Package,
    GOV: Shield,
  }
  return iconMap[process as keyof typeof iconMap] || TrendingUp
}

const getPrimaryIndustry = (industries: string[]) => {
  return industries.find((ind) => ind !== "cross-industry") || industries[0] || "cross-industry"
}

const getIndustryAbbreviation = (industry: string): string => {
  const abbreviations: { [key: string]: string } = {
    "industrial-manufacturing": "Industrial Mfg",
    "media-sports-entertainment": "Media & Sports",
    "aerospace-defense": "Aerospace",
    "defense-security": "Defense",
    "financial-services": "Financial",
    "healthcare-pharma": "Healthcare",
    "retail-consumer": "Retail",
    "technology-software": "Technology",
    telecommunications: "Telecom",
    "energy-utilities": "Energy",
    "transportation-logistics": "Transport",
    "real-estate-construction": "Real Estate",
    "government-public": "Government",
    "education-research": "Education",
    "agriculture-food": "Agriculture",
    "hospitality-travel": "Hospitality",
    insurance: "Insurance",
    automotive: "Automotive",
    "mining-metals": "Mining",
    "chemicals-materials": "Chemicals",
    "cross-industry": "Cross-Industry",
  }

  return abbreviations[industry] || industry.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

const getPrimaryProcess = (processes: string[]) => {
  return processes[0] || "FIN"
}

const getKPIIcon = (kpiId: string, kpiName: string) => {
  const iconMap: { [key: string]: any } = {
    // Financial KPIs
    ABR: UserMinus, // Absenteeism Rate
    ARO: TrendingUp, // Asset ROI
    AUR: Activity, // Asset Utilization Rate
    BV: Calculator, // Budget Variance
    CAC: UserPlus, // Customer Acquisition Cost
    CFF: Banknote, // Cash Flow from Operations
    CHR: UserX, // Customer Churn Rate
    CLV: Crown, // Customer Lifetime Value
    COR: Shield, // Combined Ratio
    COG: Package, // Cost of Goods Sold
    CSF: PiggyBank, // Cost Savings from Procurement
    CSS: Heart, // Customer Satisfaction Score
    CCR: FileCheck, // Contract Compliance Rate
    CPO: ShoppingBag, // Cost per Order
    CIR: Percent, // Cost-to-Income Ratio
    CST: Clock, // Claim Settlement Cycle Time
    CCC: RefreshCw, // Cash Conversion Cycle
    DPO: Calendar, // Days Payables Outstanding
    DTR: Plane, // On-Time Departure Rate
    DTE: Scale, // Debt-to-Equity Ratio
    DFA: Target, // Demand Forecast Accuracy
    DIO: Warehouse, // Days Inventory Outstanding
    DSO: CreditCard, // Days Sales Outstanding

    // Employee KPIs
    EES: Smile, // Employee Engagement Score
    ESS: ThumbsUp, // Employee Satisfaction Score
    ETR: UserMinus, // Employee Turnover Rate

    // Insurance KPIs
    EXR: Calculator, // Expense Ratio
    LAR: AlertTriangle, // Loss Ratio
    PNR: RotateCcw, // Policy Renewal Rate

    // Manufacturing KPIs
    FPY: CheckCircle, // First Pass Yield
    FCC: Calendar, // Financial Close Cycle Time
    IT: RotateCw, // Inventory Turnover
    IPT: FileText, // Invoice Processing Time
    MCT: Timer, // Manufacturing Cycle Time
    MTB: Zap, // Mean Time Between Failures
    MTCP: Wrench, // Maintenance Cost per Asset
    MTTR: Tool, // Mean Time to Repair
    OEE: Gauge, // Overall Equipment Effectiveness
    OCT: Clock, // Order Cycle Time
    OM: TrendingUp, // Operating Margin
    OFT: Truck, // Order Fulfillment Time
    OFR: CheckSquare, // Order Fill Rate
    OTD: Clock, // On-Time Delivery
    PSA: Calendar, // Production Schedule Adherence
    PCT: Timer, // Production Cycle Time
    QYR: Award, // Quality Yield Rate

    // Banking KPIs
    LDR: Building, // Loan-to-Deposit Ratio
    NIM: Percent, // Net Interest Margin
    NPL: AlertCircle, // Non-Performing Loan Ratio

    // Customer KPIs
    NPS: Star, // Net Promoter Score
    PAR: TrendingUp, // Product Adoption Rate
    SCR: Target, // Sales Conversion Rate
    SCA: ShoppingCart, // Shopping Cart Abandonment Rate

    // Innovation KPIs
    NRP: Lightbulb, // Percentage of Revenue from New Products
    RC: AlertTriangle, // Requirements Creep
    RDE: Beaker, // R&D Expense as Percentage of Sales
    TTM: Rocket, // Time to Market

    // Operational KPIs
    OCR: Home, // Occupancy Rate
    PCS: DollarSign, // Procurement Cost Savings
    P2R: FileText, // Purchase Order Cycle Time
    PRM: BarChart, // Project Margin
    RAR: RotateCcw, // Patient Readmission Rate
    RGR: TrendingUp, // Revenue Growth Rate
    ROA: TrendingUp, // Return on Assets
    ROE: Crown, // Return on Equity
    ROR: RotateCcw, // Rate of Returns
    RAC: Shield, // Risk Assessment Coverage
    RRR: Fuel, // Reserve Replacement Ratio

    // Service KPIs
    SAIDI: ZapIcon, // System Average Interruption Duration Index
    SIR: AlertTriangleIcon, // Safety Incident Rate
    SOT: TruckIcon, // Supplier On-Time Delivery
    SQR: StarIcon, // Supplier Quality Rating
    SPS: AwardIcon, // Supplier Performance Score
    SSS: StoreIcon, // Same-Store Sales Growth

    // Education KPIs
    GDR: GraduationCap, // Graduation Rate
    SFR: Users, // Student-Faculty Ratio

    // Training KPIs
    TE: BookOpen, // Training Effectiveness
    THP: Clock, // Training Hours per Employee
    TTF: UserPlus, // Time to Fill Position

    // Logistics KPIs
    TCP: TruckIcon, // Transportation Cost per Unit
    WU: WarehouseIcon, // Warehouse Utilization
    WCR: RotateCcw, // Working Capital Ratio

    // Industry-specific KPIs
    ATR: Users, // Attendance Rate
    AFR: Search, // Audit Finding Resolution Time
    BWR: Target, // Bid Win Rate
    IRT: ZapIcon, // Incident Response Time
    LMR: Heart, // Livestock Mortality Rate
    LFR: PlaneIcon, // Load Factor
    MSH: PieChart, // Market Share
    MS: AlertTriangleIcon, // Maverick Spending
  }

  return iconMap[kpiId] || BarChart
}

const getKPIDescription = (kpiId: string, kpiName: string) => {
  const enhancedDescriptions: { [key: string]: { description: string; businessValue: string[] } } = {
    "revenue-growth-rate": {
      description: "It is the percentage increase in revenue over a given time period.",
      businessValue: [
        "Drives market expansion and competitive strength",
        "Signals financial health and attracts investor confidence",
      ],
    },
    "operating-margin": {
      description: "It is the percentage of revenue remaining after paying for operating expenses.",
      businessValue: [
        "Indicates strong cost control and operational efficiency",
        "Higher margins enhance profitability and business resilience",
      ],
    },
    "cash-conversion-cycle": {
      description:
        "It is the number of days a company takes to turn its inventory and other resource investments into cash from sales.",
      businessValue: [
        "Shorter cycle improves liquidity and working capital",
        "Reduces need for external financing and associated costs",
      ],
    },
    "cost-of-goods-sold": {
      description: "It is the total direct costs of producing the goods or services that a company sells.",
      businessValue: [
        "Directly affects gross profit margins",
        "Lower costs enable competitive pricing and higher profitability",
      ],
    },
    "sales-conversion-rate": {
      description: "It is the percentage of prospective customers that ultimately make a purchase.",
      businessValue: [
        "Boosts revenue growth with efficient sales processes",
        "Indicates effective marketing and customer targeting",
      ],
    },
    "customer-acquisition-cost": {
      description: "It is the average cost to acquire a new customer.",
      businessValue: [
        "Lower cost increases profitability per customer",
        "Optimizes marketing spend and resource allocation",
      ],
    },
    "customer-lifetime-value": {
      description: "It is the total revenue a company can expect from a customer over the entire relationship.",
      businessValue: [
        "Increases total revenue per customer and profitability",
        "Guides customer retention and loyalty strategies",
      ],
    },
    "order-fulfillment-time": {
      description: "It is the time taken from receiving a customer order to delivering the product or service.",
      businessValue: ["Faster deliveries improve customer satisfaction", "Reduces backlogs and boosts repeat business"],
    },
    "overall-equipment-effectiveness": {
      description:
        "It is a percentage that measures manufacturing productivity by combining equipment availability, performance, and quality.",
      businessValue: ["Maximizes production output from assets", "Reduces downtime and operating costs"],
    },
    "production-cycle-time": {
      description: "It is the time it takes to complete a production process from start to finish.",
      businessValue: [
        "Faster production improves throughput and responsiveness",
        "Reduces lead times and inventory costs",
      ],
    },
    "quality-yield-rate": {
      description: "It is the percentage of output that meets quality standards on the first pass without rework.",
      businessValue: [
        "Minimizes waste and rework costs",
        "Ensures consistent product quality and customer satisfaction",
      ],
    },
    "inventory-turnover": {
      description: "It is the number of times inventory is sold or used in a given period.",
      businessValue: [
        "Reduces holding costs and frees up cash",
        "Indicates strong demand and efficient inventory management",
      ],
    },
    "employee-turnover-rate": {
      description: "It is the percentage of employees who leave and must be replaced in a given period.",
      businessValue: [
        "Retains experienced talent and reduces hiring costs",
        "Indicates a healthy workplace and engaged employees",
      ],
    },
    "time-to-fill-position": {
      description: "It is the average time to recruit and hire a candidate for an open position.",
      businessValue: [
        "Faster hiring minimizes productivity gaps",
        "Reduces recruitment costs and enables agile scaling",
      ],
    },
    "employee-satisfaction-score": {
      description: "It measures employee satisfaction and engagement within the organization.",
      businessValue: [
        "Improves productivity and employee retention",
        "Reflects positive company culture and employer brand",
      ],
    },
    "training-hours-per-employee": {
      description: "It is the average number of hours of training provided to each employee over a given period.",
      businessValue: ["Boosts workforce skills and job performance", "Supports employee development and career growth"],
    },
    "procurement-cost-savings": {
      description:
        "It is the percentage of cost savings achieved in procurement through negotiations and efficiencies.",
      businessValue: ["Directly improves profit margins", "Shows effective supplier negotiation and spend control"],
    },
    "supplier-performance-score": {
      description: "It is an index measuring how well suppliers meet expectations in quality, delivery, and service.",
      businessValue: [
        "Ensures reliable supply and consistent quality",
        "Strengthens supplier relationships and reduces disruptions",
      ],
    },
    "purchase-order-cycle-time": {
      description: "It is the time from issuing a purchase order to receiving the ordered goods or services.",
      businessValue: [
        "Faster procurement ensures timely availability of materials",
        "Improves supplier satisfaction and production continuity",
      ],
    },
    "contract-compliance-rate": {
      description:
        "It is the percentage of purchases or processes that adhere to agreed contract terms and supplier agreements.",
      businessValue: [
        "Ensures use of negotiated pricing and savings",
        "Reduces legal and supply risks through adherence to terms",
      ],
    },
    "time-to-market": {
      description: "It is the total time elapsed from initial concept to product launch.",
      businessValue: [
        "Faster product launches gain competitive advantage",
        "Captures market opportunities and adapts to customer needs sooner",
      ],
    },
    "percentage-of-revenue-from-new-products": {
      description:
        "It is the percentage of total company revenue generated by products launched within a recent period.",
      businessValue: [
        "Indicates successful innovation and product strategy",
        "Diversifies revenue streams and fuels growth",
      ],
    },
    "research-and-development-expense-as-percentage-of-sales": {
      description: "It is the total amount spent on research and development activities as a percentage of sales.",
      businessValue: [
        "Drives innovation for future products and services",
        "Demonstrates commitment to long-term growth and competitiveness",
      ],
    },
    "breakeven-time": {
      description:
        "It is the time required for a new product's cumulative revenue to equal its development and launch costs.",
      businessValue: [
        "Faster cost recovery reduces financial risk",
        "Informs project viability and investment decisions",
      ],
    },
    "requirements-creep": {
      description: "It is the percentage of new requirements added after the initial scope was defined.",
      businessValue: [
        "Minimizing scope changes prevents delays and overruns",
        "Indicates strong project discipline and planning",
      ],
    },
    "net-promoter-score": {
      description:
        "It measures customer loyalty and satisfaction based on how likely customers are to recommend the company.",
      businessValue: [
        "High score reflects loyal customers and repeat business",
        "Drives positive word-of-mouth and brand growth",
      ],
    },
    "product-adoption-rate": {
      description:
        "It is the rate at which new customers begin using a product or existing customers adopt new features.",
      businessValue: [
        "High adoption indicates strong market fit and product success",
        "Guides marketing focus and user onboarding improvements",
      ],
    },
  }

  const enhanced = enhancedDescriptions[kpiId]
  if (enhanced) {
    return { description: enhanced.description, businessValue: enhanced.businessValue }
  }

  // Fallback to original descriptions for KPIs not in enhanced data
  const descriptionMap: { [key: string]: string } = {
    // Financial KPIs
    ABR: "Measures the percentage of scheduled work time lost due to employee absences",
    ARO: "Evaluates the profitability and efficiency of asset investments",
    AUR: "Tracks how effectively assets are being used to generate revenue",
    BV: "Compares actual spending against budgeted amounts",
    CAC: "Cost required to acquire a new customer",
    CFF: "Cash generated from core business operations",
    CHR: "Percentage of customers who stop using services over time",
    CLV: "Total revenue expected from a customer relationship",
    COR: "Insurance profitability metric combining loss and expense ratios",
    COG: "Direct costs of producing goods sold by the company",
    CSF: "Total savings achieved through procurement optimization",
    CSS: "Customer satisfaction measurement and feedback scores",
    CCR: "Percentage of contracts meeting compliance requirements",
    CPO: "Average cost to process and fulfill customer orders",
    CIR: "Operating expenses as percentage of total income",
    CST: "Time taken to settle insurance claims",
    CCC: "Time to convert investments into cash flows",
    DPO: "Average days to pay supplier invoices",
    DTR: "Percentage of flights departing on schedule",
    DTE: "Financial leverage ratio comparing debt to equity",
    DFA: "Accuracy of demand forecasting models",
    DIO: "Average days inventory is held before sale",
    DSO: "Average days to collect receivables",

    // Employee KPIs
    EES: "Employee engagement and satisfaction levels",
    ESS: "Overall employee satisfaction with workplace",
    ETR: "Rate of employee departures from organization",

    // Insurance KPIs
    EXR: "Operating expenses as percentage of premiums",
    LAR: "Claims losses as percentage of premiums earned",
    PNR: "Percentage of policies renewed at expiration",

    // Manufacturing KPIs
    FPY: "Percentage of products passing quality checks first time",
    FCC: "Time required to complete financial closing process",
    IT: "How quickly inventory is sold and replaced",
    IPT: "Time to process supplier invoices",
    MCT: "Total time to manufacture a product",
    MTB: "Average time between equipment failures",
    MTCP: "Maintenance costs per asset over time",
    MTTR: "Average time to repair failed equipment",
    OEE: "Overall equipment effectiveness and productivity",
    OCT: "Time from order placement to completion",
    OM: "Operating profit as percentage of revenue",
    OFT: "Time to fulfill customer orders",
    OFR: "Percentage of orders filled completely",
    OTD: "Percentage of deliveries made on time",
    PSA: "Adherence to production schedules",
    PCT: "Time to complete production cycles",
    QYR: "Percentage of products meeting quality standards",

    // Banking KPIs
    LDR: "Loans as percentage of customer deposits",
    NIM: "Net interest income as percentage of assets",
    NPL: "Non-performing loans as percentage of total loans",

    // Customer KPIs
    NPS: "Customer loyalty and satisfaction measurement",
    PAR: "Rate of new product adoption by customers",
    SCR: "Percentage of leads converted to sales",
    SCA: "Percentage of shopping carts abandoned before purchase",

    // Innovation KPIs
    NRP: "Revenue percentage from products launched recently",
    RC: "Changes in project requirements over time",
    RDE: "R&D spending as percentage of total sales",
    TTM: "Time from concept to market launch",

    // Operational KPIs
    OCR: "Percentage of available space or capacity utilized",
    PCS: "Cost savings achieved through procurement",
    P2R: "Time to process purchase orders",
    PRM: "Profit margin on project deliverables",
    RAR: "Percentage of patients readmitted within timeframe",
    RGR: "Rate of revenue increase over time",
    ROA: "Profit generated per dollar of assets",
    ROE: "Return on shareholder equity investment",
    ROR: "Percentage of products returned by customers",
    RAC: "Coverage of risk assessment processes",
    RRR: "Rate of replacing depleted reserves",

    // Service KPIs
    SAIDI: "Average interruption duration per customer",
    SIR: "Rate of workplace safety incidents",
    SOT: "Percentage of supplier deliveries on time",
    SQR: "Quality rating of supplier performance",
    SPS: "Overall supplier performance measurement",
    SSS: "Sales growth at existing store locations",

    // Education KPIs
    GDR: "Percentage of students completing programs",
    SFR: "Ratio of students to faculty members",

    // Training KPIs
    TE: "Effectiveness of training programs delivered",
    THP: "Average training hours per employee",
    TTF: "Time to fill open positions",

    // Logistics KPIs
    TCP: "Transportation cost per unit shipped",
    WU: "Percentage of warehouse capacity utilized",
    WCR: "Working capital efficiency ratio",

    // Industry-specific KPIs
    ATR: "Percentage of expected attendance achieved",
    AFR: "Time to resolve audit findings",
    BWR: "Percentage of bids won versus submitted",
    IRT: "Time to respond to incidents",
    LMR: "Percentage of livestock mortality",
    LFR: "Percentage of aircraft capacity utilized",
    MSH: "Company's share of total market",
    MS: "Spending outside of preferred suppliers",
  }

  return { description: descriptionMap[kpiId] || `Performance metric for ${kpiName.toLowerCase()}`, businessValue: [] }
}

export default function KPICatalogContent() {
  const { kpis, addKPI } = useICStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKPI, setSelectedKPI] = useState<any>(null)
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set())
  const [selectedProcesses, setSelectedProcesses] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"tiles" | "table">("tiles")
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedKPIs")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const toggleBookmark = (kpiId: string) => {
    setBookmarkedKPIs((prev) => {
      const newBookmarks = prev.includes(kpiId) ? prev.filter((id) => id !== kpiId) : [...prev, kpiId]

      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarkedKPIs", JSON.stringify(newBookmarks))
      }

      return newBookmarks
    })
  }

  const filteredKPIs = useMemo(() => {
    return kpiCatalog.filter((kpi) => {
      const matchesSearch =
        kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesIndustry =
        selectedIndustries.size === 0 ||
        kpi.industries.some((ind) => selectedIndustries.has(ind)) ||
        (kpi.industries.includes("cross-industry") && selectedIndustries.size > 0)

      const matchesProcess =
        selectedProcesses.size === 0 || kpi.processes.some((proc) => selectedProcesses.has(proc.toUpperCase()))

      return matchesSearch && matchesIndustry && matchesProcess
    })
  }, [searchTerm, selectedIndustries, selectedProcesses])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedIndustries(new Set())
    setSelectedProcesses(new Set())
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      <aside className="space-y-4">
        {/* Search Filter */}
        <div className="premium-card p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="mb-3 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Search KPIs
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span style={{ color: "var(--text-muted)" }}>
              {filteredKPIs.length} / {kpiCatalog.length} results
            </span>
            <button
              onClick={clearAllFilters}
              className="px-2 py-1 rounded text-xs hover:bg-gray-100 transition-colors"
              style={{ color: "var(--blue-600)" }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Industries Filter */}
        <div className="premium-card p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="mb-3 text-sm font-medium" style={{ color: "var(--text)" }}>
            Industries
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {INDUSTRIES_MASTER.map((industry) => (
              <label key={industry.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIndustries.has(industry.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedIndustries)
                    if (e.target.checked) {
                      newSet.add(industry.id)
                    } else {
                      newSet.delete(industry.id)
                    }
                    setSelectedIndustries(newSet)
                  }}
                  className="rounded"
                />
                <span className="text-sm flex-1" style={{ color: "var(--text)" }}>
                  {industry.label}
                </span>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "var(--blue-100)", color: "var(--blue-700)" }}
                >
                  {industry.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Processes Filter */}
        <div className="premium-card p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="mb-3 text-sm font-medium" style={{ color: "var(--text)" }}>
            Processes
          </div>
          <div className="space-y-2">
            {PROCESSES_MASTER.map((process) => (
              <label key={process.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedProcesses.has(process.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedProcesses)
                    if (e.target.checked) {
                      newSet.add(process.id)
                    } else {
                      newSet.delete(process.id)
                    }
                    setSelectedProcesses(newSet)
                  }}
                  className="rounded"
                />
                <span className="text-sm flex-1" style={{ color: "var(--text)" }}>
                  {process.code} — {process.label}
                </span>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "var(--orange-100)", color: "var(--orange-700)" }}
                >
                  {process.count}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="space-y-6">
        <div
          className="premium-card p-4 flex items-center justify-between"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              KPI Catalog
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Showing {filteredKPIs.length} of {kpiCatalog.length} KPIs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("tiles")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "tiles" ? "text-white shadow-lg" : "hover:bg-gray-100"
                }`}
                style={{
                  background:
                    viewMode === "tiles"
                      ? "linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)"
                      : "transparent",
                }}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "table" ? "text-white shadow-lg" : "hover:bg-gray-100"
                }`}
                style={{
                  background:
                    viewMode === "table"
                      ? "linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)"
                      : "transparent",
                }}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "tiles" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKPIs.map((kpi) => {
              const primaryIndustry = getPrimaryIndustry(kpi.industries)
              const primaryProcess = getPrimaryProcess(kpi.processes)
              const industryColor =
                industryColors[primaryIndustry as keyof typeof industryColors] || industryColors["cross-industry"]
              const processColor = processColors[primaryProcess as keyof typeof processColors] || processColors["FIN"]
              const KPIIcon = getKPIIcon(kpi.id, kpi.name)

              return (
                <div
                  key={kpi.id}
                  onClick={() => setSelectedKPI(kpi)}
                  className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium text-white w-[100px] text-center inline-block"
                      style={{
                        background: industryColor.bg,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {getIndustryAbbreviation(primaryIndustry)}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      KPI-{kpi.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      <KPIIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                    </div>
                    <h3
                      className="font-medium text-sm line-clamp-2 flex-1 leading-tight min-h-[2.5rem] flex items-center"
                      style={{ color: "var(--text)" }}
                    >
                      {kpi.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4 min-h-[2rem] items-start">
                    {kpi.processes.slice(0, 2).map((process) => (
                      <span
                        key={process}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: "var(--surface)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {process}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 cursor-pointer z-10 relative"
                      style={{
                        backgroundColor: "var(--surface)",
                        color: "var(--text)",
                        border: "1px solid var(--border)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
                        e.currentTarget.style.backgroundColor = "var(--surface-hover)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
                        e.currentTarget.style.backgroundColor = "var(--surface)"
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedKPI(kpi)
                      }}
                    >
                      View Details
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors z-10 relative"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(kpi.id)
                        }}
                      >
                        <Bookmark
                          className="h-4 w-4"
                          style={{
                            color: bookmarkedKPIs.includes(kpi.id) ? "var(--blue-600)" : "var(--text-muted)",
                            fill: bookmarkedKPIs.includes(kpi.id) ? "var(--blue-600)" : "none",
                          }}
                        />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors z-10 relative">
                        <Share className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Table view for KPIs */
          <div
            className="premium-card overflow-auto"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text)" }}>
                    Name
                  </th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text)" }}>
                    Industries
                  </th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text)" }}>
                    Processes
                  </th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text)" }}>
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredKPIs.map((kpi) => (
                  <tr
                    key={kpi.id}
                    className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    style={{ borderColor: "var(--border)" }}
                    onClick={() => setSelectedKPI(kpi)}
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium" style={{ color: "var(--text)" }}>
                          {kpi.name}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          ID: {kpi.id}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {kpi.industries.slice(0, 2).map((industry) => (
                          <span
                            key={industry}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: "var(--blue-100)", color: "var(--blue-700)" }}
                          >
                            {industry === "cross-industry" ? "Cross-Industry" : industry.replace(/-/g, " ")}
                          </span>
                        ))}
                        {kpi.industries.length > 2 && <span className="text-xs">+{kpi.industries.length - 2}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {kpi.processes.map((process) => (
                          <span
                            key={process}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: "var(--orange-100)", color: "var(--orange-700)" }}
                          >
                            {process.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: "var(--green-100)", color: "var(--green-700)" }}
                      >
                        {getProcessCategory(kpi.processes)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedKPI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{ background: "var(--surface)" }}
            >
              {/* Modal Header */}
              <div
                className="sticky top-0 p-6 border-b flex items-center justify-between"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)" }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                      {selectedKPI.name} ({selectedKPI.id})
                    </h2>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Key Performance Indicator Details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedKPI(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Process Badges */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                    Processes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedKPI.processes.map((process: string) => (
                      <span
                        key={process}
                        className="px-3 py-2 rounded-lg font-medium"
                        style={{ background: "var(--orange-100)", color: "var(--orange-700)" }}
                      >
                        {process.toUpperCase()} -{" "}
                        {PROCESSES_MASTER.find((p) => p.id === process.toUpperCase())?.label || process}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industry Badges */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                    Industries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedKPI.industries.map((industry: string) => (
                      <span
                        key={industry}
                        className="px-3 py-2 rounded-lg font-medium"
                        style={{ background: "var(--blue-100)", color: "var(--blue-700)" }}
                      >
                        {industry === "cross-industry"
                          ? "Cross-Industry"
                          : INDUSTRIES_MASTER.find((i) => i.id === industry)?.label || industry.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* KPI Category */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                    Category
                  </h3>
                  <div
                    className="inline-block px-4 py-2 rounded-lg font-medium"
                    style={{ background: "var(--green-100)", color: "var(--green-700)" }}
                  >
                    {getProcessCategory(selectedKPI.processes)} KPI
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                    Description
                  </h3>
                  {(() => {
                    const kpiData = getKPIDescription(selectedKPI.id, selectedKPI.name)
                    if (typeof kpiData === "object" && kpiData.businessValue) {
                      return (
                        <div className="space-y-4">
                          <p style={{ color: "var(--text-muted)" }}>{kpiData.description}</p>
                          <div>
                            <h4 className="text-md font-semibold mb-2" style={{ color: "var(--text)" }}>
                              Business Value
                            </h4>
                            <ul className="space-y-2">
                              {kpiData.businessValue.map((value: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                  <span style={{ color: "var(--text-muted)" }}>{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <p style={{ color: "var(--text-muted)" }}>
                          {typeof kpiData === "string" ? kpiData : kpiData.description}
                        </p>
                      )
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredKPIs.length === 0 && (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            No KPIs found. Try adjusting your search or filters.
          </div>
        )}
      </main>
    </div>
  )
}
