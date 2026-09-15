$headers = @{
    "Authorization" = "Bearer rnd_i21PH9wzvYQVTy8GwvWhvDgu0KsE"
    "Content-Type" = "application/json"
}

$payload = @{
    "type" = "web_service"
    "name" = "saffron-and-ember-web"
    "ownerId" = "tea-dahbb86k1f9s73ecshig"
    "repo" = "https://github.com/Alokjod22/saffron-and-ember"
    "autoDeploy" = "yes"
    "branch" = "main"
    "serviceDetails" = @{
        "env" = "node"
        "plan" = "free"
        "envSpecificDetails" = @{
            "buildCommand" = "npm install && npx prisma db push && npm run build"
            "startCommand" = "npm run start"
        }
        "envVars" = @(
            @{ "key" = "DATABASE_URL"; "value" = "file:./dev.db" },
            @{ "key" = "JWT_SECRET"; "value" = "saffron-and-ember-secret-key-2026-production-super-secret" }
        )
    }
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services" -Method Post -Headers $headers -Body $payload
    $response | ConvertTo-Json -Depth 5 | Out-File -FilePath "new_render_service_result.json"
} catch {
    $_ | Out-File -FilePath "new_render_service_result.json"
}
