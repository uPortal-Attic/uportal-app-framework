var config = config || {};
var _gaq = _gaq || [];

function _gaLt(event){
    var el = event.srcElement || event.target;

    /* Loop up the tree through parent elements if clicked element is not a link (eg: an image in a link) */
    while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href))
        el = el.parentNode;

    if(el && el.href){
    if(el.href.indexOf(location.host) == -1 && el.href != 'javascript:;'){ /* external link */
            var eventOptions = {eventCategory: 'Outbound Link', eventAction: el.href, eventLabel : el.text };

            // old direct Google Analytics integration
            // window.ga('send', 'event', eventOptions);
            //console.log('ga event logged c: Outbound Link a: '+el.href+' l:'+ el.text);

            // new abstracted Google Tag Manager integration
            var action = el.href;
            var category = 'Outbound Link';
            var label = el.text;

            dataLayer.push({
              'event': 'MyUW Event',
              'event_action': action,
              'event_category': category,
              'event_label': label
            });

            console.log(
              'ga.js pushed event to tag manager: action: ' + action +
              ', category: ' + category + ', label: ' + label);

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
