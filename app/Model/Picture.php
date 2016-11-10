<?php

/**
 * Created by PhpStorm.
 * User: Adam
 * Date: 10/11/2016
 * Time: 12:01
 */
class Picture extends AppModel
{
    public $belongsTo = array(
        'Location' => array(
            'className' => 'Location',
            'foreignKey' => 'location_id'
        )
    );
}