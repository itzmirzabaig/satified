import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3b225698
 * Skill: Lines Angles And Triangles (Similar Triangles)
 * Difficulty: Hard
 * 
 * Description: Determine the measure of a corresponding angle in similar triangles given a scale factor.
 * Fixes:
 * - Fixed LaTeX formatting for degrees (`^\\circ` inside `$`).
 * - Fixed angle symbol (`\\angle`).
 */
export const generator_3b225698 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    // Angle Z: Random integer between 15 and 45
    const angleZ = getRandomInt(15, 45);
    
    // Scale Factor: Random integer (e.g., 2, 3, 4)
    // "k * XY = RS" implies RS is k times bigger than XY.
    const scaleFactor = getRandomInt(2, 4);
    
    // ----------------------------------------------------------------------
    // 2. CREATE OPTIONS
    // ----------------------------------------------------------------------
    // In similar triangles, corresponding angles are CONGRUENT. Scale factor does not affect angles.
    
    // Correct Answer: Same as angleZ
    const correctVal = angleZ;
    
    // Distractor 1: Angle divided by scale factor (student thinks angles scale)
    const d1 = Math.round(angleZ / scaleFactor);
    
    // Distractor 2: Angle multiplied by scale factor
    const d2 = angleZ * scaleFactor;
    
    // Distractor 3: Half the angle (random logic)
    const d3 = Math.round(angleZ / 2);
    
    // Ensure uniqueness
    const optionsSet = new Set([correctVal]);
    const finalOptions: number[] = [];
    
    for (const d of [d1, d2, d3]) {
        if (!optionsSet.has(d)) {
            optionsSet.add(d);
            finalOptions.push(d);
        } else {
            // Fallback unique value
            let fallback = d + 10;
            while (optionsSet.has(fallback)) fallback += 10;
            optionsSet.add(fallback);
            finalOptions.push(fallback);
        }
    }

    const optionsData = [
      { text: `$${correctVal}^\\circ$`, isCorrect: true },
      { text: `$${finalOptions[0]}^\\circ$`, isCorrect: false },
      { text: `$${finalOptions[1]}^\\circ$`, isCorrect: false },
      { text: `$${finalOptions[2]}^\\circ$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      // Use $...$ for all math. Use ^\circ for degrees.
      questionText: `Triangle $XYZ$ is similar to triangle $RST$ such that $X, Y$, and $Z$ correspond to $R, S$, and $T$, respectively. The measure of $\\angle Z$ is $${angleZ}^\\circ$ and $${scaleFactor}XY = RS$. What is the measure of $\\angle T$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        It is given that triangle $XYZ$ is similar to triangle $RST$.
        <br/>
        The definition of similar triangles states that their corresponding side lengths are proportional, but their <b>corresponding angles are congruent</b> (equal in measure).
        <br/><br/>
        Since $Z$ corresponds to $T$:
        $$ m\\angle Z = m\\angle T $$
        <br/>
        We are given that $m\\angle Z = ${angleZ}^\\circ$. Therefore:
        $$ m\\angle T = ${angleZ}^\\circ $$
        <br/>
        The scale factor information ($${scaleFactor}XY = RS$) affects the side lengths, but has no effect on the angle measures.
      `
    };
  }
};