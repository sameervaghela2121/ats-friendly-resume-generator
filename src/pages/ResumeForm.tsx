import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import CertificationForm from "../components/CertificationForm";
import ExtracurricularForm from "../components/ExtracurricularForm";

interface Education {
  institution: string;
  certification: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface WorkExperience {
  companyName: string;
  roleTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  currentlyWorkHere: boolean;
  bulletPoints: string[];
}

interface Extracurricular {
  companyName: string;
  roleTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  bulletPoints: string[];
}

interface Certification {
  title: string;
  description: string;
}

function ResumeForm() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      companyName: "",
      roleTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      currentlyWorkHere: false,
      bulletPoints: [""],
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      institution: "",
      certification: "",
      startDate: "",
      endDate: "",
      gpa: "",
    },
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([
    {
      companyName: "",
      roleTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      bulletPoints: [""],
    },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { title: "", description: "" },
  ]);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string | boolean
  ) => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[index] = {
      ...newWorkExperiences[index],
      [field]: value,
    };
    setWorkExperiences(newWorkExperiences);
  };

  const handleBulletPointChange = (
    expIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[expIndex].bulletPoints[bulletIndex] = value;
    setWorkExperiences(newWorkExperiences);
  };

  const addBulletPoint = (expIndex: number) => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[expIndex].bulletPoints.push("");
    setWorkExperiences(newWorkExperiences);
  };

  const removeBulletPoint = (expIndex: number, bulletIndex: number) => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[expIndex].bulletPoints = newWorkExperiences[
      expIndex
    ].bulletPoints.filter((_, index) => index !== bulletIndex);
    setWorkExperiences(newWorkExperiences);
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        companyName: "",
        roleTitle: "",
        startDate: "",
        endDate: "",
        location: "",
        currentlyWorkHere: false,
        bulletPoints: [""],
      },
    ]);
  };

  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        certification: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleCertificationChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [name]: value,
    };
    setCertifications(newCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: "", description: "" }]);
  };

  const removeCertification = (index: number) => {
    const newCertifications = certifications.filter(
      (_, certIndex) => certIndex !== index
    );
    setCertifications(newCertifications);
  };

  const handleExtracurricularChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newExtracurriculars = [...extracurriculars];
    newExtracurriculars[index] = {
      ...newExtracurriculars[index],
      [name]: value,
    };
    setExtracurriculars(newExtracurriculars);
  };

  const handleBulletPointChangeExtracurricularForm = (
    index: number,
    bulletIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newExtracurriculars = [...extracurriculars];
    newExtracurriculars[index].bulletPoints[bulletIndex] = event.target.value;
    setExtracurriculars(newExtracurriculars);
  };

  const addExtracurricular = () => {
    setExtracurriculars([
      ...extracurriculars,
      {
        companyName: "",
        roleTitle: "",
        startDate: "",
        endDate: "",
        location: "",
        bulletPoints: [""],
      },
    ]);
  };

  const removeExtracurricular = (index: number) => {
    const newExtracurriculars = extracurriculars.filter(
      (_, extIndex) => extIndex !== index
    );
    setExtracurriculars(newExtracurriculars);
  };

  const addBulletPointExtracurricularForm = (index: number) => {
    const newExtracurriculars = [...extracurriculars];
    newExtracurriculars[index].bulletPoints.push("");
    setExtracurriculars(newExtracurriculars);
  };

  const removeBulletPointExtracurricularForm = (
    index: number,
    bulletIndex: number
  ) => {
    const newExtracurriculars = [...extracurriculars];
    newExtracurriculars[index].bulletPoints = newExtracurriculars[
      index
    ].bulletPoints.filter((_, i) => i !== bulletIndex);
    setExtracurriculars(newExtracurriculars);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      personalInfo,
      workExperiences,
      education,
      skills,
      extracurriculars,
      certifications,
    });
    localStorage.setItem(
      "resume",
      JSON.stringify({
        personalInfo,
        workExperiences,
        education,
        skills,
        extracurriculars,
        certifications,
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Personal Information */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={personalInfo.github}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={personalInfo.location}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              name="summary"
              value={personalInfo.summary}
              onChange={handlePersonalInfoChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </section>

        {/* Work Experience */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Work Experience</h2>
            <button
              type="button"
              onClick={addWorkExperience}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </button>
          </div>

          {workExperiences.map((exp, expIndex) => (
            <div key={expIndex} className="mb-8 p-4 border rounded-lg">
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => removeWorkExperience(expIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "companyName",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={exp.roleTitle}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "roleTitle",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "endDate",
                        e.target.value
                      )
                    }
                    disabled={exp.currentlyWorkHere}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "location",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorkHere}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        expIndex,
                        "currentlyWorkHere",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bullet Points
                </label>
                {exp.bulletPoints.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) =>
                        handleBulletPointChange(
                          expIndex,
                          bulletIndex,
                          e.target.value
                        )
                      }
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Add achievement or responsibility"
                    />
                    <button
                      type="button"
                      onClick={() => removeBulletPoint(expIndex, bulletIndex)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBulletPoint(expIndex)}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bullet Point
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Education</h2>
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </button>
          </div>

          {education.map((edu, index) => (
            <div key={index} className="mb-8 p-4 border rounded-lg">
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Certification
                  </label>
                  <input
                    type="text"
                    value={edu.certification}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "certification",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleEducationChange(index, "startDate", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleEducationChange(index, "endDate", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    GPA
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) =>
                      handleEducationChange(index, "gpa", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex gap-2 flex-wrap mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Certifications</h2>
              <button
                type="button"
                onClick={addCertification}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {certifications.map((cert, index) => (
                <div key={index} className="mb-8 p-4 border rounded-lg w-full">
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      name="title"
                      value={cert.title}
                      placeholder="Certification Title"
                      onChange={(e) => handleCertificationChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      name="description"
                      value={cert.description}
                      placeholder="Description"
                      onChange={(e) => handleCertificationChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Extracurricular Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Extracurricular</h2>
              <button
                type="button"
                onClick={addExtracurricular}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {extracurriculars.map((ext, index) => (
                <div key={index} className="mb-8 p-4 border rounded-lg w-full">
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => removeExtracurricular(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      name="companyName"
                      value={ext.companyName}
                      placeholder="Company Name"
                      onChange={(e) => handleExtracurricularChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      name="roleTitle"
                      value={ext.roleTitle}
                      placeholder="Role Title"
                      onChange={(e) => handleExtracurricularChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="month"
                      name="startDate"
                      value={ext.startDate}
                      onChange={(e) => handleExtracurricularChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    <input
                      type="month"
                      name="endDate"
                      value={ext.endDate}
                      onChange={(e) => handleExtracurricularChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      name="location"
                      value={ext.location}
                      placeholder="Location"
                      onChange={(e) => handleExtracurricularChange(index, e)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Bullet Points</h3>
                    <div className="my-2 flex flex-wrap">
                      {ext.bulletPoints.map((point, bulletIndex) => (
                        <div key={bulletIndex} className="flex w-full mb-2">
                          <input
                            type="text"
                            value={point}
                            placeholder="Bullet Point"
                            onChange={(e) =>
                              handleBulletPointChangeExtracurricularForm(
                                index,
                                bulletIndex,
                                e
                              )
                            }
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeBulletPointExtracurricularForm(
                                index,
                                bulletIndex
                              )
                            }
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addBulletPointExtracurricularForm(index)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 mb-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Bullet Point
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;
