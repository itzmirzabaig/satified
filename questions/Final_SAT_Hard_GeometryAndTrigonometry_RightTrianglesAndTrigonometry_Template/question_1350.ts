import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1350
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: 10√37, BC: 24√37]
 * - Difficulty factors: [Pythagorean theorem with radicals, simplifying radical expressions]
 * - Constraints: [Must recognize 10-24-26 Pythagorean triple scaled by √37]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with right angle at B]
 */

export const generator_1350 = {
  metadata: {
    id: "1350",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: AB = 10√37, BC = 24√37
    // AC² = (10√37)² + (24√37)² = 100×37 + 576×37 = 37(676) = 37×26²
    // AC = 26√37
    
    // Generate using Pythagorean triple scaled by radical
    const triple = getRandomElement([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25]
    ]) as [number, number, number];
    
    // Random square-free number for radical
    const squareFreeRadicals = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const radicand = getRandomElement(squareFreeRadicals);
    
    const leg1 = triple[0];
    const leg2 = triple[1];
    const hypotenuse = triple[2];

    // ── Figure: proportional right triangle ABC, right angle at B ────────────
    // B bottom-left (right-angle vertex), C bottom-right (BC horizontal =
    // leg2√r), A above B (AB vertical = leg1√r). Legs are scaled so
    // AB : BC = leg1 : leg2, matching the stated side lengths.
    const W = 420, H = 300, P = 46;
    const spanX = W - 2 * P, spanY = H - 2 * P;
    const k = Math.min(spanX / leg2, spanY / leg1);
    const legX = leg2 * k; // horizontal leg BC
    const legY = leg1 * k; // vertical leg AB
    const bx = P, by = H - P;             // B (right-angle vertex)
    const cx = P + legX, cy = by;         // C
    const ax = P, ay = by - legY;         // A
    const rm = 15;                        // right-angle square size
    const mafsCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${bx},${by} ${cx},${cy} ${ax},${ay}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="M ${bx + rm} ${by} L ${bx + rm} ${by - rm} L ${bx} ${by - rm}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>` +
      `<circle cx="${bx}" cy="${by}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${ax}" cy="${ay}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${bx - 12}" y="${by + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${cx + 12}" y="${cy + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${ax - 12}" y="${ay - 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${ax - 16}" y="${(by + ay) / 2}" text-anchor="middle" font-size="12" fill="currentColor">${leg1}√${radicand}</text>` +
      `<text x="${(bx + cx) / 2}" y="${by + 20}" text-anchor="middle" font-size="12" fill="currentColor">${leg2}√${radicand}</text>` +
      `</svg></div>`;

    // Generate options
    const correctAnswer = `${hypotenuse}\\\\sqrt{${radicand}}`;
    const optionA = `${Math.abs(leg2 - leg1)}\\\\sqrt{${radicand}}`;
    const optionC = `${leg1 + leg2}\\\\sqrt{${radicand}}`;
    const optionD = `\\\\sqrt{${leg1 + leg2} \\\\cdot ${radicand}}`;

    const optionsData = [
      { text: optionA, isCorrect: false, reason: "subtracts legs instead of using Pythagorean theorem" },
      { text: correctAnswer, isCorrect: true, reason: "correct: AC = √[(leg1√r)² + (leg2√r)²] = hypotenuse√r" },
      { text: optionC, isCorrect: false, reason: "adds legs directly instead of using Pythagorean theorem" },
      { text: optionD, isCorrect: false, reason: "incorrect radical manipulation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Using the Pythagorean theorem: $AC^2 = (${leg1}\\\\sqrt{${radicand}})^2 + (${leg2}\\\\sqrt{${radicand}})^2 = ${leg1 * leg1}(${radicand}) + ${leg2 * leg2}(${radicand}) = ${radicand}(${leg1 * leg1 + leg2 * leg2})$. Since ${leg1}² + ${leg2}² = ${hypotenuse}² = ${hypotenuse * hypotenuse}, we have $AC^2 = ${radicand}(${hypotenuse * hypotenuse})$, so $AC = ${hypotenuse}\\\\sqrt{${radicand}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In triangle $ABC$, angle $B$ is a right angle. The length of side $AB$ is $${leg1}\\\\sqrt{${radicand}}$ and the length of side $BC$ is $${leg2}\\\\sqrt{${radicand}}$. What is the length of side $AC$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
