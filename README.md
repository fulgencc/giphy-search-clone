# Take-home exercise for frontend interviews at Ohana

Frontend coding challenge.

# Dependencies

## React-Bootstrap
My favorite library when using bootstrap. It makes bootstrap classes into components.

## Bootstrap
Bootstrap

## Bootswatch
Themes for Bootstrap. I'm using it for a dark theme.

## Framer-Motion
Animation library

## Axios
For HTTP requests

## Lodash
For debounce

# Features

## Search
You can search for a GIF using the search endpoint. I'd like to add even more here (adding an area to search by category would be cool). If empty, searches trending GIFs.

## Autocomplete
Using GIPHY's autocomplete endpoint. I think the style could be improved upon.

## Dynamic Grid
Using Bootstrap rows/columns, GIFs are automatically added to a grid in columns of 4.

## Infinite Scrolling
8 new entries at a time.

## Animations
Just a few using framer-motion.

## GIF Info
Clicking on a GIF will display more info on it.

# Thing I'd Like to Add
I didn't want to spend too much time on this, so I did have to leave out some things I wish I could have worked on:

## Jest Tests
Probably the first thing I would add. I'd like to do some snapshot testing of my components.

## Mosaic Style Images
I didn't want to use an already built component because I felt like that was kind of cheating, so I opted to skip it for now but it sounds like it would be really fun to make if I had more time.

## More Animations
I was thinking about doing cooler animations for the GIFs after they load, but I felt like it reduced the responsiveness of the app. Users want to see GIFs, and I didn't want to keep them waiting!

## Better Info
Add some more info on the info cards. I think the animations could definitely be better too.

## Tags
Add some related tags when a user searches which can be clicked to search for GIFs with those tags.

## Sort
Sorting by date/username/etc.

## Media Queries/Breakpoints for Dyanmic Grid
I think it'd be cool to implement, but I didn't want this to take up all my time. I checked what GIPHY is doing and they don't have this feature either, so I decided to leave it out.