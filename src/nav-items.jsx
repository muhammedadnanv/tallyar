
import { HomeIcon, FileTextIcon, ReceiptIcon, SettingsIcon, CreditCardIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import CreateInvoice from "./pages/CreateInvoice.jsx";
import TemplatePage from "./pages/TemplatePage.jsx";
import ReceiptPage from "./pages/ReceiptPage.jsx";
import Settings from "./pages/Settings.jsx";
import Billing from "./pages/Billing.jsx";

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
];
