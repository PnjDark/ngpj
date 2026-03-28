import React from "react";

export default function CaseStudyView({ caseStudy }) {
  if (!caseStudy) return null;

  return (
    <div className="space-y-16">
      <section>
        <h3 className="text-2xl font-bold mb-6 text-neutral-400">Problem</h3>
        <p className="text-xl leading-relaxed text-neutral-300">
          {caseStudy.problem}
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6 text-neutral-400">Approach</h3>
        <p className="text-xl leading-relaxed text-neutral-300">
          {caseStudy.approach}
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6 text-neutral-400">Process</h3>
        <p className="text-xl leading-relaxed text-neutral-300">
          {caseStudy.process}
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6 text-neutral-400">Outcome</h3>
        <p className="text-xl leading-relaxed text-neutral-300 font-bold text-white italic">
          "{caseStudy.outcome}"
        </p>
      </section>

      {caseStudy.richContent && caseStudy.richContent.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold mb-8 text-neutral-400">Gallery & Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.richContent.map((content, index) => (
              <div key={index} className="relative aspect-video bg-neutral-800 rounded-xl overflow-hidden">
                {content.type === 'image' ? (
                  <img src={content.url} alt={`Gallery item ${index}`} className="w-full h-full object-cover" />
                ) : content.type === 'video' ? (
                  <video src={content.url} controls className="w-full h-full object-cover" />
                ) : (
                  <p className="p-6 text-neutral-400">{content.text}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
