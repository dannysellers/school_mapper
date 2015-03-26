from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from django.template import RequestContext
import requests
import json


def home(request):
    """
    View to render homepage
    """
    context = RequestContext(request)
    return render_to_response('mapper/index.html', context)


def length (value, val_length):
    """
    Receives `value`, truncates to length (used primarily for storage fees/volume)
    :param value: Value to truncate
    :param val_length: Length to truncate after the decimal
    :return:
    """
    if not value:
        return '0.00'
    else:
        _length = int(val_length)
        _string = str(value).split('.')
        if len(_string[1]) == 1:
            _string[1] += '0'
        return _string[0] + '.' + _string[1][:_length]


@csrf_exempt
@require_GET
def get_schools(request):
    """
    Get schools near a point
    """
    lat = length(request.GET['lat'], 4)
    lng = length(request.GET['lng'], 4)
    url = "http://api.civicapps.org/schools/near/{},{}".format(lng, lat)

    r = requests.get(url)

    return HttpResponse(json.dumps(r.json()), content_type='application/json')


@csrf_exempt
@require_GET
def school_detail(request, id):
    """
    Get info about a specific school
    """
    url = "http://api.civicapps.org/schools/{}".format(id)
    r = requests.get(url)
    return HttpResponse(json.dumps(r.json()), content_type='application/json')