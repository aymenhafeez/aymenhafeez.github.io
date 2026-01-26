#!/bin/bash

# Migration script for Jekyll posts to Astro content collections
# This script converts Jekyll blog posts to Astro-compatible markdown

# Remove demo posts first
echo "Removing demo posts..."
rm -rf src/content/post/*.md
rm -rf src/content/note/*.md

# Create post directory if it doesn't exist
mkdir -p src/content/post

# Counter for migrated posts
count=0

# Process each Jekyll post
for jekyll_post in _posts/*.md; do
    [ -f "$jekyll_post" ] || continue
    
    # Extract filename without path
    filename=$(basename "$jekyll_post")
    
    # Skip package-lock.json if it exists
    if [[ "$filename" == "package-lock.json" ]]; then
        continue
    fi
    
    # Extract date from filename (YYYY-MM-DD format)
    if [[ $filename =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})- ]]; then
        year="${BASH_REMATCH[1]}"
        month="${BASH_REMATCH[2]}"
        day="${BASH_REMATCH[3]}"
        
        # Convert to "DD Month YYYY" format
        # Remove leading zero from day
        day_num=$((10#$day))
        
        # Convert month number to month name
        case $((10#$month)) in
            1) month_name="January" ;;
            2) month_name="February" ;;
            3) month_name="March" ;;
            4) month_name="April" ;;
            5) month_name="May" ;;
            6) month_name="June" ;;
            7) month_name="July" ;;
            8) month_name="August" ;;
            9) month_name="September" ;;
            10) month_name="October" ;;
            11) month_name="November" ;;
            12) month_name="December" ;;
        esac
        
        publishDate="$day_num $month_name $year"
    else
        # Default date if filename doesn't match pattern
        publishDate="1 January 2020"
    fi
    
    # Read the Jekyll post
    content=$(cat "$jekyll_post")
    
    # Extract title from frontmatter
    title=$(echo "$content" | awk '/^title:/ {$1=""; print substr($0,2); exit}')
    
    # If title is empty, use filename
    if [ -z "$title" ]; then
        title="${filename%.md}"
    fi
    
    # Extract description (first paragraph after frontmatter and ---)
    description=$(echo "$content" | awk '
        /^---$/ { if (++count == 2) { getline; getline; if (NF > 0) print; exit } }
    ')
    
    # If description is empty, use title
    if [ -z "$description" ]; then
        description="$title"
    fi
    
    # Create new Astro frontmatter
    new_frontmatter="---
title: \"$title\"
publishDate: \"$publishDate\"
description: \"$description\"
tags: []
---"
    
    # Extract content after Jekyll frontmatter
    post_content=$(echo "$content" | awk '
        BEGIN { count=0; printing=0 }
        /^---$/ { count++; if (count == 2) { printing=1; next } }
        printing { print }
    ')
    
    # Write new Astro post
    output_file="src/content/post/$filename"
    echo "$new_frontmatter" > "$output_file"
    echo "" >> "$output_file"
    echo "$post_content" >> "$output_file"
    
    echo "Migrated: $filename -> $output_file"
    ((count++))
done

echo ""
echo "Migration complete! Migrated $count posts."
echo "Posts are now in src/content/post/"
