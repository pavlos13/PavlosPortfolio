# Portfolio API

Java Spring Boot REST API backend for the [my-portfolio](../) frontend.

## Requirements

- **Java 21**
- Maven 3.6+ (or use an IDE like IntelliJ IDEA / Eclipse to open the `api` folder and run `PortfolioApiApplication`)

## Run the API

You need **Java 21** installed. You do **not** need Maven installed—use the included wrapper.

From the `api` folder:

**Windows (PowerShell or CMD):**

```powershell
cd c:\Users\pavlo\my-portfolio\api
$env:YOUTUBE_API_KEY="your_youtube_api_key"
.\mvnw.cmd spring-boot:run
```

The first run may download Maven automatically; then the API will start.

The API starts at **http://localhost:8080**.

To enable the YouTube videos API, set your API key when running (same key as in the portfolio `.env` is fine):

```powershell
$env:YOUTUBE_API_KEY="your_youtube_api_key"; mvn spring-boot:run
```

## YouTube API key

For the `/api/youtube/videos` endpoint, set your YouTube Data API v3 key:

- **Environment variable:** `YOUTUBE_API_KEY=your_key`
- Or in `src/main/resources/application.properties`: `youtube.api-key=your_key`

You can use the same key as in the frontend (e.g. from the portfolio `.env` as `VITE_YOUTUBE_API_KEY`). Do not commit the key; use env or a local properties file.

## Endpoints

| Method | Path                 | Description                                  |
|--------|----------------------|----------------------------------------------|
| GET    | /api/health          | Health check (status, service)               |
| GET    | /api/youtube/videos  | All videos from the configured YouTube channel (title, description, thumbnail, date, url) |

## CORS

CORS is enabled for the portfolio frontend origins (e.g. `http://localhost:5173`). Configure `cors.allowed-origins` in `src/main/resources/application.properties` or via environment variables if you use other origins.

## Adding APIs for the portfolio

- Add new `@RestController` classes under `com.portfolio.api.controller`.
- Use `@RequestMapping("/api/...")` for API routes so the frontend can call them (e.g. from Vite with `fetch('http://localhost:8080/api/...')`).
- Optional: add `spring-boot-starter-data-jpa` and a database for persistent data.

## Build

```bash
./mvnw clean package
java -jar target/portfolio-api-1.0.0-SNAPSHOT.jar
```
