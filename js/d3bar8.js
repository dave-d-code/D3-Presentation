// D3 bar graph code

// array to push external data into
var bardata = [];

// needed later to record original colour of bar when tooltip is used.
var tempColour;

d3.tsv('js/data.tsv', function(data) {

	// place tsv data in an array we can use.
	for (key in data) {
		bardata.push(data[key].value);
		console.log(bardata);
	}

	var margin = {top: 30, right: 30, bottom: 40, left: 50};

	var height = (400 - margin.top - margin.bottom),
		width = (600 - margin.left - margin.right),
		barWidth = 50,
		barOffset = 5;

	// to give a colour scale to the bars
	var colours = d3.scale.linear()
					.domain([0, bardata.length * 0.33, bardata.length * 0.66, bardata.length])
					.range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

	// domain relates to the data
	// range is what scale you want to fit it into

	// yScale determines max height of bars
	var yScale = d3.scale.linear()
				.domain([0, d3.max(bardata)])
				.range([0, height]);

	// xScale determines width of bars
	var xScale = d3.scale.ordinal()
				.domain(d3.range(0, bardata.length))
				.rangeBands([0, width], 0.2);


	// tooltip styling
	var tooltip = d3.select('body').append('div')
					.style('position', 'absolute')
					.style('padding', '0, 10px')
					.style('background', 'white')
					.style('opacity', 0);

	// draw the main bars. Most is styling attributes
	var myChart = d3.select('#chart').append('svg')
		.style('background', '#E7E0CB')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
		.selectAll('rect').data(bardata)
		.enter().append('rect')
			.style('fill', function(d, i) {
				return colours(i);
			})
			.attr('width', xScale.rangeBand())
			.attr('x', function(d, i) {
				return xScale(i);
			})
			.attr('height', 0)
			.attr('y', height)
		.on('mouseover', function(d) { // tooltip to change colour of bar

			tooltip.transition().style('opacity', 0.9);
			tooltip.html(d)
				.style('left', (d3.event.pageX +5) + 'px')
				.style('top', (d3.event.pageY + 5) + 'px');


			tempColour = this.style.fill;
			d3.select(this)
				.style('opacity', 0.5)
				.style('fill', 'yellow');
		})
		.on('mouseout', function() { // put bar back to original state
			d3.select(this)
				.style('opacity', 1)
				.style('fill', tempColour);
		});

	// animation to produce bouncing effect when chart first draws.
	myChart.transition()
		.attr('height', function(d) {
				return yScale(d);
			})
		.attr('y', function(d) {
		return height - yScale(d);
		})
		.delay(function(d, i) {
			return i * 10;
		})
		.duration(1000)
		.ease('elastic'); 

	// draw the y scale axis

	var vGuideScale = d3.scale.linear()
					.domain([0, d3.max(bardata)])
					.range([height, 0]);

	var vAxis = d3.svg.axis()
				.scale(vGuideScale)
				.orient('left')
				.ticks(10);

	// append another g element
	var vGuide = d3.select('svg').append('g');

	// append the y axis to the graphic
	vAxis(vGuide);

	// need to move the y axis to the correct position on the graph
	vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	vGuide.selectAll('path')
		.style('fill', 'none')
		.style('stroke', '#000');

	vGuide.selectAll('line').style('fill','none').style('stroke','#000');

	// draw the x axis
	var hAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.tickValues(xScale.domain().filter(function(d, i) {
					return !(i % (bardata.length /5)); // limit the amount of ticks
				}));


	var hGuide = d3.select('svg').append('g');
	hAxis(hGuide);

	// again, move the x axis to the correct position
	hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
	hGuide.selectAll('path')
		.style('fill', 'none')
		.style('stroke', '#000');

	hGuide.selectAll('line').style('fill','none').style('stroke','#000');
}); // end of data.tsv input



