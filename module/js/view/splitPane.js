
export function splitPane(mtable, qtable) {
  let mcontainer = mtable.closest('div'),
    qcontainer = qtable.closest('div'),
    mwrapper = mcontainer,
    qwrapper = qcontainer.parentElement,
    menuHeight = document.getElementById("cssmenu").offsetHeight,
    titleHeight = document.getElementById("titlebar").offsetHeight,
    firstvisiblerow = findFirstVisibleRow(mcontainer, mtable)

  mwrapper.style.height = '100%' - menuHeight + 'px'
  mwrapper.style.width = "50%"

  qwrapper.style.display = "block"
  qwrapper.style.height = '100%' - menuHeight + 'px'
  qwrapper.style.width = "50%"

  qcontainer.style.height = mcontainer.offsetHeight - titleHeight + 'px'

//  initResize(mwrapper)
//  document.querySelector('.ui-resizable-e').style.height = mtable.offsetHeight
  scrollToFirstVisible(mcontainer, firstvisiblerow)

  document.getElementById("clickclosequeue").onclick = function() {
    qwrapper.style.display = 'none'
    mwrapper.style.height = "100%" - menuHeight
    mwrapper.style.width = "100%"

    scrollToFirstVisible(mcontainer, firstvisiblerow)
  }
}

// e.offsetTop > scrolledTop - 2 :: to make sure if the decimal was rounded
function findFirstVisibleRow(mcontainer, mtable)
{
  let scrolledTop = mcontainer.scrollTop,
    rows = mtable.querySelectorAll('tr')

  return Array.from(rows).find(e => e.offsetTop > scrolledTop - 2)
}

function scrollToFirstVisible(mcontainer, firstvisiblerow)
{
  $(mcontainer).animate({
    scrollTop: firstvisiblerow.offsetTop
  }, 300);
}

let initResize = function (wrapper) {
  $(wrapper).resizable({
    autoHide: true,
    handles: 'e',
    resize: function(e, ui) 
    {
      let parent = ui.element.parent();
      let remainSpace = parent.width() - ui.element.outerWidth()
      let divTwo = ui.element.next()
      let margin = divTwo.outerWidth() - divTwo.innerWidth()
      let divTwoWidth = (remainSpace-margin)/parent.width()*100+"%";
      divTwo.css("width", divTwoWidth);
    },
    stop: function(e, ui) 
    {
      let parent = ui.element.parent();
      let remainSpace = parent.width() - ui.element.outerWidth()
      let divTwo = ui.element.next()
      let margin = divTwo.outerWidth() - divTwo.innerWidth()
      ui.element.css(
      {
        width: ui.element.outerWidth()/parent.width()*100+"%",
      });
      ui.element.next().css(
      {
        width: (remainSpace-margin)/parent.width()*100+"%",
      });
    }
  });
}
