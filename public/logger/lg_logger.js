var lg_logger = function (actual_p , api_='https://out.lendstart.com/pxl/ltxru') {
    this.createGuid = function()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }  
    this.api_ = api_;
    this.start_ = Date.now();
    this.actual_p = actual_p;
    var that = this;
    var page_ = window.location.href.toLowerCase().trim().replace('https://', '').replace('http://', '');
    var host_ = window.location.href.split('?')[0].toLowerCase().trim().replace('https://', '').replace('http://', '').split('/')[0];
    var path_ = page_.split('?')[0].replace(host_, '');
    if (path_.startsWith('/'))
        path_ = path_.substr(1);
    if (path_.endsWith('/'))
        path_ = path_.substr(0, path_.length - 1);

    var a_page_ = this.actual_p.toLowerCase().trim().replace('https://', '').replace('http://', '');
    var a_page_no_params_ = this.actual_p.split('?')[0].toLowerCase().trim().replace('https://', '').replace('http://', '');
    var a_host_ = this.actual_p.split('?')[0].toLowerCase().trim().replace('https://', '').replace('http://', '').split('/')[0];
    var a_path_ = a_page_.split('?')[0].replace(a_host_, '');
    if (a_path_.startsWith('/'))
        a_path_ = a_path_.substr(1);
    if (a_path_.endsWith('/'))
        a_path_ = a_path_.substr(0, a_path_.length - 1);

    window["lg_page_load_uid"] = window["lg_page_load_uid"] || this.createGuid();
    var page_load_uid = window["lg_page_load_uid"];
    this.spot_load_uid_ = this.spot_load_uid_ || this.createGuid();
    this.log = function (event_, extra_params , api_or_ , stream_) {
        var uid_ = that.createGuid();
        var pixelUrl = 'https://out.' + api_or_ + '/pxl/' + ((typeof(stream_) === 'undefined') ? 'ltxru' : stream_);
        pixelUrl += "?event=" + encodeURIComponent(event_);
        pixelUrl += "&loguid=" + encodeURIComponent(uid_);
        pixelUrl += "&url=" + encodeURIComponent(host_);
        pixelUrl += "&original_url=" + encodeURIComponent(a_page_no_params_);
        pixelUrl += "&path=" + encodeURIComponent(path_);
        var t_c = Math.round((Date.now() - that.start_) / 1000);
        pixelUrl += "&live=" + t_c;
        if (typeof (extra_params) !== 'undefined') {

            if (typeof (Object.keys(extra_params)) !== 'undefined') {
                if (typeof(extra_params["extra_data"]) === 'undefined')
                    extra_params["extra_data"] = {};
                else
                {
                    if (extra_params["extra_data"] == 'undefined' || extra_params["extra_data"] == '')
                        extra_params["extra_data"] = {};
                }
                var keys_ = Object.keys(extra_params);
                if (keys_.length > 0) {
                    for (var i = 0; i < keys_.length; i++) {
                        var k = keys_[i];
                        var v = extra_params[k];
                        if (typeof(v) == 'object')
                            v = JSON.stringify(v);
                        pixelUrl += "&" + k + "=" + encodeURIComponent(v);
                    }
                }
            }
        }
        if (navigator.sendBeacon) {
            let result = navigator.sendBeacon(pixelUrl);
        } else {
            var track = new Image();
            track.src = pixelUrl;
        }
    }

}
var lg_manager = function()
{
    this.api = function(api_)
    {
        __that_.lg_log.api_ = api_;
    }
    var __that_ = this;
    try {
        var page_ = window.location.href.split('?')[0].toLowerCase().trim();
        if (typeof (u_) !== 'undefined' && u_ != null && u_ != "")
            page_ = u_.split('?')[0].toLowerCase().trim();
        if (page_.indexOf('#') !== -1)
            page_ = page_.split('#')[0];

        __that_.lg_log = new lg_logger(page_);
    }
    catch (e) {  
        console.log(e);
    }
    this.log = function(m_ , extra_ , api_or_ , stream_) {
        __that_.lg_log.log(m_ , extra_, api_or_ , stream_);
    }
    window.addEventListener('ry_send_log', function(e) {
        l_logger.log(e.detail.event, e.detail.extra, e.detail.api, e.detail.stream)
    });
}
window.l_logger = new lg_manager();  

