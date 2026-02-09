"use strict"

// <script type="module" src="big-rational.js"><>


//let bigRat = require("big-rational");
//import bigRat from 'big-rational.js';

//let canvas = document.getElementById("canvas");

//let RationalNumber = require('rational-number');

/*
let rn1 = rat(4, 5);
let rn2 = rat('26/4');
let rn3 = rn1.add(rn2);
console.log(rn1.toString(),"+",rn2.toString(),"=",rn3.toString());
console.log(rn1.toStringMixed("_"),"+",rn2.toStringMixed("_"),
   "=",rn3.toStringMixed("_"));
console.log(rn1.toString()+" + "+rn2.toString()+" = "+rn3.toString());
*/

function mousemove(event) {
}

function mouseup(event) {
}

function mousedown(event) {
}


/*
document.addEventListener("keyup", (e) => {
    /keysDown.add(e.code);
	
	if (e.code == 'KeyQ') {
		clearInterval(intervalId);
	}
	if (e.code == 'KeyW') {
		intervalId = setInterval(update, 100);
	}/
	if (e.code == "ArrowRight") {
		cidx += 1;
		if (draw_zeroes){
			cidx %= zz.length+1;
		}else {
			cidx %= f.piecevalues.length+1;
		} 
	}
	if (e.code == "ArrowLeft") {
		cidx -= 1;
		if (draw_zeroes ){
			cidx += zz.length+1;
			cidx %= zz.length+1;
		}else {
			cidx += f.piecevalues.length+1;
			cidx %= f.piecevalues.length+1;
		}
	}
	console.log(cidx);
	draw();
});
*/


/*function drawthickline(x, y, x2, y2) {
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.stroke();
}

function setpixel(x, y, r, g, b, a) {
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
	ctx.fillRect( x, y, 1, 1 );
}
function setthixel(x, y, r, g, b, a) {
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
	//for (let a = 0; a < 3; a++)
		//for (let b = 0; b < 3; b++)
			ctx.fillRect( 3*x, 3*y, 4, 4 );
}
function drawline(...args) {
	let [x, y, x2, y2, c] = args;
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(3*x+1, 3*y+1);
	ctx.lineTo(3*x2+1, 3*y2+1);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	if (c != null) {
		ctx.strokeStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+1+")";;
	}
	ctx.stroke();
}
function drawpolygon(lines, fill) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(lines[0][0]*3, lines[0][1]*3); // Starting point
	for (let i = 1; i < lines.length; i++) {
		ctx.lineTo(lines[i][0]*3, lines[i][1]*3); // Line to second point
	}
	ctx.closePath(); // Close the path

	// Fill and stroke the polygon
	ctx.fillStyle = "blue";
	if (fill != null) ctx.fillStyle = "rgba("+fill[0]+","+fill[1]+","+fill[2]+","+1+")"; //'blue';
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();
}

*/




function dot(u, v) {//console.log("moi");	
	//console.log(u);
	//console.log(v);
	let ret = u[0].multiply(v[0]).add(u[1].multiply(v[1]));
	//console.log(ret);
	return ret;
}
function smul(s, v) {
	s = rat(s, 1);
	return [s.multiply(v[0]), s.multiply(v[1])];
}
function vadd(u, v) {
	return [u[0].add(v[0]), u[1].add(v[1])];
}
function vsub(u, v) {
	return [u[0].subtract(v[0]), u[1].subtract(v[1])];
}
function veq(u, v) {
	return u[0].equals(v[0]) && u[1].equals(v[1]);
}
function vstr(u) {
	return "(" + u + ")";
}
function ratgeq(a, b) {
	return a.subtract(b).isPositive() || a.equals(b);
}
function ratge(a, b) {
	//console.log(a);
	return a.subtract(b).isPositive();
}
function ratleq(a, b) {
	return ratgeq(b, a);
}
function ratle(a, b) {
	//console.log(a);
	return ratge(b, a);
}
function ratsign(r) {
	if (r.equals(0)) return 0;
	return r.divide(r.abs());
}

function sqmag(v) {
	return dot(v, v);
}
// rotate 90 degrees in positive direction (CCW)
function rot90(v) {
	return [v[1].multiply(-1), v[0]]
}
function is_zero(v) {
	return v[0].equals(0) && v[1].equals(0);
}
function orthant(x_axis, y_axis, u) {
	let ux = dot(u, x_axis); // positive, negative or 0 determines horizontal
	let uy = dot(u, y_axis); // positive, negative or 0 determines horizontal
	//console.log(ux, uy);
	let uorthant = 0;
	let z = rat(0);
	if (ratge(ux, z) && uy.equals(z)) uorthant = 0.5;
	if (ratge(ux, z) && ratge(uy, z)) uorthant = 1;
	if (ux.equals(z) && ratge(uy, z)) uorthant = 1.5;
	if (ratle(ux, z) && ratge(uy, z)) uorthant = 2;
	if (ratle(ux, z) && uy.equals(z)) uorthant = 2.5;
	if (ratle(ux, z) && ratle(uy, z)) uorthant = 3;
	if (ux.equals(z) && ratle(uy, z)) uorthant = 3.5;
	if (ratge(ux, z) && ratle(uy, z)) uorthant = 4;
	return uorthant;
}
// order in counter-clockwise order, w.r.t. given orientation
// none of the the vectors may be zero
function CCWorder(x_axis, u, v) {
	//console.log(vstr(x_axis), vstr(u), vstr(v));
	let y_axis = rot90(x_axis);
	let ux = dot(u, x_axis); // positive, negative or 0 determines horizontal
	let vx = dot(v, x_axis); // positive, negative or 0 determines horizontal
	let uy = dot(u, y_axis); // positive, negative or 0 determines horizontal
	let vy = dot(v, y_axis); // positive, negative or 0 determines horizontal
	
	let uorthant = orthant(x_axis, y_axis, u);
	let vorthant = orthant(x_axis, y_axis, v);
	
	if (uorthant < vorthant) return -1;
	if (vorthant < uorthant) return 1;
	if (uorthant == vorthant && [0.5, 1.5, 2.5, 3.5].includes(uorthant)) {
		return 0;
	}
	
	//console.log("here");
	if (uy.divide(ux).equals(vy.divide(vx))) return 0;
	//console.log(uy.divide(ux).toString(), vy.divide(vx).toString());
	
	// both are in same orthant, just compare the distinct slopes
	if (ratle(uy.divide(ux), vy.divide(vx))){
		//console.log("here");
		return -1;
	}
	return 1;
}
// an affine is just v, r meaning u mapsto u.v + r
// we need to shift its values in direction w
// so now u+w mapsto u.v+r so u mapsto (u-w).v+r = u.v - w.v + r
function shift_affine(affine, w) {
	return [affine[0], dot(affine[0], w).multiply(rat(-1)).add(affine[1])];
}
function affstr(aff) {
	return "<" + vstr(aff[0]) + "| + " + aff[1];
}
// an affine is v, r meaning u mapsto u.v + r
// we want that u mapsto v^T . Mu + r so u mapsto v^TM . u + r
// well same logic as for hp's
function precompose_affine_linear(affine, matrix) {
	let invmat = matrix_transpose(matrix_inverse(matrix));
	let w = [dot(affine[0], invmat[0]), dot(affine[0], invmat[1])];
	return [w, affine[1]];
}
function affine_sum(aff, aff2) {
	return [vadd(aff[0], aff2[0]), aff[1].add(aff2[1])];
}
function matrix_determinant(M) {
	return M[0][0].multiply(M[1][1]).subtract(M[1][0].multiply(M[0][1]));
}
function smatmul(s, mat) {
	return [[s.multiply(mat[0][0]), s.multiply(mat[0][1])], [s.multiply(mat[1][0]), s.multiply(mat[1][1])]];
}
function matrix_inverse(M){
	let det = matrix_determinant(M);
	return smatmul(rat(1,1).divide(det), [[M[1][1], M[0][1].multiply(rat(-1))], [M[1][0].multiply(rat(-1)), M[0][0]]]);
}
function matrix_transpose(M){
	return [[M[0][0], M[1][0]], [M[0][1], M[1][1]]];
}

