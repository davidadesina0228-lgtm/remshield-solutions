param(
  [string]$Base = $(if ($env:REMSHIELD_AI_DISCOVERY_BASE_URL) { $env:REMSHIELD_AI_DISCOVERY_BASE_URL } else { "https://remshield.solutions" })
)

$ErrorActionPreference = "Stop"

$requests = @(
  @{
    jsonrpc = "2.0"
    id = 1
    method = "initialize"
    params = @{
      protocolVersion = "2025-06-18"
      capabilities = @{}
      clientInfo = @{
        name = "remshield-mcp-smoke-test"
        version = "1.0.0"
      }
    }
  },
  @{
    jsonrpc = "2.0"
    method = "notifications/initialized"
  },
  @{
    jsonrpc = "2.0"
    id = 2
    method = "tools/list"
  },
  @{
    jsonrpc = "2.0"
    id = 3
    method = "tools/call"
    params = @{
      name = "search_remshield_articles"
      arguments = @{
        query = "model context"
        limit = 3
      }
    }
  },
  @{
    jsonrpc = "2.0"
    id = 4
    method = "resources/list"
  },
  @{
    jsonrpc = "2.0"
    id = 5
    method = "resources/read"
    params = @{
      uri = "remshield://ai-discovery/products"
    }
  }
)

$inputLines = $requests | ForEach-Object { $_ | ConvertTo-Json -Depth 20 -Compress }
$outputLines = $inputLines | node tools/remshield-mcp-server.mjs --base $Base
$responses = @{}

foreach ($line in $outputLines) {
  if (-not $line.Trim()) {
    continue
  }

  $message = $line | ConvertFrom-Json
  if ($null -ne $message.id) {
    $responses[[int]$message.id] = $message
  }
}

$failures = New-Object System.Collections.Generic.List[string]

foreach ($id in @(1, 2, 3, 4, 5)) {
  if (-not $responses.ContainsKey($id)) {
    $failures.Add("Missing response id $id")
    continue
  }

  if ($responses[$id].PSObject.Properties.Name -contains "error") {
    $failures.Add("Response id $id returned error: $($responses[$id].error.message)")
  }
}

$tools = @($responses[2].result.tools)
if (-not ($tools | Where-Object { $_.name -eq "search_remshield_articles" })) {
  $failures.Add("tools/list did not include search_remshield_articles")
}

$articleResult = $responses[3].result
if ($articleResult.isError -or -not $articleResult.structuredContent.data -or @($articleResult.structuredContent.data).Count -lt 1) {
  $failures.Add("search_remshield_articles did not return article matches")
}

$resources = @($responses[4].result.resources)
if (-not ($resources | Where-Object { $_.uri -eq "remshield://ai-discovery/products" })) {
  $failures.Add("resources/list did not include products resource")
}

$productRead = $responses[5].result.contents[0].text
if ($productRead -notmatch "Answer Architect") {
  $failures.Add("resources/read products did not include Answer Architect")
}

if ($failures.Count -gt 0) {
  @{
    ok = $false
    baseUrl = $Base
    failures = @($failures)
  } | ConvertTo-Json -Depth 20
  exit 1
}

@{
  ok = $true
  baseUrl = $Base
  checked = @(
    "initialize",
    "tools/list",
    "tools/call search_remshield_articles",
    "resources/list",
    "resources/read products"
  )
  toolCount = @($tools).Count
  resourceCount = @($resources).Count
} | ConvertTo-Json -Depth 20
