const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Testimonial = require("./models/Testimonial");
const FAQ = require("./models/FAQ");
const Feature = require("./models/Feature");
const MeditationCategory = require("./models/MeditationCategory");
const MeditationSession = require("./models/MeditationSession");
const connectDB = require("./config/database");

dotenv.config();

connectDB();

const testimonials = [
  {
    name: "Aarav Patel",
    role: "Student",
    quote:
      "Doing one 10‑minute breathing session before bed has made my sleep so much better. I actually wake up refreshed now.",
    rating: 5,
    color: "bg-[#8ea8a2]",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Freelancer",
    quote:
      "The quick sessions during my study breaks helped me reduce exam anxiety. It's like a reset button for my brain.",
    rating: 5,
    color: "bg-[#e8dcb8]",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Rohan Gupta",
    role: "Marketing Manager",
    quote:
      "I love the privacy focus. I can track my mood without worry. The insights have been eye-opening.",
    rating: 5,
    color: "bg-[#d1ee5d]",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Ananya Iyer",
    role: "Developer",
    quote:
      "Simple, clean, and no nonsense. Exactly what I needed to manage my daily stress levels.",
    rating: 5,
    color: "bg-[#235851]",
    image:
      "https://images.unsplash.com/photo-1601288496920-b61370b5e50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Vikram Reddy",
    role: "Artist",
    quote:
      "The visual design is so calming. Just opening the app makes me feel 10% lighter.",
    rating: 5,
    color: "bg-[#f1f3e0]",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Meera Nair",
    role: "Teacher",
    quote:
      "Guided exercises for work pressure effectively saved my sanity during finals week.",
    rating: 5,
    color: "bg-[#8ea8a2]",
    image:
      "https://images.unsplash.com/photo-1554196344-9842f1504933?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Arjun Das",
    role: "Nurse",
    quote:
      "Short and effective. I use it in the breakroom for 5 minutes and it makes a huge difference.",
    rating: 5,
    color: "bg-[#e8a83e]",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Sanya Kapoor",
    role: "Entrepreneur",
    quote:
      "The streaks keep me motivated. It's the only habit tracker that has actually stuck.",
    rating: 5,
    color: "bg-[#235851]",
    image:
      "https://images.unsplash.com/photo-1588636502075-84dc53e8d77d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Kabir Joshi",
    role: "Yoga Instructor",
    quote:
      "A wonderful digital companion to my physical practice. Highly recommend.",
    rating: 5,
    color: "bg-[#d1ee5d]",
    image:
      "https://images.unsplash.com/photo-1563584316028-2b70b3a3aeb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Diya Bhatia",
    role: "Engineer",
    quote:
      "Data-driven relaxation. seeing my average stress score drop has been incredibly validating.",
    rating: 5,
    color: "bg-[#557c74]",
    image:
      "https://images.unsplash.com/photo-1610444583733-4ca24976c6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const faqs = [
  {
    question: "What is this portal actually for?",
    answer:
      "It helps you manage daily stress with guided relaxation, short meditations, breathing exercises, and mood tracking—all in one place.",
  },
  {
    question: "I’m very busy. Do I need a lot of time every day?",
    answer:
      "No. Most sessions are 5–15 minutes, and you can use quick relief tools whenever you feel stressed.",
  },
  {
    question: "Do I need any prior experience with meditation?",
    answer:
      "Not at all. The sessions are beginner‑friendly and give step‑by‑step audio guidance.",
  },
  {
    question: "How is this different from other meditation apps?",
    answer:
      "The content is personalized to your stress triggers, mood, and available time instead of being the same for everyone.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Your mood logs and personal details are stored securely and are never shared or sold.",
  },
  {
    question: "Can I use it on mobile and desktop?",
    answer:
      "Yes. The portal is responsive and works in any modern browser, so you can use it on phone, tablet, or laptop.",
  },
  {
    question: "What happens if I stop using it?",
    answer:
      "Nothing is forced. You can pause anytime and come back later; your data and progress will still be there.",
  },
];

const features = [
  {
    title: "AI-Powered Just For You",
    description:
      "Our intelligent system learns your preferences and suggests meditations tailored to your mood, stress level, and available time.",
    iconName: "Brain",
    color: "bg-[#d1ee5d]",
    textColor: "text-[#235851]",
    ctaText: "See Recommendations",
    order: 1,
  },
  {
    title: "See Your Growth",
    description:
      "Track meditation streaks, mood improvements, and unlock badges as you progress. Watch as your stress levels drop week by week.",
    iconName: "Trophy",
    color: "bg-[#e8a83e]",
    textColor: "text-[#235851]",
    statText: "Average 35% mood improvement in 30 days",
    order: 2,
  },
  {
    title: "Every Technique You Need",
    description:
      "From guided meditation and breathing exercises to yoga and sleep stories—find what works for YOUR relaxation style.",
    iconName: "Library",
    color: "bg-[#235851]",
    textColor: "text-[#f1f3e0]",
    quickStats: "500+ Sessions - 50+ Instructors - 7 Categories",
    order: 3,
  },
  {
    title: "Your Privacy is Sacred",
    description:
      "End-to-end encryption for your mental health data. We never sell or share your information. Your wellness journey stays yours.",
    iconName: "Shield",
    color: "bg-[#f1f3e0]",
    textColor: "text-[#235851]",
    order: 4,
  },
  {
    title: "Research-Proven Techniques",
    description:
      "Every meditation and exercise is based on peer-reviewed mindfulness research and certified by wellness experts.",
    iconName: "Gauge",
    color: "bg-[#8ea8a2]",
    textColor: "text-[#235851]",
    order: 5,
  },
  {
    title: "Meditate Anywhere, Anytime",
    description:
      "Web, mobile, tablet—access your calm sanctuary on any device. Offline content available.",
    iconName: "Smartphone",
    color: "bg-[#2e5c55]", // Darker teal base
    textColor: "text-[#f1f3e0]",
    order: 6,
  },
];

const importData = async () => {
  try {
    await Testimonial.deleteMany();
    await FAQ.deleteMany();
    await Feature.deleteMany();
    await MeditationCategory.deleteMany();
    await MeditationSession.deleteMany();

    await Testimonial.insertMany(testimonials);
    await FAQ.insertMany(faqs);
    await Feature.insertMany(features);

    // --- SEED MEDITATIONS ---
    const categoriesData = [
      {
        title: "Breathing Meditation",
        description: "Regulate your nervous system via controlled breath work.",
        bestFor: "Stress, anxiety, panic, sleep",
        durationRange: "3–10 min",
        iconName: "Wind",
        color: "bg-[#e8a83e]",
        textColor: "text-[#235851]",
        order: 1,
      },
      {
        title: "Mindfulness Meditation",
        description: "Train present-moment awareness without judgment.",
        bestFor: "Focus, emotional regulation",
        durationRange: "5–15 min",
        iconName: "Brain",
        color: "bg-[#d1ee5d]",
        textColor: "text-[#235851]",
        order: 2,
      },
      {
        title: "Body Scan Meditation",
        description: "Release physical tension and reconnect with your body.",
        bestFor: "Fatigue, pain, sleep",
        durationRange: "10–20 min",
        iconName: "Activity",
        color: "bg-[#8ea8a2]",
        textColor: "text-[#235851]",
        order: 3,
      },
      {
        title: "Guided Meditation",
        description: "Instruction-based sessions for deep relaxation and work.",
        bestFor: "Beginners, emotional processing",
        durationRange: "10–30 min",
        iconName: "Mic",
        color: "bg-[#2e5c55]",
        textColor: "text-[#f1f3e0]",
        order: 4,
      },
      {
        title: "Loving-Kindness",
        description: "Cultivate compassion, warmth, and positive affect.",
        bestFor: "Loneliness, self-criticism",
        durationRange: "10–20 min",
        iconName: "Heart",
        color: "bg-[#f1f3e0]",
        textColor: "text-[#235851]",
        order: 5,
      },
      {
        title: "Movement-Based Mindfulness",
        description:
          "Gentle yoga and movement for those who struggle with stillness.",
        bestFor: "Restlessness, desk stress",
        durationRange: "5–15 min",
        iconName: "Sun",
        color: "bg-[#e8dcb8]",
        textColor: "text-[#235851]",
        order: 6,
      },
      {
        title: "Grounding & Anxiety Relief",
        description: "Immediate calming techniques for high stress and panic.",
        bestFor: "Acute anxiety, panic attacks",
        durationRange: "2–5 min",
        iconName: "Anchor",
        color: "bg-[#557c74]",
        textColor: "text-[#f1f3e0]",
        order: 7,
      },
      {
        title: "Sleep & Recovery",
        description: "Deep relaxation practices to help you drift off.",
        bestFor: "Insomnia, burnout",
        durationRange: "15–45 min",
        iconName: "Moon",
        color: "bg-[#235851]",
        textColor: "text-[#f1f3e0]",
        order: 8,
      },
      {
        title: "Ambient Music",
        description: "Soothing soundscapes for deep focus and relaxation.",
        bestFor: "Focus, reading, sleep",
        durationRange: "10–60 min",
        iconName: "Music",
        color: "bg-[#d1ee5d]",
        textColor: "text-[#235851]",
        order: 9,
      },
      {
        title: "Therapy Sounds",
        description: "Nature sounds and white noise for healing and sleep.",
        bestFor: "Sleep, anxiety masking",
        durationRange: "15–90 min",
        iconName: "CloudRain",
        color: "bg-[#8ea8a2]",
        textColor: "text-[#235851]",
        order: 10,
      },
      {
        title: "Binaural Beats",
        description: "Brainwave entrainment frequencies for altered states.",
        bestFor: "Deep meditation, study",
        durationRange: "15–45 min",
        iconName: "Headphones",
        color: "bg-[#2e5c55]",
        textColor: "text-[#f1f3e0]",
        order: 11,
      },
    ];

    const createdCategories = await MeditationCategory.insertMany(
      categoriesData
    );

    // Helper to find category ID
    const getCatId = (title) =>
      createdCategories.find((c) => c.title === title)._id;

    const sessions = [
      // 1. Mindfulness
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Breath Awareness",
        description:
          "Focus attention on natural breathing without controlling it.",
        duration: 600,
        tags: ["beginners", "stress"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Find a comfortable seat.",
          "Bring attention to your nostrils.",
          "Feel the cool air entering.",
          "Feel the warm air leaving.",
          "When mind wanders, gently return to breath.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Thought Observation",
        description:
          "Observe thoughts as passing events rather than engaging with them.",
        duration: 900,
        tags: ["anxiety", "reactivity"],
        imageUrl:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Sit quietly.",
          "Imagine your mind is the sky.",
          "Thoughts are just clouds passing.",
          "Do not judge them.",
          "Let them float by.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Silent Sitting",
        description:
          "Sit quietly with open awareness of breath, body, and thoughts.",
        duration: 1200,
        tags: ["discipline", "advanced"],
        imageUrl:
          "https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Sit in dignified posture.",
          "Open awareness to sounds, sensations, thoughts.",
          "Do not hold onto anything.",
          "Just sit.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Counting Breath",
        description:
          "Count breaths to maintain attention and prevent mind wandering.",
        duration: 600,
        tags: ["focus", "beginners"],
        imageUrl:
          "https://images.unsplash.com/photo-1620802051782-4299b9e67d26?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale, count 'one'.",
          "Exhale, count 'two'.",
          "Continue up to ten.",
          "Restart at one.",
          "If you lose count, restart gently.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Emotion Labeling",
        description:
          "Silently name emotions as they arise to reduce overwhelm.",
        duration: 600,
        tags: ["emotions", "stress"],
        imageUrl:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Notice how you feel.",
          "Label it gently: 'stress', 'anger', 'sadness'.",
          "Feel where it is in the body.",
          "Breathe into it.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Mindful Listening",
        description:
          "Focus full attention on sounds without judgment or interpretation.",
        duration: 600,
        tags: ["awareness", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Close your eyes.",
          "Listen to the furthest sound you can hear.",
          "Listen to the nearest sound.",
          "Listen to the silence between sounds.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Mindful Walking",
        description:
          "Pay attention to movement, balance, and sensations while walking.",
        duration: 900,
        tags: ["movement", "anxiety"],
        imageUrl:
          "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Walk slower than usual.",
          "Feel the heel strike.",
          "Feel the roll to toe.",
          "Notice the shifting balance.",
          "Keep eyes soft.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Single-Task Attention",
        description: "Focus fully on one simple task to train deep focus.",
        duration: 600,
        tags: ["focus", "work"],
        imageUrl:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Choose one object or sensation.",
          "Give it 100% of your attention.",
          "Notice details you usually miss.",
          "Return focus when it drifts.",
        ],
      },
      {
        category: getCatId("Mindfulness Meditation"),
        title: "Present-Moment Awareness",
        description: "Open awareness to whatever is happening now.",
        duration: 900,
        tags: ["balance", "daily"],
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Sit comfortably.",
          "Ask yourself: 'What is happening right now?'",
          "Notice thoughts, sounds, sensations.",
          "Allow everything to be as it is.",
        ],
      },

      // 2. Breathing
      {
        category: getCatId("Breathing Meditation"),
        title: "Deep Belly Breathing",
        description:
          "Activates the parasympathetic (relaxation) response by engaging the diaphragm instead of shallow chest breathing.",
        duration: 300,
        tags: ["daily stress", "beginners", "fatigue", "exams"],
        imageUrl:
          "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Hand on belly.",
          "Inhale deeply, feel belly rise.",
          "Exhale slowly, feel belly fall.",
          "Keep chest still.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Box Breathing (4-4-4-4)",
        description:
          "Uses structured breath holding to stabilize breathing rhythm and nervous system.",
        duration: 300,
        tags: ["high stress", "panic", "focus"],
        imageUrl:
          "https://images.unsplash.com/photo-1599447421405-0e320d957d5f?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale for 4 seconds.",
          "Hold for 4 seconds.",
          "Exhale for 4 seconds.",
          "Hold empty for 4 seconds.",
          "Repeat.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "4-7-8 Breathing",
        description:
          "Extends exhalation to promote deep relaxation and sedation response.",
        duration: 240,
        tags: ["sleep", "anxiety", "insomnia"],
        imageUrl:
          "https://images.unsplash.com/photo-1527255630459-d87747e93dc4?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale quietly through nose for 4.",
          "Hold breath for 7.",
          "Exhale forcefully through mouth for 8.",
          "Repeat 4 cycles.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Nadi Shodhana",
        description:
          "Balances activity between left and right hemispheres of the brain by alternating nostrils.",
        duration: 450,
        tags: ["balance", "mental fatigue", "clarity"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Close right nostril with thumb.",
          "Inhale left.",
          "Close left, open right, exhale.",
          "Inhale right.",
          "Close right, open left, exhale.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Bhramari Pranayama",
        description:
          "Creates soothing vibrations in the skull and vagus nerve via humming exhalation.",
        duration: 300,
        tags: ["anger", "headaches", "tension"],
        imageUrl:
          "https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Cover ears with thumbs.",
          "Covver eyes with fingers.",
          "Inhale deep.",
          "Exhale making a humming sound like a bee.",
          "Feel the vibration.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Sama Vritti",
        description:
          "Balances inhale and exhale length to create rhythmic, steady breathing.",
        duration: 390,
        tags: ["mindfulness", "balance", "focus"],
        imageUrl:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale for count of 4.",
          "Exhale for count of 4.",
          "Increase count as comfortable.",
          "Keep flow smooth.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Ujjayi Breathing",
        description:
          "Uses gentle throat constriction to slow breath and increase breath awareness.",
        duration: 450,
        tags: ["yoga", "focus", "energy"],
        imageUrl:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Constrict back of throat slightly.",
          "Breathe through nose.",
          "Create ocean-like sound.",
          "Keep breath long and smooth.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Coherent Breathing",
        description:
          "Synchronizes breathing with heart rate variability (about 5–6 breaths per minute).",
        duration: 450,
        tags: ["resilience", "burnout", "heart"],
        imageUrl:
          "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale for 6 seconds.",
          "Exhale for 6 seconds.",
          "No pauses.",
          "Continuous, circular rhythm.",
        ],
      },
      {
        category: getCatId("Breathing Meditation"),
        title: "Pre-Sleep Reset",
        description:
          "Combines slow breathing and extended exhalation to signal the brain to prepare for sleep.",
        duration: 360,
        tags: ["sleep", "insomnia", "evening"],
        imageUrl:
          "https://images.unsplash.com/photo-1511296933631-18b5de9e6717?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Lie in bed.",
          "Extend exhalations.",
          "Let the body get heavy.",
          "Signal safety to your brain.",
        ],
      },
      // 3. Body Scan
      {
        category: getCatId("Body Scan Meditation"),
        title: "Full Body Scan Meditation",
        description:
          "Systematically move attention through the body to release physical tension and reconnect.",
        duration: 900,
        tags: ["fatigue", "pain", "sleep"],
        imageUrl:
          "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Lie down flat.",
          "Start at toes.",
          "Notice sensation.",
          "Move to ankles, knees, hips.",
          "Continue to crown of head.",
        ],
      },
      {
        category: getCatId("Body Scan Meditation"),
        title: "Progressive Muscle Relaxation (PMR)",
        description:
          "Tense and release specific muscle groups to identify and drop deep holding.",
        duration: 600,
        tags: ["anxiety", "physical", "tension"],
        imageUrl:
          "https://images.unsplash.com/photo-1574680096141-9877b4a11b5e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Tense feet for 5s.",
          "Release instantly.",
          "Tense calves.",
          "Release.",
          "Work way up body.",
        ],
      },
      {
        category: getCatId("Body Scan Meditation"),
        title: "Tension–Release Body Scan",
        description:
          "Focus purely on identifying tight areas and consciously softening them.",
        duration: 600,
        tags: ["stress", "relaxation"],
        imageUrl:
          "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Scan for tightness.",
          "Breathe into the knot.",
          "Imagine it melting.",
          "Move to next area.",
        ],
      },
      {
        category: getCatId("Body Scan Meditation"),
        title: "Sensory Awareness Scan",
        description:
          "Tune into internal sensations like heat, tingling, or pulsing without judgment.",
        duration: 600,
        tags: ["awareness", "grounding"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Focus on palms.",
          "Feel the energy/heat.",
          "Focus on heartbeat.",
          "Feel the rhythm.",
          "Expand to whole body.",
        ],
      },
      {
        category: getCatId("Body Scan Meditation"),
        title: "Lying Down Relaxation Scan",
        description:
          "A deep relaxation practice designed to be done completely supine.",
        duration: 1200,
        tags: ["sleep", "deep rest"],
        imageUrl:
          "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Lie on yoga mat or bed.",
          "Let feet splay open.",
          "Palms face up.",
          "Surrender weight to gravity.",
        ],
      },
      {
        category: getCatId("Body Scan Meditation"),
        title: "Mini Body Scan",
        description:
          "A quick 5-minute check-in to ground yourself in the present body.",
        duration: 300,
        tags: ["quick", "work break"],
        imageUrl:
          "https://images.unsplash.com/photo-1447452001602-7090c77460e5?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Sit tall.",
          "Feel feet on floor.",
          "Feel hips in chair.",
          "Soften shoulders.",
          "Soften jaw.",
        ],
      },

      // 4. Guided
      {
        category: getCatId("Guided Meditation"),
        title: "Guided Visualization (Safe Place)",
        description:
          "Journey to a mental sanctuary of peace to support harmony.",
        duration: 900,
        tags: ["stress relief", "imagination"],
        imageUrl:
          "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Close eyes.",
          "Imagine a safe, beautiful place.",
          "See the colors.",
          "Hear the sounds.",
          "Rest there.",
        ],
      },
      {
        category: getCatId("Guided Meditation"),
        title: "Guided Relaxation Meditation",
        description: "Step-by-step instructions to soothe the nervous system.",
        duration: 600,
        tags: ["beginners", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Follow the voice.",
          "Unclench jaw.",
          "Drop shoulders.",
          "Breathe softly.",
        ],
      },
      {
        category: getCatId("Guided Meditation"),
        title: "Guided Focus Meditation",
        description:
          "Narrated guidance to help train attention and reduce distraction.",
        duration: 600,
        tags: ["focus", "work", "exams"],
        imageUrl:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Focus on the anchor point.",
          "When instructed, widen focus.",
          "Return to anchor.",
        ],
      },
      {
        category: getCatId("Guided Meditation"),
        title: "Guided Emotional Release",
        description:
          "Support for processing difficult feelings in a safe container.",
        duration: 900,
        tags: ["emotional", "healing"],
        imageUrl:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Locate the emotion.",
          "Give it space.",
          "Listen to the guidance on acceptance.",
        ],
      },
      {
        category: getCatId("Guided Meditation"),
        title: "Short Yoga Nidra",
        description: "Yogic sleep technique for deep restorative rest.",
        duration: 600,
        tags: ["rest", "recovery"],
        imageUrl:
          "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Rotate consciousness through body points.",
          "Stay awake but deeply relaxed.",
        ],
      },
      {
        category: getCatId("Guided Meditation"),
        title: "Stress Reset Guided Session",
        description: "A quick intervention to re-center during a chaotic day.",
        duration: 300,
        tags: ["quick", "stress"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Stop.", "Breathe.", "Reset intention.", "Resume day."],
      },

      // 5. Loving-Kindness
      {
        category: getCatId("Loving-Kindness"),
        title: "Loving-Kindness (Metta)",
        description:
          "Classic practice to cultivate warmth and compassion for self and others.",
        duration: 900,
        tags: ["compassion", "love"],
        imageUrl:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "May I be happy.",
          "May I be well.",
          "Extend to loved ones.",
          "Extend to all beings.",
        ],
      },
      {
        category: getCatId("Loving-Kindness"),
        title: "Self-Compassion Meditation",
        description:
          "Healing practice for self-criticism and internal harshness.",
        duration: 600,
        tags: ["self-care", "healing"],
        imageUrl:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Hand on heart.",
          "Acknowledge suffering.",
          "Offer kindness to yourself.",
        ],
      },
      {
        category: getCatId("Loving-Kindness"),
        title: "Gratitude Meditation",
        description:
          "Shift focus from what is lacking to what is present and good.",
        duration: 600,
        tags: ["positivity", "mood"],
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Think of 3 things you are grateful for.",
          "Feel the appreciation.",
          "Let it fill your chest.",
        ],
      },
      {
        category: getCatId("Loving-Kindness"),
        title: "Forgiveness Meditation",
        description: "Release the heavy burden of resentment and anger.",
        duration: 900,
        tags: ["letting go", "peace"],
        imageUrl:
          "https://images.unsplash.com/photo-1452827073306-6e6e661baf57?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Visualize the grievance.",
          "Choose to unburden yourself.",
          "Wish for peace.",
        ],
      },
      {
        category: getCatId("Loving-Kindness"),
        title: "Compassion for Others",
        description: "Building empathy and connection to reduce loneliness.",
        duration: 600,
        tags: ["connection", "empathy"],
        imageUrl:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Visualize someone suffering.",
          "Breathe in their pain.",
          "Breathe out relief.",
          "Send simple kindness.",
        ],
      },

      // 6. Movement
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Seated Neck & Shoulder Release",
        description: "Simple stretches to melt away desk-job tension.",
        duration: 300,
        tags: ["desk", "relief"],
        imageUrl:
          "https://images.unsplash.com/photo-1574680096141-9877b4a11b5e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Ear to shoulder.",
          "Roll chin to chest.",
          "Shoulder shrugs.",
          "Backwards circles.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Cat–Cow (Slow)",
        description: "Spinal fluidity movement to sync breath and body.",
        duration: 300,
        tags: ["spine", "flexibility"],
        imageUrl:
          "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "On hands and knees.",
          "Inhale, drop belly, look up.",
          "Exhale, round spine, look at navel.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Child’s Pose with Breath",
        description: "Resting posture for grounding and back release.",
        duration: 300,
        tags: ["rest", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Knees wide.",
          "Hips to heels.",
          "Forehead on floor.",
          "Breathe into back ribs.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Seated Forward Bend",
        description: "Calming fold that stretches the spine and hamstrings.",
        duration: 300,
        tags: ["flexibility", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Legs straight.",
          "Inhale tall.",
          "Exhale fold.",
          "Keep spine long.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Standing Forward Fold",
        description: "Inversion to get blood to the head and relax the neck.",
        duration: 180,
        tags: ["energy", "release"],
        imageUrl:
          "https://images.unsplash.com/photo-1562088287-b935520ee3c9?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Stand feet hip width.",
          "Fold from hips.",
          "Let head hang heavy.",
          "Sway gently.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Supine Spinal Twist",
        description: "Releasing tension from the lower back.",
        duration: 300,
        tags: ["back pain", "release"],
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Lie on back.",
          "Knees to chest.",
          "Drop knees to left.",
          "Look right.",
          "Switch.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Legs Up the Wall",
        description:
          "Restorative inversion for circulation and nervous system calm.",
        duration: 600,
        tags: ["restorative", "circulation"],
        imageUrl:
          "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Hips close to wall.",
          "Legs up vertically.",
          "Arms by sides.",
          "Breathe deeply.",
        ],
      },
      {
        category: getCatId("Movement-Based Mindfulness"),
        title: "Mountain Pose with Breath",
        description: "Standing meditation for stability and posture.",
        duration: 180,
        tags: ["posture", "stability"],
        imageUrl:
          "https://images.unsplash.com/photo-1515536765-9b2a740fa331?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Stand tall.",
          "Feet rooted.",
          "Crown reaching up.",
          "Breathe steady.",
        ],
      },

      // 7. Grounding
      {
        category: getCatId("Grounding & Anxiety Relief"),
        title: "5-4-3-2-1 Grounding",
        description: "A sensory checklist to stop panic loops.",
        duration: 300,
        tags: ["panic", "anxiety"],
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "5 things you see.",
          "4 touch.",
          "3 hear.",
          "2 smell.",
          "1 taste.",
        ],
      },
      {
        category: getCatId("Grounding & Anxiety Relief"),
        title: "Sensory Grounding",
        description: "Focusing intensely on immediate physical sensation.",
        duration: 300,
        tags: ["focus", "presence"],
        imageUrl:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Feel feet on ground.",
          "Feel texture of clothes.",
          "Feel air on skin.",
        ],
      },
      {
        category: getCatId("Grounding & Anxiety Relief"),
        title: "Temperature Awareness",
        description:
          "Noticing warmth or coolness to shift focus from thoughts.",
        duration: 180,
        tags: ["sensation", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1518002171953-a080ee321e2f?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Hold a warm cup or ice cube.",
          "Focus entirely on the temperature sensation.",
        ],
      },
      {
        category: getCatId("Grounding & Anxiety Relief"),
        title: "Anchoring Object",
        description: "Focusing on a physical token to anchor reality.",
        duration: 180,
        tags: ["object", "focus"],
        imageUrl:
          "https://images.unsplash.com/photo-1615751072497-5f5169febe17?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Hold an object.",
          "Describe it: weight, texture, color.",
          "Let it ground you.",
        ],
      },
      {
        category: getCatId("Grounding & Anxiety Relief"),
        title: "Emergency Calm Practice",
        description: "Immediate physiological shift for high distress.",
        duration: 300,
        tags: ["emergency", "sos"],
        imageUrl:
          "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Splash cold water on face.",
          "Shake hands vigorously.",
          "Long exhale.",
        ],
      },

      // 8. Sleep
      {
        category: getCatId("Sleep & Recovery"),
        title: "Sleep Body Scan",
        description: "Systematically shutting down the body for sleep.",
        duration: 900,
        tags: ["insomnia", "bedtime"],
        imageUrl:
          "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Say goodnight to toes.",
          "Goodnight to knees.",
          "Goodnight to hips.",
          "Sleep.",
        ],
      },
      {
        category: getCatId("Sleep & Recovery"),
        title: "Short Yoga Nidra",
        description: "Yogic sleep for deep relaxation before bed.",
        duration: 600,
        tags: ["deep rest", "sleep"],
        imageUrl:
          "https://images.unsplash.com/photo-1515536765-9b2a740fa331?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Lie still.",
          "Follow the rotation of consciousness.",
          "Sink deeper.",
        ],
      },
      {
        category: getCatId("Sleep & Recovery"),
        title: "Bedtime Visualization",
        description: "Drift off to a peaceful mental landscape.",
        duration: 900,
        tags: ["dreams", "relax"],
        imageUrl:
          "https://images.unsplash.com/photo-1532099554103-28f962196e33?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Imagine a hammock.",
          "Swaying gently.",
          "Under the stars.",
        ],
      },
      {
        category: getCatId("Sleep & Recovery"),
        title: "Night Breathing Meditation",
        description: "Slow rhythmic breathing to signal safety to the brain.",
        duration: 600,
        tags: ["safety", "breath"],
        imageUrl:
          "https://images.unsplash.com/photo-1520206183501-b80df610434f?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Inhale 4.",
          "Exhale 6.",
          "Extend the exhale.",
          "Let go.",
        ],
      },
      {
        category: getCatId("Sleep & Recovery"),
        title: "Deep Rest Practice",
        description: "Non-Sleep Deep Rest (NSDR) for recovery.",
        duration: 1200,
        tags: ["burnout", "recovery"],
        imageUrl:
          "https://images.unsplash.com/photo-1511296933631-18b5de9e6717?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Do nothing.", "Let gravity hold you.", "Recharge."],
      },

      // 9. Ambient Music
      {
        category: getCatId("Ambient Music"),
        title: "Deep Space Drift",
        description: "Float through the cosmos with this ethereal soundscape.",
        duration: 1800,
        tags: ["space", "focus", "sleep"],
        imageUrl:
          "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        instructions: ["Put on headphones.", "Close eyes.", "Drift."],
      },
      {
        category: getCatId("Ambient Music"),
        title: "Lo-Fi Study Beats",
        description: "Chill beats to help you focus or relax.",
        duration: 1200,
        tags: ["focus", "study", "chill"],
        imageUrl:
          "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        instructions: [
          "Play in background.",
          "Focus on task.",
          "Enjoy the vibe.",
        ],
      },
      {
        category: getCatId("Ambient Music"),
        title: "Tibetan Bowl Healing",
        description: "Resonant singing bowls for cellular healing.",
        duration: 900,
        tags: ["healing", "vibration"],
        imageUrl:
          "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        instructions: ["Lie down.", "Feel the resonance.", "Let go."],
      },
      {
        category: getCatId("Ambient Music"),
        title: "Piano for Peace",
        description: "Gentle minimalist piano to soothe the soul.",
        duration: 600,
        tags: ["piano", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        instructions: ["Listen to the notes.", "Follow the melody.", "Relax."],
      },
      {
        category: getCatId("Ambient Music"),
        title: "Drone Tone Focus",
        description: "A single continuous tone to anchor attention.",
        duration: 3000,
        tags: ["focus", "drone"],
        imageUrl:
          "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Focus on the sound.",
          "Merge with it.",
          "Stay present.",
        ],
      },

      // 10. Therapy Sounds
      {
        category: getCatId("Therapy Sounds"),
        title: "Heavy Rain & Thunder",
        description: "Cozy thunderstorm sounds for deep sleep.",
        duration: 3600,
        tags: ["rain", "sleep", "nature"],
        imageUrl:
          "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        instructions: ["Get under a blanket.", "Listen to the rain.", "Sleep."],
      },
      {
        category: getCatId("Therapy Sounds"),
        title: "Forest Stream",
        description: "Gentle running water in a bird-filled forest.",
        duration: 1800,
        tags: ["nature", "water", "calm"],
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Imagine the forest.",
          "Breathe the fresh air.",
          "Relax.",
        ],
      },
      {
        category: getCatId("Therapy Sounds"),
        title: "Ocean Waves (Pink Noise)",
        description: "Rhythmic waves to block out distractions.",
        duration: 2400,
        tags: ["ocean", "focus", "noise"],
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        instructions: [
          "Breathe with the waves.",
          "In with the tide.",
          "Out with the tide.",
        ],
      },
      {
        category: getCatId("Therapy Sounds"),
        title: "Crackling Fireplace",
        description: "Warm fire sounds for comfort and mood.",
        duration: 1200,
        tags: ["fire", "comfort"],
        imageUrl:
          "https://images.unsplash.com/photo-1542296332-2e44a9916805?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Feel the warmth.", "Watch the flames.", "Relax."],
      },
      {
        category: getCatId("Therapy Sounds"),
        title: "Brown Noise (Deep)",
        description: "Lower frequency noise for deep concentration and ADHD.",
        duration: 3600,
        tags: ["focus", "adhd", "noise"],
        imageUrl:
          "https://images.unsplash.com/photo-1487147264018-f937fba0c817?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Use headphones.", "Set volume low.", "Focus."],
      },

      // 11. Binaural Beats
      {
        category: getCatId("Binaural Beats"),
        title: "Theta Waves (Deep Meditation)",
        description: "6Hz theta waves for deep meditative states.",
        duration: 1800,
        tags: ["meditation", "theta", "brainwave"],
        imageUrl:
          "https://images.unsplash.com/photo-1519810755548-39de2157a84c?auto=format&fit=crop&w=1000&q=80",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        instructions: [
          "Must use headphones.",
          "Close eyes.",
          "Let brain sync.",
        ],
      },
      {
        category: getCatId("Binaural Beats"),
        title: "Delta Waves (Deep Sleep)",
        description: "2Hz delta waves to induce dreamless sleep.",
        duration: 3600,
        tags: ["sleep", "delta", "brainwave"],
        imageUrl:
          "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Must use headphones.", "Lie in bed.", "Sleep."],
      },
      {
        category: getCatId("Binaural Beats"),
        title: "Alpha Waves (Flow State)",
        description: "10Hz alpha waves for relaxed focus and creativity.",
        duration: 1200,
        tags: ["focus", "alpha", "creativity"],
        imageUrl:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Must use headphones.", "Work or create.", "Flow."],
      },
      {
        category: getCatId("Binaural Beats"),
        title: "Gamma Waves (Peak Performance)",
        description: "40Hz gamma waves for high-level cognitive processing.",
        duration: 900,
        tags: ["focus", "gamma", "energy"],
        imageUrl:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Must use headphones.", "Intense focus.", "Perform."],
      },
      {
        category: getCatId("Binaural Beats"),
        title: "Solfeggio 528Hz (Miracle)",
        description: "The 'Love Frequency' for DNA repair and transformation.",
        duration: 1800,
        tags: ["healing", "spiritual"],
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        instructions: ["Listen with heart.", "Feel the vibration.", "Heal."],
      },
    ];

    await MeditationSession.insertMany(sessions);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