function ra(a, b) {
	if (typeof a === 'object' && a.constructor.name == "BigRational" && b != null) return a.divide(b);
	return bigRat(a, b);
}
function rat(a, b) {
	return ra(a, b);
}

// halfplane = set of vectors u such that u.v >= r or u.v > r (closed or not)
// where a vector is a pair of rational numbers
// vector is always canonized so parallel halfplanes have the same vector, and antiparallels have neg.
class HP {
	constructor(v, r, comp=">=") {
		//if (v[0].constructor.name != "RationalNumber")
		v = [rat(v[0]), rat(v[1])];
		//if (r.constructor.name != "RationalNumber")
		r = rat(r);
		//if (comp == ">=" || comp == "<=") this.closed = true;
		//else this.closed = false;
		this.closed = true;
		
		if (comp == "<=" || comp == "<") {
			v = smul(-1, v);
			r = r.multiply(rat(-1));
			//this.closed = !this.closed;
		}
		this.v = v;
		this.r = r;
		this.canonize();
		//console.log(structuredClone(this.v), this.r, this.closed);
	}
	// projective normal form in fact
	canonize() {
		//console.log(this.v);
		if (this.v[0].equals(rat(0,1))) {
			if (this.v[1].equals(rat(0,1))) return; // this is illegal, but whatethis.ver
			// u.v >= r  iff  u.v/m >= r/m
			let m = this.v[1].abs();
			this.v[1] = this.v[1].divide(m);
			this.r = this.r.divide(m); 
		} else {
			let m = this.v[0].abs();
			this.v[0] = this.v[0].divide(m);
			this.v[1] = this.v[1].divide(m);
			this.r = this.r.divide(m);
		}
	}
	
	contains(u) {
		u = [rat(u[0]), rat(u[1])];
		let d = dot(this.v, u);
		if (this.closed || true) return ratgeq(d, this.r);
		return ratge(d, this.r);
	}

	compl_str() {
		if (this.closed) return "<";
		return "<=";
	}
	complement() {
		//return new HP(smul(-1, this.v), -this.r, this.open_str())
		return new HP(this.v, this.r, this.compl_str())
	}
	is_parallel(other) {
		return veq(this.v, other.v); // since normalized
		//return dot(other, rot90(this.v)).equals(0);
	}
	is_antiparallel(other) {
		return veq(this.v, smul(-1, other.v));
	}
	properly_contains(u) {
		u = [rat(u[0]), rat(u[1])];
		let d = dot(this.v, u);
		return ratge(d, this.r);
	}
	
	right() {
		return smul(-1, rot90(this.v));
	}
	// the half-space is {u | u.v >~ r}, boundary is u.v == r
	// we need to find one such u. if v.v = t, then we can use (r/t)v since (r/t)v.v = (r/t)t = r
	some_boundary_point() {
		return smul(this.r.divide(dot(this.v, this.v)), this.v);
	}
	boundary() {
		let s = this.some_boundary_point();
		let r = this.right();
		return new Line(s, vadd(s, r), true, true);
	}
	shift(w) {
		// the half-space is {u | u.v >= r}, want
		// {u + w | u.v >= r} 
		// = {u | (u - w).v >= r}
		// = {u | u.v - w.v >= r}
		// = {u | u.v >= r + w.v}
		//console.log(w);
		//console.log("hp shift", vstr(w), "from", this.str(), "to", new HP(this.v, this.r.add(dot(w, this.v))).str());
		return new HP(this.v, this.r.add(dot(w, this.v)));
	}
	// multiply with matrix as a set
	precompose_linear(matrix) {
		// the half-space is {u | u.v >= r}, want
		// {M.u | v^T u >= r} = {u | v^T M^{-1}(u) >= r}
		//console.log(w);
		let invmat = matrix_transpose(matrix_inverse(matrix));
		let w = [dot(this.v, invmat[0]), dot(this.v, invmat[1])]; // I guess this could be matrix multiplication....
		//let w = [this.v[0].multiply(invmat[0][0]).add(this.v[1].multiply(invmat[1][0])),
		//	this.v[0].multiply(invmat[0][1]).add(this.v[1].multiply(invmat[1][1]))];
		return new HP(w, this.r);
	}
	str() {
		if (veq(this.v, [rat(1), rat(0)]) && this.r.equals(0)) return "(right half plane)";
		if (veq(this.v, [rat(-1), rat(0)]) && this.r.equals(0)) return "(left half plane)";
		if (veq(this.v, [rat(0), rat(1)]) && this.r.equals(0)) return "(top half plane)";
		if (veq(this.v, [rat(0), rat(-1)]) && this.r.equals(0)) return "(bottom half plane)";
		return "{u | u.(" + this.v + ") >= " + this.r + "}";
	}
}

// {u | u.(-1,2) >= 0}
// 

//{u | (-1,2).u >= 0}
//{u | (-1,1)M.u >= 0}

//{(u[0], 2u[1]) | u[1] - u[0] >= 0}
//{u | v M^-1 . u >= 0}

