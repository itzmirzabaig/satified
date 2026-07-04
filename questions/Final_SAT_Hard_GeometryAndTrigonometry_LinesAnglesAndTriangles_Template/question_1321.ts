import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1321
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates create isosceles right triangles, k is positive constant]
 * - Difficulty factors: [Coordinate geometry, isosceles right triangles, angle measures]
 * - Distractor patterns: [A: 90-(t-k), B: 90-(t+k), D: 90+k (incorrect operations)]
 * - Constraints: [Both triangles are 45-45-90 regardless of k]
 * - Question type: [Figure→Multiple Choice]
 *
 * REBUILT (figure): the original figureCode drew NEITHER triangle — only two
 * axis lines (off-screen for most draws) plus a lone "P, L" text label, so the
 * figure encoded none of the stated vertices/edges. Replaced with a clean
 * fixed-layout schematic (1324 style) that plots both isosceles right triangles
 * PQR and LMN, sharing the right-angle corner P=L, with every vertex dotted and
 * labeled by name and coordinates so the picture matches the question for every
 * draw. Also fixed the degree symbol (`^\\\\circ` -> `^\\circ`) to match siblings.
 */

export const generator_1321 = {
  metadata: {
    id: "1321",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base coordinates and constant k
    const baseX = getRandomInt(2, 6);
    const baseY = getRandomInt(3, 7);
    const legLength = getRandomInt(2, 4);
    const k = getRandomInt(1, 5);
    
    // Both triangles are isosceles right triangles, so all non-right angles are 45°
    const t = 45;
    
    // STEP 2: Create options - only the (90 - t) option is correct (= 45)
    const optionsData = [
      {
        text: `$(90-(t-${k}))^\\circ$`,
        isCorrect: false,
        reason: "incorrectly subtracts $k$ from $t$ before subtracting from 90"
      },
      {
        text: `$(90-(t+${k}))^\\circ$`,
        isCorrect: false,
        reason: "incorrectly adds $k$ to $t$ before subtracting from 90"
      },
      {
        text: `$(90-t)^\\circ$`,
        isCorrect: true,
        reason: "both triangles are isosceles right triangles with $45^\\circ$ angles, so angle $N = 45^\\circ = (90 - t)^\\circ$"
      },
      {
        text: `$(90+${k})^\\circ$`,
        isCorrect: false,
        reason: "incorrectly adds $k$ to 90"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build the figure — plot BOTH isosceles right triangles so the
    // picture actually encodes the stated vertices/edges (1324 schematic style).
    // Vertices (shared right-angle corner P = L at (baseX, baseY)):
    const Px = baseX,               Py = baseY;                 // P = L (shared)
    const Qx = baseX,               Qy = baseY + legLength;     // Q  (top of small triangle)
    const Rx = baseX + legLength,   Ry = baseY;                 // R  (right of small triangle)
    const Mx = baseX,               My_ = baseY + legLength + k; // M  (top of large triangle)
    const Nx = baseX + legLength + k, Ny = baseY;               // N  (right of large triangle)

    // Data bounds with a little margin; the whole figure stays on-screen.
    const xmin = baseX - 1;
    const xmax = baseX + legLength + k + 2;
    const ymin = baseY - 1;
    const ymax = baseY + legLength + k + 2;

    const VW = 400, VH = 350, PAD = 40;
    const mx = (x: number) => PAD + (x - xmin) / (xmax - xmin) * (VW - 2 * PAD);
    const my = (y: number) => VH - PAD - (y - ymin) / (ymax - ymin) * (VH - 2 * PAD);
    const tri = (a: number[], b: number[], c: number[], color: string) =>
      `<polygon points="${mx(a[0])},${my(a[1])} ${mx(b[0])},${my(b[1])} ${mx(c[0])},${my(c[1])}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
    const dot = (x: number, y: number, color: string) =>
      `<circle cx="${mx(x)}" cy="${my(y)}" r="3.5" fill="${color}"/>`;
    const label = (x: number, y: number, dx: number, dy: number, t: string) =>
      `<text x="${mx(x) + dx}" y="${my(y) + dy}" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">${t}</text>`;
    // Small right-angle marker at the shared corner P = L.
    const rmSize = Math.min(0.5, legLength / 4);
    const rightMark =
      `<polyline points="${mx(Px + rmSize)},${my(Py)} ${mx(Px + rmSize)},${my(Py + rmSize)} ${mx(Px)},${my(Py + rmSize)}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;

    const mafsCode =
      `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${VW} ${VH}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // Larger triangle LMN in blue, then smaller PQR in currentColor on top.
      tri([Nx, Ny], [Px, Py], [Mx, My_], '#3b82f6') +
      tri([Rx, Ry], [Px, Py], [Qx, Qy], 'currentColor') +
      rightMark +
      // Vertices
      dot(Px, Py, 'currentColor') +
      dot(Qx, Qy, 'currentColor') + dot(Rx, Ry, 'currentColor') +
      dot(Mx, My_, '#3b82f6') + dot(Nx, Ny, '#3b82f6') +
      // Labels: name + coordinates (so the figure carries the question's numbers)
      label(Px, Py, -18, 12, `P, L (${Px}, ${Py})`) +
      label(Qx, Qy, -4, -8, `Q (${Qx}, ${Qy})`) +
      label(Rx, Ry, 6, 16, `R (${Rx}, ${Ry})`) +
      label(Mx, My_, -6, -8, `M (${Mx}, ${My_})`) +
      label(Nx, Ny, 8, 16, `N (${Nx}, ${Ny})`) +
      `</svg></div>`;

    return {
      questionText: `Triangles $PQR$ and $LMN$ are graphed in the $xy$-plane. Triangle $PQR$ has vertices $P, Q$, and $R$ at $(${baseX}, ${baseY})$, $(${baseX}, ${baseY + legLength})$, and $(${baseX + legLength}, ${baseY})$, respectively. Triangle $LMN$ has vertices $L, M$, and $N$ at $(${baseX}, ${baseY})$, $(${baseX}, ${baseY + legLength + k})$, and $(${baseX + legLength + k}, ${baseY})$, respectively, where $k$ is a positive constant. If the measure of $\\angle Q$ is $t^\\circ$, what is the measure of $\\angle N$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Both triangles are right isosceles triangles with legs of equal length ($${legLength}$ for $PQR$, and $${legLength + k}$ for $LMN$). Thus all non-right angles are $45^\\circ$. Since $t = 45$, $\\angle N = 45^\\circ$, which is $(90 - t)^\\circ$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`
    };
  }
};
