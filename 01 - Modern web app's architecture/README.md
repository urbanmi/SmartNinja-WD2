# Lesson 01 - Modern web app's architecture

## Agenda

- Web development 2 intro
- Modern web architectures
- Exercises

## Web development 2 intro

- Lessons 1 - 6: Back-end development
- Lessons 7 - 17: JavaScript and Front-end development
- Lessons 18 - 21: Deployment & CI/CD
- Lessons 22 - 24: Final project

### **Info for students**

- Make sure to attend course sessions. If you can't make it to some session, go through the lesson by yourself at home and do the homework.
- If you want, you can read each lesson in the curriculum even before you have a session with the instructor. This way you come to the session more prepared, and you can ask better questions.
- Students can also gather at informal meetings in order to do homework together. These meetings can take place in a library, a coffee place, etc. - It's up to you, students. However, you have to organize it yourselves.
- Also, search Meetup.com for local coding meetups and attend them (either alone or - even better - as a group!).

### Get to know, what have you been up to?

Since Web Development 1, what projects did you take on? Where were the issues?



## Modern web architectures

WHY: abstraction and specialization of building blocks for the web

### Monolithic

This is a traditional approach where the entire application is built as a single unit. All components of the application, such as the user interface, business logic, and data access layer, are tightly coupled together. Monolithic architectures are typically easier to develop initially but can become challenging to maintain and scale as the application grows.

Many of the biggest web sites including Amazon, Twitter and AirBnB began as a monolithic application and later transitioned to different architectures. Wordpress, that powers around 45% of the websites is a monolitic application. Monolithic is still the most widely used architectural pattern.

When we created a website in Flask in WD1, we were building a monolithic application.

### Single page application (SPA)

In SPA architecture, the entire front-end is an application that runs in the browser and only needs to load once. Subsequent interactions with the application are  handled dynamically, without needing to reload the entire page. SPAs provide a more responsive user experience but require careful management of client-side state and can be less SEO-friendly compared to  server-rendered applications.

When we are talking about a SPA we are talking about the front-end part of the website. The back-end can be implemented using different architectural patterns and approaches. It should always, however, expose an API through which the data is retrieved and stored to the server.

Since there needs to be logic implemented on the FE and the only language browsers support is JavaScript, all SPAs are written in JavaScript, although many different frameworks are used. Some of the more popular are Angular, React, Vue.js, Svelte, an others.

### Micro services

This architecture breaks down the application into smaller,  independently deployable services, each responsible for a specific  business function. These services communicate with each other through well-defined APIs. Microservices allow for greater flexibility,  scalability, and resilience, but they also introduce complexities in terms of deployment, monitoring, and managing inter-service communication.

When talking about micro services, we are talking about the back-end architecture. The front-end is usually a SPA or in some cases it's a server-rendered application that serves pages to the user. Most of the micro services are usually hidden to the end-user of the app. Many of the big companies use this approach.

As an example, a web-store organized into micro-services might include some of the following services:

- **User Service**: Handles user authentication, registration, and user profile management.
- **Product Catalog Service**: Manages product information such as name, description, price, and availability.
- **Order Service**: Responsible for handling the creation, modification, and processing of orders.
- **Payment Service**: Handles payment processing, including payment gateways integration and transaction management.
- **Inventory Service**: Manages inventory levels, tracks stock availability, and handles inventory updates.
- **Shipping Service**: Coordinates shipping logistics, calculates shipping costs, and tracks package delivery.
- **Notification Service**: Sends out notifications to users via email, SMS, or push notifications for order updates, promotions, or other events.
- **Analytics Service**: Collects and analyzes data related to user behavior, sales trends, and system performance.
- **Content Management Service**: Manages content creation, editing, and publishing for blogs, articles, or other types of content.
- **Authentication Service**: Provides authentication and authorization functionality for all microservices within the system, ensuring secure access control.

It is said that in the early days of Amazon, Jef Bezos send out a memo that all their teams should expose their data and functionality through the APIs and hide the implementation details at all costs. This note is called *Bezos API Mandate*. Read about it and talk about the implications.

### Serverless

Serverless architecture abstracts away the underlying infrastructure  management, allowing developers to focus solely on writing code.  Functions (or "serverless" components) are deployed in response to  events, such as HTTP requests or database changes, and are automatically scaled and managed by the cloud provider. Serverless architectures  offer cost efficiency and scalability benefits but may introduce latency and vendor lock-in concerns.

Some of the serverless providers are AWS Lambda, Google Cloud Functions, Microsoft Azure Functions, Firebase Cloud Functions and many more

Severless is a misnomer as there is still a server behind it. It's just that it's not maintained by the developer.

## Homework 

- exercise:
  - give students 5 different web-based applications (Google Keep (todo app), Twitter, Wordpress, WhatsApp, EMSO validator)
  - make them list their functionalities 
  - group the functionalities in one of the architecture model
  - talk about which model is actually used in their production and why
- show the layers of application
  - presentation, business logic, persistence
  - not all business logic needs to be in the BE, nor not all persistence, even presentation layer can be in BE (pre-rendering)
- exercise: 
  - select the same 5 apps from previous exercise
  - select in which layer and in which end they belong
  - discuss why would that be
- A short dive into [Programming principles](https://en.wikipedia.org/wiki/Category:Programming_principles) with the emphasis on
  - Separation of concerns/Single responsibility principle [:link:](https://stackoverflow.com/a/25012230)
  - YANGI - You aren't gonna need it
  - KISS principle
  - DRY - Don't repeat yourself
  - Zen of Python
