# Creating Plugins for the DLx App

**Summary**: This page provides guidance for creating plugins for the DLx App.

## Introduction
DLx App plugins are a single JavaScript file that is loaded after the rest of the DLx app has finished loading. Plugins can then dynamically link in or generate additional content, such as CSS or other script files.

## Publishing Your Plugin
To make your plugin available on our [plugins](http://plugins.digitallinguistics.org) page, simply publish a package to npm with the keyword `dlx-plugin`, and include a config file named `dlx.json` in the project root (see [below](#config) for instructions on setting up your `dlx.json` file).

## How Your Plugin Gets Installed and Loaded
Users can browse plugins on our [plugin page](http://plugins.digitallinguistics.org) and choose to 'install' them. This redirects them to the DLx along with a query parameter specifying the path to your plugin. The app then fetches your plugin and caches it using a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) so that it will be available offline.

## The Config File (`dlx.json`)<a name="config"></a>
The `dlx.json` file is a configuration file that tells the DLx app how to process your plugin. The config file is optional - the DLx app will assume the default values for each attribute if `dlx.json` is not found in the project root.

Attribute | Type     | Default            | Description
--------- | :------: | :----------------: | -----------
main      | "string" | index.js           | The relative path to your plugin's main file. This is the file that DLx will run when the app loads.
name      | "string" | {npm package name} | The name of the plugin as it should appear in the registry.
resources | [array]  | [ ]                | An array of absolute URLs for any additional resources that should be cached (for offline use) with your plugin. These will be cached the first time your plugin loads. If a resource is not specified here, it will not be cached for offline use.
