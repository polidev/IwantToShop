import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const Header = lazy(() => import("./components/layout/Header.jsx"));
const Home = lazy(() => import("./pages/home.jsx"));
const Cart = lazy(() => import("./pages/cart.jsx"));
const Error = lazy(() => import("./pages/error.jsx"));
const Footer = lazy(() => import("./components/layout/Footer.jsx"));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
