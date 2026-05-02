import re

# Read a few lines
with open('_chat.txt', 'r', encoding='utf-8') as f:
    content = f.read()[:2000]

print("First 2000 chars:")
print(repr(content[:500]))
print("\n\n")

# Try different patterns
pattern1 = r'\[(\d{2}/\d{2}/\d{4}), (\d{1,2}:\d{2}:\d{2} [AP]M)\].*?Location.*?q=([\d.]+),([\d.]+)'
matches1 = re.findall(pattern1, content, re.DOTALL)
print(f"Pattern 1 matches: {len(matches1)}")
if matches1:
    print(matches1[0])
