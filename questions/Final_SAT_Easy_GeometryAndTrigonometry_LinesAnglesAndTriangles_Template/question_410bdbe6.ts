import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 410bdbe6
 *
 * FIXED ANALYSIS:
 * - Issue: Left side of triangle and tick marks were reported invisible.
 * - Fix: Replaced <Polygon> with explicit <Line.Segment> components to ensure stroke rendering.
 * - Improvement: Updated tick marks to be perpendicular to the legs rather than horizontal.
 * - Logic Adjustment: Capped 'a' at 58 to avoid a=60 (equilateral), which would create duplicate correct options.
 */

export const generator_410bdbe6 = {
  metadata: {
    id: "410bdbe6",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Logic
    // We create an Isosceles triangle where 'a' is the vertex angle and 'b' is a base angle.
    // Logic: 2b + a = 180 => b = (180 - a) / 2
    // Range adjusted to 40-58 to avoid 60 (equilateral), which would make distractorC == correctAnswer
    const a = getRandomInt(20, 29) * 2; // Result: 40, 42, ... 58
    const bValue = (180 - a) / 2;

    // 2. Geometry Setup
    // Isosceles triangle centered on y-axis
    // Vertices: Top(0, 3), BottomLeft(-2, 0), BottomRight(2, 0)
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-3, 3], y: [-1, 4] }}>
        <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
        
        {/* Main Triangle Sides - Drawn explicitly to ensure visibility */}
        <Line.Segment point1={[-2, 0]} point2={[2, 0]} color="black" />   {/* Base */}
        <Line.Segment point1={[-2, 0]} point2={[0, 3]} color="black" />   {/* Left Leg */}
        <Line.Segment point1={[2, 0]} point2={[0, 3]} color="black" />    {/* Right Leg */}

        {/* Tick Marks to indicate congruent sides - Perpendicular to legs */}
        {/* Left Leg tick: Midpoint (-1, 1.5), Perpendicular Slope ~ -0.66 */}
        <Line.Segment point1={[-1.15, 1.6]} point2={[-0.85, 1.4]} color="black" />
        
        {/* Right Leg tick: Midpoint (1, 1.5), Perpendicular Slope ~ 0.66 */}
        <Line.Segment point1={[0.85, 1.4]} point2={[1.15, 1.6]} color="black" />

        {/* Labels */}
        {/* Vertex Angle a - inside top */}
        <Text x={0} y={2.2}>${a}°</Text>
        
        {/* Base Angle b - inside bottom right */}
        <Text x={1.5} y={0.3}>b°</Text>
      </Mafs>
    `;

    // 3. Options
    const correctAnswer = bValue.toString();
    const distractorA = (180 - a).toString(); // Sum of both base angles
    const distractorB = (90 - a).toString();  // Calculation error
    const distractorC = a.toString();         // Assumes all angles equal (if not 60) or random guess

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: distractorA, isCorrect: false, reason: "finds the sum of both base angles" },
      { text: distractorB, isCorrect: false, reason: "calculation error" },
      { text: distractorC, isCorrect: false, reason: "assumes the triangle is equilateral" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the triangle above, the sides with tick marks are congruent. What is the value of $b$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. 

The tick marks indicate that the triangle is an isosceles triangle. In an isosceles triangle, the angles opposite the congruent sides (the base angles) are equal in measure.

Let the base angles be $b$. The sum of angles in any triangle is $180^\\circ$.
Therefore:
$$b + b + ${a} = 180$$
$$2b = 180 - ${a}$$
$$2b = ${180 - a}$$
$$b = ${bValue}$$

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.`
    };
  }
};