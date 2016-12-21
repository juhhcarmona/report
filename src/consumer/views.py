from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseNotFound

import requests


def index(request):
	return render(request, 'consumer/index.html', {})

def send_request(request):
	if request.method == 'GET':
		return HttpResponseNotFound('<h1>Page not found</h1>')

	url = "https://api.libring.com/v1/reports/get"
	headers = {"Authorization":"Token mWNyhyejUnWpjsOvzajqPJMDT", "content-type": "application/json"}

	start_date = request.POST.get("start_date")
	end_date = request.POST.get("end_date")
	group_by_list = request.POST.getlist("group_by")
	group_by = "date"

	if len(group_by_list) > 0:
		group_by = ""
		group_by = group_by.join("%s,"%i for i in group_by_list)[:-1]

	request_api = url + "?&period=custom_date" + "&start_date=" + start_date + "&end_date=" + end_date
	request_api += "&data_type=network" + "&group_by=" + group_by

	if end_date == "" or start_date == "":
		request_api = url + "?data_type=network" + "&group_by=" + group_by

	r = requests.get(request_api, headers=headers);

	return render(request, 'consumer/result.html', {"r" : r.text, "url": request_api})

def load_more_data(request):
	if request.method == 'POST':
		return HttpResponseNotFound('<h1>Page not found</h1>')

	url = request.GET.get("url")
	headers = {"Authorization":"Token mWNyhyejUnWpjsOvzajqPJMDT", "content-type": "application/json"}
	r = requests.get(url, headers=headers);
	return JsonResponse(r.text, safe=False)

