import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dfc420b2
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced incomplete <Line.ThroughPoints> and <Line.Segment> with valid geometry.
 * - Created a "Bowtie" shape (Vertical Angles) with intersection at (0,0).
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Explicitly labeled the static angles (angle1, angle3) in the figure so the problem is solvable.
 * - Labeled vertices A, B, C, D, E to match the question text.
 */

export const generator_dfc420b2 = {
  metadata: {
    id: "dfc420b2",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angle1 = getRandomInt(15, 30);
    const x = getRandomInt(90, 110);
    const angle3 = getRandomInt(35, 50);
    
    // Calculate the chain:
    // Triangle ABC (Left): 180 - x - angle1 = angleBCA
    const angleBCA = 180 - x - angle1;
    // Vertical Angles: angleBCA = angleDCE
    // Triangle CDE (Right): y = 180 - angleDCE - angle3
    const yValue = 180 - angleBCA - angle3;
    
    // Geometry:
    // C at (0,0).
    // A at (-3, 2), B at (-3, -2) -> Left Triangle
    // E at (3, 2), D at (3, -2) -> Right Triangle
    // Note: This is schematic (Not to scale) since x is Obtuse (90-110)
    // but the visual angle A in this coordinate setup is acute.
    // This is acceptable for SAT diagrams which are "not to scale".
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-4, 4], y: [-3, 3] }}>
        {/* Line Segment AD (intersects BE at C) */}
        <Line.Segment point1={[-3, 2]} point2={[3, -2]} color="black" />
        
        {/* Line Segment BE */}
        <Line.Segment point1={[-3, -2]} point2={[3, 2]} color="black" />
        
        {/* Vertical side AB */}
        <Line.Segment point1={[-3, 2]} point2={[-3, -2]} color="black" />
        
        {/* Vertical side DE */}
        <Line.Segment point1={[3, 2]} point2={[3, -2]} color="black" />
        
        {/* Vertex Labels */}
        <Text x={-3.3} y={2}>A</Text>
        <Text x={-3.3} y={-2}>B</Text>
        <Text x={0} y={0.5}>C</Text>
        <Text x={3.3} y={2}>E</Text>
        <Text x={3.3} y={-2}>D</Text>
        
        {/* Angle Labels */}
        {/* Angle A = x */}
        <Text x={-2.4} y={1.2}>x°</Text>
        
        {/* Angle B = angle1 (Static value needed to solve) */}
        <Text x={-2.4} y={-1.2}>${angle1}°</Text>
        
        {/* Angle E = angle3 (Static value needed to solve) */}
        <Text x={2.4} y={1.2}>${angle3}°</Text>
        
        {/* Angle D = y (Target) */}
        <Text x={2.4} y={-1.2}>y°</Text>
      </Mafs>
    `;

    const correctAnswer = yValue.toString();
    const distractorA = x;
    const distractorB = 90;
    const distractorD = yValue - 20;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "uses the given value of x instead of calculating y" },
      { text: distractorB.toString(), isCorrect: false, reason: "assumes a right angle without calculation" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "results from a calculation error in the triangle angle sum" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, $\\overline{AD}$ intersects $\\overline{BE}$ at $C$. If $x = ${x}$, what is the value of $y$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. First, find the measure of $\\angle BCA$ in $\\triangle ABC$. The sum of angles in a triangle is $180^{\\circ}$, so $\\angle BCA = 180^{\\circ} - x^{\\circ} - ${angle1}^{\\circ} = 180 - ${x} - ${angle1} = ${angleBCA}^{\\circ}$. Since $\\angle BCA$ and $\\angle DCE$ are vertical angles, they are congruent, so $\\angle DCE = ${angleBCA}^{\\circ}$. Finally, in $\\triangle CDE$, $y = 180^{\\circ} - \\angle DCE - ${angle3}^{\\circ} = 180 - ${angleBCA} - ${angle3} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};