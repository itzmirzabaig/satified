import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 2162540
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mass: 50g, percentages: 30%, 80%, 50%, final answer: 16g]
 * - Difficulty factors: [Word problem, mixture problem, system of equations]
 * - Distractor patterns: [Wrong piece mass, total silicon instead of piece silicon]
 * - Constraints: [System must have clean integer solution]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Graph showing the two lines intersecting]
 */

export const generator_2162540 = {
  metadata: {
    // id: "2162540",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const totalMass = getRandomInt(40, 60) * 2;
      const p1 = getRandomInt(20, 40);
      const p2 = getRandomInt(60, 90);
      const pTotal = getRandomInt(45, 55);
      
      const yMass = (totalMass * (pTotal - p1)) / (p2 - p1);
      const xMass = totalMass - yMass;
      
      if (yMass !== Math.floor(yMass) || xMass !== Math.floor(xMass) || yMass <= 0 || xMass <= 0) {
        continue;
      }
      
      const siliconSecond = Math.round((p2 / 100) * yMass * 10) / 10;
      
      // Calculate viewBox
      const xMin = Math.floor(xMass / 5);
      const xMax = Math.ceil(xMass / 2);
      const yMin = Math.floor(yMass / 5);
      const yMax = Math.ceil(yMass / 2);
      
      const distA = (p1 / 100 * xMass).toFixed(1);
      const distB = siliconSecond.toFixed(1);
      const distC = yMass.toFixed(1);
      const distD = xMass.toFixed(1);
      
      const optionsData = [
        { text: parseFloat(distA).toString(), isCorrect: false },
        { text: parseFloat(distB).toString(), isCorrect: true },
        { text: parseFloat(distC).toString(), isCorrect: false },
        { text: parseFloat(distD).toString(), isCorrect: false }
      ];
      
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      
      result = {
        questionText: `A sample of a certain alloy has a total mass of ${totalMass.toFixed(1)} grams and is ${pTotal}.0\\% silicon by mass. The sample was created by combining two pieces of different alloys. The first piece was ${p1}.0\\% silicon by mass and the second piece was ${p2}.0\\% silicon by mass. What was the mass, in grams, of the silicon in the second piece?`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: parseFloat(distB).toString(),
        explanation: `Choice ${correctLetter} is correct. The system $x + y = ${totalMass}$ and $${p1/100}x + ${p2/100}y = ${pTotal/100 * totalMass}$ yields $y = ${yMass}$. The silicon in the second piece is $${p2/100} \\\\times ${yMass} = ${siliconSecond}$ grams.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 45a534d0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8/17, intercepts: -4/17 and -1/204, r=-34]
 * - Difficulty factors: [No solution with parameter, complex fractions]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [r must make slopes equal]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two parallel lines]
 */