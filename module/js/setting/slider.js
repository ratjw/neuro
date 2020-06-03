
import { obj_2_ISO, ISO_2_th } from "../util/date.js"
import { winWidth } from "../util/util.js"
import { xRange } from '../setting/resResearch.js'
import { RESEARCHBAR } from '../setting/prepareData.js'
import { YEARS, getRESIDENT, updateResearch } from "../model/sqlDoResident.js"
import { getPermission } from '../control/setClickAll.js'
import { USER } from "../main.js"

export function slider(evt, barChart, yearRange)
{
  const activePoint = barChart.getElementAtEvent(evt)

  if (!activePoint.length) { return }

  const $dialogSlider = $('#dialogSlider'),
    slider = document.querySelector('#slidertbl'),
    slidertemplate = document.querySelector('#slidertemplate'),
    begindate = document.getElementById('begindate'),
    enddate = document.getElementById('enddate'),

    active = activePoint[0],
    cdata = active['_chart'].config.data,
    ridx = active['_index'],
    cidx = active['_datasetIndex'],
    rname = cdata.labels[ridx],
    cdatasets = cdata.datasets

  if ((cidx === 0) || (cidx > 7)) { return }
  if (!getPermission('resBar', rname)) { return }

  const timemap = getTimemap(cdatasets, ridx),
    beginSlider = getBeginSlider(yearRange, timemap),
    beginslider = new Date(beginSlider),
    endslider = new Date(beginslider.getFullYear() + YEARS, 4, 31)

  begindate.innerHTML = ISO_2_th(obj_2_ISO(beginslider))
  enddate.innerHTML = ISO_2_th(obj_2_ISO(endslider))
  enddate.style.right = '10px'

  $dialogSlider.dialog({ modal: true })
  $dialogSlider.dialog({
  title: rname,
    closeOnEscape: true,
    show: 200,
    hide: 200,
    width: winWidth(100),
    height: 'auto',
    buttons: [{
      text: "Save",
      click: function() {
        const newTimeRanges = getNewTimeRanges(timemap)
        updateResearch(barChart, ridx, newTimeRanges)
        $dialogSlider.dialog("close")
      }
    }]
  })

  slider.innerHTML = slidertemplate.innerHTML
  prepareColumns(cdatasets, ridx)

  $("#slidertbl").colResizable({
    liveDrag: true, 
    draggingClass: "rangeDrag", 
    gripInnerHtml: "<div class='rangeGrip'></div>", 
    onDrag: function () { onDragGrip(yearRange, timemap) },
    minWidth: 8
  });	

  gripsDate(yearRange, timemap)
  verticalLine(yearRange, timemap)
}

function getTimemap(cdatasets, ridx)
{
  return cdatasets.map(e => e.data[ridx])
}

function getTimeRanges(timemap)
{
  return timemap.filter((e, i) => i && e)
}

function getBeginSlider(yearRange, timemap)
{
  const yearmap = yearRange.map(e => e - 543),
    beginx = new Date(yearmap[0], 0, 1),
    endx = new Date(yearmap[yearmap.length-1], 11, 31),
    xAxis = endx - beginx,
    xScale = xAxis / xRange,

    begintime = timemap[0],
    sliderbegin = begintime * xScale

  return addMillisec(beginx, sliderbegin)
}

function getResText(ridx)
{
  const research = getRESIDENT().map(e => JSON.parse(e.research)),
    resbar = RESEARCHBAR.map(e => e.progress).filter(e => e)

  return resbar.map(e => research[ridx][e][1])
}

function getSumranges(timemap)
{
  const timeRanges = getTimeRanges(timemap)

  return timeRanges.map((e => i => e += i)(0))
}

function getTotalrange(timemap)
{
  const timeRanges = getTimeRanges(timemap)

  return timeRanges.reduce((a, e) => a + e)
}

function getXScale(yearRange)
{
  const yearmap = yearRange.map(e => e - 543),
    beginx = new Date(yearmap[0], 0, 1),
    endx = new Date(yearmap[yearmap.length-1], 11, 31),
    xAxis = endx - beginx

  return xAxis / xRange
}

function getSlidertotal(yearRange, timemap)
{
  const xScale = getXScale(yearRange),
    sumtime = timemap.map((e => i => e += i)(0)),
    begintime = sumtime[0],
    endtime = sumtime[sumtime.length-1],

    sliderbegin = begintime * xScale,
    sliderend = endtime * xScale

  return sliderend - sliderbegin
}

function prepareColumns(cdatasets, ridx)
{
  let slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    tblwidth = slidertbl.offsetWidth,

    resText = getResText(ridx),
    colors = cdatasets.map(e => e.backgroundColor[0]).filter(e => e !== '#FFFFFF'),

    timemap = getTimemap(cdatasets, ridx),
    timeRanges = getTimeRanges(timemap),
    totalrange = getTotalrange(timemap),
    colswidth = timeRanges.map(e => e * tblwidth / totalrange)

  columns.forEach((e, i) => {
    e.innerHTML = resText[i]
    e.style.width = colswidth[i] + 'px'
    e.style.backgroundColor = colors[i]
  })
}

function gripsDate(yearRange, timemap)
{
  let rangeGrip = [...document.querySelectorAll('.rangeGrip')],
    sumranges = getSumranges(timemap),
    gripthDate = getGripthDate(yearRange, timemap, sumranges)

  rangeGrip.forEach((e, i) => e.innerHTML = gripthDate[i])
}

function onDragGrip(yearRange, timemap)
{
  let newRanges = getNewTimeRanges(timemap),
    sumNewRanges = newRanges.map((e => i => e += i)(0)),
    gripthDate = getGripthDate(yearRange, timemap, sumNewRanges),
    rangeGrip = [...document.querySelectorAll('.rangeGrip')]

  rangeGrip.forEach((e, i) => e.innerHTML = gripthDate[i])
}

function getNewTimeRanges(timemap)
{
  let slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    colswidth = columns.map(e => parseFloat(e.style.width)),
    sumwidth = colswidth.map((e => i => e += i)(0)),
    totalwidth = sumwidth[sumwidth.length-1],
    totalrange = getTotalrange(timemap)

  return colswidth.map(e => e * totalrange / totalwidth)
}

function getGripthDate(yearRange, timemap, sumranges)
{
  let xScale = getXScale(yearRange),
    gripmsec = sumranges.map(e => e * xScale),
    beginSlider = getBeginSlider(yearRange, timemap),
    gripDate = gripmsec.map(e => addMillisec(beginSlider, e)),
    gripISOdate = gripDate.map(e => obj_2_ISO(e))

  return gripISOdate.map(e => ISO_2_th(e))
}

function addMillisec(beginx, millisec)
{
  let begin = new Date(beginx.getTime())

  return new Date(begin.setTime(begin.getTime() + millisec))
}

function verticalLine(yearRange, timemap)
{
  const slidertbl = document.getElementById('slidertbl'),
    vline = document.querySelector('.vline'),
    tblwidth = slidertbl.offsetWidth,
    beginSlider = getBeginSlider(yearRange, timemap),
    todaymsec = new Date() - beginSlider,
    slidertotal = getSlidertotal(yearRange, timemap),
    todayLine = todaymsec * tblwidth / slidertotal,
    tblheight = slidertbl.offsetHeight,
    paddingtop = parseInt($('#dialogSlider').css('padding-top'))

  vline.style.height = `${tblheight + paddingtop}px`
  vline.style.left = todayLine + 'px'
}
