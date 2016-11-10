<?php

/**
 * Created by PhpStorm.
 * User: Adam
 * Date: 10/11/2016
 * Time: 12:03
 */
class PicturesController extends AppController
{
    public $helpers = array('Html', 'Form');

    public function index() {
        $this->set('pictures', $this->Picture->find('all'));
    }

}