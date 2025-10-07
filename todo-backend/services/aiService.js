const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  }

  async generateTaskPriority(task, dueDate) {
    try {
      const prompt = `
        You are an expert productivity assistant. Analyze the following task and assign a priority score from 1-5 (1 = Minimal, 5 = Critical):

        Task: "${task}"
        Due Date: ${dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}
        Today's Date: ${new Date().toLocaleDateString()}

        Consider:
        - How soon the due date is (the closer, the higher the priority)
        - If the task sounds urgent, important, or time-sensitive
        - If the task is complex or has keywords like urgent, ASAP, deadline, important, critical, etc.
        - If the task is routine or can be delayed, assign a lower priority

        Respond with ONLY a number from 1-5. No explanations, just the number.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const priorityText = response.text().trim();
      const priority = parseInt(priorityText);
      return Math.max(1, Math.min(5, priority || 3));
    } catch (error) {
      console.error('Error generating task priority:', error);
      return 1;
    }
  }

  async generateSmartPriorities(tasks) {
    try {
      if (!tasks || tasks.length === 0) {
        return [];
      }

      // Step 1: Get AI scores for each task individually
      const aiScores = [];
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const score = await this.generateTaskPriority(task.task, task.date);
        aiScores.push({ taskIndex: i, task: task.task, aiScore: score });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Step 2: Apply smart distribution logic
      let finalPriorities;
      if (tasks.length <= 5) {
        finalPriorities = this.forceUniquePriorities(aiScores);
      } else {
        finalPriorities = this.distributeAcrossLevels(aiScores);
      }
      return finalPriorities;
    } catch (error) {
      return this.getFallbackPriorities(tasks.length);
    }
  }

  // Force unique priorities for 1-5 tasks
  forceUniquePriorities(aiScores) {
    const taskCount = aiScores.length;
    
    // Sort tasks by AI score (highest first)
    const sortedTasks = [...aiScores].sort((a, b) => b.aiScore - a.aiScore);
    
    // Available unique priorities (highest to lowest)
    const availablePriorities = [5, 4, 3, 2, 1].slice(0, taskCount);
    
    // Create result array
    const result = new Array(taskCount);
    
    // Assign unique priorities based on AI ranking
    for (let i = 0; i < sortedTasks.length; i++) {
      const taskIndex = sortedTasks[i].taskIndex;
      result[taskIndex] = availablePriorities[i];
    }
    
    return result;
  }

  // Distribute across all priority levels for 6+ tasks
  distributeAcrossLevels(aiScores) {
    const taskCount = aiScores.length;
    
    // Sort tasks by AI score (highest first)
    const sortedTasks = [...aiScores].sort((a, b) => b.aiScore - a.aiScore);
    
    // Calculate how many tasks per priority level
    const tasksPerLevel = Math.ceil(taskCount / 5);
    
    // Create result array
    const result = new Array(taskCount);
    
    // Assign priorities in groups
    for (let i = 0; i < sortedTasks.length; i++) {
      const taskIndex = sortedTasks[i].taskIndex;
      const priorityLevel = Math.max(1, 5 - Math.floor(i / tasksPerLevel));
      result[taskIndex] = priorityLevel;
    }
    
    return result;
  }

  // Get priority label for logging
  getPriorityLabel(priority) {
    const labels = {
      5: 'Critical 🔴',
      4: 'High 🟠',
      3: 'Medium 🟡',
      2: 'Low 🟢',
      1: 'Minimal ⚪'
    };
    return labels[priority] || 'Unknown';
  }

  // Get priority distribution for logging
  getPriorityDistribution(priorities) {
    const distribution = {};
    priorities.forEach(p => {
      const label = this.getPriorityLabel(p);
      distribution[`${p} (${label})`] = (distribution[`${p} (${label})`] || 0) + 1;
    });
    return distribution;
  }

  // Fallback priorities if everything fails
  getFallbackPriorities(taskCount) {
    console.log('🚨 Using fallback priority assignment');
    
    if (taskCount <= 5) {
      // Return unique priorities: [5, 4, 3, 2, 1]
      return [5, 4, 3, 2, 1].slice(0, taskCount);
    } else {
      // Cycle through priorities: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1, ...]
      const result = [];
      const priorities = [5, 4, 3, 2, 1];
      for (let i = 0; i < taskCount; i++) {
        result.push(priorities[i % 5]);
      }
      return result;
    }
  }

  async generateDailySummary(tasks) {
    try {
      if (!tasks || tasks.length === 0) {
        return "No tasks for today. It's a great day to plan ahead!";
      }

      const taskList = tasks
        .filter(task => !task.completed)
        .sort((a, b) => (b.aiPriority || 3) - (a.aiPriority || 3))
        .slice(0, 10)
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
      
      // --- NEW DEBUGGING LOG #1: See the raw response ---
      console.log('--- DEBUG: Raw API Response ---');
      console.log(JSON.stringify(response, null, 2)); 
      // --- END OF DEBUGGING LOG ---

      return response.text().trim();
    } catch (error) {
      // --- MODIFIED DEBUGGING LOG #2: See the full error object ---
      console.error('--- ERROR: Full error object from generateDailySummary ---');
      console.error(error);
      // --- END OF DEBUGGING LOG ---
      return "sleep well!";
      //return "You have tasks to complete today. Stay focused and tackle them one by one!";
    }
  }
}

module.exports = new AIService();