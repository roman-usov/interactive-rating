# Frontend Mentor - Interactive rating component solution

This is a solution to the [Interactive rating component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Select and submit a number rating
- See the "Thank you" card state after submitting a rating

### Screenshot

![](design/screenshot.png)

### Links

- Solution URL: [Github](https://github.com/roman-usov/interactive-rating)
- Live Site URL: [Netlify](https://ru-interactive-rating.netlify.app/)

## My process

1. Measured layout and element dimensions based on the provided design screens using xScope. The values received from xScope had to be divided by 2 for the layout and the elements to be properly sized in the browser.
2. Developed the overall HTML structure
3. Created desktop styles for the rating form, including the states
4. Created desktop styles for the thank-you card
5. Wrote javascript code for selecting a rating, submitting it and displaying the thank-you card
6. Added a fade-in and a fade-out class to accompany the hidden class
7. Wrote javascript code that sets up an event listener for the transitionend event and enables the rating form to fade out first using transition and the thank-you card to fade-in
8. Added styles for mobile screens.
9. Experimented with transitions to accompany hiding the rating form and displaying

### Built with

- HTML5 & CSS3
- Flexbox
- Desktop-first workflow
- Javascript

### What I learned

1. Practiced creating a sticky footer
   For that:
   - created a parent container that houses the rating form and the thank-you card
   - turned the body into a flex container with the flex-direction set to column
   - allowed the parent container to grow

```css
body {
  display: flex;
  flex-direction: column;
}

.container-parent {
  flex: 1 0 auto;
}

.attribution {
  flex-shrink: 0;
}
```

2. Practiced creating a hidden class accompanied by a fade-in and a fade-out class to add a bit of smoothness to the transition from the rating form to the thank-card

Approach 1. Tried to use display: none, but it doesn't support transitions, so I had to experiment with the timing when display: none will be applied in combination with using visibility and opacity that do support transitions.

To handle the order in which the transitions should be applied, used the transitionend event.

```js
ratingFormEl.addEventListener(
  'transitionend',
  (ev) => {
    ev.preventDefault();

    ratingFormEl.classList.add('out-of-flow');
    thankYouEl.classList.remove('out-of-flow');
    thankYouEl.classList.add('not-visible');
    thankYouEl.classList.add('fade-in');
  },
  {
    capture: false,
    once: true,
  }
);

ratingFormEl.classList.add('fade-out');
```

```css
 .out-of-flow {
  display: none;
  pointer-events: none;
}

.not-visible {
  opacity: 0;
  visibility: hidden;
}

.fade-out {
  opacity: 0;
  visibility: hidden;
  transition-property: visibility, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.thank-you-content.fade-in {
  visibility: visible;
  opacity: 1;
  transition-property: visibility, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
```
Approach 2. For the rating form to fade out, used the height, opacity and padding properties. The transition properties are set on the rating form itself.
Adding the fade-out class to the rating form will set the height, opacity and padding to 0 based on the specified transition properties.

The padding, opacity and height of the thank-you card are initially set to 0. Adding the fade-in class to the thank-you card will set the height to auto, opacity to 1 and the padding to the specified values.

To control the fade-out and fade-in, used the transitionend event so that the fade-out on the rating form is complete before the fade-in on the thank-you card starts.

```js
  ratingFormEl.addEventListener(
    'transitionend',
    () => {
      thankYouEl.classList.add('fade-in');
    },
    {
      capture: false,
      once: true,
      passive: true,
    }
  );

  ratingFormEl.classList.add('fade-out');
```
```css
.container-form {
  padding: 3rem;
  height: auto;
  transition-property: padding, height, opacity;
  transition-duration: 0.3s;
}

.container-form.fade-out {
  height: 0;
  opacity: 0;
  padding: 0;
}

.container-thank-you {
  text-align: center;
  padding: 0;
  opacity: 0;
  height: 0;
  transition-property: height, padding, opacity;
  transition-delay: 0.1s;
  transition-duration: 0s, 0s, 0.3s;
}

.container-thank-you.fade-in {
  padding: 4.25rem 2.5rem 5rem;
  height: auto;
  opacity: 1;
}
```


3. Learned that arbitrarily using 'all' with the transition property can result in unwanted too elastic switching from the desktop view to the mobile view

4. Learned about the transitionend event that allows working around the display: none not supporting transitions

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

### Useful resources

- [CSS Tricks](https://www.css-tricks.com) - This helped me with figuring out options for hiding/unhiding elements. Also, has a great guide for Flexbox.
- [Stackoverflow](https://stackoverflow.com/questions/3331353/transitions-on-the-css-display-property) - Gave me an idea for how height can be used for hiding and unhiding elements.
