import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1414
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 15, 45, 25 with remainder 6]
 * - Difficulty factors: [Percentages summing to <100%, remainder calculation, multi-step]
 * - Distractor patterns: [Incorrect remainder percentage calculation, arithmetic errors]
 * - Constraints: [Percentages must sum to less than 100%, remainder represents fixed count]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - conceptual percentage problem]
 */

export const generator_1414 = {
  metadata: {
    id: "1414",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick integer category percentages that leave a positive remainder.
    // Answer-first construction: the total is a multiple of 100, so every integer
    // percentage yields an integer head count (no float artifacts, no rounding).
    let parentPct = 15, adminPct = 25, teacherPct = 45, remainingPct = 15;
    let attempts = 0;
    while (attempts++ < 50) {
      const p = getRandomInt(10, 20);   // parents
      const a = getRandomInt(15, 28);   // administrators
      const t = getRandomInt(35, 50);   // teachers
      const r = 100 - p - a - t;        // remainder (students)
      // Remainder positive and reasonable, and clearly more teachers than admins.
      if (r >= 5 && r <= 25 && t - a >= 5) {
        parentPct = p; adminPct = a; teacherPct = t; remainingPct = r;
        break;
      }
    }

    // STEP 2: Scale factor k makes the total = 100k, guaranteeing integer counts.
    const k = getRandomInt(2, 7);
    const totalPeople = 100 * k;
    const studentCount = remainingPct * k;
    const teacherCount = teacherPct * k;
    const adminCount = adminPct * k;
    const difference = teacherCount - adminCount;

    // STEP 3: Return question data (no figure - conceptual problem)
    return {
      questionText: `A school district is forming a committee to discuss plans for the construction of a new high school. Of those invited to join the committee, ${parentPct}% are parents of students, ${teacherPct}% are teachers from the current high school, ${adminPct}% are school and district administrators, and the remaining ${studentCount} individuals are students. How many more teachers were invited to join the committee than school and district administrators?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: difference.toString(),
      explanation: `The four groups together account for everyone invited, so the students make up 100% − ${parentPct}% − ${teacherPct}% − ${adminPct}% = ${remainingPct}% of the committee. If $x$ is the total number of people invited, then $\\frac{${remainingPct}}{100}x = ${studentCount}$, so $x = \\frac{100 \\times ${studentCount}}{${remainingPct}} = ${totalPeople}$. The number of teachers is $\\frac{${teacherPct}}{100} \\times ${totalPeople} = ${teacherCount}$, and the number of administrators is $\\frac{${adminPct}}{100} \\times ${totalPeople} = ${adminCount}$. Therefore, there were ${teacherCount} − ${adminCount} = ${difference} more teachers than school and district administrators invited to join the committee.`
    };
  }
};
