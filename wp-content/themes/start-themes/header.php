<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php if (ENV != "development"): ?>
        <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory') ?>/dist/app.css"/>
    <?php else: ?>
        <!-- le deuxieme fichier du manifest.json -->
        <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory') ?>/dist/app.css"/>
    <?php endif; ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
    <div class="site-content-contain">
        <div id="content" class="site-content">
