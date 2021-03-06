(function () {
    const canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth + 50;
        canvas.height = window.innerHeight + 50;
    }
    resizeCanvas();
})();
function allVars() {
    prevx = 0;
    prevy = 0;
    prevx2 = 0;
    prevy2 = 0;
    prevx3 = 0;
    prevy3 = 0;
    prevxx = 0;
    prevyy = 0;
    prevx22 = 0;
    prevy22 = 0;
    prevx33 = 0;
    prevy33 = 0;
    prevX = [];
    prevY = [];
    prevXX = [];
    prevYY = [];
    lightSlope = 0;
    lightSlope2 = 0;
    lightSlopee = 0;
    lightSlope22 = 0;
    tempx = [];
    tempy = [];
    tempxx = [];
    tempyy = [];
    round = 0;
    xg = 0;
    yg = 0;
    t = [];
    l = [];
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;
    x11 = 0;
    x22 = 0;
    y11 = 0;
    y22 = 0;
    a = 0;
    top = 0;
    bottom = 0;
    lightYstart2 = 0;
    lightYstart22 = 0;
    xrow = 0;
    yrow = 0;
    rowLength = 0;
}
allVars();
function vars() {
    var sliderRange2 = document.getElementById("densitySliderRange");
    var output2 = document.getElementById("dens");
    output2.innerHTML = sliderRange2.value;
    radius = Math.round(sliderRange2.value);
    sliderRange2.oninput = function () {
        output.innerHTML = this.value;

    }
    rows = 50;
    h = Math.round(c.offsetWidth / 3);
    var sliderRange3 = document.getElementById("widthSliderRange");
    var output = document.getElementById("wid");
    output.innerHTML = (sliderRange3.value);
    k = Math.round(sliderRange3.value);

    sliderRange3.oninput = function () {
        output.innerHTML = this.value;

    }
    j = h + k;
    b = 540;
    var sliderRange = document.getElementById("radiusSliderRange");
    var output = document.getElementById("rad");
    output.innerHTML = sliderRange.value;
    r = sliderRange.value;

    sliderRange.oninput = function () {
        output.innerHTML = this.value;

    }
    xpos = (j ** 2 - h ** 2) / (2 * j - 2 * h);
    w = Math.round(c.offsetHeight / 2);
    ione = -Math.sqrt(-1 * (xpos - h) ** 2 + r ** 2) + w;
    itwo = Math.sqrt(-1 * (xpos - j) ** 2 + r ** 2) + w;
    var sliderRange4 = document.getElementById("overlapSliderRange");
    var output = document.getElementById("ove");
    output.innerHTML = (sliderRange4.value);
    overlap = Math.round(sliderRange4.value);

    sliderRange4.oninput = function () {
        output.innerHTML = this.value;

    }
    rowsHLength = Math.round(Math.abs(ione - itwo) / (radius * overlap));
    startX = Math.round(c.offsetWidth / 3);
    startY = Math.round(c.offsetHeight / 3);
    startYY = Math.round(c.offsetHeight / 2);
    lightYstart = startY;
    lightYstartt = startYY;
    t2 = [];
}
function calcAngle(opposite, adjacent) {
    return Math.atan(opposite / adjacent);
}
/** Describes object (circle) drawn on canvas and its attributes. */
class Shape {
    constructor(x, y, radius, ax, ay, m, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.ax = ax;
        this.ay = ay;
        this.m = m;
        this.vx = vx;
        this.vy = vy;
        this.fx = 0;
        this.fy = 0;

    }

