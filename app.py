from flask import Flask
import requests
from requests.utils import quote
import json

app = Flask(__name__)
headers = {
    "Authorization": "Bearer 5QQtTE0-Gz__cevFZLCaAm0yHPW5opgP9Mk60hNqMB94SUugjXS-KgUpWE8k4yQc33yFWjsn-sFc0rksDwuvhtkUiCINiypjWdbKnBRVMuRuA3bz-MfMmFCJgFg_XHYx",
    "Content-Type": "application/graphql"
}
uri = 'https://api.yelp.com/v3/graphql'

def run_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    print({"query": query})
    request = requests.post(uri, data= query, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        print(request.text  )
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query  ))


# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.

query = """
{
    search(term: "coffee",
            location: "548 Brannan StSan Francisco, CA 94107",
            limit: 10,
            radius: 500) {
        total
        business {
            name
            url
        }
    }
}
"""


@app.route('/')
def hello():
    result = run_query(query) # Execute the query
    remaining_rate_limit = result # Drill down the dictionary
    print("Remaining rate limit - {}".format(remaining_rate_limit))
    return json.dumps(result, indent=4, sort_keys=True)


if __name__ == '__main__':
    app.run(debug=True)
