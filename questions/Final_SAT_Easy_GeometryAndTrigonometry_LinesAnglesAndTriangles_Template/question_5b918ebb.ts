import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5b918ebb
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced <Line.ThroughPoints> (which had syntax errors) with <Line.Segment>.
 * - Replaced <LaTeX> labels with <Text> to prevent double rendering (1313 issue).
 * - Calculated intersection coordinates to place labels correctly for corresponding angles.
 */

export const generator_5b918ebb = {
  metadata: {
    id: "5b918ebb",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(150, 170);
    
    // Geometry Setup:
    // Line r: y = 1.5
    // Line s: y = -1.5
    // Transversal: Passes through (0,0) with gentle negative slope to make Top-Right obtuse.
    // Slope m = -0.35
    // Intersection 1 (Top): y = 1.5 => 1.5 = -0.35x => x ≈ -4.28
    // Intersection 2 (Bottom): y = -1.5 => -1.5 = -0.35x => x ≈ 4.28
    
    // To keep it centered better, let's steepen slope slightly or move lines in.
    // Let's move lines to y=1 and y=-1.
    // Slope -0.4.
    // Int 1: 1 = -0.4x => x = -2.5. Point: (-2.5, 1)
    // Int 2: -1 = -0.4x => x = 2.5. Point: (2.5, -1)
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line r (top parallel) */}
        <Line.Segment point1={[-5, 1]} point2={[5, 1]} color="black" />
        <Text x={-4.5} y={1.3}>r</Text>

        {/* Line s (bottom parallel) */}
        <Line.Segment point1={[-5, -1]} point2={[5, -1]} color="black" />
        <Text x={-4.5} y={-0.7}>s</Text>

        {/* Transversal n */}
        <Line.Segment point1={[-4.5, 1.8]} point2={[4.5, -1.8]} color="black" />
        <Text x={-3.8} y={1.8}>n</Text>

        {/* Angle Labels - Corresponding Angles (Top Right quadrants) */}
        
        {/* Given Angle at Top Intersection (-2.5, 1) */}
        <Text x={-1.8} y={1.4}>${givenAngle}°</Text>
        
        {/* Unknown Angle x at Bottom Intersection (2.5, -1) */}
        <Text x={3.2} y={-0.6}>x°</Text>
      </Mafs>
    `;

    // Although the original had options: null, SAT system requires string[] usually. 
    // Generating valid options to prevent crashes if switched to Multiple Choice.
    const correctAnswer = givenAngle.toString();
    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: (180 - givenAngle).toString(), isCorrect: false, reason: "calculated supplementary angle" },
      { text: (givenAngle - 15).toString(), isCorrect: false, reason: "calculation error" },
      { text: "90", isCorrect: false, reason: "assumed perpendicular" }
    ];

    const shuffledOptions = shuffle(optionsData);

    return {
      questionText: `In the figure, line $n$ intersects lines $r$ and $s$. Line $r$ is parallel to line $s$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `The marked angles are corresponding angles. Since line $r$ is parallel to line $s$, corresponding angles have equal measure. Thus $x = ${givenAngle}$.`
    };
  }
};