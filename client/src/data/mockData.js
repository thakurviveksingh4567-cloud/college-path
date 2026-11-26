// Frontend Fallback Data & Constants
export const INDIAN_STATES = [
  "All States",
  "Punjab",
  "Uttar Pradesh",
  "Delhi",
  "Haryana",
  "Chandigarh",
  "Rajasthan",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Kerala",
  "Telangana",
  "Madhya Pradesh",
  "Bihar",
  "Uttarakhand"
];

export const POPULAR_COURSES = [
  "All Courses",
  "B.Tech CSE",
  "B.Tech AI & ML",
  "BCA",
  "BCA AI & ML",
  "BCA Data Science",
  "MCA",
  "MBA",
  "B.Com (Hons)",
  "BBA",
  "B.Sc Computer Science",
  "MBBS"
];

export const COLLEGE_TYPES = [
  "All",
  "IIT",
  "NIT",
  "Central University",
  "State Government",
  "Deemed University",
  "Top Private"
];

export const STREAMS = [
  { id: "PCM", name: "PCM (Physics, Chem, Math)", desc: "Engineering, Architecture, BCA, Computing, Physical Sciences" },
  { id: "PCB", name: "PCB (Physics, Chem, Biology)", desc: "Medicine, Biotech, Life Sciences, Pharmacy, Agriculture" },
  { id: "Commerce", name: "Commerce (With/Without Math)", desc: "B.Com, BBA, Finance, Economics, Corporate Management" },
  { id: "Arts", name: "Arts / Humanities", desc: "Psychology, Political Science, Journalism, Design, Law" }
];

