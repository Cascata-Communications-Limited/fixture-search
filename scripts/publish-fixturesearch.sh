#!/bin/bash

# 💡 Set this in your environment, not here:
# export NPM_TOKEN="your-token-here"

echo "🔐 Verifying NPM token..."
if [ -z "$NPM_TOKEN" ]; then
  echo "❌ NPM_TOKEN is not set. Exiting."
  exit 1
fi

echo "📦 Packing module..."
npm pack

echo "🧪 Local install test..."
npm install ./$(npm pack --json | jq -r '.[0].filename') --no-save

echo "🚀 Publishing to NPM..."
npm publish --access public

echo "✅ Publish complete. Don’t forget to push tags if needed:"
echo "    git tag v1.0.0 && git push origin --tags"