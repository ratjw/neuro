
import { winHeight, winWidth } from "../util/util.js"
import { xRange, prepareDatasets } from '../setting/prepareData.js'
import { slider } from '../setting/slider.js'
import { getPermission } from '../control/setClickAll.js'

export async function resResearch()
{
  const chartjs = document.getElementById("chartjs"),
    $dialogResResearch = $("#dialogResResearch"),
    maxHeight = winHeight(90),
    prepdata = await prepareDatasets(),
    labels = prepdata.data.labels,
    prepsets = prepdata.data.datasets,
    yearRange = prepdata.years.range,
    today = prepdata.years.today

  let barChart = new Chart(chartjs, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: prepsets
    },
    options: {
      scales: {
        xAxes: [{
          position: 'bottom',
          stacked: true,
          ticks: {
            callback: function(label, index, labels) {
              return yearRange[index]
            },
            min: 0,
            max: xRange
          },
          gridLines: { color: "gray" }
        }],
        yAxes: [{
          stacked: true,
          gridLines: { color: "lightGray" }
        }]
      },
      tooltips: {
        enabled: false
      },
      lineAtIndex: today,
      animation: {
        onComplete: barCaption
      }
    }
  })

  $dialogResResearch.dialog({ height: 'auto' })
  $dialogResResearch.dialog({
    title: "Resident Research",
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(100),
    height: ($dialogResResearch.height() > maxHeight) ? maxHeight : 'auto',
    close: function() {
      $dialogResResearch.dialog('destroy')
    }
  })

  if (getPermission('slider')) {
    chartjs.onclick = function (event) {
      slider(event, barChart, yearRange)
    }
  }
}

//Create the plug-in for vertical line on horizontal bar chart
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

function barCaption(that)
{
  const chartInstance = that.chart,
    ctx = chartInstance.ctx,
    chartdata = chartInstance.data.datasets,
    meta = chartdata.map((e, i) => chartInstance.controller.getDatasetMeta(i))

  meta.forEach((e, i) => {
    e.data.forEach((bar, index) => {
      ctx.fillText(chartdata[i].caption[index], bar._model.base, bar._model.y)
    })
  })
}
