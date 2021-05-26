/*判断勾选框勾选*/
$(function () {
    $(".checked").click(function () {
        $(".checked img").toggle()
        $(".free_use p").css("display", "none")
        $(".free_use_button").toggleClass("bc_color")
    })


    //点击免费使用时，判断用户信息是否正确，判断是否勾选协议条款
    $(".free_use_button").click(function(){
        if($('.free_use_button').is('.bc_color')===true){
            $(".free_use p ").css('display', 'none')
        }else{
            $(".free_use p ").css( 'display', 'block' )
        }
    })
})


let from =getQueryString('from')
$('.xieyi').click(function(){
    if( $('.radio')[0].className==='radio active'){
        $('.radio')[0].className='radio'
        $('#goRegist').css('display','none')
        $('#canNotGo').css('display','block')
    }else{
        $('.radio')[0].className='radio active'
        $('#goRegist').css('display','block')
        $('#canNotGo').css('display','none')
    }
})

var Regist =(function(){
    var regist=function(){
        //这里放注册的全局变量
        var tel='';
        var psw= '';
        var code='';
        var picGuidCode='';
        var verify='';
        var canRegistFlag=true;
        var time=0;
        var canSendCode=true;
        this.getVrfPic=function() {
            $.ajax({
                url: 'https://stsqapit.tibosi.com/user/getVerifyCode_new',
                type: 'GET',
                async: true,
                dataType: "json",
                success: function (res) {
                    if(res.status===200){
                        picGuidCode=res.guidCode
                        $('#picImg').attr
                        ('src','https://stsqyzm.tibosi.com/VerificationCode/CreateVerificationCode/?guid='
                        +picGuidCode)
                    }else{
                        $('#picImg').attr('src','')
                    }
                }
            });
        },
        this.checkTel=function(){
            tel=$('#regTel').val()
             // 手机号码验证
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel))) {
                $('#regTelErr').html('*请填写正确的手机号码')
                canRegistFlag=false
                return
            } else {
                 // 检验手机号是否注册过
                $.ajax({
                    url: 'https://stsqapit.tibosi.com/user/isRegistered',
                    type: 'POST',
                    async: false,
                    data: { userNumber:tel },
                    dataType: "json",
                    success: function (res) {
                        if(res.status===200){
                            $('#regTelErr').html('*该手机号码已注册')
                            canRegistFlag=false
                        }else if(res.status===201){
                            $('#regTelErr').html('')
                        }else{
                            $('#regTelErr').html(res.message)
                            canRegistFlag=false
                        }
                    }
                });
            }
           
        }
        this.checkCode=function(){
            code=$('#regCode').val()
            if (!code) {
                canRegistFlag=false
                $('#regCodeErr').html('*请输入图片验证码')
            } else {
                $('#regCodeErr').html('')
            }
        }
        this.sendCode=function(){
            if(!canSendCode)return
            canRegistFlag=true;
            this.checkTel();
            this.checkCode()
            if(canRegistFlag){
                //发送手机验证码
                $.ajax({
                    url: 'https://stsqapit.tibosi.com/user/checkVerifyCode_new',
                    type: 'POST',
                    async: false,
                    data: { verifyCode:code, phoneNum:tel, guidCode:picGuidCode },
                    dataType: "json",
                    success: function (res) {
                        if(res.status===200){
                           //倒计时
                           canSendCode=false;
                           timeCount();
                        }else{
                            $('#regCodeErr').html(res.msg?res.msg:res.message)
                        }
                    }
                });
            }
        }
        function timeCount(){
            time = 60
            const timego = window.setInterval(function () {
                if (time <= 0) {
                    time = 0
                    window.clearInterval(timego)
                    canSendCode=true;
                    $('#codeBtn').css('background-color','#f7931b')
                    $('#codeBtn').html('获取验证码')
                } else {
                    $('#codeBtn').css('background-color','#ccc')
                    $('#codeBtn').html(time+'S')
                    time = --time
                }
            }, 1000)
        }
        this.checkVerify=function(){
            verify=$('#regVerify').val()
            if (!verify) {
                canRegistFlag=false
                $('#regVerifyErr').html('*请输入短信验证码')
            } else {
                $('#regVerifyErr').html('')
            }
        }
        this.checkPsw=function(){
            psw=$('#regPsw').val()
            if (!psw) {
                canRegistFlag=false
                $('#regPswErr').html('*请输入密码')
                return
            }
            if (psw.length < 6) {
                canRegistFlag=false
                $('#regPswErr').html('*密码长度不足6位')
            } else {
                $('#regPswErr').html('')
            }
        },
        this.goRegister=function(){
            canRegistFlag=true;
            this.checkTel();
            this.checkVerify();
            this.checkPsw()
            if(!canRegistFlag)return
            let param={ 
                userNumber: tel,
                passWord: hexMd5(psw),
                code: verify,
                parentID: 0,
                registerSource:from,
                phoneSN: 'luodiye' 
            }
            $.ajax({
                url: 'https://stsqapit.tibosi.com/user/insert',
                type: 'POST',
                async: false,
                data: param,
                dataType: "json",
                success: function (res) {
                    if(res.status===200){
                        //注册成功,登录一下
                        $.ajax({
                            url: 'https://stsqapit.tibosi.com/user/login',
                            type: 'POST',
                            async: false,
                            data: { userNumber:tel, passWord:hexMd5(psw),client:0 },
                            dataType: "json",
                            success: function (res) {
                                if(res.status===200){
                                    sessionStorage.setItem('userID',res.data[0].UserID)
                                    sessionStorage.setItem('guid',res.data[0].guid)
                                    //登录成功
                                    if(tid){
                                        window.location.href='/st_phone/testDetial?tid='+tid
                                    }else{
                                        window.location.href='/st_phone/search'
                                    }
                                }else{
                                    $('#regVerifyErr').html(res.message)
                                }
                            }
                        });
                        alert(" 您已注册成功，请下载刷题神器APP登录使用");
                    }else{
                        $('#regVerifyErr').html(res.msg?res.msg:res.message)
                    }
                }
            });
        }
    }
    return new regist()
})()
Regist.getVrfPic();


function getQueryString(name){
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

function openxieyi(type){
    switch(type){
        case 'fw':
            $('#iframe').attr('src','https://iosstsq.tibosi.com/html/userAgrm.html')
            break;
        case 'ys':
            $('#iframe').attr('src','https://iosstsq.tibosi.com/html/userPrivacyAgrm.html')
            break;
    }
    $('.login').css('display','none');
    $('.xieyiFrame').css('display','block');
}
function backLogin(){
    $('.login').css('display','block');
    $('.xieyiFrame').css('display','none');
}




