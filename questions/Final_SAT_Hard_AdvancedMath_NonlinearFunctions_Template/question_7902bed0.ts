import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 7902bed0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max height: 51.84, time to max: 1.8, total time: 3.6]
 * - Difficulty factors: [Projectile motion, vertex form of quadratic]
 * - Distractor patterns: [A: -t²+3.6, B: -t²+51.84, C: wrong vertex, D: correct]
 * - Constraints: [h = -16(t-1.8)² + 51.84]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7902bed0 = {
  metadata: {
    // id: "7902bed0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // h = a(t-h_vertex)² + k_vertex
    // Vertex at (h_time, max_h), ground at 2*h_time
    
    const h_time = (getRandomInt(15, 30) / 10);
    const max_h = getRandomInt(40, 80);
    const total_time = 2 * h_time;
    
    // a = -max_h / (h_time)² for it to hit ground at total_time
    const a = Math.round(-max_h / (h_time * h_time));
    
    const optionA = `-t^{2}+${total_time}`;
    const optionB = `-t^{2}+${max_h}`;
    const optionC = `${a}(t-${h_time})^{2}-${total_time}`;
    const optionD = `${a}(t-${h_time})^{2}+${max_h}`;
    
    const optionsData = [
      { text: `$h=${optionA}$`, isCorrect: false },
      { text: `$h=${optionB}$`, isCorrect: false },
      { text: `$h=${optionC}$`, isCorrect: false },
      { text: `$h=${optionD}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A machine launches a softball from ground level. The softball reaches a maximum height of $${max_h}$ meters above the ground at ${h_time} seconds and hits the ground at ${total_time} seconds. Which equation represents the height above ground $h$, in meters, of the softball $t$ seconds after it is launched?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$h=${optionD}$`,
      explanation: `Choice ${correctLetter} is correct. The vertex form is $h=a(t-${h_time})^2+${max_h}$. Using that $h=0$ at $t=0$: $0=a(${h_time})^2+${max_h}$, so $a=${a}$. Thus $h=${a}(t-${h_time})^2+${max_h}$.`
    };
  }
};

/**
 * Question ID: 4a0d0399
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: (2,0), y-intercept: (0, -323)]
 * - Difficulty factors: [Exponential from two points, solving for parameters]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */