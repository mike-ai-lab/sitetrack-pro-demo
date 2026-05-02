import json

# Read all three parts
with open('part1_data.json', 'r', encoding='utf-8') as f:
    part1 = json.load(f)

with open('part2_data.json', 'r', encoding='utf-8') as f:
    part2 = json.load(f)

with open('part3_data.json', 'r', encoding='utf-8') as f:
    part3 = json.load(f)

# Merge all parts
all_leads = part1 + part2 + part3

# Write merged file
with open('all_leads.json', 'w', encoding='utf-8') as f:
    json.dump(all_leads, f, ensure_ascii=False, indent=2)

print(f"✓ Created all_leads.json")
print(f"  Total leads: {len(all_leads)}")
print(f"  - Part 1: {len(part1)} leads")
print(f"  - Part 2: {len(part2)} leads")
print(f"  - Part 3: {len(part3)} leads")
print(f"  Total images: {sum(len(lead['images']) for lead in all_leads)}")
