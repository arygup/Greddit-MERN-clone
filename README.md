# Reddit Clone Development

## Project Overview

Welcome to the Social Media Platform Development project! This assignment aims to build a dynamic and interactive social media platform named **Greddiit** using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform will have features such as user registration, profile management, creation of subreddits (Sub Greddiits), post creation, and more.

## Technologies Used

- **MongoDB**: Non-relational database for storing user data and posts.
- **Express.js**: Backend framework for implementing RESTful APIs.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: Backend environment for running Express applications.

## Features

### User Management

1. **User Registration and Login**
   - Registration page with fields: First Name, Last Name, User Name, Email, Age, Contact Number, Password.
   - Login page redirecting to the home page.
   - Persistent login session across browser/computer restarts.
   - Logout functionality.
   - Passwords stored in the database must be hashed.
   - Authentication and Authorization using JSON Web Tokens (JWT).

### Profile Management

1. **Profile Page**
   - Display and edit user details.
   - Followers and Following lists with clickable user names.
   - Unfollow and remove follower functionality.

### Sub Greddiits Management

1. **My Sub Greddiits Page**
   - Create new Sub Greddiits with a form.
   - Display list of created Sub Greddiits with details.
   - Options to delete and open Sub Greddiits.

2. **Sub Greddiits Details Page**
   - List of users joined, with blocked users distinguished.
   - Joining requests management.
   - Display stats such as growth, daily posts, daily visitors, reported posts, and actions taken.

### Post Management

1. **Creating and Interacting with Posts**
   - Create text-based posts.
   - Upvote, downvote, comment, and save posts.
   - Follow users based on their posts.

2. **Moderation of Posts**
   - Reporting posts with concerns.
   - Actions on reports: Block User, Delete Post, Ignore.
   - Automatic handling of unaddressed reports after a set period.

### Additional Features

1. **Search and Filter**
   - Search Sub Greddiits by name.
   - Filter Sub Greddiits based on tags.
   - Sort Sub Greddiits by name, followers, and creation date.

2. **Saved Posts Page**
   - Display posts saved by the user.
   - Option to remove saved posts.

3. **Handling Banned Keywords**
   - Alert users about banned keywords in posts.
   - Replace banned keywords with asterisks in the displayed text.
