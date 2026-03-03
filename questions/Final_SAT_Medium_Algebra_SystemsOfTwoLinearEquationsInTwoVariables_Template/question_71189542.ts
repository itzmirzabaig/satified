import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 71189542
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [people: 202 (triple-digit), tents: 60 (double-digit), capacities: 2 and 4]
 * - Difficulty factors: [Word problem, system with two variables, substitution]
 * - Distractor patterns: [30, 20, 19, 18 - around the solution]
 * - Constraints: [Integer solution, valid tent counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_71189542 = {
  metadata: {
    // id: "71189542",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - work backwards for clean integers
    const totalTents = getRandomInt(40, 80);
    const numTwoPerson = getRandomInt(5, Math.floor(totalTents / 2));
    const numFourPerson = totalTents - numTwoPerson;
    const totalPeople = 2 * numTwoPerson + 4 * numFourPerson;
    
    // STEP 2: Build question text
    const questionText = `A group of $${totalPeople}$ people went on an overnight camping trip, taking $${totalTents}$ tents with them. Some of the tents held $2$ people each, and the rest held $4$ people each. Assuming all the tents were filled to capacity and every person got to sleep in a tent, exactly how many of the tents were $2$-person tents?`;
    
    // STEP 3: Generate distractors
    const distractor1 = Math.floor(totalTents / 2); // Half
    const distractor2 = numTwoPerson + 1; // Close
    const distractor3 = numTwoPerson - 1; // Close
    
    const correctText = numTwoPerson.toString();
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Let $x$ be the number of $2$-person tents and $y$ be the number of $4$-person tents. We are given two pieces of information: 1. The total number of tents is $${totalTents}$. So, $x + y = ${totalTents}$. 2. The total number of people is $${totalPeople}$. Since $x$ tents hold $2$ people and $y$ tents hold $4$ people, the equation for the total people is $2x + 4y = ${totalPeople}$. Now we have a system of two linear equations: $x + y = ${totalTents}$ $2x + 4y = ${totalPeople}$. From the first equation, we can express $y$ in terms of $x$: $y = ${totalTents} - x$. Substitute this expression for $y$ into the second equation: $2x + 4(${totalTents} - x) = ${totalPeople}$ $2x + ${4 * totalTents} - 4x = ${totalPeople}$ $-2x + ${4 * totalTents} = ${totalPeople}$ $-2x = ${totalPeople - 4 * totalTents}$ $x = ${numTwoPerson}$. So, there are $${numTwoPerson}$ two-person tents. Let's verify by finding $y$: $y = ${totalTents} - ${numTwoPerson} = ${numFourPerson}$ four-person tents. Check the total number of people: $${numTwoPerson}(2) + ${numFourPerson}(4) = ${2 * numTwoPerson} + ${4 * numFourPerson} = ${totalPeople}$. This matches the problem statement. Why other options are incorrect: A. If there were $${distractor1}$ two-person tents, then there would be $${totalTents - distractor1}$ four-person tents. Total people: $${distractor1}(2) + ${totalTents - distractor1}(4) = ${2 * distractor1 + 4 * (totalTents - distractor1)} \\neq ${totalPeople}$. B. If there were $${distractor2}$ two-person tents, then there would be $${totalTents - distractor2}$ four-person tents. Total people: $${distractor2}(2) + ${totalTents - distractor2}(4) = ${2 * distractor2 + 4 * (totalTents - distractor2)} \\neq ${totalPeople}$. D. If there were $${distractor3}$ two-person tents, then there would be $${totalTents - distractor3}$ four-person tents. Total people: $${distractor3}(2) + ${totalTents - distractor3}(4) = ${2 * distractor3 + 4 * (totalTents - distractor3)} \\neq ${totalPeople}$.`
    };
  }
};

/**
 * Question ID: 0c541d87
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 12.45, 19.42 (decimal currency), quantities: 1-4]
 * - Difficulty factors: [Word problem with decimals, system setup]
 * - Distractor patterns: [3.77, 3.88, 4.15, 4.34 - close price values]
 * - Constraints: [Decimal arithmetic, realistic prices]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */