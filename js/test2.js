// test pages for d3

// Start with object array
var myStyles = [
	{ width: 200,
	name: 'Salads',	
	color: '#268BD2' },
	{ width: 230,
	name: 'Meat',
	color: '#BD3613' },
	{ width: 220,
	name: 'Drinks',
	color: '#A57706' },
	{ width: 290,
	name: 'Sweets',
	color: '#C61C6F' },
	{ width: 236,
	name: 'Cakes',
	color: '#595AB7' },
	{ width: 230,
	name: 'Sleep',
	color: '#2176C7' }
];


d3.selectAll('#chart').selectAll('div')
	.data(myStyles)
	.enter().append('div')
	.classed('item', true)
	.text(function(d) {
		return d.name;
	})
	.style({
		'color': 'white',
		'background': function(d) {
			return d.color;
		}, 
		width: function(d) {
			return d.width + 'px';
		}
	});