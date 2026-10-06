"use strict";

/*
   Free group F_2 = <a,b>.

   Letters:
       a : right
       A : left   = a^{-1}
       b : up
       B : down   = b^{-1}

   We process vertices sphere by sphere.

   At g we look for h such that g is the only unspecified
   member of

          { h b, h, h a, h a b }.

   If such h exists, the value at g is forced so that

          x(hb) + x(h) + x(ha) + x(hab) = 0 mod 2.

   Otherwise x(g) is chosen uniformly from {0,1}.
*/


// ------------------------------------------------------------
// Free group arithmetic
// ------------------------------------------------------------

const inverse = {
  a: "A",
  A: "a",
  b: "B",
  B: "b"
};

function reduceWord(word) {
  const stack = [];

  for (const c of word) {
    if (stack.length &&
        inverse[c] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }

  return stack.join("");
}

function mul(g, w) {
  return reduceWord(g + w);
}


// ------------------------------------------------------------
// Generate ball in the Cayley graph
// ------------------------------------------------------------

function generateBall(R) {
  const vertices = [""];

  let sphere = [""];

  for (let r = 1; r <= R; ++r) {
    const next = [];

    for (const g of sphere) {
      for (const c of ["a", "A", "b", "B"]) {
        const h = mul(g, c);

        // Multiplying by the inverse of the final letter
        // moves inward, so keep only words of length r.
        if (h.length === r)
          next.push(h);
      }
    }

    vertices.push(...next);
    sphere = next;
  }

  return vertices;
}


// ------------------------------------------------------------
// Geometric embedding
// ------------------------------------------------------------

function coordinates(word, firstLength, shrink) {
  let x = 0;
  let y = 0;

  /*
     The edge used to reach depth k has length

        firstLength * shrink^(k-1).

     Thus right multiplication by a always points right,
     b always points upward, etc.
  */

  for (let k = 0; k < word.length; ++k) {
    const len = firstLength * Math.pow(shrink, k);

    switch (word[k]) {
      case "a": x += len; break;
      case "A": x -= len; break;
      case "b": y -= len; break; // Canvas y-axis points downward
      case "B": y += len; break;
    }
  }

  return {x, y};
}


// ------------------------------------------------------------
// The four-point constraint
// ------------------------------------------------------------

function constraint(h) {
  return [
    mul(h, "b"),
    h,
    mul(h, "a"),
    mul(h, "ab")
  ];
}


/*
   If g belongs to

       {hb, h, ha, hab}

   then h must be one of only four possibilities.

   g = hb    => h = g B
   g = h     => h = g
   g = ha    => h = g A
   g = hab   => h = g B A
*/

function possibleHs(g) {
  return [
    mul(g, "B"),
    g,
    mul(g, "A"),
    mul(g, "BA")
  ];
}


// ------------------------------------------------------------
// Generate the configuration
// ------------------------------------------------------------

function generateConfiguration(vertices, pos) {
  const value = new Map();

  // Put the vertices into spheres.
  let maxRadius = 0;
  for (const g of vertices)
    maxRadius = Math.max(maxRadius, g.length);

  const spheres = Array.from(
    {length: maxRadius + 1},
    () => []
  );

  for (const g of vertices)
    spheres[g.length].push(g);


  /*
     "Go around" each sphere.

     We use the planar embedding to obtain the cyclic order:
     sort the vertices by their angle around the identity. <- lol, why
  */

  for (let r = 0; r <= maxRadius; ++r) {

    spheres[r].sort((g1, g2) => {
      const p = pos.get(g1);
      const q = pos.get(g2);

      const theta1 = Math.atan2(p.y, p.x);
      const theta2 = Math.atan2(q.y, q.x);

      return theta1 - theta2;
    });


    for (const g of spheres[r]) {

      let forcingH = null;

      for (const h of possibleHs(g)) {
        const C = constraint(h);

        // g has to actually be one member of C
        if (!C.includes(g))
          continue;

        const unspecified =
          C.filter(v => !value.has(v));

        if (unspecified.length === 1 &&
            unspecified[0] === g) {

          if (forcingH !== null) {
            /*
              This should never happen by TEP theory.
            */
            console.warn(
              "More than one forcing h for", g,
              forcingH, h
            );
          }

          forcingH = h;
        }
      }


      if (forcingH !== null) {
        // XOR of all four values must be zero.
        //
        // Since g is the only unknown,
        //
        //   x(g) = XOR(other three).

        let x = 0;

        for (const v of constraint(forcingH)) {
          if (v !== g)
            x ^= value.get(v);
        }

        value.set(g, x);

      } else {
        // Uniform random bit.
        value.set(g, Math.random() < 0.5 ? 0 : 1);
      }
    }
  }

  return value;
}


// ------------------------------------------------------------
// Drawing
// ------------------------------------------------------------

function draw() {
  const canvas = document.getElementById("tepCanvas");
  const ctx = canvas.getContext("2d");

  const R = 4;
  const shrink = 0.5;

  const width = canvas.width;
  const height = canvas.height;

  const cx = width / 2;
  const cy = height / 2;

  const available = 0.44 * Math.min(width, height);
  const firstLength = available * (1 - shrink);

  const vertices = generateBall(R);

  const pos = new Map();

  for (const g of vertices) {
    pos.set(g, coordinates(g, firstLength, shrink));
  }

  const bits = generateConfiguration(vertices, pos);

  ctx.clearRect(0, 0, width, height);

  // edges
  ctx.strokeStyle = "#777";
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  for (const g of vertices) {
    if (g === "") continue;

    const parent = g.slice(0, -1);
    const p = pos.get(parent);
    const q = pos.get(g);

    ctx.moveTo(cx + p.x, cy + p.y);
    ctx.lineTo(cx + q.x, cy + q.y);
  }

  ctx.stroke();

  // 1-bits
  for (const g of vertices) {
    if (bits.get(g) !== 1) continue;

    const p = pos.get(g);

    ctx.beginPath();
    ctx.arc(cx + p.x, cy + p.y, 7, 0, 2 * Math.PI);

    ctx.fillStyle = "#ee7d80";
    ctx.fill();

    ctx.strokeStyle = "#777";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawtsdf() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const R =
    parseInt(document.getElementById("radius").value);

  const shrink =
    parseFloat(document.getElementById("shrink").value);

  canvas.width = window.innerWidth;
  canvas.height =
    window.innerHeight -
    document.getElementById("controls").offsetHeight;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  /*
     Choose first edge length so that the infinite geometric
     sum fits comfortably in the canvas.

       L + L*s + L*s^2 + ... = L/(1-s).
  */

  const available =
    0.44 * Math.min(canvas.width, canvas.height);

  const firstLength =
    available * (1 - shrink);


  const vertices = generateBall(R);

  const pos = new Map();

  for (const g of vertices) {
    pos.set(
      g,
      coordinates(g, firstLength, shrink)
    );
  }

  const bits =
    generateConfiguration(vertices, pos);


  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  // ----------------------------------------------------------
  // Draw Cayley graph edges.
  //
  // Every nonidentity vertex is joined to the word obtained
  // by deleting its final letter.
  // ----------------------------------------------------------

  ctx.strokeStyle = "#777";
  ctx.lineWidth = 1.5;

  ctx.beginPath();

  for (const g of vertices) {
    if (g === "")
      continue;

    const parent = g.slice(0, -1);

    const p = pos.get(parent);
    const q = pos.get(g);

    ctx.moveTo(cx + p.x, cy + p.y);
    ctx.lineTo(cx + q.x, cy + q.y);
  }

  ctx.stroke();


  // ----------------------------------------------------------
  // Draw the 1's as colored balls.
  // ----------------------------------------------------------

  const radius = 7;

  for (const g of vertices) {
    if (bits.get(g) !== 1)
      continue;

    const p = pos.get(g);

    ctx.beginPath();
    ctx.arc(
      cx + p.x,
      cy + p.y,
      radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = "#ee7d80";
    ctx.fill();

    ctx.strokeStyle = "#777";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}


// ------------------------------------------------------------
// UI
// ------------------------------------------------------------

document.getElementById("tepCanvas")
  .addEventListener("click", draw);
draw();
