#!/usr/bin/env python3
"""
Extract Leaflet documentation with proper table formatting.
Converts HTML tables to markdown tables for readability.
"""

from html.parser import HTMLParser
import os
import re

class TableAwareDocExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []
        self.current_section = None
        self.current_heading = None
        self.content_buffer = []
        self.in_skip = 0
        self.skip_tags = {'script', 'style', 'nav', 'header', 'footer', 'iframe'}
        self.in_code = False
        self.in_pre = False
        
        # Table handling
        self.in_table = False
        self.table_data = []
        self.current_row = []
        self.current_cell = []
        self.in_th = False
        self.in_td = False
        
    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self.in_skip += 1
            return
            
        if self.in_skip > 0:
            return
        
        # Handle tables
        if tag == 'table':
            self.in_table = True
            self.table_data = []
            return
        elif tag == 'tr' and self.in_table:
            self.current_row = []
            return
        elif tag == 'th' and self.in_table:
            self.in_th = True
            self.current_cell = []
            return
        elif tag == 'td' and self.in_table:
            self.in_td = True
            self.current_cell = []
            return
        
        # Handle headings
        if tag in ['h1', 'h2', 'h3']:
            self.current_heading = {'tag': tag, 'level': int(tag[1]), 'text': ''}
        
        # Handle code blocks
        elif tag == 'pre':
            self.in_pre = True
            self.content_buffer.append('\n```\n')
        elif tag == 'code':
            if self.in_td or self.in_th:
                self.current_cell.append('`')
            elif not self.in_pre:
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
            if self.in_td or self.in_th:
                self.current_cell.append('<br>')
            else:
                self.content_buffer.append('\n')
        
        # Handle strong/bold
        elif tag in ['strong', 'b']:
            if self.in_td or self.in_th:
                self.current_cell.append('**')
            else:
                self.content_buffer.append('**')
        
        # Handle emphasis/italic
        elif tag in ['em', 'i']:
            if self.in_td or self.in_th:
                self.current_cell.append('*')
            else:
                self.content_buffer.append('*')
    
    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.in_skip = max(0, self.in_skip - 1)
            return
            
        if self.in_skip > 0:
            return
        
        # Handle table end
        if tag == 'table' and self.in_table:
            self.in_table = False
            markdown_table = self.format_table(self.table_data)
            self.content_buffer.append('\n\n' + markdown_table + '\n\n')
            self.table_data = []
            return
        elif tag == 'tr' and self.in_table:
            if self.current_row:
                self.table_data.append(self.current_row)
            self.current_row = []
            return
        elif tag == 'th' and self.in_table:
            self.in_th = False
            cell_text = ''.join(self.current_cell).strip()
            self.current_row.append(('th', cell_text))
            self.current_cell = []
            return
        elif tag == 'td' and self.in_table:
            self.in_td = False
            cell_text = ''.join(self.current_cell).strip()
            self.current_row.append(('td', cell_text))
            self.current_cell = []
            return
        
        # Save heading and start new section
        if tag in ['h1', 'h2', 'h3'] and self.current_heading:
            heading_text = self.current_heading['text'].strip()
            level = self.current_heading['level']
            
            if heading_text:
                if self.current_section:
                    self.sections.append(self.current_section)
                
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
        elif tag == 'code':
            if self.in_td or self.in_th:
                self.current_cell.append('`')
            elif not self.in_pre:
                self.in_code = False
                self.content_buffer.append('`')
        
        # Handle formatting
        elif tag in ['strong', 'b']:
            if self.in_td or self.in_th:
                self.current_cell.append('**')
            else:
                self.content_buffer.append('**')
        elif tag in ['em', 'i']:
            if self.in_td or self.in_th:
                self.current_cell.append('*')
            else:
                self.content_buffer.append('*')
        
        # Add spacing after block elements
        elif tag in ['p', 'div', 'ul', 'ol']:
            self.content_buffer.append('\n')
    
    def handle_data(self, data):
        if self.in_skip > 0:
            return
        
        # Handle table cell data
        if self.in_th or self.in_td:
            text = ' '.join(data.split())
            if text:
                self.current_cell.append(text)
            return
        
        # If we're capturing a heading
        if self.current_heading:
            self.current_heading['text'] += data
        
        # Otherwise add to content buffer
        else:
            text = data
            if not self.in_pre and not self.in_code:
                text = ' '.join(text.split())
            
            if text:
                self.content_buffer.append(text)
                
                if len(self.content_buffer) > 50:
                    self.flush_buffer()
    
    def format_table(self, table_data):
        """Convert table data to markdown table format."""
        if not table_data:
            return ""
        
        # Find max columns
        max_cols = max(len(row) for row in table_data) if table_data else 0
        if max_cols == 0:
            return ""
        
        # Normalize all rows to have same number of columns
        normalized_rows = []
        for row in table_data:
            normalized_row = [cell[1] if i < len(row) else '' for i, cell in enumerate(row)]
            # Pad if needed
            while len(normalized_row) < max_cols:
                normalized_row.append('')
            normalized_rows.append(normalized_row[:max_cols])
        
        if not normalized_rows:
            return ""
        
        # Calculate column widths
        col_widths = [0] * max_cols
        for row in normalized_rows:
            for i, cell in enumerate(row):
                col_widths[i] = max(col_widths[i], len(cell))
        
        # Ensure minimum width
        col_widths = [max(w, 3) for w in col_widths]
        
        # Build markdown table
        lines = []
        
        # Header row (first row)
        header = normalized_rows[0]
        header_line = '| ' + ' | '.join(cell.ljust(col_widths[i]) for i, cell in enumerate(header)) + ' |'
        lines.append(header_line)
        
        # Separator
        separator = '| ' + ' | '.join('-' * col_widths[i] for i in range(max_cols)) + ' |'
        lines.append(separator)
        
        # Data rows
        for row in normalized_rows[1:]:
            row_line = '| ' + ' | '.join(cell.ljust(col_widths[i]) for i, cell in enumerate(row)) + ' |'
            lines.append(row_line)
        
        return '\n'.join(lines)
    
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
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = text.lower()[:50]
    return text.strip('-')

def extract_and_organize(input_file, output_dir):
    """Extract documentation into organized markdown files."""
    print(f"Parsing {input_file}...")
    
    parser = TableAwareDocExtractor()
    
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
    if os.path.exists(output_dir):
        import shutil
        shutil.rmtree(output_dir)
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
    
    text = ''.join(content)
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text.strip() + '\n')
    
    print(f"  Created: {filename}.md")

def create_index(output_dir, sections):
    """Create an index file with links to all sections."""
    index_path = os.path.join(output_dir, "00-INDEX.md")
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write("# Leaflet Documentation Index\n\n")
        f.write("Extracted and organized from Leaflet HTML documentation.\n\n")
        f.write("## Contents\n\n")
        
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
