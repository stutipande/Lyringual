# Lyringual
With this app you can learn new languages by translating your favourite songs!

Browse through a huge library with millions of song lyrics and pick which language you want to learn, then you can practice and self-test your progress!

Keep track of your progress and level up different languages with a motivating XP system!

# Installation

1. Clone the repo
2. npm i
3. npm run dev

# 3rd party components used

## react-hot-toast
Used for in app notifications for user feedback, such as successful/failed login/logout, xp gained etc. The wrapper component is in ReactRoot.jsx, and then it is populated with toasts from most presenters.

## react-joyride
A component library that let's developers create a tutorial walkthrough in their app. We use it after a user just have created an account to teach them how to use the app in the search view and the song details / test view. Used in SearchPresenter.jsx and DetailsPresenter.jsx

## react-confetti-explosion
Used as some eye candy whenever a user successfully translates a lyric! Whooray 🥳🎉 Used in detailsView.jsx.