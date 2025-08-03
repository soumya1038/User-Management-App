from flask import Flask, request, jsonify
import sqlite3
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('users.db', check_same_thread=False)
cursor = conn.cursor()

@app.route('/')
def home():
    return "User Management System"

@app.route('/users', methods=['GET'])
def get_all_users():
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    user_list = [
        {"id": user[0], "name": user[1], "email": user[2], "password": user[3]}
        for user in users
    ]
    return jsonify(user_list)

@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    if user:
        user_dict = {"id": user[0], "name": user[1], "email": user[2], "password": user[3]}
        return jsonify(user_dict)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
    conn.commit()
    return jsonify({"message": "User created successfully!"}), 201

@app.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    if name and email:
        cursor.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", (name, email, user_id))
        conn.commit()
        return jsonify({"message": "User updated"})
    else:
        return jsonify({"error": "Invalid data"}), 400

@app.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    return jsonify({"message": f"User {user_id} deleted"})

@app.route('/search', methods=['GET'])
def search_users():
    name = request.args.get('name')
    if not name:
        return jsonify({"error": "Please provide a name to search"}), 400
    cursor.execute("SELECT * FROM users WHERE name LIKE ?", ('%' + name + '%',))
    users = cursor.fetchall()
    user_list = [
        {"id": user[0], "name": user[1], "email": user[2], "password": user[3]}
        for user in users
    ]
    return jsonify(user_list)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"status": "success", "user_id": user[0]})
    else:
        return jsonify({"status": "failed"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)
