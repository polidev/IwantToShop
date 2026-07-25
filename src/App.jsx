import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const Header = lazy(() => import("./components/layout/Header.jsx"));
const Home = lazy(() => import("./pages/home.jsx"));
const Cart = lazy(() => import("./pages/cart.jsx"));
const Error = lazy(() => import("./pages/error.jsx"));
const Footer = lazy(() => import("./components/layout/Footer.jsx"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-canvas">
          <p className="text-sm text-ink-faint">Loading...</p>
        </div>
      }
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
