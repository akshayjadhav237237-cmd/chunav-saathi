
# Generate PWA icons using .NET System.Drawing
Add-Type -AssemblyName System.Drawing

function Generate-Icon {
    param([int]$Size, [string]$OutputPath)
    
    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Background circle - ECI Blue
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 75, 135))
    $g.FillEllipse($bgBrush, 0, 0, $Size, $Size)
    
    # Orange ring accent
    $orangePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 153, 51), [float]($Size * 0.04))
    $margin = [int]($Size * 0.05)
    $g.DrawEllipse($orangePen, $margin, $margin, $Size - 2*$margin, $Size - 2*$margin)
    
    # White ballot box body
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $boxX = [int]($Size * 0.25); $boxY = [int]($Size * 0.22)
    $boxW = [int]($Size * 0.50); $boxH = [int]($Size * 0.42)
    $g.FillRectangle($whiteBrush, $boxX, $boxY, $boxW, $boxH)
    
    # Green vote button strip at bottom of box
    $greenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 46, 125, 50))
    $stripH = [int]($Size * 0.10)
    $g.FillRectangle($greenBrush, $boxX, $boxY + $boxH - $stripH, $boxW, $stripH)
    
    # Tricolor stripe at bottom
    $saffronBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 153, 51))
    $whiteBrush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $indGreenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 19, 136, 8))
    $stripeH = [int]($Size * 0.07)
    $stripeY = [int]($Size * 0.78)
    $g.FillRectangle($saffronBrush, [int]($Size*0.15), $stripeY, [int]($Size*0.70), $stripeH)
    $g.FillRectangle($whiteBrush2, [int]($Size*0.15), $stripeY + $stripeH, [int]($Size*0.70), $stripeH)
    $g.FillRectangle($indGreenBrush, [int]($Size*0.15), $stripeY + 2*$stripeH, [int]($Size*0.70), $stripeH)
    
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $OutputPath ($Size x $Size)"
}

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Generate-Icon -Size 192 -OutputPath (Join-Path $dir "icon-192.png")
Generate-Icon -Size 512 -OutputPath (Join-Path $dir "icon-512.png")
Generate-Icon -Size 180 -OutputPath (Join-Path $dir "apple-touch-icon.png")
Write-Host "All icons generated."
