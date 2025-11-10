import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Page({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      <main className="w-[90%] m-auto mt-6">
        {children}
      </main>

      <Footer />
    </div>
  )
}