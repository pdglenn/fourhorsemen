// Base code adapted from:
// Mike Bostock: https://bl.ocks.org/mbostock/3886208 and
// Michael Stanaland: http://bl.ocks.org/mstanaland/6100713

function bar_chart_percent(div_id,user_data,file,multiples,spec_width,spec_height) {

  var margin = {top: 20, right: 0, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  if (typeof multiples != 'undefined') {
    width = width / multiples;
  };

  if (typeof spec_width != 'undefined') {
    width = spec_width - margin.left - margin.right;
  };

  if (typeof spec_height != 'undefined') {
    height = spec_height - margin.top - margin.bottom;
  };

  var xScale = d3.scaleOrdinal()
      .range([0,width]);

  var yScale = d3.scaleLinear()
      .range([height,0]);

  var xAxis = d3.axisBottom()
      .scale(xScale);

  var yAxis = d3.axisLeft()
      .scale(yScale)
      .tickFormat(d3.format(".0%"));

  var svg = d3.select(div_id).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.json(file, function(error, data) {
    if (error) throw error;

    xScale.domain(data.map(function(d) { return d.x; }));
    xScale.range(Array.from(new Array(data.length),(val,index)=>index).map(function(x) { return x * (width / data.length); }));
    yScale.domain([0, d3.max(data, function(d) { return +d.y; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + ((width / data.length - 10) / 2) + ',' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('y', 6)
        .attr('x', 90)
        .attr('dy', '.71em')
        .style('text-anchor', 'end');

    var x = svg.selectAll('.d3_rect')
        .data(data)
      .enter().append('rect')
        .attr('class', 'd3_rect')
        .attr('transform', function(d) { return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')'; })
        .attr('width', width / data.length - 10)
        .attr('height', function(d) { return height - yScale(d.y); })
      .on('mouseover', function() { tooltip.style('display', null); })
      .on('mouseout', function() { tooltip.style('display', 'none'); })
      .on('mousemove', function(d) {
        // xPosition finds transformation from parent; indentifies text of position and extracts x component
        var xPosition = parseInt(d3.select(this).attr('transform').slice(10).split(',')[0]) + d3.mouse(this)[0] - 23;
        var yPosition = parseInt(d3.select(this).attr('transform').slice(10).split(',')[1]) + d3.mouse(this)[1] - 25;
        tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
        tooltip.select('text').text(d3.format('.0%')(d.y));
      });

    // Update user_data y value as half the value for the column
    data.map(function(d) {
      if (user_data.x === d.x) {
        user_data.y = d.y / 2;
      };
    });

    if (user_data.x) {
      svg.append('circle')
        .attr('class', 'd3_user')
        .attr('r', 10 )
        .attr('cx', xScale(user_data.x) + (width / data.length - 10) / 2 )
        .attr('cy', yScale(user_data.y) )
        .on('mouseover', function() { tooltip_text.style('display', null); })
        .on('mouseout', function() { tooltip_text.style('display', 'none'); })
        .on('mousemove', function(d) {
          var xPosition = d3.mouse(this)[0] - 43;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip_text.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip_text.select('text').text('Your Response');
        });
    };

    if (user_data.x) {
      svg.append('circle')
        .attr('class', 'd3_user')
        .attr('r', 30 )
        .attr('cx', xScale(user_data.x) + (width / data.length - 10) / 2 )
        .attr('cy', yScale(user_data.y) )
        .on('mouseover', function() { tooltip_text.style('display', null); })
        .on('mouseout', function() { tooltip_text.style('display', 'none'); })
        .on('mousemove', function(d) {
          var xPosition = d3.mouse(this)[0] - 43;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip_text.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip_text.select('text').text('Your Response');
        });
    };

    var tooltip = svg.append('g')
      .attr('class', 'd3_tooltip')
      .style('display', 'none');
        
    tooltip.append('rect')
      .attr('width', 44)
      .attr('height', 20)
      .attr('fill', 'white')
      .style('opacity', 0.33);
    tooltip.append('text')
      .attr('x', 22)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .attr('font-size', '12px');

    var tooltip_text = svg.append('g')
      .attr('class', 'd3_tooltip')
      .style('display', 'none');
        
    tooltip_text.append('rect')
      .attr('width', 84)
      .attr('height', 20)
      .attr('fill', 'white')
      .style('opacity', 0.33);
    tooltip_text.append('text')
      .attr('x', 42)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .attr('font-size', '12px');
  });
}