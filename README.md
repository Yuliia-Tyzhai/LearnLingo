# LearnLingo

## Project Description

This project is a web application for a company that provides online language
tutoring services. The application consists of three main pages: "Home",
"Teachers", and "Favorites". It allows users to view a list of teachers, filter
them by various criteria, add teachers to their favorites list, and book trial
lessons.

## Main Technologies

- **HTML:** Markup language for creating the structure of web pages.
- **CSS:** Stylesheet language for styling web pages.
- **React:** JavaScript library for building user interfaces.
- **React Router:** For routing within the application.
- **Redux:** For managing the application state.
- **Firebase:** For user authentication and teacher data storage.
- **react-hook-form:** For working with forms.
- **Yup:** For form validation.
- **react-toastify:** For displaying notifications.
- **react-svg:** For displaying SVG.
- **clsx:** For conditionally applying CSS classes.
- **nanoid:** For generating unique IDs.
- **CSS Modules:** For styling components.
- **Vite/Parcel:** As a bundler for building the project.

## Layout

The application layout is available at:
https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0

## Technical Task

1.  **User Authentication:**
    - Implement registration, login, current user data retrieval, and logout
      using Firebase Authentication.
2.  **Forms and Validation:**
    - Use `react-hook-form` and `yup` to create registration/login forms and
      validate their fields.
    - Implement a modal window for forms that closes when the user clicks the
      "cross" button, the backdrop, or presses the Esc key.
3.  **Teachers Database:**
    - Create a "teachers" collection in Realtime Database (Firebase) with the
      following fields: `name`, `surname`, `languages`, `levels`, `rating`,
      `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`,
      `conditions`, `experience`.
    - Use `teachers.json` to populate the collection.
4.  **Teacher Card:**
    - Implement a teacher card with a description of the teacher's
      characteristics according to the layout.
5.  **"Teachers" Page:**
    - Display 4 teacher cards on the page.
    - Implement a "Load more" button to load additional cards from the database.
6.  **Adding to Favorites:**
    - For unauthenticated users, display a modal window with a message about the
      need to authenticate.
    - For authenticated users, add the card to the favorites list (localStorage
      or Firebase) and change the color of the "heart" button.
7.  **Saving Favorites State:**
    - Save the state of favorite cards when the page is refreshed.
8.  **Removing from Favorites:**
    - Implement removing a card from favorites when the user clicks the "heart"
      button again.
9.  **Detailed Information:**
    - Implement expanding the card with detailed information and reviews when
      the user clicks the "Read more" button.
10. **Booking Trial Lesson:**
    - Implement a modal window with a form for booking a trial lesson.
    - Use `react-hook-form` and `yup` to create the form and validate it.
11. **Closing Modal Window:**
    - Implement closing the modal window when the user clicks the "cross"
      button, the backdrop, or presses the Esc key.
12. **"Favorites" Page:**
    - Implement a private "Favorites" page for authenticated users, where they
      can view their favorite teacher cards.
    - Style the page similarly to the "Teachers" page.

## Starred Task (\*)

- Implement routing using React Router.
- Add filtering for teachers by teaching language, student proficiency level,
  and hourly rate.

## Evaluation Criteria

- Desktop layout implementation matches the provided layout, is semantic, and
  valid.
- No errors in the browser console.
- The work is done in native JavaScript with a bundler or in React.
- Authentication and collection work are implemented using Firebase.
- Interactivity works according to the technical task.
- The code is formatted and without comments.
- The project is deployed on GitHub Pages, Netlify, or another hosting service.

## Materials

- `firebase_docs` - Firebase documentation for working with the REST API.
- `teachers.json` - file with teacher data to populate the database.

## Author

Yuliia Tyzhai, a Full-stack developer.
