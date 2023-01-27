
// set the dimensions and margins of the graph
var margin = { top: 60, right: 230, bottom: 50, left: 50 },
    width = 700;//660;//- margin.left - margin.right,
    height = 400; //- margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function (data) {
    //d3.csv("file:///C:/Users/a_504gn/github/dashboard_elements/data/babynames.csv", function(data) {



    //////////
    // GENERAL //
    //////////

    var key = data.columns.slice(2, 5)

    // color palette
    var color = d3.scaleOrdinal()
        .domain(key)
        //"#E3C291" orange
        .range(["#3A6BAC", "#8BB19A", "#C28191"]);
    //.range(["#3A6BAC", "#427F6D", "#D55B20"]); 

    //stack the data?
    var stackedData = d3.stack()
        .keys(key)
        (data)



    //////////
    // AXIS //
    //////////

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5))

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Year");

    /*// Add Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20)
        //.text("BTC Value bands")
        .attr("text-anchor", "start")
*/
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 70000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5))

    //////////
    // BRUSHING AND CHART //
    //////////

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
        .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the scatter variable: where both the circles and the brush take place
    var areaChart = svg.append('g')
        .attr("clip-path", "url(#clip)")

    // Area generator
    var area = d3.area()
        .x(function (d) { return x(d.data.year); })
        .y0(function (d) { return y(d[0]); })
        .y1(function (d) { return y(d[1]); })

    // Show the areas
    areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", function (d) { return "myArea " + d.key })
        .style("fill", function (d) { return color(d.key); })
        .attr("d", area)

    // Add the brushing
    areaChart
        .append("g")
        .attr("class", "brush")
        .call(brush);

    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

        extent = d3.event.selection

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            x.domain(d3.extent(data, function (d) { return d.year; }))
        } else {
            x.domain([x.invert(extent[0]), x.invert(extent[1])])
            areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
        areaChart
            .selectAll("path")
            .transition().duration(1000)
            .attr("d", area)
    }

    /** DOTTED Lines */

    var lineEnd = 348;
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", lineEnd)
        .attr("y2", lineEnd)
        .attr("stroke-width", 1)
        .attr("stroke", "#D5D6D2")
        .attr("stroke-dasharray", "8,8");


   lineEnd = 292.5;
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", lineEnd)
        .attr("y2", lineEnd)
        .attr("stroke-width", 1)
        .attr("stroke", "#D5D6D2")
        .attr("stroke-dasharray", "8,8");

    lineEnd = 232.5;
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", lineEnd)
        .attr("y2", lineEnd)
        .attr("stroke-width", 1)
        .attr("stroke", "#D5D6D2")
        .attr("stroke-dasharray", "8,8");

    lineEnd = 174.5;
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", lineEnd)
        .attr("y2", lineEnd)
        .attr("stroke-width", 1)
        .attr("stroke", "#D5D6D2")
        .attr("stroke-dasharray", "8,8");

    lineEnd = 116.5;
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", lineEnd)
        .attr("y2", lineEnd)
        .attr("stroke-width", 1)
        .attr("stroke", "#D5D6D2")
        .attr("stroke-dasharray", "8,8");

        lineEnd = 56.5;
        svg.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", lineEnd)
            .attr("y2", lineEnd)
            .attr("stroke-width", 1)
            .attr("stroke", "#D5D6D2")
            .attr("stroke-dasharray", "8,8");
    //////////
    // LEGEND //
    //////////
    var svg2 = d3.select("#legend")
        .append("svg")

    // Handmade legend
    svg2.append("circle").attr("cx", 30).attr("cy", 10).attr("r", 6).style("fill", "#3A6BAC")
    svg2.append("circle").attr("cx", 30).attr("cy", 40).attr("r", 6).style("fill", "#8BB19A")
    svg2.append("circle").attr("cx", 30).attr("cy", 70).attr("r", 6).style("fill", "#C28191")
    svg2.append("text").attr("x", 50).attr("y", 10).text("All transactions").style("font-size", "19px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 50).attr("y", 40).text("Transactions < 500$").style("font-size", "19px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 50).attr("y", 70).text("Transactions < 200$").style("font-size", "19px").attr("alignment-baseline", "middle")
//.range(["#3A6BAC", "#8BB19A", "#C28191"]);
})