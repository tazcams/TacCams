<h1>Pictures</h1>
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

<div>
    <?php foreach ($pictures as $picture): ?>
        <img src=<?php echo $picture['Picture']['path']; ?> alt="Missing Picture" style="width:304px;height:228px;">
    <?php endforeach; ?>
</div>



<?php unset($picture); ?>
