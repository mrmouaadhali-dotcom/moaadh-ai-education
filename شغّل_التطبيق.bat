@echo off
chcp 65001 >nul
title معاذ AI للتعليم
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000
  python -m http.server 8000
  goto end
)
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000
  py -m http.server 8000
  goto end
)
echo لم يتم العثور على Python.
echo ثبّت Python 3 ثم شغّل هذا الملف مرة أخرى.
pause
:end
