// TODO: REPLACE with your real project data
import project1Img from "../assets/images/projects/project-1.png";

export const projects = [
  {
    id: 1,
    title: "SHIFTCOMP - Company Profile Website",
    image: project1Img,
    shortDesc:
      "Web-based academic management system for tracking student grades, attendance, and course schedules.",
    fullDesc:
      "A full-stack academic information system built for a university faculty. Features role-based access control (Admin, Lecturer, Student), real-time grade input, attendance tracking with QR codes, and automated GPA calculation. Integrated with the university's existing student database via REST API.",
    category: "Web App",
    tech: ["HTML", "CSS", "REACT"],
    github: "https://github.com/DaffaMunazzal/Company-Profile-Shift.com.git",
    demo: "https://shiftcomp.vercel.app/",
    year: "2026",
    featured: true,
  },
  {
    id: 2,
    title: "WasteTrack — Waste Management App",
    shortDesc:
      "Mobile-first web app for tracking and reporting community waste collection in real-time.",
    fullDesc:
      "A Progressive Web App (PWA) enabling communities to report waste pickup requests, track truck locations via GPS integration, and view analytics on waste volume per area. Built with a React frontend and Node.js backend, using MongoDB for flexible document storage.",
    category: "Web App",
    tech: ["React", "Node.js", "MongoDB", "Express", "PWA"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    year: "2024",
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
