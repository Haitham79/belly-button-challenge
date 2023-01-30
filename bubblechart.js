
function getRandomLightColor() {
  var letters = "ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    if (i < 3) {
      color += letters[Math.floor(Math.random() * 6)];
    } else {
      color += letters[Math.floor(Math.random() * 6)];
    }
  }
  return color;
}

function displayBubbleChart(bubbleChartData) {
  //Clear the previous chart
  d3.select('#bubble>svg').remove()
  console.log(bubbleChartData)

  var width = 900;
  var height = 400;

  let margin = { top: 100, bottom: 100, left: 100, right: 100 }
  var svg = d3.select("#bubble").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear()
    .domain([0, d3.max(bubbleChartData, function (d) { return d.x; })])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(bubbleChartData, function (d) { return d.y; })])
    .range([height, 0])

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


  svg.selectAll("circle")
    .data(bubbleChartData).enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.x) })
    .attr("cy", function (d) { return y(d.y) })
    .attr("r", function (d) {
      return d.r
    })
    .attr("fill", function (d) {
      return d.color;
    })
    .attr("opacity", "0.8")
    .on("mouseover", function (d) {
      // Display label
      d3.select("body")
        .append("div")
        .attr("class", "bubbletooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "visible")
        .style("background", "#333")
        .style("color", "#fff")
        .style("font-size", "10px")
        .style("padding", "5px")
        .style("border-radius", "6px")
        .text(`${d.source}`);

    })
    .on("mousemove", function (d) {
      d3.select("body")
        .select(".bubbletooltip")
        .style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")

    })
    .on("mouseout", function (d) {
      // Hide label
      d3.select("body").select(".bubbletooltip").remove();
    });;

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .text("OTU ID");



  //Create grids
  const xAxisGrid = d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(10);
  svg.append('g')
    .attr('class', 'x axis-grid')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisGrid);

  const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat('').ticks(10);
  svg.append('g')
    .attr('class', 'y axis-grid')
    .attr('transform', `translate(0, ${0})`)
    .call(yAxisGrid);

}

export { displayBubbleChart, getRandomLightColor }
