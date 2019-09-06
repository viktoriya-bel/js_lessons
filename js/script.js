
var obj = $.ajax({
	url: 'https://randomuser.me/api/?results=25',
	dataType: 'json',
	global: false,
	async:false,
	success: function(data) {
		 return data;
		}
	}).responseText;
obj = JSON.parse(obj);

PeopleView(obj);

function PeopleView(obj){
	 var searchVal = $("#searchInput").val();
     var tablePeople = '';
     for (key in obj.results){ 
			nameFirst = "" + obj.results[key].name.first;
			nameLast = "" + obj.results[key].name.last; 
			nameFirstLast = obj.results[key].name.first + " " + obj.results[key].name.last;
			first = "first";
			last = "last";
			date = "date";
			if(nameFirst.includes(searchVal) || nameLast.includes(searchVal) || nameFirstLast.includes(searchVal)){
				number = 1 + Number.parseInt(key);
				tablePeople += '<tr><th scope="row">' + number + '</th><th id="first">'+ 
					obj.results[key].name.first +
					'<i class="icon-pencil" onclick="return PeopleNameEdit(' + 
					first + ',' + 
					key +');" title="Изменить имя"></i></th><th id="last">' + 
					obj.results[key].name.last +
					'<i class="icon-pencil" onclick="return PeopleNameEdit(' + 
					last + ',' + 
					key +');" title="Изменить фамилию"></i></th><th id="date">' + 
					obj.results[key].dob.date +
					'<i class="icon-pencil" onclick="return PeopleNameEdit(' + 
					date + ',' + 
					key +');" title="Изменить дату рождения"></i></th><th><img src="' + 
					obj.results[key].picture.thumbnail + 
					'"/></th><th>';
					if (obj.results[key].profession) {
						for (key2 in obj.results[key].profession){ 
								tablePeople += obj.results[key].profession[key2] + 
								'</br>';
						}
					}
					else{
						tablePeople +='Профессия';
					}
					
				tablePeople += '<i class="icon-pencil" onclick="return PeopleProfessionEdit(' +  
					key +');" title="Изменить профессию"></i></th><th><i class="icon-eye-open" onclick="return ViewDuties(' +  
					key +');" title="Посмотреть обязанности"></i></th><th><i class="icon-remove" onclick="return PeopleRemove(' + 
					key +');" title="Удалить"></i></th></tr>';
			}
	}
	document.getElementById('table-people').innerHTML =  tablePeople;
}
$(".form-search").submit(function () {
            PeopleView(obj);
            return false;
 });


function PeopleRemove(key){
	delete obj.results[key];
	PeopleView(obj);
}

function PeopleNameEdit(attr, key){
	if (attr == "first"){
		document.getElementById('first').innerHTML =  '<input id="first-save" type="text"><i class="icon-ok" onclick="return PeopleNameSave(this,' + attr + 
		',' + 
					key +');" title="Сохранить">';
	}
	if (attr == "last"){
		document.getElementById('last').innerHTML =  '<input id="last-save" type="text"><i class="icon-ok" onclick="return PeopleNameSave(this,' + attr + 
		',' + 
					key +');" title="Сохранить">';
	}
	if (attr == "date"){
		document.getElementById('date').innerHTML =  '<input id="date-save" type="date"><i class="icon-ok" onclick="return PeopleNameSave(this,' + attr + 
		',' + 
					key +');" title="Сохранить">';
	}
}

function PeopleNameSave(element, attr, key){
	if (attr == "first"){
		var elVal = $("#first-save").val();
		obj.results[key].name.first = elVal;
		PeopleView(obj);
	}
	if (attr == "last"){
		var elVal = $("#last-save").val();
		obj.results[key].name.last = elVal;
		PeopleView(obj);
	}
	if (attr == "date"){
		var elVal = $("#date-save").val();
		obj.results[key].dob.date = elVal;
		PeopleView(obj);
	}
}

