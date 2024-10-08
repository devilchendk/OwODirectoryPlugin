<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * Typecho 默认主题以及Jasmine主题文章目录：
 * 其他Typecho主题没有验证过...
 * 
 * 详细说明及更新请查阅： <a target="_blank" href="https://github.com/devilchendk/OwODirectoryPlugin" rel="noopener noreferrer">OwODirectoryPlugin</a> 
 * 
 * @package OwODirectoryPlugin
 * @author Bruce Kevin Chen
 * @version 1.0.1
 * @link https://www.chendk.info
 */

class OwODirectoryPlugin_Plugin implements Typecho_Plugin_Interface
{
    public static function activate()
    {
        // 在header中加载CSS和Iconify脚本
        Typecho_Plugin::factory('Widget_Archive')->header = array('OwODirectoryPlugin_Plugin', 'addHeader');
        // 在footer中加载JavaScript脚本
        Typecho_Plugin::factory('Widget_Archive')->footer = array('OwODirectoryPlugin_Plugin', 'addFooter');
    }

    public static function deactivate() {}

    public static function config(Typecho_Widget_Helper_Form $form) {}

    public static function personalConfig(Typecho_Widget_Helper_Form $form) {}

    public static function addHeader() {
        // 加载CSS和Iconify图标库
        echo '<link rel="stylesheet" href="' . Helper::options()->pluginUrl . '/OwODirectoryPlugin/resources/style.css">';
        echo '<script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>';
    }

    public static function addFooter() {
        // 加载JavaScript文件，处理目录的生成和切换功能
        echo '<script src="' . Helper::options()->pluginUrl . '/OwODirectoryPlugin/resources/script.js"></script>';
    }
}
