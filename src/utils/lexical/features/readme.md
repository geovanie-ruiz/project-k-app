# Inline Inserts Feature

The Inline Inserts feature is a payload-lexical feature that allows users to insert inline nodes that will render in a pretty way. This feature collects three different plugins:

- PrettyIcons,
- PrettyKeywords, and
- SmartLinks.

## PrettyIcons

The PrettyIcons plugin allows authors to use markdown-style syntax to generate an inline icon. For example, something like \:fury\: would be replaced with the simplified Fury icon. Additionally, authors can type $ to bring up a list of icons they can use. Typing $fury will bring up a menu with fury, furyColor, furyComplex, and furyComplete. You can choose one of these options from the menu and the icon will be inserted.

## PrettyKeywords

The PrettyKeywords plugin allows authors to use markdown-style syntax to generate an inline keyword. For example, something like [accelerate] would be replaced with the stylized presentation mode used on card faces. Additionally, authors can type \[ to bring up a list of keywords they can use.

## SmartLinks (Unscheduled until editor can get data in scope to embed data into node)

The SmartLinks plugin allow authors to create mention-style links to specific cards or decks. authors can create relationship links by default, however, this link becomes a block in their content which can be visually undesirable, or functionally distracting. SmartLinks allows an author to create an inline reference that users can however for details, or click to navigate to that reference. For example "$viktor-rush" would create a link to the deck named "Viktor Rush" and on hover will show some rudimentary details about that deck, like the Legend and the first part of the guide. "$viktor-machine-herald" would similar produce a hover but of that specific card. In either case, clicking the link navigates the user. This field also allows for hinting so "$viktor" would bring up a menu with "Viktor, Machine Herald" and "Victor Rush".
