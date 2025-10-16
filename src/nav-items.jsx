
import { HomeIcon, FileTextIcon, ReceiptIcon, SettingsIcon, CreditCardIcon, History as HistoryIcon, LogInIcon, Package, Zap } from "lucide-react";
import Index from "./pages/Index.jsx";
import CreateInvoice from "./pages/CreateInvoice.jsx";
import TemplatePage from "./pages/TemplatePage.jsx";
import ReceiptPage from "./pages/ReceiptPage.jsx";
import Settings from "./pages/Settings.jsx";
import Billing from "./pages/Billing.jsx";
import Auth from "./pages/Auth.jsx";
import History from "./pages/History.jsx";
import Products from "./pages/Products.jsx";
import POSQuickSale from "./pages/POSQuickSale.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Create Invoice",
    to: "/create-invoice",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <CreateInvoice />,
  },
  {
    title: "POS Quick Sale",
    to: "/pos-quick-sale",
    icon: <Zap className="h-4 w-4" />,
    page: <POSQuickSale />,
  },
  {
    title: "Products",
    to: "/products",
    icon: <Package className="h-4 w-4" />,
    page: <Products />,
  },
  {
    title: "Template",
    to: "/template",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <TemplatePage />,
  },
  {
    title: "Receipt",
    to: "/receipt",
    icon: <ReceiptIcon className="h-4 w-4" />,
    page: <ReceiptPage />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
  },
  {
    title: "Billing",
    to: "/billing",
    icon: <CreditCardIcon className="h-4 w-4" />,
    page: <Billing />,
  },
  {
    title: "Auth",
    to: "/auth",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Auth />,
  },
  {
    title: "History",
    to: "/history",
    icon: <HistoryIcon className="h-4 w-4" />,
    page: <History />,
  },
  {
    title: "Download",
    to: "/download",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <TemplatePage />,
  },
];
