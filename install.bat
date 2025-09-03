@echo off
echo ================================================
echo  ViralV1 - Script de Instalacao Completa
echo ================================================
echo.

echo [1/4] Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js a partir de: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [2/4] Verificando se o npm esta instalado...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: npm nao encontrado!
    echo Por favor, reinstale o Node.js
    pause
    exit /b 1
)
echo ✓ npm encontrado

echo.
echo [3/4] Instalando dependencias do projeto...
echo Isso pode demorar alguns minutos...
npm install --legacy-peer-deps
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas com sucesso

echo.
echo [4/4] Gerando tipos do Cloudflare...
npm run cf-typegen
if errorlevel 1 (
    echo AVISO: Falha ao gerar tipos do Cloudflare (isso e normal em desenvolvimento local)
)

echo.
echo ================================================
echo  Instalacao concluida com sucesso!
echo ================================================
echo.
echo Para executar a aplicacao, use o arquivo run.bat
echo ou execute: npm run dev
echo.
pause
