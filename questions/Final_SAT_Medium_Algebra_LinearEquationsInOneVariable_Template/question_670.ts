import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 670
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, initial height: 6, final height: 14 (small integers)]
 * - Difficulty factors: [Contextual interpretation of linear equation coefficients]
 * - Distractor patterns: [A confuses doubling with rate, C confuses coefficient with initial+rate, D confuses time per growth]
 * - Constraints: [Equation form: rate*years + initial = final]
 * - Question type: [Contextual interpretation - Multiple Choice Text]
 */

export const generator_670 = {
  metadata: {
    id: "670",
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
    
    // STEP 2: Create options. Each distractor is tagged so its explanation
    // reason travels with the option text through the shuffle.
    const correctText = "The average number of feet that the tree grew per year";
    const doublingText = "The number of years it took the tree to double its height";
    const oneYearText = "The height, in feet, of the tree when the tree was 1 year old";
    const similarText = `The average number of years it takes similar trees to grow ${finalHeight} feet`;
    const optionsData = [
      { text: doublingText, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: oneYearText, isCorrect: false },
      { text: similarText, isCorrect: false }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    // Attach each distractor reason to the letter of the option it actually
    // describes (look up by text so it stays correct for any shuffle order).
    const letterOf = (text: string) => shuffledOptions.find(o => o.text === text)!.letter;
    const doublingLetter = letterOf(doublingText);
    const oneYearLetter = letterOf(oneYearText);
    const similarLetter = letterOf(similarText);

    return {
      questionText: `$${growthRate}n+${initialHeight}=${finalHeight}$\n\nA tree had a height of ${initialHeight} feet when it was planted. The equation above can be used to find how many years $n$ it took the tree to reach a height of ${finalHeight} feet. Which of the following is the best interpretation of the number ${growthRate} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The height of the tree at a given time is equal to its height when it was planted plus the number of feet that the tree grew. In the given equation, ${finalHeight} represents the height of the tree at the given time, and ${initialHeight} represents the height of the tree when it was planted. It follows that ${growthRate}n represents the number of feet the tree grew from the time it was planted until the time it reached a height of ${finalHeight} feet. Since $n$ represents the number of years between the given time and the time the tree was planted, ${growthRate} must represent the average number of feet the tree grew each year. Choice ${doublingLetter} is incorrect and may result from interpreting the coefficient ${growthRate} as doubling instead of as increasing by ${growthRate} each year. Choice ${oneYearLetter} is incorrect. The height of the tree when it was 1 year old was ${initialHeight + growthRate} feet, not ${growthRate} feet. Choice ${similarLetter} is incorrect. No information is given to connect the growth of one particular tree to the growth of similar trees.`
    };
  }
};
