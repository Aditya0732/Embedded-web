Write-Host "Starting Embedded Widget Server..." -ForegroundColor Green
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$PWD\embedded-widget' ; npm run dev"

Write-Host "`nWaiting for Embedded Widget Server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`nStarting Parent Websites Server..." -ForegroundColor Green
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$PWD\parent-websites' ; npx http-server -p 8080"

Write-Host "`nAll servers started!" -ForegroundColor Cyan
Write-Host "`nAccess the demo websites at:" -ForegroundColor White
Write-Host "E-commerce: http://localhost:8080/e-commerce/" -ForegroundColor Cyan
Write-Host "Finance App: http://localhost:8080/finance-app/" -ForegroundColor Cyan
Write-Host "SaaS Dashboard: http://localhost:8080/saas-dashboard/" -ForegroundColor Cyan

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 