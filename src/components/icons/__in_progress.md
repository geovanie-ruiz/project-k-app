This icon library is a work in progress. Conversion from svg to tsx requires the following:

[x] Use svgr to generate js files
[] Translate js files to .tsx files
[] Support variance for each use case

---

# Notes

`fill="currentColor"` is being used to allow icon color to toggle between light and dark modes.

Classes being used:

* inline-block lets the icon sit in text
* align-text-top sits the icon just above baseline for a cleaner look
* mx-1 gives kerning effect and spaces the icon nicely

I would like to support different use cases using the prepared IconProps. To do so, twMerge should be used to combine the default classes with classes passed in as properties.

