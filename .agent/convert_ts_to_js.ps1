
# TypeScript to JavaScript Converter
# Strips common TS-specific syntax and renames files

$tsFiles = Get-ChildItem -Path "d:\IPL ai" -Recurse -Include "*.ts","*.tsx" |
    Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\.next\\" }

foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if (-not $content) { $content = "" }

    # 1. Remove import type statements entirely
    $content = [Regex]::Replace($content, 'import\s+type\s+\{[^}]*\}\s+from\s+[''"][^''"]+[''"];\s*\r?\n?', '')
    $content = [Regex]::Replace($content, 'import\s+type\s+\w+\s+from\s+[''"][^''"]+[''"];\s*\r?\n?', '')

    # 2. Remove "type" keyword from named imports: import { type Foo, Bar } -> import { Bar }
    $content = [Regex]::Replace($content, ',\s*type\s+\w+', '')
    $content = [Regex]::Replace($content, '\btype\s+(\w+)\s*,', '$1,')
    $content = [Regex]::Replace($content, '\{\s*type\s+\w+\s*\}', '{}')

    # 3. Remove TypeScript type annotations on variables/params: : Type, : Type | Other, ?: Type
    # Function return types (colon after closing paren before { or =>)
    # We do these with careful regex passes

    # Remove generic type params <T>, <T, U>, <T extends X> from function calls and declarations
    # But don't remove JSX tags! Only remove when attached to identifier or keywords
    $content = [Regex]::Replace($content, '(?<=[a-zA-Z0-9_])<[^<>(){}[\]]*?(?:extends\s[^<>(){}[\]]*?)?>', '')

    # Remove inline type assertions: as Type
    $content = [Regex]::Replace($content, '\s+as\s+[A-Z][a-zA-Z0-9_<>\[\]|&.""''` ]*(?=[,)\];}\n\r])', '')

    # Remove type annotations on function parameters and variables: ): ReturnType, param: Type
    # Variable declarations with type: const x: Type = ...
    $content = [Regex]::Replace($content, ':\s*(?:string|number|boolean|void|never|any|unknown|null|undefined|object|symbol|bigint)(\[\])?\s*(?=[=,)\];{|&\n\r])', '')

    # Optional param marker on its own: param?: 
    $content = [Regex]::Replace($content, '\?:\s*(?:string|number|boolean|void|never|any|unknown|null|undefined|object|symbol|bigint)(\[\])?\s*(?=[=,)\];{|&\n\r])', ' = undefined,')

    # Remove TypeScript-only keywords: interface, type alias declarations
    $content = [Regex]::Replace($content, '^export\s+interface\s+\w+[^{]*\{[^}]*\}\s*\r?\n?', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $content = [Regex]::Replace($content, '^interface\s+\w+[^{]*\{[^}]*\}\s*\r?\n?', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $content = [Regex]::Replace($content, '^export\s+type\s+\w+\s*=\s*[^;]+;\s*\r?\n?', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $content = [Regex]::Replace($content, '^type\s+\w+\s*=\s*[^;]+;\s*\r?\n?', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)

    # Remove enum declarations (export enum / enum)
    $content = [Regex]::Replace($content, '(?:export\s+)?(?:const\s+)?enum\s+\w+\s*\{[^}]*\}', '')

    # Remove "export type" re-exports
    $content = [Regex]::Replace($content, 'export\s+type\s*\{[^}]*\}(?:\s+from\s+[''"][^''"]+[''"]\s*)?;\s*\r?\n?', '')

    # Determine new extension
    $newExt = if ($file.Extension -eq ".tsx") { ".jsx" } else { ".js" }
    $newPath = [System.IO.Path]::ChangeExtension($file.FullName, $newExt)

    # Write converted JS file
    Set-Content -Path $newPath -Value $content -Encoding UTF8 -NoNewline

    # Remove old TS file
    Remove-Item $file.FullName -Force

    Write-Host "Converted: $($file.FullName) -> $newPath"
}

Write-Host "`nDone! Converted $($tsFiles.Count) files."
