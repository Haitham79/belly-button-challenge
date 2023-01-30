function updateBarChart(barChartData) {
  displayChart(barChartData)
}

function displayChart(barChartData) {
  //Clear the previous chart
  d3.select('#bar>svg').remove()

  // Set the dimensions of the SVG container
  var width = 600;
  var height = 700;

  let margin = { top: 100, bottom: 100, left: 100, right: 100 }
  // Create an SVG container
  var svg = d3.select("#bar")
    .append("svg")
    .attr("width", width - margin.right - margin.left)
    .attr("height", height - margin.bottom - margin.top)
    .attr("viewBox", [-100, 0, width + 110, height])

  // Define the scales for the chart
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(barChartData, function (d) { return d.sample_value; })])
    .range([0, width]);
  var yScale = d3.scaleBand()
    .domain(barChartData.map(function (d) { return d.otu_id; }))
    .range([height, 0])
    .padding(0.2);

  //Create grids
  const xAxisGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat('').ticks(10);
  svg.append('g')
    .attr('class', 'x axis-grid')
    .attr('transform', `translate(0, ${width + margin.bottom})`)
    .call(xAxisGrid);


  // Add the bars to the chart

  svg.append('g')
    .selectAll("rect")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", function (d) { return yScale(d.otu_id); })
    .attr("width", function (d) { return xScale(d.sample_value); })
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue")
    .attr('transform', 'translate(0,0)')
    .on("mouseover", function (d) {
      // Display label
      d3.select("body")
      .append("div")
      .attr("class","bartooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "visible")
      .style("background", "#333")
      .style("color", "#fff")
      .style("font-size", "10px")
      .style("padding", "5px")
      .style("border-radius", "6px")
      .text(d.otu_labels);

    })
    .on("mousemove", function(d){
      d3.select("body")
      .select(".bartooltip")
      .style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
      
    })
    .on("mouseout", function (d) {
      // Hide label
      d3.select("body").select(".bartooltip").remove();
    });


  // Setting axis
  function xAxis(g) {
    g.attr("transform", `translate(0, ${height} )`)
      .attr('class', 'xAxis')
      .call(d3.axisBottom(xScale))
  }

  function yAxis(g) {
    g.attr("transform", `translate(${0}, 0 )`)
      .attr('class', 'yAxis')
      .call(d3.axisLeft(yScale).tickFormat(v => `OTU ${v}`))
  }

  svg.append('g').call(xAxis)
  svg.append('g').call(yAxis)

  d3.selectAll(".xAxis>.tick>text")
    .each(function (d, i) {
      d3.select(this).style("font-size", 20);
    });
  d3.selectAll(".yAxis>.tick>text")
    .each(function (d, i) {
      d3.select(this).style("font-size", 20);
    });

}

export { updateBarChart, displayChart }
