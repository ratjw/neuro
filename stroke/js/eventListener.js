
import { timer } from "./const.js"

export function addEventListener()
{
  window.addEventListener("keyup", (event) => {
    timer = setTimeout(saveRegistry, 3000)
  });

  window.addEventListener("click", (event) => {
    saveRegistry()
  });

  window.addEventListener('focusout', (event) => {})
}

export function removeEventListener()
{
  window.removeEventListener("keyup")

  window.removeEventListener("click")

  window.removeEventListener('focusout')
}
