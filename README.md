# BarberShop

## Prerequisites
#### Install dependencies
```
npm install
```

#### Run the project
```
npm start
```

#### Build the project
```
npm run build
```

#### API specification
There are two mocked endpoints available.

## Challenge
Let's imagine that you're building a barbershop booking system.
You need to provide an ability to start booking process by choosing a barber first or choosing a service first.
After that you need to display available barbers or available services according to services that barber provides. 

1. Users should be able to choose what they want to start with: choosing a professional or choosing a service.
2. If user wants to choose a professional, you should show all available professionals. Once a professional is chosen, you should show all services that are provided by the selected professional.
3. If user wants to choose a service, you should show all available services. Once a service is chosen, you should show all professionals that provide the selected service.

A designer provided you with a design for the feature that shows how both flows work.
You can check it out [here](https://www.figma.com/file/1kF0YUsZn28IvYX9pW0y4h/Squire-Tech-Challenge). Only one screen size is supported.