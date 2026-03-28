"use client";

import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Palette,
  Eye,
  Activity,
  Save
} from "lucide-react";

export default function AdminSettings() {
  const [config, setConfig] = useState({
    enabledSections: ["projects", "case-studies", "skills", "contact"],
    featuredProjects: [],
    homepageLayout: "Grid",
    animationIntensity: "medium"
  });

  const handleToggleSection = (section) => {
    setConfig(prev => ({
      ...prev,
      enabledSections: prev.enabledSections.includes(section)
        ? prev.enabledSections.filter(s => s !== section)
        : [...prev.enabledSections, section]
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-neutral-500">Configure your portfolio's visual and functional experience.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-blue-500" />
            <h2 className="text-xl font-bold">Enabled Sections</h2>
          </div>
          {["projects", "case-studies", "skills", "contact"].map(section => (
            <label key={section} className="flex items-center justify-between p-4 bg-neutral-800 rounded-xl cursor-pointer hover:bg-neutral-700 transition">
              <span className="capitalize font-semibold">{section.replace("-", " ")}</span>
              <input
                type="checkbox"
                checked={config.enabledSections.includes(section)}
                onChange={() => handleToggleSection(section)}
                className="w-5 h-5 rounded border-neutral-600 bg-neutral-700"
              />
            </label>
          ))}
        </div>

        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-xl space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-purple-500" />
              <h2 className="text-xl font-bold">Visual Configuration</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neutral-400">Homepage Layout</label>
              <select
                value={config.homepageLayout}
                onChange={(e) => setConfig({ ...config, homepageLayout: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/10"
              >
                <option value="Grid">Grid Layout</option>
                <option value="List">List Layout</option>
                <option value="Full">Full Screen Scroll</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neutral-400">Animation Intensity</label>
              <div className="flex gap-2">
                {["low", "medium", "high"].map(intensity => (
                  <button
                    key={intensity}
                    onClick={() => setConfig({ ...config, animationIntensity: intensity })}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold border transition ${
                      config.animationIntensity === intensity
                        ? "bg-white text-black border-white"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {intensity.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
            >
              <Save size={18} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
