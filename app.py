from flask import Flask,render_template,url_for,json,request
import os
import random

app = Flask(__name__,static_folder="static")
app.config['planetarray'] = ["Earth","Moon","Venus","Uranus","Jupiter"]

@app.route('/')
def index():

	
	return render_template('main.html')

@app.route('/getNewPlanet',methods=['GET'])
def getNewPlanet():
	curPlanet = request.args.get('curPlanet')

	SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
	json_url = os.path.join(SITE_ROOT, 'static/json', 'planet.json')
	data=json.load(open(json_url))

	planets = app.config['planetarray']
	random_planet = random.choice(planets)

	while random_planet == curPlanet:
		random_planet = random.choice(planets)

	response = app.response_class(
        response=json.dumps(data[random_planet]),
        status=200,
        mimetype='application/json'
    )


	return (response)
    
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

if __name__ == "__main__":
    app.run(host="0.0.0.0")
