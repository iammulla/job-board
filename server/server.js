const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const HUGGING_FACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base";

// Predefined responses and their follow-up suggestions
const predefinedResponses = {
  'how to apply for jobs': {
    content: `Applying for jobs on RoleArc is easy:

1. Find a job you're interested in
2. Click the "Quick Apply" button
3. Review your profile information
4. Add any additional required details
5. Submit your application

Your application will be tracked in your dashboard.`,
    suggestions: [
      'How do I create a profile?',
      'What happens after I apply?',
      'Can I track my applications?'
    ]
  },
  
  'how to use rolearc': {
    content: `Welcome to RoleArc! Here's how to get started:

1. Create your profile
2. Browse jobs by category or search
3. Save interesting positions
4. Quick Apply to jobs
5. Connect with role consultants

Need help with any of these steps?`,
    suggestions: [
      'How do I search for jobs?',
      'What are role consultants?',
      'How do I save jobs?'
    ]
  },

  'talk to a consultant': {
    content: `Role consultants are industry experts who can help with:

1. Career guidance
2. Resume review
3. Interview preparation
4. Salary negotiation
5. Industry insights

Click "Connect" on any consultant's profile to schedule a meeting.`,
    suggestions: [
      'How much do consultants cost?',
      'What is their availability?',
      'Can I see reviews?'
    ]
  }
};

// Function to generate contextual suggestions based on the response content
function getContextualSuggestions(response, query) {
  // If it's about applying to jobs
  if (response.toLowerCase().includes('apply') || query.toLowerCase().includes('apply')) {
    return [
      'What documents do I need?',
      'How long does it take?',
      'Can I apply to multiple jobs?'
    ];
  }

  // If it's about searching or filtering
  if (response.toLowerCase().includes('search') || response.toLowerCase().includes('filter')) {
    return [
      'What are the job categories?',
      'Can I save search filters?',
      'How do I set up job alerts?'
    ];
  }

  // If it's about profiles or resumes
  if (response.toLowerCase().includes('profile') || response.toLowerCase().includes('resume')) {
    return [
      'How to highlight skills?',
      'Can I have multiple resumes?',
      'What format is best?'
    ];
  }

  // If it's about interviews or preparation
  if (response.toLowerCase().includes('interview') || response.toLowerCase().includes('preparation')) {
    return [
      'Common interview questions?',
      'How to prepare?',
      'What to wear?'
    ];
  }

  // Default suggestions for other topics
  return [
    'Tell me about Quick Apply',
    'How do role consultants help?',
    'Tips for job search'
  ];
}

// Function to get AI response from HuggingFace
async function getAIResponse(message) {
  try {
    console.log('Calling HuggingFace API with key:', HUGGING_FACE_API_KEY?.slice(0, 5) + '...');
    
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Answer as a job search assistant: ${message}. Focus on providing actionable advice and next steps. Keep the response under 200 words.`,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('HuggingFace API error response:', error);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('HuggingFace API response:', data);

    if (Array.isArray(data) && data[0] && typeof data[0] === 'string') {
      return data[0];
    } else if (typeof data === 'string') {
      return data;
    } else if (data && data.generated_text) {
      return data.generated_text;
    }

    console.error('Unexpected API response format:', data);
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('HuggingFace API error:', error);
    throw error;
  }
}

// Function to get response
async function getResponse(message) {
  const normalizedMessage = message.toLowerCase().trim().replace(/[?!.,]/g, '');
  
  // Check for exact match first
  if (predefinedResponses[normalizedMessage]) {
    console.log('Found exact match for:', normalizedMessage);
    return {
      content: predefinedResponses[normalizedMessage].content,
      suggestions: predefinedResponses[normalizedMessage].suggestions
    };
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
      console.log('Found partial match:', key);
      return {
        content: response.content,
        suggestions: response.suggestions
      };
    }
  }

  // If no predefined response, use HuggingFace
  try {
    console.log('Getting AI response for:', message);
    const aiResponse = await getAIResponse(message);
    return {
      content: aiResponse,
      suggestions: getContextualSuggestions(aiResponse, message)
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    return {
      content: `I apologize, but I'm having trouble generating a response right now. Here are some helpful resources instead:

1. Check our "Quick Apply" feature for faster applications
2. Connect with a Role Consultant for personalized advice
3. Use our resume analyzer for feedback
4. Browse success stories from other job seekers

Would you like to know more about any of these options?`,
      suggestions: [
        'What is Quick Apply?',
        'Find a consultant',
        'Resume tips'
      ]
    };
  }
}

const sessions = {};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message) {
      throw new Error('Message is required');
    }

    // Get response (predefined or AI)
    const response = await getResponse(message);
    
    // Track message count for this session
    if (!sessions[sessionId]) {
      sessions[sessionId] = { messageCount: 0 };
    }
    sessions[sessionId].messageCount++;
    
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Something went wrong',
      content: 'I apologize, but I encountered an error. Please try again.',
      suggestions: [
        'Try a different question',
        'Browse job categories',
        'Talk to support'
      ]
    });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});
