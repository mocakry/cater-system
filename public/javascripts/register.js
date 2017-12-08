define(["jquery-1.11.0"],function(){
	return {
		form:(function(){
			$('#nickname').on('change',function(){
				if(!$(this).val()){
					$("#name").html("昵称不能为空!").addClass("warning");
				}else{
					$.ajax({
						type:'POST',
						url:'/register/nickname',
						data:{
							nickname:$('#nickname').val()
						}
					}).done(function(data){
						if(data == '1'){
							$('#nickname').val('');
							$("#name").html("昵称不能重复!").addClass("warning");
						}else if(data == '0'){
							$("#name").html("昵称可用").addClass("sure");
						}
					});
				}
			});	
			var emailreg = /^\w+(\.\w+)*@\w+(\.\w+)+$/gi ;
			$('#email').on('change',function(){
				if(!$(this).val()){
					$('#mail').html("邮箱不能为空").addClass("warning");
				}else if(emailreg.test($(this).val())){
					$.ajax({
						type:'POST',
						url:'/register/email',
						data:{
							email:$('#email').val()
						}
					}).done(function(data){
						if(data == '1'){
							$('#email').val('');
							$("#mail").html("邮箱不能重复!").addClass("warning");
						}else if(data == '0'){
							$("#mail").html("邮箱可用").addClass("sure");
						}
					});
				}else{
					$(this).val('');
					$('#mail').html("邮箱不符合格式!").addClass("warning");
				}
			});
			function chartype(char){
				if(char>=48&&char<=57){
					return 1;
				}else if(char>=65&&char<=90){
					return 2;
				}else if(char>=97&&char<=122){
					return 4;
				}else{
					return 8;
				}
			}
			$('#password').on('input',function(){
				var end1 = 0 ;
				var end2 = 0;
				var end3 = 0;
				var end4 = 0;
				var result = 0;
				var val = $(this).val();
				for(var i = 0 ; i < val.length ; i++){
					if(chartype(val.charCodeAt(i)) == 1){
						end1 = 1 ;
					}
					if(chartype(val.charCodeAt(i)) == 2){
						end2 = 1 ;
					}
					if(chartype(val.charCodeAt(i)) == 4){
						end3 = 1 ;
					}
					if(chartype(val.charCodeAt(i)) == 8){
						end4 = 1 ;
					}
				}
				result = end1 + end2 + end3 + end4 ;
				$('#judgment span').removeClass('tipcolor');
				if(result == 1 || result == 2){
					$('#judgment .weak').addClass('tipcolor');
				}
				else if(result == 3){
					$('#judgment .weak').addClass('tipcolor');
					$('#judgment .normal').addClass('tipcolor');
				}
				else if(result == 4){
					$('#judgment .weak').addClass('tipcolor');
					$('#judgment .normal').addClass('tipcolor');
					$('#judgment .strong').addClass('tipcolor');
				}
			});
			var psdreg = /^.{6,16}$/gi;
			$('#password').on('change',function(){
				if(!$(this).val()){
					$('#psd').html('密码不能为空!').addClass('warning');
				}else if(psdreg.test($(this).val())){
					$('#psd').html('密码可用!').addClass('sure');
				}else{
					$(this).val("");
					$('#psd').html('密码不符合要求!').addClass('warning');
				}
			});
			$('#passwordagain').on('change',function(){
				if($(this).val() == $('#password').val()){
					$('#psdagain').html('两次密码一致，验证成功!').addClass('sure');
				}else{
					$(this).val('');
					$('#psdagain').html('两次密码不一致，验证失败!').addClass('warning');
				}
			});
			function random(){
				var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'] ;
				var randoms = [];
				for(var i = 0 ; i < 4 ; i++){
					randoms.push(arr[Math.floor(Math.random()*arr.length)]);
				}
				$('#yzmcontain').html(randoms.join(''));
			}
			random();
			yanzheng();
			$('.flash').click(function(){
				random();
				$('#yzm').val('');
				$('#pdyzm').html('验证码不能为空!').addClass('warning');
				yanzheng();
			});
			function yanzheng(){
				$('#yzm').on('change',function(){
					if(!$(this).val()){
						$('#pdyzm').html('验证码不能为空!').addClass('warning');
					}
					else if($(this).val() == $('#yzmcontain').html()){
						$('#pdyzm').html('验证码正确!').addClass('sure');
					}else{
						$(this).val('');
						$('#pdyzm').html('验证码不正确!').addClass('warning');
					}
				});
			}
			$('.register').click(function(){
				if($('#nickname').val() && $('#email').val() && $('#password').val() && $('#passwordagain').val() && $('#yzm').val()){
					$.ajax({
						type:'POST',
						url:'/register',
						data:{
							nickname:$('#nickname').val(),
							email:$('#email').val(),
							password: $('#password').val()
						}
					});
				}else{
					alert('您还有信息未填写，请填写后再提交')
				}	
			});
		})()
	}
});