function submitAdd() {
	$('#ModalAdd').modal('hide');
	var i = 0;
	for (key in obj.results){ 
			i++;
	}
	var firstAddVal = $("#first-add").val();
	var lastAddVal = $("#last-add").val();
	var dateAddVal = $("#date-add").val();
	var thumbnailAddVal = $("#thumbnail-add").val();
	obj.results[i] = { name: {first:firstAddVal, last:lastAddVal}, dob: {date:dateAddVal} , picture: {thumbnail:thumbnailAddVal} };
    PeopleView(obj);
    document.formPeopleAdd.reset();
    return false;
 }

var professionObj = new Object();
professionObj[0] = { title: "Программист"};
professionObj[0].charge = { 0: "Писать код", 1: "Отрастить бороду"};



function ModalProfessionOpen(){
	$('#ModalProfession').modal('show');
	ProfessionView(professionObj);
}

function ProfessionView(obj){
	 var profession = '';
     for (key in obj){ 
			number = 1 + Number.parseInt(key);
			profession += '<tr><th scope="row">' + number + '</th><th id="">'+ 
					obj[key].title +
					'<i class="icon-pencil" onclick="return ProfessionEdit(this,' +  
					key +');" title="Изменить профессию"></i></th><th id=""><ul>' ; 
			for (key2 in obj[key].charge) {
						profession += '<li>' + obj[key].charge[key2] + '<i class="icon-pencil" onclick="return ChargeEdit( this'+ ',' + 
					key + ',' + key2 +');" title="Изменить обязанности"></i><i class="icon-remove" onclick="return ChargeRemove(' + 
					key + ',' + key2 +');" title="Удалить"></i></li>';
					}		
			profession += '</ul><i class="icon-plus" onclick="return ChargeAdd( this,' + 
					key +');" title="Добавить обязанность"></i></th><th><i class="icon-remove" onclick="return ProfessionRemove(' + 
					key +');" title="Удалить"></i></th></tr>';
	}
	document.getElementById('profession-view').innerHTML =  profession; 
}
	
function ChargeRemove(key, key2){
	delete professionObj[key].charge[key2];
	ProfessionView(professionObj);
}

function ChargeEdit(element, key, key2){
	element.parentNode.innerHTML =  
	'<input id="Charge-save" type="text"><i class="icon-ok" onclick="return ChargeSave(' + 
	key + ',' + key2 + ');" title="Сохранить">';
}

function ChargeSave( key, key2){
		var elVal = $("#Charge-save").val();
		console.log(key2);
		professionObj[key].charge[key2] = elVal;
		ProfessionView(professionObj);
}

function ChargeAdd(element, key, key2) {
	element.parentNode.innerHTML =  
	'<input id="ChargeAdd-save" type="text"><i class="icon-ok" onclick="return ChargeAddSave(' + 
	key + ',' + key2 + ');" title="Сохранить">';
 }

 function ChargeAddSave( key, key2){
	var i = 0;
	for (k in professionObj[key].charge){ 
			i++;
	}
	number = Number.parseInt(i);
	var elVal = $("#ChargeAdd-save").val();
	professionObj[key].charge[number] = elVal;

    ProfessionView(professionObj);
}

function ProfessionRemove(key){
	delete professionObj[key];
	ProfessionView(professionObj);
}

function ProfessionEdit(element, key){
	element.parentNode.innerHTML =  
	'<input id="Profession-save" type="text"><i class="icon-ok" onclick="return ProfessionEditSave(' + 
	key + ');" title="Сохранить">';
}

function ProfessionEditSave(key){
	var elVal = $("#Profession-save").val();
	if (ProfessionСheck(elVal)) {
		alert("Такая профессия уже есть!");
	}
	else{
		professionObj[key].title = elVal;
    	ProfessionView(professionObj);
	}
}

function ProfessionAdd(){
	var professionAdd = '<th><input id="ProfessionAdd-save" type="text"></th><th><input id="ProfessionAdd-Charge-save" type="text"></th><th><i class="icon-ok" onclick="return ProfessionAddSave();" title="Сохранить"></th>';
	document.getElementById('profession-adds').innerHTML =  professionAdd;
}

