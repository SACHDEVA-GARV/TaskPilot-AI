// todo-backend/services/aiService.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateTaskPriority(task, dueDate) {
    try {
      const prompt = `
        Analyze this task and assign a priority score from 1-5 (1 = lowest, 5 = highest priority):
        
        Task: "${task}"
        Due Date: ${dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}
        Today's Date: ${new Date().toLocaleDateString()}
        
        Consider:
        - Urgency based on due date proximity
        - Task complexity and importance keywords
        - Time-sensitive nature
        
        Respond with ONLY a number from 1-5. No explanations.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const priorityText = response.text().trim();
      
      // Parse the priority score and ensure it's between 1-5
      const priority = parseInt(priorityText);
      return Math.max(1, Math.min(5, priority || 3)); // Default to 3 if parsing fails
    } catch (error) {
      console.error('Error generating task priority:', error);
      return 3; // Default priority
    }
  }

  async generateDailySummary(tasks) {
    try {
      if (!tasks || tasks.length === 0) {
        return "No tasks for today. It's a great day to plan ahead!";
      }

      // Format tasks for the AI
      const taskList = tasks
        .filter(task => !task.completed)
        .sort((a, b) => (b.aiPriority || 3) - (a.aiPriority || 3))
        .slice(0, 10) // Top 10 tasks
        .map(task => {
          const dueDate = task.date ? new Date(task.date).toLocaleDateString() : 'No due date';
          return `- ${task.task} (Priority: ${task.aiPriority || 3}, Due: ${dueDate})`;
        })
        .join('\n');

      const prompt = `
        Generate a motivational daily summary for these pending tasks. Keep it to 2-3 sentences maximum.
        Focus on the highest priority items and encourage productivity.
        
        Tasks:
        ${taskList}
        
        Today's Date: ${new Date().toLocaleDateString()}
        
        Make the summary:
        - Encouraging and positive
        - Brief (2-3 sentences max)
        - Focus on top priorities
        - Actionable
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating daily summary:', error);
      return "You have tasks to complete today. Stay focused and tackle them one by one!";
    }
  }

  async bulkUpdatePriorities(tasks) {
    const updatedTasks = [];
    
    for (const task of tasks) {
      if (!task.aiPriority) {
        const priority = await this.generateTaskPriority(task.task, task.date);
        updatedTasks.push({
          ...task,
          aiPriority: priority
        });
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        updatedTasks.push(task);
      }
    }
    
    return updatedTasks;
  }
}

module.exports = new AIService();