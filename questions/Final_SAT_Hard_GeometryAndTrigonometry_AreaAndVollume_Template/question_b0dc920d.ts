import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b0dc920d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height = radius + 4]
 * - Difficulty factors: [Algebraic manipulation of cylinder volume formula]
 * - Distractor patterns: [A: 4πr³ (wrong relationship), B: π(2r)³ (confusing diameter), C: πr²+4πr (addition error), D: πr³+4πr² (correct)]
 * - Constraints: [Height = radius + 4]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_b0dc920d = {
  metadata: {
    // id: "b0dc920d",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the offset (original used 4)
    const offset = getRandomInt(2, 8);
    
    // STEP 2: Build expressions
    // Correct: V = πr²(r + offset) = πr³ + offset·πr²
    const correctExpr = `V=\\pi r^3+${offset}\\pi r^2`;
    
    // Distractor A: V = offset·πr³ (wrong: height = offset·r instead of r + offset)
    const distractorA = `V=${offset}\\pi r^3`;
    
    // Distractor B: V = π(2r)³ = 8πr³ (confusing diameter)
    const distractorB = `V=\\pi (2r)^3`;
    
    // Distractor C: V = πr² + offset·πr (adding instead of multiplying)
    const distractorC = `V=\\pi r^2+${offset}\\pi r`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctExpr, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A manufacturer determined that right cylindrical containers with a height that is $${offset}$ inches longer than the radius offer the optimal number of containers to be displayed on a shelf. Which of the following expresses the volume, $V$, in cubic inches, of such containers, where $r$ is the radius, in inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpr,
      explanation: `Choice ${correctOption.letter} is correct. The height is $r + ${offset}$. The volume is $V = \\pi r^2 h = \\pi r^2(r + ${offset}) = \\pi r^3 + ${offset}\\pi r^2$. Choice ${incorrectOptions[0].letter} is incorrect because it treats the height as ${offset}r instead of r + ${offset}. Choice ${incorrectOptions[1].letter} is incorrect because it confuses diameter with radius. Choice ${incorrectOptions[2].letter} is incorrect because it adds the terms instead of multiplying.`
    };
  }
};

/**
 * Question ID: 6708546e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2, area ABCD: 5]
 * - Difficulty factors: [Similar parallelograms, area scales as square of linear ratio]
 * - Distractor patterns: [A: 7 (adding), B: 10 (linear scaling), C: 20 (correct), D: 25 (squaring area)]
 * - Constraints: [Clean integer answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */