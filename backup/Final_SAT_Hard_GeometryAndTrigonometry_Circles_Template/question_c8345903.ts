import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: c8345903
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc length: 5π (symbolic), angle: 100°]
 * - Difficulty factors: [Arc length proportion, circumference calculation]
 * - Distractor patterns: [Adding instead of ratio, wrong angle usage]
 * - Constraints: [Angle must be less than 360°]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with arc, angle marker - requires Mafs]
 */

export const generator_c8345903 = {
  metadata: {
    // id: "c8345903",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angle x (in degrees) - should be nice number
    const xDegrees = getRandomElement([60, 72, 90, 100, 120, 135, 150]);
    const xRadians = xDegrees * Math.PI / 180;
    
    // STEP 2: Generate arc ADC length (symbolic multiple of π)
    const arcMultiplier = getRandomInt(2, 8);
    const arcADC = `${arcMultiplier}\\\\pi`;
    const arcADCNumeric = arcMultiplier * Math.PI;
    
    // STEP 3: Calculate radius from arc length formula: L = (θ/360) × 2πr
    // arcADC = (x/360) × 2πr
    // r = (arcADC × 360) / (2π × x) = (arcMultiplier × 360) / (2 × x)
    const radius = (arcMultiplier * 360) / (2 * xDegrees);
    
    // Verify radius is reasonable
    if (!Number.isInteger(radius) || radius < 1) {
      // Adjust to ensure integer radius by picking different arcMultiplier
      // Use while loop instead of recursion
      let validRadius = 0;
      let validMultiplier = arcMultiplier;
      let attempts = 0;
      while ((!Number.isInteger(validRadius) || validRadius < 1) && attempts < 20) {
        validMultiplier = getRandomInt(2, 20);
        validRadius = (validMultiplier * 360) / (2 * xDegrees);
        attempts++;
      }
      if (attempts >= 20) {
        // Fallback to known good values
        validMultiplier = xDegrees / 10;
        validRadius = (validMultiplier * 360) / (2 * xDegrees);
      }
      // Continue with valid values
      const finalArcMultiplier = validMultiplier;
      const finalRadius = validRadius;
      
      // Recalculate with valid values
      const finalCircumference = 2 * Math.PI * finalRadius;
      const finalRemainingDegrees = 360 - xDegrees;
      const finalArcABCMultiplier = (finalRemainingDegrees / 360) * 2 * finalRadius;
      
      const finalArcABCText = Number.isInteger(finalArcABCMultiplier) 
        ? `${finalArcABCMultiplier}\\\\pi`
        : `\\\\frac{${finalRemainingDegrees * finalRadius}}{180}\\\\pi`;
      
      const _svg_0 = finalRadius + 3;
      const finalMafsCode = `<div style="width:100%;max-width:400px;margin:0 auto;"><svg viewBox="0 0 350 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
              const xmin=-_svg_0,xmax=_svg_0;
              const ymin=-_svg_0,ymax=_svg_0;
              const W=350,H=350,P=40;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              let s='';
              s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
              s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
              return s;
            })()}${(() => {
              const xmin=-${finalRadius + 3},xmax=${finalRadius + 3};
              const ymin=-${finalRadius + 3},ymax=${finalRadius + 3};
              const W=350,H=350,P=40;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              const scale=(W-2*P)/(xmax-xmin);
              return '<circle cx="'+mx(0)+'" cy="'+my(0)+'" r="'+((${finalRadius)*scale)+'" fill="none" stroke="currentColor" stroke-width="2"/>';
            })()}</svg></div>`;

      const finalCorrectText = `${finalArcABCMultiplier}\\\\pi`;
      
      const finalOptionsData = [
        { text: `${(xDegrees / 360) * 2 * finalRadius}\\\\pi`, isCorrect: false },
        { text: finalCorrectText, isCorrect: true },
        { text: `${finalArcABCMultiplier + 3}\\\\pi`, isCorrect: false },
        { text: `\\\\frac{${Math.round(finalArcABCMultiplier * 2)}}{2}\\\\pi`, isCorrect: false }
      ];
      
      const finalShuffledOptions = shuffle(finalOptionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const finalCorrectLetter = finalShuffledOptions.find(o => o.isCorrect)!.letter;
      const finalIncorrectOptions = finalShuffledOptions.filter(o => !o.isCorrect);
      
      return {
        questionText: `The circle above has center $O$, the length of arc $\\widehat{ADC}$ is $${finalArcMultiplier}\\\\pi$, and $x=${xDegrees}$. What is the length of arc $\\widehat{ABC}$?`,
        figureCode: null,
        options: finalShuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: finalCorrectText,
        explanation: `Choice ${finalCorrectLetter} is correct. The arc length formula is $\\frac{\\theta}{360} \\times 2\\pi r$. From arc $\\widehat{ADC}$: $${finalArcMultiplier}\\\\pi = \\frac{${xDegrees}}{360} \\times 2\\pi r$, giving $r = ${finalRadius}$. The circumference is $2\\pi(${finalRadius}) = ${2 * finalRadius}\\\\pi$. Arc $\\widehat{ABC}$ corresponds to the remaining angle $360° - ${xDegrees}° = ${finalRemainingDegrees}°$, so its length is $\\frac{${finalRemainingDegrees}}{360} \\times ${2 * finalRadius}\\\\pi = ${finalArcABCMultiplier}\\\\pi$. Choice ${finalIncorrectOptions[0].letter} is incorrect; this uses the wrong arc measure. Choice ${finalIncorrectOptions[1].letter} is incorrect; this results from arithmetic errors. Choice ${finalIncorrectOptions[2].letter} is incorrect; this uses an incorrect formula.`
      };
    }
    
    // STEP 4: Calculate circumference
    const circumference = 2 * Math.PI * radius;
    
    // STEP 5: Calculate arc ABC (the major arc)
    // Arc ABC corresponds to angle (360 - x)
    const remainingDegrees = 360 - xDegrees;
    const arcABC = (remainingDegrees / 360) * circumference;
    
    // Format as clean multiple of π
    const arcABCMultiplier = (remainingDegrees / 360) * 2 * radius;
    
    // Should be clean number
    const arcABCText = Number.isInteger(arcABCMultiplier) 
      ? `${arcABCMultiplier}\\\\pi`
      : `\\\\frac{${remainingDegrees * radius}}{180}\\\\pi`; // Fallback
    
    // STEP 6: Generate distractors
    // Distractor A: Just using x degrees instead of (360-x)
    const distractorAMult = (xDegrees / 360) * 2 * radius;
    
    // Distractor B: Wrong operation (adding arc lengths wrong)
    const distractorBMult = arcABCMultiplier + 3; // Arbitrary offset
    
    // Distractor C: Using half the angle
    const distractorCMult = ((360 - xDegrees/2) / 360) * 2 * radius;
    
    // STEP 7: Build Mafs figure
    const mafsCode = null;

    const correctText = `${arcABCMultiplier}\\\\pi`;
    
    const optionsData = [
      { text: `${distractorAMult}\\\\pi`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `${distractorBMult}\\\\pi`, isCorrect: false },
      { text: `\\\\frac{${Math.round(arcABCMultiplier * 2)}}{2}\\\\pi`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The circle above has center $O$, the length of arc $\\widehat{ADC}$ is $${arcADC}$, and $x=${xDegrees}$. What is the length of arc $\\widehat{ABC}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The arc length formula is $\\frac{\\theta}{360} \\times 2\\pi r$. From arc $\\widehat{ADC}$: $${arcMultiplier}\\\\pi = \\frac{${xDegrees}}{360} \\times 2\\pi r$, giving $r = ${radius}$. The circumference is $2\\pi(${radius}) = ${2 * radius}\\\\pi$. Arc $\\widehat{ABC}$ corresponds to the remaining angle $360° - ${xDegrees}° = ${remainingDegrees}°$, so its length is $\\frac{${remainingDegrees}}{360} \\times ${2 * radius}\\\\pi = ${arcABCMultiplier}\\\\pi$. Choice ${incorrectOptions[0].letter} is incorrect; this uses the wrong arc measure. Choice ${incorrectOptions[1].letter} is incorrect; this results from arithmetic errors. Choice ${incorrectOptions[2].letter} is incorrect; this uses an incorrect formula.`
    };
  }
};

/**
 * Question ID: 947133
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1 (for x, y terms), constant: 199/2 ~ 100]
 * - Difficulty factors: [Completing the square, working with fractions]
 * - Distractor patterns: [Forgetting to halve when completing square, sign errors]
 * - Constraints: [Result must give perfect square radius]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */