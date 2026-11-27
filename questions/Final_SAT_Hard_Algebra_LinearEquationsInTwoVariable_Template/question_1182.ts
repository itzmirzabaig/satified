import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1182
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hours: 10, 15, 85]
 * - Difficulty factors: [Interpreting coefficients in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Difference of coefficients]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1182 = {
  metadata: {
    id: "1182",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // FIXED (review): the total was rounded to a multiple of the gcd, which does
    // not guarantee whole number course counts (17x + 37y = 100 has none), so
    // the situation could be impossible. The total is now built from real
    // course counts. The explanation lacked "The correct answer is".
    let onSiteHours = 0, onlineHours = 0, total = 0;
    do {
      onSiteHours = getRandomInt(5, 20);
      onlineHours = getRandomInt(onSiteHours + 5, onSiteHours + 20);
      const onSiteCount = getRandomInt(1, 5);
      const onlineCount = getRandomInt(1, 4);
      total = onSiteHours * onSiteCount + onlineHours * onlineCount;
    } while (total < 50 || total > 180);

    const difference = onlineHours - onSiteHours;

    return {
      questionText: `A certain apprentice has enrolled in ${total} hours of training courses. The equation $${onSiteHours}x+${onlineHours}y=${total}$ represents this situation, where $x$ is the number of onsite training courses and $y$ is the number of online training courses this apprentice has enrolled in. How many more hours does each online training course take than each onsite training course?`,
      figureCode: null,
      options: [],
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. In the equation $${onSiteHours}x+${onlineHours}y=${total}$, the term $${onSiteHours}x$ is the number of hours for $x$ onsite courses, so each onsite course takes ${onSiteHours} hours. Likewise, the term $${onlineHours}y$ is the number of hours for $y$ online courses, so each online course takes ${onlineHours} hours. Each online course takes $${onlineHours} - ${onSiteHours} = ${difference}$ more hours than each onsite course.`
    };
  }
};
