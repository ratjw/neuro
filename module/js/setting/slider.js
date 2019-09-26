
import { updateResearch } from "../model/sqlDoResident.js"
import { ISOdate, thDate } from "../util/date.js"
import { winWidth } from "../util/util.js"
import { xRange } from '../setting/prepareData.js'

let _xScale,
    _begindate

export function slider(evt, barChart, years)
{
  const activePoint = barChart.getElementAtEvent(evt)
  if (!activePoint.length) { return }

  const $dialogSlider = $('#dialogSlider'),
    slider = document.getElementById('slider'),
    begindate = document.getElementById('begindate'),
    enddate = document.getElementById('enddate'),
    thumbdate = document.querySelector('#thumbdate'),
    root = document.documentElement,

    cdata = activePoint[0]['_chart'].config.data,
    ridx = activePoint[0]['_index'],
    cidx = activePoint[0]['_datasetIndex'],
    rname = cdata.labels[ridx],
    cdatasets = cdata.datasets,
    clabel = cdatasets[cidx].label,
    color = cdatasets[cidx].backgroundColor[ridx],
    cidxplus1 = cdatasets[cidx+1],
    nextcolor = cidxplus1 && cidxplus1.backgroundColor[ridx] || "#FFFFFF",
    value = cdatasets[cidx].data[ridx],
    slidermin = Number(slider.min),      
    slidermax = Number(slider.max),      
    scale = slidermax / 2 / value,
    // initial slider thumb is at the middle

    yearmap = years.range.map(e => e - 543),
    timemap = cdatasets.map(e => e.data[ridx]),
    sumtime = timemap.map((e => i => e += i)(0)),
    pasttime = sumtime[cidx-1],
    thistime = sumtime[cidx],

    beginx = new Date(yearmap[0].toString()),
    endx = new Date(yearmap[yearmap.length-1], 11, 31),
    xAxis = endx - beginx,
    xScale = xAxis / xRange,
    sliderbegin = pasttime * xScale,
    sliderthumb = thistime * xScale,
    begin = addMillisec(beginx, sliderbegin),
    thumb = addMillisec(beginx, sliderthumb);

  _xScale = xScale
  _begindate = begin

  if (!cidx || (cidx > 7)) { return }
  slider.value = value * scale
  begindate.innerHTML = thDate(ISOdate(new Date(begin)))
  enddate.innerHTML = thDate(ISOdate(new Date(thumb)))
  root.style.setProperty('--progress', color)
  root.style.setProperty('--track', nextcolor)

  $dialogSlider.dialog({
  title: rname + " " + clabel,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(90),
    height: 'auto',
    buttons: [{
      text: "OK",
      click: function() {
        updateResearch(barChart, slider.value/scale, ridx, cidx)
        $dialogSlider.dialog("close")
      }
    }]
  })

  let off = slider.offsetWidth / (slidermax - slidermin),
    px =  ((slider.valueAsNumber - slidermin) * off);

  enddate.style.left = px + 'px'
  thumbdate.innerHTML = ''

  slider.oninput = function() {
    updateEndDate(slider.value/scale)
  }
}

function addMillisec(beginx, millisec)
{
  let begin = new Date(beginx.getTime())

  return new Date(begin.setTime(begin.getTime() + millisec))
}

export function updateEndDate(sliderval)
{
  let sliderthumb = sliderval * _xScale,
    thumbval = addMillisec(_begindate, sliderthumb),
    endval = thDate(ISOdate(new Date(thumbval))),

    slider = document.querySelector('#slider'),
    thumbdate = document.querySelector('#thumbdate'),
    slidermin = Number(slider.min),      
    slidermax = Number(slider.max),      
    off = slider.offsetWidth / (slider.max - slider.min),
    px =  (slider.valueAsNumber - slider.min) * off

  thumbdate.style.top = slider.offsetHeight*3 + 'px';
  thumbdate.style.left = px + 'px';
  thumbdate.innerHTML = endval;
}
