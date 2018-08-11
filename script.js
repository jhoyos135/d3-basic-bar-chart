// d3 chart
// let myData = [150,125,250,440,500,250,300,650,410,250,820,400];
  const myData = [];
  const dataCount = 30;

  for(let i = 0; i < dataCount; i++) {
    myData.push(Math.round(Math.random() * 500));
  }


let margin = {
  top: 30,
  right: 40,
  bottom: 30,
  left: 40
};

let height = 600 - margin.top - margin.bottom;
let width = 400 - margin.right - margin.left ;
let animateDuration = 700;
let animateDelay = 50;

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
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate('+margin.left+','+margin.top+')')
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
        .style('top', (d3.event.pageY)+'px');
        d3.select(this).style('opacity', 0.5);

      })
      .on('mouseleave', (d) => {
        tooltip.transition()
          .style('opacity', 0);
          d3.select(this).style('opacity', 1);
      });

      myBarchart.transition()
      .attr('height', (d) => {
        return yScale(d);
      })
      .attr('y', (d) => {
        return height - yScale(d);
      })
      .duration(animateDuration)
      .delay( (d, i) => {
        return i * animateDelay;
      })
      .ease('elastic');

    let vScale = d3.scale.linear()
    .domain([0, d3.max(myData)])
    .range([height, 0]);

    let hScale = d3.scale.ordinal()
    .domain(d3.range(0, myData.length))
    .rangeBands([0, width]);

    //v axis
    let vAxis = d3.svg.axis()
    .scale(vScale)
    .orient('left')
    .ticks(5)
    .tickPadding(5)

    //v guide
    let vGuide = d3.select('svg')
    .append('g');
      vAxis(vGuide);
      vGuide.attr('transform', 'translate('+margin.left+','+margin.top+')');
      vGuide.selectAll('path')
        .style('fill', 'none')
        .style('stroke', '#000');
      vGuide.selectAll('line')
        .style('stroke', '#000');

    //h axis
    let hAxis = d3.svg.axis()
    .scale(hScale)
    .orient('bottom')
      .tickValues(hScale.domain().filter(function(d,i){
        return !(i % (myData.length/5));
      }));

    //h guide
    let hGuide = d3.select('svg')
    .append('g');
      hAxis(hGuide);
      hGuide.attr('transform', 'translate('+margin.left+','+(height + margin.top)+')');
      hGuide.selectAll('path')
        .style('fill', 'none')
        .style('stroke', '#000');
      hGuide.selectAll('line')
        .style('stroke', '#000');