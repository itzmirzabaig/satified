import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 478
 * FIXED:
 * - Removed duplicate imports causing syntax errors.
 * - Guaranteed integer/half-integer math to prevent floating point mismatch (isCorrect check).
 * - Guaranteed 4 unique options to prevent array index out-of-bounds in explanation.
 * - Mapped reasons directly to option objects so the explanation always matches the specific distractor used.
 */

export const generator_478 = {
  metadata: {
    id: "478",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The route from Chicago to Michoacán is about 2,000 miles, so the total
    // stays between 1,800 and 2,300 miles (it could reach about 3,700). The
    // number of days is even, so a speed ending in .5 still gives a whole
    // number of miles.
    let days = 0, milesPerDay = 0, totalDistance = 0;
    do {
      days = 2 * getRandomInt(40, 75);
      milesPerDay = getRandomInt(12, 25) + (getRandomInt(0, 1) === 1 ? 0.5 : 0);
      totalDistance = days * milesPerDay;
    } while (totalDistance < 1800 || totalDistance > 2300);

    const fmt = (n: number) => n.toLocaleString('en-US');
    // Wrong choices are real slips: days divided by miles, the days
    // subtracted from the miles, and the miles divided by twice the days (as
    // if the days were for a round trip). Two used to be the answer plus or
    // minus a random amount, "from a calculation error."
    const inverted = String(+(days / totalDistance).toFixed(3));
    const subtracted = totalDistance - days;
    const roundTrip = milesPerDay / 2;

    const optionsData = [
      { text: `${milesPerDay}`, isCorrect: true, reason: '' },
      { text: inverted, isCorrect: false, reason: `${inverted} is about the number of days per mile, $\\frac{${days}}{${fmt(totalDistance).replace(/,/g, '{,}')}}$, not the number of miles per day` },
      { text: fmt(subtracted), isCorrect: false, reason: `${fmt(subtracted)} results from subtracting the number of days from the number of miles instead of dividing` },
      { text: `${roundTrip}`, isCorrect: false, reason: `${roundTrip} results from dividing the ${fmt(totalDistance)} miles by twice the number of days, as if the ${days} days were for a round trip; the ${days} days were for the trip one way` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The average number of miles traveled per day is the total distance divided by the number of days: $\\frac{${fmt(totalDistance).replace(/,/g, '{,}')}}{${days}} = ${milesPerDay}$. So the butterfly traveled an average of ${milesPerDay} miles per day. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A group of monarch butterflies migrated from Chicago, Illinois, to Michoacán, Mexico, flying a total of ${fmt(totalDistance)} miles. It took a single butterfly in the group ${days} days to travel this route one way. On average, how many miles did the butterfly travel per day?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
