<?php

/*
Plugin Name: Shop Status Plugin
Plugin URI: https://github.com/gabacode
Description: A plugin that allows you to set the shop status as open or closed.
Version: 2.0.0
Author: Gabriele Scalici
Author URI: https://github.com/gabacode
License: GPLv2 or later
Text Domain: shop-status-plugin
*/

defined('ABSPATH') || exit;

/**
 * Enqueue the React app script.
 */
function shop_status_enqueue_script()
{
    wp_enqueue_script('shop-status-admin', plugin_dir_url(__FILE__) . 'dist/bundle.js', array('wp-element', 'wp-api-fetch'), '1.0.0', true);
}
add_action('admin_enqueue_scripts', 'shop_status_enqueue_script');

/**
 * Add the menu page.
 */
function shop_status_menu()
{
    add_menu_page(
        'Opzioni',
        'Opzioni',
        'manage_options',
        'shop-status',
        'shop_status_page',
        'dashicons-store',
        100
    );
}
add_action('admin_menu', 'shop_status_menu');

/**
 * Render the React app.
 */
function shop_status_page()
{
?>
    <div id="shop-status-root"></div>
<?php
}

/**
 * Register custom REST API endpoints.
 */
function shop_status_register_rest_endpoints()
{
    register_rest_route(
        'shop-status/v1',
        '/shop-status',
        array(
            'methods'             => 'GET',
            'callback'            => 'shop_status_get_shop_status',
            'permission_callback' => 'shop_status_permission_callback',
        )
    );

    register_rest_route(
        'shop-status/v1',
        '/update-shop-status',
        array(
            'methods'             => 'POST',
            'callback'            => 'shop_status_update_shop_status',
            'permission_callback' => 'shop_status_permission_callback',
        )
    );
}
add_action('rest_api_init', 'shop_status_register_rest_endpoints');

/**
 * Permission callback for REST API endpoints.
 */
function shop_status_permission_callback($request)
{
    // Add your permission checks here if needed
    return true;
}

/**
 * Callback for the GET /shop-status/v1/shop-status endpoint.
 */
function shop_status_get_shop_status($request)
{
    $shop_status = array(
        'acceptReservations' => get_option('shop_status_accept_reservations', false),
        'checkedDays'        => get_option('shop_status_checked_days', array()),
        'openingTimes'       => get_option('shop_status_opening_times', array()),
        'openingExceptions'  => get_option('shop_status_opening_exceptions', array()),
    );

    return rest_ensure_response($shop_status);
}

/**
 * Callback for the POST /shop-status/v1/update-shop-status endpoint.
 */
function shop_status_update_shop_status($request)
{
    $params = $request->get_params();

    if (isset($params['acceptReservations'])) {
        update_option('shop_status_accept_reservations', $params['acceptReservations'] ? $params['acceptReservations'] : false);
    }

    if (isset($params['checkedDays'])) {
        update_option('shop_status_checked_days', $params['checkedDays']);
    }

    if (isset($params['openingTimes'])) {
        update_option('shop_status_opening_times', $params['openingTimes']);
    }

    if (isset($params['openingExceptions'])) {
        update_option('shop_status_opening_exceptions', $params['openingExceptions']);
    }

    return rest_ensure_response('Shop status updated.');
}

// Admin footer modification
function remove_footer_admin()
{
    echo '<span id="footer-thankyou">Made with love by <a href="https://www.totel.it" target="_blank">Totel Media</a></span>';
}

add_filter('admin_footer_text', 'remove_footer_admin');
