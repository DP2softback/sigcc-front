import slideUp from './slideUp'
import slideDown from './slideDown'

export default function slideToggle(target, duration=500) {
    if (window.getComputedStyle(target).display === 'none') {
        return slideUp(target, duration);
      } else {
        return slideDown(target, duration);
    }
};