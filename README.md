## ScreenSavvy

A full-stack project created using the MERN stack. With working database connectivity.

The plan is to convert this into a microservice architecture and test how it scales up. And also add features along the way to test out system design concepts.

Test plan: allocate 6 CPU cores, 6 GB of RAM to the entire system and test monolight vs microservices performance



## Plan, to-do list

- [X] Dockerize monolith  
- [ ] Load test with k6/Locust  
- [X] Split into microservices  
- [ ] Load test with k6/Locust after microservicising  
- [ ] Add more functionalities to test distributed systems concepts (chat features, eventual/strong consistency, availability, etc.)  



## Changelog

### 12/10/26

- Moved TMDB api key from frontend to backend (finally)
- Created TMDB cache in our endpoint
- k6 testing: standardising formats and all
