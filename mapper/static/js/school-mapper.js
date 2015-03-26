function getAllSchools(lat, lng) {
    var params = {
        lat: lat,
        lng: lng
    };
    $.ajax({
        url: "/getschools?" + $.param(params),
        dataType: "text",
        type: "GET",
        error: function (error) {
            console.log("ERROR: " + error);
            alert("Error: " + error.statusText.toString())
        },
        success: function (data) {
            data = JSON.parse(data);
            // graphSchools(data.results);
            $("#json-response").html(JSON.stringify(data, null, 4)).show();

            var schoolList = [];
            for (var i = 0; i < data.results.length; i++) {
                var school = data.results[i];
                var lat = parseFloat(school.Latitude);
                var lng = parseFloat(school.Longitude);

                var marker = L.marker([lat, lng]); //.addTo(map);
                var schoolUrl = '<a href="#" onclick="getSchoolDetail(' + school.SchoolID + ')">' + school.SchoolName.toString() + '</a>';
                marker.bindPopup(schoolUrl);
                schoolList.push(marker);
            }
            if (typeof schools != 'undefined') {
                // If there's already a group of schools mapped, remove them first
                map.removeLayer(schools);
            }
            schools = L.layerGroup(schoolList).addTo(map);
        }
    });
}

function getSchoolDetail(id) {
    $.ajax({
        url: '/school/' + id.toString(),
        dataType: 'text',
        type: 'GET',
        error: function(error) {
            console.log("ERROR: " + error);
        },
        success: function(data) {
            data = JSON.parse(data);
            $("#json-response").html(JSON.stringify(data, null, 4)).show();
        }
    });
}

function onMapClick(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    $("#coordinates-lat").val(lat.toString());
    $("#coordinates-lng").val(lng.toString());
}