import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 46545dd6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 44-87, totals 131-152]
 * - Difficulty factors: [Reading specific row/column, conditional probability]
 * - Distractor patterns: [A: wrong numerator (10), C: wrong school numerator, D: wrong denominator (Valley vs Foothill)]
 * - Constraints: [5 year columns, consistent row/column totals, target year is 2010]
 * - Question type: [Multi-column Table → HTML Table]
 * - Figure generation: [Generate yearly data with trends]
 */

export const generator_46545dd6 = {
  metadata: {
    // id: "46545dd6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const y1Foothill = getRandomInt(70, 95);
    const y1Valley = getRandomInt(35, 55);
    const y1Total = y1Foothill + y1Valley;

    const y2Foothill = getRandomInt(65, 90);
    const y2Valley = getRandomInt(45, 65);
    const y2Total = y2Foothill + y2Valley;

    const y3Foothill = getRandomInt(60, 85);
    const y3Valley = getRandomInt(55, 75);
    const y3Total = y3Foothill + y3Valley;

    const y4Foothill = getRandomInt(65, 85);
    const y4Valley = getRandomInt(65, 85);
    const y4Total = y4Foothill + y4Valley;

    const y5Foothill = getRandomInt(60, 80);
    const y5Valley = getRandomInt(70, 95);
    const y5Total = y5Foothill + y5Valley;

    const tableCode = `<table><thead><tr><th>High school</th><th>2008</th><th>2009</th><th>2010</th><th>2011</th><th>2012</th></tr></thead><tbody><tr><td>Foothill</td><td>${y1Foothill}</td><td>${y2Foothill}</td><td>${y3Foothill}</td><td>${y4Foothill}</td><td>${y5Foothill}</td></tr><tr><td>Valley</td><td>${y1Valley}</td><td>${y2Valley}</td><td>${y3Valley}</td><td>${y4Valley}</td><td>${y5Valley}</td></tr><tr><td>Total</td><td>${y1Total}</td><td>${y2Total}</td><td>${y3Total}</td><td>${y4Total}</td><td>${y5Total}</td></tr></tbody></table>`;

    const targetNumerator = y3Valley;
    const targetDenominator = y3Total;
    const correctText = `\\frac{${targetNumerator}}{${targetDenominator}}`;

    const wrongNum1 = Math.abs(y3Valley - y3Foothill);
    const wrongNum2 = y3Foothill;

    const optionsData = [
      { text: `\\frac{${wrongNum1}}{${targetDenominator}}`, isCorrect: false, reason: "uses an incorrect numerator" },
      { text: `\\frac{${targetNumerator}}{${targetDenominator}}`, isCorrect: true },
      { text: `\\frac{${wrongNum2}}{${targetDenominator}}`, isCorrect: false, reason: "uses the number of students from the other high school as the numerator" },
      { text: `\\frac{${targetNumerator}}{${y3Foothill}}`, isCorrect: false, reason: "uses the wrong denominator (comparing Valley High students to the other school's students, rather than to the total)" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The question creates a specific condition: "Of the students who completed a summer internship in 2010". This sets the denominator of our fraction. It means we are only looking at the total number of students in 2010, which is $${targetDenominator}$. The question asks for the fraction of that group "who were from Valley High School", which is $${targetNumerator}$. Therefore, the fraction is $\\frac{${targetNumerator}}{${targetDenominator}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table above shows the number of students from two different high schools who completed summer internships in each of five years. No student attended both schools. Of the students who completed a summer internship in 2010, which of the following represents the fraction of students who were from Valley High School?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 16cea46c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4, 6, 10, 5 - small integers]
 * - Difficulty factors: [Frequency table reading, basic probability calculation]
 * - Distractor patterns: [A: 0.10 (impossible count), C: 0.60 (wrong count), D: 0.67 (impossible count)]
 * - Constraints: [4 categories, total sums to reasonable number, decimal answers]
 * - Question type: [Frequency Table → HTML Table with decimal options]
 * - Figure generation: [Generate voice type distribution]
 */