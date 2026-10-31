



import os 
from flask import Flask, request, jsonify 
from azure.data.tables import TableClient 
from datetime import datetime 

app = Flask(__name__)
# Retrieve your connection string from environment variables or paste it directly

CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING") 
TABLE_NAME = os.getenv("AZURE_STORAGE_TABLE_NAME", "ordertable")

if not CONNECTION_STRING:
    raise ValueError("Error: AZURE_STORAGE_CONNECTION_STRING environment variable is notset.") 

@app.route('/api/orders', methods=['POST']) 
def create_order():
    try: 
        data = request.json
        # Initialize Table Client
        table_client = TableClient.from_connection_string(conn_str=CONNECTION_STRING,table_name=TABLE_NAME)
        # Define Entity data for Azure Table Storage PartitionKey groups your entities; 
        # RowKey uniquely identifies each order (using a timestamp here)
        entity = { 
            "PartitionKey": "CloudKitchenOrders", 
            "RowKey": datetime.utcnow().strftime('%Y%m%d%H%M%S%f'), 
            "CustomerName": data.get("customerName", "Guest"), 
            "OrderDetails": data.get("orderDetails",""), 
            "TotalAmount": data.get("totalAmount", "$0"), 
            "OrderTime": datetime.utcnow().isoformat()
        }
        # Insert the entity into Azure Table Storage
        table_client.create_entity(entity=entity) 


        return jsonify({"status": "success", "message": "Order saved successfully!"}), 201
    except Exception as e: 
        return jsonify({"status": "error", "message": str(e)}), 500 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
