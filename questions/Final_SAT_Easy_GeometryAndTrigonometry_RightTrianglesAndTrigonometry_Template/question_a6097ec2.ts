import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a6097ec2
 * Skill: Right Triangles And Trigonometry
 * Fixes: Added Mafs wrapper, scaled large coordinates to fit viewport, fixed label duplication, corrected angle placement logic.
 */
export const generator_a6097ec2 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const hypotenuse = getRandomInt(60, 80);
    const opposite = getRandomInt(50, hypotenuse - 5);
    const adjacent = Math.sqrt(hypotenuse ** 2 - opposite ** 2);
    const diff = hypotenuse - opposite;
    const sum = hypotenuse + opposite;

    // SCALING VISUALIZATION
    // The actual values (60-80) are too large for the default view.
    // We scale the horizontal width to exactly 6 units and adjust Y proportionally.
    const VISUAL_WIDTH = 6;
    const scale = VISUAL_WIDTH / adjacent;

    // Scaled coordinates
    const ax = adjacent * scale; // Width on X-axis
    const by = opposite * scale; // Height on Y-axis

    // Dynamic ViewBox with padding
    const xMin = -1.5;
    const xMax = ax + 1.0;
    const yMin = -1.0;
    const yMax = by + 1.0;

    const mafsCode = `
      <Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
        {/* Main Triangle */}
        <Polygon 
          points={[[0, 0], [${ax}, 0], [0, ${by}]]} 
          color="black" 
          fillOpacity={0.05} 
          strokeWidth={2} 
        />
        
        {/* Right Angle Marker at (0,0) */}
        <Polygon 
          points={[[0, 0.4], [0.4, 0.4], [0.4, 0]]} 
          color="black" 
          fillOpacity={0} 
        />

        {/* Labels */}
        {/* Side Opposite (Vertical) */}
        <Text x={-0.6} y={${by} / 2}>${opposite}</Text>

        {/* Side Adjacent (Horizontal) */}
        <Text x={${ax} / 2} y={-0.6}>Adjacent</Text>

        {/* Hypotenuse */}
        <Text x={${ax} / 2 + 0.3} y={${by} / 2 + 0.3}>${hypotenuse}</Text>

        {/* Angle x at vertex (ax, 0) - Opposite the vertical side */}
        <Text x={${ax} - 0.8} y={0.3}>x°</Text>
      </Mafs>
    `;

    const optionsData = [
      { text: `$\\frac{1}{${hypotenuse}}$`, isCorrect: false, reason: "uses the reciprocal of the hypotenuse length" },
      { text: `$\\frac{${diff}}{${hypotenuse}}$`, isCorrect: false, reason: "uses the difference between sides instead of the opposite side" },
      { text: `$\\frac{${opposite}}{${hypotenuse}}$`, isCorrect: true },
      { text: `$\\frac{${sum}}{${hypotenuse}}$`, isCorrect: false, reason: "incorrectly adds the side lengths before forming the ratio" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, what is the value of $\\sin x^\\circ$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The sine of an acute angle is the ratio of the length of the opposite side to the length of the hypotenuse. In the figure, the side opposite the angle labeled $x^\\circ$ has length ${opposite}, and the hypotenuse has length ${hypotenuse}. Thus, $\\sin x^\\circ = \\frac{${opposite}}{${hypotenuse}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};