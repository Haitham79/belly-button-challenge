import { updateBarChart } from "./barchart.js";
import { displayBubbleChart, getRandomLightColor } from "./bubblechart.js";
import { updateDemographics } from "./demographic.js";

var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//1 .Fetching data and save it in json file
// d3.json(url).then( function(data) {
//   // Do something with the data here

//   // Save the data to a local JSON file
//   var json = JSON.stringify(data);
//   var blob = new Blob([json], {type: "application/json"});
//   var url = URL.createObjectURL(blob);
//   var a = document.createElement("a");
//   a.href = url;
//   a.download = "samples.json";
//   a.click();
// });

let ids = []

let metadata = []
let samples = []

//Bar Chart variables
let barChartData = []
let bubbleChartData = []

function barChartDataUpdate(selected_sample) {
    for(let i=0; i < selected_sample.otu_ids.length; i++){
        barChartData.push({otu_id: selected_sample.otu_ids[i], otu_labels: selected_sample.otu_labels[i], sample_value: selected_sample.sample_values[i]})
    }
    barChartData = barChartData.slice(0,10).reverse()
    
    updateBarChart(barChartData)
}

function demographocDataUpdate(selected_metadata){
   updateDemographics(selected_metadata)
}


function bubbleChartDataUpdate(selected_sample) {
    for(let i=0; i < selected_sample.otu_ids.length; i++){
        bubbleChartData.push({source: selected_sample.otu_labels[i] ,x: selected_sample.otu_ids[i] , y: selected_sample.sample_values[i], r: selected_sample.sample_values[i], color: getRandomLightColor()})
    }
        displayBubbleChart(bubbleChartData)
}

function optionChanged(value){
    let selected_sample = samples.filter(s => s.id === value)[0]
    barChartDataUpdate(selected_sample)

    let selected_metadata = metadata.find(md => md.id == value)
    console.log(selected_metadata)
    demographocDataUpdate(selected_metadata)

    bubbleChartDataUpdate(selected_sample)
}

//Load data from json and save it into data variable
d3.json(url)
  .then(function(data) {
   
    ids = data.names
    metadata = data.metadata
    samples = data.samples

    //Setting default values for bar chart
    barChartDataUpdate(samples[0])
    demographocDataUpdate(metadata[0])
    bubbleChartDataUpdate(samples[0])

    var options = d3.select("#selDataset")
      .selectAll("option")
      .data(data.names);

    options.enter()
      .append("option")
      .text(function(d) { return d; });

    options.exit().remove();
    
})


export { optionChanged }