    move(dt) { //dt = time deltas
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        if (this.vx > maxSpeed) {
            this.vx = maxSpeed
        }
        if (this.vx < -maxSpeed) {
            this.vx = -maxSpeed
        }
        if (this.vy > maxSpeed) {
            this.vy = maxSpeed
        }
        if (this.vy < -maxSpeed) {
            this.vy = -maxSpeed
        }
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    draw() {
        //draw a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();



    }
    drawPath() {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, lightYstart);

        prevX.push(this.x);
        prevY.push(this.y);

        tempx.concat(prevX);
        tempy.concat(prevY);

        /**for (let i = 0; i < round; i++) { 
            xg=tempx.pop();
            yg=tempy.pop();
            ctx.lineTo(Math.abs(xg), Math.abs(yg));
        }**/
        /** for(let i of prevY){
             t = tempx.toLocaleString();
             ctx.lineTo(Math.abs(t), Math.abs(i))
         }**/
        if (this.x < j - r / 2) {
            if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                    if (this.x < h + r) {
                        prevx = this.x;
                        prevy = this.y;
                    }
                }
            }

        }
        ctx.lineTo(Math.abs(prevx), Math.abs(prevy))

        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 5;
        ctx.setLineDash([5, 15]);

        if (this.x > h) {
            if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                if (this.x < j) {
                    lightSlope = (this.y - (lightYstart)) / (this.x - 20);
                    x1 = (-(-2 * h + 2 * lightSlope * lightYstart) - Math.sqrt((-2 * h + 2 * lightSlope * lightYstart - 2 * lightSlope * w) ** 2 - 4 * (1 + lightSlope ** 2) * (h ** 2 + lightYstart ** 2 + w ** 2 - 2 * lightYstart * w - r ** 2))) / (2 * (1 + lightSlope ** 2));
                    y1 = lightSlope * (-(-2 * h + 2 * lightSlope * lightYstart) - Math.sqrt((-2 * h + 2 * lightSlope * lightYstart - 2 * lightSlope * w) ** 2 - 4 * (1 + lightSlope ** 2) * (h ** 2 + lightYstart ** 2 + w ** 2 - 2 * lightYstart * w - r ** 2))) / (2 * (1 + lightSlope ** 2)) + lightYstart;

                }
            }
            ctx.moveTo(prevx - (-2 * (x1 - j)) / (2 * Math.PI), prevy + (2 * (y1 - w)) / (2 * Math.PI));
            ctx.lineTo(prevx + (-2 * (x1 - j)) / (2 * Math.PI), prevy - (2 * (y1 - w)) / (2 * Math.PI));
        }

        ctx.stroke();

        ctx.setLineDash([]);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(Math.abs(prevx), Math.abs(prevy))
        if (this.x < j) {
            if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                    if (this.x < j) {

                        prevx2 = this.x;
                        prevy2 = this.y;
                    }
                }
                document.getElementById("demo").innerHTML = '??1 of 1: ' + (Math.round(Math.atan2(prevy2 - prevy, prevx2 - prevx) * 180 / Math.PI * 1000) / 1000);
            }

        }
        ctx.lineTo(prevx2, prevy2);
        ctx.stroke();

        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 5;
        ctx.setLineDash([5, 15]);

        if (this.x < j) {
            if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                if (this.x < j) {
                    lightSlope2 = (this.y - (prevy)) / (this.x - prevx);
                    lightYstart2 = prevy;
                    x2 = (-(-2 * j + 2 * lightSlope2 * lightYstart2) - Math.sqrt((-2 * j + 2 * lightSlope2 * lightYstart2 - 2 * lightSlope2 * w) ** 2 - 4 * (1 + lightSlope2 ** 2) * (j ** 2 + lightYstart2 ** 2 + w ** 2 - 2 * lightYstart2 * w - r ** 2))) / (2 * (1 + lightSlope2 ** 2));
                    y2 = lightSlope2 * (-(-2 * j + 2 * lightSlope2 * lightYstart2) - Math.sqrt((-2 * j + 2 * lightSlope2 * lightYstart2 - 2 * lightSlope2 * w) ** 2 - 4 * (1 + lightSlope2 ** 2) * (j ** 2 + lightYstart2 ** 2 + w ** 2 - 2 * lightYstart2 * w - r ** 2))) / (2 * (1 + lightSlope2 ** 2)) + lightYstart2;
                }
            }
        }

        ctx.moveTo(prevx2 - (-2 * (x2 - j)) / (2 * Math.PI), prevy2 - (2 * (y2 - w)) / (2 * Math.PI));
        ctx.lineTo(prevx2 + (-2 * (x2 - j)) / (2 * Math.PI), prevy2 + (2 * (y2 - w)) / (2 * Math.PI));
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prevx2, prevy2)
        if (this.x > 800) {
            if (this.x < c.width) {
                prevx3 = this.x;
                prevy3 = this.y;
            }
            ctx.lineTo(prevx3, prevy3);
            document.getElementById("demo2").innerHTML = '??2 of 1: ' + Math.round(Math.atan2(prevy3 - prevy2, prevx3 - prevx2) * 180 / Math.PI * 1000) / 1000;
            ctx.stroke();
            ctx.closePath();
        }
        if (this.x > c.width - 50) {
            this.vx = 0;
            this.vy = 0;
            this.ax = 0;
            this.ay = 0;
        }



    }
    drawPath2() {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, lightYstartt);

        prevX.push(this.x);
        prevY.push(this.y);

        tempxx.concat(prevXX);
        tempyy.concat(prevYY);

        /**for (let i = 0; i < round; i++) { 
            xg=tempx.pop();
            yg=tempy.pop();
            ctx.lineTo(Math.abs(xg), Math.abs(yg));
        }**/
        /** for(let i of prevY){
             t = tempx.toLocaleString();
             ctx.lineTo(Math.abs(t), Math.abs(i))
         }**/
        if (this.x < j - r / 2) {
            if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                    if (this.x < h + r) {
                        prevxx = this.x;
                        prevyy = this.y;
                    }
                }
            }
        }
        ctx.lineTo(Math.abs(prevxx), Math.abs(prevyy))

        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 5;
        ctx.setLineDash([5, 15]);


        if (this.x > h) {
            if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
                if (this.x < h + r) {
                    lightSlopee = (this.y - (lightYstartt)) / (this.x - 20);
                    x11 = (-(-2 * j + 2 * lightSlopee * lightYstartt) - Math.sqrt((-2 * j + 2 * lightSlopee * lightYstartt - 2 * lightSlopee * w) ** 2 - 4 * (1 + lightSlopee ** 2) * (j ** 2 + lightYstartt ** 2 + w ** 2 - 2 * lightYstartt * w - r ** 2))) / (2 * (1 + lightSlopee ** 2));
                    y11 = lightSlopee * (-(-2 * j + 2 * lightSlopee * lightYstartt) - Math.sqrt((-2 * j + 2 * lightSlopee * lightYstartt - 2 * lightSlopee * w) ** 2 - 4 * (1 + lightSlopee ** 2) * (j ** 2 + lightYstartt ** 2 + w ** 2 - 2 * lightYstartt * w - r ** 2))) / (2 * (1 + lightSlopee ** 2)) + lightYstartt;
                }
            }
            ctx.moveTo(prevxx - (-2 * (x11 - j)) / (2 * Math.PI), prevyy + (2 * (y11 - w)) / (2 * Math.PI));
            ctx.lineTo(prevxx + (-2 * (x11 - j)) / (2 * Math.PI), prevyy - (2 * (y11 - w)) / (2 * Math.PI));
        }

        ctx.stroke();

        ctx.setLineDash([]);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(Math.abs(prevxx), Math.abs(prevyy));
        if (this.x < j) {
            if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                    if (this.x < j) {
                        prevx22 = this.x;
                        prevy22 = this.y;
                    }
                }
                document.getElementById("demoo").innerHTML = '??1 of 2: ' + Math.round(Math.atan2(prevy22 - prevyy, prevx22 - prevxx) * 180 / Math.PI * 1000) / 1000;
            }
        }
        ctx.lineTo(prevx22, prevy22);
        ctx.stroke();

        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 5;
        ctx.setLineDash([5, 15]);

        if (this.x < j) {
            if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
                if (this.x < j) {
                    lightSlope22 = (this.y - (prevyy)) / (this.x - prevxx);
                    lightYstart22 = prevyy;
                    x22 = (-(-2 * h + 2 * lightSlope22 * lightYstart22) - Math.sqrt((-2 * h + 2 * lightSlope22 * lightYstart22 - 2 * lightSlope22 * w) ** 2 - 4 * (1 + lightSlope22 ** 2) * (h ** 2 + lightYstart22 ** 2 + w ** 2 - 2 * lightYstart22 * w - r ** 2))) / (2 * (1 + lightSlope22 ** 2));
                    y22 = lightSlope22 * (-(-2 * h + 2 * lightSlope22 * lightYstart22) - Math.sqrt((-2 * h + 2 * lightSlope22 * lightYstart22 - 2 * lightSlope22 * w) ** 2 - 4 * (1 + lightSlope22 ** 2) * (h ** 2 + lightYstart22 ** 2 + w ** 2 - 2 * lightYstart22 * w - r ** 2))) / (2 * (1 + lightSlope22 ** 2)) + lightYstart22;
                }
            }
        }
        ctx.moveTo(prevx22 - (-2 * (x22 - h)) / (2 * Math.PI), prevy22 + (2 * (y2 - w)) / (2 * Math.PI));
        ctx.lineTo(prevx22 + (-2 * (x22 - h)) / (2 * Math.PI), prevy22 - (2 * (y2 - w)) / (2 * Math.PI));
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prevx22, prevy22)
        if (this.x > 800) {
            if (this.x < c.width) {
                prevx33 = this.x;
                prevy33 = this.y;
            }
            ctx.lineTo(prevx33, prevy33);
            document.getElementById("demo22").innerHTML = '??2 of 2: ' + Math.round(Math.atan2(prevy33 - prevy22, prevx33 - prevx22) * 180 / Math.PI * 1000) / 1000;
            ctx.stroke();
            ctx.closePath();
        }
        if (this.x > c.width - 50) {
            this.vx = 0;
            this.vy = 0;
            this.ax = 0;
            this.ay = 0;
        }
    }

    resolveEdgeCollision() {
        // Detect collision with right wall.
        if (this.x + this.r > c.width - 750) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = c.width - 750 - this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > c.height - 200) {
            this.y = c.height - 200 - this.r;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 500) {
            this.x = this.r + 500;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }
        // Detect collision with top wall.
        else if (this.y - this.r < 300) {
            this.y = this.r + 300;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

    }
    resolveRoundEdgeCollision() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        //ctx.arc(h, w, r, 1.46 * Math.PI + calcAngle(xpos, itwo), 0.725 * Math.PI - calcAngle(xpos, ione), 0);
        ctx.arc(h, w, r, calcAngle(xpos - h, itwo - w), calcAngle(xpos - h, ione - w), 1);
        //opp/adj  
        //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        //ctx.arc(j, w, r, 1.165 * Math.PI - calcAngle(xpos, ione), 1.02 * Math.PI + calcAngle(xpos, itwo), 0);
        ctx.arc(j, w, r, Math.PI - calcAngle(xpos - h, itwo - w), Math.PI - calcAngle(xpos - h, ione - w), 0);
        ctx.stroke();
        ctx.closePath();
        // Detect collision with right wall.
        ctx.beginPath();
        ctx.moveTo(xpos, ione);
        ctx.lineTo(xpos, itwo);
        ctx.stroke();
        ctx.closePath();


        // Detect collision with left wall.
        if (Math.sqrt((this.x - j) ** 2 + (this.y - w) ** 2) > r) {
            this.x = this.x + this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }
        // Detect collision with right wall.
        if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) > r) {
            this.x = this.x - this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y - this.r < ione) {
            this.y = this.y - this.r + 40;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }


        // Detect collision with top wall.
        else if (this.y - this.r > itwo) {
            this.y = this.r + this.y - 40;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

    }
    resolveMedium2Collision() {

        // Detect collision with left wall.
        if (Math.sqrt((this.x - h) ** 2 + (this.y - w) ** 2) < r) {
            this.x = this.x + 4 * this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }
        // Detect collision with right wall.
        if (this.x + this.r > c.width - 50) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = c.width - 4 * this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > c.height - 200) {
            this.y = c.height - 200 - this.r;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }


        // Detect collision with top wall.
        else if (this.y - this.r < 300) {
            this.y = this.r + 300;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

    }
}

