import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 538
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic function solve for input
 * - Number ranges: Coefficient 7, p(n)=56, find n
 * - Difficulty: Medium - solving cubic equation
 */

export const generator_538 = {
  metadata: {
    id: "538",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const nValue = getRandomInt(2, 4);
    const nCubed = nValue ** 3;
    // The coefficient must never equal any other option value (nValue, nCubed,
    // nValue + 5), otherwise two options would collide for some draws.
    const coefficientChoices = [3, 4, 5, 6, 7, 8, 9, 10].filter(
      c => c !== nValue && c !== nCubed && c !== nValue + 5
    );
    const coefficient = getRandomElement(coefficientChoices);
    const targetValue = coefficient * nCubed;

    const questionText = `The function $p$ is defined by $p(n) = ${coefficient}n^3$. What is the value of $n$ for which $p(n) = ${targetValue}$?`;

    const correctAnswer = nValue.toString();

    const optionsData = [
      { text: nValue.toString(), isCorrect: true, reason: "" },
      { text: nCubed.toString(), isCorrect: false, reason: `results from dividing ${targetValue} by ${coefficient} but not taking the cube root` },
      { text: coefficient.toString(), isCorrect: false, reason: `is the coefficient of $n^3$, not the value of $n$` },
      { text: (nValue + 5).toString(), isCorrect: false, reason: `results from an arithmetic error when taking the cube root` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Setting $p(n)$ equal to ${targetValue} gives $p(n) = ${coefficient}n^3 = ${targetValue}$. Dividing both sides by ${coefficient} gives $n^3 = ${nCubed}$. Taking the cube root of both sides gives $n = \\sqrt[3]{${nCubed}} = ${nValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
