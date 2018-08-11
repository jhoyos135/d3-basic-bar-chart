// d3 chart
let myData = [150,125,250,440,500,250,300,650, 410, 250, 720, 400];

let height = 600;
let width = 400;
let animateDuration = 700;
let animateDelay = 30;

let tooltip = d3.select('#chart').append('div')
  .style('position','absolute')
  .style('background','#f4f4f4')
  .style('padding','5px 15px')
  .style('border','1px solid #333')
  .style('border-radius','5px')
  .style('opacity','0');

let yScale = d3.scale.linear()
.domain([0, d3.max(myData)])
.range([0, height]);

let xScale = d3.scale.ordinal()
.domain(d3.range(0, myData.length))
.rangeBands([0, width]);

let colors = d3.scale.linear()
.domain([0, myData.length])
.range(['#429ef4', '#c9304c']);


const myBarchart = d3.select('#chart').append('svg')
.attr('width', width)
.attr('height', height)
.selectAll('rect')
  .data(myData)
  .enter().append('rect')
    .style('fill', (d, i) => {
      return colors(i);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', 0)
    .attr('x', (d, i) => {
      return xScale(i);
    })
    .attr('y', height)

    .on('mouseover', (d) => {
      tooltip.transition()
      .style('opacity', 1);
      
      tooltip.html(d)
      .style('left', (d3.event.pageX)+'px')
      .style('top', (d3.event.pageY)+'px' );
      d3.select(this).style('opacity', 0.5);

    })
    .on('mouseout', (d) => {
      tooltip.transition()
        .style('opacity', 0);
        d3.select(this).style('opacity', 1);
    })

    myBarchart.transition()
    .attr('height', function(d){
      return yScale(d);
    })
    .attr('y', function(d){
      return height - yScale(d)
    })
    .duration(animateDuration)
    .delay(function(d, i){
      return i * animateDelay;
    })
    .ease('elastic');