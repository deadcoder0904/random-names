function display(pic,title,name,gender,region,age,bday) {
	var arr = [];
	arr.push("<div class='dtc tc pv4 bg-black-40'>");
	arr.push("<article class='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>");
  arr.push("<div class='tc'>");
  arr.push("<img src='" + pic + "' class='br-100 h4 w4 dib ba b--black-05 pa2' title=''>");
  arr.push("<h1 class='f3 mb2 ttc'>" + title +  " " + name + "</h1>");
	arr.push("<h2 class='f5 fw4 gray mt0 ttc'> <br /> Gender: " + gender + "<br /> Region: " + region + "<br /> Birthday: " + bday + "<br /> Age: " + age + "<br /></h2>");
	arr.push("</div>");
	arr.push("</article>");
  arr.push("</div>");
	return arr.join("");
}

function handleData(data) {
	var arr = [];
	var json = JSON.parse(data);
	var c = 0;
	var app = $('#app');
	console.log(json);
  for(var i = 0; i < json.length; i++) {
		if(c % 2 == 0) {
			arr.push("<div class='dt dt--fixed'>");
  		arr.push("<div class='dt-row'>");
  	}
		 
		arr.push(display(json[i].photo,json[i].title,json[i].name + " " + json[i].surname,json[i].gender,json[i].region,json[i].age,json[i].birthday.dmy));
		
		if((c + 1) % 2 == 0) {
  		arr.push("</div>");
			arr.push("</div>");	
  	}
  	c++;
  }
  if(arr.length == 0){
		arr.push("<div class='dt dt--fixed'>");
		arr.push("<div class='dt-row'>");
		arr.push(display(json.photo,json.title,json.name + " " + json.surname,json.gender,json.region,json.age,json.birthday.dmy));
  	arr.push("</div>");
		arr.push("</div>");	
  }
	
	app.html(arr.join(""));
}

function bringData(amount,gender,region) {
	$.getJSON({
		  	url: 'http://uinames.com/api/?ext&amount=' + amount + '&gender=' + gender + '&region=' + region 
			}).done(function(res) {
   			handleData(JSON.stringify(res));
	}).catch(function(err) {
			console.log(err);
	});
}

$(document).ready(function() {
	const b = ["<select name='region' class='tc pa2 input-reset ba w-90'>"];
	$.getJSON({
		  	url: 'https://raw.githubusercontent.com/thm/uinames/master/names.json' 
			}).done(function(res) {
   			res.forEach(function(a) {
   				b.push("<option value='" + a.region + "' class='ttc'>" + a.region + "</option>");
   			});
 				b.push("</select>");
				
				$('#contents').append(b.join(""));
			bringData($('input[name=amount]').val(),$('input[name=gender]:checked').val(),$('select[name=region]').val());
	}).catch(function(err) {
			console.log(err);
	});

	$('#generate').click(function() {
		bringData($('input[name=amount]').val(),$('input[name=gender]:checked').val(),$('select[name=region]').val());
	});
});