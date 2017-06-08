/**
 * Use SessionStorage to keep track of all GET parameters used while on a site,
 * so that other client-side scripts on the site can access this aggregate data as one string.
 *
 *      Use: sessionStorage.getItem('crm.session_params')
 */
;(function (window) {
    (function () {
        var success = false;
        try {
            if (typeof window.sessionStorage !== 'undefined') {
                var getStart = window.location.href.indexOf('?');
                if (getStart >= 0) {
                    var paramStrings = window.location.href.slice(getStart + 1).split('&');
                    if (paramStrings.length) {
                        // Prepend existing parameters from other pages, and parse in order.
                        // New values will override the old.
                        var sessionParamString = window.sessionStorage.getItem('crm.session_params');
                        if (sessionParamString) {
                            paramStrings = sessionParamString.split('&').concat(paramStrings);
                        }
                        var params = [];
                        for (var i = 0; i < paramStrings.length; i++) {
                            var arr = paramStrings[i].split('='),
                                key = null,
                                value = null;
                            if (typeof arr[0] !== 'undefined') {
                                key = arr[0];
                            }
                            if (typeof arr[1] !== 'undefined') {
                                value = arr[1];
                            }
                            if (key.length) {
                                params[key] = value;
                            }
                        }
                        // We now have an array of updated parameters, and can merge them to a new string.
                        paramStrings = [];
                        for (var key in params) {
                            if (!params.hasOwnProperty(key)) {
                                continue;
                            }
                            paramStrings.push(key + '=' + params[key]);
                        }
                        // Saving the value for next page load.
                        sessionParamString = paramStrings.join('&');
                        window.sessionStorage.setItem('crm.session_params', sessionParamString);
                    }
                }
                success = true;
            }
        } catch (e) {
        }
        if (!success && typeof console.error !== 'undefined') {
            console.error('There was an issue attempting to capture session parameters.');
        }
    }());
}(typeof window !== 'undefined' ? window : this));
