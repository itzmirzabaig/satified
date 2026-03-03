import React, { useMemo } from 'react';
import {
  Mafs,
  Coordinates,
  Plot,
  Circle,
  Polygon,
  Polyline,
  Theme,
  vec,
  Point,
  Line,
  Vector,
  LaTeX,
  Text,
  Transform
} from 'mafs';

type vec2 = [number, number];

// ============================================================================
// COLOR MAPPING
// ============================================================================
const THEME_MAP: Record<string, string> = {
  'blue': Theme.blue,
  'red': Theme.red,
  'green': Theme.green,
  'orange': Theme.orange,
  'indigo': Theme.indigo,
  'violet': Theme.violet,
  'pink': Theme.pink,
  'yellow': Theme.yellow,
  'foreground': Theme.foreground,
  'background': Theme.background,
  'purple': Theme.violet,
  'black': Theme.foreground,
  'white': Theme.background,
  'gray': '#888888'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function parseColor(colorStr: string | null, scope: Record<string, any>): string {
  if (!colorStr) return Theme.blue;
  colorStr = colorStr.trim();

  // Handle CSS variables: var(--mafs-blue)
  const cssMatch = colorStr.match(/var\(--mafs-([^)]+)\)/);
  if (cssMatch && cssMatch[1] && THEME_MAP[cssMatch[1]]) {
    return THEME_MAP[cssMatch[1]];
  }

  // Handle Theme.color
  if (colorStr.startsWith('Theme.')) {
    const colorName = colorStr.replace('Theme.', '');
    return THEME_MAP[colorName] || Theme.blue;
  }

  // Handle quoted strings or variables
  const clean = colorStr.replace(/['"]/g, '');
  if (scope[clean] && typeof scope[clean] === 'string') {
    return parseColor(scope[clean], scope);
  }
  
  return THEME_MAP[clean] || clean;
}

/**
 * IMPROVED: Parse attributes with better brace handling
 */
function parseAttributes(tagStr: string, scope: Record<string, any>): Record<string, any> {
  const attrs: Record<string, any> = {};
  const propsPart = tagStr.replace(/^[A-Za-z.]+\s*/, '').trim();
  let i = 0;

  while (i < propsPart.length) {
    // Skip whitespace
    while (i < propsPart.length && /\s/.test(propsPart[i])) i++;
    if (i >= propsPart.length) break;

    // Match attribute name
    const nameMatch = propsPart.slice(i).match(/^(\w+)\s*=\s*/);
    if (!nameMatch) {
      i++;
      continue;
    }

    const name = nameMatch[1];
    i += nameMatch[0].length;

    let value = "";
    
    if (i >= propsPart.length) break;

    if (propsPart[i] === '{') {
      // Extract balanced braces
      let depth = 0;
      const start = i;
      while (i < propsPart.length) {
        if (propsPart[i] === '{') depth++;
        if (propsPart[i] === '}') {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
        i++;
      }
      value = propsPart.slice(start + 1, i - 1).trim();
    } else if (propsPart[i] === '"' || propsPart[i] === "'") {
      // Extract quoted string
      const quote = propsPart[i];
      const start = i;
      i++;
      while (i < propsPart.length && propsPart[i] !== quote) {
        if (propsPart[i] === '\\') i++; // Skip escaped chars
        i++;
      }
      i++; // Skip closing quote
      value = propsPart.slice(start + 1, i - 1);
    } else {
      // Extract unquoted value (up to space or next attr)
      const start = i;
      while (i < propsPart.length && !/[\s=]/.test(propsPart[i])) i++;
      value = propsPart.slice(start, i);
    }

    attrs[name] = parseValue(value, scope);
  }
  return attrs;
}

function parseValue(valueStr: string, scope: Record<string, any>): any {
  if (!valueStr) return undefined;
  valueStr = valueStr.trim();

  // Arrow functions
  if (valueStr.includes('=>')) {
    console.log('Parsing arrow function:', valueStr);
    const result = createFunctionFromArrow(valueStr, scope);
    console.log('  Result type:', typeof result);
    return result;
  }
  
  // Numeric values
  if (/^-?\d+(\.\d+)?$/.test(valueStr)) {
    return parseFloat(valueStr);
  }

  // Booleans
  const unquoted = valueStr.replace(/['"]/g, '');
  if (unquoted === 'true') return true;
  if (unquoted === 'false') return false;

  // Arrays/Objects/Expressions - evaluate with scope
  try {
    const fnKeys = Object.keys(scope);
    const fnValues = Object.values(scope);
    const fn = new Function(...fnKeys, `return ${valueStr}`);
    return fn(...fnValues);
  } catch (e) {
    // If evaluation fails, return as string
    return unquoted;
  }
}

/**
 * Extract variables from code (const, let, var)
 */
function extractVariables(code: string): Record<string, any> {
  const scope: Record<string, any> = { Math, Theme, vec, PI: Math.PI, E: Math.E };
  const varRegex = /(?:const|let|var)\s+(\w+)\s*=\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(code)) !== null) {
    try {
      const name = match[1];
      const expr = match[2];
      scope[name] = parseValue(expr, scope);
    } catch (e) {
      console.warn(`Variable extraction failed for ${match[1]}`);
    }
  }
  return scope;
}

/**
 * Create JavaScript function from arrow expression
 */
function createFunctionFromArrow(arrowExpr: string, scope: Record<string, any>): Function {
  const match = arrowExpr.match(/(?:\(([^)]*)\)|(\w+))\s*=>\s*(.+)/);
  if (!match) {
    console.warn('Failed to parse arrow function:', arrowExpr);
    return () => 0;
  }

  const paramsStr = match[1] || match[2] || '';
  const params = paramsStr.split(',').map(p => p.trim()).filter(Boolean);
  const body = match[3].trim();

  return (...args: any[]) => {
    const localScope = { ...scope };
    params.forEach((p, i) => (localScope[p] = args[i]));
    
    try {
      const fn = new Function(
        ...Object.keys(localScope),
        body.startsWith('{') ? body : `return ${body}`
      );
      return fn(...Object.values(localScope));
    } catch (e) {
      console.error('Arrow function execution error:', e, 'body:', body);
      return 0;
    }
  };
}

// ============================================================================
// RECURSIVE ELEMENT PARSER
// ============================================================================

function parseCodeToElements(code: string, scope: Record<string, any>, elIdxRef: { current: number }): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  
  // CRITICAL FIX: Can't use [^>] because arrow functions have > in them!
  // Instead, manually parse tags with proper brace/paren balancing
  const elements_array: React.ReactNode[] = [];
  let i = 0;
  
  while (i < code.length) {
    // Find opening tag
    const openIdx = code.indexOf('<', i);
    if (openIdx === -1) break;
    
    // Check if it's a closing tag
    if (code[openIdx + 1] === '/') {
      i = openIdx + 1;
      continue;
    }
    
    // Extract tag name
    const tagNameMatch = code.slice(openIdx + 1).match(/^([A-Za-z.]+)/);
    if (!tagNameMatch) {
      i = openIdx + 1;
      continue;
    }
    
    const tagName = tagNameMatch[1];
    let cursor = openIdx + 1 + tagName.length;
    
    // Extract attributes with balanced braces/parens/quotes
    let attrString = '';
    let depth = { brace: 0, paren: 0 };
    let inQuote: string | null = null;
    
    while (cursor < code.length) {
      const char = code[cursor];
      
      if (inQuote) {
        attrString += char;
        if (char === inQuote && code[cursor - 1] !== '\\') {
          inQuote = null;
        }
      } else {
        if (char === '"' || char === "'") {
          inQuote = char;
          attrString += char;
        } else if (char === '{') {
          depth.brace++;
          attrString += char;
        } else if (char === '}') {
          depth.brace--;
          attrString += char;
        } else if (char === '(') {
          depth.paren++;
          attrString += char;
        } else if (char === ')') {
          depth.paren--;
          attrString += char;
        } else if (char === '>' && depth.brace === 0 && depth.paren === 0) {
          // Found the end!
          break;
        } else if (char === '/' && code[cursor + 1] === '>' && depth.brace === 0 && depth.paren === 0) {
          // Self-closing tag
          break;
        } else {
          attrString += char;
        }
      }
      cursor++;
    }
    
    // Determine if self-closing
    const selfClosing = code[cursor] === '/' && code[cursor + 1] === '>';
    const closingIdx = selfClosing ? cursor + 2 : cursor + 1;
    
    console.log(`Parsing tag: ${tagName}, selfClosing=${selfClosing}`);
    
    const scope_copy = scope;
    const attrs = parseAttributes(attrString, scope_copy);

    if (attrs.color) {
      attrs.color = parseColor(String(attrs.color), scope_copy);
    }

    const key = `el-${elIdxRef.current++}`;
    
    // Handle content for non-self-closing tags
    let content = '';
    if (!selfClosing) {
      const closingTag = `</${tagName}>`;
      const closeTagIdx = code.indexOf(closingTag, closingIdx);
      if (closeTagIdx !== -1) {
        content = code.slice(closingIdx, closeTagIdx);
        i = closeTagIdx + closingTag.length;
      } else {
        i = closingIdx;
      }
    } else {
      i = closingIdx;
    }
    
    switch (tagName) {
      case 'Mafs':
        // Recurse into Mafs children
        if (content) {
          elements_array.push(...parseCodeToElements(content, scope_copy, elIdxRef));
        }
        break;

      case 'Coordinates.Cartesian':
        elements_array.push(<Coordinates.Cartesian key={key} {...attrs} />);
        break;

      case 'Plot.OfX':
        console.log('Plot.OfX attrs:', attrs);
        console.log('  y type:', typeof attrs.y);
        console.log('  y value:', attrs.y);
        if (typeof attrs.y === 'function') {
          console.log('  ✓ Creating Plot.OfX with function');
          elements_array.push(<Plot.OfX key={key} y={attrs.y} {...attrs} />);
        } else {
          console.warn('  ✗ Plot.OfX missing valid y function. attrs.y =', attrs.y);
        }
        break;

      case 'Plot.OfY':
        if (typeof attrs.x === 'function') {
          elements_array.push(<Plot.OfY key={key} x={attrs.x} {...attrs} />);
        }
        break;

      case 'Plot.Parametric':
        if (typeof attrs.xy === 'function') {
          const domain = attrs.domain || attrs.t || [0, 2 * Math.PI];
          elements_array.push(
            <Plot.Parametric
              key={key}
              xy={attrs.xy}
              t={domain}
              {...attrs}
            />
          );
        }
        break;

      case 'Plot.Inequality':
        // Wrap functions in operator objects
        const ineqProps: any = { ...attrs };
        if (typeof attrs.y === 'function') {
          ineqProps.y = { "<=": attrs.y };
        }
        if (typeof attrs.x === 'function') {
          ineqProps.x = { "<=": attrs.x };
        }
        elements_array.push(<Plot.Inequality key={key} {...ineqProps} />);
        break;

      case 'Circle':
        if (attrs.center && attrs.radius !== undefined) {
          elements_array.push(
            <Circle
              key={key}
              center={attrs.center}
              radius={attrs.radius}
              {...attrs}
            />
          );
        }
        break;

      case 'Polygon':
        // CRITICAL FIX: Handle malformed points arrays like [, [3, 0], [3, 3.5]]
        if (Array.isArray(attrs.points)) {
          let points = attrs.points;
          
          console.log('  Polygon raw points:', points);
          console.log('  Polygon attrs:', attrs);
          
          // Filter out undefined/null/invalid points (from leading commas like [, [3,0]])
          points = points.filter(p => {
            if (p === undefined || p === null) {
              console.log('    Filtered out undefined/null point');
              return false;
            }
            if (!Array.isArray(p) || p.length !== 2) {
              console.log('    Filtered out invalid point:', p);
              return false;
            }
            return true;
          });
          
          console.log('  After filtering:', points);
          
          // If we have points but they don't form a closed shape, add origin
          if (points.length >= 2) {
            // Check if origin is missing (common in triangles)
            const hasOrigin = points.some(p => p[0] === 0 && p[1] === 0);
            if (!hasOrigin) {
              // Prepend origin for triangles
              console.log('  Adding origin [0,0]');
              points = [[0, 0], ...points];
            }
          }
          
          console.log('  Final points:', points);
          console.log('  Final color:', attrs.color);
          
          if (points.length >= 3) {
            elements_array.push(
              <Polygon
                key={key}
                points={points}
                color={attrs.color}
                fillOpacity={0.2}
              />
            );
          } else {
            console.warn('Polygon needs at least 3 points, got:', points);
          }
        }
        break;

      case 'Polyline':
        if (Array.isArray(attrs.points)) {
          elements_array.push(<Polyline key={key} points={attrs.points} {...attrs} />);
        }
        break;

      case 'Point':
        if (attrs.x !== undefined && attrs.y !== undefined) {
          elements_array.push(<Point key={key} x={attrs.x} y={attrs.y} {...attrs} />);
        } else if (attrs.point && Array.isArray(attrs.point)) {
          elements_array.push(<Point key={key} x={attrs.point[0]} y={attrs.point[1]} {...attrs} />);
        }
        break;

      case 'Line.Segment':
        if (attrs.point1 && attrs.point2) {
          elements_array.push(
            <Line.Segment
              key={key}
              point1={attrs.point1}
              point2={attrs.point2}
              {...attrs}
            />
          );
        }
        break;

      case 'Vector':
        if (attrs.tip) {
          elements_array.push(<Vector key={key} tip={attrs.tip} {...attrs} />);
        }
        break;

      case 'LaTeX':
        console.log('LaTeX component:', { tex: attrs.tex, at: attrs.at, texType: typeof attrs.tex, atType: typeof attrs.at });
        if (attrs.tex && attrs.at) {
          // CRITICAL: Ensure tex is always a string and at is a proper Vector2 tuple
          console.log('  Before String():', attrs.tex, 'Type:', typeof attrs.tex, 'Constructor:', attrs.tex?.constructor?.name);
          const texString = String(attrs.tex);
          console.log('  After String():', texString, 'Type:', typeof texString);
          let atArray: vec2;
          
          if (Array.isArray(attrs.at) && attrs.at.length >= 2) {
            atArray = [Number(attrs.at[0]), Number(attrs.at[1])];
          } else {
            atArray = [0, 0];
          }
          
          console.log('  Final:', { texString, atArray, texStringType: typeof texString });
          
          // CRITICAL FIX: Don't spread attrs AFTER setting tex/at, it overwrites them!
          const { tex, at, ...restAttrs } = attrs;
          
          try {
            elements_array.push(<LaTeX key={key} tex={texString} at={atArray} {...restAttrs} />);
          } catch (e) {
            console.error('  LaTeX render error:', e);
          }
        } else {
          console.warn('  LaTeX missing tex or at');
        }
        break;

      case 'Text':
        if (attrs.x !== undefined && attrs.y !== undefined) {
          elements_array.push(
            <Text key={key} x={attrs.x} y={attrs.y} {...attrs}>
              {content || attrs.children}
            </Text>
          );
        }
        break;

      case 'Transform':
        if (content) {
          elements_array.push(
            <Transform key={key} {...attrs}>
              {parseCodeToElements(content, scope_copy, elIdxRef)}
            </Transform>
          );
        }
        break;

      default:
        console.warn(`Unknown tag: ${tagName}`);
    }
  }
  return elements_array;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const GraphRenderer: React.FC<{ code: string; height?: number; zoom?: boolean }> = ({ code, height = 400, zoom = true }) => {

  // --------------------------------------------------------------------------
  // RAW HTML BYPASS: SVG / table / div strings skip Mafs entirely and are
  // injected directly into the DOM.  Mafs is a coordinate-plane library and
  // cannot host a root-level <svg viewBox> or <table> inside itself.
  // --------------------------------------------------------------------------
  const isRawHTML = useMemo(() => {
    if (!code) return false;
    const trimmed = code.trim();
    return trimmed.startsWith('<svg') ||
           trimmed.startsWith('<table') ||
           trimmed.startsWith('<div');
  }, [code]);

  if (isRawHTML) {
    return (
      <div
        className="raw-html-container"
        style={{ width: '100%', height: 'auto', overflow: 'auto' }}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  }
  // --------------------------------------------------------------------------

  const { elements, viewBox, needsWrapper, customHeight, wrapperCoordsProps } = useMemo(() => {
    if (!code) {
      return {
        elements: [],
        viewBox: { x: [-5, 5] as vec2, y: [-5, 5] as vec2 },
        needsWrapper: false,
        customHeight: null as number | null,
        wrapperCoordsProps: null as any
      };
    }

    const scope = extractVariables(code);
    const elIdxRef = { current: 0 };
    const elements = parseCodeToElements(code, scope, elIdxRef);

    // Check if code has a <Mafs> tag - if not, we need to wrap
    const hasMafsTag = code.includes('<Mafs');

    // FIX 4: Support per-question height override via data-height on <Mafs> tag
    // Usage in question: <Mafs data-height="500" viewBox={{...}}>
    let customHeight: number | null = null;
    const heightMatch = code.match(/data-height=["'\{]\s*(\d+)/);
    if (heightMatch) customHeight = parseInt(heightMatch[1], 10);

    // NEW: Support data-x-lines and data-y-lines for orphan wrapper Coordinates.Cartesian
    // Usage in question: <Mafs data-x-lines="1" data-y-lines="50" viewBox={{...}}>
    // Or for orphan plots: just include data-x-lines and data-y-lines in the code string
    let xLines: number | null = null;
    let yLines: number | null = null;
    
    const xLinesMatch = code.match(/data-x-lines=["'\{]\s*(\d+)/);
    const yLinesMatch = code.match(/data-y-lines=["'\{]\s*(\d+)/);
    
    if (xLinesMatch) xLines = parseInt(xLinesMatch[1], 10);
    if (yLinesMatch) yLines = parseInt(yLinesMatch[1], 10);

    // Extract viewBox from code
    const vbMatch = code.match(
      /viewBox\s*=\s*\{\s*\{\s*x:\s*\[([^,]+),\s*([^\]]+)\],\s*y:\s*\[([^,]+),\s*([^\]]+)\]\s*\}\s*\}/
    );

    let vb = { x: [-5, 5] as vec2, y: [-5, 5] as vec2 };

    if (vbMatch) {
      // Has explicit viewBox - parse it
      try {
        const evalInScope = (expr: string) => {
          const fn = new Function(...Object.keys(scope), `return ${expr}`);
          return Number(fn(...Object.values(scope)));
        };
        const x1 = evalInScope(vbMatch[1]);
        const x2 = evalInScope(vbMatch[2]);
        const y1 = evalInScope(vbMatch[3]);
        const y2 = evalInScope(vbMatch[4]);
        if (!isNaN(x1) && !isNaN(x2) && !isNaN(y1) && !isNaN(y2)) {
          vb = { x: [x1, x2], y: [y1, y2] };
        }
      } catch (e) {
        console.error('ViewBox extraction error:', e);
      }
    } else if (!hasMafsTag) {
      // FIX 2: Smarter auto-viewBox for orphan elements (no <Mafs> wrapper)

      // Try to auto-detect viewBox from Plot.OfX functions in the code
      // by evaluating the function over a sample x range and finding y bounds
      const plotMatch = code.match(/Plot\.OfX[^>]*y=\{\s*\(([^)]+)\)\s*=>\s*([^}]+)\}/);
      if (plotMatch) {
        try {
          const paramName = plotMatch[1].trim();
          const fnBody = plotMatch[2].trim();
          const fn = new Function(...Object.keys(scope), paramName, `return ${fnBody}`);

          // First probe the function's scale at x=1 to decide a sensible x range.
          // If the slope is large (|y(1) - y(0)| > 10), shrink x range so the total
          // y span stays ≤ ~150 units, keeping the graph readable with sparse labels.
          const y0 = (() => { try { return fn(...Object.values(scope), 0); } catch { return 0; } })();
          const y1 = (() => { try { return fn(...Object.values(scope), 1); } catch { return 1; } })();
          const slope = Math.abs(y1 - y0) || 1;
          // Target: x span that produces ~150 units of y travel on the positive side
          const targetYSpan = 150;
          const xHalf = Math.min(10, Math.max(5, targetYSpan / slope));

          const xSamples = Array.from({ length: 41 }, (_, i) => -xHalf + i * (xHalf * 2 / 40));
          const ySamples = xSamples.map(x => {
            try { return fn(...Object.values(scope), x); } catch { return NaN; }
          }).filter(y => isFinite(y));
          if (ySamples.length > 0) {
            const yMin = Math.min(...ySamples);
            const yMax = Math.max(...ySamples);
            const yPad = (yMax - yMin) * 0.15 || 1;
            vb = { x: [-xHalf, xHalf], y: [yMin - yPad, yMax + yPad] };
          }
        } catch (e) {
          console.warn('Auto-viewBox from Plot.OfX failed:', e);
        }
      }

      // Also try polygon/point-based auto-calc (existing logic)
      if (vb.x[0] === -5 && vb.x[1] === 5) {
        const pointsMatch = code.match(/points=\{(\[[^\]]+\])\}/);
        if (pointsMatch) {
          try {
            const evalPoints = new Function(`return ${pointsMatch[1]}`)();
            const validPoints = evalPoints.filter((p: any) => Array.isArray(p) && p.length === 2);
            if (validPoints.length > 0) {
              const xs = validPoints.map((p: number[]) => p[0]);
              const ys = validPoints.map((p: number[]) => p[1]);
              const pad = 1;
              vb = {
                x: [Math.min(...xs, 0) - pad, Math.max(...xs, 0) + pad],
                y: [Math.min(...ys, 0) - pad, Math.max(...ys, 0) + pad]
              };
            }
          } catch (e) {
            console.warn('Auto-viewBox from points failed:', e);
          }
        }
      }
    }

    // FIX 3: Don't add the wrapper Coordinates.Cartesian if the orphan code
    // already has its own <Coordinates.Cartesian> - that would double it up
    const orphanHasCoords = !hasMafsTag && code.includes('<Coordinates.Cartesian');
    const needsWrapper = !hasMafsTag && !orphanHasCoords;

    // NEW: Build wrapper Coordinates.Cartesian props with smart defaults
    let wrapperCoordsProps: any = null;
    if (needsWrapper) {
      const yRange = vb.y[1] - vb.y[0];
      const xRange = vb.x[1] - vb.x[0];
      
      // Smart defaults: aim for ~4-6 gridlines
      // If not specified via data-x-lines/data-y-lines, compute sensible values
      const defaultYLines = yLines ?? Math.ceil(yRange / 5 / 10) * 10;
      const defaultXLines = xLines ?? (xRange <= 10 ? 1 : Math.ceil(xRange / 5));
      
      wrapperCoordsProps = {
        xAxis: { 
          lines: defaultXLines, 
          labels: (n: number) => n % defaultXLines === 0 ? n : "" 
        },
        yAxis: { 
          lines: defaultYLines, 
          labels: (n: number) => n % defaultYLines === 0 ? n : "" 
        }
      };
    }

    return { elements, viewBox: vb, needsWrapper, customHeight, wrapperCoordsProps };
  }, [code]);

  const effectiveHeight = customHeight ?? height;

  return (
    // FIX 1: preserveAspectRatio="none" lets x and y axes scale independently
    // to fill the container, so large-slope lines show at a readable angle
    // instead of appearing as a near-vertical line in a square box.
    // Questions that need equal-axis scaling can add equalAspect to their <Mafs> tag
    // (not yet supported by our parser but can be added per-question via data-equal-aspect).
    <div className="mafs-container" style={{ height: effectiveHeight, width: '100%', overflow: 'hidden' }}>
      <Mafs viewBox={viewBox} preserveAspectRatio={false} width="auto" zoom={zoom}>
        {needsWrapper && wrapperCoordsProps && <Coordinates.Cartesian {...wrapperCoordsProps} />}
        {elements.length > 0 ? elements : (!needsWrapper && <Coordinates.Cartesian />)}
      </Mafs>
    </div>
  );
};

export default GraphRenderer;