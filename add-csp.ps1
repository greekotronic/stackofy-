# CSP Meta Tag
$csp = '<meta http-equiv="Content-Security-Policy" content="default-src ''self''; script-src ''self'' ''unsafe-inline''; style-src ''self'' ''unsafe-inline''; img-src ''self'' data: https:; font-src ''self''; connect-src ''self''; frame-ancestors ''none''; base-uri ''self''; form-action ''self'';">'

# Pfade definieren
$rootPath = "E:\Eigene Dateien\Stackofy-Clean"

# Alle HTML-Dateien finden
$htmlFiles = Get-ChildItem -Path $rootPath -Name "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $fullPath = "$rootPath\$file"
    
    # Datei einlesen
    $content = Get-Content -Path $fullPath -Raw -Encoding UTF8
    
    # Pruefe: CSP bereits vorhanden?
    if ($content -like "*Content-Security-Policy*") {
        Write-Host "OK - CSP bereits in: $file"
        continue
    }
    
    # Pruefe: head Tag vorhanden?
    if ($content -notlike "*<head>*") {
        Write-Host "SKIP - Kein head in: $file"
        continue
    }
    
    # CSP nach description Meta Tag einfügen
    if ($content -like '*<meta name="description"*') {
        $content = $content -replace '(<meta name="description"[^>]*>)', "`$1`n  $csp"
    } elseif ($content -like "*<link rel=*icon*") {
        $content = $content -replace '(<link rel="icon"[^>]*>)', "`$1`n  $csp"
    } else {
        $content = $content -replace '(<head[^>]*>)', "`$1`n  $csp"
    }
    
    # Speichern
    Set-Content -Path $fullPath -Value $content -Encoding UTF8
    Write-Host "ADD - CSP hinzugefuegt: $file"
}

Write-Host "`nFERTIG!"
