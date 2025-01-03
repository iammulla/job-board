// Natural language processing utilities
const processQuery = (query) => {
  const words = query.toLowerCase().split(/\s+/);
  const stems = words.map(word => word.replace(/(?:ing|ed|er|s)$/, ''));
  return { words, stems };
};

// Knowledge base categories
const categories = {
  SITE_NAVIGATION: 'site_navigation',
  JOB_SEARCH: 'job_search',
  APPLICATION: 'application',
  RESUME: 'resume',
  CONSULTANT: 'consultant',
  CAREER: 'career',
  FILTERS: 'filters',
  ACCOUNT: 'account',
  UNKNOWN: 'unknown'
};

// Topic classification patterns
const topicPatterns = {
  [categories.SITE_NAVIGATION]: {
    patterns: ['how', 'use', 'work', 'help', 'guide', 'tutorial', 'start', 'where', 'what'],
    responses: {
      default: "Let me help you navigate RoleArc! Here's how to get started:\n1. Browse jobs in swipe or list view\n2. Use filters to find relevant roles\n3. Upload your resume for better matches\n4. Quick Apply to jobs you like",
      features: "RoleArc's key features include:\n1. Smart Job Matching\n2. One-Click Applications\n3. Role Consultants\n4. Application Tracking\n5. Career Resources",
      tutorial: "Here's a quick tutorial:\n1. Start by uploading your resume\n2. Set your job preferences\n3. Browse jobs using swipe or list view\n4. Use filters to narrow down results\n5. Quick Apply to matching jobs"
    }
  },
  [categories.JOB_SEARCH]: {
    patterns: ['find', 'search', 'look', 'job', 'role', 'position', 'match', 'browse', 'discover'],
    responses: {
      default: "You can search for jobs in several ways:\n1. Use the search bar for keywords\n2. Apply filters for specific criteria\n3. Browse the swipe view for quick discovery\n4. Check your match scores",
      match: "Our matching system looks at:\n1. Your skills & experience\n2. Role requirements\n3. Location preferences\n4. Work style\n5. Career goals",
      browse: "Two ways to browse jobs:\n1. Swipe View: Quick, intuitive browsing\n2. List View: Detailed information\nUse filters to narrow down results!"
    }
  },
  [categories.APPLICATION]: {
    patterns: ['apply', 'submit', 'application', 'quick', 'process', 'status', 'track'],
    responses: {
      default: "Here's how to apply:\n1. Find a job you like\n2. Click 'Quick Apply'\n3. Review pre-filled info\n4. Add any required details\n5. Submit!",
      track: "Track your applications in real-time:\n1. View status in dashboard\n2. Get notifications\n3. Follow up with recruiters\n4. Set reminders",
      status: "Application statuses include:\n1. Submitted\n2. Under Review\n3. Interview Stage\n4. Decision Made\nCheck your dashboard for updates!"
    }
  },
  [categories.RESUME]: {
    patterns: ['resume', 'cv', 'upload', 'profile', 'document', 'experience'],
    responses: {
      default: "To upload your resume:\n1. Click 'Upload Resume' in the top bar\n2. Select your file (PDF preferred)\n3. We'll analyze it automatically\n4. Get personalized job matches",
      tips: "Resume tips for better matches:\n1. Use clear headings\n2. Include relevant skills\n3. Highlight achievements\n4. Keep it concise\n5. Update regularly",
      format: "Resume requirements:\n1. PDF format preferred\n2. Clear, readable font\n3. Professional layout\n4. Up to 2 pages\n5. Recent information"
    }
  },
  [categories.CONSULTANT]: {
    patterns: ['consultant', 'advisor', 'expert', 'guidance', 'advice', 'coach', 'help', 'mentor'],
    responses: {
      default: "Our Role Consultants can help with:\n1. Career guidance\n2. Resume review\n3. Interview prep\n4. Salary negotiation\n5. Industry insights",
      book: "To book a consultant:\n1. Choose your focus area\n2. Select available time slot\n3. Prepare your questions\n4. Join the video call",
      pricing: "Consultant services:\n1. Free initial consultation\n2. Resume review: $50\n3. Interview prep: $75\n4. Career planning: $100\n5. Package deals available"
    }
  },
  [categories.CAREER]: {
    patterns: ['career', 'path', 'growth', 'develop', 'skill', 'industry', 'learn', 'improve'],
    responses: {
      default: "Career development options:\n1. Skill assessments\n2. Learning resources\n3. Industry insights\n4. Mentor matching\n5. Career planning",
      planning: "Career planning steps:\n1. Assess current skills\n2. Set clear goals\n3. Identify growth areas\n4. Create action plan\n5. Track progress",
      skills: "Improve your skills through:\n1. Online courses\n2. Certifications\n3. Project work\n4. Mentorship\n5. Industry events"
    }
  }
};

