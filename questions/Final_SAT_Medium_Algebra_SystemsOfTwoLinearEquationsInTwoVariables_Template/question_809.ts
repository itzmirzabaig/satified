import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 809
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [people: 202 (triple-digit), tents: 60 (double-digit), capacities: 2 and 4]
 * - Difficulty factors: [Word problem, system with two variables, substitution]
 * - Distractor patterns: [30, 20, 19, 18 - around the solution]
 * - Constraints: [Integer solution, valid tent counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * INTENT: totalPeople campers take totalTents tents; some hold 2, some hold 4,
 * all full. Solve x + y = totalTents, 2x + 4y = totalPeople for x (# of 2-person
 * tents). Answer-first: pick numTwoPerson, then totalPeople is derived exact.
 *
 * numTwoPerson is capped at floor((totalTents-2)/2) so numFourPerson >= numTwoPerson+2.
 * That guarantees the four options {c-1, c, c+1, numFourPerson} are pairwise
 * distinct for every draw (numFourPerson > c+1). Distractors: off-by-one slips
 * and "solved for the wrong variable" (number of 4-person tents).
 */

export const generator_809 = {
  metadata: {
    id: "809",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction for clean integers.
    const totalTents = getRandomInt(40, 80);
    // Cap numTwoPerson so numFourPerson >= numTwoPerson + 2 (keeps all 4 options distinct).
    const numTwoPerson = getRandomInt(5, Math.floor((totalTents - 2) / 2));
    const numFourPerson = totalTents - numTwoPerson;
    const totalPeople = 2 * numTwoPerson + 4 * numFourPerson; // always even, exact

    // STEP 2: Build question text (plain integers in prose; capacities in math).
    const questionText = `A group of ${totalPeople} people went on an overnight camping trip, taking ${totalTents} tents with them. Some of the tents held \\( 2 \\) people each, and the rest held \\( 4 \\) people each. Assuming all the tents were filled to capacity and every person got to sleep in a tent, exactly how many of the tents were \\( 2 \\)-person tents?`;

    // STEP 3: Distractors — off-by-one and the wrong variable (# of 4-person tents).
    const cLow = numTwoPerson - 1;   // arithmetic slip (one too few)
    const cHigh = numTwoPerson + 1;  // arithmetic slip (one too many)

    // For any count w of 2-person tents, people = 2w + 4(totalTents - w).
    const peopleIf = (w: number) => 2 * w + 4 * (totalTents - w);

    const reasons: Record<string, string> = {
      [String(cLow)]: `comes from an off-by-one error. With ${cLow} two-person tents there would be ${totalTents - cLow} four-person tents, giving \\( ${cLow}(2) + ${totalTents - cLow}(4) = ${peopleIf(cLow)} \\) people, not ${totalPeople}.`,
      [String(cHigh)]: `comes from an off-by-one error. With ${cHigh} two-person tents there would be ${totalTents - cHigh} four-person tents, giving \\( ${cHigh}(2) + ${totalTents - cHigh}(4) = ${peopleIf(cHigh)} \\) people, not ${totalPeople}.`,
      [String(numFourPerson)]: `is the number of four-person tents (solving for the wrong variable). Those ${numFourPerson} tents plus the ${numTwoPerson} two-person tents give the ${totalTents} total, but the question asks for the two-person tents.`,
    };

    const correctText = numTwoPerson.toString();
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: String(cLow), isCorrect: false },
      { text: String(cHigh), isCorrect: false },
      { text: String(numFourPerson), isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const wrongExplanations = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect; it ${reasons[o.text]}`)
      .join(' ');

    // STEP 5: Explanation from the same live variables, \( ... \) inline math.
    const explanation = `Choice ${correctLetter} is correct. Let \\( x \\) be the number of \\( 2 \\)-person tents and \\( y \\) be the number of \\( 4 \\)-person tents. The number of tents gives \\( x + y = ${totalTents} \\), and the number of people gives \\( 2x + 4y = ${totalPeople} \\). From the first equation, \\( y = ${totalTents} - x \\). Substituting into the second equation gives \\( 2x + 4(${totalTents} - x) = ${totalPeople} \\), or \\( 2x + ${4 * totalTents} - 4x = ${totalPeople} \\), which simplifies to \\( -2x + ${4 * totalTents} = ${totalPeople} \\). Then \\( -2x = ${totalPeople - 4 * totalTents} \\), so \\( x = ${numTwoPerson} \\). There are ${numTwoPerson} two-person tents (and \\( y = ${totalTents} - ${numTwoPerson} = ${numFourPerson} \\) four-person tents). Check: \\( ${numTwoPerson}(2) + ${numFourPerson}(4) = ${2 * numTwoPerson} + ${4 * numFourPerson} = ${totalPeople} \\) people. ${wrongExplanations}`;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
