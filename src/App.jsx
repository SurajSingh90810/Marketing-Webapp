import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    productName: "",
    features: "",
    audience: "",
    platform: "Instagram",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // It will try to use the environment variable first (for local dev)
      // If it doesn't exist (like on Vercel), it defaults to your live Render URL
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "https://marketing-webapp-z0hb.onrender.com";

      const response = await axios.post(`${apiUrl}/api/generate-caption`, data);
      setResult(response.data.caption);
    } catch (error) {
      console.error(error);
      setResult("Error generating caption. Please check the backend console.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6 text-slate-100">
      {/* Main Card with Glassmorphism */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-xl">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2 text-center">
          Ad Architect
        </h1>
        <p className="text-slate-400 text-center mb-8 font-light italic">
          Generate premium ad copy in seconds.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inputs styled with subtle borders and focus glows */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Product Name
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="e.g., Luxury Watch"
              onChange={(e) =>
                setData({ ...data, productName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Target Audience
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="e.g., High-Net-Worth Individuals"
              onChange={(e) => setData({ ...data, audience: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Features
            </label>
            <textarea
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-24 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="List key benefits..."
              onChange={(e) => setData({ ...data, features: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Platform
            </label>
            <select
              className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl focus:border-amber-500 outline-none transition-all"
              onChange={(e) => setData({ ...data, platform: e.target.value })}
            >
              <option>Instagram</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-amber-500/20"
          >
            {loading ? "Crafting Copy..." : "Generate Royal Ad"}
          </button>
        </form>

        {/* Result Area */}
        {result && (
          <div className="mt-8 p-6 bg-black/30 rounded-2xl border border-white/5 relative group">
            <h3 className="text-amber-500 font-bold mb-2 flex items-center gap-2">
              Generated Captions
            </h3>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
              {result}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
