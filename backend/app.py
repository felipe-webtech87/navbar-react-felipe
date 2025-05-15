from flask import Flask, request, jsonify
from forms import ContactForm
import os
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

csrf = CSRFProtect(app)

CORS(app, origins=[
    'http://localhost:5173'
])

@csrf.exempt
@app.route('/api/contact', methods=['POST'])
def contact():
    form = ContactForm(data=request.json, meta={'csrf': False})

    if form.validate():
        return jsonify({'sucess': True, 'message': 'Form sent successfully'}), 200
    else:
        print("----------------------------", form.errors)
        return jsonify({'success': False, 'errors': form.errors}), 400



if __name__ == '__main__':
    app.run(debug=True)