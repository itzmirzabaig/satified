import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0a99e5bb
 * FIXED:
 * - Added a visual HTML table to `figureCode` to display the numbers.
 * - Shuffled the display order of numbers in the table.
 * - Used `currentColor` for table borders to support light/dark mode.
 */

export const generator_0a99e5bb = {
  metadata: {
    id: "0a99e5bb",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // 1. Generate Data (1 Negative, 2 Positive)
    const negativeNum = getRandomInt(-25, -10);
    const pos1 = getRandomInt(5, 30);
    const pos2 = getRandomInt(5, 30);

    // 2. Prepare Display Data
    // We shuffle these so the negative number isn't always in column 1
    const dataSet = shuffle([negativeNum, pos1, pos2]);

    // 3. Create Figure (HTML Table)
    const tableHtml = `
      <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
        <table style="border-collapse: collapse; font-family: sans-serif; font-size: 1.2rem;">
          <tr>
            ${dataSet.map(num => `
              <td style="border: 1px solid currentColor; padding: 12px 24px; text-align: center;">
                ${num}
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
    `;

    // 4. Probability Logic
    const negativeCount = 1;
    const totalCount = 3;
    // The correct answer is always 1/3 in this specific setup
    const correctText = `\\frac{${negativeCount}}{${totalCount}}`;

    const optionsData = [
      { 
        text: "0", 
        isCorrect: false, 
        reason: "probability of selecting from a data set with no negative numbers" 
      },
      { 
        text: correctText, 
        isCorrect: true 
      },
      { 
        text: `\\frac{2}{3}`, 
        isCorrect: false, 
        reason: "probability of selecting a positive number from this data set" 
      },
      { 
        text: "1", 
        isCorrect: false, 
        reason: "probability of selecting from a data set containing only negative numbers" 
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A data set of three numbers is shown above. If a number from this data set is selected at random, what is the probability of selecting a negative number?`,
      figureCode: tableHtml,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The data set contains three numbers: ${dataSet.join(', ')}. Only ${negativeNum} is negative. Therefore, the probability of selecting a negative number is $\\frac{${negativeCount}}{${totalCount}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`
    };
  }
};