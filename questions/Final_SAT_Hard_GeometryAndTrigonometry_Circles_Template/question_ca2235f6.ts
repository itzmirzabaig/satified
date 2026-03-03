import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ca2235f6
 * Skill: Circles (Arc Length and Circumference)
 * Difficulty: Hard
 * 
 * Description: Calculate circumference given the arc measure (degrees) and arc length.
 * Fixes:
 * - Fixed degree symbol rendering (used `^\\circ` instead of `\\\\circ`).
 * - Fixed fraction rendering (used `\\frac` instead of `\\\\frac`).
 * - Ensured option uniqueness.
 */
export const generator_ca2235f6 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    // Generate arc measure (divisor of 360 for integer math)
    const arcAngle = getRandomElement([30, 36, 40, 45, 60, 72, 90]);
    
    // Generate arc length (integer)
    const arcLength = getRandomInt(2, 9);
    
    // ----------------------------------------------------------------------
    // 2. CALCULATE CIRCUMFERENCE
    // ----------------------------------------------------------------------
    // Formula: ArcLength / Circumference = ArcAngle / 360
    // C = ArcLength * (360 / ArcAngle)
    
    const ratio = 360 / arcAngle; // This will be an integer
    const circumference = arcLength * ratio;
    
    // ----------------------------------------------------------------------
    // 3. GENERATE DISTRACTORS
    // ----------------------------------------------------------------------
    // D1: The arc length itself (student thinks arc = circumference?)
    const d1 = arcLength;
    
    // D2: A simple multiple (e.g. 2x arc length) or ArcLength * Angle
    const d2 = arcLength * 2;
    
    // D3: The angle itself (student confuses degrees with length)
    const d3 = arcAngle;
    
    // Ensure uniqueness (rare edge case: if arcAngle == circumference, etc.)
    const optionsSet = new Set([circumference]);
    const distractors = [d1, d2, d3];
    const finalOptions: number[] = [];
    
    // Add distinct distractors or fallback to random
    for (const d of distractors) {
      if (!optionsSet.has(d)) {
        optionsSet.add(d);
        finalOptions.push(d);
      } else {
        let fallback = d + getRandomInt(5, 10);
        while (optionsSet.has(fallback)) fallback++;
        optionsSet.add(fallback);
        finalOptions.push(fallback);
      }
    }

    const optionsData = [
      { text: circumference.toString(), isCorrect: true },
      { text: finalOptions[0].toString(), isCorrect: false },
      { text: finalOptions[1].toString(), isCorrect: false },
      { text: finalOptions[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    // ----------------------------------------------------------------------
    // 4. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `A circle has center $O$, and points $A$ and $B$ lie on the circle. The measure of arc $AB$ is $${arcAngle}^\\circ$ and the length of arc $AB$ is ${arcLength} inches. What is the circumference, in inches, of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: circumference.toString(),
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        The length of an arc is proportional to the circumference of the circle based on the central angle.
        <br/>
        $$ \\frac{\\text{Arc Length}}{\\text{Circumference}} = \\frac{\\text{Arc Angle}}{360^\\circ} $$
        <br/>
        Substitute the given values:
        $$ \\frac{${arcLength}}{C} = \\frac{${arcAngle}}{360} $$
        <br/>
        Simplify the fraction on the right ($360 \\div ${arcAngle} = ${ratio}$):
        $$ \\frac{${arcLength}}{C} = \\frac{1}{${ratio}} $$
        <br/>
        Solve for $C$:
        $$ C = ${arcLength} \\times ${ratio} $$
        $$ C = ${circumference} $$
      `
    };
  }
};