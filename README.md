# Cognitive Credit coding exercise
## Brief
The brief was to build an application which enables a user to view a list of reporting dates for a set of companies. The user can filter the list by company name.

## Architecture & Method
Given that the test should take just a few hours, I decided to use a number of proven frameworks and technologies:
* **Next.js** was an obvious framework choice since it combines the React library with a ready to use application architecture which handles many aspects of lifecycle and state

* TypeScript was an obvious choice of language since it has mature support in React and provides robust type safety. I find that TypeScript reduces the scope for bugs and unexpected behaviour while also speeding up my development process

* **Tailwind CSS** was used to style the application since it requires little configuration and plays well with Next.js.
It was easy to create the desired responsive layout with little effort

* **AG-Grid** Is a very mature solution for interactive data grids. It has a React implementation and works well with the latest best practices.

* **Github** was used as both my build environment and my hosting environment for the solution. Since this is a mock application I was able to produce a static export to Github Pages using Github Actions. The interactive elements of the application run on the clientside and the api call is simply fetches from a static resource. The one caveat to this of course was that there could be no server side logic.

## Result
The application can be accessed from https://3d-world-uk.github.io/cognitive-credit-test/
or alternatively checked out from this repository and run locally for development and debugging. 

I have also deployed including a generated source map which means the hosted application can be debugged using Chrome Dev Tools.

The application has been uploaded with a lighthouse report which can be downloaded here:
https://3d-world-uk.github.io/cognitive-credit-test/docs/CognitiveCredit-Test-Lighthouse-Report.pdf
This will provide the details behind the following scores:
![Lighthouse Scores](/public/docs/LighthouseScore.png)
*as a side note, the lower SEO score is in part to the robots "noindex" metadata*

There is one key difference to be aware of. The hosted application is the statically generated build, whereas the local build depends on the Next.js local dev server. 


## Conclusion
I feel like the choice of technologies was suitable for the task and the timescale. However, in production, the application would be deployed with a Next.js server side, an api over rest, grpc or GraphQL *(depending on requirements)* and a front end using a combination of statically rendered and dynamic content. 

With more time I would have added some unit tests to ensure the date handling logic is robust. I could have also added some better support for accessibility or looked a little deeper at the lighthouse score and any potential performance bottlenecks.

### Bonus Features
* Support for Light and Dark mode (try switching it in your OS and see the app update in real-time)
* Responsive designe which works on both desktop and mobile
