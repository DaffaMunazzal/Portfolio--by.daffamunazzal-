/* src/data/locales/en.js
   ==========================================================================
   ENGLISH CONTENT
   You can customize all portfolio text in English in this file.
   ========================================================================== */

export default {
  // ─── NAVIGATION ───
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    decoration: "Information Systems Portfolio",
  },

  // ─── HERO SECTION ───
  hero: {
    role: "Information Systems Student",
    nameLine1: "DAFFA",
    nameLine2: "MUNAZZAL",
    tagline: "BUILD. THINK. DEPLOY.",
  },

  // ─── ABOUT SECTION ───
  about: {
    sectionLabel: "About Me",
    title: "WHO I",
    outlineTitle: "AM",
    bio: {
      name: "Muhammad Daffa Oemarqois Munazzal",
      university: "Widya Pratama Institute",
      major: "Information Systems",
      year: "3rd Semester, Class of 2025",
      interests: "Web Development, Database Management Systems, Machine Learning, UI/UX Design, and Data Analytics",
      value: "Programming is not just a technology, but it's a lifestyle",
      story1: "Hello Everyone! My name is {name}, an {major} student at {university} ({year}).",
      story2: "My interests include {interests}. I enjoy transforming complex business problems into elegant and efficient digital solutions.",
    },
    stats: [
      { value: 12, suffix: "+", label: "Projects Completed" },
      { value: 3, suffix: "", label: "Active Semesters" },
      { value: 7, suffix: "+", label: "Technologies Mastered" },
      { value: 3, suffix: "x", label: "Certifications Earned" },
    ],
  },

  // ─── SKILLS SECTION ───
  skills: {
    sectionLabel: "My Skills",
    title: "WHAT I",
    outlineTitle: "KNOW",
    groupTitles: {
      programming: "Programming & Development",
      database: "Database & Systems",
      analysis: "Analysis & Management",
      tools: "Tools & Design",
    },
  },

  // ─── PROJECTS SECTION ───
  projects: {
    sectionLabel: "My Work",
    title: "SELECTED",
    outlineTitle: "PROJECTS",
    viewDetails: "View Details →",
    featured: "Featured",
    view: "View",
    allCategory: "All",
    categories: ["All", "Web App", "Data Analysis", "UI/UX"],
    items: {
      1: {
        title: "SHIFTCOMP - Company Profile Website",
        shortDesc: "A company profile website for a computer and hardware store called SHIFTCOMP.",
        fullDesc: "SHIFTCOMP is a modern company profile website built for a computer hardware and accessories retailer. Built with React and Tailwind CSS featuring interactive product showcases and sleek modern styling.",
      },
      2: {
        title: "F1 DASHBOARD ANALYTICS",
        shortDesc: "A website dashboard built to display Formula 1 data and statistics in every season.",
        fullDesc: "A dashboard built to display Formula 1 data and statistics in every season. Built with a React frontend and Tailwind CSS.",
      },
      3: {
        title: "E-Commerce Analytics Dashboard",
        shortDesc: "Data visualization dashboard for analyzing sales trends, customer behavior, and inventory metrics.",
        fullDesc: "An interactive analytics dashboard built for a local SME. Visualizes sales data with charts (Chart.js), customer segmentation using K-Means clustering (Python/scikit-learn), and provides AI-powered product recommendations.",
      },
      4: {
        title: "UrbanEats — Food Delivery App UI",
        shortDesc: "High-fidelity UI/UX design for a food delivery super-app targeting urban millennials.",
        fullDesc: "End-to-end UI/UX design project: from user research and personas to wireframes and a polished high-fidelity Figma prototype with 40+ screens. Includes a complete design system and usability testing report.",
      },
      5: {
        title: "Campus Event Management System",
        shortDesc: "Full-stack web app for managing campus event registrations and attendee ticketing.",
        fullDesc: "A comprehensive event management platform for the student association. Features event creation, online registration, digital ticketing with QR code verification, and a real-time attendance dashboard.",
      },
      6: {
        title: "Student Mental Health Analysis",
        shortDesc: "Data analysis project examining correlations between academic workload and student wellbeing.",
        fullDesc: "A research-driven data analysis project using survey data from 200+ students. Applies statistical analysis (correlation, regression) and visualization to identify key stress factors. Presented at the campus research symposium.",
      },
    },
  },

  // ─── EXPERIENCE & EDUCATION SECTION ───
  experience: {
    sectionLabel: "Journey",
    title: "MY",
    outlineTitle: "TIMELINE",
    items: {
      1: {
        title: "B.S. in Information Systems",
        institution: "Widya Pratama Institute",
        location: "Pekalongan, Central Java",
        description: "Focusing on software engineering, database systems, and IT project management. Active member of the campus IT club and research assistant in the Information Systems Lab.",
        tags: ["Active", "Information Systems"],
      },
      2: {
        title: "Vocational High School",
        institution: "SMK Muhammadiyah Bligo",
        location: "Pekalongan, Central Java",
        description: "Automation and Electrical Engineering Major. Part of Graphic Design Enthusiast, LKS Graphic Design Participant",
        tags: ["Automation", "Graphic Design", "Technical Support"],
      },
      3: {
        title: "Web Developer Intern",
        institution: "PT. Teknologi Nusantara",
        location: "Surabaya (Remote)",
        description: "Contributed to developing an internal HR management system using Laravel and Vue.js. Implemented RESTful APIs, wrote unit tests, and participated in Agile standups.",
        tags: ["Laravel", "Vue.js", "REST API", "Agile"],
      },
      4: {
        title: "Head of IT Division",
        institution: "Faculty of Computer Science Student Board",
        location: "Brawijaya University",
        description: "Led a team of 8 to build and maintain the faculty's web platform. Organized 2 national tech webinars with 500+ attendees.",
        tags: ["Leadership", "Team of 8", "Web Dev"],
      },
      5: {
        title: "2nd Place — National Hackathon",
        institution: "Gemastik XVI (Programming Category)",
        location: "ITS Surabaya",
        description: "Competed in national student IT competition. Built a real-time disaster response coordination platform in 24 hours using React, Node.js, and WebSockets.",
        tags: ["Hackathon", "2nd Place", "150+ Teams"],
      },
      6: {
        title: "Dicoding — Advanced Backend Application Development",
        institution: "Dicoding Indonesia",
        location: "Online",
        description: "Completed advanced backend development covering Node.js, Express, REST API design, and authentication best practices.",
        tags: ["Node.js", "Dicoding"],
      },
      7: {
        title: "Google Data Analytics Certificate",
        institution: "Coursera — Google",
        location: "Online",
        description: "8-course professional certificate covering data analysis with Spreadsheets, SQL, R, and Tableau.",
        tags: ["SQL", "R", "Tableau", "Google"],
      },
    },
  },

  // ─── CONTACT SECTION ───
  contact: {
    sectionLabel: "Get In Touch",
    title1: "LET'S BUILD",
    title2: "SOMETHING",
    subtitle: "Have an interesting project, question, or just want to say hello? I'm always open for discussion!",
    form: {
      name: "Name",
      namePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "email@example.com",
      message: "Message",
      messagePlaceholder: "Hi, I'd like to discuss...",
      send: "Send Message",
      sending: "Sending...",
      sentTitle: "Message Sent!",
      sentDesc: "Thank you! I will get back to you as soon as possible.",
    },
    findMe: "Find Me Online",
    availableTitle: "Available for Collaboration",
    availableDesc: "Currently looking for internship, freelance, or interesting collaborative project opportunities.",
  },

  // ─── FOOTER & MODAL ───
  footer: {
    rights: "All Rights Reserved",
    builtWith: "Built with",
  },
  modal: {
    techStack: "Tech Stack",
    liveDemo: "Live Demo",
  },
};
