#Guild Wars 2 Inventory Search

This is a web app for Guild Wars 2 players.

Looks up who's holding the item you're looking for.  Good for players with many characters who share account-bound items with each other but don't want to waste time loading each character in game looking for those items.  Site has a text-based interface for speed.

GW2Shinies supplies the item names to the item IDs ANet responds with.

##Current Issues

- Can't search for transmuted items by their skin's name. You have to enter the original item's name to find it.
- Can't search for exact match. For example if a user wanted to search for the Bo staff the short character length would cause gw2shinies to match about 4000 items.

##To Do

- Search for transmuted items by their skins' name.
- Have item names in results link to corresponding gw2shinies page.

##Technologies Used
Back-end:

- Node.js
- Express.js
- lodash
- request-promise

Front-end:

- AngularJS
- Bootstrap
