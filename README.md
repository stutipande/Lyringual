# Lyringual
With this app you can learn new languages by translating your favourite songs!

Browse through a huge library of song lyrics and pick which language you want to learn, then you can practice and self-test your progress!

Currently done:
The app currently allows user to create an acount with which they can log in.
When logged in the user can search for different songs and lookup their lyrics in a few diffenent languages.
They can also chose to try to translate the lyrics themselves and have their translation be compared to
the one generated using the API.

The app has different views that are rendered using a router.
Persistance has been implemented but not for songId and the language chosen to translate to.

To do:
REMOVE SUMMARY VIEW AND RELATED STUFF FROM THE LABS,
Add gamification elements,
Clean up the interface,
Hide translation for people who want to translate for themselves (Hide it initially),
Add persistance to user translations (and possibly more),
Improve user translation evaluation,
Implement a way to track user progress.

File structure:
The file structure is essentially the same as the labs with songSOURCE.js handling the API calls to get the lyrics and translated lyrics.
The Firebase stuff handles persistance, resolvePromise handles promise states, Appmodel handles is the model itself.
The views and their respective presenters handles their respective thing.
The login view handles the login, the search form view handles the searching, the search result handles the result of the search, the details view handles the showing of lyrics and translated lyrics. The summary view is supposed to be removed as it isn't in use but for some reason removing it causes the CSS to stop working properly.