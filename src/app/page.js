"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import SkillFilter from "@/components/portfolio/SkillFilter";
import { getProjects } from "@/services/projects";
import { getSkills } from "@/services/skills";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await getProjects();
        const fetchedSkills = await getSkills();
        setProjects(fetchedProjects);
        setSkills(fetchedSkills);
        setFilteredProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      <header className="container mx-auto py-12 px-6 flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">PENJY PORTFOLIO</h1>
        <p className="text-xl text-neutral-400 max-w-2xl mb-8">
          A dynamic, modular digital experience designed to present multiple professional identities.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition">
            Explore Work
          </button>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white/10 transition">
            Contact Me
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">My Work</h2>
          <SkillFilter
            categories={["All", "Developer", "Designer", "Artist"]}
            activeCategory={activeCategory}
            onFilter={handleFilter}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <p className="text-neutral-500 col-span-full text-center py-12">No projects found for this category.</p>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill.id} className="px-4 py-2 bg-neutral-800 rounded-lg text-sm border border-neutral-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-12 text-center text-neutral-500">
        <p>&copy; {new Date().getFullYear()} Penjy Portfolio Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
