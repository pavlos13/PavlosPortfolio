@REM Maven Wrapper script for Windows
@REM Run with: mvnw.cmd spring-boot:run

setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"

if not exist "%WRAPPER_JAR%" (
    echo Downloading Maven Wrapper...
    powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar' -OutFile '%WRAPPER_JAR%' -UseBasicParsing}"
    if errorlevel 1 (
        echo Failed to download Maven Wrapper. Install Maven from https://maven.apache.org/download.cgi and run: mvn spring-boot:run
        exit /b 1
    )
)

if not "%JAVA_HOME%"=="" (
    set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
) else if exist "C:\Program Files\Java\jdk-21\bin\java.exe" (
    set "JAVA_EXE=C:\Program Files\Java\jdk-21\bin\java.exe"
) else if exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    set "JAVA_EXE=C:\Program Files\Java\jdk-17\bin\java.exe"
) else (
    set "JAVA_EXE=java"
)
if exist "%JAVA_EXE%" goto :run
where "%JAVA_EXE%" >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java not found. Set JAVA_HOME or add Java to PATH. JDK 21: https://adoptium.net/
    exit /b 1
)
:run
"%JAVA_EXE%" -cp "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
