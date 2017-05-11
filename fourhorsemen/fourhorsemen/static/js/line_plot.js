// Code highly modified from https://bl.ocks.org/mbostock/3887118

function line_plot(div_id,user_data,file) {
  
  var margin = {top: 0, right: 0, bottom: 0, left: 130},
      width = 960 - margin.left - margin.right,
      height = 80 - margin.top - margin.bottom;

  var xScale = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .range([height/2, 0]);

  var xAxis = d3.axisBottom(xScale).tickPadding([10]);
  var yAxis = d3.axisLeft(yScale);

  var svg = d3.select(div_id).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.json(file, function(error, data) {
    if (error) throw error;

    // Update radius scaling here
    var first = data[0]['r']/5;
    var last = data.slice(-1)[0]['r']/5;
    // xScale.range([0+first, width-last]);
    xScale.range(Array.from(new Array(data.length),(val,index)=>index).map(function(x) { return x * (width / 4.5); }));

    svg.append('g')
      .attr('class', 'x axis_line')
      .attr('transform', 'translate(0,' + yScale(0) + ')')
      .call(xAxis);

    svg.selectAll('.d3_dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'd3_dot')
        .attr('r', function(d) { return 12; })
        .attr('cx', function(d) { return xScale(d.x); })
        .attr('cy', function(d) { return yScale(d.y); });

    svg.append('circle')
        .attr('class', 'd3_fixed')
        .attr('r', 12 ) // Update radius scaling here
        .attr('cx', 3.2 * (width /4.5) )
        .attr('cy', yScale(0) )
        .on('mouseover', function() { tooltip_text.style('display', null); })
        .on('mouseout', function() { tooltip_text.style('display', 'none'); })
        .on('mousemove', function(d) {
          var xPosition = d3.mouse(this)[0] - 23;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip_text.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip_text.select('text').text('Average: 4.2');
        });

    if (user_data.x) {
      svg.append('circle')
        .attr('class', 'd3_user')
        .attr('r', 12 ) // Update radius scaling here
        .attr('cx', xScale(user_data.x) )
        .attr('cy', yScale(0) )
        .on('mouseover', function() { tooltip_text.style('display', null); })
        .on('mouseout', function() { tooltip_text.style('display', 'none'); })
        .on('mousemove', function(d) {
          var xPosition = d3.mouse(this)[0] - 23;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip_text.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip_text.select('text').text('Your Response');
        });
    };

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
};