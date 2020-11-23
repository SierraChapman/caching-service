# Caching Service

This is a standalone caching service. It is hosted on an Express.js server, and items can be added, removed, and fetched through the API. 

There is an optional limit to the number of items in the cache, which can be specified in `cache-config.json`. If the item limit is exceeded, the least recently used item is removed.

## Data Structure

Data is stored in a combination of a hash map and a linked list. This allows for fast retrieval of the data associated a key, while also enabling time-efficient tracking and removal of the least recently used items.

## Setup

1) Install dependencies with `npm install`.

2) Compile typescript into javascript with the command `npm run tsc`.

3) Start the server by running `npm start`.

## Optional Configuration

Options for the cache can be set by editing the following fields in the `cache-config.json` file, either in the `src` folder before compiling or in the `build` folder after compiling.

* `maxItems` (string or `null`): the maximum number of items the cache will store. If omitted or set to `null`, the cache will not remove items from itself unless requested through the API.

* `verbose` (boolean): if set to true, prints cache contents and memory usage to the console for debugging purposes.

## API

### Adding an item

* route: "/"
* method: POST
* body: JSON object with the following fields
    - `name` (string): the key under which the data will be stored
    - `value` (any): the data to be stored in the cache

### Removing an item

* route: "/"
* method: DELETE
* query parameters:
    - `name` (string): the key for the data to be deleted

### Fetching an item

* route: "/"
* method: GET
* query parameters:
    - `name` (string): the key for the desired data
* response: JSON object with the following fields
    - `value`: the data that was retrieved from the cache