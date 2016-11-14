<h3>Pictures:</h3>
<div ng-app="mainApp" ng-controller="mainCtrl">
<!--    <div>-->
<!--        <table>-->
<!--            <tr ng-repeat="pic in filteredPictures | limitTo: 10">-->
<!--                <td>{{ pic.Picture.id }} </td>-->
<!--                <td>{{ pic.Picture.name }} </td>-->
<!--                <td>{{ pic.Picture.location_id }} </td>-->
<!--            </tr>-->
<!--        </table>-->
<!--    </div>-->
<!--    <div>-->
<!--        <ul>-->
<!--            <li ng-repeat="pic in filteredPictures | limitTo: 10">-->
<!--                <a href=""  onClick="enlargeimage(''); return false">-->
<!--                    <img id="{{ pic.Picture.name }}" ng-src="{{ pic.Picture.path }}" alt="{{ pic.Picture.name }}">-->
<!--                </a>-->
<!--            </li>-->
<!---->
<!--        </ul>-->
<!--    </div>-->

    <div  id="motioncontainer" style="position:relative;overflow: hidden">
        <div id="motiongallery" style="position:absolute;left:0;top:0;white-space: nowrap;">
            <div id="trueContainer" style="white-space: nowrap;">
                <ul>
                    <?php foreach ($filteredPictures as $picture): ?>
                        <li><a href="#" onClick="enlargeimage('<?php echo $picture['Picture']['name'];?>'); return false">
                                <img id=<?php echo $picture['Picture']['name'];?>
                                     src=<?php echo $picture['Picture']['path'];?>
                                     alt=<?php echo $picture['Picture']['name'];?> ></a></li>
                    <?php endforeach; ?>

                    <!--                    <li nr-repeat="pic in filteredPictures | limitTo: 10">-->
                    <!--                        <a href="#" onClick="enlargeimage(''); return false">-->
                    <!--                            <img id=""-->
                    <!--                                 src='{{ pic.Picture.path }}'-->
                    <!--                                 alt="" ></a>-->
                    <!--                    </li>-->


                </ul>
            </div>
        </div>

    </div>
</div>



<!-- The Modal -->
<div id="myModal" class="modal">
    <!-- The Close Button -->
    <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
    <!-- Modal Content (The Image) -->
    <img class="modal-content" id="img01">
    <!-- Modal Caption (Image Text) -->
    <div id="caption"></div>
</div>


<div id="map"></div>
<script>
    function initMap() {
        var myLatLng = {lat: 33.102008, lng: 35.766289};
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: true,
            zoom: 12,
            mapTypeId: 'hybrid',
        });

        var locations = <?php echo json_encode($locations); ?>;
        var markersIdsArray = {};
        for (var i = 0 ; i < locations.length; i++)
        {
            var location = locations[i];
            var locationValue = location['Location'];
            var pos = {lat: parseFloat(locationValue['latitude']), lng: parseFloat(locationValue['longitude'])};
            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                icon: 'img/camera-icon-16.png',
                title: locationValue['latitude'] + " : " + locationValue['longitude']
            });
            markersIdsArray[marker.position] = locationValue['id'];
            marker.addListener('click', function() {
                map.setCenter(this.getPosition());
                var markerID = markersIdsArray[this.position];
                var pictures = <?php echo json_encode($pictures); ?>;
                var filteredPictures = {};
                var filteredIndex = 0;
                for (var i = 0 ; i < pictures.length; i++)
                {
                    var picture = pictures[i];
                    var pictureLocationID = picture['Location']['id'];
                    if (pictureLocationID == markerID)
                    {
                        filteredPictures[filteredIndex++] = picture;
                    }
                }
                window.alert("found " + (filteredIndex) + " pictures for this location");
                <!--                --><?php //$filteredPictures = json_decode(filteredPictures);?>

            });
        }
    }
</script>
<br><br>

<h3>Pictures Data:</h3>
<table>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Created on</th>
        <th>Location ID</th>
        <th>Longitude</th>
        <th>Latitude</th>
        <th>Full Path</th>
    </tr>

    <!-- Here is where we loop through our $Pictures array, printing out Picture info -->

    <?php foreach ($pictures as $picture): ?>
        <tr>
            <td><?php echo $picture['Picture']['id']; ?></td>
            <td><?php echo $picture['Picture']['name']; ?></td>
            <td><?php echo $picture['Picture']['timeStamp']; ?></td>
            <td><?php echo $picture['Picture']['location_id']; ?></td>
            <td><?php echo $picture['Location']['longitude']; ?></td>
            <td><?php echo $picture['Location']['latitude']; ?></td>
            <td><?php echo $picture['Picture']['path']; ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<?php //unset($picture); ?>

<link rel="stylesheet" type="text/css" href='css/gallerystyle.css'/>
<script type="text/javascript" src="js/motiongallery.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1uyk9PR7I2oJ2BVbQtncuS6JMhA3PF_U&callback=initMap"
        async defer></script>
