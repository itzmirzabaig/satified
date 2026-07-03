import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 479
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2.5 oz/muffin, 48 muffins, conversion: 16 oz/pound, answer: 7.5 pounds]
* - Difficulty factors: [Multi-step conversion, division by 16, decimal handling]
* - Distractor patterns: [A: 7.5 (correct), B: 10 (estimation), C: 50.5 (added), D: 120 (ounces, not converted)]
* - Constraints: [Total ounces must be divisible by 16 for clean decimal pounds]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_479 = {
  metadata: {
    id: "479",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first construction: pick a whole number of pounds and an
    // ounces-per-muffin rate, then derive a whole muffin count so that
    // ozPerMuffin * numMuffins is exactly correctPounds * 16 (a multiple of
    // 16). This guarantees integer pounds with no float artifacts.
    const ozPerMuffinOptions = [2.0, 2.5, 3.0, 4.0];
    let ozPerMuffin = 2.0;
    let correctPounds = 5;
    let numMuffins = 40;
    let tries = 0;
    do {
      correctPounds = getRandomInt(3, 12);
      ozPerMuffin = ozPerMuffinOptions[getRandomInt(0, ozPerMuffinOptions.length - 1)];
      numMuffins = (correctPounds * 16) / ozPerMuffin;
    } while ((!Number.isInteger(numMuffins) || numMuffins < 12) && tries++ < 50);
    // Fallback that always satisfies the constraint (oz = 2 divides evenly).
    if (!Number.isInteger(numMuffins) || numMuffins < 12) {
      ozPerMuffin = 2.0;
      correctPounds = getRandomInt(3, 12);
      numMuffins = (correctPounds * 16) / ozPerMuffin;
    }

    const totalOz = correctPounds * 16; // = ozPerMuffin * numMuffins, integer

    // Distractors constructed to be provably distinct from the answer and,
    // via a bounded uniqueness guard, from each other.
    const dOunces = totalOz;              // forgot to convert oz -> pounds
    const dHalfConversion = correctPounds * 2; // divided by 8 instead of 16
    let dAdd = ozPerMuffin + numMuffins;  // just added the two given numbers
    const used = new Set<number>([correctPounds, dOunces, dHalfConversion]);
    let guard = 0;
    while (used.has(dAdd) && guard++ < 50) dAdd += 1;

    const optionsData = [
      { text: correctPounds.toString(), isCorrect: true, reason: null },
      { text: dHalfConversion.toString(), isCorrect: false, reason: "this results from dividing the total ounces by $8$ instead of by $16$." },
      { text: dAdd.toString(), isCorrect: false, reason: "this is the result of simply adding the two numbers in the problem." },
      { text: dOunces.toString(), isCorrect: false, reason: "this is the total amount in ounces, not pounds." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The correct answer is Choice ${correctLetter}. First, find the total ounces of chocolate needed: $${ozPerMuffin} \\times ${numMuffins} = ${totalOz}$ ounces. Then convert ounces to pounds by dividing by $16$: $${totalOz} \\div 16 = ${correctPounds}$ pounds. So $${correctPounds}$ pounds of chocolate are needed. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}`;

    return {
      questionText: `To make a bakery's signature chocolate muffins, a baker needs $${ozPerMuffin}$ ounces of chocolate for each muffin. How many pounds of chocolate are needed to make $${numMuffins}$ signature chocolate muffins? ($1$ pound $= 16$ ounces)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctPounds.toString(),
      explanation: explanation
    };
  }
};
