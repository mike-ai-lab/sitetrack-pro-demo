import json
import re

# Read the chat file
with open('_chat.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by date markers and process
lines = content.split('\n')

part1_leads = []  # April 8-11
part2_leads = []  # April 12-14
part3_leads = []  # April 15-18

current_lead = {}
current_date = None

for i, line in enumerate(lines):
    # Extract date
    date_match = re.match(r'\[(\d{2}/\d{2}/\d{4})', line)
    if date_match:
        date_str = date_match.group(1)
        day = int(date_str.split('/')[0])
        month = int(date_str.split('/')[1])
        current_date = f"2026-{month:02d}-{day:02d}"
    
    # Extract location
    if 'Location:' in line and 'maps.google.com' in line:
        match = re.search(r'q=([\d.]+),([\d.]+)', line)
        if match and current_lead:
            lat, lng = float(match.group(1)), float(match.group(2))
            current_lead['location'] = {
                'lat': lat,
                'lng': lng,
                'map_link': f"https://maps.google.com/?q={lat},{lng}"
            }
    
    # Extract phone numbers
    phone_match = re.search(r'(05\d{8}|0\d{9}|\+966\s*\d+)', line)
    if phone_match and not line.startswith('['):
        phone = phone_match.group(1).strip()
        if current_lead and 'phone' not in current_lead:
            current_lead['phone'] = phone

print("Script ready - manual conversion needed")
