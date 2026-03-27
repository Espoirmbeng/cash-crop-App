import { Header } from "../../components/layout/Header";
import { SubNav } from "../../components/layout/SubNav";
import { Footer } from "../../components/layout/Footer";

export default function PublicRouteLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <SubNav />
      <main className="content-shell py-8 lg:py-10">{children}</main>
      <Footer />
    </div>
  );
}