// a closed line in two-dimensional space, determined by two points
// and whether sides are rays
class Line {
	constructor(a, b, aray, bray) {
		//console.log(a, b, "kek");
		this.a = [rat(a[0]), rat(a[1])];
		this.b = [rat(b[0]), rat(b[1])];
		this.aray = aray;
		this.bray = bray;
		//console.log(this.a, this.b);
		this.calculote();
	}
	calculote() {
		this.d = this.direction();
		this.r = rot90(this.d); // left vector
		this.adot = dot(this.a, this.r); // the line is also the set of vectors whose dot with r is precisely this.
		
	}
	direction() {
		return vsub(this.b, this.a);
	}
	under180(other) {
		//console.log(this.str(), "is CCW w.r.t. ", other.str());
		let ord = CCWorder(other.direction(), this.direction(), smul(-1, other.direction())) < 0;
		//console.log(ord);
		return ord;
	}
	/*
	the line is a + (b-a)*t but equivalently,
	if r is the rot90 of (b-a), it's the set of points whose dot with r is precisely dot(a, r)...
	*/
	intersection_point(other) {
		//this.calculote();
		//other.calculote();
		
		if (dot(vsub(other.b, other.a), this.r).equals(0)) console.log("div by 0");
		
		// other line is c + (d-c)*u...
		// for particular u, the dot is dot(c, r) + dot(d-c, r)*u
		// this is adot iff  u = (adot - dot(c, r))/dot(d-c, r)
		return vadd(other.a, smul(this.adot.subtract(dot(other.a, this.r)).divide(dot(vsub(other.b, other.a), this.r)),
			vsub(other.b, other.a)));
	}
	properly_contains(point) {
		//console.log(point, this.a, !veq(point, this.a));
		//console.log(vstr(point) + vstr(this.a) + veq(point, this.a));
		//console.log(vstr(point) + vstr(this.b) + veq(point, this.b));
		//console.log("repat", !veq(point, this.a) && !veq(point, this.b) && this.contains(point))
		return (this.aray || !veq(point, this.a)) && (this.bray || !veq(point, this.b)) && this.contains(point);
	}
	contains(point) {
		//console.log("test if", this.str(), "conteains", vstr(point));
		let pd = dot(point, this.d);
		let ad = dot(this.a, this.d);
		let bd = dot(this.b, this.d);
		let ar = this.aray;
		let br = this.bray;
		if (ratle(bd, ad)) {[ad, bd, ar, br] = [bd, ad, br, ar];}
		let ret = dot(point, this.r).equals(this.adot) && (ar || ratleq(ad, pd)) && (br || ratleq(pd, bd));
		//console.log("conclusion?", ret);
		return ret;
	}
	ensure_contains(point) {
		if (this.aray) {
			if (ratleq(dot(this.d, point), dot(this.d, this.a))) {
				//console.log("derp");
				this.a = vsub(point, this.d);
			}
		}
		if (this.bray) {
			if (ratgeq(dot(this.d, point), dot(this.d, this.b))) {
				this.b = vadd(point, this.d);
			}
		}
		this.calculote(); // just in case...
	}
	cut_left_at(point) {
		this.ensure_contains(point);
		let newaray = false;
		let newbray = this.bray;
		let newa = point;
		let newb = this.b;
		return new Line(newa, newb, newaray, newbray);
	}
	cut_right_at(point) {
		this.ensure_contains(point);
		let newaray = this.aray;
		let newbray = false;
		let newa = this.a;
		let newb = point;
		return new Line(newa, newb, newaray, newbray);
	}
	str() {
		let as = "[";
		if (this.aray) as = "<";
		let bs = "]";
		if (this.bray) bs = ">";
		return as + "(" + this.a + ")-(" + this.b + ")" + bs
	}
	// cut by hp, boundary assumed not to (anti)parallel
	cut_by_hp(hp) {
		let inter = hp.boundary().intersection_point(this);
		//console.log(vstr(inter));
		if (this.properly_contains(inter)) {
			//console.log("proper");
			if (ratge(dot(hp.v, this.direction()), rat(0))) {
				//console.log("cutting start");
				let ret = new Line(this.a, this.b, this.aray, this.bray);
				ret = ret.cut_left_at(inter);
				return ret;
			}
			// strictly neg case
			else {
				//console.log("cutting end");
				let ret = new Line(this.a, this.b, this.aray, this.bray);
				ret = ret.cut_right_at(inter);
				return ret;
			}
		}
		
		// the intersection point of boundary and line is outside line
		// so enough to check endpoints (even in ray case)
		if (hp.contains(this.a) && hp.contains(this.b)) return this;
		return null;
		
	}
	is_xarallel(other) {
		//console.log(other);
		return dot(this.direction(), rot90(other.direction())).equals(rat(0));
	}
}
//let l1 = new Line([0, 0], [1, 1], true, true);
//let l2 = new Line([1, 1], [1,0], true, true);
//console.log(l1.a, l1.b);
//console.log(l2.a, l2.b);
//console.log(l1.intersection_point(l2));
//a = bbb

//console.log("heres");

var convex_id = 0; 

// Closed convex set represented as intersection of halfspaces. Allowed to simplify in place.
class Convex {
	constructor(hps, require_interior = true) {
		////if (debug4) hps.forEach((hp => console.log(hp.str())));
		//var convex_id;
		this.convex_id = convex_id++;
		//console.log(convex_id);
		this.optimize = true;
		//console.log(typeof(hps));
		if (hps.constructor.name == "HP") hps = [hps];
		this.hps = [];
		hps.forEach(hp => this.hps.push(hp));
		
		this.require_interior = require_interior;
		this.dimension = 2;
		this.empty = null;
		this.remove_parallels();
		this.is_empty_();
	}
	// remove_parallels is always called before is_empty; it by default sets empty to null i.e. unknown state
	// unless actually detects emptiness; this is O(n^2) by the way, sorry.
	remove_parallels() {
		//if (debug2) console.log("removing parallel", this.convex_id, this.empty);
		this.empty = null;
		//if (!this.optimize) return;
		if (this.hps.length == 0) {
			this.empty = false;
			return;
		}
		
		let x_axis = this.hps[0].right();
		this.hps.sort((u, v) => CCWorder(x_axis, u.right(), v.right()));
		
		for (let hp1i = 0; hp1i < this.hps.length; hp1i++) {
			let hp1 = this.hps[hp1i];
			for (let hp2i = hp1i+1; hp2i < this.hps.length; hp2i++) {
				let hp2 = this.hps[hp2i];
				let bigger;
				if (hp1.is_parallel(hp2)) {
					if (ratge(hp1.r, hp2.r)) {
						bigger = hp2i; // since dot has to be greater than r
					} else if (ratle(hp1.r, hp2.r)) {
						bigger = hp1i;
					} else if (hp1.closed) {
						bigger = hp1i;
					} else {
						bigger = hp2i;
					}
					this.hps.splice(bigger, 1);
					hp1i--; // redo this index, whichever of the two was removed.
					break;
				}
				else break; // we cannot have another parallel after first, since sorted
			}
		}
		
		// detect also empty pairs of antiparallel while we're at it
		for (let hp1i = 0; hp1i < this.hps.length; hp1i++) {
			let hp1 = this.hps[hp1i];
			for (let hp2i = hp1i+1; hp2i < this.hps.length; hp2i++) {
				let hp2 = this.hps[hp2i];
				if (hp1.is_antiparallel(hp2)) {
					// v = hp1.v
					let m2r = hp2.r.multiply(rat(-1, 1));
					// hp1 = {u | v.u >= r}
					// hp2 = {u | -v.u >= r2} = {u | v.u <= m2r}
					if (ratge(hp1.r, m2r)) {
						this.empty = true;
						return;
					}
					else if (ratle(hp1.r, m2r)) {
						//antipair = [hp1i, hp2i];
						continue;
					} else {
						//if (debug4) console.log("same case");
						if (!hp1.r.equals(m2r)) throw Exception("whats");
						if (this.require_interior) 
							this.empty = true;
						// if no interior required, dimension lowered
						this.line = hp1.boundary();
						this.dimension = 1;
						//console.log("diension <= 1");
						return;
						/*if (!hp1.closed || !hp2.closed) {
							this.empty = true;
							return;
						} else {
							this.empty = true;
						}*/
						
					}
				}
			}
		}
		
		if (this.hps.length <= 1) return;
		
		// make sure that if one side of antipair has no boundaries, we start with the nonempty side
		/*if (antipair != null) {
			if (antipair[0] != 0 && antipair[1] != 0) {
				[this.hps[0], this.hps[antipair[0]]] = [this.hps[antipair[0]], this.hps[0]];
			}
			
		}*/
		
		//let usedto = [];
		//this.hps.forEach(hp => usedto.push(hp));
		
		//let sortto = [];
		//this.hps.forEach(hp => sortto.push(hp));
		
		/*if (this.hps[1].is_antiparallel(this.hps[0])) {
			[this.hps[0], this.hps[1]] = [this.hps[1], this.hps[0]];
		}*/
		// if opens up, always order nicely
		for (let i = 0; i < this.hps.length-1; i++){
		//console.log(this.hps[i+1]);
			if (!this.hps[i+1].boundary().under180(this.hps[i].boundary())) { // a large turn can only happen once, and then we end with that
				//this.hps.forEach(hp => console.log(hp.boundary().str()));
				//console.log("rotate at", i);
				this.hps = this.hps.rotate(i+1);
				//this.hps.forEach(hp => console.log(hp.boundary().str()));
				
				break;
			}
		}
		
		for (let i = 0; i < this.hps.length-1; i++) {
			if (!this.hps[i+1].boundary().under180(this.hps[i].boundary()) && this.hps.length > 2) {
				console.log("the fuck?");
				usedto.forEach(hp => console.log(hp.boundary().str()));
				console.log("now");
				sortto.forEach(hp => console.log(hp.boundary().str()));
				
				console.log("now");
				this.hps.forEach(hp => console.log(hp.boundary().str()));
				a = cdbb;
			}
		}
		
	}
	contains_point(u) {
		if (this.empty == true) return false;
		if (this.dimension == 0) return veq(u, this.point);
		if (this.dimension == 1) {
			//console.log(this.line.str());
			return this.line.contains(u);
		}
		
		// only in 2-dimensional case should we actually use the halfplanes,
		// as in lower dims they are not optimized away
		return this.hps.every(hp => hp.contains(u));
	}
	// only works for regulars
	contains_set(other) {
		return other.setminus(this) == [];
	}
	clone() {
		let c = new Convex([], this.require_interior);
		//console.log(this.hps.constructor.name);
		this.hps.forEach(hp => c.hps.push(hp));
		//c.remove_parallels();
		//c.is_empty_();
		c.dimension = this.dimension;
		c.point = this.point;
		c.line = this.line
		c.empty = this.empty;
		c.hp_intervals = this.hp_intervals;
		return c;
	}

