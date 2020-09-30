let cities;
d3.csv('cities.csv', d=>{
    return {
      ...d, // spread operator
      eu: d.eu==='true', // convert to boolean
      population: +d.population,
      x: +d.x,
      y: +d.y,
    }
  }).then(data=>{
      cities=data;
      console.log('cities', data);
      scatter(cities);
  })

function scatter(cities)  {
    //filter the cities for European cities
    let euro_cities = cities.filter(function(a){
        return a.eu===true; 
    });
    console.log(euro_cities);
    //print the number of cities
    d3.select('.city-count').text('Number of Cities: '+ euro_cities.length);

    //create svg environment
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
	    	.append('svg')
        .attr('width', width)
        .attr('height', height)

    //create the dots; different sizes
    svg.selectAll('circle')
        .data(euro_cities)
        .enter()
        .append('circle')
        .attr('cx',d=>d.x)
        .attr('cy',d=>d.y)
        .attr('r',function(d){
            if (d.population<1000000){
                return 4;
            }
            else{
                return 8;
            }
        })
        .attr('fill', 'maroon');
    //label the cities with large population; use same~ish position as the dots
    svg.selectAll('text')
        .data(euro_cities)
        .enter()
        .append('text')
        .text(function(d){
            if(d.population>1000000){
                return d.city;
            }
        })
        .attr('x',d=>(d.x+5))
        .attr('y',d=>(d.y-10))
        .attr('text-anchor','middle')
        .attr('font-size',11);


}


