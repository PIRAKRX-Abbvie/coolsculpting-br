app.controller("managecookieController", function ($scope, $cookies) {
   /* Close Manage cookie section */
    $('.managecookie-section .close').on('click', function () {
        $(this).parent('.managecookie-section').hide('fast');
    });
    /* Close Manage cookie section */

    /* Enable Read more functionanality for Mobile */
    if ($('#cookiepolicytext').attr('data-isEEditor') == 0) {
        if($(window).width() < 768)
            moreCookieaction();
    }
    /* Enable Read more functionanality for Mobile */

    /*Check for Cookie on Page Load*/
    
        if ($cookies.get("AdvCookieConsent") == undefined || $cookies.get("acceptcookie") == undefined) {
            $('.managecookie-section').show('fast');
            removeallcookies();
            //CallPageDataLayer(1);
        }
    /*Check for Cookie on Page Load*/

        function removeallcookies() {
            $cookies.remove('acceptcookie');
            //$cookies.remove('FunCookieConsent');
            $cookies.remove('AdvCookieConsent');
            localStorage.removeItem("CookieExpiry");
            CallPageDataLayer(0);
        }

    /* On Page Load if Cookie is Accepted */

        if ($cookies.get("acceptcookie") == 'true') {
            
            var curdate = new Date();
            var currentdateUpdate = new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate());
            var currentdate = new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate());
            currentdateUpdate.setMonth(currentdateUpdate.getMonth() + 13);
       
       
            if (localStorage.getItem("CookieExpiry") != null) {
                var exdate = localStorage.getItem("CookieExpiry").split("/");
                var expireDate = new Date(exdate[0], exdate[1], exdate[2]);

                if (currentdate >= expireDate) {
                    removeallcookies();
                    $('.managecookie-section').show('fast');
                } else {
                    //CallDataLayer(1);
                    if ($cookies.get("AdvCookieConsent") == 'true') {
                        //datalayer call
                        CallDataLayer(1);
                    } else /* if ($cookies.get("FunCookieConsent") == 'flase' && $cookies.get("AdvCookieConsent") == 'false')*/
                    {
                        //datalayer call
                        CallDataLayer(0);

                    } 
                    //else if (($cookies.get("FunCookieConsent") == 'true' && $cookies.get("AdvCookieConsent") == 'false')) {
                    //    //datalayer call

                    //} else if (($cookies.get("FunCookieConsent") == 'flase' && $cookies.get("AdvCookieConsent") == 'false')) {
                    //    //datalayer call

                    //} else if (($cookies.get("FunCookieConsent") == undefined || $cookies.get("AdvCookieConsent") == undefined)) {
                        //datalayer call
                    //    removeallcookies();
                    //    $('.managecookie-section').show('fast');
                        
                    //}
                }
            } else {
                removeallcookies();
                $('.managecookie-section').show('fast');
               
           }
        
        } else {
            $('.managecookie-section').show('fast');
            //datalayer call
            CallPageDataLayer(0);
        }

    /* On Page Load if Cookie is Accepted */

    /* Check for Toggle */
        toggleSwitch();
        function toggleSwitch() {
            if ($cookies.get("AdvCookieConsent") == 'true') {
                $('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked', 'true');
            } else if ($cookies.get("AdvCookieConsent") == 'false') {
                $('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked', '');
            } else if ($cookies.get("AdvCookieConsent") == undefined) {
                $('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked', 'true');
            }
            //if ($cookies.get("FunCookieConsent") == 'true') {
            //    $('#managecookiepopup #panel2 .switch input[type=checkbox]').prop('checked', 'true');
            //} else if ($cookies.get("FunCookieConsent") == 'false') {
            //    $('#managecookiepopup #panel2 .switch input[type=checkbox]').prop('checked', '');
            //} else if ($cookies.get("FunCookieConsent") == undefined) {
            //    $('#managecookiepopup #panel2 .switch input[type=checkbox]').prop('checked', 'true');
            //}
        }
    /* Check for Toggle */

    /* On Cookie Accept */
  
    $('body').on('click', '#acceptcookie', function () {
        afterAccept();
    });

     /* On Cookie Accept */


    $('body').on('click', '#submitprefernces', function () {
        afterAccept();
    });

    function afterAccept() {

        if ($('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked') == true) {
            //$cookies.put("FunCookieConsent", "true");
            $cookies.put("AdvCookieConsent", "true");
            //Datalayer Call
            CallDataLayer(1);
        } else if ($('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked') == false) {
            //$cookies.put("FunCookieConsent", "false");
            $cookies.put("AdvCookieConsent", "false");
            //Datalayer Call
            CallDataLayer(0);
        }
        //} else if ($('#managecookiepopup #panel2 .switch input[type=checkbox]').prop('checked') == true && $('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked') == false) {
        //    $cookies.put("FunCookieConsent", "true");
        //    $cookies.put("AdvCookieConsent", "false");
        //    //Datalayer Call
        //} else if ($('#managecookiepopup #panel2 .switch input[type=checkbox]').prop('checked') == false && $('#managecookiepopup #panel3 .switch input[type=checkbox]').prop('checked') == true) {
        //    $cookies.put("FunCookieConsent", "false");
        //    $cookies.put("AdvCookieConsent", "true");
        //    //Datalayer Call
        //}

        $cookies.put("acceptcookie", "true");
        var curdate = new Date();
        var currentdateUpdate = new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate());
        currentdateUpdate.setMonth(currentdateUpdate.getMonth() + 13);
        localStorage.setItem("CookieExpiry", (currentdateUpdate.getFullYear()).toString() + "/" + currentdateUpdate.getMonth().toString() + "/" + currentdateUpdate.getDate().toString());
        $('#managecookiepopup').modal('hide');
        $(".managecookie-section").hide();
    }
    
    window.IsMobile = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    setTimeout(function () {
        window.checkStickyWarning();
    }, 200);
    $(window).on("scroll resize", function () {
        window.checkStickyWarning();
    });

    window.checkStickyWarning = function () {
        if ($('nav').outerHeight() != undefined) {
            var navheight = $('nav').outerHeight();
        }
        else {
            var navheight = 50;
        }
        if ($('.managecookie-section')[0] != undefined) {
            if ($('.managecookie-section').offset().top + $('.managecookie-section').height() >= $('footer').offset().top + navheight)
                $('.managecookie-section').css('position', 'relative');
            if ($(document).scrollTop() + window.innerHeight < $('footer').offset().top)
                $('.managecookie-section').css('position', 'fixed'); // restore when you scroll up
        }
    }
    $("#managecookiepopup").on("shown.bs.modal", function () {
        toggleSwitch();
    });
    function moreCookieaction() {
        var showChar;
        if ($(window).width() >= 1024) {
            showChar = 200;
        } else if ($(window).width() < 1024) {
            showChar = 200;
        }
        var moretext = $('#readmore').html();
        var lesstext = $('#readless').html();
        var full_content = "";
        var text_to_display = "";
        full_content = $('.cookie-text').find('aside').contents();

        $('.cookie-text').find('aside').each(function (i) {
            text_to_display += $(this).text().substr(0, showChar);
            $(this).empty();
        });

        $('.cookie-text').find('aside').html('<p>' + text_to_display + '..</p>');
        $('<a href="javascript:;" class="readmore">' + moretext + '</a>').appendTo($('.cookie-text').find('aside p:last-child'));

        $(document).on('click', '.readmore', function () {
            $('.cookie-text').find('aside').addClass('cookie-expanded');
            $('.cookie-text').find('aside').html($(full_content));
            $(this).hide();
            $('<a href="javascript:;" class="readless">' + lesstext + '</a>').appendTo($('.cookie-text').find('aside p:last-child'));
        });

        $(document).on('click', '.readless', function () {
            $('.cookie-text').find('aside').removeClass('cookie-expanded');
            $('.cookie-text').find('aside').html('<p>' + text_to_display + '..</p>');
            $(this).hide();
            $('<a href="javascript:;" class="readmore">' + moretext + '</a>').appendTo($('.cookie-text').find('aside p:last-child'))
        });


    }
    function CallDataLayer(a) {
        if (a == 1) {
            dataLayer.push({
                'cookieConsented': 1,
                'event': 'cookieConsentPopupAccepted'
            });
        } else {            
            dataLayer.push({
                'cookieConsented': 0,
                'event': 'cookieConsentPopupAccepted'
            });
        }
    }
    function CallPageDataLayer(a) {
        if (a == 1) {
            dataLayer.push({
                'cookieConsented': 1,
                'event': 'cookieConsentPageLoadAlreadyAccepted'
            });
        } else {
            dataLayer.push({
                'cookieConsented': 0,
                'event': 'cookieConsentPageLoadAlreadyAccepted'
            });
        }
    }

   
});




