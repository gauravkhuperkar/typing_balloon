var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var rect = [50,50, width - 50, height - 50];

var colorRange = 10,
    color = d3.scale.category10().domain(d3.range(colorRange));

var getBalloon = function(radius, xAxis, yAxis, speed, charactor) {
    return {
        radius: radius,
        color: color(Math.floor(Math.random() * colorRange)),
        x: xAxis,
        y: yAxis,
        speedY: speed,
        text: charactor
    };
};

var makeBalloonsData = function(word) {
    var balloons = [];
    var balloonsDiameter = 50;
    var characters = word.split("");
    var length = characters.length;
    var balloonXPosition = rect[2]/2;
    var balloonRadius = 25;
    var balloonYPosition = 60;
    var speed = 3;

    for(count = 0; count < length ; count++){
        var x = (balloonXPosition) + (length - (balloonsDiameter*(length/2 - count)));
        balloons.push(getBalloon(balloonRadius, x, balloonYPosition, speed, characters[count]));
    }

    return balloons;
};

var generateWordBallons = function(data) {
    var wordsBalloons = [];
    data.forEach(function(word){
        wordsBalloons.push(makeBalloonsData(word));
    });

  return wordsBalloons;
};
data = ["v","g"];

var wordBalloons= generateWordBallons(data);


var force = d3.layout.force()
    .nodes(wordBalloons[0])
    .size([width, height])
    .gravity(0)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var group = svg.selectAll("g")
    .data(wordBalloons[0]).enter().append("g")
    .attr("id","balloons")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("svg:rect")
    .attr("width", rect[2] - rect[0])
    .attr("height", rect[3] - rect[1])
    .attr("x", rect[0])
    .attr("y", rect[1])
    .style("fill", "None")
    .style("stroke", "#222222");


var circle = svg.selectAll("#balloons")
    .append("circle")
    .attr("r", function(d) { return d.radius; })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .style("fill", function(d) { return d.color; })
    .text(function(d){return d.text});

var text = svg.selectAll("#balloons").append("text")
    .attr("dx", function(d){return d.x})
    .attr("dy", function(d){return d.y})
    .text(function(d){return d.text});

function tick() {
    circle
        .each(gravity(.1))
        .attr("cy", function(d) { return d.y; });

    text
        .each(gravity(.1))
        .attr("dy", function(d) { return d.y; });
};

// Move nodes toward cluster focus.
var gravity = function(alpha) {
    return function(d) {
        if ((d.y - d.radius - 2) < rect[1])
            d.speedY = -1 * Math.abs(d.speedY);

        if(d.y<rect[3]-80)
            d.y = d.y + (-1 * d.speedY * alpha);
    };
};
