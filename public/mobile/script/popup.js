/**
 * @desc    弹出层组件
 * @author  贺晨超 <earlyhe0@gmail.com>
 * @date    2014-09-17
 */

;(function(window, lib){

    // default config
    var defaultConfig = {

        content : '',

        size : 'auto',

        background : '#fff',

        opacity : 1,

        mask : false,

        maskOpacity : 0.1,

        position : 'center',

        radius : 8,

        offset : {
            left : 0,
            top: 0
        },

        closeTime : 0,

        action : false,

        actionConfig : [],

        // todo
        closeBtn : true,
        // 

        mainStyle : {
            'display' : 'inline-block',
            'overflow' : 'auto',
            'max-width' : '80%',
            'max-height' : '80%'
        }

    };

    lib.popup = function( content, config ){

        var cf = $.extend( true, {}, defaultConfig, config );

        cf.content = content || cf.content;

        // 初始化html
        var $mask = $('<div></div>').addClass('popup-mask'),
            $main = $('<div></div>').addClass('popup-main'),
            $content = $('<div></div>').addClass('popup-content');

        // 构建初步的样式
        $mask.css({
            'position' : 'fixed',
            'left' : 0,
            'top' : 0,
            'width' : '100%',
            'height' : '100%',
            'background' : 'rgba( 0, 0, 0, ' + cf.maskOpacity + ')',
            'zIndex' : 9999
        });

        // config.mainStyle
        cf.mainStyle['border-radius'] = cf.radius + 'px';
        cf.mainStyle['background'] = 'rgba(' + cf.background.colorRgb() + ',' + cf.opacity + ' )';
        $main.css(cf.mainStyle);

        $mask.append($main);
        $main.append($content);

        // config.mask
        if ( cf.mask === false ) {
            $mask.css({
                'background' : 'rgba(0,0,0,0)',
                'pointer-events' : 'none'
            });
        }

        // config.content
        $content.html( cf.content );

        // config.size
        if ( typeof cf.size === 'object' ) {
            
            $main.css({
                'width' : cf.size.width,
                'height' : cf.size.height
            });

        }

        // config.action
        if ( cf.action === true && cf.actionConfig.length > 0 ) {

            var $action = $('<div></div>').addClass('popup-action'),
                $actionBtn = $('<a></a>').addClass('popup-action-btn'),
                defaultAction = {
                    text : '',
                    callback : function(){}
                };

            $main.append($action);
            $actionBtn.css({
                'width' : 100/cf.actionConfig.length + '%',
                'text-align' : 'center',
                'font-size' : '0.72rem',
                'color' : '#5855d6',
                'display' : 'inline-block',
                'text-decoration' : 'none',
                'border-top' : '1px #eee solid',
                'padding' : '0.625rem 0'
            });

            for ( var k in cf.actionConfig ) {

                var $t = $actionBtn.clone(),
                    acf = $.extend( {}, defaultAction, cf.actionConfig[k]);
                    
                $t
                .html( acf.text )
                .on('click', {
                    acf : acf
                }, function(ev){
                    ev.data.acf.callback(); 
                });

                if ( k < cf.actionConfig.length-1 ) {
                    $t.css({
                        'box-sizing' : 'border-box',
                        'border-right' : '1px #eee solid'
                    });
                }

                $action.append($t);

            }

        } 

        // 插入popbox
        $('body').append( $mask ); 

        // 定位&偏移
        if ( cf.position === 'center' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '50%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : - $main.height()/2 + cf.offset.top
            });
        } else if ( cf.position === 'top' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '5%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : cf.offset.top
            });
        } else if ( cf.position === 'bottom' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '95%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : - $main.height() + cf.offset.top
            });
        }
        
        var _closeSt;
        // config.closeTime
        if ( cf.closeTime !== 0 ) {
            _closeSt = setTimeout(function(){
                method.fadeOut(function(){
                    method.remove();
                });
            }, cf.closeTime);
        }

        var method = {

            $mask : $mask,

            $main : $main,

            $contnet : $content,
            
            closeSt : _closeSt,

            show : function(){
                this.$mask.show();
                return this;
            },

            hide : function(){
                this.$mask.hide();
                return this;
            },

            fadeOut : function( callback ){
                var self = this;
                var fadeOut = function( a, b ){
                    a -= b;
                    self.$mask.css('opacity', a/200);
                    setTimeout(function(){
                        fadeOut(a,b);
                    }, b);
                    if ( a === 0 ) {
                        callback();
                    }
                };
                fadeOut(200, 20);
            },

            remove : function(){
                clearTimeout(this.closeSt);
                this.$mask.remove();
                return this;
            }

        };

        return method;

    };

    var _loading;
    lib.popup.loading = function( config ){
        if(_loading){
            _loading.remove();
            _loading=null;
        }
        config = $.extend( true, {}, {

            mainStyle : {
                'padding' : '.375rem .5rem'
            },
            mask : false,
            opacity : 0.5,
            radius : 5,
            background : '#000'

        }, config);
        
        
        return _loading=lib.popup('<style>.sk-fading-circle{width:1.5rem;height:1.5rem;position:relative}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#fff;border-radius:100%;-webkit-animation:sk-circleFadeDelay 1.2s infinite ease-in-out both;animation:sk-circleFadeDelay 1.2s infinite ease-in-out both}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}</style><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>', config );

    };
    
    var _note;
    lib.popup.note = function( text, config ){
        if(_note){
            _note.remove();
            _note=null;
        }
        var defaultCfg = {
            mainStyle : {
                'padding' : '.375rem .5rem'
            },
            mask : false,
            opacity : 0.5,
            radius : 5,
            closeTime : 1500,
            background : '#000'

        };

        if ( typeof config === 'number' ) {
            config = $.extend( true, {}, defaultCfg, {closeTime:config});
        } else {
            config = $.extend( true, {}, defaultCfg, config);
        }

        

        return _note=lib.popup( '<div style="color:#fff;font-size:0.8rem;margin:0">'+text+'</div>', config );

    };

    lib.popup.confirm = function(text,confirmCallback,cancelCallback,confirmBtn,cancelBtn){
        var config={};
        if(typeof confirmBtn === 'object'){
            config=confirmBtn;
        }else if(typeof confirmBtn === 'string' || cancelBtn === 'string'){
            actionConfig=[{},{}];
            if(confirmBtn === 'string'){
                actionConfig[1].text=confirmBtn;
            }
            if(cancelBtn === 'string'){
                actionConfig[0].text=cancelBtn
            }
            config.actionConfig=actionConfig;
        }
        config = $.extend( true, {}, {

            mainStyle : {
                width : '70%'
            },
            mask : true,
            radius : 10,
            action : true,
            actionConfig : [
                {
                    text : '取消',
                    callback : function(){
                        re.remove();
                        typeof cancelCallback === 'function' && cancelCallback.apply(re);
                    }
                },
                {
                    text : '确认',
                    callback : function(){
                        re.remove();
                        typeof confirmCallback === 'function' && confirmCallback.apply(re);
                    }
                }

            ]

        }, config);

        var re = lib.popup( '<div style="padding:1rem;text-align:center;font-size:0.75rem;">'+text+'</div>', config );

        return re;

    };

    lib.popup.alert = function( text, config, callback ){
        if(typeof config === 'string'){
            config={
                actionConfig:[{
                    text : config
                }]
            };
        }
        config = $.extend( true, {}, {

            mainStyle : {
                width : '70%'
            },
            radius : 10,
            mask : true,
            action : true,
            actionConfig : [
                {
                    text : '确认',
                    callback : function(){
                        re.remove();
                        typeof callback === 'function' && callback.apply(re);
                    }
                }
            ]

        }, config);

        var re = lib.popup( '<div style="padding:2rem .8rem;text-align:center;font-size: 0.68rem;">'+text+'</div>', config );

        return re;

    };

    // rgb转换函数
    String.prototype.colorRgb = function(){
        var sColor = this.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
            }
            return sColorChange.join(",");
        }else{
            return sColor;  
        }
    };

    lib.popup = lib.popup || popup;

})(window, window.lib || (window.lib = {}));
