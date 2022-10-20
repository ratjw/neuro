
import { XRANGE } from '../setting/constResident.js'
import { prepareDatasets } from '../setting/prepareDatasets.js'
import { slider } from '../setting/slider.js'
import { getPermission } from '../control/setClickAll.js'
import { winHeight, winWidth } from "../util/util.js"

export async function researchResident()
{
  const chartjs = document.getElementById("chartjs"),
    $dialogResResearch = $("#dialogResResearch"),
    availHeight = winHeight(100),
    maxHeight = availHeight > 1000 ? 1000 : availHeight,
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
            max: XRANGE
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
      animation: {
        onComplete: barCaption
      },
      lineAtIndex: today,
      events: [],
      maintainAspectRatio: false
    }
  })

  $dialogResResearch.dialog({ modal: true })
  $dialogResResearch.dialog({
    title: "Resident Research",
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: winWidth(100),
    height: maxHeight,
    close: function() {
      $dialogResResearch.dialog('destroy')
      barChart.destroy()
    }
  })

  if (getPermission('slider')) {
    chartjs.onclick = function (event) {
      slider(event, barChart)
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

function barCaption(e)
{
  const chartInstance = e.chart,
    ctx = chartInstance.ctx,
    chartdata = chartInstance.data.datasets,
    meta = chartdata.map((e, i) => chartInstance.controller.getDatasetMeta(i)),
    charH = 10,
    padding = 3

  ctx.font = `${charH}px Lucida`
  meta.forEach((e, i) => {
    e.data.forEach((bar, index) => {
      let caption = chartdata[i].caption[index],
        base = bar._model.base + padding,
        x = bar._model.x,
        y = bar._model.y,
        width = x - base - padding

      if (caption) {
        let context = calcMulti(caption, width)

        if (context.length === 1) {
          context.forEach(tex => ctx.fillText(tex, base, y))
        }
        else if (context.length === 2) {
          context.forEach((tex, x) => ctx.fillText(tex, base, y + (x*charH - charH/2)))
        }
        else if (context.length === 3) {
          context.forEach((tex, x) => ctx.fillText(tex, base, y + (x-1)*charH))
        }
      }
    })
  })
}

function calcMulti(caption, width)
{
  let chartjs = document.getElementById("chartjs"),
    context = chartjs.getContext('2d'),
    length = context.measureText(caption),
    remain = caption,
    textline = [],
    chunk = "",
    x = 0

  Array.from(caption).forEach((e, i) => {
    chunk = remain.substring(0, i-x)
    if (context.measureText(chunk).width >= width) {
      textline.push(remain.substring(0, i-x).trim())
      remain = caption.slice(i)
      x = i
    }
  })
  textline.push(remain)

  return textline.slice(0, 3)
}
