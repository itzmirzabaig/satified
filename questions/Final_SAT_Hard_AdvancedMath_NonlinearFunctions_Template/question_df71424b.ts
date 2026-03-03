import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: df71424b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -3^x - 7, asymptote at y = -7]
 * - Difficulty factors: [Exponential function graph, x-intercepts]
 * - Distractor patterns: [A: Three, B: Two, C: One, D: Zero]
 * - Constraints: [Must have Mafs figure showing graph below x-axis]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs exponential with asymptote]
 */

export const generator_df71424b = {
  metadata: {
    // id: "df71424b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const c = -getRandomInt(5, 12);
    
    // Calculate viewBox based on function behavior
    const xMin = -5;
    const xMax = 2;
    const yMin = c - 3;
    const yMax = 2;
    
    const mafsCode = `<Mafs pan={true} zoom={true} viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
      <Coordinates.Cartesian subdivisions={false} />
      <Line.Segment point1={[${xMin}, ${c}]} point2={[${xMax}, ${c}]} style="dashed" opacity={0.5} />
      <Plot.OfX y={(x) => -1 * Math.pow(${a}, x) + ${c}} color="var(--mafs-blue)" />
    </Mafs>`;
    
    const optionsData = [
      { text: `Three`, isCorrect: false },
      { text: `Two`, isCorrect: false },
      { text: `One`, isCorrect: false },
      { text: `Zero`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The graph of $y=f(x)$ is shown, where $f(x)=-${a}^x${c}$, and $a$ and $c$ are constants. For how many values of $x$ does $f(x)=0$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Zero`,
      explanation: `Choice ${correctLetter} is correct. The graph has a horizontal asymptote at $y=${c}$ and lies entirely below the x-axis (since $-${a}^x < 0$ and adding ${c} < 0$ keeps it negative). Thus it never intersects the x-axis.`
    };
  }
};

/**
 * Question ID: 1f353a9e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 8000(0.65)^t]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation]
 * - Distractor patterns: [A/B: minimum estimates, C: wrong calculation, D: 8000 correct]
 * - Constraints: [y-intercept at t=0 is initial value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */