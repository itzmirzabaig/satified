import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4dd4efcf
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Quadratic Properties)
 * - Logic: Analyze vertex form and coefficients from symmetry points.
 * - Question: Given f(x) = ax^2 + Bx + c, parabola opens up, vertex y < 0, f(x1)=f(x2).
 * - Statements: 
 *      I. c < 0 
 *      II. a >= 1
 * - Dynamic Changes: 
 *      1. Randomizes x1, x2 (and thus h).
 *      2. Randomizes B to create cases where a < 1 OR a >= 1.
 *      3. Statement I is false (unless h=0, which we avoid to preserve difficulty).
 */

export const generator_4dd4efcf = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Axis of Symmetry (h)
    // Avoid 0 to ensure Statement I (c < 0) is not automatically true.
    let h = getRandomInt(-6, 6);
    if (h === 0) h = 2;

    // 2. Generate Symmetry Points x1, x2
    // f(x1) = f(x2) means they are equidistant from h.
    const dist = getRandomInt(1, 5);
    const x1 = h - dist;
    const x2 = h + dist;

    // 3. Determine 'a' and 'B'
    // Formula: Axis of symmetry h = -B / 2a  =>  2ah = -B  =>  B = -2ah
    // We want to randomize whether a >= 1 (Statement II True) or a < 1 (Statement II False).
    
    // Decide scenario: 
    // Case A: 0 < a < 1 (e.g., 0.5) -> |B| < |2h|
    // Case B: a >= 1 (e.g., 2) -> |B| >= |2h|
    const scenario = getRandomElement(['small_a', 'large_a']);
    
    let a: number;
    let B: number;

    if (scenario === 'small_a') {
        // Pick 'a' such that it's a fraction < 1. 
        // To keep B integer, let's pick B first such that |B| < |2h|
        // Ensure B has opposite sign of h to make a > 0 (since graph opens upward)
        // h = -B/2a -> a = -B/2h. For a > 0, -B and h must have same sign? 
        // No: a = -B/(2h). If a>0, -B/(2h) > 0. B and 2h must have OPPOSITE signs.
        
        const maxB = Math.abs(2 * h) - 1; // Strictly less than 2h
        // If 2h is small, we might force B=0 (where a=0, invalid). Ensure range exists.
        if (maxB < 1) {
            // Fallback for very small h (e.g. 1): B must be 0? 
            // If h=1, 2h=2. |B| < 2 -> B=0 or 1.
            // Let's just force large_a if h is tiny to avoid a=0 complications
            a = 2; 
            B = -2 * a * h;
        } else {
            let absB = getRandomInt(1, maxB);
            // Evenness helps division but fraction 'a' is fine.
            // Sign of B must differ from h to keep a positive?
            // Actually: a = -B / 2h. 
            // If h > 0, we need -B > 0 -> B < 0.
            // If h < 0, we need -B < 0 -> B > 0.
            B = h > 0 ? -absB : absB;
            a = -B / (2 * h);
        }
    } else {
        // Case a >= 1
        // Pick a integer >= 1
        a = getRandomInt(1, 4);
        B = -2 * a * h;
    }

    // 4. Evaluate Statements
    // Statement I: c < 0
    // c = ah^2 + k. We know a>0 and k<0. 
    // Since h != 0, ah^2 > 0.
    // c could be positive (if |k| small) or negative (if |k| large).
    // Thus, "c < 0" is NOT necessarily true.
    const isStatement1True = false;

    // Statement II: a >= 1
    const isStatement2True = a >= 1;

    // 5. Build Options
    let correctText = "";
    if (isStatement1True && isStatement2True) correctText = "I and II";
    else if (isStatement1True) correctText = "I only";
    else if (isStatement2True) correctText = "II only";
    else correctText = "Neither I nor II";

    const optionsData = [
      { text: `I only`, isCorrect: correctText === "I only" },
      { text: `II only`, isCorrect: correctText === "II only" },
      { text: `I and II`, isCorrect: correctText === "I and II" },
      { text: `Neither I nor II`, isCorrect: correctText === "Neither I nor II" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 6. Explanation
    // Format B for display (e.g., "+ 4x" or "- 4x")
    const signB = B >= 0 ? "+" : "-";
    const absB = Math.abs(B);
    
    return {
      questionText: `In the given quadratic function, $f(x) = ax^2 ${signB} ${absB}x + c$, where $a$ and $c$ are constants. The graph is a parabola that opens upward with vertex $(h, k)$ where $k < 0$ and $f(${x1}) = f(${x2})$. Which of the following must be true?
      <br/>
      I. $c < 0$
      <br/>
      II. $a \\geq 1$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.
      <br/><br/>
      <strong>Analyze Axis of Symmetry:</strong>
      <br/>
      Since $f(${x1}) = f(${x2})$, the axis of symmetry is the midpoint:
      $$h = \\frac{${x1} + ${x2}}{2} = ${h}$$
      From the equation $f(x) = ax^2 ${signB} ${absB}x + c$, the axis of symmetry is $x = \\frac{-B}{2a}$.
      $$h = \\frac{-(${B})}{2a} \\implies ${h} = \\frac{${-B}}{2a}$$
      Solving for $a$:
      $$2a(${h}) = ${-B} \\implies ${2*h}a = ${-B} \\implies a = \\frac{${-B}}{${2*h}} = ${Number.isInteger(a) ? a : a.toFixed(2)}$$
      <br/>
      <strong>Evaluate Statement II ($a \\geq 1$):</strong>
      <br/>
      We found $a = ${Number.isInteger(a) ? a : a.toFixed(2)}$.
      Since ${a} ${a >= 1 ? '\\geq' : '<'} 1$, Statement II is <strong>${isStatement2True ? 'true' : 'false'}</strong>.
      <br/><br/>
      <strong>Evaluate Statement I ($c < 0$):</strong>
      <br/>
      The vertex form is $f(x) = a(x-h)^2 + k$. The constant $c$ is the y-intercept $f(0)$:
      $$c = f(0) = a(0 - ${h})^2 + k = a(${h*h}) + k$$
      We know $a(${h*h})$ is positive and $k$ is negative.
      Because we don't know the exact value of $k$, $c$ could be positive (if $|k|$ is small) or negative (if $|k|$ is large).
      Therefore, Statement I is <strong>not necessarily true</strong>.
      <br/><br/>
      Conclusion: <strong>${correctText}</strong>.`
    };
  }
};