export const SAMPLE_COLLEGES = [
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    shortName: "IIT Delhi",
    collegeType: "IIT",
    location: {
      city: "New Delhi",
      state: "Delhi",
      address: "Hauz Khas, New Delhi 110016",
      isMetro: true,
      campusAreaAcres: 320
    },
    accreditation: {
      naacGrade: "A++",
      nirfRank: 2,
      nirfCategory: "Engineering (#2) / Overall (#4)"
    },
    establishedYear: 1961,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 220000,
        hostelFeePerYear: 42000,
        intakeSeats: 120,
        minClass12Percentage: 75,
        categoryRelaxation: { OBC: 75, SC: 65, ST: 65, EWS: 75, PwD: 65 },
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.8,
            expectedRankGeneral: 115,
            categoryCutoffs: { OBC: 99.5, SC: 98.0, ST: 96.5, EWS: 99.6 }
          }
        ],
        specializations: ["Artificial Intelligence", "Theory & Systems", "Cybersecurity"],
        verifiedDate: "2026-11-15"
      },
      {
        name: "B.Tech AI & Data Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 220000,
        hostelFeePerYear: 42000,
        intakeSeats: 50,
        minClass12Percentage: 75,
        categoryRelaxation: { OBC: 75, SC: 65, ST: 65, EWS: 75, PwD: 65 },
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.7,
            expectedRankGeneral: 350,
            categoryCutoffs: { OBC: 99.2, SC: 97.5, ST: 95.8, EWS: 99.4 }
          }
        ],
        specializations: ["Machine Learning", "Deep Learning", "Big Data Architecture"],
        verifiedDate: "2026-11-15"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 42000,
      messIncluded: true,
      details: "14 hostels on campus, high-speed Wi-Fi, modern indoor and outdoor sports facilities."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 25.8,
      medianCTC: 20.5,
      highestCTC: 120.0,
      placementPercentage: 94,
      topRecruiters: ["Google", "Microsoft", "Texas Instruments", "Qualcomm", "Goldman Sachs"],
      sourceNote: "Verified official NIRF Data and IITD T&P Annual Report."
    },
    scholarships: [
      {
        title: "Institute Merit-cum-Means (MCM) Scholarship",
        description: "Tuition waiver plus ₹1000/month stipend for undergraduate students with parental income below ₹4.5 LPA.",
        amount: "Full Tuition Waiver + ₹1,000/mo",
        eligibility: "Class 12 >= 75%, parental income < 4.5 LPA",
        link: "https://home.iitd.ac.in/scholarships.php"
      }
    ],
    admissionProcess: {
      counsellingBody: "JoSAA / CSAB",
      counsellingLink: "https://josaa.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-15",
      steps: [
        "Appear for JEE Main and secure eligible rank for JEE Advanced.",
        "Clear JEE Advanced cutoffs.",
        "Register for JoSAA centralized online counselling.",
        "Choice filling and seat allocation rounds 1 to 6."
      ]
    },
    officialLinks: {
      website: "https://home.iitd.ac.in",
      admissionPortal: "https://josaa.nic.in"
    },
    description: "IIT Delhi is an Institute of National Importance established as an institution of excellence in science, engineering and technology education and research in India.",
    featured: true,
    lastVerifiedDate: "2026-11-15",
    images: {
      hero: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Thapar Institute of Engineering & Technology",
    slug: "thapar-institute-patiala",
    shortName: "Thapar University",
    collegeType: "Deemed University",
    location: {
      city: "Patiala",
      state: "Punjab",
      address: "Bhadson Road, Patiala, Punjab 147004",
      isMetro: false,
      campusAreaAcres: 250
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 20,
      nirfCategory: "Engineering (#20)"
    },
    establishedYear: 1956,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 440000,
        hostelFeePerYear: 88000,
        intakeSeats: 600,
        minClass12Percentage: 70,
        categoryRelaxation: { SC: 60, ST: 60 },
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 95.5,
            expectedRankGeneral: 45000,
            categoryCutoffs: { SC: 80.0, ST: 75.0 }
          }
        ],
        specializations: ["AI & Data Analytics", "Cloud Computing"],
        verifiedDate: "2026-11-10"
      },
      {
        name: "B.Tech Artificial Intelligence & Machine Learning",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 440000,
        hostelFeePerYear: 88000,
        intakeSeats: 180,
        minClass12Percentage: 70,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 94.0,
            expectedRankGeneral: 58000
          }
        ],
        specializations: ["Deep Learning", "Robotics"],
        verifiedDate: "2026-11-10"
      },
      {
        name: "MCA (Master of Computer Applications)",
        degree: "MCA",
        duration: "2 Years",
        streamRequired: ["PCM", "Commerce", "Arts"],
        tuitionFeePerYear: 280000,
        hostelFeePerYear: 88000,
        intakeSeats: 60,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "CUET PG / University Merit",
            examType: "National",
            expectedPercentileGeneral: 85.0
          }
        ],
        specializations: ["Cloud Native Dev", "Full-Stack Web"],
        verifiedDate: "2026-11-10"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 88000,
      messIncluded: true,
      details: "Modern air-conditioned & non-AC hostels, multi-cuisine mess, 24x7 security."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 12.8,
      medianCTC: 10.5,
      highestCTC: 55.75,
      placementPercentage: 89,
      topRecruiters: ["Microsoft", "Amazon", "Oracle", "De Shaw", "JPMorgan Chase"],
      sourceNote: "Official TIET Annual Placement Statistical Report 2025-2026."
    },
    scholarships: [
      {
        title: "Merit Scholarship on JEE Main Rank",
        description: "50% to 100% Tuition Fee waiver for students scoring above 98 percentile in JEE Main.",
        amount: "50% - 100% Tuition Fee Waiver",
        eligibility: "JEE Main >= 97 percentile",
        link: "https://thapar.edu/admissions/scholarships"
      }
    ],
    admissionProcess: {
      counsellingBody: "TIET In-house Centralized Counselling",
      counsellingLink: "https://admissions.thapar.edu",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-25",
      steps: [
        "Apply online on TIET portal with 12th Board marks and JEE Main score.",
        "50% Punjab Domicile and 50% Outside Punjab quota.",
        "Online branch preference locking & seat allocation rounds."
      ]
    },
    officialLinks: {
      website: "https://www.thapar.edu",
      admissionPortal: "https://admissions.thapar.edu"
    },
    description: "Thapar Institute of Engineering and Technology (TIET) is one of India's oldest and top-ranked deemed private engineering institutions located in Patiala, Punjab.",
    featured: true,
    lastVerifiedDate: "2026-11-10",
    images: {
      hero: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Panjab University & UIET Chandigarh",
    slug: "uiet-panjab-university-chandigarh",
    shortName: "UIET Panjab University",
    collegeType: "State Government",
    location: {
      city: "Chandigarh",
      state: "Chandigarh",
      address: "Sector 25, South Campus, Chandigarh 160014",
      isMetro: false,
      campusAreaAcres: 550
    },
    accreditation: {
      naacGrade: "A++",
      nirfRank: 25,
      nirfCategory: "University (#25) / Engineering (#42)"
    },
    establishedYear: 1882,
    streamsSupported: ["PCM", "Commerce", "Arts"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 110000,
        hostelFeePerYear: 18000,
        intakeSeats: 120,
        minClass12Percentage: 60,
        categoryRelaxation: { SC: 55, ST: 55 },
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 96.2,
            expectedRankGeneral: 38000
          }
        ],
        specializations: ["Software Engineering", "Data Analytics"],
        verifiedDate: "2026-11-12"
      },
      {
        name: "BCA (Bachelor of Computer Applications)",
        degree: "BCA",
        duration: "3 Years",
        streamRequired: ["PCM", "Commerce", "Arts"],
        tuitionFeePerYear: 45000,
        hostelFeePerYear: 18000,
        intakeSeats: 80,
        minClass12Percentage: 50,
        acceptedExams: [
          {
            examName: "PU-CET / Class 12 Merit",
            examType: "State",
            expectedPercentileGeneral: 85.0
          }
        ],
        specializations: ["Web Technologies", "Database Management"],
        verifiedDate: "2026-11-12"
      },
      {
        name: "MCA (Master of Computer Applications)",
        degree: "MCA",
        duration: "2 Years",
        streamRequired: ["PCM", "Commerce", "Arts"],
        tuitionFeePerYear: 62000,
        hostelFeePerYear: 18000,
        intakeSeats: 60,
        minClass12Percentage: 50,
        acceptedExams: [
          {
            examName: "PU-CET (PG)",
            examType: "University",
            expectedPercentileGeneral: 80.0
          }
        ],
        specializations: ["Enterprise Computing", "AI Systems"],
        verifiedDate: "2026-11-12"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 18000,
      messIncluded: false,
      details: "Highly subsidized state university hostels for boys and girls with cooperative messes."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 9.2,
      medianCTC: 8.5,
      highestCTC: 45.0,
      placementPercentage: 85,
      topRecruiters: ["Amazon", "Samsung", "American Express", "KPMG", "Infosys"],
      sourceNote: "Central Placement Cell, Panjab University Chandigarh Report."
    },
    scholarships: [
      {
        title: "PU Student Aid Fund & Post Matric SC/ST",
        description: "Complete fee reimbursement for underprivileged students as per Punjab/Chandigarh norms.",
        amount: "Full Fee Reimbursement",
        eligibility: "Class 12 >= 60%, Income < 2.5 LPA",
        link: "https://puchd.ac.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "JAC Chandigarh",
      counsellingLink: "https://jacchd.admissions.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-20",
      steps: [
        "Register on JAC Chandigarh counselling portal using JEE Main roll number.",
        "Select preference order across UIET, CCET, and Dr. SSBUICET.",
        "Seat allotment rounds 1, 2, 3 and spot round."
      ]
    },
    officialLinks: {
      website: "https://puchd.ac.in",
      admissionPortal: "https://jacchd.admissions.nic.in"
    },
    description: "Panjab University is a prestigious central/state shared university located in Chandigarh, renowned for high academic research and affordable education.",
    featured: true,
    lastVerifiedDate: "2026-11-12",
    images: {
      hero: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fa9?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Motilal Nehru National Institute of Technology Allahabad",
    slug: "mnnit-allahabad",
    shortName: "MNNIT Allahabad",
    collegeType: "NIT",
    location: {
      city: "Prayagraj",
      state: "Uttar Pradesh",
      address: "Teliyarganj, Prayagraj, Uttar Pradesh 211004",
      isMetro: false,
      campusAreaAcres: 222
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 49,
      nirfCategory: "Engineering (#49)"
    },
    establishedYear: 1961,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 145000,
        hostelFeePerYear: 38000,
        intakeSeats: 180,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.2,
            expectedRankGeneral: 8500
          }
        ],
        specializations: ["Software Systems", "Machine Intelligence"],
        verifiedDate: "2026-11-14"
      },
      {
        name: "MCA (Master of Computer Applications)",
        degree: "MCA",
        duration: "3 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 90000,
        hostelFeePerYear: 38000,
        intakeSeats: 116,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "NIMCET",
            examType: "National",
            expectedPercentileGeneral: 96.0,
            expectedRankGeneral: 250
          }
        ],
        specializations: ["Cloud Application Architecture"],
        verifiedDate: "2026-11-14"
      },
      {
        name: "MBA",
        degree: "MBA",
        duration: "2 Years",
        streamRequired: ["PCM", "PCB", "Commerce", "Arts"],
        tuitionFeePerYear: 120000,
        hostelFeePerYear: 38000,
        intakeSeats: 70,
        minClass12Percentage: 55,
        acceptedExams: [
          {
            examName: "CAT / CMAT",
            examType: "National",
            expectedPercentileGeneral: 85.0
          }
        ],
        specializations: ["Finance", "Marketing"],
        verifiedDate: "2026-11-14"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 38000,
      messIncluded: true,
      details: "Separate boys and girls hostels on campus, Wi-Fi and sports complex."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 17.5,
      medianCTC: 14.0,
      highestCTC: 82.5,
      placementPercentage: 91,
      topRecruiters: ["Microsoft", "Google", "Atlassian", "PhonePe", "Goldman Sachs"],
      sourceNote: "Official MNNIT Training & Placement Cell Record 2025-2026."
    },
    scholarships: [
      {
        title: "National Fellowship & Central Sector Scheme",
        description: "Full tuition reimbursement for students with family income under ₹1 LPA.",
        amount: "Full Tuition Waiver",
        eligibility: "Income based criteria for NITs",
        link: "https://www.mnnit.ac.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "JoSAA / CSAB",
      counsellingLink: "https://josaa.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-15",
      steps: [
        "Appear for JEE Main.",
        "50% seats reserved for Uttar Pradesh Home State; 50% for Other States.",
        "Online counselling through JoSAA portal."
      ]
    },
    officialLinks: {
      website: "https://www.mnnit.ac.in",
      admissionPortal: "https://josaa.nic.in"
    },
    description: "MNNIT Allahabad is a premier Institute of National Importance located in Prayagraj, UP, known for top coding culture and placement statistics.",
    featured: true,
    lastVerifiedDate: "2026-11-14",
    images: {
      hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "National Institute of Technology Kurukshetra",
    slug: "nit-kurukshetra",
    shortName: "NIT Kurukshetra",
    collegeType: "NIT",
    location: {
      city: "Kurukshetra",
      state: "Haryana",
      address: "Thanesar, Kurukshetra, Haryana 136119",
      isMetro: false,
      campusAreaAcres: 300
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 58,
      nirfCategory: "Engineering (#58)"
    },
    establishedYear: 1963,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 140000,
        hostelFeePerYear: 35000,
        intakeSeats: 180,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 98.9,
            expectedRankGeneral: 9800
          }
        ],
        specializations: ["Software Engineering", "Artificial Intelligence"],
        verifiedDate: "2026-11-12"
      },
      {
        name: "B.Tech AI & Machine Learning",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 140000,
        hostelFeePerYear: 35000,
        intakeSeats: 60,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 98.5,
            expectedRankGeneral: 12500
          }
        ],
        specializations: ["Machine Learning", "Robotics"],
        verifiedDate: "2026-11-12"
      },
      {
        name: "MCA",
        degree: "MCA",
        duration: "3 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 85000,
        hostelFeePerYear: 35000,
        intakeSeats: 90,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "NIMCET",
            examType: "National",
            expectedPercentileGeneral: 95.0
          }
        ],
        specializations: ["Web Systems"],
        verifiedDate: "2026-11-12"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 35000,
      messIncluded: true,
      details: "Hostels with Wi-Fi, indoor games, cafeteria, and sports grounds."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 14.8,
      medianCTC: 12.0,
      highestCTC: 51.0,
      placementPercentage: 88,
      topRecruiters: ["Amazon", "Flipkart", "Adobe", "Qualcomm", "Oracle"],
      sourceNote: "Verified NITKKR Training & Placement Cell Report 2025-26."
    },
    scholarships: [
      {
        title: "NIT Kurukshetra Financial Assistance Scheme",
        description: "100% tuition waiver for EWS students whose annual income is less than ₹1,00,000.",
        amount: "100% Tuition Fee Waiver",
        eligibility: "Income < 1 LPA",
        link: "https://www.nitkkr.ac.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "JoSAA / CSAB",
      counsellingLink: "https://josaa.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-15",
      steps: [
        "Take JEE Main.",
        "Apply through JoSAA. 50% seats reserved for Haryana state students.",
        "Choice locking and seat allotment rounds."
      ]
    },
    officialLinks: {
      website: "https://www.nitkkr.ac.in",
      admissionPortal: "https://josaa.nic.in"
    },
    description: "NIT Kurukshetra is a premier technical institution of national importance in Haryana, located close to Delhi NCR.",
    featured: true,
    lastVerifiedDate: "2026-11-12",
    images: {
      hero: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Malaviya National Institute of Technology Jaipur",
    slug: "mnit-jaipur",
    shortName: "MNIT Jaipur",
    collegeType: "NIT",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      address: "Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur, Rajasthan 302017",
      isMetro: false,
      campusAreaAcres: 317
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 37,
      nirfCategory: "Engineering (#37)"
    },
    establishedYear: 1963,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 142000,
        hostelFeePerYear: 39000,
        intakeSeats: 120,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.1,
            expectedRankGeneral: 7200
          }
        ],
        specializations: ["Software Engineering", "Network Security"],
        verifiedDate: "2026-11-10"
      },
      {
        name: "B.Tech AI & Data Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 142000,
        hostelFeePerYear: 39000,
        intakeSeats: 60,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 98.7,
            expectedRankGeneral: 11000
          }
        ],
        specializations: ["Deep Learning", "Data Mining"],
        verifiedDate: "2026-11-10"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 39000,
      messIncluded: true,
      details: "Modern hostels with high-speed internet and sports grounds."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 16.2,
      medianCTC: 13.5,
      highestCTC: 64.0,
      placementPercentage: 90,
      topRecruiters: ["Amazon", "Salesforce", "Goldman Sachs", "DE Shaw", "Texas Instruments"],
      sourceNote: "MNIT Jaipur Training and Placement Report 2025-2026."
    },
    scholarships: [
      {
        title: "Rajasthan Chief Minister Higher Education Scholarship",
        description: "Assistance of up to ₹25,000 per year for meritorious Rajasthan state students.",
        amount: "Up to ₹25,000 / year",
        eligibility: "Rajasthan Domicile, 12th marks > 75%",
        link: "https://hte.rajasthan.gov.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "JoSAA / CSAB",
      counsellingLink: "https://josaa.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-15",
      steps: [
        "Take JEE Main examination.",
        "50% Rajasthan Home State quota benefits applicable.",
        "Choice filling and round-by-round seat allocation."
      ]
    },
    officialLinks: {
      website: "https://www.mnit.ac.in",
      admissionPortal: "https://josaa.nic.in"
    },
    description: "MNIT Jaipur is one of the premier NITs in North-Western India, set in the culturally vibrant city of Jaipur.",
    featured: true,
    lastVerifiedDate: "2026-11-10",
    images: {
      hero: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "College of Engineering Pune (COEP Technological University)",
    slug: "coep-pune",
    shortName: "COEP Pune",
    collegeType: "State Government",
    location: {
      city: "Pune",
      state: "Maharashtra",
      address: "Wellesley Road, Shivajinagar, Pune, Maharashtra 411005",
      isMetro: true,
      campusAreaAcres: 37
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 73,
      nirfCategory: "Engineering (#73)"
    },
    establishedYear: 1854,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 90000,
        hostelFeePerYear: 32000,
        intakeSeats: 150,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "MHT-CET",
            examType: "State",
            expectedPercentileGeneral: 99.85,
            expectedRankGeneral: 200
          },
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.2,
            expectedRankGeneral: 8200
          }
        ],
        specializations: ["AI & Data Science", "Systems Architecture"],
        verifiedDate: "2026-11-08"
      },
      {
        name: "B.Tech Artificial Intelligence & Robotics",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 90000,
        hostelFeePerYear: 32000,
        intakeSeats: 60,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "MHT-CET",
            examType: "State",
            expectedPercentileGeneral: 99.6
          }
        ],
        specializations: ["Robotic Manipulation", "Computer Vision"],
        verifiedDate: "2026-11-08"
      },
      {
        name: "MCA",
        degree: "MCA",
        duration: "2 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 75000,
        hostelFeePerYear: 32000,
        intakeSeats: 60,
        minClass12Percentage: 50,
        acceptedExams: [
          {
            examName: "MAH-MCA-CET",
            examType: "State",
            expectedPercentileGeneral: 98.5
          }
        ],
        specializations: ["Software Engineering"],
        verifiedDate: "2026-11-08"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 32000,
      messIncluded: true,
      details: "Historic yet modern hostel buildings on Pune riverside."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 14.2,
      medianCTC: 11.5,
      highestCTC: 50.5,
      placementPercentage: 92,
      topRecruiters: ["Morgan Stanley", "Goldman Sachs", "Mastercard", "Credit Suisse", "TCS Digital"],
      sourceNote: "COEP Technological University Report 2025-26."
    },
    scholarships: [
      {
        title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)",
        description: "50% tuition and exam fee waiver for Maharashtra students with family income below ₹8 LPA.",
        amount: "50% Tuition Fee Waiver",
        eligibility: "Maharashtra Domicile, Family income < 8 LPA",
        link: "https://mahadbt.maharashtra.gov.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "Maharashtra State CET Cell CAP Rounds",
      counsellingLink: "https://cetcell.mahacet.org",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-07-05",
      steps: [
        "Appear for MHT-CET or JEE Main.",
        "Register on Maharashtra CET Cell CAP Portal.",
        "Participate in CAP Rounds 1, 2, and 3."
      ]
    },
    officialLinks: {
      website: "https://www.coeptech.ac.in",
      admissionPortal: "https://cetcell.mahacet.org"
    },
    description: "COEP is Asia's third oldest engineering institution, established in 1854, with a monumental legacy in Pune, Maharashtra.",
    featured: true,
    lastVerifiedDate: "2026-11-08",
    images: {
      hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "National Institute of Technology Karnataka, Surathkal",
    slug: "nitk-surathkal",
    shortName: "NITK Surathkal",
    collegeType: "NIT",
    location: {
      city: "Mangalore / Surathkal",
      state: "Karnataka",
      address: "NH 66, Srinivasnagar, Surathkal, Mangalore, Karnataka 575025",
      isMetro: false,
      campusAreaAcres: 295
    },
    accreditation: {
      naacGrade: "A++",
      nirfRank: 12,
      nirfCategory: "Engineering (#12)"
    },
    establishedYear: 1960,
    streamsSupported: ["PCM"],
    courses: [
      {
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 145000,
        hostelFeePerYear: 45000,
        intakeSeats: 120,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.6,
            expectedRankGeneral: 3200
          }
        ],
        specializations: ["Distributed Computing", "AI & Machine Learning"],
        verifiedDate: "2026-11-14"
      },
      {
        name: "B.Tech Artificial Intelligence",
        degree: "B.Tech",
        duration: "4 Years",
        streamRequired: ["PCM"],
        tuitionFeePerYear: 145000,
        hostelFeePerYear: 45000,
        intakeSeats: 60,
        minClass12Percentage: 75,
        acceptedExams: [
          {
            examName: "JEE Main",
            examType: "National",
            expectedPercentileGeneral: 99.4,
            expectedRankGeneral: 4500
          }
        ],
        specializations: ["Deep Learning Systems", "Autonomous Robotics"],
        verifiedDate: "2026-11-14"
      },
      {
        name: "MCA",
        degree: "MCA",
        duration: "3 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 95000,
        hostelFeePerYear: 45000,
        intakeSeats: 60,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "NIMCET",
            examType: "National",
            expectedPercentileGeneral: 97.0
          }
        ],
        specializations: ["Cloud Application Architecture"],
        verifiedDate: "2026-11-14"
      },
      {
        name: "MBA",
        degree: "MBA",
        duration: "2 Years",
        streamRequired: ["PCM", "PCB", "Commerce", "Arts"],
        tuitionFeePerYear: 150000,
        hostelFeePerYear: 45000,
        intakeSeats: 64,
        minClass12Percentage: 55,
        acceptedExams: [
          {
            examName: "CAT / GMAT",
            examType: "National",
            expectedPercentileGeneral: 85.0
          }
        ],
        specializations: ["Analytics", "Finance"],
        verifiedDate: "2026-11-14"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 45000,
      messIncluded: true,
      details: "Lush beach-front campus with its own private beach and sports complex."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 20.4,
      medianCTC: 16.5,
      highestCTC: 98.0,
      placementPercentage: 93,
      topRecruiters: ["Microsoft", "Google", "Amazon", "Uber", "Qualcomm", "Apple"],
      sourceNote: "NITK Surathkal Department of Training & Placement Verified Report 2025-26."
    },
    scholarships: [
      {
        title: "NITK Alumni Association Student Aid & Karnataka Post-Matric",
        description: "Need-based financial aid for economically weaker students.",
        amount: "₹40,000 to Full Tuition Waiver",
        eligibility: "Income < 2.5 LPA / Merit",
        link: "https://www.nitk.ac.in"
      }
    ],
    admissionProcess: {
      counsellingBody: "JoSAA / CSAB",
      counsellingLink: "https://josaa.nic.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-15",
      steps: [
        "Appear for JEE Main exam.",
        "50% Karnataka Home State quota; 50% All India Quota.",
        "Choice filling in JoSAA rounds 1 to 6."
      ]
    },
    officialLinks: {
      website: "https://www.nitk.ac.in",
      admissionPortal: "https://josaa.nic.in"
    },
    description: "NITK Surathkal is one of India's premier technical institutions, known as one of the top 3 NITs in the country.",
    featured: true,
    lastVerifiedDate: "2026-11-14",
    images: {
      hero: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Shri Ram College of Commerce (SRCC), Delhi University",
    slug: "srcc-delhi-university",
    shortName: "SRCC Delhi",
    collegeType: "Central University",
    location: {
      city: "New Delhi",
      state: "Delhi",
      address: "Maurice Nagar, University Enclave, Delhi 110007",
      isMetro: true,
      campusAreaAcres: 16
    },
    accreditation: {
      naacGrade: "A++",
      nirfRank: 11,
      nirfCategory: "Colleges (#11) / Commerce (#1)"
    },
    establishedYear: 1926,
    streamsSupported: ["Commerce", "PCM", "Arts"],
    courses: [
      {
        name: "B.Com (Hons)",
        degree: "B.Com",
        duration: "3-4 Years (NEP FYUP)",
        streamRequired: ["Commerce", "PCM", "Arts"],
        tuitionFeePerYear: 32000,
        hostelFeePerYear: 48000,
        intakeSeats: 630,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "CUET UG",
            examType: "National",
            expectedScoreCUET: 780,
            expectedPercentileGeneral: 99.5
          }
        ],
        specializations: ["Financial Markets", "Accounting & Taxation"],
        verifiedDate: "2026-11-15"
      },
      {
        name: "B.A. (Hons) Economics",
        degree: "B.A.",
        duration: "3-4 Years (NEP FYUP)",
        streamRequired: ["Commerce", "PCM", "Arts"],
        tuitionFeePerYear: 32000,
        hostelFeePerYear: 48000,
        intakeSeats: 155,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "CUET UG",
            examType: "National",
            expectedScoreCUET: 775,
            expectedPercentileGeneral: 99.4
          }
        ],
        specializations: ["Econometrics", "Development Economics"],
        verifiedDate: "2026-11-15"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 48000,
      messIncluded: true,
      details: "Heritage residential blocks on Delhi University North Campus."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 13.5,
      medianCTC: 11.0,
      highestCTC: 35.0,
      placementPercentage: 92,
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group (BCG)", "Bain & Company", "Goldman Sachs"],
      sourceNote: "SRCC Placement Cell Annual Report 2025-2026."
    },
    scholarships: [
      {
        title: "SRCC Need-Based Student Aid",
        description: "Fee waiver and aid for students with family income less than ₹3 LPA.",
        amount: "₹20,000 / year + Full Fee Waiver",
        eligibility: "CUET Merit + Family Income < 3 LPA",
        link: "https://www.srcc.edu/scholarships"
      }
    ],
    admissionProcess: {
      counsellingBody: "Delhi University CSAS Portal",
      counsellingLink: "https://ugadmission.uod.ac.in",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-06-30",
      steps: [
        "Take CUET UG exam conducted by NTA.",
        "Register on DU CSAS portal and select SRCC preferences.",
        "CSAS allocation rounds 1, 2, 3."
      ]
    },
    officialLinks: {
      website: "https://www.srcc.edu",
      admissionPortal: "https://ugadmission.uod.ac.in"
    },
    description: "Shri Ram College of Commerce (SRCC) is India's most celebrated institution for commerce and economics education.",
    featured: true,
    lastVerifiedDate: "2026-11-15",
    images: {
      hero: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    name: "Christ (Deemed to be University), Bengaluru",
    slug: "christ-university-bengaluru",
    shortName: "Christ University",
    collegeType: "Deemed University",
    location: {
      city: "Bengaluru",
      state: "Karnataka",
      address: "Hosur Road, Bengaluru, Karnataka 560029",
      isMetro: true,
      campusAreaAcres: 75
    },
    accreditation: {
      naacGrade: "A+",
      nirfRank: 60,
      nirfCategory: "Overall (#60)"
    },
    establishedYear: 1969,
    streamsSupported: ["Commerce", "Arts", "PCM", "PCB"],
    courses: [
      {
        name: "BCA (Bachelor of Computer Applications)",
        degree: "BCA",
        duration: "3-4 Years",
        streamRequired: ["PCM", "Commerce", "Arts"],
        tuitionFeePerYear: 165000,
        hostelFeePerYear: 75000,
        intakeSeats: 240,
        minClass12Percentage: 55,
        acceptedExams: [
          {
            examName: "Christ Entrance Test (CUET-Christ)",
            examType: "University",
            expectedPercentileGeneral: 85.0
          }
        ],
        specializations: ["Data Analytics", "Cloud Computing & DevOps", "Full-Stack Web"],
        verifiedDate: "2026-11-05"
      },
      {
        name: "BCA Artificial Intelligence & Machine Learning",
        degree: "BCA",
        duration: "3-4 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 185000,
        hostelFeePerYear: 75000,
        intakeSeats: 120,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "Christ Entrance Test (CUET-Christ)",
            examType: "University",
            expectedPercentileGeneral: 88.0
          }
        ],
        specializations: ["Machine Learning", "NLP"],
        verifiedDate: "2026-11-05"
      },
      {
        name: "BCA Data Science",
        degree: "BCA",
        duration: "3-4 Years",
        streamRequired: ["PCM", "Commerce"],
        tuitionFeePerYear: 180000,
        hostelFeePerYear: 75000,
        intakeSeats: 120,
        minClass12Percentage: 60,
        acceptedExams: [
          {
            examName: "Christ Entrance Test (CUET-Christ)",
            examType: "University",
            expectedPercentileGeneral: 87.0
          }
        ],
        specializations: ["Big Data", "Business Intelligence"],
        verifiedDate: "2026-11-05"
      },
      {
        name: "MBA",
        degree: "MBA",
        duration: "2 Years",
        streamRequired: ["Commerce", "PCM", "PCB", "Arts"],
        tuitionFeePerYear: 450000,
        hostelFeePerYear: 75000,
        intakeSeats: 300,
        minClass12Percentage: 55,
        acceptedExams: [
          {
            examName: "CAT / MAT / CMAT",
            examType: "National",
            expectedPercentileGeneral: 78.0
          }
        ],
        specializations: ["Finance", "Marketing", "Business Analytics"],
        verifiedDate: "2026-11-05"
      }
    ],
    hostelFacilities: {
      available: true,
      feePerYear: 75000,
      messIncluded: false,
      details: "Modern hostels with Wi-Fi, cafeteria, security and indoor sports."
    },
    placements: {
      verified: true,
      batchYear: "2025-2026",
      averageCTC: 8.5,
      medianCTC: 7.2,
      highestCTC: 21.5,
      placementPercentage: 86,
      topRecruiters: ["Deloitte", "EY", "KPMG", "PwC", "Amazon", "Target", "Infosys"],
      sourceNote: "Christ University Verified Placement Statistics 2025-2026."
    },
    scholarships: [
      {
        title: "Christ University Merit and Fee Concession Scheme",
        description: "Fee concession from 10% to 50% for students excelling in university exams.",
        amount: "10% to 50% Fee Concession",
        eligibility: "Academic excellence + Need assessment",
        link: "https://christuniversity.in/scholarships"
      }
    ],
    admissionProcess: {
      counsellingBody: "Christ University Direct Selection",
      counsellingLink: "https://christuniversity.in/apply-online",
      sessionYear: "2026-2027",
      applicationDeadline: "2026-04-15",
      steps: [
        "Submit online application form.",
        "Take online/offline Christ University Entrance Test.",
        "Micro-presentation and Interview round."
      ]
    },
    officialLinks: {
      website: "https://christuniversity.in",
      admissionPortal: "https://christuniversity.in/apply-online"
    },
    description: "Christ University is a top multidisciplinary university located in Bengaluru, renowned for BCA, BBA, and MBA programs.",
    featured: true,
    lastVerifiedDate: "2026-11-05",
    images: {
      hero: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80"
    }
  }
];

