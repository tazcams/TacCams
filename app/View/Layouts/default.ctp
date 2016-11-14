<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = __d('cake_dev', 'CakePHP: the rapid development php framework');
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version())
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
    <title>תצפיטבע</title>
	<meta name="viewport" content="initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>תצפיטבע</title>
    <base href="<?php echo $this->webroot; ?>">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<script type="text/javascript" src="http://132.75.252.120/~tazcam/TazCams/app/webroot/angular/scripts/tazCamApp.js"></script>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('cake.generic');
//
//		echo $this->Html->script('https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js', array('inline' => false));
//		echo $this->Html->script('\angular\scripts\tazCamApp.js', array('inline' => false));


		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
	?>
	<link href='http://fonts.googleapis.com/earlyaccess/opensanshebrew.css' rel='stylesheet' type='text/css'>
	<?php echo $this->Html->css(array('/angular/styles/vendor','/angular/styles/app')); ?>

</head>
<body>
	<div id="container">
<!-- 			<h1><?php echo $this->Html->link($cakeDescription, 'http://cakephp.org'); ?></h1>
-->		<div id="header">
			<!-- <?php echo $this->Html->image('/angular/images/sideLogo.png');?> -->
			<?php echo $this->Html->link(
					$this->Html->image('/angular/images/sideLogo.png', array('alt' => 'Tatzpiteva', 'border' => '2')),
					'http://tatzpiteva.org.il/',
					array('target' => '_blank', 'escape' => false, 'id' => 'cake-powered', 'align' => 'right'));
			?>
            <!--?php echo $this->Html->link(
                    $this->Html->image('/angular/images/golanLogo.png', array('alt' => 'Golan', 'border' => '2')),
                    'http://www.golan.org.il/',
                    array('target' => '_blank', 'escape' => false, 'id' => 'cake-powered', 'align' => 'left'));
            ?-->
		</div>
		<div id="content">

			<?php echo $this->Flash->render(); ?>

			<?php echo $this->fetch('content'); ?>
		</div>
		<div id="footer">
			<?php echo $this->Html->link('Log Out',
										array('controller' => 'users', 'action' => 'logout'),
										array('align' => 'right')); ?>
		</div>
		<!-- <div id="footer">
			<?php echo $this->Html->link(
					$this->Html->image('cake.power.gif', array('alt' => $cakeDescription, 'border' => '0')),
					'http://www.cakephp.org/',
					array('target' => '_blank', 'escape' => false, 'id' => 'cake-powered')
				);
			?>
			<p>
				<?php echo $cakeVersion; ?>
			</p>
		</div> -->
	</div>
	<!-- <?php echo $this->element('sql_dump'); ?> -->
</body>
</html>