// Get the most relevant response based on query content
const getDetailedResponse = (topic, query) => {
  const topicData = topicPatterns[topic];
  if (!topicData) return null;

  // Check for specific subtopics
  if (query.includes('status') || query.includes('track')) {
    return topicData.responses.track || topicData.responses.status || topicData.responses.default;
  }
  if (query.includes('tip') || query.includes('help')) {
    return topicData.responses.tips || topicData.responses.help || topicData.responses.default;
  }
  if (query.includes('book') || query.includes('schedule')) {
    return topicData.responses.book || topicData.responses.default;
  }
  if (query.includes('price') || query.includes('cost')) {
    return topicData.responses.pricing || topicData.responses.default;
  }
  if (query.includes('match') || query.includes('score')) {
    return topicData.responses.match || topicData.responses.default;
  }

  return topicData.responses.default;
};

// Generate contextual suggestions based on topic and previous interaction
const generateSuggestions = (topic, query) => {
  const suggestions = {
    [categories.SITE_NAVIGATION]: [
      'How to search for jobs?',
      'How to use filters?',
      'Where to upload resume?'
    ],
    [categories.JOB_SEARCH]: [
      'How do matches work?',
      'How to filter results?',
      'View saved jobs'
    ],
    [categories.APPLICATION]: [
      'Track my applications',
      'Application requirements',
      'Quick Apply help'
    ],
    [categories.RESUME]: [
      'Resume tips',
      'Update my resume',
      'Improve match score'
    ],
    [categories.CONSULTANT]: [
      'Book a consultation',
      'View consultant profiles',
      'Consultation pricing'
    ],
    [categories.CAREER]: [
      'Career planning help',
      'Skill development',
      'Industry insights'
    ],
    [categories.UNKNOWN]: [
      'How to use RoleArc?',
      'Search for jobs',
      'Talk to a consultant'
    ]
  };

  return suggestions[topic] || suggestions[categories.UNKNOWN];
};

// Identify topics in user query
const identifyTopics = (query) => {
  const { words, stems } = processQuery(query);
  let bestMatch = { topic: categories.UNKNOWN, matchCount: 0 };

  Object.entries(topicPatterns).forEach(([category, data]) => {
    const matchCount = data.patterns.filter(pattern => 
      words.includes(pattern) || 
      stems.includes(pattern) ||
      query.toLowerCase().includes(pattern)
    ).length;

    if (matchCount > bestMatch.matchCount) {
      bestMatch = { topic: category, matchCount };
    }
  });

  return bestMatch.topic;
};

// Generate response based on query
const generateResponse = (query) => {
  const topic = identifyTopics(query);
  const response = getDetailedResponse(topic, query.toLowerCase());
  const suggestions = generateSuggestions(topic, query);

  if (!response) {
    return {
      content: "I'm not quite sure about that. Could you rephrase your question? Here are some topics I can help with:\n1. Job searching\n2. Application process\n3. Resume tips\n4. Career guidance\n5. Role consultants",
      suggestions: ['How to use RoleArc?', 'Search for jobs', 'Talk to a consultant'],
      topic: categories.UNKNOWN
    };
  }

  return {
    content: response,
    suggestions,
    topic
  };
};

export { generateResponse, categories };
