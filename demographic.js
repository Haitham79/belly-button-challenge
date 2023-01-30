function updateDemographics(data){
  d3.selectAll('#sample-metadata > div').remove()
  d3.select('#sample-metadata')
    .selectAll('div')
    .data([data])
    .enter()
    .append('div')
    .text((d) => `id: ${d.id}`)
    .append('div')
    .text((d) => `ethnicity: ${d.ethnicity}`)
    .append('div')
    .text((d) => `gender: ${d.gender}`)
    .append('div')
    .text((d) => `age: ${d.age}`)
    .append('div')
    .text((d) => `location: ${d.location}`)
    .append('div')
    .text((d) => `bbtype: ${d.bbtype}`)
    .append('div')
    .text((d) => `wfreq: ${d.wfreq}`)
}

export { updateDemographics }