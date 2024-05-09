(function($){"use strict";jQuery(document).ready(function(){var windows=$(window),screenSize=windows.width(),sticky=$(".header-sticky"),stickyAbsolute=$(".header-sticky--absolute"),$html=$("html"),$body=$("body");windows.on("scroll",function(){var scroll=windows.scrollTop(),headerHeight=sticky.height(),headerHeightAbsolute=stickyAbsolute.height();screenSize>=992&&(scroll<headerHeight?sticky.removeClass("is-sticky"):sticky.addClass("is-sticky"),scroll<headerHeightAbsolute?stickyAbsolute.removeClass("is-sticky--absolute"):stickyAbsolute.addClass("is-sticky--absolute")),scroll>=400?$("#scroll-top").fadeIn():$("#scroll-top").fadeOut()}),$("#scroll-top").on("click",function(){$("html,body").animate({scrollTop:0},2e3)}),$("#minicart-trigger").on("click",function(e){e.preventDefault(),$(this).siblings(".mini-cart").toggleClass("active"),$("#settings-menu-wrapper").removeClass("active"),$("body").addClass("active-overlay")}),$("#header-settings-trigger").on("click",function(e){e.preventDefault(),$(this).siblings(".settings-menu-wrapper").toggleClass("active"),$("#mini-cart").removeClass("active"),$("body").addClass("active-overlay")}),$("#currency-trigger").on("click",function(e){e.preventDefault(),$(this).siblings("#currency-menu").toggleClass("active"),$("body").addClass("active-overlay")}),$("#language-trigger").on("click",function(e){e.preventDefault(),$(this).siblings("#language-menu").toggleClass("active"),$("body").addClass("active-overlay")}),$("body").on("click",function(e){var $target=e.target;!$($target).is(".header-cart-icon, .header-settings-icon, #currency-trigger, #language-trigger")&&!$($target).parents().is(".header-cart-icon, .header-settings-icon, #currency-trigger")&&$("body").hasClass("active-overlay")&&($(".mini-cart, .settings-menu-wrapper, #currency-menu, #language-menu").removeClass("active"),$("body").removeClass("active-overlay"))}),$(".ps-scroll").each(function(){if($(".ps-scroll").length){const ps=new PerfectScrollbar($(this)[0])}}),$("#search-overlay-trigger").on("click",function(){$("#search-overlay").show()}),$("#close-search-overlay").on("click",function(){$("#search-overlay").hide()});var $offCanvasNav=$(".offcanvas-navigation"),$offCanvasNavSubMenu=$offCanvasNav.find(".sub-menu");$offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>'),$offCanvasNavSubMenu.slideUp(),$offCanvasNav.on("click","li a, li .menu-expand",function(e){var $this=$(this);$this.parent().attr("class").match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)&&($this.attr("href")==="#"||$this.hasClass("menu-expand"))&&(e.preventDefault(),$this.siblings("ul:visible").length?($this.parent("li").removeClass("active"),$this.siblings("ul").slideUp()):($this.parent("li").addClass("active"),$this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active"),$this.closest("li").siblings("li").find("ul:visible").slideUp(),$this.siblings("ul").slideDown()))}),$("#mobile-menu-trigger").on("click",function(){$("#offcanvas-mobile-menu").removeClass("inactive").addClass("active")}),$("#offcanvas-menu-close-trigger").on("click",function(){$("#offcanvas-mobile-menu").removeClass("active").addClass("inactive")});var $htSlickSlider=$(".ht-slick-slider");($html.attr("dir")=="rtl"||$body.attr("dir")=="rtl")&&$htSlickSlider.attr("dir","rtl"),$htSlickSlider.each(function(){for(var $this=$(this),$setting=$this.data("slick-setting")?$this.data("slick-setting"):"",$autoPlay=$setting.autoplay?$setting.autoplay:!1,$autoPlaySpeed=parseInt($setting.autoplaySpeed,10)||2e3,$speed=parseInt($setting.speed,10)||2e3,$asNavFor=$setting.asNavFor?$setting.asNavFor:null,$appendArrows=$setting.appendArrows?$setting.appendArrows:$this,$appendDots=$setting.appendDots?$setting.appendDots:$this,$arrows=$setting.arrows?$setting.arrows:!1,$prevArrow=$setting.prevArrow?'<button class="'+$setting.prevArrow.buttonClass+'"><i class="'+$setting.prevArrow.iconClass+'"></i></button>':'<button class="slick-prev">previous</button>',$nextArrow=$setting.nextArrow?'<button class="'+$setting.nextArrow.buttonClass+'"><i class="'+$setting.nextArrow.iconClass+'"></i></button>':'<button class="slick-next">next</button>',$centerMode=$setting.centerMode?$setting.centerMode:!1,$centerPadding=$setting.centerPadding?$setting.centerPadding:"50px",$dots=$setting.dots?$setting.dots:!1,$fade=$setting.fade?$setting.fade:!1,$focusOnSelect=$setting.focusOnSelect?$setting.focusOnSelect:!1,$infinite=$setting.infinite?$setting.infinite:!1,$pauseOnHover=$setting.pauseOnHover?$setting.pauseOnHover:!0,$rows=parseInt($setting.rows,10)||1,$slidesToShow=parseInt($setting.slidesToShow,10)||1,$slidesToScroll=parseInt($setting.slidesToScroll,10)||1,$swipe=$setting.swipe?$setting.swipe:!0,$swipeToSlide=$setting.swipeToSlide?$setting.swipeToSlide:!1,$variableWidth=$setting.variableWidth?$setting.variableWidth:!1,$vertical=$setting.vertical?$setting.vertical:!1,$verticalSwiping=$setting.verticalSwiping?$setting.verticalSwiping:!1,$rtl=!!($setting.rtl||$html.attr("dir")=="rtl"||$body.attr("dir")=="rtl"),$responsiveSetting=typeof $this.data("slick-responsive")<"u"?$this.data("slick-responsive"):"",$responsiveSettingLength=$responsiveSetting.length,$responsiveArray=[],i=0;i<$responsiveSettingLength;i++)$responsiveArray[i]=$responsiveSetting[i];$this.slick({autoplay:$autoPlay,autoplaySpeed:$autoPlaySpeed,speed:$speed,asNavFor:$asNavFor,appendArrows:$appendArrows,appendDots:$appendDots,arrows:$arrows,dots:$dots,centerMode:$centerMode,centerPadding:$centerPadding,fade:$fade,focusOnSelect:$focusOnSelect,infinite:$infinite,pauseOnHover:$pauseOnHover,rows:$rows,slidesToShow:$slidesToShow,slidesToScroll:$slidesToScroll,swipe:$swipe,swipeToSlide:$swipeToSlide,variableWidth:$variableWidth,vertical:$vertical,verticalSwiping:$verticalSwiping,rtl:$rtl,prevArrow:$prevArrow,nextArrow:$nextArrow,responsive:$responsiveArray})}),windows.on("load",function(){$(".masonry-category-layout").masonry(),$(".masonry-category-layout--style2").masonry()}),$("#mc-form").ajaxChimp({language:"en",callback:mailChimpResponse,url:"http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"}),$("#mc-form2").ajaxChimp({language:"en",callback:mailChimpResponse2,url:"http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"});function mailChimpResponse(resp){resp.result==="success"?($(".mailchimp-success").html(""+resp.msg).fadeIn(900),$(".mailchimp-error").fadeOut(400)):resp.result==="error"&&$(".mailchimp-error").html(""+resp.msg).fadeIn(900)}function mailChimpResponse2(resp){resp.result==="success"?($(".mailchimp-success2").html(""+resp.msg).fadeIn(900),$(".mailchimp-error2").fadeOut(400)):resp.result==="error"&&$(".mailchimp-error2").html(""+resp.msg).fadeIn(900)}$("#close-newsletter-popup").on("click",function(){$("#newsletter-popup-area").addClass("d-none")}),$("#price-range").slider({range:!0,min:0,max:1e3,values:[0,900],slide:function(event,ui){$("#price-amount").val("$"+ui.values[0]+" - $"+ui.values[1])}}),$("#price-amount").val("$"+$("#price-range").slider("values",0)+" - $"+$("#price-range").slider("values",1)),$(".grid-icons button").on("click",function(e){e.preventDefault();var shopProductWrap=$(".shop-product-wrap"),viewMode=$(this).data("target");$(".grid-icons button").removeClass("active"),$(this).addClass("active"),shopProductWrap.removeClass("grid three-column four-column five-column list").addClass(viewMode),viewMode=="grid three-column"&&shopProductWrap.children().addClass("col-lg-4").removeClass("col-lg-3 col-lg-is-5"),viewMode=="grid four-column"&&shopProductWrap.children().addClass("col-lg-3").removeClass("col-lg-4 col-lg-is-5"),viewMode=="grid five-column"&&shopProductWrap.children().addClass("col-lg-is-5").removeClass("col-lg-4 col-lg-3")}),$("[data-countdown]").each(function(){var $this=$(this),finalDate=$(this).data("countdown");$this.countdown(finalDate,function(event){$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown-time">%D</span><span class="single-countdown-text">Days</span></div><div class="single-countdown"><span class="single-countdown-time">%H</span><span class="single-countdown-text">Hours</span></div><div class="single-countdown"><span class="single-countdown-time">%M</span><span class="single-countdown-text">Mins</span></div><div class="single-countdown"><span class="single-countdown-time">%S</span><span class="single-countdown-text">Secs</span></div>'))})}),$(".product-details-big-image-slider-wrapper .single-image").zoom(),$(".big-image-slider-wrapper .big-image-slider-single-item").zoom(),$('[name="payment-method"]').on("click",function(){var $value=$(this).attr("value");$(".single-method p").slideUp(),$('[data-method="'+$value+'"]').slideDown()}),$("[data-shipping]").on("click",function(){$("[data-shipping]:checked").length>0?$("#shipping-form").slideDown():$("#shipping-form").slideUp()});var blogPostSlider=$(".blog-image-gallery");blogPostSlider.slick({prevArrow:'<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',arrows:!0,autoplay:!0,autoplaySpeed:4e3,dots:!1,pauseOnFocus:!1,pauseOnHover:!1,infinite:!0,slidesToShow:1}),$(".product_thumb_slider").slick({slidesToShow:4,slidesToScroll:1,autoplay:!1,autoplaySpeed:5e3,dots:!1,arrows:!0,prevArrow:'<div class="slick-prev"><i class="fa fa-angle-left"></i></div>',nextArrow:'<div class="slick-next"><i class="fa fa-angle-right"></i></div>',responsive:[{breakpoint:1169,settings:{slidesToShow:4}},{breakpoint:969,settings:{slidesToShow:4}},{breakpoint:767,settings:{slidesToShow:4}},{breakpoint:479,settings:{slidesToShow:3}}]}),$(".related_product_slider").slick({slidesToShow:4,slidesToScroll:1,autoplay:!1,autoplaySpeed:5e3,dots:!1,arrows:!1,responsive:[{breakpoint:1169,settings:{slidesToShow:4}},{breakpoint:969,settings:{slidesToShow:3}},{breakpoint:767,settings:{slidesToShow:2}},{breakpoint:479,settings:{slidesToShow:1}}]})})})(jQuery);
//# sourceMappingURL=/cdn/shop/t/16/assets/theme.js.map?v=100505580226293466351643883185