	is_empty() {
		//if (debug) console.log("");
		//if (debug) console.log("test if dimension ", this.dimension, "convex", this.str(), "empty");
		let ret = this.is_empty_();
		//if (debug) console.log("is it?", ret, this.empty, "dimension", this.dimension);
		//if (debug) console.log("after test:", this.str());
		return ret;
	}
	
	/*
	It is a prerequisite that we have called remove_parallels before.
	So we may assume there are no parallels now, and antiparallel half-planes always intersect.
	*/
	is_empty_() {
		////if (debug4) console.log("Sus");
		
		//debug = true;
		//console.log("here");
		//console.log(hps)
		if (!this.optimize) return false;
		
		//return false;
		//if (debug2) this.hps.forEach(hp => console.log(hp.str()));
		
		if (this.empty === true) return true;
		if (this.empty === false) return false;
		
		//if (debug2) console.log("new call!", this.convex_id,  this.dimension, this.empty);
		
		// note that if we go here, there are		no antiparallels touching
		if (this.dimension == 2) {
			
			////if (debug) console.log("dimension 2");
			if (this.hps.length < 3) {
				//console.log(this.hps);
				//console.log("we in this strange case");
				//for (let hp of this.hps) {
				//	console.log(hp.str());
				//}
				//console.log("done");
				//if (this.hps.length == 2) {
					//if (this.hps[0].is_antiparallel(this.hps[1])) {
						//console.log("gots to be true that", !this.hps[0].r.equals(this.hps[1].r.multiply(-1)));
						
					//}
				//}
				this.empty = false;
				return false;
			}
			let x_axis = this.hps[0].right();
			//console.log(x_axis, y_axis);
			//console.log(this.hps[0].str());
			
			//this.hps.sort((u, v) => CCWorder(x_axis, u.right(), v.right()));
			
			//var q = rr;
			//console.log(this.hps[0].str());
			
			//let s = this.hps[0].some_boundary_point();
			//let r = this.hps[0].right();
			// polygon formed by hps, closed always
			this.hp_intervals = [[0, this.hps[0].boundary()]];
			//if (debug2) {
				//console.log("starting with", this.hps[0].boundary().str());
				/*this.hps.forEach(hp => console.log(hp.str(), hp.boundary().str()));
				let tes = [];
				console.log("test");
				this.hps.forEach(hp => tes.push(hp));
				tes.sort((u, v) => CCWorder(x_axis, u.right(), v.right()));
				tes.forEach(hp => console.log(hp.str(), hp.boundary().str()));
				/*debug = false;
				debug2 = false;
				console.log(this.str());
				debug = true;
				debug2 = true;
			}*/
			let corner_cutters = [];
			/*
			Go through intervals one by one. If the angle to previous is at most 180,
			compute intersection point, and possibly remove the previous interval and continue.
			Then do the same on the other side.
			*/
			for (let i = 1; i < this.hps.length; i++) {
				//if (debug2)  console.log("Considering ", this.hps[i].str());
				let current = this.hps[i].boundary();
				//if (debug2)  console.log("boundary is", current.str());
				// under180 checks that the current line is oriented less than 180 degrees from direction of other
				// this is the condition under which the newly added line hits the previous (and possibly eats it)
				//if (hp_intervals.length == 0) console.log("what");
				//console.log(hp_intervals[hp_intervals.length - 1]);
				let previous = this.hp_intervals[this.hp_intervals.length - 1][1];
				//if (debug2)  console.log("previous is", previous.str());
				let leftinter = null;
				let scrape = false;
				
				if (current.under180(previous)) { // actually hits previous guys
					////if (debug2) if (i == 3) console.log("hits previous");
					
					while (true) {
						let previousi =this.hp_intervals[this.hp_intervals.length - 1][0];
						if (previousi == null) {
							console.log("what");
							return false;
						}
						
						previous = this.hp_intervals[this.hp_intervals.length - 1][1];
						
						
						// the new halfplane does not contain any points of the polygon formed so far
						// meaning we wrapped "around" and the convex set must be empty
						
						if (!current.under180(previous)) {
							this.empty = true;
							return;
						}
						
						//if (debug2) console.log("compute intersection point of", current.str(), "and", previous.str());
						
						// calculate intersection point, which may or may not be on the previous line
						leftinter = current.intersection_point(previous);
						//if (debug2)  console.log("intersection point", vstr(leftinter));
						
						if (!previous.properly_contains(leftinter)) {
							//if (debug2) console.log(vstr(leftinter), "NOT properly inside", previous.str());
						}
						
						if (previous.properly_contains(leftinter)) { // properly inside, cut and add
							//if (debug2) console.log(vstr(leftinter) + " is properly inside " + previous.str());
							this.hp_intervals[this.hp_intervals.length - 1][1] = previous.cut_right_at(leftinter);
							break;
						}
						// precisely on corner; just remove the previous, and then we can immediately add the current
						else if (previous.contains(leftinter) && veq(leftinter, previous.a)) {
							//if (debug2) console.log("on corner");
							this.hp_intervals.pop();
							if (!current.under180(this.hp_intervals[this.hp_intervals.length-1][1])) {
								//if (require_) TODO
								this.dimension = 0;
								this.point = leftinter;
								return this.is_empty_();
							}
							break;
						}
						else if (previous.contains(leftinter) && veq(leftinter, previous.b)) {
							//console.log("scrappe");
							//if (i == 3) return false;
							// just scrapes; note that can only happen on very first iteration,
							// and bray == false, and polygon already closed
							scrape = true; 
							break;
						}
						// another case is that intersection point is strictly right of prev line, and polygon already closed
						else if (previous.bray == false &&
							ratle(dot(previous.direction(), previous.b),
								  dot(previous.direction(), leftinter))) {
							
							scrape = true;
							break;
						}
						else {
							//if (debug2) console.log("pop case");
							//hp_intervals[hp_intervals.length-1][1].cut_right_at(left_intersection);
							this.hp_intervals.pop(); // remove previous, but continue the loop, possibly removing more.
						}
					
					}
					
					// in this case, we must be left with just a point.
					if (this.hp_intervals.length == 0 || !current.under180(this.hp_intervals[this.hp_intervals.length - 1][1])) {
						if (this.require_interior) {
							this.empty = true;
							return;
						} else {
							this.dimension = 0;
							this.point = leftinter;
							return this.is_empty_();
						}
					}
				}
				else {
					console.log("this should no longer happen");
					this.hps.forEach(hp => console.log(hp.str()));
					for (let ii = 0; ii < this.hps.length-1; ii++) {
						if (!this.hps[ii+1].boundary().under180(this.hps[ii].boundary())) {
							console.log("trouble!", ii);
							
						}
					}
					a = bbb
				}
				
				if (scrape) continue; // this ended up being a useless hp, and removed in first step
				
				//console.log(leftinter, current.under180(previous));
				

				
				// copy and paste for other side mostly; here we need not check for emptiness unless leftinter == null;
				// intersected on end side, so intersects on start side too
				let next = this.hp_intervals[0][1];
				let rightinter = null;
				if (next.under180(current)) { // actually hits the first guys
					//if (debug2) console.log("next is", next.str());
					//if (debug2) console.log("hits next");
					//return false;
					while (true) {
					
						if (this.hp_intervals.length == 0) {
							this.empty = true;
							return true;
						}
						let nexti = this.hp_intervals[0][0];
						next = this.hp_intervals[0][1];					
						// calculate intersection point, which may or may not be on the previous line
						rightinter = current.intersection_point(next);
						
						//console.log("intersect at", vstr(rightinter));
						//return false;
						if (next.properly_contains(rightinter)) { // properly inside, cut and add
							this.hp_intervals[0][1] = next.cut_left_at(rightinter);
							break;
						}
						// precisely on corner; just remove the first, and then we can immediately add the current
						else if (next.contains(rightinter)) {
							this.hp_intervals.shift();
							break;
						}
						else this.hp_intervals.shift(); // remove previous, but continue the loop, possibly removing more.
					}
				}
				//if (debug2) console.log("ends", leftinter != null, rightinter != null);
				
				if (leftinter != null && rightinter != null) { // compact polygon case
					this.hp_intervals.push([i, new Line(leftinter, rightinter, false, false)]);
				} else if (leftinter) { // right hand of non-compact polygon turns
					this.hp_intervals.push([i, new Line(leftinter, vadd(leftinter, current.direction()), false, true)]);
				} else if (rightinter) { // left hand of non-compact polygon turns
					this.hp_intervals.push([i, new Line(rightinter, vsub(rightinter, current.direction()), rightinter, true, false)]);
				}
				// there is just one interval so far, and the present one is antiparallel to it
				else { 
					this.hp_intervals.push([i, current]);
				}
				//if (debug2) console.log("intervals now...");
				for(let j = 0; j < this.hp_intervals.length; j++) {
					//if (debug2) console.log(this.hp_intervals[j][1].str())
				}
			}
			let newhps = [];
			for (let hp of this.hp_intervals) {
				newhps.push(this.hps[hp[0]]);
			}
			this.hps = newhps;
			this.empty = false;
			//var a = bb;
			return false;
		}
		else if (this.dimension == 1) {
			if (this.require_interior) {
				this.empty = true;
				return true;
			}
			//if (debug2) console.log("dimension 1");
			for (let hp of this.hps) {
				let b = hp.boundary();
				if (b.is_xarallel(this.line)) continue; // one of the halfplanes that give this line
				//if (debug2) console.log("cutting", this.line.str(), "by", hp.str());
				let newline = this.line.cut_by_hp(hp);
				if (newline == null) {
					this.dimension = 0;
					this.point = hp.boundary().intersection_point(this.line); // only possible case is that hp scraped
					return this.is_empty();
				}
				this.line = newline;
				//if (debug2) console.log("got", this.line.str());
			}
			this.empty = false;
			return false;
		}
		else if (this.dimension == 0) {
			if (this.require_interior) {
				this.empty = true;
				return true;
			}
			//if (debug2) console.log("dimension 0", this.empty);
			for (let hp of this.hps) {
				if (!hp.contains(this.point)) {
					this.empty = true;
					//if (debug2) console.log("dim 0 and set empty of", this.convex_id, this.empty);
					return true;
				}
			}
			this.empty = false;
			//if (debug2) console.log("dim 0 and set empty of", this.convex_id, this.empty);
			return false;
		}
		
	}
	add_hp(hp) {
		if (this.empty) return;
		if (this.dimension == 0) {
			if (!hp.contains(this.point)) this.empty = true;
			return;
		}
		
		//console.log("adding", hp.str(), "to", this.str());
		this.hps.push(hp);
		
		this.remove_parallels();
		this.is_empty_();
	}
	setminus(other) {
		if (this.empty) return [];
		if (other.empty) return [this];
		if (this.intersection(other).is_empty()) return [this];
		let thisclone = this.clone();
		let pieces = [];
		for (let i = 0; i < other.hps.length; i++) {
			let hp = other.hps[i];
			let piece = thisclone.clone();
			//console.log("other's hp", hp);
			//console.log("hp c", structuredClone(hp.closed));
			//console.log("hp c", structuredClone(hp));
			piece.add_hp(hp.complement());
			//console.log("hp c c", structure.(hp.complement().closed));
			//if (debug) console.log("piece to push", piece.str());
			if (!piece.is_empty_())
				pieces.push(piece);
			//if (debug) console.log("adding hp", hp.str());
			thisclone.add_hp(hp); // continue on the intersection with this half plane
			//if (debug) console.log("now", thisclone.str());
			//console.log("updated", thisclone);
		}
		// note that at this point thisclone contains the intersection of this with other, but we don't need that
		return pieces;
	}
	shift(v) {
		//console.log("hh");
		v = [rat(v[0]), rat(v[1])];
		//console.log("convex shift of", this.str());
		//let ret = this.clone();
		let newhps = [];
		for (let h of this.hps) {
			newhps.push(h.shift(v));
			//ret.hps[0] = h; //h.shift(v);
		}
		let ret = new Convex(newhps, this.require_interior);
		//console.log("with result",ret.str());
		
		return ret;
	}
	get_empty() {
		let c = new Convex();
		c.empty = true;
		return c;
	}
	intersection(other) {
		if (this.empty) return this;
		if (other.empty) return other;
		/*if (this.dimension == 0) {
			if (other.contains(this.point) {
				return this;
			}
			else{
				return Convex.empty();
			}
		}
		if (this.dimension == 1) {
			
		}*/
		return new Convex(this.hps.concat(other.hps), this.require_interior);
	}
	// multiply by matrix, as a set
	precompose_linear(matrix) {
		matrix = [[rat(matrix[0][0]), rat(matrix[0][1])], [rat(matrix[1][0]), rat(matrix[1][1])]];
		let newhps = [];
		for (let h of this.hps) {
			//console.log((matrix[0][0]).toString(), (matrix[0][1]).toString(), (matrix[1][0]).toString(), (matrix[1][1]).toString());
			newhps.push(h.precompose_linear(matrix));
		}
		return new Convex(newhps, this.require_interior);
	}
	size() {	
		return this.hps.length;
	}
	str() {
		//console.log("making a string");
		//let wasdebug = debug;
		//debug = false;
		
		if (this.empty) return "(empty)";
		//if (!this.require_interior) console.log("o-oh");
		if (this.dimension == 0) return "c{" + vstr(this.point) + "}";
		if (this.dimension == 1) return "c" + this.line.str();
		let ret = "d" + this.dimension + ":" + this.basic_str();
		//console.log("testing if ")

		//else console.log("none");
		
		//debug = wasdebug;
		
		return "c"+ret;
	}
	basic_str() {
		let ret = "";
		for (let i = 0; i < this.hps.length; i++) {
			ret += this.hps[i].str();
			if (i != this.hps.length-1) ret += " /\\ ";
		}
		if (ret == "") return "(full space)";
		return ret;
	}
	rightHP() {
		return new Convex(new HP([1,0], 0));
	}
	leftHP() {
		return new Convex(new HP([-1,0], 0));
	}
	topHP() {
		return new Convex(new HP([0,1], 0));
	}
	bottomHP() {
		return new Convex(new HP([0,-1], 0));
	}
	// only works for closed for now
	isEqual(other) {
		
		//console.log("test eq of", this.basic_str(), "and", other.basic_str());
		if (!this.require_interior || !other.require_interior) console.log("equality only for regulars at present");
		let ret = compareArrays(this.setminus(other), []) && compareArrays(other.setminus(this), []);
		//console.log(ret);
		
		return ret;
	}
}

