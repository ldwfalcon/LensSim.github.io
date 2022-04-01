prevx = 0;
prevy = 0;
prevx2 = 0;
prevy2 = 0;
prevx3 = 0;
prevy3 = 0;
prevX = [];
prevY = [];

tempx = [];
tempy = [];
round = 0;
xg = 0;
yg = 0;
t = [];
l = [];
w = 0;
h = 5;
k = 5.6;
j = 0;
b = 5.4;
r = 5.8;
m = -0.5;
ione = 0;
itwo = 0;
a = 0;
top = 0;
bottom = 0;
xpos = 0;
document.getElementById("demo").innerHTML = 0;
document.getElementById("demo2").innerHTML = 0;


t2 = [];
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
        let rows = 20;
        let radius = 7.5;
        let startX = Math.round(c.offsetWidth / 3);
        let startY = Math.round(c.offsetHeight / 3);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, startY + radius * rows / 2);

        prevX.push(this.x)
        prevY.push(this.y)


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
        if (this.x > 440) {
            if (this.x < 480) {
                prevx = this.x;
                prevy = this.y;
            }
            ctx.lineTo(Math.abs(prevx), Math.abs(prevy))

            ctx.stroke();

        }
        ctx.strokeStyle = 'red';
        ctx.beginPath();

        ctx.moveTo(Math.abs(prevx), Math.abs(prevy))
        if (this.x > 420) {

            if (this.x < 780) {
                prevx2 = this.x;
                prevy2 = this.y;
      
            }
            ctx.lineTo(prevx2, prevy2);
            console.log(Math.atan2(prevy2 - prevy, prevx2 - prevx) * 180 / Math.PI);
            document.getElementById("demo").innerHTML = Math.atan2(prevy2 - prevy, prevx2 - prevx) * 180 / Math.PI;

            ctx.stroke();

            ctx.closePath();
        }
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();

        ctx.moveTo(prevx2, prevy2)
        if (this.x > 800) {

            if (this.x < c.width) {
                prevx3 = this.x;
                prevy3 = this.y;
            }
            ctx.lineTo(prevx3, prevy3);
            console.log(Math.atan2(prevy3 - prevy2, prevx3 - prevx2) * 180 / Math.PI);
            document.getElementById("demo2").innerHTML = Math.atan2(prevy3 - prevy2, prevx3 - prevx2) * 180 / Math.PI;


            ctx.stroke();

            ctx.closePath();
        }

        round = round + 1;

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
        w = 400;
        h = 400;
        k = 450;
        j = h + k;
        b = 540;
        r = 350;
        m = -0.5;
        xpos = (j ** 2 - h ** 2) / (2 * j - 2 * h);
        ione = -Math.sqrt(-1 * (xpos - h) ** 2 + r ** 2) + w;
        itwo = Math.sqrt(-1 * (xpos - j) ** 2 + r ** 2) + w;

        // console.log(calcAngle((j^2-h^2)/(2*j-2*h), 0));
        //console.log(calcAngle((j^2-h^2)/(2*j-2*h), 0));
        //console.log(4**2);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(h, w, r, 1.475 * Math.PI + calcAngle(xpos, itwo), 0.8 * Math.PI - calcAngle(xpos, ione), 0);
        //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(j, w, r, 1.15 * Math.PI - calcAngle(xpos, ione), 1.12 * Math.PI + calcAngle(xpos, itwo), 0);
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

let currentCollisionType = CollisionTypes.push;


function switchCollisionType() {
    let label = document.getElementById("switchCollisionLabel");
    if (currentCollisionType === CollisionTypes.bounce) {
        currentCollisionType = CollisionTypes.push;
        label.textContent = "Push"
    }
    else {
        currentCollisionType = CollisionTypes.bounce;
        label.textContent = "Bounce"
    }
}
document.getElementById("switchCollision").onclick = switchCollisionType;


const maxSpeed = 150;
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let objects = [];
let light = [];
let lightHist = [];
let medium1 = [];

function createPushingExample() {
    let labelCollision = document.getElementById("switchCollisionLabel");
    currentCollisionType = CollisionTypes.push;
    labelCollision.textContent = "Push";

    objects = [];
    light = [];
    medium1 = [];
    let rows = 20;
    let radius = 7.5;
    let startX = Math.round(c.offsetWidth / 3);
    let startY = Math.round(c.offsetHeight / 3);
    let cols = Math.round(c.offsetHeight * 0.3) / radius; // 10% filled with balls (by height)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            objects.push(new Shape(startX + j * radius, startY + i * radius, radius, 0, 0, 0.2))
        }
    }

    light.push(new Shape(20, startY + radius * rows / 2, 5, 100, 2, 100))
    /** x, y, radius, ax, ay, m, vx, vy */
    let startXs = Math.round(c.offsetWidth / 3);
    let startYs = Math.round(c.offsetHeight / 3);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            medium1.push(new Shape(startXs + j * radius, startYs + i * radius, radius, 0.1, 0.1, 0.2))
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

function removeTimer(event) {
    if (timerFlag) {
        let endTime = new Date();
        let timeDiff = endTime - startTime; // in ms
        // strip the ms
        timeDiff /= 1000;
        createShape(event, Math.round(10 * timeDiff), Math.ceil(100 * timeDiff));
        console.log(objects[objects.length - 1]);
    }
    if (holdTimer) {
        window.clearTimeout(holdTimer);
    }
    timerFlag = false;
}

/** This function is ran with every animation frame and each time clears canvas, updates coordinates of all objects,
 * resolves collisions of objects and edges of canvas , resolves collisions between objects and finally draws all of them. */
function animate() {
    ctx.clearRect(0, 0, c.width, c.height);


    for (let o of light) {
        o.move(0.1);
    }
    for (let o of objects) {
        o.move(0.1);
    }
    for (let o of medium1) {
        o.move(0.1);
    }


    for (let o of objects) {
        o.resolveRoundEdgeCollision();
    }
    for (let o of medium1) {
        o.resolveRoundEdgeCollision();
    }

    let collisions = [];
    let allobs = [];
    allobs = objects.concat(light);
    allobs = allobs.concat(medium1);
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
    for (let o of objects) {
        ctx.fillStyle = "#B5D050";
        o.draw();
        ctx.fill();
    }
    for (let o of medium1) {
        ctx.fillStyle = "#003166";
        o.draw();
        ctx.fill();
    }
    for (let o of light) {
        ctx.fillStyle = "#FFDA00";
        o.draw();
        ctx.fill();
    }
    for (let o of light) {
        o.drawPath();
    }



    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

