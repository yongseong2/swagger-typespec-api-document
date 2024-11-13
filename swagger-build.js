const swaggerAutogen = require('swagger-autogen')();
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { parse } = require('yaml');
const path = require('path');
const swaggerUi = require('swagger-ui-dist');

// OpenAPI 파일 경로
const openapiYamlPath = './tsp-output/@typespec/openapi3/openapi.yaml';
const outputHtmlPath = path.join(__dirname, 'dist', 'index.html');
const outputDir = path.dirname(outputHtmlPath);

// YAML 파일을 읽고 JSON으로 변환
const openapiYaml = readFileSync(openapiYamlPath, 'utf8');
const swaggerDocument = parse(openapiYaml);

// 디렉토리가 존재하는지 확인하고 없으면 생성
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Swagger UI 파일 내용을 읽어와서 문자열로 삽입
const swaggerUiCss = readFileSync(
  path.join(swaggerUi.getAbsoluteFSPath(), 'swagger-ui.css'),
  'utf8'
);
const swaggerUiBundleJs = readFileSync(
  path.join(swaggerUi.getAbsoluteFSPath(), 'swagger-ui-bundle.js'),
  'utf8'
);
const swaggerUiStandalonePresetJs = readFileSync(
  path.join(swaggerUi.getAbsoluteFSPath(), 'swagger-ui-standalone-preset.js'),
  'utf8'
);

// 통합된 HTML 생성
const swaggerHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Swagger UI</title>
  <style>
    ${swaggerUiCss}
  </style>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script>
    ${swaggerUiBundleJs}
  </script>
  <script>
    ${swaggerUiStandalonePresetJs}
  </script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerDocument)},
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: 'StandaloneLayout'
      });
    }
  </script>
</body>
</html>
`;

// HTML 파일 생성
writeFileSync(outputHtmlPath, swaggerHtmlTemplate);
console.log(
  'Swagger document built successfully as a single HTML file: ' + outputHtmlPath
);
