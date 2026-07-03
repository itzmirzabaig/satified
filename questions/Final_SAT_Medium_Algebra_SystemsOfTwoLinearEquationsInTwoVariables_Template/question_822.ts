import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 822
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [questions: 40, score: 50 (double-digit)]
 * - Difficulty factors: [Word problem, system setup, elimination]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer solution]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_822 = {
  metadata: {
    id: "822",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const totalQuestions = getRandomInt(30, 50);
    const correctPoints = getRandomInt(2, 4);
    
    // Work backwards: let correct = c, wrong = total - c
    // Score = correctPoints*c - (total - c) = correctPoints*c - total + c = (correctPoints+1)*c - total
    const correct = getRandomInt(Math.floor(totalQuestions / 3), Math.floor(2 * totalQuestions / 3));
    const score = (correctPoints + 1) * correct - totalQuestions;
    
    // STEP 2: Build question text
    const questionText = `The score on a trivia game is obtained by subtracting the number of incorrect answers from ${correctPoints} times the number of correct answers. If a player answered ${totalQuestions} questions and obtained a score of ${score}, how many questions did the player answer correctly?`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correct.toString(),
      explanation: `The correct answer is ${correct}. Let x represent the number of correct answers from the player and y represent the number of incorrect answers from the player. Since the player answered ${totalQuestions} questions in total, the equation x + y = ${totalQuestions} represents this situation. Also, since the score is found by subtracting the number of incorrect answers from ${correctPoints} times the number of correct answers and the player received a score of ${score}, the equation ${correctPoints}x - y = ${score} represents this situation. Adding the equations in the system of two equations together yields (x + y) + (${correctPoints}x - y) = ${totalQuestions} + ${score}. This can be rewritten as ${correctPoints + 1}x = ${totalQuestions + score}. Finally, solving for x by dividing both sides of the equation by ${correctPoints + 1} yields x = ${correct}.`
    };
  }
};
