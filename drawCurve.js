window.onload = function() {
    const canvas = document.getElementById("bezierCanvas");
    const ctx = canvas.getContext("2d");

    let points = [{ x: 50, y: 50 }, { x: 550, y: 550 }];
    let bezierCurve = new BezierCurve(points);
    let draggingPoint = null;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bezier curve
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let t = 0; t <= 1; t += 0.01) {
            const p = bezierCurve.getPoint(t);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Draw points
        points.forEach(point => {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function addPoint(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        points.splice(points.length - 1, 0, { x: mouseX, y: mouseY });

        bezierCurve = new BezierCurve(points);
        draw();
    }


    function removePoint(e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        points = points.filter((point, index) => {
            if (index === 0 || index === points.length - 1) return true;
            return Math.sqrt((mouseX - point.x) ** 2 + (mouseY - point.y) ** 2) >= 10;
        });

        bezierCurve = new BezierCurve(points);
        draw();
    }

    function onCanvasMouseDown(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (Math.sqrt((mouseX - point.x) ** 2 + (mouseY - point.y) ** 2) < 10) {
                draggingPoint = point;
                break;
            }
        }
    }

    function onCanvasMouseMove(e) {
        if (draggingPoint) {
            const rect = canvas.getBoundingClientRect();
            draggingPoint.x = e.clientX - rect.left;
            draggingPoint.y = e.clientY - rect.top;
            bezierCurve = new BezierCurve(points);
            draw();
        }
    }

    function onCanvasMouseUp() {
        draggingPoint = null;
    }

    canvas.addEventListener("dblclick", addPoint);
    canvas.addEventListener("contextmenu", removePoint);
    canvas.addEventListener("mousedown", onCanvasMouseDown);
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    canvas.addEventListener("mouseup", onCanvasMouseUp);

    draw();
};

