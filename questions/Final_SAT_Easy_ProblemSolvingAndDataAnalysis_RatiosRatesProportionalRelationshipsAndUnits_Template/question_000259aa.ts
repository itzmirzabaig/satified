import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 000259aa
 * FIXED:
 * - Removed duplicate imports causing syntax errors.
 * - Guaranteed integer/half-integer math to prevent floating point mismatch (isCorrect check).
 * - Guaranteed 4 unique options to prevent array index out-of-bounds in explanation.
 * - Mapped reasons directly to option objects so the explanation always matches the specific distractor used.
 */

export const generator_000259aa = {
  metadata: {
    id: "000259aa",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Numbers
    // Ensure 'days' is even. If speed is X.5, Distance will still be an Integer.
    // Example: 120 days * 17.5 mph = 2100 miles.
    let days = getRandomInt(80, 150);
    if (days % 2 !== 0) days += 1; 

    const baseSpeed = getRandomInt(10, 25);
    // 50% chance of X.0, 50% chance of X.5
    const speedDecimal = getRandomInt(0, 1) === 1 ? 0.5 : 0;
    const milesPerDay = baseSpeed + speedDecimal; // The Correct Answer

    const totalDistance = Math.round(days * milesPerDay);
    
    // 2. Generate Distractors
    // Distractor A: Inverted calculation (Days per Mile) -> Small decimal
    const distractorInverted = (days / totalDistance).toFixed(3); 
    
    // Distractor B: Random "bad math" (e.g., speed + 10 or similar estimation error)
    const distractorHigh = (milesPerDay + getRandomInt(5, 12)).toString();
    
    // Distractor C: Unrelated number (e.g., subtraction error or random low int)
    let distractorLowVal = Math.floor(milesPerDay) - getRandomInt(3, 6);
    if (distractorLowVal < 1) distractorLowVal = 2; // Safety
    const distractorLow = distractorLowVal.toString();

    // 3. Build Options with Specific Reasons
    const optionsData = [
      {
        text: milesPerDay.toString(),
        isCorrect: true,
        reason: null
      },
      {
        text: distractorInverted,
        isCorrect: false,
        reason: "This value results from dividing the days by the miles, which represents days per mile rather than miles per day."
      },
      {
        text: distractorHigh,
        isCorrect: false,
        reason: "This value is significantly higher than the average speed and likely results from a calculation error."
      },
      {
        text: distractorLow,
        isCorrect: false,
        reason: "This value is incorrect and likely results from an estimation error unrelated to the ratio of distance to time."
      }
    ];

    // 4. Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // 5. Build Explanation Safely
    // We map over incorrectOptions to ensure we don't crash if array length varies (though it shouldn't now)
    const explanation = `To find the average number of miles the butterfly traveled per day, divide the total distance by the total number of days.\n\n` +
      `**Given:**\n` +
      `* Total distance = ${totalDistance} miles\n` +
      `* Total time = ${days} days\n\n` +
      `**Calculation:**\n` +
      `$$\\text{Average speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}}$$\n` +
      `$$\\text{Average speed} = \\frac{${totalDistance}}{${days}}$$\n` +
      `$$\\text{Average speed} = ${milesPerDay}$$\n\n` +
      `Choice ${correctOption.letter} is correct. The butterfly traveled an average of ${milesPerDay} miles per day.\n\n` +
      `Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason.toLowerCase()} ` +
      `Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason.toLowerCase()} ` +
      `Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason.toLowerCase()}`;

    return {
      questionText: `A group of monarch butterflies migrated from Chicago, Illinois, to Michoacán, Mexico, flying a total of ${totalDistance} miles. It took a single butterfly in the group ${days} days to travel this route one way. On average, how many miles did the butterfly travel per day?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};