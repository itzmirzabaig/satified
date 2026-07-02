import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question 858
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: 12, QR: 5, QT: 10]
 * - Difficulty factors: [Similar rectangles, proportion calculation]
 * - Distractor patterns: [A: scaled up wrongly, C: added, D: QT itself]
 * - Constraints: [Similar rectangles with clean ratio]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: Two similar rectangles]
 */

export const generator_858 = {
  metadata: {
    id: "858",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate figure parameters
    const ab = getRandomInt(8, 15);
    const qr = getRandomInt(4, 8);
    const qt = getRandomInt(8, 15);
    
    // STEP 2: Calculate derived values
    const ratio = ab / qr;
    const ad = qt * ratio;
    
    // STEP 3: Build Mafs code for two rectangles
    // Rectangle 1: ABCD with width=ab, height calculated to maintain aspect ratio of rect 2
    // Actually, we need similar rectangles, so ratio applies to both dimensions
    // Rect 1 (ABCD): width = ab, height = ad (what we're finding)
    // Rect 2 (QRST): width = qr, height = qt
    // For similar rectangles: ab/qr = ad/qt
    
    const _svg_0 = Math.max(ad;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;; const _svg_1 = ab + qr + 5;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_1;
      const ymin=-2,ymax=_svg_})()}${(() => {
      const xmin=-2,xmax=(ab + qr + 5);
      const ymin=-2,ymax=(Math.max(ad;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((ab / 2))+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${ab in (AB)</text>';
    ))()}((() => {
      const xmin=-2,xmax=(ab + qr + 5);
      const ymin=-2,ymax=(Math.max(ad;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((ab + 2 + qr / 2))+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${qr in (QR)</text>';
    ))()}((() => {
      const xmin=-2,xmax=(ab + qr + 5);
      const ymin=-2,ymax=(Math.max(ad;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((ab + 2 + qr + 1))+'" y="'+my((qt / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${qt in (QT)</text>';
    ))()}((() => {
      const xmin=-2,xmax=(ab + qr + 5);
      const ymin=-2,ymax=(Math.max(ad;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(((ab + 2 + qr) / 2))+'" y="'+my((Math.max(ad)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Note: Figure not drawn to scale.</text>');
    ))()})))}</svg></div>`;
    
    // STEP 4: Create options with tracking
    const correctText = Math.round(ad).toString();
    
    // Distractors
    const distractorA = Math.round(ab * qt).toString(); // Wrong calculation
    const distractorC = Math.round(ab + qt).toString(); // Added
    const distractorD = qt.toString(); // Just QT
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The ratio of rectangle ABCD to QRST is $${ab}/${qr} = ${ratio.toFixed(2)}$. Since $\\\\overline{AD}$ corresponds to $\\\\overline{QT}$ (${qt}), the length of $\\\\overline{AD}$ is ${qt} \\\\times ${ratio.toFixed(2)} = ${ad.toFixed(0)}$. Choice ${incorrectOptions[0].letter} is incorrect; this appears to multiply ${ab} and ${qt} incorrectly. Choice ${incorrectOptions[1].letter} is incorrect; this adds the side lengths rather than using the proportional relationship. Choice ${incorrectOptions[2].letter} is incorrect; this is the length of QT, not AD.`;
    
    return {
      questionText: `Rectangles $ABCD$ and $QRST$ shown are similar, where $A, B, C,$ and $D$ correspond to $Q, R, S,$ and $T,$ respectively. What is the length, in inches (in), of $\\\\overline{AD}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question 858
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 8, volume: 216]
 * - Difficulty factors: [Triangular prism volume, solving for base area]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Volume divisible by height for integer base area]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */