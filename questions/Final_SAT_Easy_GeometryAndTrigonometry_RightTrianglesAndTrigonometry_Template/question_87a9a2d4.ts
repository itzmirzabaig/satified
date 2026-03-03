import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 87a9a2d4
 * Skill: Right Triangles And Trigonometry
 * Fixes: Scaled large coordinates to fit viewbox, fixed label duplication by using Text instead of LaTeX, corrected geometric label placement.
 */
export const generator_87a9a2d4 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate geometric values
    // opposite: Side opposite angle A (shorter leg, range 30-50)
    // hypotenuse: Longest side (range 150-200)
    const opposite = getRandomInt(30, 50);
    const hypotenuse = getRandomInt(150, 200);
    
    // Calculate adjacent side (longer leg)
    const adjacent = Math.sqrt(hypotenuse ** 2 - opposite ** 2);

    // 2. Visualization Scaling
    // The raw triangle is very "flat" (e.g., 160 wide, 40 high). 
    // We scale coordinates to fit a standard 8-unit width for better visibility.
    const VISUAL_WIDTH = 8;
    const scale = VISUAL_WIDTH / adjacent;

    // Scaled Coordinates:
    // C at (0,0) [Right Angle]
    // A at (ax, 0) [Angle A] -> Side opposite A is the vertical segment BC
    // B at (0, by) [Angle B]
    const ax = adjacent * scale; 
    const by = opposite * scale;

    // Dynamic ViewBox with padding
    const xMin = -1.5;
    const xMax = ax + 1.5;
    const yMin = -1.5;
    const yMax = by + 1.5;

    // 3. Generate Figure Code
    // Note: Using <Text> strictly for all labels to avoid rendering artifacts
    const mafsCode = `
      <Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
        {/* Main Triangle */}
        <Polygon 
          points={[[0, 0], [${ax}, 0], [0, ${by}]]} 
          color="black" 
          fillOpacity={0.05} 
          strokeWidth={2}
        />
        
        {/* Right Angle Marker */}
        <Polygon 
          points={[[0, 0.4], [0.4, 0.4], [0.4, 0]]} 
          color="black" 
          fillOpacity={0} 
        />

        {/* Vertex Labels */}
        <Text x={-0.3} y={-0.3}>C</Text>
        <Text x={${ax} + 0.4} y={0} attach="w">A</Text>
        <Text x={0} y={${by} + 0.4} attach="s">B</Text>

        {/* Side Labels */}
        {/* Side BC (Vertical, opposite Angle A) */}
        <Text x={-0.8} y={${by} / 2}>${opposite}</Text>
        
        {/* Hypotenuse AB */}
        <Text x={${ax} / 2} y={${by} / 2 + 0.6}>${hypotenuse}</Text>
      </Mafs>
    `;

    // 4. Options Generation
    const optionsData = [
      { 
        text: `$\\frac{1}{${hypotenuse}}$`, 
        isCorrect: false, 
        reason: "uses the reciprocal of the hypotenuse instead of the sine ratio" 
      },
      { 
        text: `$\\frac{${opposite}}{${hypotenuse}}$`, 
        isCorrect: true 
      },
      { 
        text: `$\\frac{${hypotenuse}}{${opposite}}$`, 
        isCorrect: false, 
        reason: "inverts the sine ratio by placing the hypotenuse over the opposite side" 
      },
      { 
        text: `$${hypotenuse}$`, 
        isCorrect: false, 
        reason: "provides only the length of the hypotenuse instead of a ratio" 
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, what is the value of $\\sin A$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The sine of an acute angle in a right triangle is the ratio of the length of the side opposite that angle to the length of the hypotenuse. In right triangle $ABC$, side $BC$ is the side opposite angle $A$ and side $AB$ is the hypotenuse. It is given that the length of side $BC$ is ${opposite} units and the length of side $AB$ is ${hypotenuse} units. Therefore, the value of $\\sin A$ is $\\frac{${opposite}}{${hypotenuse}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};