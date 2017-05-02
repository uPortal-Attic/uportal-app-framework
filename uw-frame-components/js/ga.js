(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

var config = config || {};
var _gaq = _gaq || [];

if(config.gaID !== undefined && config.gaID !== null) {
  ga('create', config.gaID, 'auto');
} else {
  console.log("ga disabled for this app");
}

function _gaLt(event){
    var el = event.srcElement || event.target;

    /* Loop up the tree through parent elements if clicked element is not a link (eg: an image in a link) */
    while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href))
        el = el.parentNode;

    if(el && el.href){
    if(el.href.indexOf(location.host) == -1 && el.href != 'javascript:;'){ /* external link */
            var eventOptions = {eventCategory: 'Outbound Link', eventAction: el.href, eventLabel : el.text };
            window.ga('send', 'event', eventOptions);
            console.log('ga event logged c: Outbound Link a: '+el.href+' l:'+ el.text);
            // Click will open in a new window if it is the middle button or the
            // meta or control keys are held
            var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;
            var newWindow = event.button == 1 || event.metaKey || event.ctrlKey || target;
            /* HitCallback function to either open link in either same or new window */
            var hitBack = function(link, target){
                target ? window.open(link, target) : window.location.href = link;
            };
            
            if(newWindow){
                setTimeout(function(){
                    window.open(el.href, target);
                }.bind(el),500);
                /* Prevent standard click */
                event.preventDefault ? event.preventDefault() : event.returnValue = !1;
            }
        }

    }
}

/* Attach the event to all clicks in the document after page has loaded */
var w = window;
w.addEventListener ? w.addEventListener("load",function(){document.body.addEventListener("click",_gaLt,!1)},!1)
 : w.attachEvent && w.attachEvent("onload",function(){document.body.attachEvent("onclick",_gaLt)});
