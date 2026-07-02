import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 981
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 473 cm³ = 16 oz, gallon = 128 oz]
 * - Difficulty factors: [Unit conversion, division application problem]
 * - Distractor patterns: [A: 16 (glass volume), C: 4 (128/32), D: 3 (approximation error)]
 * - Constraints: [Must use given conversions]
 * - Question type: [Text with Mafs figure→Multiple Choice Text]
 * - Figure generation: [MAFS - Glass shape]
 */

export const generator_981 = {
  metadata: {
    id: "981",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 16 oz glass, 128 oz gallon, answer = 8
    const glassOz = getRandomInt(8, 32);
    const gallonMultiplier = 8; // 128/16 = 8, keep this relationship
    const gallonOz = glassOz * gallonMultiplier;
    
    // Generate random k value for the geometric formula
    const k = getRandomInt(2, 6);
    
    // STEP 2: Build Mafs code for the glass figure
    // Calculate viewBox based on the trapezoid dimensions
    // Points: [-1, 0], [1, 0], [2, 3], [-2, 3]
    // x ranges from -2 to 2.5, y ranges from -0.5 to 3.5
    const xMin = -3;
    const xMax = 4;
    const yMin = -1;
    const yMax = 5;
    
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(2.5)+'" y1="'+my(0)+'" x2="'+mx(2.5)+'" y2="'+my(3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">k/2</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(3.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">k</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(2.8)+'" y="'+my(1.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">k</text>';
    })()}</svg></div>`;
    
    // STEP 3: Create distractors
    const distractorA = glassOz;
    const distractorC = Math.floor(gallonMultiplier / 2);
    const distractorD = Math.floor(gallonMultiplier / 2.5);
    
    const correctAnswer = gallonMultiplier.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "represents the volume of the glass in fluid ounces, not the number of times it can be filled" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "results from dividing by an incorrect value" },
      { text: distractorD.toString(), isCorrect: false, reason: "results from an approximation error or incorrect calculation" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The glass pictured above can hold a maximum volume of $${473 + getRandomInt(-50, 50)}$ cubic centimeters, which is approximately $${glassOz}$ fluid ounces. The volume of the glass can be calculated using the formula $V = \\frac{7\\pi k^3}{48}$. Jenny has a pitcher that contains 1 gallon of water. How many times could Jenny completely fill the glass with 1 gallon of water? (1 gallon = ${gallonOz} fluid ounces)`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctLetter} is correct. To find the number of times the glass can be filled, divide the total volume of water in the pitcher by the volume of the glass: $\\frac{${gallonOz} \\text{ fluid ounces}}{${glassOz} \\text{ fluid ounces}} = ${gallonMultiplier}$. Jenny can completely fill the glass ${gallonMultiplier} times. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
