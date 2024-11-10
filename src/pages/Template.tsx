import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Printer,
  Download,
} from "lucide-react";
import html2pdf from "html2pdf.js";

const ResumePDFTemplate = () => {
  const [resumeData, setResumeData] = React.useState(null);

  const contentRef = useRef();

  React.useEffect(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      setResumeData(JSON.parse(data));
    }
  }, []);

  //   const handlePrint = useReactToPrint({
  //     content: () => contentRef.current,
  //     documentTitle: "Resume",
  //     onBeforePrint: () => {
  //       const style = document.createElement("style");
  //       style.textContent = `
  //         @media print {
  //           @page {
  //             size: A4;
  //             margin: 0.5in;
  //           }
  //           body {
  //             -webkit-print-color-adjust: exact;
  //             color-adjust: exact;
  //           }
  //           .no-print {
  //             display: none !important;
  //           }
  //         }
  //       `;
  //       document.head.appendChild(style);
  //     },
  //     onAfterPrint: () => {
  //       const styles = document.head.querySelectorAll("style");
  //       styles.forEach((style) => {
  //         if (style.textContent.includes("@media print")) {
  //           document.head.removeChild(style);
  //         }
  //       });
  //     },
  //   });

  const handlePrint = () => {
    let printSection = document.getElementById("resumeContent");
    html2pdf().from(printSection).save();
  };

  if (!resumeData) {
    return <p>No resume data available in localStorage.</p>;
  }

  const {
    personalInfo,
    workExperience,
    education,
    skills,
    certifications,
    extracurriculars,
  } = resumeData;

  // Split skills into groups for better organization
  const skillGroups = skills.reduce((acc, skill, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(skill);
    return acc;
  }, []);

  return (
    <div className="relative">
      {/* Print/Download Buttons */}
      <div className="fixed top-4 right-4 flex gap-4 no-print z-10">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Printer size={16} />
          Print
        </button>
        <button
          onClick={handlePrint} // using the same function for PDF download
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={16} />
          Save as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div
        id="resumeContent"
        ref={contentRef}
        className="max-w-4xl mx-auto p-8 bg-white print-content"
      >
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{personalInfo.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Github size={14} />
              <span>{personalInfo.github}</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={14} />
              <span>{personalInfo.linkedin}</span>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">SUMMARY</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">SKILLS</h2>
          <div className="text-sm">
            {skillGroups.map((group, index) => (
              <div key={index} className="mb-1">
                {group.join(", ")}
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">WORK EXPERIENCE</h2>
          {workExperience.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-bold">{experience.companyName}</div>
                <div className="text-sm">
                  {experience.startDate} -{" "}
                  {experience.currentlyWorkHere
                    ? "Present"
                    : experience.endDate}
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-sm italic">{experience.roleTitle}</div>
                <div className="text-sm">{experience.location}</div>
              </div>
              <ul className="list-disc ml-4 text-sm">
                {experience.bulletPoints.map((point, i) => (
                  <li key={i} className="mb-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between mb-1">
                <div className="font-bold">{edu.institution}</div>
                <div className="text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm">{edu.certification}</div>
                <div className="text-sm">GPA: {edu.gpa}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Certifications Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">CERTIFICATIONS</h2>
          <ul className="list-none">
            {certifications.map((cert, index) => (
              <li key={index} className="text-sm mb-1">
                • {cert.title}
              </li>
            ))}
          </ul>
        </section>

        {/* EXTRACURRICULAR Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">EXTRACURRICULAR</h2>
          {extracurriculars.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-bold">{experience.companyName}</div>
                <div className="text-sm">
                  {experience.startDate} -{" "}
                  {experience.currentlyWorkHere
                    ? "Present"
                    : experience.endDate}
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-sm italic">{experience.roleTitle}</div>
                <div className="text-sm">{experience.location}</div>
              </div>
              <ul className="list-disc ml-4 text-sm">
                {experience.bulletPoints.map((point, i) => (
                  <li key={i} className="mb-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ResumePDFTemplate;
