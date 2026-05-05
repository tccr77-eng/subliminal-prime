import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { AnnouncementProvider, useAnnouncement } from "./contexts/AnnouncementContext";
import Navigation from "./components/Navigation";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Bundles from "./pages/Bundles";
import About from "./pages/About";
import TheScience from "./pages/TheScience";
import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import HowToUse from "./pages/HowToUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";

const ANNOUNCEMENT_H = 40;
const NAV_H = 72; // max nav height (desktop)

function Router() {
  const { visible: announcementVisible } = useAnnouncement();
  // Total fixed header height — used to push page content below the fixed bars
  const headerOffset = (announcementVisible ? ANNOUNCEMENT_H : 0) + NAV_H;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#faf9f7" }}>
      {/* Fixed bars — rendered outside normal flow */}
      <AnnouncementBar />
      <Navigation />

      {/* Spacer so content starts below the fixed header */}
      <div style={{ height: `${headerOffset}px`, flexShrink: 0 }} />

      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/bundles" component={Bundles} />
          <Route path="/about" component={About} />
          <Route path="/the-science" component={TheScience} />
          <Route path="/faq" component={FAQ} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          <Route path="/how-to-use" component={HowToUse} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AnnouncementProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster position="bottom-right" richColors />
              <Router />
            </TooltipProvider>
          </CartProvider>
        </AnnouncementProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
