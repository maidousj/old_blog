$(document).ready(function() {

	//重置按钮
	$('.m-code-reset').on('touchend', function(e) {
		$('.m-code-input').val('').focus();
		
		e.preventDefault();
	});
	var loadingDialog;
	function validate(securityCode) {
		$.ajax({
			type: "GET",
			url: "/validate",
			data: {"securityCode": securityCode},
			beforeSend: function () {
				loadingDialog = lib.popup.loading({mask: true});
			},
			success: function (result) {
				/*popDialog.run({
					msg: result.msg,
					action: 'touchend'
				});*/
				lib.popup.alert(result.msg);
			},
			complete: function () {
				loadingDialog.remove();
			}
		});
	}
	//提交判断验证码位数
	$('#J_indexGo').on('touchend', function(e) {
		if(testCode($("#J_indexCode").val())){
			var securityCode = $("#J_indexCode").val();
			validate(securityCode);
		}
	});
	$('#J_domesticGo').on('touchend', function(e) {
		if(testCode($("#J_domesticCode").val())){
			var securityCode = $("#J_domesticCode").val();
			validate(securityCode);
		}
	});
	$('#J_overseasGo').on('touchend', function(e) {
		if(testCode($("#J_overseasCode").val())){
			var securityCode = $("#J_overseasCode").val();
			validate(securityCode);
		}
	});

	//设置品牌授权图高度
	var $brandPicHeight = $(window).height() - $('.header').outerHeight(true) - $('#J_domCode').outerHeight(true) - $('.m-banner').outerHeight(true);
	$('#J_brandPic').css({'height': $brandPicHeight+'px', 'line-height': $brandPicHeight+'px'});
});

//验证 验证码位数
var testCode = function(code) {
	if ($.trim(code).length < 13) {
		/*popDialog.run({
			msg: '验证码位数不正确,请重新输入!',
			action: 'touchend'
		});*/
		lib.popup.alert('验证码位数不正确,请重新输入!');
		return false;
	}
	return true;
};

//输出产品信息，传入一个数组，数组每一项对应一行产品信息
var outContent = function(content) {
	$('#J_infoVal p').each(function(i) {
		$(this).html(content[i]);
	});
}
