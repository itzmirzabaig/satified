import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 541bef2f
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Given a system of two linear inequalities (no graph), the student must identify which ordered pair (x,y) is a solution.
 */
export const generator_541bef2f = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. HELPER: Linear Expression Formatter
    // ----------------------------------------------------------------------
    // Converts m, b into clean LaTeX string "mx + b" handling signs/ones
    const formatLinear = (m: number, b: number) => {
      let mStr = "";
      if (m === 1) mStr = "x";
      else if (m === -1) mStr = "-x";
      else mStr = `${m}x`;

      let bStr = "";
      if (b > 0) bStr = `+ ${b}`;
      else if (b < 0) bStr = `- ${Math.abs(b)}`;
      // if b is 0, append nothing
      
      return `${mStr} ${bStr}`.trim();
    };

    // ----------------------------------------------------------------------
    // 2. MATHEMATICAL LOGIC: System Generation
    // ----------------------------------------------------------------------
    // System: y <= m1x + b1  AND  y >= m2x + b2
    // We want lines that intersect to create a clear solution region.
    // m1 positive (upper bound slope), m2 negative (lower bound slope) works well.
    const m1 = getRandomInt(1, 4); 
    const b1 = getRandomInt(1, 8); 
    
    const m2 = getRandomInt(-4, -1);
    const b2 = getRandomInt(-8, -1);

    // Validation function
    const isValid = (x: number, y: number) => {
      return (y <= m1 * x + b1) && (y >= m2 * x + b2);
    };

    // 3. Find a valid integer solution (Correct Answer)
    // Scan a range of x to find integer coordinates that satisfy both.
    let potentialSolutions: {x: number, y: number}[] = [];
    
    // Intersection X is roughly (b2-b1)/(m1-m2). With these ranges, usually between -10 and 2.
    for (let x = -10; x <= 5; x++) {
      const yMax = m1 * x + b1;
      const yMin = m2 * x + b2;
      
      // If there's space between lines
      if (yMax >= yMin) {
        // Find integer y's in this vertical slice
        for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
          potentialSolutions.push({ x, y });
        }
      }
    }

    // Safety fallback
    if (potentialSolutions.length === 0) {
       return generator_541bef2f.generate();
    }

    const correctPoint = getRandomElement(potentialSolutions);

    // ----------------------------------------------------------------------
    // 4. DISTRACTOR GENERATION
    // ----------------------------------------------------------------------
    const distractors: {x: number, y: number}[] = [];
    
    // Attempt to generate 3 distinct invalid points
    let attempts = 0;
    while (distractors.length < 3 && attempts < 50) {
      attempts++;
      let dPoint = { x: 0, y: 0 };
      
      const type = attempts % 3; 
      if (type === 0) {
        // Fails inequality 1 (y is too high), passes inequality 2
        dPoint = { 
          x: correctPoint.x, 
          y: Math.floor(m1 * correctPoint.x + b1) + getRandomInt(2, 6) 
        };
      } else if (type === 1) {
        // Fails inequality 2 (y is too low), passes inequality 1
        dPoint = { 
          x: correctPoint.x, 
          y: Math.ceil(m2 * correctPoint.x + b2) - getRandomInt(2, 6) 
        };
      } else {
        // Sign swap error (common student mistake) or random
        dPoint = { x: -correctPoint.x, y: correctPoint.y };
      }

      // Ensure it is strictly invalid and unique
      const alreadyExists = distractors.some(p => p.x === dPoint.x && p.y === dPoint.y);
      const isCorrectPoint = dPoint.x === correctPoint.x && dPoint.y === correctPoint.y;
      
      if (!isValid(dPoint.x, dPoint.y) && !alreadyExists && !isCorrectPoint) {
        distractors.push(dPoint);
      }
    }

    // Prepare Options
    const optionsData = [
      { text: `(${correctPoint.x}, ${correctPoint.y})`, correct: true },
      ...distractors.map(d => ({ text: `(${d.x}, ${d.y})`, correct: false }))
    ];

    const shuffledOptions = shuffle(optionsData);
    const correctOptionIndex = shuffledOptions.findIndex(o => o.correct);
    const correctLetter = String.fromCharCode(65 + correctOptionIndex);

    // ----------------------------------------------------------------------
    // 5. QUESTION TEXT & RETURN
    // ----------------------------------------------------------------------
    return {
      questionText: `
$$
\\begin{cases}
y \\le ${formatLinear(m1, b1)} \\\\
y \\ge ${formatLinear(m2, b2)}
\\end{cases}
$$
Which point $(x, y)$ is a solution to the given system of inequalities in the $xy$-plane?
      `.trim(),
      figureCode: null, // No graph for this specific version
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        A point $(x, y)$ is a solution to the system if it satisfies <b>both</b> inequalities.
        <br/>
        Substituting $(${correctPoint.x}, ${correctPoint.y})$ into the system:
        <br/><br/>
        1) Check first inequality: $y \\le ${formatLinear(m1, b1)}$
        $$ ${correctPoint.y} \\le ${m1}(${correctPoint.x}) ${b1 >= 0 ? '+ ' + b1 : '- ' + Math.abs(b1)} $$
        $$ ${correctPoint.y} \\le ${m1 * correctPoint.x + b1} $$
        This is true.
        <br/><br/>
        2) Check second inequality: $y \\ge ${formatLinear(m2, b2)}$
        $$ ${correctPoint.y} \\ge ${m2}(${correctPoint.x}) ${b2 >= 0 ? '+ ' + b2 : '- ' + Math.abs(b2)} $$
        $$ ${correctPoint.y} \\ge ${m2 * correctPoint.x + b2} $$
        This is also true.
        <br/><br/>
        Since the point satisfies both conditions, it is a solution.
      `
    };
  }
};