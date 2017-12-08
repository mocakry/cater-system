define(['jquery-1.11.0'],function(){
	function getname(){
	  return      $.ajax({
			type:'GET',
			url:'/dishs/name'
		      });
	}
	function clone(name){
	   return 	$.ajax({
				type:'POST',
				url:'/dishs/getself',
				data:{
					name:name
				}
			    });
	}
	function all(){
		$.ajax({
			type:'POST',
			url:'/dishs/getdishs'
		}).done(function(data){
			if(data == '0'){
				$('.pagethree-dishs').html('没菜开啥饭店，快去添几个菜吧').css('color','red');
			}else{
				$('.table-title-1').removeClass('hide');
				data = JSON.parse(data);
				for(var i = 0 ; i < data.length ; i++){
					var $clone = $('.pagethree-all-hide:first').clone().removeClass('hide');
					$clone.attr('idnum',data[i]._id);
					$clone.children('img').attr('src',data[i].src); 
					$clone.children('.pagethree-dishname').html(data[i].name);
					$clone.children('a').html(data[i].intro);
					$clone.children('.pagethree-updatename').html(data[i].updateperson);
					$('.pagethree-contain').append($clone);
				}
				godeatil();	
			}
		});
	}
	function self(){
		getname().done(function(data){
			clone(data).done(function(data){
		    	if(data == '0'){
		    		$('.pagethree-dishs').html('您尚未上传菜品，赶快去上传吧').css('color','red');
		    	}else{
		    		$('.table-title-2').removeClass('hide');
		    		data = JSON.parse(data);
		    		for(var i = 0 ; i < data.length ; i++){
		    			var $clone = $('.pagethree-self-hide:first').clone().removeClass('hide').addClass('pagethree-show');
		    			$clone.attr('idnum',data[i]._id);
	    				$clone.children('img').attr('src',data[i].src); 
		    			$clone.children('.pagethree-dishname').html(data[i].name);
		    			$clone.children('a.pagethree-describe').html(data[i].intro);
		    			$('.pagethree-contain').append($clone);
		    		}
		    	 }
		    	 $('.pagethree-show .pagethree-delect').on('click',function(){
    				$(this).parent().remove();
				$.ajax({
					type:'GET',
					url:'/dishs/control',
					data:{
						num:1,
						id:$(this).parent().attr('idnum')
					}
				}).done(function(data){
					console.log(data);
				});	
			});
		    	 godeatil();
		});	     	
	});
}
	function status(status,num){
		 return     $.ajax({
				type:'POST',
				url:'/dishs/status',
				data:{
					status:status,
					num:num
				}
			      });	
	}
	
	function godeatil(){
		$('.pagethree-all-hide a,.pagethree-self-hide a').click(function(){
			$.ajax({
				type:'GET',
				url:'/dishs/control',
				data:{
					num:2,
					id:$(this).parent().attr('idnum')
				}
			}).done(function(data){
				console.log(data);
			});
		});
	}
	return {
		init:(function(){
			status(0).done(function(data){
				if(data == 1){
					$('.pagethree-showall').addClass('target');
					all();	
				}else{
					$('.pagethree-onlyself').addClass('target');
					self();	
				}
			});	
			
	 	})(),
		whatshow:(function(){
			$('.pagethree-onlyself').click(function(){
				$('.pagethree-onlyself').addClass('target');
				$('.pagethree-showall').removeClass('target');
				$('.table-title-1,.table-title-2').addClass('hide');
				$('.pagethree-contain').html('');
				self();
				status(1,0).done(function(data){
					console.log(data);
				});
			});
			$('.pagethree-showall').click(function(){
				$('.pagethree-onlyself').removeClass('target');
				$('.pagethree-showall').addClass('target');
				$('.table-title-1,.table-title-2').addClass('hide');
				$('.pagethree-contain').html('');
				all();
				status(1,1).done(function(data){
					console.log(data);
				});
			});		
		})()
	}
});