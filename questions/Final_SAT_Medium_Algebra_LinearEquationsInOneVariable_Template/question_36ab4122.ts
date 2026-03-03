import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 36ab4122
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [regular hours: 8, overtime multiplier: 1.5, total hours: 10, earnings: 137.50]
 * - Difficulty factors: [Piecewise pay calculation, setting up equation]
 * - Distractor patterns: [A, C, D don't satisfy the earnings equation]
 * - Constraints: [Total = 8p + 1.5p×(total-8)]
 * - Question type: [Multiple Choice Text]
 */

export const generator_36ab4122 = {
  metadata: {
    // id: "36ab4122",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const regularHours = 8;
    const overtimeMult = 1.5;
    const totalHours = getRandomInt(10, 14);
    const overtimeHours = totalHours - regularHours;
    
    // Total coefficient = 8 + 1.5*overtime
    const totalCoeff = regularHours + overtimeMult * overtimeHours;
    const hourlyRate = getRandomInt(10, 18); // Will give earnings around 100-200
    const earnings = totalCoeff * hourlyRate;
    
    // Format to 2 decimal places
    const earningsFormatted = earnings.toFixed(2);
    const correctRate = hourlyRate.toFixed(2);
    
    // Distractors
    const distractorA = (hourlyRate - 0.75).toFixed(2);
    const distractorC = (hourlyRate + 0.75).toFixed(2);
    const distractorD = (hourlyRate + 1.25).toFixed(2);
    
    const correctText = `$${correctRate}$`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${correctRate}$`, isCorrect: true },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    const names = ["Megan", "Sarah", "Alex", "Jordan"];
    const name = getRandomElement(names);
    
    return {
      questionText: `${name}'s regular wage at her job is $p$ dollars per hour for the first $${regularHours}$ hours of work in a day plus $${overtimeMult}$ times her regular hourly wage for work in excess of ${regularHours} hours that day. On a given day, ${name} worked for $${totalHours}$ hours, and her total earnings for that day were $${earningsFormatted}. What is ${name}'s regular hourly wage?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. ${name} worked ${regularHours} regular hours and ${overtimeHours} overtime hours. Her earnings for regular hours are $${regularHours}p$. Her overtime rate is $${overtimeMult}p$ per hour, so overtime earnings are $${overtimeHours} \\times ${overtimeMult}p = ${overtimeMult * overtimeHours}p$. Total earnings: $${regularHours}p + ${overtimeMult * overtimeHours}p = ${totalCoeff}p = ${earningsFormatted}$. Therefore, $p = \\frac{${earningsFormatted}}{${totalCoeff}} = ${correctRate}$.`
    };
  }
};

/**
 * Question ID: 1ce51655
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20, rate: 1oz/4days, remaining: 9]
 * - Difficulty factors: [Rate problem, working backwards]
 * - Distractor patterns: [A is random, B is remaining amount, C uses remaining oz × 4]
 * - Constraints: [(Initial - Remaining) / Rate = Time]
 * - Question type: [Multiple Choice Text]
 */