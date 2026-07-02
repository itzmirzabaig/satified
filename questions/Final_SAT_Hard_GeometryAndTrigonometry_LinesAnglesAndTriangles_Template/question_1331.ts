import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1331
 * 
 * FIXES:
 * - Changed options to return `string[]` instead of `object[]`.
 * - Fixed explanation logic to dynamically find the letter associated with each distractor text.
 * - Ensured LaTeX formatting is consistent.
 */

export const generator_1331 = {
  metadata: {
    id: "1331",
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
