import pandas as pd
import json
from datetime import datetime

# Function to capitalize each word
def capitalize_name(name):
    if pd.isna(name):
        return ''
    return ' '.join([word.capitalize() for word in str(name).split()])

# Load the CSV file
csv_path = 'C:/Users/danie/healthcare-management-system/backend/Healthcare_Investments_and_Hospital_Stay.csv'
df = pd.read_csv(csv_path)

# Print column names to understand the structure
print("Column names in the CSV file:", df.columns.tolist())

# Clean the data using actual column names
df['Location'] = df['Location'].apply(capitalize_name)
df['Time'] = df['Time']
df['Hospital_Stay'] = df['Hospital_Stay']
df['MRI_Units'] = df['MRI_Units']
df['CT_Scanners'] = df['CT_Scanners']
df['Hospital_Beds'] = df['Hospital_Beds']

# Save the cleaned data to a new JSON file
output_path = 'C:/Users/danie/healthcare-management-system/backend/cleaned_new_data.json'
df.to_json(output_path, orient='records', date_format='iso')

print('Data cleaning complete. Cleaned data saved to cleaned_new_data.json')
