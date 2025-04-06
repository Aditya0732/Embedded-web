@echo off
echo Starting Embedded Widget Server...
start cmd /k "cd embedded-widget && npm run dev"

echo.
echo Waiting for Embedded Widget Server to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Parent Websites Server...
start cmd /k "cd parent-websites && npx http-server -p 8080"

echo.
echo All servers started!
echo.
echo Access the demo websites at:
echo E-commerce: http://localhost:8080/e-commerce/
echo Finance App: http://localhost:8080/finance-app/
echo SaaS Dashboard: http://localhost:8080/saas-dashboard/
echo.
echo Press any key to exit...
pause > nul 