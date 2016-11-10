<!--<link rel="stylesheet" type="text/css" href='--><?php //echo $this->Html->css('gallerystyle');?><!--'/>-->
<link rel="stylesheet" type="text/css" href='css/gallerystyle.css'/>
<script type="text/javascript" src="app/webroot/js/motiongallery.js">
</script>

<h3>Pictures:</h3>

<div id="motioncontainer" style="position:relative;overflow: hidden">
    <div id="motiongallery" style="position:absolute;left:0;top:0;white-space: nowrap;">
        <div id="trueContainer" style="white-space: nowrap;">
            <ul>
                <?php foreach ($pictures as $picture): ?>
                    <li><a href="#" onClick="enlargeimage('<?php echo $picture['Picture']['name'];?>'); return false">
                            <img id=<?php echo $picture['Picture']['name'];?>
                                 src=<?php echo $picture['Picture']['path'];?>
                                 alt=<?php echo $picture['Picture']['name'];?> ></a></li>
                <?php endforeach; ?>
            </ul>
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




<br><br>
<h3>Pictures Data:</h3>
<table>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Created on</th>
        <th>Location ID</th>
        <th>Full Path</th>
    </tr>

    <!-- Here is where we loop through our $Pictures array, printing out Picture info -->

    <?php foreach ($pictures as $picture): ?>
        <tr>
            <td><?php echo $picture['Picture']['id']; ?></td>
            <td><?php echo $picture['Picture']['name']; ?></td>
            <td><?php echo $picture['Picture']['timeStamp']; ?></td>
            <td><?php echo $picture['Picture']['location_id']; ?></td>
            <td><?php echo $picture['Picture']['path']; ?></td>
<!--            <td>-->
<!--                --><?php //echo $this->Html->link($picture['Picture']['title'],
//                    array('controller' => 'Pictures', 'action' => 'view', $picture['Picture']['id'])); ?>
<!--            </td>-->
<!--            <td>--><?php //echo $picture['Picture']['created']; ?><!--</td>-->
        </tr>
    <?php endforeach; ?>
</table>




<?php unset($picture); ?>