Array.prototype.rotate = function(n) {
    n = n % this.length;
    return this.slice(n, this.length).concat(this.slice(0, n));
}

// unions of convex sets are lazily not a class, just list of convex
function intersection(set1, set2) {
	let ret = [];
	let points = [];
	for (let a of set1) {
		for (let b of set2) {
			let r = a.intersection(b);
			if (!r.is_empty()) {
				if (r.dimension == 0) {
					if (points.some(p => veq(p, r.point))) continue;
					points.push(r.point);
				}
				ret.push(r);
			}
		}
	}
	return simplify(ret);
}



function contains_point(set, pt) {
	for (let a of set) {
		if (a.contains_point(pt)) return true;
	}
	return false;
}

class PL {
	constructor(defa = 0) {
		// a dictionary from convex to values
		let z = rat(0, 1);
		
		let def = rat(defa, 1);
		//console.log(def);
		//this.piecevalues = [[new Convex(new HP([1, 0], 1, ">=")), [[z, z], def]],
		//					[new Convex(new HP([1, 0], 1, "<")), [[z, z], def]]];
		this.piecevalues = [[new Convex([]), [[z, z], def]]];
		this.multiple = false;
	}
	// area is a convex (or halfplane)
	// val is (v, c) meaning u maps to u.v + c (same data as a half-plane)
	set_in(area, val) {
		//if (debug3) console.log("setting in", area.str(), affstr(val));
		if (area.constructor.name == "HP") {
			area = new Convex([area]);
		} else {
			area = area.clone()
		}
		////if (debug3) console.log(area.str());
		val = [[rat(val[0][0], 1), rat(val[0][1], 1)], rat(val[1], 1)]
		////if (debug3) console.log(affstr(val));
		//console.log("check", structuredClone(area));
		//console.log("c", structuredClone(val));
		/*if (area.empty()) {
			return;
		}*/ 
		let newpiecevalues = [];
		for (let pv of this.piecevalues) {
			//console.log(pv);
			let piece = pv[0];
			//if (debug3) console.log("piece", piece.str())
			let v = pv[1];
			//console.log(piece.constructor.name);
			let pieces = piece.setminus(area);
			//if (debug3) console.log(pieces);
			
			//if (debug3) pieces.forEach(p => console.log("one pieces is", p.str()))
			//console.log(pieces);
			pieces.forEach(p => {if (!p.is_empty()) newpiecevalues.push([p, v])});
		}
		this.piecevalues = newpiecevalues;
		this.piecevalues.push([area, val]);
		//console.log(this.piecevalues.length);
		//this.cleanup();

	}
	cleanup() {
		let newpiecevalues = [];
		//console.log(this.piecevalues.length);
		
		for (let i = 0; i < this.piecevalues.length; i++) {
			if (!this.piecevalues[i][0].is_empty()) {
				newpiecevalues.push(this.piecevalues[i]);
			}
		}
		this.piecevalues = newpiecevalues;
	}
	value_at(v) {
		if (typeof v[0] !== 'object' || v[0].constructor.name != "BigRational") v = [rat(v[0]), rat(v[1])];
		this.multiple = false;
		let retval = null;
		for (let pv of this.piecevalues) {
			//console.log(pv);
			let piece = pv[0];
			let val = pv[1];
			if (piece.contains_point(v)) {
				//console.log(piece.str(), "contains", vstr(v));
				if (retval != null) this.multiple = true; //console.log("Multiple values!"); It's now normal, actually.
				//console.log(val[0][0].constructor.name, val[0][1].constructor.name, v[0].constructor.name, v[1].constructor.name, val[1].constructor.name, val[0][1].constructor.name);
				//console.log(val[0][0], val[0][1], val[1], v[0], v[1]);
				retval = dot(val[0], v).add(val[1]);
			}
		}
		if (retval==null) retval = rat(0);
		//if (retval == null) console.log("NOT ALL COVERED");
		return retval;
	}
	shift(w) {
		console.log("pl shift");
		//this.hps.
		w = [rat(w[0]), rat(w[1])];
		console.log("shifting by", vstr(w));
		let ret = new PL();
		for (let t of this.piecevalues) {
			let ts = t[0].shift(w);
			//console.log("now p");
			console.log(t[0].str(), ts.str(), affstr(t[1]), affstr(shift_affine(t[1], w)));
			ret.set_in(ts, shift_affine(t[1], w));	
		}
		console.log("that's it");
		return ret;
	}
	subtract(other) {
		return this.add(other.smul(rat(-1)));
	}
	smul(s) {
		let ret = new PL();
		for (let t of this.piecevalues) {
			
			ret.set_in(t[0], [smul(s, t[1][0]), t[1][1].multiply(s)]);
			
		}
		return ret;
	}
	add(other) {
		//if (debug) console.log("adding!", this.piecevalues.length, other.piecevalues.length);
		let ret = new PL();
		for (let p of this.piecevalues) {
			for (let p2 of other.piecevalues) {
				let inter = p[0].intersection(p2[0]);
				//if (debug) console.log(p[0].str(), "and", p2[0].str(), "intersect at", inter.str());
				//console.log("testing!")
				let emp = inter.is_empty();
				//if (debug) console.log("empty?", emp)
				if (!emp) {
					ret.set_in(inter, affine_sum(p[1], p2[1]));
				}
			}
		}
		return ret;
	}
	size() {
		let s = 0;
		for (let c of this.piecevalues) {
			s += c[0].size();
		}
		return s;
	}
	// multiply from left by matrix before computing value
	// equivalently, we move the convex sets by INVERSE of matrix.
	
