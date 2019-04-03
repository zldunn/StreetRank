from flask import Flask, request
import requests
from firebase import firebase
from requests.utils import quote
from flask_cors import CORS
from config import config;
import json

app = Flask(__name__)
CORS(app)
headers = {
    "Authorization": config["YELP_KEY"],
    "Content-Type": "application/graphql"
}
uri = 'https://api.yelp.com/v3/graphql'

firebase = firebase.FirebaseApplication('https://streetrank-12e2a.firebaseio.com/')

def run_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    _request = requests.post(uri, data= query, headers=headers)
    if _request.status_code == 200:
        return _request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(_request.status_code, query  ))


query = """
{
    search(term: "%s",
            location: "%s",
            limit: 10,
            radius: 300) {
        total
        business {
            name
            rating
            distance
        }
    }
}
"""

@app.route('/nearby', methods=['POST'])
def getNearby():
    """
    returns the top ten locations within 300 meters of the given address that
    fit the term type
    """
    if request.method == 'POST':
        data = request.get_json()
        address = data.get('address', '548 Brannan St San francisco, CA')
        term = data.get('term', 'coffee')
        queryWithAddress = query % (term, address)
        result = run_query(queryWithAddress) # Execute the query
        return json.dumps(result, indent=4, sort_keys=True)
    else:
        return ""

@app.route('/criteria', methods=['PUT'])
def setCriteria():
    """
    sets particular criteria to a score between 0 and 3
    """
    if request.method == 'PUT':
        data = request.args.to_dict()
        criteria = data['criteria']
        value = data['value']
        hash = firebase.get('/criteria/', None)
        result = firebase.put('/criteria/',criteria, {criteria: value})
        return json.dumps(result, indent=4, sort_keys=True)
    else:
        return "didnt go through"


if __name__ == '__main__':
    app.run(debug=True)
