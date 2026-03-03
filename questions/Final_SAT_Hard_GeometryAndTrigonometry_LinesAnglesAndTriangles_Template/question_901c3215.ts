import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 901c3215
 * 
 * FIXES:
 * - Changed options to return `string[]` instead of `object[]`.
 * - Fixed explanation logic to dynamically find the letter associated with each distractor text.
 * - Ensured LaTeX formatting is consistent.
 */

export const generator_901c3215 = {
  metadata: {
    id: "901c3215",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angle measures
    const angleB = getRandomInt(20, 40);
    const angleC = getRandomInt(35, 50);
    // angleA is derived for internal logic but not explicitly needed for the question setup
    
    // STEP 2: Create options with unique identifiers/reasoning
    // We store them as objects first to track "isCorrect" and "reason"
    const optionsRaw = [
      { 
        id: 'angleA',
        text: `The measure of angle $A$`, 
        isCorrect: false,
        reason: "knowing the measure of angle $A$ only confirms the third angles are equal (AAA), which guarantees similarity but not congruence"
      },
      { 
        id: 'sideAB',
        text: `The length of side $AB$`, 
        isCorrect: false,
        reason: "knowing the length of side $AB$ provides a side that is not included between the given angles, and without the corresponding side $DE$, we cannot use AAS or ASA"
      },
      { 
        id: 'sidesBC_EF',
        text: `The lengths of sides $BC$ and $EF$`, 
        isCorrect: true,
        reason: "provides the lengths of the included sides between the two pairs of congruent angles. If $BC = EF$, the triangles are congruent by the ASA Congruence Postulate"
      },
      { 
        id: 'none',
        text: `No additional information is necessary`, 
        isCorrect: false,
        reason: "two pairs of congruent angles alone are sufficient to prove similarity, but not congruence (size is unknown)"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsRaw).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    // Helper to find letter by ID for the explanation
    const getLetter = (id: string) => shuffledOptions.find(o => o.id === id)?.letter || '?';
    
    return {
      questionText: `In triangles $ABC$ and $DEF$, angles $B$ and $E$ each have measure $${angleB}^\\circ$ and angles $C$ and $F$ each have measure $${angleC}^\\circ$. Which additional piece of information is sufficient to determine whether triangle $ABC$ is congruent to triangle $DEF$?`,
      figureCode: null,
      // FIX: Map strictly to strings for the frontend
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. It is given that $\\angle B \\cong \\angle E$ and $\\angle C \\cong \\angle F$. To prove congruence using the ASA (Angle-Side-Angle) Postulate, we need the length of the included side—the side between the two known angles—for both triangles. Thus, knowing the lengths of $BC$ and $EF$ is sufficient.

Choice ${getLetter('angleA')} is incorrect because ${optionsRaw.find(o => o.id === 'angleA')!.reason}.
Choice ${getLetter('sideAB')} is incorrect because ${optionsRaw.find(o => o.id === 'sideAB')!.reason}.
Choice ${getLetter('none')} is incorrect because ${optionsRaw.find(o => o.id === 'none')!.reason}.`
    };
  }
};

/**
 * Question ID: f7dbde16
 * 
 * ANALYSIS:
 * - Context: Similarity of two triangles (LMN and RST).
 * - Given: One pair of congruent angles (L and R) and lengths of adjacent sides (LN and RT).
 * - Goal: Identify sufficient info for similarity.
 * - Logic: 
 *   - AA Similarity: Need one more pair of angles.
 *   - SAS Similarity: Need the other adjacent side (LM and RS) to be in the same ratio.
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
    // 1. Setup Triangles LMN and RST
    // Angle L corresponds to Angle R
    const angleL = getRandomInt(50, 70);
    const angleR = angleL;

    // Side LN corresponds to Side RT
    const LN = getRandomInt(8, 12); // e.g., 10
    const scaleFactor = getRandomInt(2, 4); // e.g., 3
    const RT = LN * scaleFactor; // e.g., 30

    // 2. Generate Options
    // Correct: Angle N = Angle T (AA Similarity)
    // Distractor 1 (Sides): Non-proportional sides. LM and RS with wrong ratio.
    // Distractor 2 (Sides): Proportional sides but NOT the included angle sides (MN and ST).
    // Distractor 3 (Angle): Wrong angle comparison.
    
    // Correct Option values
    const angleN = getRandomInt(40, 60);
    const angleT = angleN;

    // Distractor 1 values (Wrong SAS Ratio)
    const LM = getRandomInt(5, 7);
    const correctRS = LM * scaleFactor;
    const wrongRS = correctRS + getRandomInt(2, 5); // Ensures ratio is incorrect

    // Distractor 2 values (SSA - side opposite the angle, not sufficient)
    const MN = getRandomInt(6, 9);
    const ST = MN * scaleFactor;

    const optionsRaw = [
      {
        id: 'correctAA',
        text: `The measure of angle $N$ is $${angleN}^\\circ$ and the measure of angle $T$ is $${angleT}^\\circ$`,
        isCorrect: true,
        explanation: "it establishes a second pair of congruent angles (Angle N $\\cong$ Angle T), satisfying the AA (Angle-Angle) Similarity Theorem"
      },
      {
        id: 'wrongSAS',
        text: `The length of side $LM$ is ${LM} and the length of side $RS$ is ${wrongRS}`,
        isCorrect: false,
        explanation: `the ratio $\\frac{RS}{LM} = \\frac{${wrongRS}}{${LM}}$ is not equal to the ratio $\\frac{RT}{LN} = \\frac{${RT}}{${LN}} = ${scaleFactor}$, so SAS Similarity does not apply`
      },
      {
        id: 'SSA',
        text: `The length of side $MN$ is ${MN} and the length of side $ST$ is ${ST}`,
        isCorrect: false,
        explanation: "knowing the lengths of sides opposite the known angles (SSA) is not sufficient to prove similarity"
      },
      {
        id: 'wrongAngle',
        text: `The measure of angle $M$ is ${angleN}^\\circ$ and the measure of angle $T$ is ${angleN + 10}^\\circ$`,
        isCorrect: false,
        explanation: "the angles are not congruent, so it does not establish AA similarity"
      }
    ];

    const shuffledOptions = shuffle(optionsRaw).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const getLetter = (id: string) => shuffledOptions.find(o => o.id === id)?.letter || '?';

    return {
      questionText: `In triangles $LMN$ and $RST$, angle $L$ and angle $R$ each have measure $${angleL}^\\circ$, $LN = ${LN}$, and $RT = ${RT}$. Which additional piece of information is sufficient to prove that triangle $LMN$ is similar to triangle $RST$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To prove that two triangles are similar, we can use the AA (Angle-Angle) Similarity Theorem, which states that if two angles of one triangle are congruent to two angles of another triangle, the triangles are similar.
      
We are given that $\\angle L \\cong \\angle R$.
Choice ${correctOption.letter} states that $\\angle N = ${angleN}^\\circ$ and $\\angle T = ${angleT}^\\circ$, meaning $\\angle N \\cong \\angle T$. 
With two pairs of congruent angles ($\\angle L \\cong \\angle R$ and $\\angle N \\cong \\angle T$), triangle $LMN$ is similar to triangle $RST$.

Choice ${getLetter('wrongSAS')} is incorrect because ${optionsRaw.find(o => o.id === 'wrongSAS')!.explanation}.
Choice ${getLetter('SSA')} is incorrect because ${optionsRaw.find(o => o.id === 'SSA')!.explanation}.
Choice ${getLetter('wrongAngle')} is incorrect because ${optionsRaw.find(o => o.id === 'wrongAngle')!.explanation}.`
    };
  }
};