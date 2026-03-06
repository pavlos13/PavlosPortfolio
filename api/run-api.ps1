# Run the portfolio API. Sets Java and YouTube key, then starts Spring Boot.
# Usage: .\run-api.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Find Java if JAVA_HOME not set (common Windows locations)
if (-not $env:JAVA_HOME) {
    $possible = @(
        "C:\Program Files\Java\jdk-21",
        "C:\Program Files\Java\jdk-17",
        "C:\Program Files\Eclipse Adoptium\jdk-21*",
        "C:\Program Files\Microsoft\jdk-21*"
    )
    foreach ($p in $possible) {
        $dir = Get-Item $p -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($dir -and (Test-Path "$($dir.FullName)\bin\java.exe")) {
            $env:JAVA_HOME = $dir.FullName
            Write-Host "Using JAVA_HOME=$env:JAVA_HOME"
            break
        }
    }
}

if (-not $env:JAVA_HOME) {
    $java = Get-Command java -ErrorAction SilentlyContinue
    if (-not $java) {
        Write-Host "ERROR: Java not found. Install JDK 21 from https://adoptium.net/ and add it to PATH, or set JAVA_HOME."
        exit 1
    }
}

# Use same YouTube key as frontend if you have .env in parent folder
$envPath = Join-Path (Split-Path $PSScriptRoot -Parent) ".env"
if ((Test-Path $envPath) -and -not $env:YOUTUBE_API_KEY) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^\s*VITE_YOUTUBE_API_KEY\s*=\s*(.+)\s*$') {
            $env:YOUTUBE_API_KEY = $matches[1].Trim().Trim('"').Trim("'")
        }
    }
}
if (-not $env:YOUTUBE_API_KEY) {
    Write-Host "WARNING: YOUTUBE_API_KEY not set. Set it for /api/youtube/videos to work."
}

Write-Host "Starting API at http://localhost:8080 ..."
& .\mvnw.cmd spring-boot:run
