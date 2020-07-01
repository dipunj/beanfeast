## Beanfeast

Every saturday me and my friends would go out in Bengaluru. We would have an hour long discussion over where to go. Usually we would open Google maps, Zomato, Dineout to find the places to visit. But our friend Lalaji lives so far away from us (in banglore only), that till date we don't know his exact address. I was idle, which I hate to be. So decided to build a web app just for finding the centroid from all our locations and provide a search tool, to find places in proximity of the calculated centroid.
This application serves just one occasional usecase: find the centroid and show what's in the proximity of it. I don't know how else it may be used, but I felt that google maps didn't provide this particular facility despite allowing people to share locations with each other.

Currently for demonstration purposes the app uses TomTom API for fetching the places in proximity of centroid, because Google just declines Indian Debit Cards, and hence I cannot use it. However, the app can be migrated to google maps api, within a few minutes, since the data fetch api is modular and can select which api to use to fetch the result.

## A few things about browser fingerprint

-   The browser needs to be in the exact same configuration as it was while creating/joining a pool.
-   Even a change in window size, browser update, changing your system's display resolution, switching from mobile data to wifi etc would alter the browser's fingerprint, rendering the app useless. These cases are very unlikely to occur during a single session for finding your partying spot, justifying the tradeoff for using browser fingerprint instead of a sign up process.

## How to deploy

-   run `cd backend; yarn; cd..; cd frontend; yarn; cd..` at project root
-   populate the env files similar to the example files at the project root called .api.env and .frontend.env.
-   run `pm2 start ecosystem.config.js` at project root.



|   Mobile    |  Desktop   |
| :---------: | :--------: |
| ![][mobile] | ![][after] |


## Screenshots

- Checkout more app screens in screenshots directory


[after]: ./screenshots/after.png
[before]: ./screenshots/before.png
[asklocation]: ./screenshots/asklocation.png
[lightmode]: ./screenshots/lightmode.png
[newpool]: ./screenshots/newpool.png
[statuspage]: ./screenshots/statuspage.png
[mobile]: ./screenshots/mobile.png
