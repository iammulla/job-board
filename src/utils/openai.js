import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const systemPrompt = `You are Rolly, an AI assistant for the RoleArc job board website. Your purpose is to help users navigate the site, apply for jobs, and connect with role consultants.

Key features you should know about:
1. Job Discovery: Users can browse jobs in swipe or list view
2. Filters: Users can filter by role type, location, work type, and salary
3. Resume Upload: Users can upload resumes for better job matches
4. Quick Apply: One-click job applications
5. Role Consultants: Career advisors available for guidance

Guidelines for responses:
- Be concise and clear
- Use bullet points or numbered lists for steps
- Provide specific, actionable advice
- Stay within the context of job search and career guidance
- When suggesting features, explain how to access them
- Maintain a helpful, professional tone

Remember: Your goal is to make the job search process easier and more efficient for users.`;

export async function getRollyResponse(userMessage, chatHistory) {
  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return {
      content: completion.choices[0].message.content,
      suggestions: generateSuggestions(userMessage, completion.choices[0].message.content)
    };
  } catch (error) {
    console.error('Error getting Rolly response:', error);
    return {
      content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
      suggestions: ['How to use RoleArc?', 'How to apply for jobs?', 'Talk to a consultant']
    };
  }
}

// Generate contextual suggestions based on the conversation
function generateSuggestions(userMessage, aiResponse) {
  const defaultSuggestions = [
    'How to use RoleArc?',
    'How to apply for jobs?',
    'Talk to a consultant'
  ];

  // Common follow-up patterns
  const suggestionPatterns = {
    'resume': ['How to improve matches?', 'Update resume', 'Resume tips'],
    'apply': ['Track applications', 'Application status', 'Quick Apply help'],
    'filter': ['Save filters', 'Reset filters', 'Search by location'],
    'consultant': ['Book consultation', 'Consultant pricing', 'What to expect'],
    'interview': ['Interview tips', 'Common questions', 'Preparation help'],
    'salary': ['Negotiation tips', 'Salary ranges', 'Benefits info']
  };

  // Find relevant suggestions based on the conversation context
  for (const [topic, suggestions] of Object.entries(suggestionPatterns)) {
    if (userMessage.toLowerCase().includes(topic) || 
        aiResponse.toLowerCase().includes(topic)) {
      return suggestions;
    }
  }

  return defaultSuggestions;
}
