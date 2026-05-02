import json

# Read the JSON
with open('all_leads.json', 'r', encoding='utf-8') as f:
    leads = json.load(f)

# Comprehensive translation dictionary
translations = {
    # Names
    "ابو سعد سعودى": "Abu Saad Saudi",
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
    "ابو يزيد": "Abu Yazeed",
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
    "ابو بندر": "Abu Bandar",
    "ابو فهد": "Abu Fahad",
    "ابو مشعل": "Abu Mishaal",
    "ابو ريان": "Abu Rayan",
    "ابو عمر": "Abu Omar",
    
    # Notes and descriptions
    "سعودى": "Saudi",
    "مهندس مصري مسؤل كذا مشروع": "Egyptian engineer responsible for several projects",
    "مسؤول مشروع فيلا لبن": "Project manager for Laban villa",
    "مهندس مصري": "Egyptian engineer",
    "مالك سعودي ابو محمد": "Saudi owner Abu Mohammed",
    "مالك سعودي احمد مطيري": "Saudi owner Ahmed Al-Mutairi",
    "مالك السعودي ابو فيصل": "Saudi owner Abu Faisal",
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
    "مشروع فيلا": "Villa project",
    "فيلا مرحلة الحفر": "Villa in excavation phase",
    "SATURDAY 11": "Saturday 11",
    "For tomorrow nshallah": "For tomorrow inshallah",
    "ابو وليد مالك سعودي": "Abu Waleed Saudi owner",
    "ابو راكان مالك سعودي يتردد على الموقع": "Abu Rakan Saudi owner frequently visits site",
    "مالك استاذ محمد المطيري (ابو يزيد)": "Owner Mr. Mohammed Al-Mutairi (Abu Yazeed)",
    "عمارة سكنية": "Residential building",
    "ابو سعد مالك سعود": "Abu Saad Saudi owner",
    "ابو عزيز مالك السعودي": "Abu Aziz Saudi owner",
    "مشرف البناء": "Construction supervisor",
    "سعيد": "Saeed",
    "ابو حسين مالك سعودي": "Abu Hussein Saudi owner",
    "ابو عبدالله مالك سعودي": "Abu Abdullah Saudi owner",
    "ابو ناصر مالك سعودي": "Abu Nasser Saudi owner",
    "ابو خالد مالك سعودي": "Abu Khaled Saudi owner",
    "ابو عبدالعزيز مالك سعودي": "Abu Abdulaziz Saudi owner",
    "ابو تركي مالك سعودي": "Abu Turki Saudi owner",
    "ابو سلطان مالك سعودي": "Abu Sultan Saudi owner",
    "ابو ماجد مالك سعودي": "Abu Majed Saudi owner",
}

# Translate each lead
for lead in leads:
    # Translate lead_name
    if lead.get('lead_name'):
        lead['lead_name'] = translations.get(lead['lead_name'], lead['lead_name'])
    
    # Translate contact_name
    if lead.get('contact_name'):
        lead['contact_name'] = translations.get(lead['contact_name'], lead['contact_name'])
        lead['contact_name_en'] = lead['contact_name']  # Store as English version
    
    # Translate property_type
    if lead.get('property_type'):
        lead['property_type'] = translations.get(lead['property_type'], lead['property_type'])
    
    # Translate notes
    if lead.get('notes'):
        translated_notes = []
        for note in lead['notes']:
            translated_notes.append(translations.get(note, note))
        lead['notes'] = translated_notes
        lead['notes_en'] = translated_notes

# Save
with open('all_leads.json', 'w', encoding='utf-8') as f:
    json.dump(leads, f, ensure_ascii=False, indent=2)

print(f"✅ Translated all {len(leads)} leads to English")
