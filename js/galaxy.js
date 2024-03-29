$(document).ready(function() {
    window.onload = function () {
        var C = document.getElementById("canv");
        var ctx = C.getContext("2d");
        var R = [];

        function Rect(x, y, w, h, color, angle, radius, angularSpeed) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = color;
            this.angle = angle;
            this.radius = radius;
            this.angularSpeed = angularSpeed;
        }

        function setSize() {
            C.width = window.innerWidth;
            C.height = window.innerHeight;
        }

        function setBg() {
            ctx.fillStyle = "rgb(20, 25, 30)";
            ctx.fillRect(0, 0, C.width, C.height);
        }

        function drawRect() {
            setBg();

            for (var i = 0; i < R.length; i++) {
                ctx.fillStyle = R[i].color;
                ctx.fillRect(R[i].x, R[i].y, R[i].w, R[i].h);
                R[i].x = C.width / 2 + Math.sin(R[i].angle) * R[i].radius;
                R[i].y = C.height / 2 + Math.cos(R[i].angle) * R[i].radius;
                R[i].angle += R[i].angularSpeed;
            }

            requestAnimFrame(drawRect);
        }

        setSize();
        setBg();

        for (var i = 0; i < 2000; i++) {
            var x = C.width / 2;
            var y = C.height / 2;
            var w = Math.random() * 3;
            var h = w;

            var r = Math.random() * 255;
            var g = Math.random() * 255;
            var b = 255;

            var color = "rgba(" + ~ ~r + "," + ~ ~g + "," + ~ ~b + ",0.8)";
            var angle = Math.random() * 2 * Math.PI;
            var radius = Math.random() * (C.width + C.height) / 3 + 20;
            var angularSpeed = 0.2 * Math.random() * Math.PI / radius;

            R.push(new Rect(x, y, w, h, color, angle, radius, angularSpeed));
        }

        drawRect();
    };

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    || 
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
    })();
});