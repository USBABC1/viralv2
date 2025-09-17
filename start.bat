@echo off
echo ================================================
echo  ViralV1 - Script de Inicio Completo
echo ================================================
echo.

echo Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js a partir de: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo Verificando se as dependencias ja estao instaladas...
if not exist "node_modules" (
    echo.
    echo Instalando dependencias do projeto...
    echo Isso pode demorar alguns minutos...
    npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERRO: Falha ao instalar dependencias
        pause
        exit /b 1
    )
    echo ✓ Dependencias instaladas com sucesso
) else (
    echo ✓ Dependencias ja estao instaladas.
)


echo.
echo Gerando tipos do Cloudflare...
npm run cf-typegen
if errorlevel 1 (
    echo AVISO: Falha ao gerar tipos do Cloudflare.
)
echo ✓ Tipos gerados.

echo.
echo ================================================
echo  Iniciando servidor de desenvolvimento...
echo  URL: http://localhost:7000
echo ================================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev
