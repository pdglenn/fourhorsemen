// Code modified from http://bl.ocks.org/DStruths/9c042e3a6b66048b5bd4 and http://stackoverflow.com/questions/34886070/d3-js-multiseries-line-chart-with-mouseover-tooltip

function line_with_mouseover(div_id,file) {
  
  var margin = {top: 20, right: 120, bottom: 20, left: 25},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var xScale = d3.scaleLinear()
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .range([height, 0]);

  var color = d3.scaleOrdinal().range(['#5c5c5c', '#a81074','#2f1e6e','#3b43ee','#166282','#3a8445','#6bcf5f','#fce120','#fdc12f','#fe6b38','#bd1725']);

  var xAxis = d3.axisBottom(xScale);

  var yAxis = d3.axisLeft(yScale);

  var line = d3.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); });

  var svg = d3.select(div_id).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom) //height + margin.top + margin.bottom
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Create invisible rect for mouse tracking
  svg.append('rect')
      .attr('width', width)
      .attr('height', height)                                    
      .attr('x', 0) 
      .attr('y', 0)
      .attr('id', 'mouse-tracker')
      .style('fill', 'white'); 

  d3.json(file, function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { // Set the domain of the color ordinal scale to be all the csv headers except 'date', matching a color to an issue
      return key !== 'x'; 
    }));

    var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys
      return {
        name: name, // 'name': the csv headers except x
        values: data.map(function(d) { // 'values': which has an array of the x and y values
          return {
            x: +d.x, // + used to convert to int, remove for categories
            y: +(d[name]),
            };
        }),
        visible: true
      };
    });

    xScale.domain(d3.extent(data, function(d) { return +d.x; })); // + used to convert to int, remove for categories
    yScale.domain([0, 1]); // manually set

      var legend = svg.selectAll('g')
        .data(categories)
        .enter()
        .append('g')
        .attr('class', 'legend');

    // draw line graph
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('y', 6)
        .attr('x', 280)
        .attr('dy', '.71em')
        .style('text-anchor', 'end');

    var issue = svg.selectAll('.issue')
        .data(categories) // Select nested data and append to new svg group elements
        .enter().append('g')
        .attr('class', 'issue');   

    issue.append('path')
        .attr('class', 'd3_line')
        .style('pointer-events', 'none') // Stop line interferring with cursor
        .attr('id', function(d) {
          return 'line-' + d.name.replace(' ', '').replace('/', ''); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
        })
        .attr('d', function(d) { 
          return d.visible ? line(d.values) : null; // If array key 'visible' = true then draw line, if not then don't 
        })
        .attr('clip-path', 'url(#clip)')//use clip path to make irrelevant part invisible
        .style('stroke', function(d) { return color(d.name); });

    // draw legend
    var legendSpace = 300 / categories.length; // 300/number of issues (ex. 40)    

    issue.append('rect')
        .attr('width', 20)
        .attr('height', 20)                                    
        .attr('x', width + (margin.right/3) - 35) 
        .attr('y', function (d, i) { return (legendSpace)+i*(legendSpace) - 12; })  // spacing
        .attr('fill',function(d) {
          return d.visible ? color(d.name) : '#F1F1F2'; // If array key 'visible' = true then color rect, if not then make it grey 
        })
        .attr('class', 'legend-box')
        .on('click', function(d){ // On click make d.visible 
          d.visible = !d.visible; // If array key for this data selection is 'visible' = true then make it false, if false then make it true
          issue.select('path')
            .transition()
            .attr('d', function(d) {
              return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
            });
          issue.select('rect')
            .transition()
            .attr('fill', function(d) {
            return d.visible ? color(d.name) : '#F1F1F2';
          });
        })
        .on('mouseover', function(d){
          d3.select(this)
            .transition()
            .attr('fill', function(d) { return color(d.name); });
          d3.select('#line-' + d.name.replace(' ', '').replace('/', ''))
            .transition()
            .style('stroke-width', 3);  
        })
        .on('mouseout', function(d){
          d3.select(this)
            .transition()
            .attr('fill', function(d) {
            return d.visible ? color(d.name) : '#F1F1F2';});
          d3.select('#line-' + d.name.replace(' ', '').replace('/', ''))
            .transition()
            .style('stroke-width', 1.5);
        })
        
    issue.append('text')
        .attr('x', width + (margin.right/3)) 
        .attr('y', function (d, i) { return (legendSpace)+i*(legendSpace); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
        .text(function(d) { return d.name; });

    var mouseG = svg.append('g')
      .attr('class', 'mouse-over-effects');

    mouseG.append('path') // this is the vertical line to follow mouse
      .attr('class', 'mouse-line')
      .style('stroke', 'lightgrey')
      .style('stroke-width', '1px')
      .style('opacity', '0');
      
    var lines = document.getElementsByClassName('d3_line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(categories)
      .enter()
      .append('g')
      .attr('class', 'mouse-per-line');

    mousePerLine.append('circle')
      .attr('r', 7)
      .style('stroke', function(d) {
        return color(d.name);
      })
      .style('fill', 'none')
      .style('stroke-width', '1px')
      .style('opacity', '0');

    mousePerLine.append('text')
      .attr('transform', 'translate(10,3)');

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select('.mouse-line')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '0');
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select('.mouse-line')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '1');
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select('.mouse-line')
          .attr('d', function() {
            var d = 'M' + mouse[0] + ',' + height;
            d += ' ' + mouse[0] + ',' + 0;
            return d;
          });
        d3.selectAll('.mouse-per-line')
          .attr('transform', function(d, i) {
            if (d.visible === true) {
              var xX = xScale.invert(mouse[0]),
                  bisect = d3.bisector(function(d) { return d.x; }).right;
                  idx = bisect(d.values, xX);
              var beginning = 0,
                  end = lines[i].getTotalLength(),
                  target = null;
              while (true){
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                    break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break; //position found
              };
              d3.select(this).select('text')
                .text(yScale.invert(pos.y).toFixed(3)); // controls number of decimals
              return 'translate(' + mouse[0] + ',' + pos.y +')';
            };
          })
          .attr('opacity', function(d) {
            return d.visible ? '1' : '0';
          });
      });
  });
};