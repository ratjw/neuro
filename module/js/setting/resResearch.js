
import { winHeight, winWidth } from "../util/util.js"
import { prepareData, prepareYears } from '../setting/prepareData.js'
import { RESIDENT, getResident } from "../setting/doResident.js"

export async function resResearch()
{
  let chartjs = document.getElementById("chartjs"),
    $dialogResResearch = $("#dialogResResearch"),
    maxHeight = winHeight(90)

  if (!RESIDENT.length) { await getResident() }

  let data = prepareData()
  let years = prepareYears()

  let barChart = new Chart(chartjs, {
    type: 'horizontalBar',
    data: {
      labels: data.labels,
      datasets: data.datasets
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            callback: function(label, index, labels) {
              return years.range[index]
            }
          },
          gridLines: {
            color: "gray"
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            color: "lightGray"
          }
        }]
      },
      tooltips: {
        enabled: false
      },
      lineAtIndex: years.today,
    }
  })

  $dialogResResearch.dialog({ height: 'auto' })
  $dialogResResearch.dialog({
    title: "Resident Research",
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(90),
    height: ($dialogResResearch.height() > maxHeight) ? maxHeight : 'auto'
  })

  //Create the plug in
  var originalLineDraw = Chart.controllers.horizontalBar.prototype.draw;
  Chart.helpers.extend(Chart.controllers.horizontalBar.prototype, {
  
      draw: function () {
          originalLineDraw.apply(this, arguments);
  
          var chart = this.chart;
          var ctx = chart.chart.ctx;
  
          var index = chart.config.options.lineAtIndex;
          if (index) {
  
              var xaxis = chart.scales['x-axis-0'];
              var yaxis = chart.scales['y-axis-0'];
  
              var x1 = xaxis.getPixelForValue(index);                       
              var y1 = yaxis.top;                                                   
  
              var x2 = xaxis.getPixelForValue(index);                       
              var y2 = yaxis.bottom;                                        
  
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.strokeStyle = 'red';
              ctx.lineTo(x2, y2);
              ctx.stroke();
  
              ctx.restore();
          }
      }
  });

  chartjs.onclick = function (event) {
    var activePoint = barChart.getElementAtEvent(event)
    if (!activePoint.length) { return }
    var cdata = activePoint[0]['_chart'].config.data
    var idx = activePoint[0]['_index']
    var cidx = activePoint[0]['_datasetIndex']
    var rname = cdata.labels[idx]
    var label = cdata.datasets[cidx].label
    var value = cdata.datasets[cidx].data[idx]

    
  }
}
