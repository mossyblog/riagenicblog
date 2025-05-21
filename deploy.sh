#!/bin/bash
# Script to prepare and deploy the site to GitHub Pages

# Set environment variables for build
export NEXT_PUBLIC_SUPABASE_URL="dummy-value-for-build"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="dummy-value-for-build"
export SITE_URL="https://mossyblog.github.io/riagenicblog"
export NODE_ENV="production"

# Clean previous build
rm -rf out
rm -rf .next

# Temporarily move problematic API route files and dynamic admin pages
mkdir -p tmp_excluded
# Move API routes
find src/app/api -name "route.ts" -o -name "route.tsx" | while read file; do
  mkdir -p "tmp_excluded/$(dirname $file)"
  mv "$file" "tmp_excluded/$file"
done

# Move dynamic admin pages
find src/app/admin -type d -name "[*]" | while read dir; do
  mkdir -p "tmp_excluded/$dir"
  mv "$dir"/* "tmp_excluded/$dir/" 2>/dev/null || true
done

# Run build with static export
npx next build --no-lint

# Move back excluded files
find tmp_excluded -type f | while read file; do
  actual_file=$(echo $file | sed 's|tmp_excluded/||')
  mkdir -p "$(dirname $actual_file)"
  mv "$file" "$actual_file"
done
rm -rf tmp_excluded

# Success message
echo "Build completed! The static site has been generated in the 'out' directory."
echo "You can now deploy this to GitHub Pages using GitHub Actions or another deployment method."