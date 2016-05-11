var chartData = {"data":{"g2013":{"m1":{"iznos":"7660127141","pdv":"1388852558","broj":"118736506"},"m2":{"iznos":"7407460898","pdv":"1329247469","broj":"114840665"},"m3":{"iznos":"9171802815","pdv":"1657426226","broj":"136204909"},"m4":{"iznos":"12228047751","pdv":"2226948304","broj":"182183355"},"m5":{"iznos":"13530620426","pdv":"2436459330","broj":"196420669"},"m6":{"iznos":"14028950930","pdv":"2541853332","broj":"201382428"},"m7":{"iznos":"16957875876","pdv":"3169274287","broj":"247462027"},"m8":{"iznos":"17972058837","pdv":"3254711644","broj":"252455204"},"m9":{"iznos":"14173822083","pdv":"2580547763","broj":"209630172"},"m10":{"iznos":"12659390994","pdv":"2385865480","broj":"197007100"},"m11":{"iznos":"11009768987","pdv":"2061391672","broj":"172098525"},"m12":{"iznos":"12189777558","pdv":"2293648691","broj":"177836738"}}}}
var chartY = "";


function start() {

    var arrLegend = ["d1","d2","d3"];
    var arrX = ["January","February","March","April","May","June","July","August","September","October","November","December"];    
    var arrd1 = [];  arrd1[0] = "d1";   
    var arrd2 = [];  arrd2[0] = "d2";   
    var arrd3 = [];  arrd3[0] = "d3"; 
    var g = "g2013";

    for (var i = 1; i < 13; i++) {
        arrd1[i] = chartData.data[g]["m"+i].iznos.replace(",",".");
        arrd2[i] = chartData.data[g]["m"+i].pdv.replace(",",".");
        arrd3[i] = chartData.data[g]["m"+i].broj.replace(",",".");
    }

    drawC3ChartY(arrLegend, arrX, arrd1, arrd2, arrd3);
}


function drawC3ChartY(arLegend, ar0, ar1, ar2, ar3) {

    chartY = c3.generate({
        bindto: '#chartY',
        data: {
            axes: { d1: 'y', d2: 'y', d3: 'y2' },
            colors: { d1: '#6c006c', d2: '#3a9200', d3: '#073f6b' },
            columns: [ ar1, ar2, ar3 ],
            names: { d1: arLegend[0], d2: arLegend[1], d3: arLegend[2] },
            types: { d1: 'area-step', d2: 'area-step', d3: 'line' }   
        },
        axis: {
            x: {
                type: 'category',
                categories: ar0,
                tick: {
                    rotate: 90,
                    multiline: false
                }
            },
            y: {
                min: 0,
                padding: {bottom:0},
                tick: {
                    format: function (d) { return formatNum(d,0, ".", ""); },
                }
            },
            y2: { 
                show: true,
                min: 0,
                padding: {bottom:0},
                tick: {
                    format: function (d) { return formatNum(d,0, ".", ""); }
                }
            }
        },
        tooltip: {
            format: {
                //title: function (d) { return 'XXX ' + d; },
                value: function (value, ratio, id) {
                    return formatNum(value, 0, ".", "");   
                }
            }
        },
        grid: {
            x: { show: true },
            y: { show: true }
        },
        legend: {
            show: false
        }
    });


    d3.select('#chart1').insert('div', '.chart').attr('class', 'legend').selectAll('span')
        .data(arLegend)
      .enter()
        .append('div').append('span')
            .attr('data-id', function (id) { return id; })
            //.html(function (id) { return id; })
            .each(function (id) { 
                d3.select(this).style('background-color', chartY.color(id)); 
            })
            .on('mouseover', function (id) {
                chartY.focus(id);
            })
            .on('mouseout', function (id) {
                chartY.revert();
            })
            .on('click', function (id) {
                chartY.toggle(id);
                if (d3.select(this).attr("style").includes("opacity: 0.5;")) {
                    d3.select(this).style('opacity', '1');
                }
                else {
                    d3.select(this).style('opacity', '0.5');
                }            
            })
        .append('span')
            .html(function (id) { return id; });

}


function formatNum(num, decPlaces, thouSeparator, decSeparator){
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
    decSeparator = decSeparator === undefined ? '.' : decSeparator;
    thouSeparator = thouSeparator === undefined ? ',' : thouSeparator;

    sign = num < 0 ? '-' : '';
    i = parseInt(num = Math.abs(+num || 0).toFixed(decPlaces)) + '';
    j = (j = i.length) > 3 ? j % 3 : 0;

    return sign + (j ? i.substr(0, j) + thouSeparator : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thouSeparator) + (decPlaces ? decSeparator + Math.abs(num - i).toFixed(decPlaces).slice(2) : '');
}
