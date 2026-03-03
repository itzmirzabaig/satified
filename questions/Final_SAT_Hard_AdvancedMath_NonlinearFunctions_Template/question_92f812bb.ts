import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 92f812bb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex (9, -14), need a+b+c for parabola intersecting x-axis twice]
 * - Difficulty factors: [Vertex form, constraint on a for two x-intercepts, evaluating a+b+c]
 * - Distractor patterns: [A: -23, B: -19, C: -14, D: -12]
 * - Constraints: [Must have a > 0 and vertex below x-axis for two intercepts]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_92f812bb = {
  metadata: {
    // id: "92f812bb",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(5, 15);
    const k = -getRandomInt(10, 20);
    
    // a + b + c = a(1 - 2h + h²) + k = a(h-1)² + k
    // For answer with h=9, k=-14: a(8)² - 14 = -12, so 64a = 2, a = 1/32
    
    const targetA = 1 / 32;
    const answer = Math.round((h - 1) * (h - 1) * targetA + k);
    
    const optionsData = [
      { text: `$${k - 9}$`, isCorrect: false },
      { text: `$${k - 5}$`, isCorrect: false },
      { text: `$${k}$`, isCorrect: false },
      { text: `$${answer}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `In the $xy$-plane, a parabola has vertex $(${h}, ${k})$ and intersects the $x$-axis at two points. If the equation is written as $y=ax^2+bx+c$, which could be the value of $a+b+c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${answer}$`,
      explanation: `Choice ${correctLetter} is correct. In vertex form: $y=a(x-${h})^2+${k}=ax^2-${2*h}ax+${h*h}a+${k}$. So $a+b+c=a-${2*h}a+${h*h}a+${k}=a(${h*h-2*h+1})+${k}=a(${Math.pow(h-1,2)})+${k}$. With $a>0$ small enough, this can equal ${answer}$.`
    };
  }
};

/**
 * Question ID: 12345
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -2, -1, 0, 1, 2 with p(x): 5, 0, -3, -1, 0]
 * - Difficulty factors: [Factor theorem, table analysis]
 * - Distractor patterns: [A: (x-3), B: (x+3), C: (x-1)(x+2), D: (x+1)(x-2)]
 * - Constraints: [p(-1)=0 and p(2)=0 means (x+1) and (x-2) are factors]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */