class BezierCurve {
    constructor(points = []) {
        this.points = points;
    }

    getPoint(t) {
        if (this.points.length === 0)
            throw new Error("Cannot get point since the Bezier curve has no control point.");

        t = Math.max(0, Math.min(t, 1));

        const n = this.points.length - 1;
        let result = { x: 0, y: 0 };
        for (let i = 0; i <= n; i++) {
            const binom = binomialCoefficient(n, i);
            const term = Math.pow(1 - t, n - i) * Math.pow(t, i);
            result.x += binom * term * this.points[i].x;
            result.y += binom * term * this.points[i].y;
        }

        return result;
    }
}

function binomialCoefficient(n, k) {
    if (k > n)
        throw new Error("n must be greater or equal to k.");

    if (k === 0 || k === n)
        return 1;

    return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
}
