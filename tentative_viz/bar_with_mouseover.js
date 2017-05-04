// Base code adapted from:
// Mike Bostock: https://bl.ocks.org/mbostock/3886208 and
// Michael Stanaland: http://bl.ocks.org/mstanaland/6100713

function bar_with_mouseover(div_id) {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var xScale = d3.scaleBand()
      .range([0, width], .1);

  var yScale = d3.scaleLinear()
      .rangeRound([height, 0]);

  var color = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  var xAxis = d3.axisBottom()
      .scale(xScale);

  var yAxis = d3.axisLeft()
      .scale(yScale)
      .tickFormat(d3.format('s'));

  var svg = d3.select('#chart3').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // d3.json('bar_with_mouseover_data.json', function(error, data) {
  d3.csv('bar_with_mouseover_data.csv', function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'x'; }));

    data.forEach(function(d) {
      var y0 = 0;
      d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(data.map(function(d) { return d.x; }));
    yScale.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('y', 6)
        .attr('x', 90)
        .attr('dy', '.71em')
        .style('text-anchor', 'end');

    var x = svg.selectAll('.x')
        .data(data)
      .enter().append('g')
        .attr('class', 'g')
        .attr('transform', function(d) { return 'translate(' + xScale(d.x) + ',0)'; });

    x.selectAll('rect')
        .data(function(d) { return d.ages; })
      .enter().append('rect')
        .attr('width', 20)
        // .attr('width', xScale.range())
        .attr('y', function(d) { return yScale(d.y1); })
        .attr('height', function(d) { return yScale(d.y0) - yScale(d.y1); })
        .style('fill', function(d) { return color(d.name); })
      .on('mouseover', function() { tooltip.style('display', null); })
      .on('mouseout', function() { tooltip.style('display', 'none'); })
      .on('mousemove', function(d) {
        // xPosition finds transformation from parent
        console.log(d3.select(this.parentNode));
        console.log(d3.select(this.parentNode).attr('transform'));
        // console.log(d3.select(this.parentNode).transform.x);
        // var xPosition = d3.interpolateTransformSvg(d3.select(this.parentNode).attr('transfrom')).transform[0] + d3.mouse(this)[0] - 23;
        var xPosition = d3.mouse(this)[0];// + 500;
        var yPosition = d3.mouse(this)[1] - 25;
        // d3.interpolateTransformSvg(d3.select(this.parentNode).attr('transform')).translate[0]
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