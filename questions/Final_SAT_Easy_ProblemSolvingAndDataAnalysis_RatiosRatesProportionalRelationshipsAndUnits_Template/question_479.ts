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

    // Wrong choices are real slips: the total in ounces, the muffins divided
    // by 16 (forgetting the ounces per muffin), and the ounces multiplied by
    // 16 instead of divided. They used to include "divided by 8" and the
    // sum of the two given numbers, which was sometimes nudged by 1 so its
    // reason was false. ozPerMuffin is at least 2, so all four differ.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const dOunces = totalOz;
    const dNoRate = numMuffins / 16;
    const dTimes = totalOz * 16;

    const optionsData = [
      { text: correctPounds.toString(), isCorrect: true, reason: '' },
      { text: fmt(dOunces), isCorrect: false, reason: `${fmt(dOunces)} is the amount of chocolate needed in ounces, not pounds` },
      { text: `${dNoRate}`, isCorrect: false, reason: `${dNoRate} results from dividing the number of muffins, ${numMuffins}, by 16 without first multiplying by the ${ozPerMuffin} ounces needed for each muffin` },
      { text: fmt(dTimes), isCorrect: false, reason: `${fmt(dTimes)} results from multiplying the ${totalOz} ounces by 16 instead of dividing by 16` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. First, find the total ounces of chocolate needed: $${ozPerMuffin} \\times ${numMuffins} = ${totalOz}$ ounces. Then convert ounces to pounds by dividing by $16$: $${totalOz} \\div 16 = ${correctPounds}$ pounds. So ${correctPounds} pounds of chocolate are needed. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `To make a bakery's signature chocolate muffins, a baker needs $${ozPerMuffin}$ ounces of chocolate for each muffin. How many pounds of chocolate are needed to make $${numMuffins}$ signature chocolate muffins? ($1$ pound $= 16$ ounces)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctPounds.toString(),
      explanation: explanation
    };
  }
};
