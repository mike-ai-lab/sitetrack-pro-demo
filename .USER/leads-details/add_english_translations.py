import json

# Read the JSON file
with open('all_leads.json', 'r', encoding='utf-8') as f:
    leads = json.load(f)

# Translation mappings
name_translations = {
    "ابو سعد": "Abu Saad",
    "ابو شهد": "Abu Shahd",
    "أبو فاطمة": "Abu Fatima",
    "ابو محمد": "Abu Mohammed",
    "احمد مطيري": "Ahmed Al-Mutairi",
    "ابو فيصل": "Abu Faisal",
    "ابو وليد": "Abu Waleed",
    "صديق المالك": "Owner's Friend",
    "ابو راكان": "Abu Rakan",
    "سعود": "Saud",
    "استاذ محمد المطيري": "Mr. Mohammed Al-Mutairi",
    "ابو سعد": "Abu Saad",
    "ابو عزيز": "Abu Aziz",
    "مشرف البناء": "Construction Supervisor",
    "سعيد": "Saeed",
    "ابو حسين": "Abu Hussein",
    "ابو عبدالله": "Abu Abdullah",
    "ابو ناصر": "Abu Nasser",
    "ابو خالد": "Abu Khaled",
    "ابو عبدالعزيز": "Abu Abdulaziz",
    "ابو تركي": "Abu Turki",
    "ابو سلطان": "Abu Sultan",
    "ابو ماجد": "Abu Majed",
    "ابو يزيد": "Abu Yazeed"
}

# Common note translations
note_translations = {
    "سعودى": "Saudi",
    "مهندس مصري مسؤل كذا مشروع": "Egyptian engineer responsible for several projects",
    "مسؤول مشروع فيلا لبن": "Project manager for Laban villa",
    "مهندس مصري": "Egyptian engineer",
    "مالك سعودي": "Saudi owner",
    "مالك السعودي": "Saudi owner",
    "صديق المالك سعودي لديه مشروع فيلا مرحلة الحفر": "Owner's friend, Saudi, has villa project in excavation phase",
    "يتردد على الموقع": "Frequently visits the site",
    "فيلا سكنية": "Residential villa",
    "عمارة سكنية": "Residential building",
    "هام جداً": "Very important",
    "هام": "Important",
    "مرحلة الحفر": "Excavation phase",
    "فيلا لبن": "Laban villa",
    "مشروع فيلا": "Villa project"
}

# Add English translations
for lead in leads:
    # Translate contact name
    if lead.get('contact_name'):
        arabic_name = lead['contact_name']
        lead['contact_name_en'] = name_translations.get(arabic_name, arabic_name)
    
    # Translate notes
    if lead.get('notes'):
        translated_notes = []
        for note in lead['notes']:
            # Try exact match first
            if note in note_translations:
                translated_notes.append(note_translations[note])
            # Check if it contains known phrases
            elif any(arabic in note for arabic in note_translations):
                # Find and translate known parts
                translated = note
                for arabic, english in note_translations.items():
                    if arabic in note:
                        translated = english
                        break
                translated_notes.append(translated)
            else:
                # Keep as is if no translation found
                translated_notes.append(note)
        
        lead['notes_en'] = translated_notes

# Save updated JSON
with open('all_leads.json', 'w', encoding='utf-8') as f:
    json.dump(leads, f, ensure_ascii=False, indent=2)

print(f"✅ Added English translations to {len(leads)} leads")
