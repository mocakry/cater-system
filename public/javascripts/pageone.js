define(['jquery-1.11.0'],function(){
	function clone(num,status){
		$clone = $('.boxone li.hide').clone(true).removeClass('hide').addClass('pageone-show');
		$clone.children('.desk').children('span').html(num);
		if(status == 1){
			$clone.children('.pageone-status').html('忙碌').css('background','red');
		}else if(status == 0){
			$clone.children('.pageone-status').html('空闲').css('background','green');
		}
		$('.add').before($clone);
	}

	function desknum(){
		return  $.ajax({
				type:"GET",
				url:'/pageone'
			})
	}

	function finddesk(page){
		return $.ajax({
				type:'POST',
				url:'/pageone/init',
				data:{
					page:page
				}
			});
	}
	function desk(){
		finddesk(0).done(function(data){
			if(data != 0){			
				var arr = JSON.parse(data);
				var count = Math.ceil(arr.length / 44) ;
				desknum().done(function(data){
					if(parseInt(data) / 45){
						var init = $('.pageone-page').length ;
						for( var i = init ; i < count ; i++){
							$clone = $('.pageone-page:first').clone(true);
							$clone.children('a').html(i + 1);
							$('.pageone-next').before($clone);	
						}	
					}
				});
			}
		});
	}
	return {
		init:(function(){
			finddesk(1).done(function(data){
				if(data != '0'){
					var arr = JSON.parse(data);
					for(var i = 0 ; i < arr.length ; i++){
						clone(arr[i].id,arr[i].checked);
					}				 	
				}
				desk();

		          });		
	           })(),
		click:(function(){
			$('.pageone .tip').click(function(){
				desknum().done(function(data){
					var data = parseInt(data);
					clone( data + 1,0);
					$.ajax({
						type:'POST',
						url:'/pageone',
						data:{
							id:data + 1,
							number:'0',
							dishs:'0',
							checked:"0"
						}
					});
				});		
			})
		})(),
		skip:(function(){	
			$('.pageone-page a').on('click',function(){
				var num = parseInt($(this).html());
				$('.pageone-show').remove();
				finddesk(num).done(function(data){
					if(data != '0'){
						var arr = JSON.parse(data);
						for(var i = 0 ; i < arr.length ; i++){
							clone(arr[i].id);
						}
						desk();
					}
			          });		

			});		
		})(),
		pageoneGet:(function(){
			$('.pageone-get').click(function(){
				$.ajax({
					type:'GET',
					url:'/pageone/getdesk',
					data:{
						num:$(this).parent().children('.desk').children('span').html()
					}
				}).done(function(data){
					console.log(data);
					location.href = '/deskdeail';
				});
			});
		})(),
		pageoneDelect:(function(){
			$('.pageone-delect').click(function(){
				$.ajax({
					type:'GET',
					url:'/pageone/delect',
					data:{
						num:$(this).parent().children('.desk').children('span').html()
					}
				}).done(function(data){
					console.log(data);
				});
				$(this).parent().remove();
			});			
		})(),
		jump:(function(){
			$('#pageone').click(function(){
				$('.pageone').removeClass('hide');
				$('.pagethree').addClass('hide');
			});
			$('#pagethree').click(function(){
				$('.pageone').addClass('hide');
				$('.pagethree').removeClass('hide');
			});			
		})()
	}
});