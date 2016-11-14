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
    public $components = array('RequestHandler');

    public function index() {
        $pictures = $this->Picture->find('all');
        $this->set(array(
            'pictures' => $pictures,
            '_serialize' => array('pictures')
        ));
        $this->set('filteredPictures', $this->Picture->find('all'));
        $this->set('locations', $this->Picture->Location->find('all'));
    }
}