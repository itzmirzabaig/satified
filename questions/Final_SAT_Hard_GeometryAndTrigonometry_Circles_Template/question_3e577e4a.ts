import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 3e577e4a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-4, -6), tangency: (-7, -7), slope: -3]
 * - Difficulty factors: [Perpendicular slopes, negative reciprocals]
 * - Distractor patterns: [Sign errors, using radius slope directly]
 * - Constraints: [Tangent perpendicular to radius]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3e577e4a = {
  metadata: {
    // id: "3e577e4a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = getRandomInt(-8, -2);
    const k = getRandomInt(-8, -2);
    
    // STEP 2: Generate point of tangency (ensure nice slope)
    // Want slope of radius to be simple fraction like 1/3
    const dx = getRandomElement([2, 3, 4]);
    const dy = getRandomElement([1, 2, 3]);
    
    const x1 = h - dx; // Left of center for variety
    const y1 = k - dy; // Below center
    
    // STEP 3: Calculate slopes
    const mRadius = dy / dx; // Simplified
    const mTangent = -dx / dy; // Negative reciprocal
    
    // Should be integer or simple fraction
    let tangentSlope: number;
    let tangentDisplay: string;
    
    if (dy === 1) {
      tangentSlope = -dx;
      tangentDisplay = (-dx).toString();
    } else {
      tangentSlope = -dx / dy;
      tangentDisplay = `-${dx}/${dy}`;
    }
    
    // STEP 4: Generate distractors
    // Distractor B: -1/3 (negative of radius slope, not reciprocal)
    const distractorB = -(dy / dx);
    
    // Distractor C: 1/3 (radius slope itself)
    const distractorC = dy / dx;
    
    // Distractor D: 3 (reciprocal without negative)
    const distractorD = dx / dy;
    
    const correctText = tangentSlope.toString();
    
    // Ensure we have a clean integer answer
    if (!Number.isInteger(tangentSlope)) {
      // Use while loop to regenerate instead of recursion
      let attempts = 0;
      let newH = h;
      let newK = k;
      let newX1 = x1;
      let newY1 = y1;
      let newDx = dx;
      let newDy = dy;
      let newTangentSlope = tangentSlope;
      
      while (!Number.isInteger(newTangentSlope) && attempts < 20) {
        newH = getRandomInt(-8, -2);
        newK = getRandomInt(-8, -2);
        newDx = getRandomElement([2, 3, 4]);
        newDy = 1; // Force dy=1 for integer slope
        newX1 = newH - newDx;
        newY1 = newK - newDy;
        newTangentSlope = -newDx / newDy;
        attempts++;
      }
      
      // Use the valid values
      const finalH = newH;
      const finalK = newK;
      const finalX1 = newX1;
      const finalY1 = newY1;
      const finalDx = newDx;
      const finalDy = newDy;
      const finalTangentSlope = newTangentSlope;
      const finalMRadiusNum = finalY1 - finalK;
      const finalMRadiusDen = finalX1 - finalH;
      
      const finalOptionsData = [
        { text: finalTangentSlope.toString(), isCorrect: true },
        { text: (-(finalDy / finalDx)).toFixed(2).replace(/\.00$/, ''), isCorrect: false },
        { text: (finalDy / finalDx).toFixed(2).replace(/\.00$/, ''), isCorrect: false },
        { text: (finalDx / finalDy).toFixed(2).replace(/\.00$/, ''), isCorrect: false }
      ];
      
      const finalShuffledOptions = shuffle(finalOptionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const finalCorrectLetter = finalShuffledOptions.find(o => o.isCorrect)!.letter;
      const finalIncorrectOptions = finalShuffledOptions.filter(o => !o.isCorrect);
      
      return {
        questionText: `A circle in the $xy$-plane has its center at $(${finalH}, ${finalK})$. Line $k$ is tangent to this circle at the point $(${finalX1}, ${finalY1})$. What is the slope of line $k$?`,
        figureCode: null,
        options: finalShuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: finalTangentSlope.toString(),
        explanation: `Choice ${finalCorrectLetter} is correct. The slope of the radius to the point of tangency is $\\\\frac{${finalY1}-(${finalK})}{${finalX1}-(${finalH})}=\\\\frac{-${finalDy}}{-${finalDx}}=\\\\frac{${finalDy}}{${finalDx}}$. Since the tangent is perpendicular to the radius, its slope is the negative reciprocal: $-${finalDx}/${finalDy}=${finalTangentSlope}$. Choice ${finalIncorrectOptions[0].letter} is incorrect; this is the negative of the radius slope. Choice ${finalIncorrectOptions[1].letter} is incorrect; this is the slope of the radius itself. Choice ${finalIncorrectOptions[2].letter} is incorrect; this is the reciprocal without the negative sign.`
      };
    }
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB.toFixed(2).replace(/\.00$/, ''), isCorrect: false },
      { text: distractorC.toFixed(2).replace(/\.00$/, ''), isCorrect: false },
      { text: distractorD.toFixed(2).replace(/\.00$/, ''), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$. Line $k$ is tangent to this circle at the point $(${x1}, ${y1})$. What is the slope of line $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The slope of the radius to the point of tangency is $\\\\frac{${y1}-(${k})}{${x1}-(${h})}=\\\\frac{-${dy}}{-${dx}}=\\\\frac{${dy}}{${dx}}$. Since the tangent is perpendicular to the radius, its slope is the negative reciprocal: $-${dx}/${dy}=${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the negative of the radius slope. Choice ${incorrectOptions[1].letter} is incorrect; this is the slope of the radius itself. Choice ${incorrectOptions[2].letter} is incorrect; this is the reciprocal without the negative sign.`
    };
  }
};

/**
 * Question ID: fa2771d5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (7, -3), translation: 4 units right]
 * - Difficulty factors: [Horizontal translation of circle]
 * - Distractor patterns: [Wrong direction, changing y instead of x]
 * - Constraints: [Only x-coordinate changes for horizontal shift]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */