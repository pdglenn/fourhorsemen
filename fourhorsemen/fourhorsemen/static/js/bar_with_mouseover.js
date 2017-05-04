// Base code adapted from:
// Mike Bostock: https://bl.ocks.org/mbostock/3886208 and
// Michael Stanaland: http://bl.ocks.org/mstanaland/6100713

function bar_with_mouseover(div_id,file) {

  var margin = {top: 20, right: 0, bottom: 30, left: 45},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var xScale = d3.scaleOrdinal()
      .range([0,width]);

  var yScale = d3.scaleLinear()
      .rangeRound([height, 0]);

  var color = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  var xAxis = d3.axisBottom()
      .scale(xScale);

  var yAxis = d3.axisLeft()
      .scale(yScale);

  var svg = d3.select(div_id).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.json(file, function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'x'; }));

    data.forEach(function(d) {
      var y0 = 0;
      d.heights = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.heights[d.heights.length - 1].y1;
    });

    xScale.domain(data.map(function(d) { return d.x; }));
    xScale.range(Array.from(new Array(data.length),(val,index)=>index).map(function(x) { return x * (width / data.length); }));
    yScale.domain([0, d3.max(data, function(d) { return d.total; })]);

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

    var x = svg.selectAll('.d3_outer_rect')
        .data(data)
      .enter().append('g')
        .attr('class', 'g')
        .attr('transform', function(d) { return 'translate(' + xScale(d.x) + ',0)'; });

    x.selectAll('.d3_outer_rect')
        .data(function(d) { return d.heights; })
      .enter().append('rect')
        .attr('width', width / data.length - 10)
        .attr('y', function(d) { return yScale(d.y1); })
        .attr('height', function(d) { return yScale(d.y0) - yScale(d.y1); })
        .style('fill', function(d) { return color(d.name); })
      .on('mouseover', function() { tooltip.style('display', null); })
      .on('mouseout', function() { tooltip.style('display', 'none'); })
      .on('mousemove', function(d) {
        // xPosition finds transformation from parent; indentifies text of position and extracts x component
        var xPosition = parseInt(d3.select(this.parentNode).attr('transform').slice(10).split(',')[0]) + d3.mouse(this)[0] - 23;
        var yPosition = d3.mouse(this)[1] - 25;
        tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
        tooltip.select('text').text(d3.format(',')(d.y1 - d.y0));
      });

    var legend = svg.selectAll('.legend')
        .data(color.domain().slice().reverse())
      .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

    legend.append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);

    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(function(d) { return d; });

    var tooltip = svg.append('g')
      .attr('class', 'tooltip')
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
  });
}