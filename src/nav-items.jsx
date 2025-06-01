
import Index from "./pages/Index.jsx";
import CreateInvoice from "./pages/CreateInvoice.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    page: <Index />,
  },
  {
    title: "Create Invoice",
    to: "/create-invoice",
    page: <CreateInvoice />,
  },
];
