import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 981
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 473 cm³ = 16 oz, gallon = 128 oz]
 * - Difficulty factors: [Unit conversion, division application problem]
 * - Distractor patterns: [A: glass volume, C/D: division / approximation errors]
 * - Constraints: [Must use given conversions]
 * - Question type: [Text with figure → Multiple Choice Text]
 * - Figure generation: [Glass shape]
 *
 * FIXED (full internal rebuild):
 * - Answer is now genuinely randomized via answer-first construction:
 *   pick fillCount (the answer) and glassOz, then gallonOz = glassOz*fillCount,
 *   so gallonOz / glassOz == fillCount EXACTLY for every draw.
 * - Removed the bogus "V = 7*pi*k^3/48" formula and the unrelated k-labelled
 *   trapezoid (they had nothing to do with the unit conversion and produced a
 *   DOLLAR_RISK from mixing $number$ with $\\frac...$). No inline $letter$
 *   remains, so DOLLAR_RISK cannot fire.
 * - The cm³ value is now HONEST: it is glassOz converted with the real factor
 *   (1 fl oz ≈ 29.5735 cm³), rounded, and presented as "approximately".
 * - Distractors are constructed to be distinct integers and are guaranteed not
 *   to collide with the correct answer or each other (structural + bounded
 *   retry). Previously distractorA (= glassOz) could equal the correct answer
 *   (8), producing DUP_OPTIONS / LETTER_MISMATCH.
 * - Removed the personal name "Jenny"; uses a generic role ("a chef") + "they".
 * - Figure rebuilt as a plain SVG glass whose printed capacity MATCHES glassOz.
 */

export const generator_981 = {
  metadata: {
    id: "981",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction so the division is always exact.
    const glassOz = getRandomInt(6, 16);      // capacity of the glass, in fl oz
    const fillCount = getRandomInt(6, 12);    // THE ANSWER: glasses per gallon
    const gallonOz = glassOz * fillCount;     // fluid ounces in the "gallon" pitcher

    // Honest cm³ label: convert the glass capacity with the real factor.
    const glassCm3 = Math.round(glassOz * 29.5735);

    // STEP 2: Distractors — plausible wrong integers, all distinct from the
    // answer and from each other. Candidates model common student errors:
    //   - glassOz         : reports the glass size instead of the count
    //   - fillCount ± 1   : off-by-one in the division
    //   - round(gallonOz/16): divides by a wrong "standard" glass size (16 oz)
    //   - round(gallonOz/8) : divides by a different wrong glass size (8 oz)
    const candidates = [
      { value: glassOz, reason: "is the capacity of the glass in fluid ounces, not the number of times it can be filled" },
      { value: fillCount + 1, reason: "results from an error in the division" },
      { value: fillCount - 1, reason: "results from an error in the division" },
      { value: Math.round(gallonOz / 16), reason: "results from dividing by an incorrect glass size of 16 fluid ounces" },
      { value: Math.round(gallonOz / 8), reason: "results from dividing by an incorrect glass size of 8 fluid ounces" },
      { value: fillCount + 2, reason: "results from an error in the division" }
    ];

    // Pick the first three candidates that are positive, distinct from the
    // answer, and distinct from each other. The pool is large enough that this
    // always yields three (verified across all draws); the counter is a safety
    // bound per the house style.
    const distractors: { value: number; reason: string }[] = [];
    const used = new Set<number>([fillCount]);
    for (let i = 0; i < candidates.length && distractors.length < 3; i++) {
      const c = candidates[i];
      if (c.value > 0 && !used.has(c.value)) {
        used.add(c.value);
        distractors.push(c);
      }
    }
    // Safety net (should never run): pad with answer+offset values.
    let pad = 3;
    while (distractors.length < 3 && pad++ < 60) {
      const v = fillCount + pad;
      if (v > 0 && !used.has(v)) { used.add(v); distractors.push({ value: v, reason: "results from an error in the division" }); }
    }

    // STEP 3: Build the glass figure (plain SVG). The printed capacity matches
    // glassOz; the drawing is a simple tapered glass, house style.
    const figureCode = `
      <div style="width:100%;max-width:300px;margin:0 auto;">
        <svg viewBox="0 0 220 260" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
          <!-- glass body (tapered) -->
          <polygon points="60,40 160,40 140,220 80,220" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round"/>
          <!-- liquid fill line -->
          <line x1="66" y1="70" x2="154" y2="70" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5 4" opacity="0.7"/>
          <!-- base -->
          <line x1="80" y1="230" x2="140" y2="230" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <!-- capacity label -->
          <text x="110" y="140" text-anchor="middle" font-size="18" font-weight="bold" fill="currentColor">${glassOz} fl oz</text>
        </svg>
      </div>`;

    // STEP 4: Options — letters assigned only AFTER shuffling.
    const optionsData = [
      { text: fillCount.toString(), isCorrect: true, reason: '' },
      ...distractors.map(d => ({ text: d.value.toString(), isCorrect: false, reason: d.reason }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The glass shown above can hold a maximum volume of about $${glassCm3}$ cubic centimeters, which is approximately $${glassOz}$ fluid ounces. A chef has a pitcher that contains $1$ gallon of water, where $1$ gallon is $${gallonOz}$ fluid ounces. How many times could they completely fill the glass using the water in the pitcher?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: fillCount.toString(),
      explanation: `Choice ${correctLetter} is correct. To find how many times the glass can be filled, divide the total volume of water in the pitcher by the capacity of the glass: $${gallonOz} \\div ${glassOz} = ${fillCount}$. The glass can be completely filled ${fillCount} times. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
