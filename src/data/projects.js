// TODO: REPLACE with your real project data
import project1Img from "../assets/images/projects/project-1.png";

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
    shortDesc:
      "A website dashboard built to display Formula 1 data and statistics in every season.",
    fullDesc:
      "A dashboard built to display Formula 1 data and statistics in every season. Built with a React frontend and Tailwind CSS.",
    category: "Web App",
    tech: ["React", "Tailwind CSS", "Python", "Node.js"],
    github: "https://github.com/DaffaMunazzal/F1-Analyst-Dasboard.git",
    demo: "https://f1-analyst-dashboard.vercel.app/",
    year: "2026",
    featured: true,
  },
  {
    id: 3,
    title: "E-Commerce Dashboard Analytics",
    shortDesc:
      "Data visualization dashboard for analyzing sales trends, customer behavior, and inventory metrics.",
    fullDesc:
      "An interactive analytics dashboard built for a local SME. Visualizes sales data with charts (Chart.js), customer segmentation using K-Means clustering (Python/scikit-learn), and provides AI-powered product recommendations. Exports reports to PDF/Excel.",
    category: "Data Analysis",
    tech: ["Python", "Pandas", "Chart.js", "Flask", "scikit-learn"],
    github: "https://github.com",
    demo: null,
    year: "2023",
    featured: false,
  },
  {
    id: 4,
    title: "UrbanEats — Food Delivery App UI",
    shortDesc:
      "High-fidelity UI/UX design for a food delivery super-app targeting urban millennials.",
    fullDesc:
      "End-to-end UI/UX design project: from user research and personas, to wireframes, to a polished high-fidelity Figma prototype with 40+ screens. Includes a complete design system, micro-interaction specifications, and usability testing report with 15 participants.",
    category: "UI/UX",
    tech: ["Figma", "FigJam", "Prototyping", "User Research"],
    github: null,
    demo: "https://figma.com",
    year: "2024",
    featured: true,
  },
  {
    id: 5,
    title: "Campus Event Management System",
    shortDesc:
      "Full-stack web app for managing campus events, registrations, and attendee ticketing.",
    fullDesc:
      "A comprehensive event management platform for the student association. Features event creation, online registration, digital ticketing with QR code verification, and a real-time attendance dashboard. Supports multiple event categories and sends automated email reminders.",
    category: "Web App",
    tech: ["PHP", "Laravel", "MySQL", "Bootstrap", "jQuery"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "Student Mental Health Analysis",
    shortDesc:
      "Data analysis project examining correlations between academic workload and student wellbeing.",
    fullDesc:
      "A research-driven data analysis project using survey data from 200+ students. Applies statistical analysis (correlation, regression) and visualization to identify key stress factors. Findings were presented at the campus research symposium and produced 3 evidence-based recommendations.",
    category: "Data Analysis",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "SPSS"],
    github: "https://github.com",
    demo: null,
    year: "2023",
    featured: false,
  },
];

export const projectCategories = ["All", "Web App", "Data Analysis", "UI/UX"];