/** Object describing collision between 2 objects */
class Collision {
    constructor(o1, o2, dx, dy, d) {
        this.o1 = o1;
        this.o2 = o2;

        this.dx = dx;
        this.dy = dy;
        this.d = d;
    }
}

function checkCollision(o1, o2) {
    let dx = o2.x - o1.x;
    let dy = o2.y - o1.y;
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (d < o1.r + o2.r) {
        return {
            collisionInfo: new Collision(o1, o2, dx, dy, d),
            collided: true
        }
    }
    return {
        collisionInfo: null,
        collided: false
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Resolves collision by pushing objects away from each other. */
function resolveCollision(info) {  // "info" is a Collision object from above
    let nx = info.dx / info.d;  // Compute iegen vectors
    let ny = info.dy / info.d;
    let s = info.o1.r + info.o2.r - info.d;
    info.o1.x -= nx * s / 2;  // Move first object by half of collision size
    info.o1.y -= ny * s / 2;
    info.o2.x += nx * s / 2;  // Move other object by half of collision size in opposite direction
    info.o2.y += ny * s / 2;
}

/** Resolves collision by bouncing objects. */
function resolveCollisionWithBounce(info) {
    let nx = info.dx / info.d;
    let ny = info.dy / info.d;
    let s = info.o1.r + info.o2.r - info.d;
    info.o1.x -= nx * s / 2;
    info.o1.y -= ny * s / 2;
    info.o2.x += nx * s / 2;
    info.o2.y += ny * s / 2;

    // Magic...
    let k = -2 * ((info.o2.vx - info.o1.vx) * nx + (info.o2.vy - info.o1.vy) * ny) / (1 / info.o1.m + 1 / info.o2.m);
    info.o1.vx -= k * nx / info.o1.m;  // Same as before, just added "k" and switched to "m" instead of "s/2"
    info.o1.vy -= k * ny / info.o1.m;
    info.o2.vx += k * nx / info.o2.m;
    info.o2.vy += k * ny / info.o2.m;
}

function moveWithGravity(dt, o) {  // "o" refers to Array of objects we are moving
    for (let o1 of o) {  // Zero-out accumulator of forces for each object
        o1.fx = 0;
        o1.fy = 0;
    }
    for (let [i, o1] of o.entries()) {  // For each pair of objects...
        for (let [j, o2] of o.entries()) {
            if (i < j) {  // To not do same pair twice
                let dx = o2.x - o1.x;  // Compute distance between centers of objects
                let dy = o2.y - o1.y;
                let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (r < 1) {  // To avoid division by 0
                    r = 1;
                }
                let f = (1000 * o1.m * o2.m) / Math.pow(r, 2);  // Compute force for this pair
                let fx = f * dx / r;  // Break it down
                let fy = f * dy / r;
                o1.fx += fx;  // Accumulate for first object
                o1.fy += fy;
                o2.fx -= fx;  // And for second object in opposite direction
                o2.fy -= fy;
            }
        }
    }
    for (let o1 of o) {  // for each object update...
        let ax = o1.fx / o1.m;  // ...acceleration
        let ay = o1.fy / o1.m;

        o1.vx += ax * dt;  // ...speed
        o1.vy += ay * dt;

        o1.x += o1.vx * dt;  // ...position
        o1.y += o1.vy * dt;
    }
}

const CollisionTypes = Object.freeze({
    "push": resolveCollision,
    "bounce": resolveCollisionWithBounce
});
let gravity = false;



const maxSpeed = 150;
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let objects = [];
let light = [];
let light2 = [];
let lightHist = [];
let lensMedium = [];
let medium2 = [];

function createPushingExample() {
    let labelCollision = document.getElementById("switchCollisionLabel");
    currentCollisionType = CollisionTypes.push;

    objects = [];
    light = [];
    lensMedium = [];
    light2 = [];
    medium2 = [];

    let cols = (1 / Math.PI) * h / (radius * overlap); // 10% filled with balls (by height)

    for (let i = 0; i < rowsHLength; i++) {
        yrow = itwo - i * radius * overlap;
        xrow = Math.abs(Math.abs((-(-2 * j) - Math.sqrt((-2 * j) ** 2 - 4 * (j ** 2 + yrow ** 2 + w ** 2 - 2 * yrow * w - r ** 2))) / 2) - Math.abs((-(-2 * h) + Math.sqrt((-2 * h) ** 2 - 4 * (h ** 2 + yrow ** 2 + w ** 2 - 2 * yrow * w - r ** 2))) / 2));
        rowLength = Math.round(xrow / (radius * overlap));

        for (let n = 0; n < rowLength; n++) {
            objects.push(new Shape(Math.abs((-(-2 * j) - Math.sqrt((-2 * j) ** 2 - 4 * (j ** 2 + yrow ** 2 + w ** 2 - 2 * yrow * w - r ** 2))) / 2) + overlap * n * radius, itwo - radius * i * overlap, radius, 0, 0, 200))
        }
    }

    light.push(new Shape(20, lightYstart, 4, 100, 0, 10))
    light2.push(new Shape(20, lightYstartt, 4, 100, 0, 10))

    /** x, y, radius, ax, ay, m, vx, vy */
    let startXs = Math.round(c.offsetWidth / 2.85);
    let startYs = Math.round(c.offsetHeight / 3);

    for (let i = 0; i < rows; i += 5) {
        for (let j = 0; j < 0; j += 5) {
            medium2.push(new Shape(startXs + j * radius + k, startYs + i * radius, radius / 4, 0, 0.0, 200))
        }
    }
}


document.getElementById("pushExample").onclick = createPushingExample;


/** Used with click + hold events to create circles (objects). */
function createShape(event, radius = 10, mass = 100) {
    let x = event.pageX - c.offsetLeft;
    let y = event.pageY - c.offsetTop;

    objects.push(new Shape(x, y, radius, getRandomInt(-1, 1), getRandomInt(-1, 1), mass));
}

let holdTimer;
let timerFlag;
let startTime = new Date();
function mouseDown() {
    startTime = new Date();
    holdTimer = window.setTimeout(function () {
        timerFlag = true;
    }, 100);
}

c.addEventListener("mousedown", mouseDown);
c.addEventListener("mouseup", function (event) {
    removeTimer(event)
}, false);
function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /*set the position of the magnifier glass:*/
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
function removeTimer(event) {
    if (timerFlag) {
        let endTime = new Date();
        let timeDiff = endTime - startTime; // in ms
        // strip the ms
        timeDiff /= 1000;
        createShape(event, Math.round(10 * timeDiff), Math.ceil(100 * timeDiff));
    }
    if (holdTimer) {
        window.clearTimeout(holdTimer);
    }
    timerFlag = false;
}
function clearer() {
    var command = document.getElementById("clear");
    console.log(111);
    ctx.clearRect(0, 0, c.width, c.height);
    allVars();
    vars();
    window.cancelAnimationFrame(animate);
}
/** This function is ran with every animation frame and each time clears canvas, updates coordinates of all objects,
 * resolves collisions of objects and edges of canvas , resolves collisions between objects and finally draws all of them. */
function animate() {
    vars();
    ctx.clearRect(0, 0, c.width, c.height);



    for (let o of light) {
        o.move(0.1);
    }
    for (let o of light2) {
        o.move(0.1);
    }
    ctx.globalAlpha = 0.4;

    for (let o of objects) {
        o.move(0.1);
    }

    // for (let o of medium2) {
    //   o.move(0.1);
    //}
    for (let o of objects) {
        o.resolveRoundEdgeCollision();
    }
    for (let o of lensMedium) {
        o.resolveRoundEdgeCollision();
    }
    // for (let o of medium2) {
    //   o.resolveMedium2Collision();
    //}
    ctx.globalAlpha = 1;

    let collisions = [];
    let allobs = [];
    allobs = objects.concat(light);
    allobs = allobs.concat(light2);
    // allobs = allobs.concat(medium2)
    for (let [i, o1] of allobs.entries()) {
        for (let [j, o2] of allobs.entries()) {
            if (i < j) {
                let { collisionInfo, collided } = checkCollision(o1, o2);
                if (collided) {
                    collisions.push(collisionInfo);
                }
            }
        }
    }


    for (let col of collisions) {
        currentCollisionType(col)  // resolveCollision(col)
    }
    ctx.globalAlpha = 0.5;

    for (let o of objects) {
        ctx.fillStyle = "#003166";

        o.draw();
        ctx.fill();
    }
    ctx.globalAlpha = 0.4;

    // for (let o of medium2) {
    //   ctx.fillStyle = "#FFDA00";
    // o.draw();
    //ctx.fill();
    //}
    ctx.globalAlpha = 1;

    for (let o of light) {
        ctx.fillStyle = "#FFDA00";
        o.draw();
        ctx.fill();
    }
    for (let o of light) {
        o.drawPath();
    }
    for (let o of light2) {
        ctx.fillStyle = "#FFDA00";
        o.draw();
        ctx.fill();
    }
    for (let o of light2) {
        o.drawPath2();
    }
    window.requestAnimationFrame(animate);


}
window.requestAnimationFrame(animate);



