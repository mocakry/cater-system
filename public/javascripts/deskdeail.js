define(['jquery-1.11.0'],function(){
	function finddesk(){
		return    $.ajax({
				type:'POST',
				url:'/deskdeail'
			    })
	 }
	return {
		aftergetdata:(function(){
			finddesk().done(function(data){
				$('.deskdeail-num span').html(data.id);
				if(data.number != 0){
					$('.deskdeail-number').children('input').val(data.number);
				}
				if(data.dishs != 0){
					var dishs = JSON.parse(data.dishs);
					for(var i = 0 ; i < dishs.length ; i++){
						var $clone = $('.custom-need li.hide').clone(true).removeClass('hide').addClass('lishow');
						$clone.children('.deskdeatil-name').html(dishs[i].name);
						$clone.children('.deskdeatil-num').html(dishs[i].num);
						$clone.children('.deskdeatil-price').html(dishs[i].price);
						$('.custom-need').append($clone);
					}
					var allprice = 0 ;
					for(var i = 0 ; i < $('.lishow').length ; i++){
						allprice += parseInt($('.lishow').eq(i).children('.deskdeatil-num').html()) *parseInt($('.lishow').eq(i).children('.deskdeatil-price').html());
					}
					$('.deskdeatil-allprice span').html(allprice);
				}
			});
		})(),
		getmenu:(function(){
			$.ajax({
				type:'POST',
				url:'/dishs/getdishs'
			}).done(function(data){
				if(data == '0'){
					$('#check-container').html('还未推出菜品，稍后再来点单吧');
				}else{
					data = JSON.parse(data);
					for(var i = 0 ;i < data.length ; i++){
						var $clone = $('#check-container tr.hide').clone(true).removeClass('hide').addClass('trshow');
						$clone.attr('dishid',data[i]._id);
						$clone.children('td:first').html(data[i].name);
						$clone.children('td:nth-child(2)').html(data[i].price);
						$clone.children('td:nth-child(3)').children('a').html(data[i].intro);
						$clone.children('td:nth-child(4)').children('img').attr('src',data[i].src);
						$clone.appendTo('.dish-menu');
						$('.trshow td:nth-child(3)').click(function(){
							$.ajax({
								type:'GET',
								url:'/dishs/control',
								data:{
									num:2,
									id:$(this).parent().attr('dishid')
								}
							}).done(function(data){
								console.log(data);
							});
						});
					}
					$.ajax({
						type:'POST',
						url:'/deskdeail',
						async:false
					}).done(function(data2){
						if(data2.dishs != 0){
							var dishs = JSON.parse(data2.dishs);
							for(var  i = 0 ; i < data.length ; i++){
								for(var j = 0 ; j < dishs.length ; j++){
									if(data[i]._id == dishs[j].dishid){
										for(var z = 0 ; z < $('.trshow').length ; z++){
											if($('.trshow').eq(z).attr('dishid') == data[i]._id){
												$('.trshow').eq(z).children('td').children('input').val(dishs[j].num);
											}
										}			
									}
								}
							}
						}
					});
					 $('.submitting').click(function(){
					 	var arr = [];
					 	for(var i = 0 ; i < $('.trshow').length ; i++){
					 		if($('.trshow').eq(i).children('td:last').children('input').val() >= 1){
					 			var dishid = $('.trshow').eq(i).attr('dishid');
					 			var num = $('.trshow').eq(i).children('td:last').children('input').val();
					 			var name = $('.trshow').eq(i).children('td:first').html();
					 			var price = $('.trshow').eq(i).children('td:nth-child(2)').html();
					 			arr.push({
					 				"dishid":dishid,
					 				"num":num,
					 				"name":name,
					 				"price":price
					 			});
					 		}
					 	}
					 	$.ajax({
					 		type:'POST',
					 		url:'/deskdeail/update',
					 		data:{
					 			dishs:JSON.stringify(arr)
					 		}
					 	}).done(function(data){
					 		console.log(data);
					 	});
					 });
				}
			});		
		})(),
		click:(function(){
			$('.deskdeatil-sure').click(function(){
				$.ajax({
					type:'POST',
					url:'/deskdeail/submitinfo',
					data:{
						status:1,
						number:$('.deskdeail-number').children('input').val()
					}
				}).done(function(data){
					console.log(data);
					location.href="/";
				});
			});	
			$('.deskdeatil-check').click(function(){
				$.ajax({
					type:'POST',
					url:'/deskdeail/submitinfo',
					data:{
						status:2
					}
				}).done(function(data){
					console.log(data);
					location.href="/";
				});
			});		
		})()
	}
});