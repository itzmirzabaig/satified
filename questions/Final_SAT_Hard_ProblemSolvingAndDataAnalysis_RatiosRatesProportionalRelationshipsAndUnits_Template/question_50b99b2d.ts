import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 50b99b2d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [object R: 4x inches in y seconds, object S: 24x inches, speed R = 0.5 × speed S]
 * - Difficulty factors: [Abstract variables, ratio reasoning, relative speed]
 * - Distractor patterns: [12y: if R were twice S, 16y: wrong distance, 6y: time for R not S]
 * - Constraints: [Must track which object is faster, algebraic manipulation with x and y]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_50b99b2d = {
  metadata: {
    // id: "50b99b2d",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficients (4 and 24 in original, ratio is 6)
    const distR = getRandomInt(2, 6); // coefficient for R distance
    const timeR = getRandomInt(2, 5); // coefficient for R time  
    const distS = distR * getRandomInt(4, 8); // S travels 4-8 times farther
    // Speed ratio: R is half of S, so S is twice as fast
    
    // STEP 2: Calculate
    // Speed R = (distR × x) / (timeR × y)
    // Speed S = 2 × Speed R = (2 × distR × x) / (timeR × y)
    // Time for S to travel distS × x: Time = Distance/Speed = (distS × x) / [(2 × distR × x)/(timeR × y)]
    // = (distS × x) × (timeR × y) / (2 × distR × x) = (distS × timeR) / (2 × distR) × y
    
    const timeSCoefficient = (distS * timeR) / (2 * distR);
    
    // STEP 3: Distractors
    // A: If R were twice S (speed ratio inverted)
    const distractorA = ((distS * timeR * 2) / distR) + "y"; // 12y in original
    // C: Wrong calculation
    const distractorC = (((distS * 2) / distR) * timeR) + "y"; // 16y in original
    // D: Time for R to travel the distance, not S (6y in original = 24x / (4x/y))
    const distractorD = ((distS / distR) * timeR) + "y";
    
    // Ensure distractors are unique
    const correctText = timeSCoefficient + "y";
    const distractorTexts = [distractorA, distractorC, distractorD];
    const uniqueDistractors = distractorTexts.filter((d, i, arr) => 
      d !== correctText && arr.indexOf(d) === i
    );
    
    while (uniqueDistractors.length < 3) {
      const wrongCoeff = timeSCoefficient + getRandomInt(1, 5);
      const newDistractor = wrongCoeff + "y";
      if (newDistractor !== correctText && !uniqueDistractors.includes(newDistractor)) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const optionsData = [
      { text: uniqueDistractors[0], isCorrect: false, reason: "results from assuming object R is twice as fast as object S, rather than half as fast" },
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[1], isCorrect: false, reason: "results from calculation errors with the distances" },
      { text: uniqueDistractors[2], isCorrect: false, reason: "results from calculating the time for object R, not object S, to travel the distance" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Speed of R = $\\frac{${distR}x}{${timeR}y}$. Since R is half as fast as S, speed of S = $\\frac{${2 * distR}x}{${timeR}y}$. Time for S to travel ${distS}x inches = $\\frac{${distS}x}{\\frac{${2 * distR}x}{${timeR}y}} = ${timeSCoefficient}y$ seconds. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Objects R and S each travel at a constant speed. The speed of object R is half the speed of object S. Object R travels a distance of $${distR}x$ inches in $${timeR}y$ seconds. Which expression represents the time, in seconds, it takes object S to travel a distance of $${distS}x$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: c2e7fa6d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side ratio: 3:1, field strength: 29.00, total flux: 4640]
 * - Difficulty factors: [Area ratio of squares, algebraic setup, proportional reasoning]
 * - Distractor patterns: [Fill-in-the-blank - no distractors]
 * - Constraints: [Area ratio is 9:1 (3²), total parts = 10, must divide 4640 appropriately]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */