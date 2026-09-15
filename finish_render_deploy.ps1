$headers = @{
    "Authorization" = "Bearer rnd_i21PH9wzvYQVTy8GwvWhvDgu0KsE"
    "Content-Type" = "application/json"
}

$payload = @{
    "name" = "saffron-and-ember"
    "repo" = "https://github.com/Alokjod22/saffron-and-ember"
    "autoDeploy" = "yes"
    "branch" = "main"
    "serviceDetails" = @{
        "env" = "node"
        "envSpecificDetails" = @{
            "buildCommand" = "npm install && npx prisma db push && npm run build"
            "startCommand" = "npm run start"
        }
    }
} | ConvertTo-Json -Depth 5

Write-Host "Updating Render service with GitHub repo..."
$updated = Invoke-RestMethod -Uri "https://api.render.com/v1/services/srv-dahbd16q1p3s73bdluf0" -Method Patch -Headers $headers -Body $payload
Write-Host "Connected Repo: $($updated.repo)"

Write-Host "Triggering live deploy..."
$deploy = Invoke-RestMethod -Uri "https://api.render.com/v1/services/srv-dahbd16q1p3s73bdluf0/deploys" -Method Post -Headers $headers
Write-Host "Deploy ID: $($deploy.id)"
Write-Host "Status: $($deploy.status)"
