# CureX Local Run Script
# Usage: ./run_local.ps1 -NvidiaKey "YOUR_KEY_HERE"

param (
    [string]$NvidiaKey = "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",
    [string]$GoogleKey = "YOUR_GOOGLE_PLACES_API_KEY"
)

$env:NVIDIA_API_KEY = $NvidiaKey
$env:GOOGLE_PLACES_API_KEY = $GoogleKey
$env:DEBUG = "True"

Write-Host "--- CureX AI Health Companion starting... ---" -ForegroundColor Cyan
python manage.py runserver
