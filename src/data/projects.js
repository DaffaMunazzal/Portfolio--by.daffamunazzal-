// TODO: REPLACE with your real project data
import project1Img from "../assets/images/projects/project-1.png";
import project2Img from "../assets/images/projects/project-2.png";

export const projects = [
  {
    id: 1,
    title: "SHIFTCOMP - Company Profile Website",
    image: project1Img,
    shortDesc:
      "A company profile website for a computer and hardware store called SHIFTCOMP.",
    fullDesc:
      "SHIFTCOMP is a modern company profile website built for a computer hardware and accessories retailer. Built with React and Tailwind CSS featuring interactive product showcases and sleek modern styling.",
    category: "Web App",
    tech: ["HTML", "CSS", "REACT"],
    github: "https://github.com/DaffaMunazzal/Company-Profile-Shift.com.git",
    demo: "https://shiftcomp.vercel.app/",
    year: "2026",
    featured: true,
  },
  {
    id: 2,
    title: "F1 DASHBOARD ANALYTICS",
    image: project2Img,
    shortDesc:
      "A website dashboard built to display Formula 1 data and statistics in every season.",
    fullDesc:
      "A dashboard built to display Formula 1 data and statistics in every season. Built with a React frontend and Tailwind CSS.",
    category: "Data Analysis",
    tech: ["React", "Tailwind CSS", "Python", "Node.js"],
    github: "https://github.com/DaffaMunazzal/F1-Analyst-Dasboard.git",
    demo: "https://f1-analyst-dashboard.vercel.app/",
    year: "2026",
    featured: true,
  },
];

export const projectCategories = ["All", "Web App", "Data Analysis", "UI/UX"];
