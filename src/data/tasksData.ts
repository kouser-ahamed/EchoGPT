import { TaskCategory, TaskItem } from '../@types';

export const TASK_CATEGORIES: TaskCategory[] = ['Ideas', 'Work', 'Fun', 'Online Content'];

export const AI_TASKS: TaskItem[] = [
  // ===================== IDEAS (5 Cards) =====================
  {
    id: 'task-ideas-1',
    category: 'Ideas',
    title: 'Think Outside the Box',
    description: 'Breakthrough ideas await your discovery',
    promptTemplate: 'Challenge traditional assumptions about this domain and propose 5 radical, lateral, high-upside breakthrough ideas:',
    icon: 'Lightbulb',
    color: 'from-amber-500 to-orange-500',
    popular: true
  },
  {
    id: 'task-ideas-2',
    category: 'Ideas',
    title: 'Startup',
    description: 'Get a list of ambitious startup ideas based on your area of interest',
    promptTemplate: 'Generate a curated list of ambitious, venture-scalable startup ideas based on this target area of interest with defensible moats:',
    icon: 'Rocket',
    color: 'from-indigo-500 to-purple-600',
    popular: true
  },
  {
    id: 'task-ideas-3',
    category: 'Ideas',
    title: 'Innovate and Elevate',
    description: 'Your guide to unique and fresh ideas',
    promptTemplate: 'Provide fresh, innovative perspectives to reimagine and elevate this existing concept into a market-leading product:',
    icon: 'Sparkles',
    color: 'from-cyan-500 to-blue-600',
    popular: false
  },
  {
    id: 'task-ideas-4',
    category: 'Ideas',
    title: 'Unleashing Creativity',
    description: 'Explore a world of brilliant ideas',
    promptTemplate: 'Unlock high-yield creative exploration by identifying unseen angles, analogies, and unexpected connections for:',
    icon: 'Compass',
    color: 'from-fuchsia-500 to-pink-600',
    popular: false
  },
  {
    id: 'task-ideas-5',
    category: 'Ideas',
    title: 'Idea Sparks',
    description: 'Ignite your creativity for innovative solutions',
    promptTemplate: 'Ignite creative momentum with 10 divergent, rapid-fire concept sparks and practical execution experiments for:',
    icon: 'Zap',
    color: 'from-yellow-400 to-amber-500',
    popular: false
  },

  // ===================== WORK (5 Cards) =====================
  {
    id: 'task-work-1',
    category: 'Work',
    title: 'Max Productivity',
    description: 'Max productivity, achieve more, stress less',
    promptTemplate: 'Design an optimized time-blocking protocol, high-leverage prioritization matrix, and distraction-elimination plan for:',
    icon: 'CheckSquare',
    color: 'from-blue-600 to-indigo-600',
    popular: true
  },
  {
    id: 'task-work-2',
    category: 'Work',
    title: 'Recruiting',
    description: 'Define the qualifications for any position',
    promptTemplate: 'Draft a comprehensive job specification, core competencies, scorecard rubrics, and technical interview questions for this role:',
    icon: 'Users',
    color: 'from-emerald-500 to-teal-600',
    popular: true
  },
  {
    id: 'task-work-3',
    category: 'Work',
    title: 'CV Builder',
    description: 'Generate a creative resume',
    promptTemplate: 'Build an executive, high-impact resume summary, metric-driven bullet points, and skills hierarchy based on this background:',
    icon: 'FileText',
    color: 'from-purple-600 to-pink-600',
    popular: true
  },
  {
    id: 'task-work-4',
    category: 'Work',
    title: 'Email',
    description: 'Get help to craft a compelling email',
    promptTemplate: 'Craft a compelling, clear, and action-oriented executive email that commands attention and drives a prompt response for:',
    icon: 'Mail',
    color: 'from-sky-500 to-cyan-600',
    popular: false
  },
  {
    id: 'task-work-5',
    category: 'Work',
    title: 'Interview Tips',
    description: 'Receive helpful tips for your interview',
    promptTemplate: 'Provide tactical interview preparation tips, STAR-method storytelling frameworks, and answers to challenging questions for:',
    icon: 'HelpCircle',
    color: 'from-rose-500 to-red-600',
    popular: false
  },

  // ===================== FUN (5 Cards) =====================
  {
    id: 'task-fun-1',
    category: 'Fun',
    title: 'Gaming',
    description: 'Level up your gaming skills and conquer challenges',
    promptTemplate: 'Provide advanced strategy guides, build optimizations, and boss battle counter-tactics for this gaming challenge:',
    icon: 'Gamepad2',
    color: 'from-pink-500 to-rose-600',
    popular: true
  },
  {
    id: 'task-fun-2',
    category: 'Fun',
    title: 'Movie Time',
    description: 'Cinematic delight, enjoy the latest blockbuster',
    promptTemplate: 'Recommend an unforgettable personalized movie watchlist with plot hooks, thematic depth, and where to stream based on:',
    icon: 'Film',
    color: 'from-violet-600 to-indigo-600',
    popular: true
  },
  {
    id: 'task-fun-3',
    category: 'Fun',
    title: 'Cycling Day',
    description: 'Pedal through scenic routes, relish the ride',
    promptTemplate: 'Plan an invigorating cycling itinerary including scenic route checkpoints, pacing strategies, and gear checklists for:',
    icon: 'Bike',
    color: 'from-emerald-500 to-green-600',
    popular: false
  },
  {
    id: 'task-fun-4',
    category: 'Fun',
    title: 'Outdoor Activities',
    description: 'Embrace nature, engage in thrilling outdoor adventures',
    promptTemplate: 'Curate a thrilling outdoor excursion plan, trail safety guidelines, and nature exploration activities for:',
    icon: 'Mountain',
    color: 'from-amber-600 to-orange-700',
    popular: false
  },
  {
    id: 'task-fun-5',
    category: 'Fun',
    title: 'Fun with buddies',
    description: 'Create memories with friends, have endless fun',
    promptTemplate: 'Suggest unforgettable group activities, party games, and interactive challenges to create lasting memories with friends:',
    icon: 'Smile',
    color: 'from-cyan-500 to-teal-600',
    popular: false
  },

  // ===================== ONLINE CONTENT (10 Cards) =====================
  {
    id: 'task-content-1',
    category: 'Online Content',
    title: 'X Posts',
    description: 'Craft viral, high-engagement tweets and threaded insights for X',
    promptTemplate: 'Write a high-converting, punchy 5-tweet thread with curiosity hook, bulleted takeaways, and viral engagement formatting for:',
    icon: 'Share2',
    color: 'from-sky-500 to-blue-600',
    popular: true
  },
  {
    id: 'task-content-2',
    category: 'Online Content',
    title: 'YouTube Scripts',
    description: 'Script structured videos with retention loops, visual cues, and strong CTAs',
    promptTemplate: 'Write a retention-optimized YouTube video script with 5-second hook, pacing cues, B-roll callouts, and call to action on:',
    icon: 'Video',
    color: 'from-red-500 to-rose-600',
    popular: true
  },
  {
    id: 'task-content-3',
    category: 'Online Content',
    title: 'TikTok Posts',
    description: 'Produce high-tempo 9:16 short-form video concepts with visual hooks',
    promptTemplate: 'Generate 3 high-tempo TikTok video concepts with 3-second pattern interrupts, text overlays, and trending sound ideas on:',
    icon: 'Smartphone',
    color: 'from-purple-500 to-indigo-600',
    popular: true
  },
  {
    id: 'task-content-4',
    category: 'Online Content',
    title: 'TikTok Captions',
    description: 'Write search-optimized captions with trending hashtags and emoji cadence',
    promptTemplate: 'Write 5 punchy TikTok captions with search-optimized keywords, emoji spacing, and high-visibility hashtags for:',
    icon: 'Tag',
    color: 'from-fuchsia-500 to-pink-600',
    popular: false
  },
  {
    id: 'task-content-5',
    category: 'Online Content',
    title: 'Insta Content',
    description: 'Design educational multi-slide carousel outlines with high save rates',
    promptTemplate: 'Outline an 8-slide educational Instagram carousel with compelling cover headline, value slides, and final save prompt on:',
    icon: 'Layers',
    color: 'from-pink-500 to-amber-500',
    popular: true
  },
  {
    id: 'task-content-6',
    category: 'Online Content',
    title: 'Insta Reels',
    description: 'Create fast-paced visual reel concepts with on-screen text and voiceover',
    promptTemplate: 'Script a 30-second Instagram Reel with scene-by-scene audio narration, on-screen text, and quick camera cuts for:',
    icon: 'Play',
    color: 'from-rose-500 to-orange-500',
    popular: false
  },
  {
    id: 'task-content-7',
    category: 'Online Content',
    title: 'Insta Captions',
    description: 'Write aesthetic, storytelling captions with question hooks and formatting',
    promptTemplate: 'Write 3 aesthetic Instagram captions with compelling opening hooks, conversational micro-stories, and comments prompt for:',
    icon: 'MessageCircle',
    color: 'from-indigo-500 to-purple-600',
    popular: false
  },
  {
    id: 'task-content-8',
    category: 'Online Content',
    title: 'LinkedIn Hiring',
    description: 'Author inspiring hiring posts to attract top-tier engineering talent',
    promptTemplate: 'Draft an authentic, inspiring LinkedIn hiring post highlighting our mission, team culture, growth opportunities, and open role for:',
    icon: 'Briefcase',
    color: 'from-blue-600 to-indigo-700',
    popular: true
  },
  {
    id: 'task-content-9',
    category: 'Online Content',
    title: 'LinkedIn Job Search',
    description: 'Personalize outreach messages to hiring managers and talent recruiters',
    promptTemplate: 'Draft a respectful, high-converting 80-word direct message to a hiring manager expressing passion and relevant achievements for:',
    icon: 'Send',
    color: 'from-cyan-600 to-blue-700',
    popular: false
  },
  {
    id: 'task-content-10',
    category: 'Online Content',
    title: 'LinkedIn Profile',
    description: 'Create memorable posts on LinkedIn',
    promptTemplate: 'Craft an authoritative, memorable thought-leadership post for LinkedIn with clear takeaways and clean whitespace on:',
    icon: 'Linkedin',
    color: 'from-blue-500 to-cyan-600',
    popular: true
  }
];
