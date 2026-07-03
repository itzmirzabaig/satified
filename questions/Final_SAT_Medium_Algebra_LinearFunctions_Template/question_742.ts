import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 742
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h=1,f(h)=155; h=3,f(h)=285, slope=65, intercept=90]
 * - Difficulty factors: [Finding equation from two points in table]
 * - Distractor patterns: [A = inverted, B = swapped slope/intercept, D = wrong values]
 * - Constraints: [Table data must be consistent]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_742 = {
  metadata: {
    id: "742",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Hours: h1 small, h2 larger
    const h1 = getRandomInt(1, 3);
    const h2 = h1 + getRandomInt(1, 3);
    // Slope: 50-80
    const m = getRandomInt(50, 80);
    // Intercept: 60-120
    const b = getRandomInt(60, 120);
    // Calculate charges
    const f1 = m * h1 + b;
    const f2 = m * h2 + b;
    
    // STEP 2: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">h</th><th style="border: 1px solid currentColor; padding: 8px;">f(h)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${h1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${f1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${h2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${f2}</td></tr></tbody></table>`;
    
    // STEP 3: Create options
    // Build the correct (slope, intercept) pair, then generate distinct
    // distractor pairs. Each candidate carries a reason; we keep the first
    // three that differ from the correct pair AND from each other, so no two
    // options can ever collide for any draw.
    const eqOf = (slope: number, intercept: number) => `f(h) = ${slope}h + ${intercept}`;
    const correctEq = eqOf(m, b);

    // Candidate distractors, each a distinct conceptual error:
    // 1. Swaps slope and intercept.
    // 2. Correct slope but uses the first output f1 as the intercept
    //    (forgets to subtract m*h1), guaranteed > b since m*h1 > 0.
    // 3. Reads the total change in f(h) as the slope without dividing by the
    //    change in h.
    // 4/5. Backup pairs (safety net so we always have 3 distinct distractors).
    const candidates = [
      { slope: b, intercept: m, reason: "swaps the slope and intercept values" },
      { slope: m, intercept: f1, reason: "uses the first table value as the intercept instead of subtracting the slope contribution" },
      { slope: f2 - f1, intercept: b, reason: "uses the total change in $f(h)$ as the slope without dividing by the change in $h$" },
      { slope: m + 5, intercept: b, reason: "uses an incorrect slope" },
      { slope: m, intercept: b + 15, reason: "uses an incorrect intercept" },
    ];

    const distractors: { text: string; isCorrect: boolean; reason: string }[] = [];
    const used = new Set<string>([correctEq]);
    for (const c of candidates) {
      const text = eqOf(c.slope, c.intercept);
      if (used.has(text)) continue;
      used.add(text);
      distractors.push({ text, isCorrect: false, reason: c.reason });
      if (distractors.length === 3) break;
    }
    // Bounded safety net: if candidates collided too much, add offset pairs.
    let guard = 0;
    while (distractors.length < 3 && guard++ < 50) {
      const text = eqOf(m + guard, b + guard);
      if (used.has(text)) continue;
      used.add(text);
      distractors.push({ text, isCorrect: false, reason: "uses an incorrect slope and intercept" });
    }

    const optionsData = [
      { text: correctEq, isCorrect: true, reason: "" },
      ...distractors,
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The table gives the number of hours, $h$, of labor and a plumber's total charge $f(h)$, in dollars, for two different jobs. Which equation defines $f$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${f2} - ${f1}}{${h2} - ${h1}} = \\frac{${f2 - f1}}{${h2 - h1}} = ${m}$. Substituting the point $(${h1}, ${f1})$ into $f(h) = ${m}h + b$ and solving for the intercept gives $b = ${f1} - ${m}(${h1}) = ${b}$. Thus $f(h) = ${m}h + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
