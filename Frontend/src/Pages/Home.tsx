// HomePage.tsx
import hero from "../assets/image.png"
export default function HomePage() {
  return (
    <div className="bg-[#e6ffe6] min-h-screen font-sans">
      {/* Removed Header */}

      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-24 bg-[#ccffcc] border-b-4 border-black">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-6xl font-black leading-tight text-black">
            Your Next <br /> Opportunity Starts Here.
          </h1>
          <p className="text-xl text-gray-900 font-medium">
            Discover the job that fuels your passion or post one to find the perfect talent.
          </p>
          <div className="space-x-4">
            <button className="bg-black text-white px-6 py-3 rounded hover:scale-105 transition-transform">
              Browse Jobs
            </button>
            <button className="bg-white border-2 border-black text-black px-6 py-3 rounded hover:bg-gray-100 hover:scale-105 transition-transform">
              Post a Job
            </button>
          </div>
        </div>
<img
  src={hero}
  alt="hero"
  className="w-[30%] h-[30%] md:w-80 md:h-80 mt-10 md:mt-0 object-cover rounded-full drop-shadow-xl mr-[10%]"
/>

      </section>

      <section className="py-20 px-10 bg-[#f4fff4] border-b-4 border-black">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {["Create Account", "Set Up Profile", "Apply or Post Jobs"].map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-lg border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <div className="text-5xl font-extrabold mb-4 text-[#00e676]">{i + 1}</div>
              <h3 className="text-2xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#ccffcc] py-20 px-10 border-b-4 border-black">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-black">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["IT", "Finance", "Education", "Healthcare"].map((cat, i) => (
            <div
              key={i}
              className="bg-white border-4 border-black p-6 rounded-lg hover:bg-black hover:text-white cursor-pointer transition-all font-semibold shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white text-center py-8">
        <p className="text-md">&copy; 2025 Nottingham Building Society. All rights reserved.</p>
      </footer>
    </div>
  );
}
