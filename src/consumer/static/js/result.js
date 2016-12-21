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


function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}














