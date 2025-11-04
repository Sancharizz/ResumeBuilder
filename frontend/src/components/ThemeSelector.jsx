import React, { useEffect, useRef, useState } from "react";
import { DUMMY_RESUME_DATA, resumeTemplates } from "../utils/data";
import Tabs from "./Tabs";
import { Check } from "lucide-react";
import { TemplateCard } from "./Cards";
import RenderResume from "./RenderResume";

const TAB_DATA = [{ label: "Templates" }];

const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {
  const resumeRef = useRef(null);
  const [basewidth, setBaseWidth] = useState(800);

  const initialIndex = resumeTemplates.findIndex((t) => t.id === selectedTheme);
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme || resumeTemplates[0]?.id || "",
    index: initialIndex >= 0 ? initialIndex : 0,
  });

  const [tabValue, setTabValue] = useState("Templates");

  const handleThemeSelection = () => {
    setSelectedTheme(selectedTemplate.theme);
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 
          p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100"
        >
          <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
          <button
            onClick={handleThemeSelection}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 
            bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-2xl 
            hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            <Check size={18} /> Apply Changes
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start justify-between">
          {/* Left Side - Template List */}
          <div className="w-full lg:w-[38%] bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto p-2">
              {resumeTemplates.map((template, index) => (
                <TemplateCard
                  key={`templates_${index}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate.index === index}
                  onSelect={() =>
                    setSelectedTemplate({
                      theme: template.id,
                      index,
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* Right Side - Preview */}
          <div
            className="w-full lg:flex-1 flex justify-center lg:justify-end items-start"
            ref={resumeRef}
          >
            <div className="w-full max-w-[850px] bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
              <RenderResume
                templateId={selectedTemplate?.theme || ""}
                resumeData={resumeData || DUMMY_RESUME_DATA}
                containerWidth={basewidth}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
