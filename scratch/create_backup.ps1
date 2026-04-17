$items = Get-ChildItem -Path "c:\Users\Max\Downloads\A Codici Main\bespoint-main\*" -Exclude "node_modules", "BACKUP_BESPOINT_*", "temp_restore", "dist", "Backups", "scratch"
Compress-Archive -Path $items -DestinationPath "c:\Users\Max\Downloads\A Codici Main\Backups\bespoint_main_2026-04-17_01.zip" -Force
Write-Host "Backup created successfully: c:\Users\Max\Downloads\A Codici Main\Backups\bespoint_main_2026-04-17_01.zip"
