@echo off
setlocal EnableExtensions EnableDelayedExpansion
set "isAdmin=0"
set "isAdminLabel=Detecting..."

title Redline Tweaks Console
color 0C
mode con: cols=120 lines=35 >nul 2>&1
cls

call :banner
call :statusLine "Loading redline tweaks..."
call :detectAdmin
call :applyPrompt
call :loadShortcuts
call :statusLine "Environment ready. Explore the quick tweaks below."
timeout /t 2 >nul

:menu
cls
call :banner
echo    [1] Refresh DNS cache
echo    [2] Launch Disk Cleanup (cleanmgr)
echo    [3] Open Startup Apps manager
echo    [4] Run System File Checker (SFC)
echo    [5] Repair Windows image with DISM
echo    [6] Generate quick system report
echo    [7] Open Power Options
echo    [8] Exit
echo.
set "choice="
set /p "choice=Select an option (1-8): "
if not defined choice goto menu

if "%choice%"=="1" call :flushDns & pause & goto menu
if "%choice%"=="2" call :diskCleanup & pause & goto menu
if "%choice%"=="3" call :startupManager & pause & goto menu
if "%choice%"=="4" call :runSfc & goto menu
if "%choice%"=="5" call :runDism & goto menu
if "%choice%"=="6" call :systemReport & pause & goto menu
if "%choice%"=="7" call :powerOptions & pause & goto menu
if "%choice%"=="8" goto end
goto menu

:banner
for /f %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"
echo %ESC%[1;31m╔══════════════════════════════════════════════════════════════════════════════════════╗%ESC%[0m
echo %ESC%[1;31m║%ESC%[0m   Redline Tweaks Console   %ESC%[1;31m║%ESC%[0m  Power-user utilities and instant system hygiene shortcuts
echo %ESC%[1;31m╠══════════════════════════════════════════════════════════════════════════════════════╣%ESC%[0m
echo %ESC%[1;31m║%ESC%[0m   Background: Black  ▸  Accent: Crimson  ▸  Admin: !isAdminLabel!
echo %ESC%[1;31m╚══════════════════════════════════════════════════════════════════════════════════════╝%ESC%[0m
echo.
exit /b

:statusLine
echo.
echo    [*] %~1
echo.
exit /b

:detectAdmin
net session >nul 2>&1
if "%errorlevel%"=="0" (
  set "isAdmin=1"
  set "isAdminLabel=Elevated"
) else (
  set "isAdmin=0"
  set "isAdminLabel=Standard"
)
if "%isAdmin%"=="0" (
  call :statusLine "Tip: Run as administrator to unlock elevated tweaks (#4 and #5)."
)
exit /b

:applyPrompt
prompt [$t] $P$_$G 
exit /b

:loadShortcuts
doskey ll=dir /a $*
doskey cls=cls
doskey ..=cd ..
doskey home=cd /d %USERPROFILE%
doskey update=winget upgrade --all --include-unknown
doskey cleanup=cleanmgr /lowdisk
doskey sysinfo=systeminfo
exit /b

:requireAdmin
if "%isAdmin%"=="0" (
  echo.
  echo    [!] Administrator privileges are required for %~1.
  echo        Right-click this script and choose "Run as administrator".
  echo.
  pause
  exit /b 1
)
exit /b 0

:flushDns
call :statusLine "Flushing DNS cache..."
ipconfig /flushdns
exit /b

:diskCleanup
call :statusLine "Launching Disk Cleanup..."
start "" cleanmgr
exit /b

:startupManager
call :statusLine "Opening Startup Apps manager..."
start "" ms-settings:startupapps
exit /b

:runSfc
call :requireAdmin "System File Checker"
if not "%errorlevel%"=="0" exit /b
call :statusLine "Running System File Checker (this may take several minutes)..."
sfc /scannow
echo.
pause
exit /b

:runDism
call :requireAdmin "DISM RestoreHealth"
if not "%errorlevel%"=="0" exit /b
call :statusLine "Repairing Windows image with DISM (this may take a while)..."
Dism /Online /Cleanup-Image /RestoreHealth
echo.
pause
exit /b

:systemReport
call :statusLine "Collecting quick system report..."
systeminfo | more
echo.
echo    Shortcuts activated for this session:
echo      ll       ▸ dir /a
echo      home     ▸ cd %%USERPROFILE%%
echo      update   ▸ winget upgrade --all --include-unknown
echo      cleanup  ▸ cleanmgr /lowdisk
echo      sysinfo  ▸ systeminfo
exit /b

:powerOptions
call :statusLine "Opening advanced power options..."
start "" control powercfg.cpl
exit /b

:end
call :statusLine "Tweaks concluded. Stay sharp!"
timeout /t 1 >nul
endlocal
exit /b
