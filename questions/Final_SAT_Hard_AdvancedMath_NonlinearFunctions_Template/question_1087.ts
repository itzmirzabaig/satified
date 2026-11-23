import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1087
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [40 comments, 190% increase each hour]
 * - Difficulty factors: [Percent increase to growth factor, exponential model]
 * - Distractor patterns: [A: 1.19, B: 1.9, C: 19, D: 2.9]
 * - Constraints: [190% increase means 290% of original, factor is 2.9]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1087 = {
  metadata: {
    id: "1087",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(20, 80);
    const increasePct = getRandomInt(120, 250);
    const growthFactor = (100 + increasePct) / 100;
    
    // Before: one choice used a growth factor below 1 that matched no slip, the
    // stem was clipped ("Which models comments"), and no wrong choice had a
    // reason. That choice now moves the decimal one place too far (190% read
    // as 19%, factor 1.19).
    const asDecimal = increasePct / 100;
    const shiftedFactor = (1000 + increasePct) / 1000;
    const shiftedPct = increasePct / 10;

    const correctText = `$C=${initial}(${growthFactor})^t$`;
    const noOneText = `$C=${initial}(${asDecimal})^t$`;
    const percentText = `$C=${initial}(${increasePct})^t$`;
    const shiftedText = `$C=${initial}(${shiftedFactor})^t$`;

    const optionsData = [
      { text: shiftedText, isCorrect: false, reason: `${shiftedText} uses the factor $${shiftedFactor}$, which treats the increase as ${shiftedPct}% because the decimal point was moved one place too far` },
      { text: noOneText, isCorrect: false, reason: `${noOneText} uses $${asDecimal}$, the percent increase written as a decimal, without adding $1$ to keep the comments already posted` },
      { text: percentText, isCorrect: false, reason: `${percentText} uses the percent $${increasePct}$ itself as the growth factor instead of converting it to a decimal and adding $1$` },
      { text: correctText, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `An article has ${initial} comments when it is first posted online. The number of comments then increases by ${increasePct}% each hour. Which equation models the number of comments, $C$, $t$ hours after the article is posted?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. An increase of ${increasePct}% adds ${increasePct}% of the current number of comments to the 100% already there, so each hour the number of comments is multiplied by $1+\\frac{${increasePct}}{100}=${growthFactor}$. Starting from ${initial} comments and multiplying by $${growthFactor}$ once per hour for $t$ hours gives $C=${initial}(${growthFactor})^t$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
