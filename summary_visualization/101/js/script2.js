var data = [234232, 232222, 111321, 220238, 23201]


var windowSize = {
	w : window.innerWidth
  , h : window.innerHeight
}

var padding = 50

var xScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d) {return d})])
				.range([padding, windowSize.w - padding])
				
var yScale = d3.scale.ordinal()
				.domain([0,1,2,3,4,5,6])
				.rangePoints([padding , 340])

var svg = d3.select('body').append('svg')
			.attr('width', windowSize.w)
			.attr('height', windowSize.h)

var bars = svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
					.attr('fill', 'blue')
					.attr('y', function(d,i) { return (i+1) * 50 + padding - 25})
					.attr('x', padding)
					.attr('height', 40)
					.attr('width', 0)
				.transition()
				.duration(3000)
				.ease('cubic-in-out') // easing should be a string here in D3 v3!
					.attr('width', function(d) { return xScale(d) - padding })
				
var labels = svg.selectAll('text').data(data)
				.enter()
				.append('text')
					.html(function(d) {return d})
					.attr('x', function(d) {return xScale(d) - 80 })
					.attr('y', function(d,i) { return (i+1) * 50 + padding })
					.attr('fill', 'white')
					.attr('font-family', 'sans-serif')
					.attr('font-size', '1.2em')
					.attr('opacity', 0)
				.transition()
				.duration(700)
				.delay(3000) // let the bars finish its animation first
					.attr('opacity', 1)

var bottomAxis = d3.svg.axis().scale(xScale).orient('bottom')
var leftAxis = d3.svg.axis().scale(yScale).orient('left')

var yAxis = svg.append('g')
				.attr('class','bottomAxis')
				.attr('transform', 'translate(0,340)')
				.call(bottomAxis)

var xAxis = svg.append('g')
				.attr('class','leftAxis')
				.attr('transform', 'translate('+padding+', 0)')
				.call(leftAxis)
