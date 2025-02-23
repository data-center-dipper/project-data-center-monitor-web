import type { Directive } from 'vue'

const settingTextColor: Directive = {
  mounted(el, binding) {
    el.style.color = binding.value || 'black'
  },
  updated(el, binding) {
    el.style.color = binding.value || 'black'
  },
}

export default settingTextColor
