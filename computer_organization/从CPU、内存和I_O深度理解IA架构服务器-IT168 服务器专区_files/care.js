
(function() {
    function acurse(jsdomain, casesiteId, urlgroup, articleurl, isArticle) {
        var Action_url = 'http://{A}/care.ashx'.replace(/{A}/, jsdomain);
        var _isArticle = 1;
        if (typeof (isArticle) != 'undefined') {
            _isArticle = isArticle;
        }
        articleurl = articleurl.replace('#', '-POUNDSIGN-');
        var pars = 'action={A}&siteid={B}&isArticle={C}&articleurl={D}'.replace(/{A}/, "JsonBuyClickUrlNum")
        .replace(/{B}/, casesiteId).replace(/{C}/, _isArticle).replace(/{D}/, articleurl);
        var JQuerydollar = jQuery.noConflict();
        JQuerydollar.ajax({ type: "GET",
            url: Action_url,
            dataType: "jsonp",
            jsonp: "jsonpname",
            jsonpCallback: "jsonpCallback",
            data: pars, success: function(data, txtSataus) {
                var articlebuyclickUrl = document.getElementsByName(urlgroup);
                JQuerydollar(articlebuyclickUrl).each(function(i) {
                    JQuerydollar(data).each(function(j) {
                        if (articlebuyclickUrl[i].href == data[j].Url) {

                            articlebuyclickUrl[i].insertAdjacentHTML("afterEnd", ' (' + data[j].ClickNum + '人感兴趣)');
                            return;
                        }
                    });
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
    window['CAREACURSE'] = {};
    window['CAREACURSE']['acurse'] = acurse;

})();


