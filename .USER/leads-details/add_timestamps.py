import json
import re
from datetime import datetime

# Read the chat file
with open('_chat.txt', 'r', encoding='utf-8') as f:
    chat_content = f.read()

# Read existing JSON
with open('all_leads.json', 'r', encoding='utf-8') as f:
    leads = json.load(f)

# Parse chat to extract timestamps for each location
location_timestamps = {}

# Find all location entries with timestamps
# Pattern: [date, time] ... Location: https://maps.google.com/?q=lat,lng
# Note: \s* handles the special Unicode space character before PM/AM
pattern = r'\[(\d{2}/\d{2}/\d{4}), (\d{1,2}:\d{2}:\d{2})\s*([AP]M)\].*?Location.*?q=([\d.]+),([\d.]+)'

matches = re.findall(pattern, chat_content, re.DOTALL)

print(f"📍 Found {len(matches)} location entries in chat")

for match in matches:
    date_str, time_str, am_pm, lat, lng = match
    # Convert to ISO format
    dt = datetime.strptime(f"{date_str} {time_str} {am_pm}", "%d/%m/%Y %I:%M:%S %p")
    timestamp = dt.isoformat()
    
    # Store timestamp for this location
    location_key = f"{float(lat):.6f},{float(lng):.6f}"
    if location_key not in location_timestamps:
        location_timestamps[location_key] = timestamp

print(f"📍 Extracted {len(location_timestamps)} unique locations with timestamps")

# Add timestamps to leads
updated_count = 0
for lead in leads:
    if lead.get('location') and lead['location'].get('lat') and lead['location'].get('lng'):
        lat = lead['location']['lat']
        lng = lead['location']['lng']
        location_key = f"{lat:.6f},{lng:.6f}"
        
        if location_key in location_timestamps:
            lead['timestamp'] = location_timestamps[location_key]
            lead['date'] = location_timestamps[location_key].split('T')[0]  # Just the date part
            lead['time'] = location_timestamps[location_key].split('T')[1]  # Just the time part
            updated_count += 1
        else:
            lead['timestamp'] = None
            lead['date'] = None
            lead['time'] = None
    else:
        lead['timestamp'] = None
        lead['date'] = None
        lead['time'] = None

# Save updated JSON
with open('all_leads.json', 'w', encoding='utf-8') as f:
    json.dump(leads, f, ensure_ascii=False, indent=2)

print(f"✅ Added timestamps to {updated_count} leads")
print(f"⚠️ {len([l for l in leads if not l.get('timestamp') and l.get('location')])} leads with location but no timestamp")
