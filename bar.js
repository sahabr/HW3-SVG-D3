let buildings;
d3.csv('buildings.csv', d3.autoType).then(data=>{
    buildings=data;
    console.log('buildings', data);
    barchart(buildings);
})

function barchart(buildings){
    buildings.sort(function(a,b){
        return b.height_ft-a.height_ft;
    })

    //svg environment
    const width = 500; //label with height would not fit otherwise
    const height = 500; 
    const svg = d3.select('.height-plot')
	    	.append('svg')
        .attr('width', width)
        .attr('height', height)
    
    //create the rectangles for the bar graphs
    svg.selectAll('rect')
        .data(buildings)
        .enter()
        .append('rect')
        .attr('width',d=>d.height_px)
        .attr('height', 35)
        .attr('x',220)
        .attr('y',(d,i)=>50*i)
        .attr('fill','#5BB860')
        .attr("class", "height")
        .on("click",(event,d)=>{

            document.getElementById('building-name').innerHTML =d.building; 
            document.getElementById('height').innerHTML =d.height_ft;      
            document.getElementById('city').innerHTML =d.city;  
            document.getElementById('country').innerHTML =d.country;  
            document.getElementById('floors').innerHTML =d.floors;  
            document.getElementById('completed').innerHTML =d.completed;
            document.querySelector('.image').src = "img/"+d.image; 
            //document.getElementById('image').innerHTML = "<img src='img/1.jpg\'>"
            //"<img src=\"img/" + d.image + "\">"; 
            
        });

    //add the axis label of the building name
    svg.selectAll('text')
        .data(buildings)
        .enter()
        .append('text')
        .text(d=>d.building)
        .attr('x',0)
        .attr('y',(d,i)=>25+50*i)
        .attr('font-size',14);

    //label the height
    svg.selectAll('text1')
        .data(buildings)
        .enter()
        .append('text')
        .text(function(d){
            return d.height_ft+'ft'
        })
        .attr('x', d=>d.height_px+175)
        .attr('y',(d,i)=>25+50*i)
        .attr('font-weight','bold')
        .attr('font-size',11)



}
