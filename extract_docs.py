#!/usr/bin/env python3
"""
Extract text content from Leaflet HTML documentation and save to markdown.
Processes the file in chunks to avoid memory issues with large files.
"""

from html.parser import HTMLParser
import sys

class LeafletDocExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.current_text = []
        self.skip_tags = {'script', 'style', 'nav', 'header', 'footer'}
        self.current_tag = None
        self.in_skip_section = 0
        
    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self.in_skip_section += 1
        self.current_tag = tag
        
        # Add markdown formatting for headers
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] and self.in_skip_section == 0:
            level = int(tag[1])
            self.current_text.append('\n' + '#' * level + ' ')
    
    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.in_skip_section = max(0, self.in_skip_section - 1)
        
        # Add line breaks for block elements
        if tag in ['p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code'] and self.in_skip_section == 0:
            self.current_text.append('\n')
    
    def handle_data(self, data):
        if self.in_skip_section == 0:
            text = data.strip()
            if text:
                self.current_text.append(text + ' ')
    
    def get_text(self):
        # Join and clean up the text
        text = ''.join(self.current_text)
        # Remove multiple spaces
        text = ' '.join(text.split())
        # Fix spacing around newlines
        lines = [line.strip() for line in text.split('\n')]
        # Remove empty lines and join
        lines = [line for line in lines if line]
        return '\n\n'.join(lines)

def extract_documentation(input_file, output_file):
    """Extract text from HTML and save to markdown file."""
    print(f"Extracting documentation from {input_file}...")
    
    parser = LeafletDocExtractor()
    
    # Read and parse the file in chunks
    try:
        with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
            chunk_size = 8192
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                parser.feed(chunk)
    except Exception as e:
        print(f"Error reading file: {e}")
        return False
    
    # Get extracted text
    extracted_text = parser.get_text()
    
    # Write to output file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Leaflet Documentation\n\n")
            f.write("Extracted from HTML documentation\n\n")
            f.write("---\n\n")
            f.write(extracted_text)
        
        print(f"✓ Successfully extracted documentation to {output_file}")
        print(f"  Output size: {len(extracted_text)} characters")
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        return False

if __name__ == "__main__":
    input_file = "Documentation - Leaflet - a JavaScript library for interactive maps.html"
    output_file = "leaflet-docs.md"
    
    success = extract_documentation(input_file, output_file)
    sys.exit(0 if success else 1)
