# Data Collection Application

## Aim

To find preference of the application users whether they will identify the provided content as "fake news" or not.

## Application Design Plan

The following is the short-term plan:

- User Account
  - Username
    - Primary key
  - Password
  - Profession
    - Drop-down menu with the following options:
      - Student (pre-college)
      - Student (undergraduate)
      - Student (graduate/doctorate)
      - Working in Customer Service
      - Working in Technology
      - Working in Medical or Healthcare
      - Working in Retail, Sales, Marketing or Manufacturing
      - Working in Education or Publishing
      - None of the above
  - Country
    - Drop-down menu
  - National Identity Number (Proposal)
    - On the basis of the 'Country' selected, mention the type of National Identity number required.
    - To prevent one-user-to-many-account mapping for maintaing the integrity of the data collected, we should also ask for a pre-determined common national identity from the user.
  - Location (Doubt)
    - This filled can be auto-filled based on the 'Country'
- Sign Up
  - Form (Page 1) with the above-mentioned input fields
  - Form (Page 2) Cultural values preference
    - Based on the 'Location', provide the user a set of cultural values and ask the user to select those values that are part of the user's identified culture.
  - Form (Page 3) Consent Form
    - Text
      - By selecting the 'Yes' button below, you are voluntarily participating in this game. You are also aware and authorizing that data gathered from this app will be analyzed for research purposes to understand more about human processes with social media and news headlines. Please review your cellular data usage to manage any related fees related to this app.
    - Options
      - Yes => Continue
      - No => Homepage
- Login
  - Username
  - Password
- Game
  - Cultural value evaluation
    - Text
      - Do you want to update your cultural value preference before starting the game?
    - Buttons
      - Yes => Sign-up Form (Page 2)
      - No => Continue
  - Game
