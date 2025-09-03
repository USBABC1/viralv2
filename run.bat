@echo off
echo ================================================
echo  ViralV1 - Executar Aplicacao Localmente
echo ================================================
echo.

echo Verificando se as dependencias estao instaladas...
if not exist "node_modules" (
    echo ERRO: Dependencias nao encontradas!
    echo Por favor, execute o arquivo install.bat primeiro
    pause
    exit /b 1
)
echo ✓ Dependencias encontradas

echo.
echo Verificando se o Node.js esta disponivel...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js a partir de: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js disponivel

echo.
echo ================================================
echo  Iniciando servidor de desenvolvimento...
echo  URL: http://localhost:7000
echo ================================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev
