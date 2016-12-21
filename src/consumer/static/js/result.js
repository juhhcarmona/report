//Function responsability: 
//Create the columns of the datatable
//data: it is one row that was retrieved using the api
function buildTable(object) {
	var html = '<tr>'
	$.each(object, function( key, value ){
         html =  html + 
                ' <th>' + key + '</th>'	       
   	});
   	html = html + '</tr>'
   	//console.log(html)
	$("thead").html(html)
}


//Function responsability: 
//Make the request for more data and add this data inside the datatable.
//ctx: it is the context url of the application (http://127.0.0.1:8000/)
//url: it is the libring's api url to make the request and to load more data.
function loadMoreData(ctx,url) {
	$.ajax({
        url: 'http://'+ ctx+'/more/',
        type: 'GET',
        data: {"url": ""+url},
        success: function(result) {
        	var data = JSON.parse(result.replace(/&quot;/g,'"'));
			dataSet = data.networks
			new_url = data.next_page_url
			addRowTable(dataSet)
        }
    });
}	

//Function responsability: 
//Add new rows inside the datatable.
//dataSet: it is the set of data that will be added.
function addRowTable(dataSet) {
	var t = $('#example').DataTable();
	$.each(dataSet, function( key, value ){
		var row = []
		$.each(value, function( key, value ){
	         row.push(value); 	       
	   	});
		t.row.add(row).draw( false )
	});
}

//Function responsability: 
//Fill the datatable with the initial data.
//dataSet: it is the set of data that will be added.
function fillDataTable(dataSet) {
	var html = ""
	$.each(dataSet, function( key, value ){
		html =  html + '<tr>'
		$.each(value, function( key, value ){
	         html =  html + 
	                ' <td>' + value + '</td>'	       
	   	});
	   	html = html + '</tr>'

   	});
	$("tbody").html(html)
}






function isDate(txtDate) {
	console.log	(txtDate)
	var currVal = txtDate;
	if(currVal == '')
		return false;

	//Declare Regex 
	var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
	var dtArray = currVal.match(rxDatePattern); // is format OK?

	if (dtArray == null)
		return false;

	//Checks for yyyy/mm/dd - mm/dd/yyyy format.
	dtYear = dtArray[1]; 
	dtMonth= dtArray[5];
	dtDay = dtArray[8];

	console.log(dtYear)
	console.log(dtMonth)
	console.log(dtDay)
	
	

	if (dtMonth < 1 || dtMonth > 12)
		return false;

	else if (dtDay < 1 || dtDay> 31)
		return false;

	else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
		return false;

	else if (dtMonth == 2)
	{
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay> 29 || (dtDay ==29 && !isleap))
			return false;
	}
	return true;
}













