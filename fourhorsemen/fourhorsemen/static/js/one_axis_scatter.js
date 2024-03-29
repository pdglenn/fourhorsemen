// Code highly modified from https://bl.ocks.org/mbostock/3887118

function one_axis_scatter(div_id,user_data,file) {
  
  var margin = {top: 20, right: 0, bottom: 30, left: 42},
      width = 960 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

  var xScale = d3.scalePoint()
      .domain(['Not harassing','Slightly harassing','Somewhat harassing','Very harassing','Extremely harassing'])
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .range([height/2, 0]);

  var xAxis = d3.axisBottom(xScale);
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
    xScale.range([0+first, width-last]);

    svg.selectAll('.d3_dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'd3_dot')
        .attr('r', function(d) { return d.r/5; }) // Update radius scaling here
        .attr('cx', function(d) { return xScale(d.x); })
        .attr('cy', function(d) { return yScale(d.y); })
        .on('mouseover', function() { tooltip.style('display', null); })
        .on('mouseout', function() { tooltip.style('display', 'none'); })
        .on('mousemove', function(d) {
          var xPosition = d3.mouse(this)[0] - 23;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip.select('text').text(d.r);
        });

    if (user_data.x) {
      svg.append('circle')
        .attr('class', 'd3_user')
        .attr('r', user_data.r/5 ) // Update radius scaling here
        .attr('cx', xScale(user_data.x) )
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

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

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
};