## blog cms

This is the cms for my [blog](https://mohits.dev). Built on CRA it uses tailwind for styling and talks to bakckend serverless function on vercel.

> I didn't bother making it responsive because I only ever use it on my PC.

I designed this with for being a flexible way to create, edit and publish my blog. It is technically still a WIP but that's for the features I want to integrate later like analytics. Currently it allows me to:

- Create a blog in markdown or html.
- Upload images, optimize them through a backend function, and get back html with proper srcSet attributes for all image sizes.
- Specify general metadata like slug, title, tags etc.
- Have finer control like enabling or disabling comments on a blog.
- Archive a blog if need be.
- Edit any of the above mentioned features.
- Preview the output of the blog I am writing in real time and with a responsive adjustable view.
- Handle side effects of archiving a blog by invalidating the redis cache related to that blog.

..and much more

Since it is password protected, only I can actually use anything but I plan to add a test user account with no privilege for anyone to use.

> PS: there is a cat on the login page 🐱
