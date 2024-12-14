export const mockJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp',
    logo: 'https://ui-avatars.com/api/?name=TC&background=0A5A4E&color=fff',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    description: 'We are seeking an experienced Full Stack Developer to join our growing team.',
    highlights: [
      'Build and maintain scalable web applications using React and Node.js',
      'Lead technical architecture decisions and mentor junior developers',
      'Work closely with product and design teams to deliver features',
      'Experience with cloud platforms (AWS/GCP) required'
    ],
    requirements: [
      '7+ years of full-stack development experience',
      'Expert in React, Node.js, and TypeScript',
      'Experience with microservices architecture',
      'Strong system design and optimization skills'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: true,
    isHybrid: false,
    consultants: [
      {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        experience: "Senior Full Stack Engineer at Google",
        rate: 150,
        bookingUrl: "https://calendly.com/sarah-chen"
      },
      {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        experience: "Ex-TechCorp Engineering Manager",
        rate: 200,
        bookingUrl: "https://calendly.com/michael-rodriguez"
      }
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'WebSolutions Inc',
    logo: 'https://ui-avatars.com/api/?name=WS&background=2563eb&color=fff',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90k - $130k',
    description: 'Join our team as a Frontend Developer and help create beautiful, responsive web applications.',
    highlights: [
      'Develop responsive and accessible web interfaces',
      'Collaborate with UX designers to implement pixel-perfect designs',
      'Optimize application performance and loading times',
      'Participate in code reviews and technical discussions'
    ],
    requirements: [
      '3+ years of frontend development experience',
      'Strong proficiency in React and modern JavaScript',
      'Experience with CSS preprocessors and modern build tools',
      'Knowledge of web accessibility standards'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: false,
    isHybrid: true,
    consultants: [
      {
        name: "Emily Johnson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        experience: "Tech Lead at WebSolutions",
        rate: 175,
        bookingUrl: "https://calendly.com/emily-johnson"
      }
    ]
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'CloudScale',
    logo: 'https://ui-avatars.com/api/?name=CS&background=6d28d9&color=fff',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $160k',
    description: 'Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure.',
    highlights: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure using Infrastructure as Code',
      'Monitor system performance and optimize resource usage',
      'Implement security best practices and maintain compliance'
    ],
    requirements: [
      '5+ years of DevOps experience',
      'Expert in AWS/GCP and Kubernetes',
      'Strong scripting skills (Python, Bash)',
      'Experience with monitoring tools and log management'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: true,
    isHybrid: false,
    consultants: [
      {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        experience: "Senior DevOps Engineer at AWS",
        rate: 160,
        bookingUrl: "https://calendly.com/david-kim"
      },
      {
        name: "Lisa Thompson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        experience: "Cloud Architect at CloudScale",
        rate: 190,
        bookingUrl: "https://calendly.com/lisa-thompson"
      }
    ]
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    logo: 'https://ui-avatars.com/api/?name=DH&background=dc2626&color=fff',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$70k - $90k',
    description: 'Join our creative team as a UI/UX Designer to help create intuitive user experiences.',
    highlights: [
      'Create user-centered designs and interactive prototypes',
      'Conduct user research and usability testing',
      'Develop and maintain design systems',
      'Collaborate with developers on implementation'
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and design tools',
      'Strong portfolio demonstrating web/mobile projects',
      'Experience with user research methods'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: false,
    isHybrid: true,
    consultants: [
      {
        name: "Jessica Lee",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        experience: "Senior UI/UX Designer at DesignHub",
        rate: 140,
        bookingUrl: "https://calendly.com/jessica-lee"
      }
    ]
  },
  {
    id: 5,
    title: 'Machine Learning Engineer',
    company: 'AI Innovations',
    logo: 'https://ui-avatars.com/api/?name=AI&background=7c3aed&color=fff',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$140k - $200k',
    description: 'We are looking for a Machine Learning Engineer to help develop and deploy AI models.',
    highlights: [
      'Design and implement machine learning models',
      'Work with big data processing pipelines',
      'Optimize model performance and deployment',
      'Collaborate with research teams on new algorithms'
    ],
    requirements: [
      'MS/PhD in Computer Science or related field',
      'Strong background in machine learning and deep learning',
      'Experience with PyTorch or TensorFlow',
      'Proficiency in Python and data analysis tools'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: true,
    isHybrid: false,
    consultants: [
      {
        name: "Kevin White",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        experience: "Senior Machine Learning Engineer at AI Innovations",
        rate: 180,
        bookingUrl: "https://calendly.com/kevin-white"
      }
    ]
  },
  {
    id: 6,
    title: 'Junior Backend Developer',
    company: 'StartupX',
    logo: 'https://ui-avatars.com/api/?name=SX&background=059669&color=fff',
    location: 'Austin, TX',
    type: 'Internship',
    salary: '$50k - $70k',
    description: 'Great opportunity for a junior developer to gain experience with modern backend technologies.',
    highlights: [
      'Develop and maintain REST APIs',
      'Work with databases and caching systems',
      'Learn microservices architecture',
      'Participate in code reviews and team meetings'
    ],
    requirements: [
      'BS in Computer Science or equivalent experience',
      'Basic knowledge of Node.js and databases',
      'Understanding of REST APIs and web services',
      'Strong problem-solving skills'
    ],
    applyUrl: 'https://example.com/apply',
    isRemote: false,
    isHybrid: false,
    consultants: [
      {
        name: "Alex Brown",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        experience: "Backend Developer at StartupX",
        rate: 120,
        bookingUrl: "https://calendly.com/alex-brown"
      }
    ]
  }
];