	// so, previously check Mu \in C and map to AFF(Mu)
	// now map u \in M^{-1}C and map to u \mapsto 
	precompose_linear(matrix) {
		matrix = [[rat(matrix[0][0]), rat(matrix[0][1])],
				  [rat(matrix[1][0]), rat(matrix[1][1])]];
		let ret = new PL();
		let invmat = matrix_inverse(matrix);
		for (let t of this.piecevalues) {
			//if (t[1][0][0].equals(0) && t[1][0][1].equals(0) && t[1][1].equals(0)) continue;
			//console.log("looking at", t);
			//let invmat = matrix_inverse(matrix);
			//console.log("halfplane", t[0].str(), "move with", invmat, "gives", t[0].precompose_linear(invmat).str());
			ret.set_in(t[0].precompose_linear(invmat), precompose_affine_linear(t[1], invmat));
		}
		return ret;
	}
	/*zeroes() {
		for (let t of this.piecevalues) {
			t.
		}
	}*/
	zeroes() {
		//console.log("here!!!!!!!!!");
		let ret = [];
		let points = [];
		let careful = false;
		let sp = [rat(-1), rat(2, 3)];
		for (let pv of this.piecevalues) {
			/*if (pv[0].contains_point(sp)) {
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!1");
				careful = true;
			}*/
			//console.log("considering", pv[0].str(), "mapsto", affstr(pv[1]));
			if (pv[1][0][0].equals(0) && pv[1][0][1].equals(0)) { // the case where linear part is trivial
				//console.log("linear part zero, pushing all or nothing");
				if (pv[1][1].equals(0)) ret.push(new Convex(pv[0].hps, false));
			}
			else {
				// make a new convex set, in which we find the <=1-dimensional subset of pts where eval to 0
				if (careful) console.log("make new convex");
				
				// half-plane where affine give nonnegative
				let hp1 = new HP(pv[1][0], pv[1][1].multiply(-1), ">=");
				let hp2 = new HP(pv[1][0], pv[1][1].multiply(-1), "<=");
				if (careful) console.log("is in hps?", hp1.contains(sp), hp2.contains(sp), affstr(pv[1]));
				
				let c = new Convex(pv[0].hps.concat([hp1, hp2]), false);
				
				if (!c.is_empty()) {
					if (c.dimension == 0) {
						if (points.some(p => veq(p, c.point))) continue;
						points.push(c.point);
					}
					if (c.dimension == 2) {
						console.log("NOT HAPPEN");
						a = bbb;
					}
					//console.log("dimension is 1", c.dimension);
					ret.push(c);
					//console.log("print points") ;
					//points.forEach(p => console.log(vstr(p)));
				}
			}
		}
		return simplify(ret);
	}
}

