/*var canvas = d3.select("body")
			   .append("svg")
			   .attr("width", 700)
			   .attr("height",700);

var circle = canvas.append("circle")
			       .attr("cx", 100)
			       .attr("cy", 100)
			       .attr("r", 50)
			       .attr("fill", "purple");


*/
var arc, data, padding, steps = 2, r=400/2, pi = Math.PI;
var padding = 2 * r / 200;
arc = d3.svg.arc()
  .innerRadius(r-40)
  .outerRadius(r).startAngle(function(d) { return d.startAngle; })
  .endAngle(function(d) { return d.endAngle; });

data = d3.range(180).map(function(d, i) {
  i *= steps;
  return {
    startAngle: i * (pi / 180),
    endAngle: (i + 2) * (pi / 180),
    fill: d3.hsl(i, 1, .5).toString()
  };
});

d3.select("#wheel")
  .insert('svg', 'svg')
  .attr("id", "icon")
  .append('g')
    .attr("transform", "translate(" + r + "," + r + ") rotate(90) scale(-1,1)")
    .selectAll('path')
      .data(data)
      .enter()
      .append('path').attr("d", arc)
      .attr("stroke-width", 1)
      .attr("stroke", function(d) { return d.fill;})
      .attr("fill", function(d) { return d.fill; });