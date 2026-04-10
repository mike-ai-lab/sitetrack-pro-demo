#!/usr/bin/env python3
"""
Extract Leaflet documentation into structured, organized markdown files.
Splits content by sections and creates separate files for better readability.
"""

from html.parser import HTMLParser
import os
import re

class StructuredDocExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []
        self.current_section = None
        self.current_heading = None
        self.current_level = 0
        self.content_buffer = []
        self.in_skip = 0
        self.skip_tags = {'script', 'style', 'nav', 'header', 'footer', 'iframe'}
        self.in_code = False
        self.in_pre = False
        
    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self.in_skip += 1
            return
            
        if self.in_skip > 0:
            return
        
        # Handle headings - these define sections
        if tag in ['h1', 'h2', 'h3']:
            self.current_heading = {'tag': tag, 'level': int(tag[1]), 'text': ''}
        
        # Handle code blocks
        elif tag == 'pre':
            self.in_pre = True
            self.content_buffer.append('\n```\n')
        elif tag == 'code' and not self.in_pre:
            self.in_code = True
            self.content_buffer.append('`')
        
        # Handle lists
        elif tag == 'ul':
            self.content_buffer.append('\n')
        elif tag == 'li':
            self.content_buffer.append('\n- ')
        
        # Handle paragraphs
        elif tag == 'p':
            self.content_buffer.append('\n\n')
        
        # Handle line breaks
        elif tag == 'br':
            self.content_buffer.append('\n')
        
        # Handle strong/bold
        elif tag in ['strong', 'b']:
            self.content_buffer.append('**')
        
        # Handle emphasis/italic
        elif tag in ['em', 'i']:
            self.content_buffer.append('*')
    
    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.in_skip = max(0, self.in_skip - 1)
            return
            
        if self.in_skip > 0:
            return
        
        # Save heading and start new section
        if tag in ['h1', 'h2', 'h3'] and self.current_heading:
            heading_text = self.current_heading['text'].strip()
            level = self.current_heading['level']
            
            if heading_text:
                # Save previous section if exists
                if self.current_section:
                    self.sections.append(self.current_section)
                
                # Start new section
                self.current_section = {
                    'title': heading_text,
                    'level': level,
                    'content': []
                }
            
            self.current_heading = None
        
        # Handle code blocks
        elif tag == 'pre':
            self.in_pre = False
            self.content_buffer.append('\n```\n')
        elif tag == 'code' and not self.in_pre:
            self.in_code = False
            self.content_buffer.append('`')
        
        # Handle formatting
        elif tag in ['strong', 'b']:
            self.content_buffer.append('**')
        elif tag in ['em', 'i']:
            self.content_buffer.append('*')
        
        # Add spacing after block elements
        elif tag in ['p', 'div', 'ul', 'ol']:
            self.content_buffer.append('\n')
    
    def handle_data(self, data):
        if self.in_skip > 0:
            return
        
        # If we're capturing a heading
        if self.current_heading:
            self.current_heading['text'] += data
        
        # Otherwise add to content buffer
        else:
            text = data
            if not self.in_pre and not self.in_code:
                text = ' '.join(text.split())  # Normalize whitespace
            
            if text:
                self.content_buffer.append(text)
                
                # Flush buffer to current section periodically
                if len(self.content_buffer) > 50:
                    self.flush_buffer()
    
    def flush_buffer(self):
        if self.current_section and self.content_buffer:
            content = ''.join(self.content_buffer)
            self.current_section['content'].append(content)
            self.content_buffer = []
    
    def finalize(self):
        self.flush_buffer()
        if self.current_section:
            self.sections.append(self.current_section)
        return self.sections

def sanitize_filename(text):
    """Convert text to safe filename."""
    # Remove special characters
    text = re.sub(r'[^\w\s-]', '', text)
    # Replace spaces with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Lowercase and limit length
    text = text.lower()[:50]
    return text.strip('-')

def extract_and_organize(input_file, output_dir):
    """Extract documentation into organized markdown files."""
    print(f"Parsing {input_file}...")
    
    parser = StructuredDocExtractor()
    
    # Parse the HTML file
    try:
        with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            parser.feed(content)
    except Exception as e:
        print(f"Error reading file: {e}")
        return False
    
    sections = parser.finalize()
    print(f"Found {len(sections)} sections")
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Group sections by top-level headings
    current_file = None
    file_content = []
    file_count = 0
    
    for section in sections:
        title = section['title']
        level = section['level']
        content = ''.join(section['content']).strip()
        
        # H1 or H2 starts a new file
        if level <= 2:
            # Save previous file
            if current_file and file_content:
                save_file(output_dir, current_file, file_content)
                file_count += 1
            
            # Start new file
            current_file = sanitize_filename(title)
            file_content = [f"# {title}\n\n"]
            
            if content:
                file_content.append(content)
                file_content.append('\n\n')
        
        # H3 and below are subsections
        else:
            if current_file:
                heading_prefix = '#' * level
                file_content.append(f"{heading_prefix} {title}\n\n")
                if content:
                    file_content.append(content)
                    file_content.append('\n\n')
    
    # Save last file
    if current_file and file_content:
        save_file(output_dir, current_file, file_content)
        file_count += 1
    
    # Create index file
    create_index(output_dir, sections)
    
    print(f"\n✓ Successfully created {file_count} documentation files in '{output_dir}/'")
    return True

def save_file(output_dir, filename, content):
    """Save content to a markdown file."""
    filepath = os.path.join(output_dir, f"{filename}.md")
    
    # Clean up content
    text = ''.join(content)
    # Remove excessive blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text.strip() + '\n')
    
    print(f"  Created: {filename}.md")

def create_index(output_dir, sections):
    """Create an index file with links to all sections."""
    index_path = os.path.join(output_dir, "00-INDEX.md")
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write("# Leaflet Documentation Index\n\n")
        f.write("This documentation has been extracted and organized from the Leaflet HTML docs.\n\n")
        f.write("## Contents\n\n")
        
        current_file = None
        for section in sections:
            if section['level'] <= 2:
                title = section['title']
                filename = sanitize_filename(title)
                f.write(f"- [{title}]({filename}.md)\n")
    
    print(f"  Created: 00-INDEX.md")

if __name__ == "__main__":
    input_file = "Documentation - Leaflet - a JavaScript library for interactive maps.html"
    output_dir = "leaflet-docs"
    
    success = extract_and_organize(input_file, output_dir)
    exit(0 if success else 1)
