define(['jquery-1.11.0'],function(){
	return {
		render:(function(){
			$.ajax({
				type:'POST',
				url:'/dishdeatil'
			}).done(function(data){
				var data = JSON.parse(data);
				//console.log(data);
				var name = data[0].name;
				var intro = data[0].intro;
				var price = data[0].price;
				var updateperson = data[0].updateperson ; 
				$('#dishdeatil-particular li:first').children('span').html(name);
				$('#dishdeatil-particular li:nth-child(2)').children('p').html(intro);
				$('#dishdeatil-particular li:nth-child(3)').children('span').html(price);
				$('#dishdeatil-particular li:nth-child(4)').children('span').html(updateperson);
				$('#dishdeatil-particular li:nth-child(5)').children('p').children('img').attr('src',data[0].src);
				$('#pic img').attr('src',data[0].src);
				$('#dishdeatil-dishname').val(name);
				$('#dishdeatil-dishprice').val(price);
				$('#dishdeatil-discribe').val(intro);
			});		
		})()
	}
});