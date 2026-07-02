import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 498d6795
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: 10√37, BC: 24√37]
 * - Difficulty factors: [Pythagorean theorem with radicals, simplifying radical expressions]
 * - Constraints: [Must recognize 10-24-26 Pythagorean triple scaled by √37]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with right angle at B]
 */

export const generator_498d6795 = {
  metadata: {
    // id: "498d6795",
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
    
    const _svg_0 = leg1 * 3 + 10; const _svg_1 = leg2 * 3 + 10;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-10,xmax=_svg_1;
      const ymin=-10,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-10,xmax=${leg2 * 3 + 10};
      const ymin=-10,ymax=${leg1 * 3 + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-5)+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-10,xmax=${leg2 * 3 + 10};
      const ymin=-10,ymax=${leg1 * 3 + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${leg2 * 3 + 3})+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-10,xmax=${leg2 * 3 + 10};
      const ymin=-10,ymax=${leg1 * 3 + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-5)+'" y="'+my(${leg1 * 3 + 3})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}</svg></div>`;

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

/**
 * Question ID: 55bb437a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan B = 3/4, BC = 15, DA = 4]
 * - Difficulty factors: [Similar triangles, 3-4-5 triangle ratios, segment subtraction]
 * - Constraints: [Similar triangles with scale factor relationship]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Nested similar right triangles]
 */