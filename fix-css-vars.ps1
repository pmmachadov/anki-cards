# Script para reemplazar variables CSS con valores reales en el build
$cssFile = Get-ChildItem -Path "./dist/assets" -Filter "style-*.css" | Select-Object -First 1

if (-not $cssFile) {
    Write-Host "No se encontró archivo CSS"
    exit 1
}

$css = Get-Content $cssFile.FullName -Raw

# Definir las variables y sus valores
$vars = @{
    '--bg-primary' = '#0d1117'
    '--bg-secondary' = '#161b22'
    '--bg-tertiary' = '#21262d'
    '--bg-elevated' = '#30363d'
    '--text-primary' = '#f0f6fc'
    '--text-secondary' = '#8b949e'
    '--text-muted' = '#6e7681'
    '--accent-primary' = '#6d28d9'
    '--accent-secondary' = '#7c3aed'
    '--accent-success' = '#238636'
    '--accent-warning' = '#d29922'
    '--accent-danger' = '#da3633'
    '--border-color' = '#30363d'
    '--border-light' = '#21262d'
}

# Reemplazar cada var(--variable) con su valor
foreach ($var in $vars.GetEnumerator()) {
    $pattern = 'var\(' + [regex]::Escape($var.Key) + '\)'
    $css = $css -replace $pattern, $var.Value
}

# Guardar el archivo modificado
$css | Set-Content $cssFile.FullName -NoNewline

Write-Host "Variables CSS reemplazadas correctamente en $($cssFile.Name)"
