import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f7dbde16
 * 
 * FIXES:
 * - Fixed LaTeX syntax `^\\\\circ` to `^{\\circ}` to resolve "missing open brace" errors.
 * - Fixed `options` return type to be `string[]` (previously returned objects).
 * - Refined distractor logic to ensure mathematical precision regarding SSA vs SAS vs AA similarity.
 */

export const generator_f7dbde16 = {
  metadata: {
    id: "f7dbde16",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base angle and side lengths
    const angleL = getRandomInt(45, 75);
    const LN = getRandomInt(8, 15);
    const scaleFactor = getRandomInt(2, 4);
    const RT = LN * scaleFactor;
    
    // Define other angles for correct answer logic
    const angleM = getRandomInt(40, 60);
    const angleS = angleM; // For AA similarity
    
    // Distractor values
    const wrongAngle = angleM + getRandomInt(10, 20);
    
    // Distractor sides (Side-Side-Side attempts with wrong numbers)
    const MN = getRandomInt(10, 15);
    const ST_NonProp = MN * scaleFactor + getRandomInt(2, 5); // Non-proportional
    
    // Distractor sides (SSA case - Side Opposite Angle)
    // Even if proportional, SSA is not sufficient for similarity without specific conditions
    const ST_Prop = MN * scaleFactor;

    const optionsRaw = [
      { 
        id: "A",
        text: `The length of side $MN$ is ${MN} and the length of side $ST$ is ${ST_NonProp}`, 
        isCorrect: false,
        reason: "the ratio of the new sides is not equal to the ratio of the given sides ($\\frac{RT}{LN}$), so the sides are not proportional"
      },
      { 
        id: "B",
        text: `The length of side $MN$ is ${MN} and the length of side $ST$ is ${ST_Prop}`, 
        isCorrect: false,
        reason: "knowing two sides and a non-included angle (SSA) is not sufficient to prove similarity"
      },
      { 
        id: "C",
        text: `The measure of angle $M$ is ${angleM}^{\\circ} and the measure of angle $S$ is ${wrongAngle}^{\\circ}`, 
        isCorrect: false,
        reason: "the angles are not congruent, so AA similarity cannot be established"
      },
      { 
        id: "D",
        text: `The measure of angle $M$ is ${angleM}^{\\circ} and the measure of angle $S$ is ${angleS}^{\\circ}`, 
        isCorrect: true,
        reason: "it provides a second pair of congruent angles ($\\angle M \\cong \\angle S$). Combined with the given $\\angle L \\cong \\angle R$, the triangles are similar by the AA Similarity Theorem"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsRaw).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const getLetter = (id: string) => shuffledOptions.find(o => o.id === id)?.letter || '?';
    
    return {
      questionText: `In triangles $LMN$ and $RST$, angles $L$ and $R$ each have measure $${angleL}^{\\circ}$, $LN = ${LN}$, and $RT = ${RT}$. Which additional piece of information is sufficient to prove that triangle $LMN$ is similar to triangle $RST$?`,
      figureCode: null,
      // Fixed: Return simple strings, not objects
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To prove that two triangles are similar, one sufficient condition is the AA (Angle-Angle) Similarity Theorem, which requires two pairs of corresponding angles to be congruent.
      
We are already given that $\\angle L \\cong \\angle R$.
Choice ${correctOption.letter} provides that $\\angle M = ${angleM}^{\\circ}$ and $\\angle S = ${angleS}^{\\circ}$, so $\\angle M \\cong \\angle S$.
With two pairs of congruent angles, $\\triangle LMN \\sim \\triangle RST$.

Choice ${getLetter('A')} is incorrect because ${optionsRaw.find(o => o.id === 'A')!.reason}.
Choice ${getLetter('B')} is incorrect because ${optionsRaw.find(o => o.id === 'B')!.reason}.
Choice ${getLetter('C')} is incorrect because ${optionsRaw.find(o => o.id === 'C')!.reason}.`
    };
  }
};

/**
 * Question ID: b1e1c2f5
 * 
 * ANALYSIS:
 * - Context: Triangle with a parallel line cutting through it (Side-Splitter Theorem / Similar Triangles).
 * - Given: BC (base), relation between segments AE and CE (e.g. CE = 3AE).
 * - Find: Length of parallel segment DE.
 * - Logic: Triangle ADE is similar to Triangle ABC. 
 * - Ratio: AE / AC = AE / (AE + CE).
 * - DE = BC * (Ratio).
 */

export const generator_b1e1c2f5 = {
  metadata: {
    id: "b1e1c2f5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Setup Ratios
    // Let AE = 1 unit for ratio purposes.
    // CE = k * AE.
    const k = getRandomInt(2, 5); // Multiplier: 2, 3, 4, or 5
    
    // AC = AE + CE = 1 + k
    // Similarity Ratio (small to big) = AE / AC = 1 / (1 + k)
    
    // 2. Setup Lengths
    // DE is the small base. BC is the large base.
    // BC must be divisible by (1 + k) to ensure DE is an integer (SAT integer constraints usually).
    const DE = getRandomInt(12, 30);
    const BC = DE * (1 + k);

    // 3. Question Construction
    // "CE = k * AE"
    // Question asks for DE.
    
    return {
      questionText: `In triangle $ABC$, point $D$ lies on $\\overline{AB}$ and point $E$ lies on $\\overline{AC}$ such that $\\overline{DE}$ is parallel to $\\overline{BC}$. If $BC = ${BC}$ and $CE = ${k}AE$, what is the length of $\\overline{DE}$?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: DE.toString(),
      explanation: `Since $\\overline{DE} \\parallel \\overline{BC}$, $\\angle ADE \\cong \\angle ABC$ and $\\angle AED \\cong \\angle ACB$ (corresponding angles). Thus, $\\triangle ADE$ is similar to $\\triangle ABC$ by Angle-Angle similarity.

Because the triangles are similar, the ratio of their corresponding sides is equal:
$\\frac{DE}{BC} = \\frac{AE}{AC}$

We are given that $CE = ${k}AE$. We can express $AC$ in terms of $AE$:
$AC = AE + CE = AE + ${k}AE = ${1 + k}AE$

Now substitute this into the ratio:
$\\frac{AE}{AC} = \\frac{AE}{${1 + k}AE} = \\frac{1}{${1 + k}}$

Using the proportion $\\frac{DE}{BC} = \\frac{1}{${1 + k}}$ and the given value $BC = ${BC}$:
$\\frac{DE}{${BC}} = \\frac{1}{${1 + k}}$
$DE = \\frac{${BC}}{${1 + k}} = ${DE}$`
    };
  }
};