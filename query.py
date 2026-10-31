import os 
from azure.data.tables import TableServiceClient 
connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
table_name = os.getenv("AZURE_STORAGE_TABLE_NAME", "ordertable")


if not connection_string:
    raise ValueError("Error: AZURE_STORAGE_CONNECTION-STRING environment variable is not set.") 

print(f"Connecting to table '{table_name}'...") 
try:
    table_service_client = TableServiceClient.from_connection_string(connection_string) 
    table_client = table_service_client.get_table_client(table_name=table_name) 
    print("Fetching entities...") 
    entities = list(table_client.list_entities()) 
    if len(entities) == 0:
        print("Connection successful, but the table is currently empty.") 
    else: 
        print(f"Successfully retrieved {len(entities)} record(s):") 
        for entity in entities:
            print(entity) 
except Exception as e:
    print(f"An error occurred: {e}")