export const SAMPLE_SCHOLARSHIPS = [
  {
    title: "Central Sector Scheme of Scholarships for College & University Students",
    slug: "central-sector-scheme-scholarship",
    provider: "Ministry of Education, Government of India",
    type: "Government Central",
    applicableStreams: ["All"],
    amountDetails: {
      amount: "₹12,000 to ₹20,000 per year",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 80,
      maxFamilyIncomePerYear: 450000,
      gender: "All",
      summary: "Students scoring in top 20th percentile in Class 12 board with family income below ₹4.5 LPA."
    },
    applicationPeriod: {
      deadline: "2026-12-31",
      status: "Active"
    },
    officialLink: "https://scholarships.gov.in"
  },
  {
    title: "Reliance Foundation Undergraduate Scholarships",
    slug: "reliance-foundation-ug-scholarship",
    provider: "Reliance Foundation",
    type: "Corporate CSR",
    applicableStreams: ["All"],
    amountDetails: {
      amount: "Up to ₹2,00,000 over course duration",
      isPerYear: false
    },
    eligibility: {
      minClass12Percentage: 60,
      maxFamilyIncomePerYear: 1500000,
      gender: "All",
      summary: "First-year undergraduate degree students across India; aptitude test based."
    },
    applicationPeriod: {
      deadline: "2026-10-15",
      status: "Upcoming"
    },
    officialLink: "https://www.scholarships.reliancefoundation.org"
  },
  {
    title: "AICTE Pragati Scholarship Scheme for Girls",
    slug: "aicte-pragati-scholarship-girls",
    provider: "AICTE, Government of India",
    type: "Government Central",
    applicableStreams: ["PCM"],
    amountDetails: {
      amount: "₹50,000 per year",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 60,
      maxFamilyIncomePerYear: 800000,
      gender: "Female Only",
      summary: "Girl students admitted to 1st year of technical degree in AICTE approved colleges."
    },
    applicationPeriod: {
      deadline: "2026-12-15",
      status: "Active"
    },
    officialLink: "https://scholarships.gov.in"
  },
  {
    title: "INSPIRE Scholarship for Higher Education (SHE)",
    slug: "inspire-she-dst-scholarship",
    provider: "Department of Science and Technology (DST), Govt. of India",
    type: "Government Central",
    applicableStreams: ["PCM", "PCB"],
    amountDetails: {
      amount: "₹80,000 per year (₹60,000 stipend + ₹20,000 mentorship project)",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 88,
      maxFamilyIncomePerYear: 0,
      gender: "All",
      summary: "Top 1% students in Class 12 board examinations pursuing B.Sc./B.S./Int. M.Sc. in natural and basic sciences."
    },
    applicationPeriod: {
      deadline: "2026-11-30",
      status: "Active"
    },
    officialLink: "https://online-inspire.gov.in"
  },
  {
    title: "Post-Matric Scholarship Scheme for SC/ST/OBC Candidates",
    slug: "post-matric-scholarship-social-justice",
    provider: "Ministry of Social Justice & Empowerment, Govt. of India",
    type: "Government Central",
    applicableStreams: ["All"],
    amountDetails: {
      amount: "100% Compulsory Tuition Fee Reimbursement + Maintenance Allowance",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 50,
      maxFamilyIncomePerYear: 250000,
      gender: "All",
      summary: "Class 12 passed SC/ST/OBC students enrolled in recognized post-secondary degree courses with family income under ₹2.5 LPA."
    },
    applicationPeriod: {
      deadline: "2027-01-31",
      status: "Active"
    },
    officialLink: "https://scholarships.gov.in"
  },
  {
    title: "Prime Minister's Special Scholarship Scheme (PMSSS for J&K and Ladakh)",
    slug: "pmsss-jk-ladakh-aicte",
    provider: "AICTE & Ministry of Education, Govt. of India",
    type: "Government Central",
    applicableStreams: ["PCM", "PCB", "Commerce", "Arts"],
    amountDetails: {
      amount: "Up to ₹3,00,000 tuition fee waiver + ₹1,00,000 annual maintenance allowance",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 60,
      maxFamilyIncomePerYear: 800000,
      gender: "All",
      summary: "Domiciles of Jammu & Kashmir and Ladakh who passed 12th from JKBOSE/CBSE with annual family income below ₹8 Lakhs."
    },
    applicationPeriod: {
      deadline: "2026-12-20",
      status: "Active"
    },
    officialLink: "https://www.aicte-india.org"
  },
  {
    title: "Tata Capital Pankh Scholarship Programme",
    slug: "tata-capital-pankh-scholarship",
    provider: "Tata Capital Ltd.",
    type: "Corporate CSR",
    applicableStreams: ["All"],
    amountDetails: {
      amount: "Up to 80% of tuition fee (₹15,000 to ₹50,000 per year)",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 60,
      maxFamilyIncomePerYear: 250000,
      gender: "All",
      summary: "Class 12 passed students studying in undergraduate degree courses with family annual income less than or equal to ₹2.5 LPA."
    },
    applicationPeriod: {
      deadline: "2026-11-15",
      status: "Active"
    },
    officialLink: "https://www.tatacapital.com"
  },
  {
    title: "HDFC Bank Parivartan's Badhte Kadam Scholarship",
    slug: "hdfc-bank-badhte-kadam-scholarship",
    provider: "HDFC Bank Parivartan",
    type: "Corporate CSR",
    applicableStreams: ["All"],
    amountDetails: {
      amount: "₹30,000 to ₹1,00,000 per year",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 60,
      maxFamilyIncomePerYear: 600000,
      gender: "All",
      summary: "Meritorious students from underprivileged backgrounds, single-parent homes, or persons with disabilities pursuing undergrad degrees."
    },
    applicationPeriod: {
      deadline: "2026-10-31",
      status: "Active"
    },
    officialLink: "https://www.hdfcbank.com"
  },
  {
    title: "Kotak Kanya Scholarship for Girl Students",
    slug: "kotak-kanya-scholarship-girls",
    provider: "Kotak Education Foundation",
    type: "Corporate CSR",
    applicableStreams: ["PCM", "PCB", "Commerce"],
    amountDetails: {
      amount: "₹1,50,000 per academic year until degree completion",
      isPerYear: true
    },
    eligibility: {
      minClass12Percentage: 85,
      maxFamilyIncomePerYear: 600000,
      gender: "Female Only",
      summary: "Meritorious girl students admitted to first-year professional undergraduate degree programs (Engineering, MBBS, Architecture, Design, Integrated LLB)."
    },
    applicationPeriod: {
      deadline: "2026-12-10",
      status: "Active"
    },
    officialLink: "https://kotakeducation.org"
  }
];

export const SAMPLE_ADMISSION_EVENTS = [
  {
    title: "JEE Main 2027 Session 1 Application Window",
    examOrBody: "JEE Main",
    eventType: "Application Window",
    startDate: "2026-11-01",
    endDate: "2026-12-04",
    status: "Live Now",
    description: "National Testing Agency (NTA) registration window for JEE (Main) 2027 Session 1.",
    officialPortal: "https://jeemain.nta.ac.in"
  },
  {
    title: "CUET UG 2027 Notification & Exam Window",
    examOrBody: "CUET UG",
    eventType: "Application Window",
    startDate: "2027-02-15",
    endDate: "2027-03-31",
    status: "Upcoming",
    description: "Registration for Central and State Universities entrance across India.",
    officialPortal: "https://cuetug.ntaonline.in"
  },
  {
    title: "JoSAA 2026 Centralized Seat Allotment Round 1 to 6",
    examOrBody: "JoSAA",
    eventType: "Seat Allotment",
    startDate: "2026-06-15",
    endDate: "2026-07-28",
    status: "Upcoming",
    description: "Counselling rounds for 23 IITs, 32 NITs, 26 IIITs and GFTIs.",
    officialPortal: "https://josaa.nic.in"
  }
];
