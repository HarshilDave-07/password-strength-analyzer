from flask import Flask, request, jsonify
import sqlite3
import hashlib

app = Flask(__name__)

# Create DB if not exists
def init_db():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/save', methods=['POST'])
def save_password():
    data = request.get_json()
    password = data['password']
    hashed = hash_password(password)

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()

    # Check reuse
    cur.execute("SELECT * FROM passwords WHERE hash=?", (hashed,))
    if cur.fetchone():
        return jsonify({"message": "⚠️ Password already used!"})

    cur.execute("INSERT INTO passwords (hash) VALUES (?)", (hashed,))
    conn.commit()
    conn.close()

    return jsonify({"message": "✅ Password saved securely!"})

if __name__ == '__main__':
    app.run(debug=True)