function contains(set1, set2) {
	for (let con of set2) {
		if (!contains_convex(set1, con)) return false;
	}
	return true;
}
function subtract_convex(set, con) {
	let ret = [];
	for (let s of set) {
		for (let o of s.setminus(con)) {
			if (o.is_empty()) console.log("what");
			ret.push(o);
		}
	}
	return ret;
}
// set is a set of convexes, check if union contains convex
function contains_convex(set, convex) {
	// keep track of convex parts
	let list = [convex];
	for (let s of set) {
		list = subtract_convex(list, s);
		if (list == []) return true;
	}
	return false;
}

// simplify set of convexes a little
function simplify(convexes) {
	let ret = [];
	for (let i = 0; i < convexes.length; i++) {
	
		if (convexes[i].is_empty()) continue;
		/*if (convexes[i].dimension <= 1) {
			let others = [];
			for (let j = 0; j < convexes.length; j++) {
				if (!convexes[j].is_empty() && convexes[j].dimension == 2) others.push(convexes[j]);
			}
			if (contains_convex(others, convexes[i])) continue;
			
		}
		// push dim 2 directly
		if (convexes[i].dimension != 2)
			ret.push(convexes[i]);*/
			
		let ok = true;
		if (convexes[i].dimension == 0){
			
			for (let j = 0; j < convexes.length; j++) {
				if (!convexes[j].is_empty() && convexes[j].dimension != 0) if (convexes[j].contains_point(convexes[i].point)) {ok = false; break;}
			}
		}
		if (ok) ret.push(convexes[i]);
		
	}
	return ret;
}

/*
In our application, we need to make a PL function from an interval.
Given another interval, it gives the integral.
Note that this is continuous so doesn't matter how we do the sides
(but internally everything is made non-overlapping).
*/
function IntegralIntervalPL(interval) {
	if (interval.constructor.name != "Array") console.log("roplem");
	
	let c = rat(interval[0], 1);
	let d = rat(interval[1], 1);
	//console.log(interval[1])
	let f = new PL();
	//console.log("made c, d, f");
	
	// Given (a, b) such that b < a, we should return 0.
	// v[1] < v[0]  <==>  v[0] - v[1] < 0
	let blea = new HP([-1, 1], 0, "<");
	//f.set_in(blea, [[0, 0], 0]);
	// Given (a, b) such that b < c, we should return 0.
	let blec = new HP([0, 1], c, "<");
	//f.set_in(blec, [[0, 0], 0]);
	// Given (a, b) such that d < a, we should return 0.
	//console.log(d);
	let dlea = new HP([1, 0], d, ">");
	//f.set_in(dlea, [[0, 0], 0]);
	
	//console.log("made some hps");
	
	let cleqa = new HP([1, 0], c, ">=");
	let aleqb = new HP([1, -1], 0, "<=");
	let bleqd = new HP([0, 1], d, "<=");
	// Given (a, b) such that c <= a <= b <= d, return b - a -- fully inside interval.
	f.set_in(new Convex([cleqa, aleqb, bleqd]), [[-1, 1], 0]);
	//console.log("added first conc");
	// Given (a, b) such that c <= a <= d < b, return d - a
	f.set_in(new Convex([cleqa, dlea.complement(), bleqd.complement()]), [[-1, 0], d]);
	// Given (a, b) such that a < c <= b <= d, return b - c
	f.set_in(new Convex([cleqa.complement(), blec.complement(), bleqd]), [[0, 1], c.multiply(rat(-1, 1))]);
	// Given (a, b) such that a <= c <= d <= b, return d - c
	f.set_in(new Convex([cleqa.complement(), bleqd.complement()]), [[0, 0], d.subtract(c)]);
	return f;
}


const compareArrays = (a, b) =>
  a.length === b.length &&
  a.every((element, index) => element === b[index]);






