export const ChatBotQuestions = [
  {
    id: 1,
    question: "How are you feeling today?",
    type: "single-choice",
    options: ["I'm in pain", "I have discomfort", "I feel stiff", "I'm fine"],
  },
  {
    id: 2,
    question: "Can you tell me where you’re experiencing pain or discomfort?",
    type: "single-choice",
    options: [
      "Lower back",
      "Neck",
      "Shoulder",
      "Knee",
      "Ankle",
      "Wrist",
      "Hip",
    ],
  },
  {
    id: 3,
    question: "On a scale of 1 to 10, how would you rate your pain?",
    type: "single-choice",
    options: ["2", "5", "8"],
  },
  {
    id: 4,
    question: "How long have you been experiencing these symptoms?",
    type: "single-choice",
    options: ["A few days", "A few weeks", "Several months", "Over a year"],
  },
  {
    id: 5,
    question: "Does the pain affect your daily activities or mobility?",
    type: "single-choice",
    options: [
      "Yes, it limits my movement",
      "Yes, but I can manage",
      "No, I can still perform daily activities",
    ],
  },
  {
    id: 6,
    question:
      "Have you had any previous injuries or surgeries related to this area?",
    type: "single-choice",
    options: ["Yes, I had surgery", "Yes, I had an injury", "No"],
  },
  {
    id: 7,
    question: "Is the pain sharp, dull, throbbing, or burning?",
    type: "single-choice",
    options: ["Sharp", "Dull", "Throbbing", "Burning"],
  },
  {
    id: 8,
    question: `What activities or movements trigger the pain?`,
    type: "single-choice",
    options: [
      "Lifting heavy objects",
      "Sitting for too long",
      "Bending",
      "Twisting",
      "Walking",
      "Running",
    ],
  },
  {
    id: 9,
    question:
      "I am giving you some exercises kindly follow it or take appointment from specialist.",
    type: "text",
    options: [""],
  },
];
