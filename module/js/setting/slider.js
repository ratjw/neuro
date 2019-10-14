
import { ISOdate, thDate } from "../util/date.js"
import { winWidth } from "../util/util.js"
import { RESEARCHBAR, xRange } from '../setting/prepareData.js'
import { RESIDENT, updateResearch } from "../model/sqlDoResident.js"
import { getPermission } from '../control/setClickAll.js'
import { USER } from "../main.js"

let _slidertotal,
  _xScale,
  _colors,
  _begin,
  _end,
  _resText,
  _ranges,
  _sumranges,
  _totalrange

export function slider(evt, barChart, range)
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

  prepare_const(range, cdatasets, ridx)

  let beginslider = new Date(_begin),
    endslider = new Date(beginslider.getFullYear() + 5, 4, 31)
  begindate.innerHTML = thDate(ISOdate(beginslider))
  enddate.innerHTML = thDate(ISOdate(endslider))
  enddate.style.right = '10px'

  $dialogSlider.dialog({
  title: rname,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: winWidth(100),
    height: 'auto',
    buttons: [{
      text: "OK",
      click: function() {
        updateResearch(barChart, ridx, _ranges)
        $dialogSlider.dialog("close")
      }
    }]
  })

  slider.innerHTML = slidertemplate.innerHTML
  prepareColumns()

  $("#slidertbl").colResizable({
    liveDrag: true, 
    draggingClass: "rangeDrag", 
    gripInnerHtml: "<div class='rangeGrip'></div>", 
    onDrag: onDragGrip,
    minWidth: 8
  });	

  gripsDate()
  verticalLine()
}

function prepare_const(range, cdatasets, ridx)
{
  const research = RESIDENT.map(e => JSON.parse(e.research)),
    resbar = RESEARCHBAR.map(e => e.progress).filter(e => e),

    timemap = cdatasets.map(e => e.data[ridx]),
    sumtime = timemap.map((e => i => e += i)(0)),
    begintime = sumtime[0],
    endtime = sumtime[sumtime.length-1],

    yearmap = range.map(e => e - 543),
    beginx = new Date(yearmap[0], 0, 1),
    endx = new Date(yearmap[yearmap.length-1], 11, 31),
    xAxis = endx - beginx,
    xScale = xAxis / xRange,
    sliderbegin = begintime * xScale,
    sliderend = endtime * xScale

  _xScale = xScale
  _colors = cdatasets.map(e => e.backgroundColor[0]).filter(e => e !== '#FFFFFF')
  _begin = addMillisec(beginx, sliderbegin)
  _end = addMillisec(beginx, sliderend)
  _slidertotal = sliderend - sliderbegin
  _resText = resbar.map(e => research[ridx][e][1])
  updateRanges(timemap.filter((e, i) => i && e))
}

function updateRanges(ranges)
{
  _ranges = ranges
  _sumranges = ranges.map((e => i => e += i)(0))
  _totalrange = _sumranges[_sumranges.length-1]
}

function prepareColumns()
{
  let slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    tblwidth = slidertbl.offsetWidth,
    colswidth = _ranges.map(e => e * tblwidth / _totalrange)

  columns.forEach((e, i) => {
    e.innerHTML = _resText[i]
    e.style.width = colswidth[i] + 'px'
    e.style.backgroundColor = _colors[i]
  })
}

function gripsDate()
{
  let rangeGrip = [...document.querySelectorAll('.rangeGrip')],
    gripthDate = getGripthDate(_sumranges)

  rangeGrip.forEach((e, i) => e.innerHTML = gripthDate[i])
}

function onDragGrip(e)
{
  let slidertbl = document.getElementById('slidertbl'),
    columns = [...slidertbl.querySelectorAll('td')],
    colswidth = columns.map(e => parseFloat(e.style.width)),
    sumwidth = colswidth.map((e => i => e += i)(0)),
    totalwidth = sumwidth[sumwidth.length-1],
    colsranges = colswidth.map(e => e * _totalrange / totalwidth),
    rangeGrip = [...document.querySelectorAll('.rangeGrip')],
    sumranges = colsranges.map((e => i => e += i)(0)),
    gripthDate = getGripthDate(sumranges)

  rangeGrip.forEach((e, i) => e.innerHTML = gripthDate[i])
  updateRanges(colsranges)
}

function getGripthDate(sumranges)
{
  let gripmsec = sumranges.map(e => e * _xScale),
  gripDate = gripmsec.map(e => addMillisec(_begin, e)),
  gripISOdate = gripDate.map(e => ISOdate(e))

  return gripISOdate.map(e => thDate(e))
}

function addMillisec(beginx, millisec)
{
  let begin = new Date(beginx.getTime())

  return new Date(begin.setTime(begin.getTime() + millisec))
}

function verticalLine()
{
  const slidertbl = document.getElementById('slidertbl'),
    vline = document.querySelector('.vline'),
    tblwidth = slidertbl.offsetWidth,
    todaymsec = new Date() - _begin,
    todayLine = todaymsec * tblwidth / _slidertotal,
    tblheight = slidertbl.offsetHeight,
    paddingtop = parseInt($('#dialogSlider').css('padding-top'))

  vline.style.height = `${tblheight + paddingtop}px`
  vline.style.left = todayLine + 'px'
}
