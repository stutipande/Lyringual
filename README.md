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
Add gamification elements,
Clean up the interface,
Hide translation for people who want to translate for themselves (Hide it initially),
Add persistance to user translations (and possibly more),
Improve user translation evaluation,
Implement a way to track user progress.

1. install node, recent version (e.g. 17)

2. after checkout execute
```
npm install
```
3. to start your development server
```
npm run dev
```
