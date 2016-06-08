function StatisticsUserAct(guid, ItemType, ItemId, ItemUrl, Type, Channel) {
    var strSrc = "http://topic.it168.com/webclickdata/submit.aspx?number=" + Math.random();
    strSrc += "&url=" + document.referrer.replace('#', '');
    if (chanstr != undefined) {
        strSrc += "&Channel=" + chanstr
    } else {
        strSrc += "&Channel=" + Channel
    }
    strSrc += "&type=" + Type;
    strSrc += "&type2=0";
    strSrc += "&guid=" + guid;
    strSrc += "&targetUrl=" + ItemUrl.replace('#', '');
    strSrc += "&itemId=" + ItemId;
    strSrc += "&itemType=" + ItemType;
    strSrc += "&url2=" + window.location.href.replace('#', '');
    var regLeft = new RegExp("<", "g");
    var regRight = new RegExp("/>", "g");
    strSrc.replace(regLeft, "").replace(regRight, "");
    StaticExcute(strSrc);
}
function StatisticsUserAct2(guid, ItemType, ItemId, ItemUrl, Type, Type2, Channel) {
    var strSrc = "http://topic.it168.com/webclickdata/submit.aspx?number=" + Math.random();
    strSrc += "&url=" + document.referrer.replace('#', '');
    if (chanstr != undefined) {
        strSrc += "&Channel=" + chanstr
    } else {
        strSrc += "&Channel=" + Channel
    }
    strSrc += "&type=" + Type;
    strSrc += "&type2=" + Type2;
    strSrc += "&guid=" + guid;
    strSrc += "&targetUrl=" + ItemUrl.replace('#', '');
    strSrc += "&itemId=" + ItemId;
    strSrc += "&itemType=" + ItemType;
    strSrc += "&url2=" + window.location.href.replace('#', '');
    var regLeft = new RegExp("<", "g");
    var regRight = new RegExp("/>", "g");
    strSrc.replace(regLeft, "").replace(regRight, "");
     StaticExcute(strSrc);
}
function webClickData(obj, F_GradeOne, F_GradeTwo, F_GradeThree, F_ProductLineID, F_BrandID, F_ProductID, F_ChannelID, F_ArticleID, F_BBSBlockID, F_BBSArticleID) {
    var strSrc = "http://topic.it168.com/webclickdata/submit.aspx?type=clickData&number=" + Math.random();
    strSrc += "&url=" + window.location.href.replace('#', '');
    strSrc += "&F_GradeOne=" + escape(F_GradeOne);
    strSrc += "&F_GradeTwo=" + escape(F_GradeTwo);
    if (F_GradeThree == undefined) {
        F_GradeThree = ''
    }
    strSrc += "&F_GradeThree=" + escape(F_GradeThree);
    if (F_ProductLineID == undefined) {
        F_ProductLineID = ''
    }
    strSrc += "&F_ProductLineID=" + escape(F_ProductLineID);
    if (F_BrandID == undefined) {
        F_BrandID = ''
    }
    strSrc += "&F_BrandID=" + escape(F_BrandID);
    if (F_ProductID == undefined) {
        F_ProductID = ''
    }
    strSrc += "&F_ProductID=" + escape(F_ProductID);
    if (F_ChannelID == undefined) {
        F_ChannelID = ''
    }
    strSrc += "&F_ChannelID=" + escape(F_ChannelID);
    if (F_ArticleID == undefined) {
        F_ArticleID = ''
    }
    strSrc += "&F_ArticleID=" + escape(F_ArticleID);
    if (F_BBSBlockID == undefined) {
        F_BBSBlockID = ''
    }
    strSrc += "&F_BBSBlockID=" + escape(F_BBSBlockID);
    if (F_BBSArticleID == undefined) {
        F_BBSArticleID = ''
    }
    strSrc += "&F_BBSArticleID=" + escape(F_BBSArticleID);
    var href = '';
    if (obj.href != undefined) {
        href = obj.href.replace('#', '')
    }
    strSrc += "&targetUrl=" + href;
    var regLeft = new RegExp("<", "g");
    var regRight = new RegExp("/>", "g");
    strSrc.replace(regLeft, "").replace(regRight, "");
    StaticExcute(strSrc);
}
function StaticExcute(d) {
    var g = new Image(1, 1);
    g.onLoad = function() {};
    g.src = d;
}