function ProfessionAddSave(){
	
	var i = 0;
	for (key in professionObj){ 
			i++;
	}
	var elVal = $("#ProfessionAdd-save").val();
	var elChargeVal = $("#ProfessionAdd-Charge-save").val();
	if (ProfessionСheck(elVal)) {
		alert("Такая профессия уже есть!");
	}
	else{
		professionObj[i] = { title: elVal, charge: { 0: elChargeVal } };
		document.getElementById('profession-adds').innerHTML =  " ";
    	ProfessionView(professionObj);
	}
}

function ProfessionСheck(val){
	for (key in professionObj){ 
			var title = String(professionObj[key].title);
			if(title.toUpperCase() == val.toUpperCase())
			{
				return true;
			}
			else{
				return false;
			}
	}

}
function PeopleProfessionEdit(key){
	$('#ModalPeopleProfessionEdit').modal('show');
	var profession = '';
     for (key2 in professionObj){ 
			profession += '<p><span id="' + professionObj[key2].title + '"><i class="icon-plus" onclick="return PeopleProfessionAdd( this,' + 
					key +');" title="Добавить"></i></span> '+ 
					professionObj[key2].title +
					'</p>';
	}
	document.getElementById('profession-edit-view').innerHTML =  profession; 
}

function PeopleProfessionAdd(element, key){
	var elementParent = element.parentNode;
	elementParent.innerHTML =  
	'<i class="icon-remove" onclick="return PeopleProfessionRemove(this,' + 
	key + ');" title="Удалить">';
	var i = 0;
	for (key2 in obj.results[key].profession){ 
			i++;
	}
	if (obj.results[key].profession == undefined){
		obj.results[key].profession = { 0: elementParent.id};
	}
	else{
		obj.results[key].profession[i] = elementParent.id;
	}
	
	

}
function PeopleProfessionRemove(element, key){
	element.parentNode.innerHTML =  
	'<i class="icon-plus" onclick="return PeopleProfessionAdd(this,' + 
	key + ');" title="Добавить">';
}

function ProfessionSaveButton(){
	PeopleView(obj);
	$('#ModalPeopleProfessionEdit').modal('hide');
}
var arrСharge = { 0: ""};
function ViewDuties(key){
	if (obj.results[key].profession == undefined){
		alert("У данного человека нет профессии!");
	}
	else{
		$('#ModalViewDuties').modal('show');
		var view = "";
		var i = 0;
		for (key2 in obj.results[key].profession){ 
			for (key3 in professionObj) {
				if (professionObj[key3].title == obj.results[key].profession[key2]){
					for (key4 in professionObj[key3].charge) {
						//view += '<p>' + professionObj[key3].charge[key4] + '</p>';
						arrСharge[i] = String(professionObj[key3].charge[key4]);
						i++;
					}
				}
			}
		}
		//var arrСhargeSort = 
		DutiesSort(0);
		console.log(arrСharge);
		for (key5 in arrСharge) {
				view += '<p>' + arrСharge[key5] + '</p>';
		}
		document.getElementById('Duties-view').innerHTML =  view; 
	}
}

function DutiesSort(i){
	var length = 0;
	for (key in arrСharge) {
		length++;
	}
	console.log(length == i);
	if (length == i){
		console.log(arrСharge);
	}
	else{
		var j = 0;
		while( j < length){
			var arrСhargeI = String(arrСharge[i]);
			var arrСhargeJ = String(arrСharge[j]);
			if ((arrСhargeI.toUpperCase() == arrСhargeJ.toUpperCase()) && (i!=j)){
				var y = j;
				var x = length-1;
				if (y != x){
					while(y < x){
						arrСharge[y] = arrСharge[y+1];

						y++;
					}
				}
				delete arrСharge[y];
				
			}
			j++;
		}
		i++;
		DutiesSort(i);
	}
}