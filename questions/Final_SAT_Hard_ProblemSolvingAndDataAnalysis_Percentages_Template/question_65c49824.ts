import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 65c49824
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 15, 45, 25 with remainder 6]
 * - Difficulty factors: [Percentages summing to 85%, remainder calculation, multi-step problem]
 * - Distractor patterns: [Incorrect remainder percentage calculation, arithmetic errors]
 * - Constraints: [Percentages must sum to less than 100%, remainder represents fixed count]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - conceptual percentage problem]
 */

export const generator_65c49824 = {
  metadata: {
    // id: "65c49824",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random percentages that sum to 85-95% leaving remainder
    // Keep numbers reasonable for mental math (multiples of 5 or easy numbers)
    let parentPct: number, adminPct: number, teacherPct: number, remainingPct: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion to find valid values
    while (attempts < maxAttempts) {
      parentPct = getRandomInt(10, 25); // Parents percentage
      adminPct = getRandomInt(15, 35);  // Administrators percentage
      teacherPct = getRandomInt(35, 55); // Teachers percentage (randomized, not hardcoded)
      remainingPct = 100 - parentPct - adminPct - teacherPct;
      
      // Ensure remaining percentage is positive and reasonable (1-30%)
      if (remainingPct > 0 && remainingPct <= 30) {
        break;
      }
      attempts++;
    }
    
    // Fallback values if loop exits without finding valid values
    if (attempts >= maxAttempts) {
      parentPct = 15;
      adminPct = 25;
      teacherPct = 45;
      remainingPct = 15;
    }
    
    // STEP 2: Generate the fixed remainder count (students)
    const studentCount = getRandomInt(3, 12) * 2; // Even numbers 6-24 for clean division
    
    // STEP 3: Calculate total and derived values
    const totalPeople = studentCount / (remainingPct / 100);
    const teacherCount = Math.round((teacherPct / 100) * totalPeople);
    const adminCount = Math.round((adminPct / 100) * totalPeople);
    const difference = teacherCount - adminCount;
    
    // STEP 4: Return question data (no figure - conceptual problem)
    return {
      questionText: `A school district is forming a committee to discuss plans for the construction of a new high school. Of those invited to join the committee, ${parentPct}% are parents of students, ${teacherPct}% are teachers from the current high school, ${adminPct}% are school and district administrators, and the remaining ${studentCount} individuals are students. How many more teachers were invited to join the committee than school and district administrators?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: difference.toString(),
      explanation: `The ${studentCount} students represent $(100-${parentPct}-${teacherPct}-${adminPct})\\%=${remainingPct}% of those invited to join the committee. If $x$ people were invited to join the committee, then $0.${remainingPct}x=${studentCount}$. Thus, there were $\\frac{${studentCount}}{0.${remainingPct}}=${totalPeople}$ people invited to join the committee. It follows that there were $0.${teacherPct}(${totalPeople})=${teacherCount}$ teachers and $0.${adminPct}(${totalPeople})=${adminCount}$ school and district administrators invited to join the committee. Therefore, there were ${difference} more teachers than school and district administrators invited to join the committee.`
    };
  }
};

/**
 * Question ID: 4aaa9c42
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2241 (large percentage), 83 (medium percentage)]
 * - Difficulty factors: [Chained percentage relationships, converting between decimal and percent]
 * - Distractor patterns: [Forgetting to multiply by 100, using raw decimal, calculation errors]
 * - Constraints: [Percentages must chain correctly, final answer must be expressible as percentage]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */