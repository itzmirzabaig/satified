import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 976
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Egg: 6g protein, $0.36 | Milk: 8g protein, $0.24]
 * - Difficulty factors: [Cost per unit calculation, ratio of ratios]
 * - Distractor patterns: [A: 1:2, B: 2:3, C: 3:4 (various ratio miscalculations)]
 * - Constraints: [Must calculate cost per gram first]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_976 = {
  metadata: {
    id: "976",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: Egg 6g/$0.36, Milk 8g/$0.24, ratio 2:1
    // Strategy: ensure clean division for cost per gram

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    const eggProtein = getRandomInt(4, 10);
    const milkProtein = getRandomInt(6, 12);

    // Costs that divide evenly, so cost per gram is a whole number of cents.
    const eggCentsPerGram = getRandomInt(4, 10); // whole cents per gram of egg protein
    const milkCentsPerGram = getRandomInt(2, 6); // whole cents per gram of milk protein
    const eggCostCents = eggProtein * eggCentsPerGram;
    const milkCostCents = milkProtein * milkCentsPerGram;

    const eggCostPerGram = eggCostCents / eggProtein;   // = eggCentsPerGram (integer cents)
    const milkCostPerGram = milkCostCents / milkProtein; // = milkCentsPerGram (integer cents)

    // Reduce the integer ratio eggCostPerGram : milkCostPerGram by its GCD.
    const ratioGcd = gcd(eggCostPerGram, milkCostPerGram);
    const num = eggCostPerGram / ratioGcd;
    const den = milkCostPerGram / ratioGcd;

    // STEP 2: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; border: 1px solid currentColor;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Food</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Protein</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">1 large egg</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${eggProtein} grams</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${(eggCostCents / 100).toFixed(2)}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">1 cup of milk</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${milkProtein} grams</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${(milkCostCents / 100).toFixed(2)}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 3: Create options
    const correctRatio = `${num}:${den}`;

    // Build plausible wrong ratios from common mistakes, reduce each, and keep
    // only those that are well-formed and differ from the correct answer.
    const reduce = (a: number, b: number): string => {
      const g = gcd(a, b);
      return `${a / g}:${b / g}`;
    };
    const distractorPool: { text: string; reason: string }[] = [
      { text: reduce(milkCostPerGram, eggCostPerGram), reason: "reverses the order of the ratio, comparing milk to egg instead of egg to milk" },
      { text: reduce(eggCostCents, milkCostCents), reason: "uses the total costs instead of the cost per gram of protein" },
      { text: reduce(milkProtein, eggProtein), reason: "compares the grams of protein rather than the cost per gram" },
      { text: reduce(eggProtein, milkProtein), reason: "compares the grams of protein rather than the cost per gram" },
      { text: reduce(milkCostCents, eggCostCents), reason: "uses the total costs and reverses the order" },
    ];

    const seen = new Set<string>([correctRatio]);
    const distractorRatios: { text: string; reason: string }[] = [];
    for (const d of distractorPool) {
      if (distractorRatios.length >= 3) break;
      if (seen.has(d.text)) continue;
      seen.add(d.text);
      distractorRatios.push(d);
    }
    // Bounded fallback: manufacture distinct simple ratios if the pool collapsed.
    let filler = 2;
    while (distractorRatios.length < 3 && filler < 60) {
      const cand = `${filler}:1`;
      if (!seen.has(cand)) {
        seen.add(cand);
        distractorRatios.push({ text: cand, reason: "results from an incorrect calculation of the cost per gram or the ratio" });
      }
      filler++;
    }

    const optionsData = [
      { text: distractorRatios[0].text, isCorrect: false, reason: distractorRatios[0].reason },
      { text: distractorRatios[1].text, isCorrect: false, reason: distractorRatios[1].reason },
      { text: distractorRatios[2].text, isCorrect: false, reason: distractorRatios[2].reason },
      { text: correctRatio, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The table above shows the amount of protein in two foods and the cost of each food. Based on the table, what is the ratio of the cost per gram of protein in a large egg to the cost per gram of protein in a cup of milk?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctRatio,
      explanation: `Choice ${correctLetter} is correct. The cost per gram of protein in 1 large egg is \\$${(eggCostCents / 100).toFixed(2)} \\div ${eggProtein}$ grams $= ${eggCostPerGram}$ cents per gram. The cost per gram of protein in 1 cup of milk is \\$${(milkCostCents / 100).toFixed(2)} \\div ${milkProtein}$ grams $= ${milkCostPerGram}$ cents per gram. It follows that the ratio of the cost per gram of protein in a large egg to the cost per gram of protein in a cup of milk is $${eggCostPerGram}:${milkCostPerGram}$${ratioGcd > 1 ? `, which reduces to $${num}:${den}$ after dividing both parts by ${ratioGcd}` : `, which is already in lowest terms`}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