function toscreen(v) {
	return [v[0].multiply(10).add(100).valueOf(), v[1].multiply(-10).add(100).valueOf()];
}

/*function draw() {
	//console.log(zz[cidx].str());
	
	drawpolygon([[0, 0], [600, 0], [600,600], [0, 600]], [255, 255, 255]);
	
	if (!draw_zeroes) {
		for (let x = 0; x < 200; x++) {
			for (let y = 0; y < 200	; y++) {
				// 20x20 area
				let xx, yy;
				[xx, yy] = [rat(x - 100, 10), rat(100 - y, 10)];
				//console.log(xx, yy);
				//if  (sub.some(hp => hp.contains([xx, yy]))) {
			
				//if (f.value_at([xx, yy]) == rat(0, 1)) {
				//f.value_at([xx,yy]);
				if (true) {
					//console.log("WHAT");
					//console.log("asd", xx.constructor.name, xx.toString(), yy.toString(), f.value_at([xx, yy]).toString());
					for (let a = 0; a < 3; a++) {
						for (let b = 0; b < 3; b++) {
							let c = [0, 0, 0];
							
							if (!draw_zeroes) {
								let v = null;
								if (cidx == f.piecevalues.length || f.piecevalues[cidx][0].contains([xx, yy]))
									v = f.value_at([xx,yy]); //.multiply(rat(1,10));
								if (v == null) c = [255, 255, 255];
								
								else if (v.equals(0)) {
									c = [0, 0, 255];
								}
								else if (ratge(v, rat(0))) {
									c = [255*v, 0, 0];
								}
								else c = [0, 255*(-v), 0];	
							}
							
							//if (compareArrays(c, [0,0,0])) console.log(v);
							
							//if (!compareArrays(c, [255,255,255])){
							//if (f.multiple) c = [25,255,255];
							//else c =[0,0,0];
							//}
							
							let colors = [[0,255,0],[0,0,255],[0,255,255],[0,155,0], [0,0,155],[0,155,155],[0,155,255],[0,255,155],[0,75,155],
								[0,155,75],[0,75,75],[0,75,255],[75,255,125],[125,255,75]];
							/*for (let i = 0; i < sub.length; i++)
								if (sub[i].contains([xx, yy])) {
									if (compareArrays(c, [0, 0, 0]))
										c = colors[i];
									else
										c = [255, 0, 0];
								}*/
							// bunch of convex sets
							/*if(draw_zeroes) {
								c = [255, 255, 255];
								//for (let z of zz) {
								for (let z = 0; z < zz.length; z++) {
									if (cidx != zz.length && z != cidx) continue;
									if (zz[z].contains([xx, yy])) {
										c = [0,0,0];
										//console.log(f.value_at([xx, xx]));
										break;
									}
								}
							}*
							
							//if (xx.equals(0) || xx.equals(1) || xx.equals(-1) || yy.equals(0) || yy.equals(1) || yy.equals(-1)) c = [0, 255, 125];
							
							setpixel(3*x+a, 3*y+b, c[0], c[1], c[2], 255);
							
							if (a == 1 && b == 1 && (xx.equals(0) || xx.equals(1) || xx.equals(-1) || yy.equals(0) || yy.equals(1) || yy.equals(-1))) {
								setpixel(3*x+a, 3*y+b, 255,125,0, 255);
							}
							
							//if(xx.equals(5) && yy.equals(5)) {
							//	console.log(v);
							//}
						}
					}
				}
			}
		}
	}
	else {
		
		let rightlimit = new HP([-1, 0], -10);
		let leftlimit = new HP([1, 0], -10);
		let toplimit = new HP([0, 1], -10);
		let bottomlimit = new HP([0, -1], -10);
		//debug4 = true;
		let square = new Convex([rightlimit, leftlimit, toplimit, bottomlimit]);
		
		//console.log("!!!!!!!!!!!!!!", square.str());

		for (let z = 0; z < zz.length; z++) {
			if (cidx != zz.length && z != cidx) continue;
			let con = zz[z];
			con = con.intersection(square);
			if (!con.is_empty() && con.dimension == 2) {
				con.is_empty();
				let pts = [];
				for (let hpi of con.hp_intervals) {
					let l = hpi[1];
					pts.push([...toscreen(l.a)]);
				}
				drawpolygon(pts);
			}
		}
		
		// h
		drawline (...toscreen([rat(-10), rat(0)]), ...toscreen([rat(10), rat(0)]), [200,200,200]);
		drawline (...toscreen([rat(-10), rat(1)]), ...toscreen([rat(10), rat(1)]), [200,200,200]);
		drawline (...toscreen([rat(-10), rat(-1)]), ...toscreen([rat(10), rat(-1)]), [200,200,200]);
		drawline (...toscreen([rat(0), rat(-10)]), ...toscreen([rat(0), rat(10)]), [200,200,200]);
		drawline (...toscreen([rat(1), rat(-10)]), ...toscreen([rat(1), rat(10)]), [200,200,200]);
		drawline (...toscreen([rat(-1), rat(-10)]), ...toscreen([rat(-1), rat(10)]), [200,200,200]);

		for (let z = 0; z < zz.length; z++) {
			if (cidx != zz.length && z != cidx) continue;
			
			let con = zz[z];
			
			//console.log("test");
			//console.log(con.str(), square.str());
			con = con.intersection(square);
			//console.log("here, drawing", con.str());
			if (!con.is_empty() && con.dimension == 1) {
				// console.log(con.str());
				let x;
				let y;
				let x2;
				let y2;
				[x, y] = toscreen(con.line.a);
				[x2, y2] = toscreen(con.line.b);
				
				drawline(x, y, x2, y2, [0,255,0]);
				//console.log("drew", 3*x, 3*y, 3*x2, 3*y2)
				
			}
		}

		for (let z = 0; z < zz.length; z++) {
			if (cidx != zz.length && z != cidx) continue;
			let con = zz[z];
			con = con.intersection(square);
			if (!con.is_empty() && con.dimension == 0) {
				let xx;
				let yy;
				let [x, y] = toscreen(con.point);
				setthixel(x, y, 255,125,0, 255);
			}
		}

		
	}

	//console.log(c.empty())

	drawthickline(0, 0, 600, 0);
	drawthickline(600, 0, 600, 600);
	drawthickline(600, 600, 0, 600);
	drawthickline(0, 600, 0, 0);
}*/


var cubes_from_list = function(list) {
	let f = IntegralIntervalPL(list[0]); //new PL();
	for (let i = 1; i < list.length; i++) {
		f = f.add(IntegralIntervalPL(list[i]));
	}
	let g1 = f.precompose_linear([[0, 1], [-1, 2]]); // g1(a, b) = f(b, 2b-a)
	let h1 = f.subtract(g1); 
	let g2 = f.precompose_linear([[-1, 2], [-2, 3]]); // g2(a, b) = f(2b-a, 3b-2a)
	//let h2 = f.subtract(g2);
	let h3 = g1.subtract(g2);
	return [h1.zeroes(), /*h2.zeroes()*/ [], h3.zeroes()]; // 12, 13, 23
}

/*if(typeof module !== "undefined")
{
	if(module.hasOwnProperty("exports")){module.exports=[cubes_from_list, Convex, HP]}
}*/


window.cubes_from_list = cubes_from_list
window.Convex = Convex
window.HP = HP