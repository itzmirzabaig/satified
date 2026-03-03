import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: aa85b138
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, initial height: 6, final height: 14 (small integers)]
 * - Difficulty factors: [Contextual interpretation of linear equation coefficients]
 * - Distractor patterns: [A confuses doubling with rate, C confuses coefficient with initial+rate, D confuses time per growth]
 * - Constraints: [Equation form: rate*years + initial = final]
 * - Question type: [Contextual interpretation - Multiple Choice Text]
 */

export const generator_aa85b138 = {
  metadata: {
    // id: "aa85b138",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const growthRate = getRandomInt(1, 4); // feet per year
    const initialHeight = getRandomInt(3, 10);
    const finalHeight = initialHeight + growthRate * getRandomInt(2, 6); // Ensure clean numbers
    
    const years = (finalHeight - initialHeight) / growthRate;
    
    // STEP 2: Create options
    const correctText = "The average number of feet that the tree grew per year";
    const optionsData = [
      { text: "The number of years it took the tree to double its height", isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `The height, in feet, of the tree when the tree was 1 year old`, isCorrect: false },
      { text: "The average number of years it takes similar trees to grow 14 feet", isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `$${growthRate}n+${initialHeight}=${finalHeight}$\n\nA tree had a height of ${initialHeight} feet when it was planted. The equation above can be used to find how many years $n$ it took the tree to reach a height of ${finalHeight} feet. Which of the following is the best interpretation of the number ${growthRate} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The height of the tree at a given time is equal to its height when it was planted plus the number of feet that the tree grew. In the given equation, ${finalHeight} represents the height of the tree at the given time, and ${initialHeight} represents the height of the tree when it was planted. It follows that ${growthRate}n represents the number of feet the tree grew from the time it was planted until the time it reached a height of ${finalHeight} feet. Since $n$ represents the number of years between the given time and the time the tree was planted, ${growthRate} must represent the average number of feet the tree grew each year. Choice ${incorrectOptions[0].letter} is incorrect and may result from interpreting the coefficient ${growthRate} as doubling instead of as increasing by ${growthRate} each year. Choice ${incorrectOptions[1].letter} is incorrect. The height of the tree when it was 1 year old was ${initialHeight + growthRate} feet, not ${growthRate} feet. Choice ${incorrectOptions[2].letter} is incorrect. No information is given to connect the growth of one particular tree to the growth of similar trees.`
    };
  }
};

/**
 * Question ID: 1234567 (Placeholder ID for infinitely many solutions question)
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 16, 8 (small integers)]
 * - Difficulty factors: [Understanding infinite solutions condition for linear equations]
 * - Distractor patterns: [Various integers that don't satisfy both coefficient and constant equality]
 * - Constraints: [For infinite solutions: ax + b = cx + d requires a=c and b=d]
 * - Question type: [Fill-in-the-blank]
 */