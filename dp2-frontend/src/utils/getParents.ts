export default function getParents(el, selector, filter) {
    // If no selector defined will bubble up all the way to *document*
    let parentSelector = (selector === undefined) ? document : document.querySelector(selector);
    var parents = [];
    var pNode = el.parentNode;
    
    while (pNode !== parentSelector) {
        var element = pNode;

        if(filter === undefined){
            parents.push(element); // Push that parentSelector you wanted to stop at
        }else{
            element.classList.contains(filter) && parents.push(element);
        }
        pNode = element.parentNode;
    }
    
    return parents;
}