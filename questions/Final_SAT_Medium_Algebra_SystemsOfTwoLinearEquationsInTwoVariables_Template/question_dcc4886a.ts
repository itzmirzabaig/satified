import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dcc4886a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2/7, intercept: 3]
 * - Difficulty factors: [Infinitely many solutions, identify y-intercept]
 * - Distractor patterns: [-3, -1/3, 1/3, 3]
 * - Constraints: [Same line requires same intercept]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_dcc4886a = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const mNum = getRandomInt(1, 5);
    const mDen = getRandomInt(3, 9);
    const b = getRandomInt(2, 6);
    
    // STEP 2: Build question text
    // FIXED: Proper newlines and consistent $ delimiters
    const questionText = `One of the two equations in a system of linear equations is given. The system has infinitely many solutions. If the second equation in the system is $y = mx + b$, where $m$ and $b$ are constants, what is the value of $b$?\n\n$y=\\frac{${mNum}}{${mDen}}x+${b}$`;
    
    // STEP 3: Create options
    const distractor1 = -b;
    const distractor2 = -1/b;
    const distractor3 = 1/b;
    
    // FIXED: Format fractions properly for distractors that aren't integers
    const formatDistractor = (val: number): string => {
      if (Number.isInteger(val)) return val.toString();
      // Handle simple fractions
      if (val === -1/b) return `$-\\frac{1}{${b}}$`;
      if (val === 1/b) return `$\\frac{1}{${b}}$`;
      return val.toFixed(2).replace(/\.?0+$/, '');
    };
    
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: formatDistractor(distractor2), isCorrect: false },
      { text: formatDistractor(distractor3), isCorrect: false },
      { text: b.toString(), isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: b.toString(),
      // FIXED: Proper single backslash for LaTeX commands, proper $ delimiters
      explanation: `Choice ${correctLetter} is correct. It's given that the system has infinitely many solutions. The graphs of two lines in the xy-plane represented by equations in slope-intercept form, $y=mx+b$, where $m$ and $b$ are constants, have infinitely many solutions if their slopes, $m$, are the same and if their y-coordinates of the y-intercepts, $b$, are also the same. The first equation in the given system is $y=\\frac{${mNum}}{${mDen}}x+${b}$. For this equation, the slope is $\\frac{${mNum}}{${mDen}}$ and the y-coordinate of the y-intercept is $${b}$. If the second equation is in the form $y=mx+b$, then for the two equations to be equivalent, the values of $m$ and $b$ in the second equation must equal the corresponding values in the first equation. Therefore, the second equation must have a slope, $m$, of $\\frac{${mNum}}{${mDen}}$, and a y-coordinate of the y-intercept, $b$, of $${b}$. Thus, the value of $b$ is $${b}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect and may result from conceptual errors.\n\nChoice ${incorrectOptions[1].letter} is incorrect and may result from conceptual errors.\n\nChoice ${incorrectOptions[2].letter} is incorrect and may result from conceptual errors.`
    };
  }
};